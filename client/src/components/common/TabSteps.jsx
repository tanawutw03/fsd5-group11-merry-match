import { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";
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
  const [randomFileNames, setRandomFileNames] = useState([]);
  const [isDataInserted, setIsDataInserted] = useState(false);
  const [areFilesUploaded, setAreFilesUploaded] = useState(false);

  const handleRandomFileNames = (names) => {
    setRandomFileNames(names);
  };

  const handleFormChange = (newFormData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...newFormData,
      avatar_url: [
        ...(prevFormData.avatar_url || []), // Ensure it's an array even if undefined
        ...(newFormData.avatar_url || []),
      ],
    }));
  };

  // Use refs to store data for each step
  const step1DataRef = useRef({});
  const step2DataRef = useRef({});
  const step3DataRef = useRef({});

  const navigate = useNavigate();

  // State to store data entered in each step
  const [step1Data] = useState({});
  const [step2Data] = useState({});
  const [step3Data] = useState({});

  const renderButtonLabel = isLastTab ? "Submit" : "Next Step";
  const renderButtonType = isLastTab ? "submit" : "button";

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
  };

  const handleNext = () => {
    console.log(formData);
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
        setIsDataInserted(true);
        setAreFilesUploaded(true);
        console.log("userId:", userId);
        try {
          const { data: insertData, error: insertError } = await supabase
            .from("profiles")
            .upsert({
              id: userId,
              updated_at: new Date(),
              username: formData.username,
              full_name: formData.name,
              avatar_url: formData.avatar_url,
              country: formData.location,
              city: formData.city,
              email: formData.email,
              sex_identities: formData.sex_identities,
              sex_preferences: formData.sex_preferences,
              racial_preferences: formData.racial_preferences,
              meeting_interest: formData.meeting_interest,
              hobbies: formData.hobbies,
              date_of_birth: formData.dob,
            })
            .select();

          if (insertError) {
            console.error("Error inserting user data:", insertError.message);
          } else {
            console.log("User data inserted successfully:", insertData);
            // Upload avatars

            if (randomFileNames.length > 0) {
              console.log(`randomFileNames`, randomFileNames);
              for (const { file, name: fileName } of randomFileNames) {
                console.log("Final file name:", fileName); // Log file name

                if (!file) {
                  console.error(`File not found for ${fileName}`);
                  continue; // Skip to the next iteration
                }

                const filePath = `${userId}/${fileName}`;
                const { data: uploadData, error: uploadError } =
                  await supabase.storage
                    .from("avatars")
                    .upload(filePath, file, {
                      cacheControl: "3600",
                      upsert: false,
                    });

                console.log(`User avatar upload successfully:`, uploadData);
                if (uploadError) {
                  console.error("Error uploading avatar:", uploadError.message);
                } else {
                  console.log("Avatar uploaded successfully:", uploadData);
                }
              }
            }
          }
        } catch (error) {
          console.error("Error inserting user data:", error.message);
        }
      }
    };

    checkUserAuthentication();
  }, [userId, randomFileNames, formData]);

  const handleSubmit = async () => {
    try {
      console.log("Form Data:", formData);

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
        setIsDataInserted(false);
        setAreFilesUploaded(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (isDataInserted && areFilesUploaded) {
      alert("Registration Successful");
      navigate("/");
    }
  }, [isDataInserted, areFilesUploaded, navigate]);

  const stepperData = [
    { id: 1, title: "Basic Information" },
    { id: 2, title: "Identities and Interests" },
    { id: 3, title: "Upload Photos" },
  ];

  return (
    <>
      <div className="flex flex-col h-screen justify-between">
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

        <Tabs
          align=""
          index={activeTabIndex}
          onChange={(index) => handleTabChange(index)}
          variant="unstyled"
          colorScheme="purple"
          size="lg"
        >
          <div className="flex">
            <RegisterWords />
            <TabList className="gap-5 w-1/2 flex justify-end items-end pr-32">
              {stepperData.map((item, index) => (
                <Tab
                  key={item.id}
                  className={`${
                    activeTabIndex === index
                      ? "h-20 w-fit p-4 pr-8 border border-[#A62D82] rounded-2xl flex justify-start items-center space-x-4"
                      : "w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center"
                  } `}
                  onClick={() => setActiveTabIndex(index)} // Set selected tab on click
                >
                  <h2
                    className={`w-12 h-12 rounded-2xl bg-gray-200 flex justify-center items-center text-2xl
                    font-bold text-${
                      activeTabIndex === index ? "#A62D82" : "gray-500"
                    }`}
                  >
                    {item.id}
                  </h2>
                  <div
                    className={`${
                      activeTabIndex === index
                        ? "flex flex-col justify-start"
                        : "hidden"
                    }`}
                  >
                    <p className="text-gray-700 text-xs font-medium text-left">
                      Step {item.id}/3
                    </p>
                    <p
                      className={`text-${
                        activeTabIndex === index ? "#A62D82" : "gray-700"
                      } text-base font-extrabold`}
                    >
                      {item.title}
                    </p>
                  </div>
                </Tab>
              ))}
            </TabList>
          </div>

          <TabPanels className="text-md">
            <TabPanel key={0} className="flex justify-center items-center">
              <Step1Inputs
                formData={formData}
                setFormData={setFormData}
                onFormChange={handleFormChange}
              />
            </TabPanel>
            <TabPanel key={1} className="flex justify-center items-center">
              <Step2Inputs
                formData={formData}
                setFormData={setFormData}
                onFormChange={handleFormChange}
              />
            </TabPanel>
            <TabPanel key={2} className="flex justify-center items-center">
              <Step3Inputs
                formData={formData}
                setFormData={setFormData}
                onFormChange={handleFormChange}
                onRandomFileNames={handleRandomFileNames}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <div className="flex justify-end">
          <p className="flex justify-start items-center absolute left-20 bottom-12 text-base font-normal">
            <span className="text-gray-600">{activeTabIndex + 1}</span>
            <span className="text-gray-500">/3</span>
          </p>
          <ChakraButton
            name="← Back"
            variant="link"
            onClick={handlePrev}
            colorScheme="gray"
          />
          <ChakraButton
            name={renderButtonLabel}
            rounded="88px"
            type={renderButtonType}
            onClick={isLastTab ? handleSubmit : handleNext}
            colorScheme="red"
            variant="link"
          />
        </div>
      </div>
    </>
  );
}

export default TabSteps;
