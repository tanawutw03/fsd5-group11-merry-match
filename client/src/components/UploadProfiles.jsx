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
      <div className="w-screen h-screen flex flex-col justify-center items-center font-nunito">
        <div className="flex justify-end absolute font-nunito gap-3 right-40 top-28 bg-[#fcfcfe]">
          <div className="w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center">
            <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex justify-center items-center text-2xl font-bold text-gray-600">
              1
            </div>
          </div>
          <div className="w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center">
            <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex justify-center items-center text-2xl font-bold text-gray-600">
              2
            </div>
          </div>
          <div className="h-20 w-[225px] p-4 pr-8 border border-[#A62D82] rounded-2xl flex justify-start items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-200 flex justify-center items-center text-[#A62D82] text-2xl font-bold">
              3
            </div>
            <div className="flex flex-col items-start">
              <p className="text-gray-700 text-xs font-medium">Step 3/3</p>
              <p className="text-[#A62D82] text-base font-extrabold">
                Upload Photos
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start left-72 absolute">
          <h1 className="text-3xl font-bold text-[#a62d82]">
            Profile&nbsp;Pictures
          </h1>
          <h3 className="text-lg">
            Upload&nbsp;at&nbsp;least&nbsp;2&nbsp;photos
          </h3>
        </div>

        <SimpleGrid
          columns={[1, 2, 3, 4, 5]}
          spacing="0px"
          className="w-full mb-[20px]"
        >
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
