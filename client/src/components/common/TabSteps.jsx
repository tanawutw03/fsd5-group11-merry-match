import { useState, useEffect } from "react";
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
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient.js";

function TabSteps() {
  const [userId, setUserId] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const isLastTab = activeTabIndex === 2;
  const [formData, setFormData] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  const handleFormChange = (newFormData) => {
    setStep1Data(newFormData); // Update step1Data when input fields change
  };

  // Use refs to store data for each step
  const step1DataRef = useRef({});
  const step2DataRef = useRef({});
  const step3DataRef = useRef({});

  const navigate = useNavigate();

  // State to store data entered in each step
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});

  function renderFormByTabIndex(tabIndex) {
    switch (tabIndex) {
      case 0:
        return <Step1Inputs onFormChange={setStep1Data} />;
      case 1:
        return <Step2Inputs />;
      case 2:
        return <Step3Inputs />;
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
        console.log(step1Data);

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
  const handleSubmit = async () => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      console.log("Sign-up Response:", { signUpData, error });

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("User signed up successfully:", signUpData.user.id);

        setUserId(signUpData.user.id);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      if (userId !== null) {
        console.log("userId:", userId);

        const insertUserData = async () => {
          try {
            const { data: insertData, error: insertError } = await supabase
              .from("profiles")
              .upsert({
                id: userId,
                username: formData.current.username,
                full_name: formData.current.name,
                country: formData.current.location?.value,
                city: formData.current.city?.value,
                email: formData.current.email,
                date_of_birth: formData.current.dob,
                updated_at: new Date(),
              })
              .select();

            console.log(insertData, insertError);

            if (insertError) {
              console.error("Error inserting user data:", insertError.message);
            } else {
              console.log("User data inserted successfully:", insertData);
            }
          } catch (error) {
            console.error("Error inserting user data:", error.message);
          }
        };

        insertUserData();
      }
    };

    checkUserAuthentication();
  }, [userId]);

  const stepperData = [
    { id: 1, title: "Basic Information" },
    { id: 2, title: "Identities and Interests" },
    { id: 3, title: "Upload Photos" },
  ];

  return (
    <>
      <div className="flex justify-center w-full">
        <NavBar
          useMenu={false}
          name="Login"
          onClick={handleClick}
          firstMenuName="Why Merry Match?"
          secondMenuName="How to Merry"
          onClickFirstMenu={() => navigate("/")}
          onClickSecondMenu={() => navigate("/")}
          showBell={false}
        />
      </div>
      <RegisterWords />
      <div className="min-w-[1440px] flex flex-col justify-between item-center bg-[#fcfcfe]  relative">
        <Tabs
          align="center"
          index={activeTabIndex}
          onChange={(index) => handleTabChange(index)}
          variant="unstyled"
          colorScheme="purple"
          size="lg"
        >
          <div className="text-[#A62D82] flex flex-col absolute -mt-[7%] right-[20%] text-2xl font-nunito">
            <TabList className="gap-5">
              {stepperData.map((item, index) => (
                <Tab
                  key={item.id}
                  className={`${
                    selectedTab === index
                      ? "h-20 w-fit p-4 pr-8 border border-[#A62D82] rounded-2xl flex justify-start items-center space-x-4"
                      : "w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center"
                  } `}
                  onClick={() => setSelectedTab(index)} // Set selected tab on click
                >
                  <h2
                    className={`w-12 h-12 rounded-2xl bg-gray-200 flex justify-center items-center text-2xl
                    font-bold text-${
                      selectedTab === index ? "#A62D82" : "gray-500"
                    }`}
                  >
                    {item.id}
                  </h2>
                  <div
                    className={`${
                      selectedTab === index
                        ? "flex flex-col justify-start"
                        : "hidden"
                    }`}
                  >
                    <p className="text-gray-700 text-xs font-medium text-left">
                      Step {item.id}/3
                    </p>
                    <p
                      className={`text-${
                        selectedTab === index ? "#A62D82" : "gray-700"
                      } text-base font-extrabold`}
                    >
                      {item.title}
                    </p>
                  </div>
                </Tab>
              ))}
            </TabList>
          </div>

          <div className="h-full ">
            <TabPanels className="text-md">
              <TabPanel key={0} className="">
                <Step1Inputs onFormChange={handleFormChange} />
              </TabPanel>
              <TabPanel key={1} className="">
                {renderFormByTabIndex(1)}
              </TabPanel>
              <TabPanel key={2} className="">
                {renderFormByTabIndex(2)}
              </TabPanel>
            </TabPanels>
          </div>
        </Tabs>
      </div>
      <div className="bottom-0 w-screen h-112 p-5 bg-white shadow-md flex justify-end border-t-2">
        <p className="flex justify-start items-center absolute left-20 bottom-12 text-base font-normal">
          <span className="text-gray-600">{activeTabIndex + 1}</span>
          <span className="text-gray-500">/3</span>
        </p>
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
          onClick={isLastTab ? handleSubmit : handleNext}
        />
      </div>
    </>
  );
}

export default TabSteps;
