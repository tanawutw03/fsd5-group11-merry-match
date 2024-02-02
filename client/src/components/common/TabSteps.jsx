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
import { useRef } from "react";

function TabSteps() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const isLastTab = activeTabIndex === 2;

  // Use refs to store data for each step
  const step1DataRef = useRef({});
  const step2DataRef = useRef({});
  const step3DataRef = useRef({});

  // State to store data entered in each step
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});

  function renderFormByTabIndex(tabIndex) {
    switch (tabIndex) {
      case 0:
        return <Step1Inputs setData={setStep1Data} />;
      case 1:
        return <Step2Inputs setData={setStep2Data} />;
      case 2:
        return <Step3Inputs setData={setStep3Data} />;
      default:
        return null; // Handle other cases or return null
    }
  }

  const renderButtonLabel = isLastTab ? "Submit" : "Next Step";
  const renderButtonType = isLastTab ? "submit" : "button";

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
  };

  const handleNext = () => {
    // Save data based on the active tab
    switch (activeTabIndex) {
      case 0:
        step1DataRef.current = { ...step1Data };
        break;
      case 1:
        step2DataRef.current = { ...step2Data };
        break;
      case 2:
        step3DataRef.current = { ...step3Data };
        break;
      default:
        break;
    }

    // Navigate to the next tab
    const newIndex = Math.min(2, activeTabIndex + 1);
    setActiveTabIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, activeTabIndex - 1);
    setActiveTabIndex(newIndex);
  };
  const dummyFunction = () => {};

  return (
    <>
      <RegisterWords />
      <div className="flex h-screen -px-2 bg-[#fcfcfe] ">
        <Tabs
          align="center"
          index={activeTabIndex}
          onChange={(index) => handleTabChange(index)}
          variant="unstyled"
          colorScheme="purple"
          size="lg"
        >
          <div className="text-[#A62D82] w-[250px] text-2xl flex flex-col justify-end items-center absolute m-24 top-14 left-2/3">
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
              <p>
                {activeTabIndex === 0
                  ? "Basic Information"
                  : activeTabIndex === 1
                  ? "Identities and Interests"
                  : "Upload Photos"}
              </p>
            </div>
          </div>

          <div className="h-screen flex ml-[270px]">
            <TabPanels className="text-md">
              <TabPanel
                key={0}
                className="h-screen flex justify-center items-center"
              >
                {renderFormByTabIndex(0)}
              </TabPanel>
              <TabPanel
                key={1}
                className="h-screen flex justify-center items-center"
              >
                {renderFormByTabIndex(1)}
              </TabPanel>
              <TabPanel
                key={2}
                className="h-screen flex justify-center items-center"
              >
                {renderFormByTabIndex(2)}
              </TabPanel>
            </TabPanels>
          </div>
        </Tabs>
      </div>
      <div className="bottom-0 w-full h-112 p-5 bg-white shadow-md flex justify-end border-t-2">
        <ChakraButton
          name="← Back"
          variant="link"
          color="red"
          onClick={handlePrev}
        />
        <ChakraButton
          name={renderButtonLabel}
          color="red"
          rounded="full"
          type={renderButtonType}
          onClick={isLastTab ? handleNext : dummyFunction}
        />
      </div>
    </>
  );
}

export default TabSteps;
