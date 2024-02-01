import { SimpleGrid, Card, CardBody, IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

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

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="ml-48 flex w-screen ml- justify-start items-start mt-40">
          <h1 className="text-3xl font-bold text-[#a62d82]">
            Profile Pictures
          </h1>
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

        {/* File input hidden for styling */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          multiple
        />
      </div>
    </>
  );
}

export default UploadProfiles;
