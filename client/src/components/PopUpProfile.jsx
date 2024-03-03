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
import { useState } from "react";

const PopUpProfile = ({
  useMenu,
  profileData,
  isRound,
  variant,
  colorScheme,
  size,
  name,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatarIndex, setAvatarIndex] = useState(0);

  const IconOrButton = useMenu ? (
    <IconButton
      onClick={onOpen}
      isRound={isRound}
      variant={variant}
      colorScheme={colorScheme}
      icon={<ViewIcon />}
      size={size}
    />
  ) : (
    <ChakraButton
      onClick={onOpen}
      name={name}
      variant={variant}
      colorScheme={colorScheme}
      w="100%"
    />
  );

  // Define handleBackwardClick function
  const handleBackwardClick = () => {
    const newIndex = Math.max(0, avatarIndex - 1); // Ensure index doesn't go below 0
    setAvatarIndex(newIndex);
    console.log(`handleBackwardClick`);
  };

  // Define handleForwardClick function
  const handleForwardClick = () => {
    const newIndex = Math.min(4, avatarIndex + 1); // Ensure index doesn't exceed 4
    if (
      (profileData.avatarUrls && newIndex < profileData.avatarUrls.length) ||
      (profileData.avatar_url && newIndex < profileData.avatar_url.length)
    ) {
      setAvatarIndex(newIndex);
      console.log(`handleForwardClick`);
    }
  };

  // console.log(`profileData:`, profileData);
  const values = [
    { title: "Sexual identities", value: profileData.sex_identities },
    { title: "Sexual preferences", value: profileData.sex_preferences },
    { title: "Racial preferences", value: profileData.racial_preferences },
    { title: "Meeting interests", value: profileData.meeting_interest },
  ];
  return (
    <>
      <ul>{IconOrButton}</ul>
      <Modal isOpen={isOpen} size="4xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-between items-center h-full p-6  ">
              <div className=" flex   flex-col  h-full   ">
                <div className=" h-96 w-96">
                  <img
                    className="h-96 w-96 rounded-2xl"
                    src={
                      profileData.avatarUrls &&
                      profileData.avatarUrls[avatarIndex]
                        ? profileData.avatarUrls[avatarIndex]
                        : profileData.avatar_url &&
                          profileData.avatar_url[avatarIndex]?.publicUrl
                        ? profileData.avatar_url[avatarIndex]?.publicUrl
                        : profileData.user_profiles_url &&
                          profileData.user_profiles_url[0]?.storage_location
                        ? profileData.user_profiles_url[0]?.storage_location[
                            `url${avatarIndex + 1}`
                          ]
                        : null // Or any fallback value you want to use if none of the conditions are met
                    }
                  />
                </div>
                <div className="flex flex-row absolute bottom-10 left-40">
                  <img className="w-20 h-20" src={action} alt="Action Icon" />
                  <img className="w-20 h-20" src={heart} alt="Heart Icon" />
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <p className="text-[#646D89]">
                    {(profileData.avatarUrls &&
                      profileData.avatarUrls.length > 0) ||
                    (profileData.avatar_url &&
                      profileData.avatar_url.length > 0)
                      ? `${avatarIndex + 1}/${
                          profileData.avatarUrls?.length ||
                          profileData.avatar_url?.length ||
                          0
                        }`
                      : "0/0"}
                  </p>
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
              <div className=" h-full w-1/2 flex flex-row pl-5 ">
                <div className="w-[418px] ">
                  <div className="flex ">
                    <p className="text-3xl font-bold mr-4 ">
                      {profileData.full_name}
                    </p>
                    <p className="text-3xl font-bold  text-[#646D89] ">
                      {profileData.age}
                    </p>
                  </div>
                  <div className="flex gap-4 justify-between mt-2 text-xl font-semibold leading-8 text-slate-500 max-md:flex-wrap max-md:max-w-full">
                    <img src={location} className="my-auto w-6 aspect-square" />
                    <div className="grow">
                      {profileData.city}, {profileData.country}{" "}
                    </div>
                  </div>
                  <div className=" flex flex-col pt-5 ">
                    <div className=" flex-col justify-start items-start inline-flex ">
                      {values.map((item, index) => (
                        <div
                          key={index}
                          className=" justify-start items-baseline inline-flex self-stretch py-1   "
                        >
                          <p className="Label w-[191px] text-slate-800 text-base font-normal font-['Nunito'] leading-normal">
                            {item.title}
                          </p>
                          <p className="Placeholder grow shrink basis-0 self-stretch text-slate-500 text-xl font-semibold font-['Nunito'] leading-[30px]">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <h1 className=" text-[24px] pt-4">About me</h1>
                    <div className="">
                      <p>{profileData.description}</p>
                    </div>
                    <h1 className=" text-[24px] pt-6">Hobbies and Interests</h1>
                    <div className="flex pt-3 ">
                      {Array.isArray(profileData.hobbies) &&
                        profileData.hobbies.map((hobby, index) => (
                          <div
                            key={index}
                            className="w-[86px] h-[40px] text-[#7D2262] border border-[#DF89C6] rounded-lg mr-2 flex items-center justify-center"
                          >
                            <p>{hobby}</p>
                          </div>
                        ))}
                    </div>
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
  profileData: PropTypes.object,
  name: PropTypes.string,
};

export default PopUpProfile;
