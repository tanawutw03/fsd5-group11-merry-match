import { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  TabIndicator,
} from "@chakra-ui/react";
import Step1Inputs from "../Step1Inputs";
import Step2Inputs from "../Step2Inputs";
import Step3Inputs from "../Step3Inputs";
import RegisterWords from "./RegisterWords";
import ChakraButton from "./ChakraButton";
import { useNavigate } from "react-router-dom";

function TabSteps() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate();
  const isLastTab = activeTabIndex === 2;

  const renderButtonLabel = isLastTab ? "Submit" : "Next Step";
  const renderButtonType = isLastTab ? "submit" : "button";

  const handleTabChange = (index) => {
    console.log("Current tab index:", index);

    // Set the active tab index after navigation
    setActiveTabIndex(index);
  };

  const renderFormByTabIndex = (index) => {
    switch (index) {
      case 0:
        return {
          form: <Step1Inputs />,
          formName: "Basic Information",
        };
      case 1:
        return {
          form: <Step2Inputs />,
          formName: "Identities and Interests",
        };
      case 2:
        return { form: <Step3Inputs />, formName: "Upload Photos" };
      default:
        return null;
    }
  };

  const handleNext = () => {
    navigate("/register");
    console.log("Navigating to the next page");
  };

  const handlePrev = () => {
    navigate("/");
    console.log("Navigating to the prev page");
  };

  const dummyFunction = () => {};

  return (
    <>
      <RegisterWords />
      <div className="flex h-screen w-screen  relative">
        <Tabs
          align="center"
          index={activeTabIndex}
          onChange={(index) => handleTabChange(index)}
          variant="unstyled"
          colorScheme="purple"
          size="lg"
        >
          <div className="text-[#A62D82] w-[250px] text-2xl flex flex-col justify-end items-center absolute m-24 right-0">
            <TabList>
              <Tab>1</Tab>
              <Tab>2</Tab>
              <Tab>3</Tab>
            </TabList>
            <div className="flex items-start">
              <TabIndicator
                mt="-15px"
                height="5px"
                bg="blue.500"
                borderRadius="1px"
              />
              <p>{renderFormByTabIndex(activeTabIndex).formName}</p>
            </div>
          </div>

          <div className="w-screen h-screen">
            <TabPanels className="text-2xl text-[#A62D82]">
              {Array.from({ length: 3 }).map((_, i) => (
                <TabPanel
                  key={i}
                  className="w-screen h-screen flex justify-center items-center"
                >
                  {renderFormByTabIndex(activeTabIndex).form}
                </TabPanel>
              ))}
            </TabPanels>
          </div>
        </Tabs>
        <div className="absolute bottom-0 right-0">
          <ChakraButton name="Back" color="gray" onNext={handlePrev} />
          <ChakraButton
            name={renderButtonLabel}
            color="red"
            type={renderButtonType}
            onNext={isLastTab ? handleNext : dummyFunction}
          />
        </div>
      </div>
    </>
  );
}

export default TabSteps;
