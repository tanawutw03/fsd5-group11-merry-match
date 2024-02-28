import React, { useState, useEffect } from "react";
import { SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { supabase } from "../utils/supabaseClient";
import axios from "axios";
//for using UserProfilePage
export default function UserProfileUpload({ formDataId, isEditMode }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [session, setSession] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const SERVER_PORT = "http://localhost:4008";

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        if (!formDataId) {
          console.error("Error fetching profile images: formDataId is empty");
          return;
        }

        const { data, error } = await supabase
          .from("user_profiles_url")
          .select("storage_location")
          .eq("profile_id", formDataId);

        if (error) {
          throw error;
        }

        if (data && data.length > 0 && data[0].storage_location) {
          setImageUrls(Object.values(data[0].storage_location));
        }
      } catch (error) {
        console.error("Error fetching profile images:", error.message);
      }
    };

    fetchProfileImages();
  }, [formDataId, refresh]);

  const handleFileChange = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      let userId = session?.user.id;

      console.log(file);
      console.log(index);
      console.log(userId);
      await handleFileUpload(file, index, userId);
    }
  };

  const handleFileUpload = async (file, index, userId) => {
    try {
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const imagePath = `images/${uniqueFileName}`;
      console.log("image path", imagePath);

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
      console.log("newImageUrls :", newImageUrls);

      await saveImageUrlSetsToDatabase(newImageUrls);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const saveImageUrlSetsToDatabase = async (imageUrls) => {
    try {
      const imageUrlSets = imageUrls.reduce((acc, curr, index) => {
        acc[`url${index + 1}`] = curr;
        return acc;
      }, {});

      await supabase
        .from("user_profiles_url")
        .update({
          storage_location: imageUrlSets,
        })
        .eq("profile_id", formDataId);

      console.log("Image URL sets updated successfully:", imageUrlSets);
    } catch (error) {
      console.error("Error saving image URL sets to database:", error.message);
    }
  };

  const handleDeleteImage = async (index) => {
    const newImageUrls = { ...imageUrls };

    delete newImageUrls[index];

    const updatedImageUrlsArray = Object.values(newImageUrls);

    setImageUrls(newImageUrls);

    try {
      await saveImageUrlSetsToDatabase(updatedImageUrlsArray);
      setRefresh(!refresh);
      console.log("Delete successfull");
    } catch (error) {
      console.error("Error saving image URLs to the database:", error);
    }
  };

  return (
    <SimpleGrid
      columns={[1, 2, 3, 4, 5]}
      spacing="20px"
      className="w-full  min-[1283px]:h-[200px] "
    >
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          {!imageUrls[index] && (
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
          {imageUrls[index] && (
            <div className=" relative p-3 object-cover border-[1px] rounded-[12px]  shadow-setShadow01">
              <img src={imageUrls[index]} alt={`Uploaded Image ${index + 1}`} />
              <button
                className=" absolute z-20 top-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white "
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
