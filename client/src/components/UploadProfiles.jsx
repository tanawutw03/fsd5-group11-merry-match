import { SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { SimpleGrid, Card, CardBody, IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { supabase } from "../../src/utils/supabaseClient.js";

function UploadProfiles() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInputChange = () => {
    const files = Array.from(fileInputRef.current.files);
    const newSelectedFiles = files.slice(0, 5);
    setSelectedFiles([...selectedFiles, ...newSelectedFiles]);
  };

  const handleDeleteFile = (index, event) => {
    event.stopPropagation();

    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const onSubmit = async () => {
    try {
      if (selectedFiles.length < 2) {
        throw new Error("You must upload at least 2 photos");
      }

      for (const file of selectedFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;

        if (file.size > 5 * 1024 * 1024) {
          throw new Error("File size must not exceed 5MB");
        }

        const filePath = `avatars/${fileName}`;
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        console.log(data, error);
      }

      // Reset selected files after successful upload
      setSelectedFiles([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center font-nunito">
        <div className="flex flex-col justify-start items-start mt-32 pb-10">
          <h1 className="text-3xl font-bold text-[#a62d82]">
            Profile&nbsp;Pictures
          </h1>
          <h3 className="text-lg">
            Upload&nbsp;at&nbsp;least&nbsp;2&nbsp;photos
          </h3>
        </div>
        <div className="ml-48 flex w-screen ml- justify-start items-start mb-10">
          <h3 className="text-2xl">Upload at least 2 photos</h3>
        </div>

        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={210}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} style={{ position: "relative" }}>
              <Card
                sx={{
                  w: "176px",
                  h: "176px",
                  rounded: "16px",
                  position: "relative",
                }}
                onClick={() => fileInputRef.current.click()}
                className="hover:cursor-pointer"
              >
                <CardBody className="flex flex-col justify-center items-center w-[176px] h-[176px] rounded-[16px] bg-[#f1f2f6]">
                  {selectedFiles[index] ? (
                    <>
                      <img
                        src={URL.createObjectURL(selectedFiles[index])}
                        alt={`Thumbnail ${index}`}
                        className="w-full h-full object-cover rounded-[16px]"
                      />
                      <IconButton
                        icon={<CloseIcon />}
                        aria-label="Delete"
                        color="white"
                        bgColor="red.500"
                        _hover={{ bgColor: "red.600" }}
                        onClick={(event) => handleDeleteFile(index, event)}
                        style={{
                          position: "absolute",
                          top: -15,
                          right: -15,
                          borderRadius: "50%",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <AddIcon color="purple" />
                      <h1 className="text-[#a62d82] text-xl absolute bottom-10">
                        Upload photo
                      </h1>
                    </>
                  )}
                </CardBody>
              </Card>
            </div>
          ))}
        </SimpleGrid>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          multiple
          accept="image/*"
        />

        {/* Submit button triggers the onSubmit function */}
        <button onClick={onSubmit}>Upload</button>
      </div>
    </>
  );
}

export default UploadProfiles;
