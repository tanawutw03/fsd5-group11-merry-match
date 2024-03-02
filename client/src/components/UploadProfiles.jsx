import { SimpleGrid, Card, CardBody, IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

function UploadProfiles({ onFormChange, onRandomFileNames }) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInputChange = () => {
    const files = Array.from(fileInputRef.current.files);
    const newSelectedFiles = files.slice(0, 5);

    // Generate random file names for new selected files
    const randomFileNames = newSelectedFiles.map((file) => {
      const fileExt = file.name.split(".").pop();
      const randomString = Math.random().toString(36).substring(7);
      const randomFileName = `${randomString}.${fileExt}`;

      // Return an object containing both the file and its name
      return { file, name: randomFileName };
    });

    // Pass file names to the parent component
    onFormChange({ avatar_url: randomFileNames.map((file) => file.name) });

    onRandomFileNames(randomFileNames);

    // Update the state with file objects and names
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...randomFileNames,
    ]);

    console.log(randomFileNames);
  };

  const handleDeleteFile = (index, event) => {
    event.stopPropagation();

    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="h-[70px]">
          <h1 className="text-2xl text-[#A62D82] font-bold text-left w-full pl-28">
            Profile&nbsp;Pictures
          </h1>
          <h3 className="text-lg text-left w-full pl-28">
            Upload&nbsp;at&nbsp;least&nbsp;2&nbsp;photos
          </h3>
        </div>

        <div className="w-full h-[500px] flex items-center justify-center">
          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="20">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <Card
                  sx={{
                    w: "167px",
                    h: "167px",
                    rounded: "16px",
                  }}
                  onClick={() => fileInputRef.current.click()}
                  className="hover:cursor-pointer"
                >
                  <CardBody className="flex flex-col justify-center items-center w-[167px] h-[167px] rounded-[16px] bg-[#f1f2f6]">
                    {selectedFiles[index] ? (
                      <>
                        <img
                          src={URL.createObjectURL(selectedFiles[index].file)}
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
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          multiple
          accept="image/*"
        />
      </div>
    </>
  );
}

UploadProfiles.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  onRandomFileNames: PropTypes.func,
};

export default UploadProfiles;
