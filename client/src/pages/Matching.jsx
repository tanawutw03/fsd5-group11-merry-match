import MerryCards from "../components/MerryCards";
import NavBar from "../components/common/NavBar";
import LeftSideMatching from "../components/LeftSideMatching";
import { Checkbox } from "@chakra-ui/react";
import SliderAge from "../components/SliderAge";
import { useNavigate } from "react-router-dom";
function Matching() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-screen h-screen">
        <NavBar
          firstMenuName="Start Matching!"
          secondMenuName="Merry Membership"
          name="login"
          color="red"
          showBell="true"
          useMenu="true"
          onClickFirstMenu={() => navigate("/matching")}
          onClickSecondMenu={() => navigate("/package")}
        />

        <div className="flex flex-row border-2 border-orange-500 ">
          <div className="w-1/4 flex justify-center">
            <LeftSideMatching />
          </div>
          <div className="w-3/4">
            <MerryCards />
          </div>
          <div className=" flex-col flex w-2/12 justify-start items-center p-5 border-2 border-green-500">
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
            <div className="mt-[60px]">
              <p>Age Range</p>
              <SliderAge />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Matching;
