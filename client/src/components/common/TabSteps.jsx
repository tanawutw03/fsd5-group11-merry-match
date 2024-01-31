import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  TabIndicator,
} from "@chakra-ui/react";

function TabSteps() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    // Extract the tab index from the current route
    const tabIndex = Number(location.pathname.replace("/register", "")) - 1;
    console.log(tabIndex);

    // Set the active tab index
    setActiveTabIndex(tabIndex >= 0 ? tabIndex : 0);
  }, [location.pathname]);

  const handleTabChange = (index) => {
    console.log("Current tab index:", index);

    // Navigate based on the tab index (add 1 as the route starts from 1)
    navigate(`/register${index + 1}`);

    // Set the active tab index after navigation
    setActiveTabIndex(index);
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
            <p>Basic Information</p>
          </TabPanel>
          <TabPanel>
            <p>Identities and Interests</p>
          </TabPanel>
          <TabPanel>
            <p>Upload Photos</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default TabSteps;
