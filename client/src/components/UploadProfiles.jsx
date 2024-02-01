import { SimpleGrid, Card, CardBody, IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

function UploadProfiles() {
  const fileInputRefs = useRef(
    Array.from({ length: 5 }).map(() => React.createRef())
  );
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInputChange = (index) => {
    return () => {
      // Handle file input change logic here
      const files = Array.from(fileInputRefs.current[index].current.files);

      // Ensure we only keep up to 5 files
      const newSelectedFiles = files.slice(0, 5);

      // Update the state with the new array of files
      setSelectedFiles([...selectedFiles, ...newSelectedFiles]);
    };
  };

  const handleDeleteFile = (index) => {
    // Create a new array excluding the file to be deleted
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);

    // Update the state with the new array of files
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
          {selectedFiles.map((file, index) => (
            <div key={index}>
              <Card sx={{ w: "176px", h: "176px", rounded: "16px" }}>
                <CardBody className="flex flex-col justify-center items-center w-[176px] h-[176px] rounded-[16px] bg-[#f1f2f6]">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover rounded-[16px]"
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    aria-label="Delete"
                    color="red"
                    onClick={() => handleDeleteFile(index)}
                    className="absolute top-2 right-2"
                  />
                </CardBody>
              </Card>
            </div>
          ))}

          {Array.from({ length: Math.max(0, 5 - selectedFiles.length) }).map(
            (_, index) => (
              <div key={index}>
                <Card sx={{ w: "176px", h: "176px", rounded: "16px" }}>
                  <CardBody className="flex flex-col justify-center items-center w-[176px] h-[176px] rounded-[16px] bg-[#f1f2f6]">
                    <input
                      type="file"
                      ref={fileInputRefs.current[index]}
                      style={{ display: "none" }}
                      onChange={handleFileInputChange(index)}
                      multiple
                    />
                    <label htmlFor={`file-input-${index}`}>
                      <AddIcon color="purple" />
                      <h1 className="text-[#a62d82] text-xl absolute bottom-10">
                        Upload photo
                      </h1>
                    </label>
                  </CardBody>
                </Card>
              </div>
            )
          )}
        </SimpleGrid>
      </div>
    </>
  );
}

export default UploadProfiles;
