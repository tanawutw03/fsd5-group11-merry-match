import { useEffect, useRef, useState } from "react";
import facebookIcon from "../assets/merryPackagePage/facebook-circle-fill.svg";
import instagramIcon from "../assets/merryPackagePage/instagram-fill.svg";
import twitterIcon from "../assets/merryPackagePage/twitter-fill.svg";
import logo from "../assets/merryPackagePage/logo.svg";
import NavBar from "../components/common/NavBar";
import { supabase } from "../utils/supabaseClient";
import ConfirmDeleteBtn from "../components/ConfirmDeleteBtn";
import PropTypes from "prop-types";
import PopUpProfile from "../components/PopUpProfile.jsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../app/userContext";
import axios from "axios";
import React from "react";
import { SimpleGrid, Card, CardBody, IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function UserProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [userProfileID, setUserProfileId] = useState(null);
  const [randomFileNames, setRandomFileNames] = useState([]);
  const API_PORT = "http://localhost:4008";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  let userProfile_id = null;

  const [formData, setFormData] = useState({
    id: "",
    full_name: "",
    date_of_birth: "",
    country: "",
    city: "",
    username: "",
    email: "",
    sex_identities: "",
    sex_preferences: "",
    racial_preferences: "",
    meeting_interest: "",
    hobbies: "",
    about_me: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API_PORT}/profile/api/v1/profile/${user.user.id}`
        );
        const data = response.data.data;

        if (response.status !== 200) {
          throw new Error(data.error || "Failed to fetch profile data");
        }

        if (data) {
          const avatarFileNames = data.avatar_url.map((avatar) => {
            const urlParts = avatar.publicUrl.split("/");
            return urlParts[urlParts.length - 1]; // Get the last part of the URL (file name)
          });
          console.log(`avatarFileNames:`, avatarFileNames);

          setFormData((prevFormData) => ({
            ...data,
            avatar_url: avatarFileNames,
          }));

          // setFormData(data);

          setSelectedFiles(data.avatar_url);
          setIsEditMode(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, []);

  const handleRandomFileNames = (names) => {
    setRandomFileNames(names);
  };

  const handleFileInputChange = () => {
    const files = Array.from(fileInputRef.current.files);
    const newSelectedFiles = files.slice(0, 5);

    // สร้างชื่อไฟล์แบบสุ่มสำหรับไฟล์ที่เลือกใหม่
    const randomFileNames = newSelectedFiles.map((file) => {
      const fileExt = file.name.split(".").pop();
      const randomString = Math.random().toString(36).substring(7);
      const randomFileName = `${randomString}.${fileExt}`;

      // สร้างออบเจกต์ที่มีไฟล์และชื่อของมัน
      return { file, name: randomFileName };
    });

    // ส่งชื่อไฟล์กลับไปยังคอมโพเนนต์แม่
    handleFormChange({ avatar_url: randomFileNames.map((file) => file.name) });

    // อัปเดตสถานะด้วยออบเจกต์ไฟล์และชื่อเดิม
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...randomFileNames,
    ]);

    setRandomFileNames((prevRandomFileNames) => [
      ...prevRandomFileNames,
      ...randomFileNames,
    ]);
  };

  console.log(`formData:`, formData);
  console.log(`selectedFiles:`, selectedFiles);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.patch(`${API_PORT}/user/updateProfile`, {
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        country: formData.country,
        city: formData.city,
        username: formData.username,
        email: formData.email,
        avatar_url: formData.avatar_url, // เปลี่ยนเป็นส่งเฉพาะชื่อไฟล์
        sex_identities: formData.sex_identities,
        sex_preferences: formData.sex_preferences,
        racial_preferences: formData.racial_preferences,
        meeting_interest: formData.meeting_interest,
        hobbies: formData.hobbies,
        about_me: formData.description,
        id: formData.id,
      });

      if (randomFileNames.length > 0) {
        console.log(`randomFileNames`, randomFileNames);
        for (const { file, name: fileName } of randomFileNames) {
          console.log("Final file name:", fileName);

          if (!file) {
            console.error(`File not found for ${fileName}`);
            continue;
          }

          console.log(`randomFileNames`, randomFileNames);

          const filePath = `${user.user.id}/${fileName}`; // เพิ่ม userId เข้าไปในเส้นทางไฟล์

          console.log(`filePath:`, filePath);
          const { data: uploadData, error: uploadError } =
            await supabase.storage.from("avatars").upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
            });

          console.log(`User avatar upload successfully:`, uploadData);
          if (uploadError) {
            console.error("Error uploading avatar:", uploadError.message);
          } else {
            console.log("Avatar uploaded successfully:", uploadData);
          }

          onClose();
        }
      }
    } catch (error) {
      console.error(error);
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Field name:", name);
    console.log("Field value:", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDeleteFile = (index) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file, i) => i !== index)
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar_url: prevFormData.avatar_url.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteAccount = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.user.id);

      if (error) {
        throw error;
      }
      setFormData({
        id: "",
        full_name: "",
        date_of_birth: "",
        country: "",
        city: "",
        username: "",
        email: "",
        sex_identities: "",
        sex_preferences: "",
        racial_preferences: "",
        meeting_interest: "",
        hobbies: "",
        about_me: "",
      });

      console.log("Profile deleted successfully");
      setShowDeleteConfirmation(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting profile:", error.message);
    }
  };

  return (
    <>
      <div className="nav-container flex justify-center items-center">
        <NavBar
          firstMenuName="Start Matching!"
          secondMenuName="Merry Membership"
          name="login"
          color="red"
          showBell={true}
          useMenu={user}
          onClickFirstMenu={() => navigate("/matching")}
          onClickSecondMenu={() => navigate("/package")}
          setUser={setUser}
          user={user}
        />
      </div>
      <div className="flex flex-col justify-center items-center w-screen relative">
        <div className="">
          <ConfirmDeleteBtn
            isOpen={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            onDelete={handleDeleteAccount}
          />
        </div>
        <div className=" w-[931px]  ">
          <div className="profile-title-container flex justify-between ">
            <div className=" gap-[37px] ">
              <p className="font-nunito text-[14px] text-[#7B4429] font-[600]">
                PROFILE
              </p>
              <p className="font-nunito text-[46px] text-[#a62d82] font-black">
                Let’s make profile <br />
                to let others know you
              </p>
            </div>
            <div className="flex flex-row justify-end items-end">
              <button
                className="profile-preview-btn flex justify-center items-center gap-[8px] w-[170px] font-nunito text-[16px font-bold  
                           rounded-[99px]  bg-[#ffe1ea] text-[#95002b] hover:bg-[#ffb1c8] active:bg-[#ff6390] shadow-sm h-12 p-[16px]"
                type="button"
              >
                <PopUpProfile
                  useMenu={false}
                  profileData={formData}
                  isRound="true"
                  variant="link"
                  colorScheme="red"
                  size="lg"
                  name="Preview Profile"
                />
              </button>
              <>
                <button
                  className="profile-update-btn  flex justify-center items-center gap-[8px] w-[170px] font-nunito text-[16px] font-bold  
                           rounded-[99px] bg-[#c70039] text-white hover:bg-[#ff1659] active:bg-[#95002b] shadow-sm h-12 p-[16px] ml-2"
                  type="button"
                  onClick={onOpen}
                >
                  Update Profile
                </button>

                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                  isCentered={true}
                  closeOnEsc={false}
                  closeOnOverlayClick={false}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent borderRadius="3xl">
                      <AlertDialogHeader className="border-solid border-b-[1px] border-[#e4e6ed] text-[18px] font-bold font-nunito">
                        Update Successfully
                      </AlertDialogHeader>

                      <AlertDialogBody className="font-nunito text-[#646d89]">
                        Your profile has been updated successfully
                      </AlertDialogBody>

                      <AlertDialogFooter mb={1} justifyContent="flex-end">
                        <button
                          className="py-[12px] px-[24px] text-[16px] font-semibold rounded-full shadow-sm font-nunito bg-[#c70039] text-white hover:bg-[#ff1659] active:bg-[#95002b]"
                          onClick={handleUpdateProfile}
                          ml={3}
                        >
                          Back to Page
                        </button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </>
            </div>
          </div>
          <form className="basic-info-con ">
            <label className="font-nunito text-[#a62d82] font-black text-[24px] mt-3 mb-3">
              Basic Information
            </label>
            <div className="flex flex-col justify-center ">
              <div className="flex justify-between marker items-center ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="name"
                    className="text-left font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px] px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="flex flex-col  ">
                  <label
                    htmlFor="dateOfBirth"
                    className="text-left  font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Date of birth
                  </label>
                  <input
                    type="text"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px]  px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>
              <div className="flex justify-between marker items-center  ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="location"
                    className="text-left  font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px] px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="flex flex-col  ">
                  <label
                    htmlFor="city"
                    className="text-left font-nunito text-[16px] text-[black] font-[600]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px]  px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>
              <div className="flex justify-between marker items-center ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="userName"
                    className="text-left  font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px] px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="flex flex-col  ">
                  <label
                    htmlFor="email"
                    className="text-left font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px]  px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>
            </div>
            <label className="font-nunito text-[#a62d82] font-black text-[24px] mt-3 mb-3">
              Identities and Interests
            </label>
            <div className="flex flex-col justify-center ">
              <div className="flex justify-between marker items-center ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="SexualIdentities"
                    className="text-left font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Sexual identities
                  </label>
                  <input
                    type="text"
                    id="sex_identities"
                    name="sex_identities"
                    value={formData.sex_identities || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px] px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="flex flex-col  ">
                  <label
                    htmlFor="SexualPreferences"
                    className="text-left  font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Sexual preferences
                  </label>
                  <input
                    type="text"
                    id="sex_preferences"
                    name="sex_preferences"
                    value={formData.sex_preferences || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px]  px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>
              <div className="flex justify-between marker items-center  ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="RacialPreferences"
                    className="text-left  font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Racial preferences
                  </label>
                  <input
                    type="text"
                    id="racial_preferences"
                    name="racial_preferences"
                    value={formData.racial_preferences || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px] px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="flex flex-col  ">
                  <label
                    htmlFor="MeetingInterests"
                    className="text-left font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Meeting interests
                  </label>
                  <input
                    type="text"
                    id="meeting_interest"
                    name="meeting_interest"
                    value={formData.meeting_interest || ""}
                    onChange={handleInputChange}
                    className="border-2 w-[450px]  px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>
              <div className="marker items-center  ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="HobbiesInterests"
                    className="text-left  font-nunito text-[16px] text-[black] font-[600]"
                  >
                    Hobbies / Interests (Maximum 10)
                  </label>
                  <input
                    type="text"
                    id="hobbies"
                    name="hobbies"
                    value={formData.hobbies || ""}
                    onChange={handleInputChange}
                    className="border-2 w-full px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="flex flex-col  ">
                  <label
                    htmlFor="confirmPassword"
                    className="text-left font-nunito text-[16px] text-[black] font-[600]"
                  >
                    About me (Maximum 150 characters)
                  </label>
                  <textarea
                    type="text"
                    id="about_me"
                    name="about_me"
                    value={formData.about_me || ""}
                    onChange={handleInputChange}
                    rows="4"
                    className="border-2 w-full px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                    placeholder="Write about your information here..."
                  ></textarea>
                </div>
              </div>
              <div className="w-full h-full flex flex-col justify-center items-start font-nunito mb-[30px] ">
                <div className="w-[930px] h-full flex flex-col justify-center items-start font-nunito mb-[30px] ">
                  <div className="flex flex-col justify-start items-start my-10">
                    <h1 className="text-3xl font-bold text-[#a62d82]">
                      Profile&nbsp;Pictures
                    </h1>
                    <h3 className="text-lg">
                      Upload&nbsp;at&nbsp;least&nbsp;2&nbsp;photos
                    </h3>
                  </div>

                  <SimpleGrid
                    columns={[1, 2, 3, 4, 5]}
                    spacing="0px"
                    className="w-full mb-[20px]"
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index}>
                        <Card
                          sx={{
                            w: "167px",
                            h: "167px",
                            rounded: "16px",
                          }}
                          onClick={() => fileInputRef.current.click()}
                          className="hover:cursor-pointer"
                        >
                          <CardBody className="flex flex-col justify-center items-center w-[167px] h-[167px] rounded-[16px] bg-[#f1f2f6]">
                            {selectedFiles[index] ? (
                              <>
                                <img
                                  src={
                                    selectedFiles[index].publicUrl ||
                                    URL.createObjectURL(
                                      selectedFiles[index].file
                                    )
                                  }
                                  alt={`Thumbnail ${index}`}
                                  className="w-full h-full object-cover rounded-[16px]"
                                />
                                <IconButton
                                  icon={<CloseIcon />}
                                  aria-label="Delete"
                                  color="white"
                                  bgColor="red.500"
                                  _hover={{ bgColor: "red.600" }}
                                  onClick={(event) =>
                                    handleDeleteFile(index, event)
                                  }
                                  style={{
                                    position: "absolute",
                                    top: -15,
                                    right: -15,
                                    borderRadius: "50%",
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <AddIcon color="purple" />
                                <h1 className="text-[#a62d82] text-xl absolute bottom-10">
                                  Upload photo
                                </h1>
                              </>
                            )}
                          </CardBody>
                        </Card>
                      </div>
                    ))}
                  </SimpleGrid>

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                    multiple
                    accept="image/*"
                  />
                </div>
                <div className=" flex justify-end  w-full ">
                  <button
                    className="choose-package-btn flex justify-center items-center  w-[170px] font-nunito text-[16px] text-[#646d89] font-extrabold h-12 p-[16px] mr-6"
                    type="button"
                    onClick={() => setShowDeleteConfirmation(true)}
                    // onClick={handleDeleteAccount}
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <footer>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center w-screen h-[371px] p-[48px,160px] bg-gray-100">
              <ul className="flex  flex-col justify-center items-center w-[1120px] h-[275px] flex-shrink-0">
                <li className="merry-match-logo ">
                  <img src={logo} />
                </li>
                <li className="font-nunito text-center text-[20px] text-[#646D89] font-[600px] leading-[30px]">
                  New generation of online dating website for everyone
                </li>
                <div className="flex flex-col items-center gap-[24px] pt-[24px] border-t-1 ">
                  <li className="font-nunito text-center text-[14px] text-[#9AA1B9] font-[500px] leading-[30px]">
                    copyright ©2022 merrymatch.com All rights reserved
                  </li>
                  <div className="flex flex-row gap-[16px] ">
                    <img
                      src={facebookIcon}
                      alt=""
                      className="p-[12px] rounded-[24px] bg-purple-500"
                    />

                    <img
                      src={instagramIcon}
                      alt=""
                      className="p-[12px]  rounded-[24px] bg-purple-500"
                    />

                    <img
                      src={twitterIcon}
                      alt=""
                      className="p-[12px] rounded-[24px] bg-purple-500"
                    />
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

UserProfilePage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default UserProfilePage;
