import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import merrymatch from "../assets/MerryMatch/merrymatch.png";

function MerryMatch({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="flex flex-col justify-center items-center">
          <img src={merrymatch} alt="" />
          <ModalHeader>
            <h1 className="text-6xl">Merry Match!</h1>
          </ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody></ModalBody> */}

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Start Conversation
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

MerryMatch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default MerryMatch;
