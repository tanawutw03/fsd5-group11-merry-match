import React, { useState, useEffect } from "react";
import { SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { supabase } from "../utils/supabaseClient";

export default function UserProfileUpload({ formDataId, isEditMode }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [session, setSession] = useState(null);
  const [refresh, setRefresh] = useState(false);
  formDataId = 51;

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const { data, error } = await supabase
          .from("user2_profiles_url")
          .select("storage_location")
          .eq("id", formDataId)
          .single();

        if (error) {
          throw error;
        }

        if (data && data.storage_location) {
          setImageUrls(Object.values(data.storage_location));
        }
      } catch (error) {
        console.error("Error fetching profile images:", error.message);
      }
    };

    if (isEditMode) {
      fetchProfileImages();
    }
  }, [isEditMode, refresh]);

  const handleFileChange = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const userId = session?.user.id;
      await handleFileUpload(file, index, userId);
    }
  };

  const handleFileUpload = async (file, index, userId) => {
    try {
      const uniqueFileName = `${file.name.split(".")[0]}_${Date.now()}.${
        file.name.split(".")[1]
      }`;
      const imagePath = `images/${uniqueFileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile_images")
        .upload(imagePath, file);

      if (uploadError) {
        throw new Error(`Storage Error: ${uploadError.message}`);
      }

      const { data: urlData, error } = await supabase.storage
        .from("profile_images")
        .getPublicUrl(imagePath);

      if (error) {
        throw new Error(`Error getting public URL: ${error.message}`);
      }

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Public URL is undefined or not found.");
      }

      const newImageUrls = [...imageUrls];
      newImageUrls[index] = urlData.publicUrl;
      setImageUrls(newImageUrls);

      await saveImageUrlSetsToDatabase(newImageUrls);
    } catch (error) {
      console.error("Error handling file upload:", error.message);
    }
  };

  const saveImageUrlSetsToDatabase = async (imageUrls) => {
    try {
      const imageUrlSets = imageUrls.reduce((acc, curr, index) => {
        acc[`url${index + 1}`] = curr;
        return acc;
      }, {});

      await supabase
        .from("user2_profiles_url")
        .update({
          storage_location: imageUrlSets,
        })
        .eq("id", formDataId);

      console.log("Image URL sets updated successfully:", imageUrlSets);
    } catch (error) {
      console.error("Error saving image URL sets to database:", error.message);
    }
  };

  const handleDeleteImage = async (index) => {
    // Copy current imageUrls object
    const newImageUrls = { ...imageUrls };

    // Delete the image URL corresponding to the given key
    delete newImageUrls[index];

    // Convert the object to an array for saving to database
    const updatedImageUrlsArray = Object.values(newImageUrls);

    // Update state with the modified imageUrls
    setImageUrls(newImageUrls);

    try {
      // Save the updated imageUrls array to the database
      await saveImageUrlSetsToDatabase(updatedImageUrlsArray);
      setRefresh(!refresh);
      console.log("successfull");
    } catch (error) {
      // Handle any errors that occur during saving to the database
      console.error("Error saving image URLs to the database:", error);
      // Optionally, you can add further error handling or notify the user about the error
    }
  };

  return (
    <SimpleGrid
      columns={[1, 2, 3, 4, 5]}
      spacing="20px"
      className="w-full h-[390px] mb-20"
    >
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          {!imageUrls[index] && isEditMode && (
            <>
              <label htmlFor={`file-upload${index}`}>
                <Card
                  sx={{
                    w: "167px",
                    h: "167px",
                    rounded: "16px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  className="ml-3"
                >
                  <CardBody className="flex flex-col justify-center items-center w-full h-full rounded-[16px] bg-[#f1f2f6] ">
                    <AddIcon color="purple" />
                    <h1 className="absolute bottom-4 text-[#a62d82] text-xl">
                      Upload photo {index + 1}
                    </h1>
                  </CardBody>
                </Card>
              </label>
              <input
                id={`file-upload${index}`}
                type="file"
                accept="image/*"
                onChange={(event) => handleFileChange(event, index)}
                style={{ display: "none" }}
              />
            </>
          )}
          {imageUrls[index] && isEditMode && (
            <div className=" relative p-3">
              <img src={imageUrls[index]} alt={`Uploaded Image ${index + 1}`} />
              <button
                className=" absolute top-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white"
                onClick={() => handleDeleteImage(index)}
              >
                X
              </button>
            </div>
          )}
        </div>
      ))}
    </SimpleGrid>
  );
}
