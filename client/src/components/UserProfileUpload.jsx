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

  // const [url2, setUrl2] = useState("");

  // useEffect(() => {
  //   async function fetchData() {
  //     const supabase = createClient(supabaseUrl, supabaseKey);
  //     const { data, error } = await supabase
  //       .from(tableName)
  //       .select("url2")
  //       .single();

  //     if (error) {
  //       console.error("Error fetching data:", error.message);
  //     } else {
  //       setUrl2(data.url2);
  //       console.log("url2: ", url2);
  //     }
  //   }

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
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

    fetchProfileImages();
  }, [formDataId, refresh]);
  // }, [formDataId, refresh, imageUrls]);

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
  //---------------rleang   don't delete
  // const handleFileUpload = async (file, index, userId) => {
  //   try {
  //     // Create FormData and append file and file path
  //     const formData = new FormData();
  //     // const uniqueFileName = `${file.name.split(".")[0]}_${Date.now()}.${
  //     //   file.name.split(".")[1]
  //     // }`;
  //     const imagePath = `images/${file}`;
  //     formData.append("file", file);
  //     formData.append("imagePath", imagePath);
  //     console.log("imagePath", imagePath);

  //     // Upload the file to the server
  //     const uploadResponse = await axios.post(
  //       `${SERVER_PORT}/user/upload`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           const progress = Math.round(
  //             (progressEvent.loaded * 100) / progressEvent.total
  //           );
  //           // Update UI to show upload progress (optional)
  //           console.log(`Upload progress: ${progress}%`);
  //         },
  //       }
  //     );

  //     // Handle successful upload
  //     console.log("uploadResponse.data.uploadedFileUrl: ", uploadResponse.data.uploadedFileUrl);
  //     const imageUrl = uploadResponse.data.uploadedFileUrl;
  //     console.log("imageUrl: ", imageUrl);
  //     const newImageUrls = [...imageUrls];
  //     newImageUrls[index] = imageUrl;
  //     setImageUrls(newImageUrls);
  //     await saveImageUrlSetsToDatabase(newImageUrls, userId);
  //   } catch (error) {
  //     // Handle upload error
  //     console.error("Error uploading file:", error);
  //     // Provide specific error message to the user (optional)
  //   }
  // };

  // const saveImageUrlSetsToDatabase = async (imageUrls, userId) => {
  //   try {
  //     const imageUrlSets = imageUrls.reduce((acc, curr, index) => {
  //       acc[`url${index + 1}`] = curr;
  //       return acc;
  //     }, {});

  //     await axios.put(`${SERVER_PORT}/user/saveImageUrlSets`, {
  //       imageUrlSets: imageUrlSets,
  //       userId: userId,
  //     });

  //     console.log("Image URL sets updated successfully:", imageUrlSets);
  //   } catch (error) {
  //     console.error("Error saving image URL sets to database:", error.message);
  //   }
  // };

  //------------leang don't Delete ----------------------
  // const handleFileUpload = async (file, index, userId) => {
  //   try {
  //     const uniqueFileName = `${Date.now()}_${file.name}`;
  //     const imagePath = `images/${uniqueFileName}`;

  //     // const imagePath = `images/`;
  //     console.log("image path", imagePath);

  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("imagePath", imagePath);

  //     const uploadResponse = await axios.post(
  //       `${SERVER_PORT}/user/upload`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("uploadResponse: ", uploadResponse.data);

  //     const imageUrl = uploadResponse.data.imageUrl;
  //     console.log("imageUrl: ", imageUrl);
  //     const newImageUrls = [...imageUrls];
  //     newImageUrls[index] = imageUrl;
  //     setImageUrls(newImageUrls);

  //     await saveImageUrlSetsToDatabase(newImageUrls, userId);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

  // const saveImageUrlSetsToDatabase = async (imageUrls, userId) => {
  //   try {
  //     const imageUrlSets = imageUrls.reduce((acc, curr, index) => {
  //       acc[`url${index + 1}`] = curr;
  //       return acc;
  //     }, {});

  //     await axios.put(`${SERVER_PORT}/user/saveImageUrlSets`, {
  //       imageUrlSets: imageUrlSets,
  //       userId: userId,
  //     });

  //     console.log("Image URL sets updated successfully:", imageUrlSets);
  //   } catch (error) {
  //     console.error("Error saving image URL sets to database:", error.message);
  //   }
  // };

  // -----OK-PASS-------leang don't Delete ----------------------
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

      console.log("urlData :", urlData);

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
