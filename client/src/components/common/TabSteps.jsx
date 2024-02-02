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

  function renderFormByTabIndex(
    tabIndex,
    setStep1Data,
    setStep2Data,
    setStep3Data
  ) {
    switch (tabIndex) {
      case 0:
        return { form: <Step1Inputs setData={setStep1Data} /> };
      case 1:
        return { form: <Step2Inputs setData={setStep2Data} /> };
      case 2:
        return { form: <Step3Inputs setData={setStep3Data} /> };
      default:
        return { form: null }; // Handle other cases or return null
    }
  }

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

          <div className="h-screen flex ml-[270px]">
            <TabPanels className="text-md">
              {[setStep1Data, setStep2Data, setStep3Data].map(
                (setFunction, i) => (
                  <TabPanel
                    key={i}
                    className="h-screen flex justify-center items-center"
                  >
                    {
                      renderFormByTabIndex(
                        activeTabIndex,
                        setStep1Data,
                        setStep2Data,
                        setStep3Data
                      ).form
                    }{" "}
                  </TabPanel>
                )
              )}
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
