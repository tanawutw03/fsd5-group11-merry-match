import { SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

function UploadProfiles() {
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
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={4}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Card
              key={index}
              sx={{ w: "176px", h: "176px", rounded: "16px" }}
              onClick={() => console.log(`Card ${index + 1} clicked!`)}
            >
              <CardBody className="flex flex-col justify-center items-center w-[176px] h-[176px] rounded-[16px] bg-[#f1f2f6]">
                <IconButton
                  aria-label="Upload photo"
                  colorScheme="custom"
                  color="#a62d82"
                  icon={<AddIcon />}
                />
                <h1 className="text-[#a62d82]">Upload&nbsp;photo</h1>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}

export default UploadProfiles;
