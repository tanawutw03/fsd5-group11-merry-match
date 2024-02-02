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
  const formDataRef = useRef({});

  // State to store data entered in each step
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});

  const renderButtonLabel = isLastTab ? "Submit" : "Next Step";
  const renderButtonType = isLastTab ? "submit" : "button";

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
  };

  const handleNext = () => {
    if (activeTabIndex === 0) {
      // Save data from Step 1
      const step1Data = {
        name: formDataRef.current.name,
        location: formDataRef.current.location?.value,
        username: formDataRef.current.username,
        password: formDataRef.current.password,
        dob: formDataRef.current.dob,
        city: formDataRef.current.city?.value,
        email: formDataRef.current.email,
        confirmPassword: formDataRef.current.confirmPassword,
      };
      setStep1Data(step1Data);
    } else if (activeTabIndex === 1) {
      // Save data from Step 2
      setStep2Data(/* Extract data from Step 2 component */);
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
            onNext={isLastTab ? undefined : handleNext}
          />
        </div>
      </div>
    </>
  );
}

export default TabSteps;
