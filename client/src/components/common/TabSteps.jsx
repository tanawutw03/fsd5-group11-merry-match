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

function TabSteps() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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

  return (
    <div className="h-fit w-1/2 flex justify-center m-24">
      <Tabs
        align="center"
        index={activeTabIndex}
        onChange={(index) => handleTabChange(index)}
        variant="unstyled"
        colorScheme="purple"
        size="lg"
      >
        <TabList className="text-[#A62D82]">
          <Tab>1</Tab>
          <Tab>2</Tab>
          <Tab>3</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="5px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels className="text-2xl text-[#A62D82]">
          <TabPanel>
            <p>{renderFormByTabIndex(activeTabIndex).formName}</p>
            {renderFormByTabIndex(activeTabIndex).form}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default TabSteps;
