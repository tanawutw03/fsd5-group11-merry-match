import MerryCards from "../components/MerryCards";
import NavBar from "../components/common/NavBar";
import LeftSideMatching from "../components/LeftSideMatching";
import { Checkbox } from "@chakra-ui/react";
import SliderAge from "../components/SliderAge";

function Matching() {
  return (
    <>
      <div className=" h-screen w-screen">
        <NavBar />
        <div className="flex flex-row mt-10 ml-5 ">
          <LeftSideMatching />
          <MerryCards />
          <div className="w-[314px] h-[500px] flex-col flex ml-[18px] ">
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
