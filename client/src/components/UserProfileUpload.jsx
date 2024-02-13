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
  formDataId = 51;
  const API_ENDPOINT = "http://localhost:4008";

  //--------leang Note  please don't delect-------
  // useEffect(() => {
  //   const fetchProfileImages = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from("user2_profiles_url")
  //         .select("storage_location")
  //         .eq("id", formDataId)
  //         .single();

  //       if (error) {
  //         throw error;
  //       }

  //       if (data && data.storage_location) {
  //         setImageUrls(Object.values(data.storage_location));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile images:", error.message);
  //     }
  //   };

  //   if (isEditMode) {
  //     fetchProfileImages();
  //   }
  // }, [isEditMode, refresh]);

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/user_profile`, {
          params: {
            id: formDataId,
          },
        });
        const { data, error } = response.data;
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
//------------leang don't Delete ----------------------
  // const handleFileUpload = async (file, index, userId) => {
  //   try {
     
  //     const lastDotIndex = file.name.lastIndexOf(".");
  //     const fileNameWithoutExtension = file.name.slice(0, lastDotIndex);
  //     const fileExtension = file.name.slice(lastDotIndex + 1);
  //     const uniqueFileName = `${fileNameWithoutExtension.replace(
  //       /\.[^.]+$/,
  //       ""
  //     )}_${Date.now()}.${fileExtension}`;

     
  //     const imagePath = `images/${uniqueFileName}`;
  //     console.log("uniqueFileName: ", uniqueFileName);
  //     console.log("imagePath: ", imagePath);

  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("imagePath", imagePath);

  //     const uploadResponse = await axios.post(
  //       `${API_ENDPOINT}/api/upload_image`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("imagePath", imagePath);

  //     const imageUrl = uploadResponse.data.imageUrl;

  //     const newImageUrls = [...imageUrls];
  //     newImageUrls[index] = imageUrl;
  //     setImageUrls(newImageUrls);

  //     await saveImageUrlSetsToDatabase(newImageUrls, userId);
  //   } catch (error) {
  //     console.error("Error handling file upload:", error.message);
  //   }
  // };

  // const saveImageUrlSetsToDatabase = async (imageUrls, formDataId) => {
  //   try {
  //     const imageUrlSets = imageUrls.reduce((acc, curr, index) => {
  //       acc[`url${index + 1}`] = curr;
  //       return acc;
  //     }, {});

  //     await axios.post(`${API_ENDPOINT}/api/save_image_url_sets`, {
  //       imageUrlSets: imageUrlSets,
  //       formDataId: formDataId,
  //     });

  //     console.log("Image URL sets updated successfully:", imageUrlSets);
  //   } catch (error) {
  //     console.error("Error saving image URL sets to database:", error.message);
  //   }
  // };

  //------------leang don't Delete ----------------------
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
    } catch (error) {}
  };
  // --------leang Note  please don't delect-------
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
    const newImageUrls = { ...imageUrls };

    delete newImageUrls[index];

    const updatedImageUrlsArray = Object.values(newImageUrls);

    setImageUrls(newImageUrls);

    try {
      await saveImageUrlSetsToDatabase(updatedImageUrlsArray);
      setRefresh(!refresh);
      console.log("Delete successfull");
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
      className="w-full  min-[1283px]:h-[200px] "
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
            <div className=" relative p-3 object-cover">
              <img src={imageUrls[index]} alt={`Uploaded Image ${index + 1}`} />
              <button
                className=" absolute top-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white "
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
