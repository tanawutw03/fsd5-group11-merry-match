import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";

function UserProfileDelete() {
  return (
    <Modal
    isOpen={showResolveModal}
    onClose={handleCloseResolveModal}
    size="lg"
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Resolve Complaint</ModalHeader>
      <ModalCloseButton />
      <ModalBody>This complaint is resolved?</ModalBody>
      <ModalFooter>
        <div className="flex flex-row  justify-evenly w-full">
          <button
            className="flex p-3 w-fit  text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md "
            onClick={() => handleResolveComplaint(complaint_Id)}
          >
            Yes, it has been resolved
          </button>

          <button
            className="flex p-3 w-fit text-[#95002B]  text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#FFE1EA]  shadow-md "
            onClick={handleCloseResolveModal}
          >
            No, it’s not
          </button>
        </div>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default UserProfileDelete