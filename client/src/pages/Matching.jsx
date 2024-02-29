import MerryCards from "../components/MerryCards";
import NavBar from "../components/common/NavBar";
import LeftSideMatching from "../components/LeftSideMatching";
import { Checkbox } from "@chakra-ui/react";
import SliderAge from "../components/SliderAge";
import { useNavigate } from "react-router-dom";
import { useUser } from "../app/userContext";
import PropTypes from "prop-types";
import { useState } from "react";
import ChakraButton from "../components/common/ChakraButton";
function Matching() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const [mutualMatch, setMutualMatch] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(Clicked);
  };

  const handleMutualMatch = (value) => {
    setMutualMatch(value);
  };

  return (
    <>
      <div className="w-full  ">
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

        <div className="flex flex-row w-full  m-0 p-0 ">
          <LeftSideMatching mutualMatch={mutualMatch} />
          <MerryCards user={user} onMutualMatch={handleMutualMatch} />
          <div className="  flex-col flex w-1/6  p-6  ">
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
            <div className="flex flex-col pl-5 mt-40 border-t border-solid border-t-[color:var(--gray-300,#E4E6ED)] ">
              <div className="flex gap-5 justify-between pl-6">
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
