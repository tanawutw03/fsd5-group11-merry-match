import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import ChakraButton from "./common/ChakraButton";
import action from "../assets/Matching/action button.svg";
import heart from "../assets/Matching/heart button (1).svg";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import location from "../assets/PopupProfile/location.png";

const PopUpProfile = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const IconOrButton = props.useMenu ? (
    <IconButton
      onClick={onOpen}
      isRound={props.isRound}
      variant={props.variant}
      colorScheme={props.colorScheme}
      icon={<ViewIcon />}
      size={props.size}
    />
  ) : (
    <ChakraButton onClick={onOpen} />
  );
  const preferencesData = [
    { title: "Sexual identities" },
    { title: "Sexual preferences" },
    { title: "Racial preferences" },
    { title: "Meeting interests" },
  ];
  return (
    <>
      <ul>{IconOrButton}</ul>
      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-center items-center h-full p-4 border-purple-300 border-4  ">
              <div className="flex flex-col h-full border-red-600 border-4">
                <div className="rounded-2xl bg-black border-red-600 border-4 h-72 w-72">
                  {/* Display avatar based on avatarIndex */}
                  <img className="rounded-2xl" alt="Avatar" />
                </div>
                <div className="flex flex-row absolute bottom-14 left-40">
                  <img className="w-12 h-12" src={action} alt="Action Icon" />
                  <img className="w-12 h-12" src={heart} alt="Heart Icon" />
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <p className="text-[#646D89]"></p>
                  <div className="flex flex-row z-30">
                    {/* Render backward arrow icon */}
                    <IconButton
                      color="gray"
                      variant="link"
                      icon={<ArrowBackIcon />}
                      onClick={handleBackwardClick}
                    />
                    {/* Render forward arrow icon */}
                    <IconButton
                      color="gray"
                      variant="link"
                      icon={<ArrowForwardIcon />}
                      onClick={handleForwardClick}
                    />
                  </div>
                </div>
              </div>
              <div className=" h-full w-1/2 pl-10 flex  border-purple-800 border-4 flex-row">
                <div className="w-[418px] ">
                  <div className="flex ">
                    <p className="text-xl font-bold mr-4 "></p>
                    <p className="text-3xl font-bold  text-[#646D89] "></p>
                  </div>
                  <div className="flex">
                    <img className=" w-5 h-5 " src={location} />
                    <div className="flex  text-[#646D89]">
                      <p></p>
                      <p>,</p>
                      <p></p>
                    </div>
                  </div>
                  <div className=" flex flex-col ">
                    <div className="flex flex-col">
                      {preferencesData.map((preference, index) => (
                        <div key={index} className={`col${index + 1} flex`}>
                          <p className="w-[191px] text-[16px]">
                            {preference.title}
                          </p>
                          <p className="text-[#646D89]">{preference.value}</p>
                        </div>
                      ))}
                    </div>

                    <h1 className=" text-[24px]">About me</h1>
                    <div className="">
                      <p></p>
                    </div>
                    <h1 className=" text-[24px]">Hobbies and Interests</h1>
                    <div className="flex "></div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
PopUpProfile.propTypes = {
  useMenu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  colorScheme: PropTypes.string,
  isRound: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
};

export default PopUpProfile;
