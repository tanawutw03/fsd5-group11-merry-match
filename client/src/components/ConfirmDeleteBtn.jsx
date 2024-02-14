import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function ConfirmDeleteBtn({ isOpen, onClose, onDelete }) {
    return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Comfrimation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Do you sure to delete account ?</ModalBody>
        <ModalFooter>
          <div className="flex flex-row  justify-evenly w-full">
            <button
              className="flex p-3 w-fit  text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md "
              onClick={onDelete}
            >
              Yes, I want to delete
            </button>
            <button
              className="flex p-3 w-fit text-[#95002B]  text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#FFE1EA]  shadow-md "
              onClick={onClose}
            >
              No, I don't
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default ConfirmDeleteBtn;
