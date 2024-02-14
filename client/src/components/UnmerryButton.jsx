import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import merryIcon from "../assets/MerryListPage/merryIcon.svg";

function UnmerryButton({ isUnmerry }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleUnmerry = () => {
    isUnmerry();
    onClose();
  };
  return (
    <>
      <Tooltip
        bg="gray.400"
        label="Unmerry"
        aria-label="A tooltip"
        borderRadius="md"
      >
        <button className="w-[48px] h-[48px] shadow-md flex justify-center items-center rounded-2xl bg-[#c70039]">
          <img
            src={merryIcon}
            alt="merry icon"
            className="w-[48px] h-[48px] ml-[5px] mt-[5px]"
            onClick={onOpen}
          />
        </button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered="true" font>
        <ModalOverlay />
        <ModalContent borderRadius="3xl">
          <ModalHeader className="border-solid border-b-[1px] border-[#e4e6ed] text-[18px] font-bold font-nunito">
            Unmerry Confirmation
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody color="gray.600">
            Do you want to Unmerry this person?
          </ModalBody>

          <ModalFooter mb={1} justifyContent="flex-start">
            <button
              className="py-[12px] px-[24px] text-[16px] font-semibold rounded-full shadow-sm font-nunito bg-[#ffe1ea] text-[#95002b] hover:bg-[#ffb1c8] active:bg-[#ff6390]"
              onClick={handleUnmerry}
            >
              Yes, I want to Unmerry
            </button>
            <button
              className="ml-[16px] py-[12px] px-[24px] text-[16px] font-semibold rounded-full shadow-sm font-nunito bg-[#c70039] text-white hover:bg-[#ff1659] active:bg-[#95002b]"
              onClick={onClose}
            >
              No. I don't
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UnmerryButton;
