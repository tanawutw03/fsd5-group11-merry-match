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
      <div className="w-screen">
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

        <div className="flex flex-row h-screen">
          <LeftSideMatching
            mutualMatch={mutualMatch}
            onMutualMatchClick={toggleChatroom}
          />

          {showChatroom ? (
            <Chatroom profile={selectedProfile} />
          ) : (
            <>
              <MerryCards user={user} onMutualMatch={handleMutualMatch} />
              <div className="  flex-col flex  w-1/4 p-6 h-screen ">
                <p className=" text-[#191C77] text-base font-bold">
                  Sex you interest
                </p>
                <div className="mt-2 flex flex-col">
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
