import MerryCards from "../components/MerryCards";
import NavBar from "../components/common/NavBar";
import LeftSideMatching from "../components/LeftSideMatching";
import { Checkbox } from "@chakra-ui/react";
import SliderAge from "../components/SliderAge";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../app/userContext";
import PropTypes from "prop-types";
import { useState } from "react";
import Chatroom from "../components/Chatroom";
import ChakraButton from "../components/common/ChakraButton";
import { useEffect } from "react";
function Matching() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const [mutualMatch, setMutualMatch] = useState(false);
  const [showChatroom, setShowChatroom] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const location = useLocation();
  const profileData = location.state && location.state.profileData;

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
  };

  const handleCloseChatroom = () => {
    setShowChatroom(false);
  };

  useEffect(() => {
    if (profileData) {
      toggleChatroom(profileData);
    }
  }, [profileData]);

  return (
    <>
      <div className="w-screen h-screen">
        {showChatroom ? (
          <NavBar
            firstMenuName="Start Matching!"
            secondMenuName="Merry Membership"
            name="login"
            color="red"
            showBell={true}
            useMenu={user}
            onClickFirstMenu={() => setShowChatroom(false)}
            onClickSecondMenu={() => navigate("/package")}
            setUser={setUser}
            user={user}
            onClick={handleClick}
          />
        ) : (
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
        )}

        <div className="flex">
          <div className="w-1/5">
            <LeftSideMatching
              mutualMatch={mutualMatch}
              onMutualMatchClick={toggleChatroom}
              onCloseChatroom={handleCloseChatroom}
            />
          </div>

          {showChatroom ? (
            <div className="w-screen h-screen">
              <Chatroom profile={selectedProfile} user={user} />
            </div>
          ) : (
            <>
              <div className="w-full flex">
                <div className="w-4/5">
                  <MerryCards
                    user={user}
                    onMutualMatch={handleMutualMatch}
                    toggleChatroom={toggleChatroom}
                  />
                </div>
                <div className="w-1/5 p-5">
                  <p className=" text-[#191C77] text-base font-bold">
                    Sex you interest
                  </p>

                  <div className="flex flex-col">
                    <Checkbox colorScheme="pink" defaultChecked mt={2}>
                      Default
                    </Checkbox>
                    <Checkbox colorScheme="pink" defaultChecked mt={2}>
                      Female
                    </Checkbox>
                    <Checkbox colorScheme="pink" defaultChecked mt={2}>
                      Non-bunary people
                    </Checkbox>
                  </div>
                  <SliderAge />
                  <div className="flex justify-center">
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
