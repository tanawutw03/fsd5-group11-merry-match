import MerryCards from "../components/MerryCards";
import NavBar from "../components/common/NavBar";
import LeftSideMatching from "../components/LeftSideMatching";
import { Checkbox } from "@chakra-ui/react";
import SliderAge from "../components/SliderAge";
import { useNavigate } from "react-router-dom";
import { useUser } from "../app/userContext";
import PropTypes from "prop-types";
import { useState } from "react";
import Chatroom from "../components/Chatroom";

import ChakraButton from "../components/common/ChakraButton";
function Matching() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const [mutualMatch, setMutualMatch] = useState(false);
  const [showChatroom, setShowChatroom] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`Clicked`);
  };

  const handleMutualMatch = (value) => {
    setMutualMatch(value);
  };

  const toggleChatroom = (profile) => {
    setShowChatroom(true);
    setSelectedProfile(profile);
    console.log(
      "Chatroom status:",
      showChatroom === true ? "opened" : "closed"
    );
  };

  return (
    <>
      <div className="w-screen h-screen">
        <NavBar
          firstMenuName="Start Matching!"
          secondMenuName="Merry Membership"
          name="login"
          color="red"
          showBell={true}
          useMenu={user}
          onClickFirstMenu={() => navigate("/matching")}
          onClickSecondMenu={() => navigate("/package")}
          setUser={setUser}
          user={user}
          onClick={handleClick}
        />

        <div className="flex">
          <div className="w-1/5">
            <LeftSideMatching
              mutualMatch={mutualMatch}
              onMutualMatchClick={toggleChatroom}
            />
          </div>

          {showChatroom ? (
            <Chatroom profile={selectedProfile} user={user} />
          ) : (
            <>
              <div className="w-full  flex">
                <div className="w-4/5">
                  <MerryCards user={user} onMutualMatch={handleMutualMatch} />
                </div>
                <div className="w-1/5">
                  <p className=" text-[#191C77] text-base font-bold">
                    Sex you interest
                  </p>

                  <Checkbox colorScheme="pink" defaultChecked mt={2}>
                    Default
                  </Checkbox>
                  <Checkbox colorScheme="pink" defaultChecked mt={2}>
                    Female
                  </Checkbox>
                  <Checkbox colorScheme="pink" defaultChecked mt={2}>
                    Non-bunary people
                  </Checkbox>

                  <SliderAge />

                  <ChakraButton
                    name=" Clear"
                    colorScheme="red"
                    variant="ghost"
                    rounded="20px"
                  ></ChakraButton>
                  <ChakraButton
                    name=" Search"
                    colorScheme="red"
                    variant="solid"
                    rounded="20px"
                  ></ChakraButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

Matching.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Matching;
