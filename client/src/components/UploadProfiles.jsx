import { SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

function UploadProfiles() {
  return (
    <div className="w-full h-screen flex justify-center items-center border-2 border-red-700 w ">
      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={4}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            onClick={() => console.log(`Card ${index + 1} clicked!`)}
          >
            <CardBody className="flex flex-col justify-center items-center gap-2">
              <IconButton aria-label="Upload photo" icon={<AddIcon />} />
              <h1 className="w-max">Upload photo</h1>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default UploadProfiles;
