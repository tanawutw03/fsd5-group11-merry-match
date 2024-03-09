import NavBar from "../components/common/NavBar";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import locationIcon from "../assets/MerryListPage/locationIcon.svg";
import matchedLabel from "../assets/MerryListPage/matchedLabel.svg";
import notMatchedLabel from "../assets/MerryListPage/notMatchedLabel.svg";
import messageIcon from "../assets/MerryListPage/messageIcon.svg";
import redHeart from "../assets/MerryListPage/redHeart.svg"; //อยู่ในปุ่มที่คอมเมนท์ไว้
import logo from "../assets/merryPackagePage/logo.svg";
import facebookIcon from "../assets/merryPackagePage/facebook-circle-fill.svg";
import instagramIcon from "../assets/merryPackagePage/instagram-fill.svg";
import twitterIcon from "../assets/merryPackagePage/twitter-fill.svg";
import { useEffect, useState } from "react";
import { useUser } from "../app/userContext.js";
import UnmerryButton from "../components/UnmerryButton.jsx";
import axios from "axios";
import PopUpProfile from "../components/PopUpProfile.jsx";

function MerryListPage() {
  const navigate = useNavigate();
  const [merryList, setMerryList] = useState([]);
  {
    /* pagination
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [packages, setPackages] = useState([]);
  */
  }
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const [matchCount, setMatchCount] = useState();
  const [hasMoreData, setHasMoreData] = useState(true);
  const [displayedMerryLimit, setDisplayedMerryLimit] = useState();
  const [isUnmerryCalled, setIsUnmerryCalled] = useState(false);
  const baseURL = import.meta.env.DEV
    ? import.meta.env.VITE_BASE_URL_DEV
    : import.meta.env.VITE_BASE_URL_PROD;

  useEffect(() => {
    const id = user.user.id;
    setIsUnmerryCalled(false);
    async function fetchMerryListData() {
      try {
        const response = await axios.get(
          `${baseURL}/match/api/v1/merged_matches/${id}`
        );
        const data = response.data.data;
        console.log(data);
        setMerryList(data);
        if (data.length !== 5) {
          setHasMoreData(false);
        } else {
          setHasMoreData(true); // Set to true because there might be more data
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    async function fetchMerryLimitData() {
      try {
        const response = await axios.get(`${baseURL}/merryLimit/limit/` + id);
        const data = response.data.merry_limit;
        setDisplayedMerryLimit(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    async function fetchMerryCountData() {
      try {
        const response = await axios.get(`${baseURL}/merryLimit/count/` + id);
        const data = response.data.remainingCount;

        setMatchCount(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchMerryCountData();
    fetchMerryLimitData();
    fetchMerryListData();

    return () => {
      // Cleanup logic, if needed
    };
  }, [isUnmerryCalled]);

  {
    /* Calculate estimate time until midnight */
  }
  const now = new Date();
  const timeUntilMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
  const hoursLeft = Math.floor(timeUntilMidnight / (1000 * 60 * 60));

  const HandleisUnmerry = async (idUnmatch) => {
    const id = user.user.id;
    try {
      const response = await axios.put(`${baseURL}/match/api/v2/unmatch`, {
        userId: id,
        idUnmatch: idUnmatch,
      });
      console.log(response.data);
      setIsUnmerryCalled(true);

      // Update MerryList after unmatching
      const updatedMerryList = merryList.filter(
        (profile) => profile.id !== idUnmatch
      );
      setMerryList(updatedMerryList);

      // Optionally, you can update the UI or handle success response here
    } catch (error) {
      console.error("Error unmatching user:", error);
      // Optionally, you can handle error response here
    }
  };

  {
    /* Fetch packages data */
  }
  // useEffect(() => {
  //   async function fetchPackageData() {
  //     try {
  //       const { data, error } = await supabase
  //         .from("packages")
  //         .select("merry_limit");

  //       if (error) {
  //         console.error("Error fetching package data:", error.message);
  //         return;
  //       } else {
  //         setPackages(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching package data:", error.message);
  //     }
  //   }
  //   fetchPackageData();
  // }, []);

  // const userPackage = packages.find((p) => p.user_id === user.user.id);

  const handleChatroom = (profile) => {
    console.log(`Clicked`);
    console.log(`profileData:`, profile);
    navigate("/matching", { state: { profileData: profile } });
  };

  return (
    <>
      {/* Navbar Section */}
      <NavBar
        firstMenuName="Start Matching!"
        secondMenuName="Merry Membership"
        name="login"
        color="red"
        showBell="true"
        useMenu="true"
        onClickFirstMenu={() => navigate("/matching")}
        onClickSecondMenu={() => navigate("/package")}
      />

      {/* Header Section */}
      <main className="w-screen bg-[#fcfcfe] flex justify-center font-nunito">
        <section className="w-[1440px] bg-[#fcfcfe] flex justify-center">
          <div className="w-[930px]  mt-[80px]">
            <section className="bg-[#fcfcfe] flex justify-between items-end mb-[80px]">
              <div className="text-[#a62d82] text-[46px] font-black">
                <p className="text-[14px] text-[#7b4429] font-medium">
                  MERRY LIST
                </p>
                <h1>Let’s know each other</h1>
                <h1>with Merry!</h1>
              </div>
              <div className="px-[24px]">
                <div className="text-[16px] flex">
                  <p className="text-[#646d89] mr-[10px]">Merry limit today</p>
                  <p className="text-[#ff1659]">
                    {matchCount}/{displayedMerryLimit}
                  </p>
                </div>
                <p className="text-end text-[#9aa1b9] text-[12px]">
                  Reset in {hoursLeft}h...
                </p>
              </div>
            </section>

            {/* Left Content Section */}
            <section className="h-fit ">
              {merryList.map((profile, index) => (
                <div
                  key={index}
                  className="flex justify-evenly border-solid border-b-[1px] border-[#e4e6ed] mb-[24px] pb-[40px] pt-[16px]"
                >
                  <section className="flex w-[674px]">
                    {profile.avatar_url.length > 0 ? (
                      <img
                        src={profile.avatar_url[0].publicUrl}
                        alt="user's profile pic"
                        className="mr-[40px] rounded-3xl"
                        style={{
                          width: "187px",
                          height: "187px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src=""
                        alt="Placeholder"
                        className="mr-[40px] rounded-3xl"
                        style={{
                          width: "187px",
                          height: "187px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <div>
                      <section className="flex justify-start pb-[24px]">
                        <div className="flex mr-[16px]">
                          <p className="text-[#2a2e3f] text-[24px] font-bold mr-[10px]">
                            NAME
                          </p>
                          <p className="text-[#646d89] text-[24px] font-bold">
                            {profile.full_name}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={locationIcon}
                            alt="location icon"
                            className="w-[16px] mr-[6px]"
                          />
                          <p className="text-[#646d89] text-[16px]">
                            {profile.country}
                          </p>
                        </div>
                      </section>
                      <section className="text-[16px] flex">
                        <div className="text-[#2a2e3f] w-[167px]">
                          <p className="pb-[10px]">Sexual identities</p>
                          <p className="pb-[10px]">Sexual preferences</p>
                          <p className="pb-[10px]">Racial preferences</p>
                          <p className="pb-[10px]">Meeting interests</p>
                        </div>
                        <div className="text-[#646d89]">
                          <p className="pb-[10px]">
                            {profile.sex_identities.charAt(0).toUpperCase() +
                              profile.sex_identities.slice(1)}
                          </p>
                          <p className="pb-[10px]">
                            {profile.sex_preferences.charAt(0).toUpperCase() +
                              profile.sex_preferences.slice(1)}
                          </p>
                          <p className="pb-[10px]">
                            {profile.racial_preferences
                              .charAt(0)
                              .toUpperCase() +
                              profile.racial_preferences.slice(1)}
                          </p>
                          <p className="pb-[10px]">
                            {profile.meeting_interest.charAt(0).toUpperCase() +
                              profile.meeting_interest.slice(1)}
                          </p>
                        </div>
                      </section>
                    </div>
                  </section>

                  {/* Right Content Section */}
                  <section className="flex flex-col items-end">
                    {profile.source === "mutual_matches" ? (
                      <img
                        src={matchedLabel}
                        alt="Match"
                        className="mb-[24px]"
                      />
                    ) : (
                      <img
                        src={notMatchedLabel}
                        alt="Not Match"
                        className="mb-[24px]"
                      />
                    )}

                    <div className="flex justify-end w-[176px] gap-[16px] font-nunito">
                      <Tooltip
                        bg="gray.400"
                        label="Go to chat"
                        aria-label="A tooltip"
                        borderRadius="md"
                      >
                        <button
                          className={`w-[48px] h-[48px] bg-white shadow-md flex justify-center items-center rounded-2xl ${
                            profile.source === "mutual_matches" ? "" : "hidden"
                          }`}
                        >
                          <img
                            src={messageIcon}
                            alt="message icon"
                            className="w-[24px] h-[24px]"
                            onClick={() => handleChatroom(profile)}
                          />
                        </button>
                      </Tooltip>
                      <Tooltip
                        bg="gray.400"
                        label="See profile"
                        aria-label="A tooltip"
                        borderRadius="md"
                      >
                        <button className="w-[48px] h-[48px] shadow-md flex justify-center items-center rounded-2xl">
                          <PopUpProfile
                            useMenu={true}
                            profileData={profile}
                            isRound="false"
                            variant="ghost"
                            colorScheme="black"
                            size="lg"
                          />
                        </button>
                      </Tooltip>

                      <UnmerryButton
                        isUnmerry={() => HandleisUnmerry(profile.id)}
                      />

                      {/* merry back button
                      <Tooltip
                        bg="gray.400"
                        label="Merry"
                        aria-label="A tooltip"
                        borderRadius="md"
                      >
                        <button className="w-[48px] h-[48px] bg-white shadow-md flex justify-center items-center rounded-2xl">
                          <img
                            src={redHeart}
                            alt="merry icon"
                            className="w-[48px] h-[48px] ml-[5px] mt-[5px]"
                          />
                        </button>
                      </Tooltip>*/}
                    </div>
                  </section>
                </div>
              ))}
            </section>
          </div>
        </section>
      </main>
      {/*Pagination*/}
      {/*<div className="w-full flex flex-col justify-center items-center font-nunito bg-[#fcfcfe] gap-5">
        <div>Page {page}</div>
        <div className="mb-[100px]">
          <button
            className="py-[12px] px-[24px] text-[16px] font-semibold rounded-full shadow-sm m-[10px] bg-[#ffe1ea] text-[#95002b] hover:bg-[#ffb1c8] active:bg-[#ff6390] disabled:bg-[#e4e6ed] disabled:text-[#9aa1b9]"
            onClick={() => setPage(page - 1)}
            disabled={page === 1} // Disable the "Back" button when on the first page
          >
            Back
          </button>
          <button
            className="py-[12px] px-[24px] text-[16px] font-semibold rounded-full shadow-sm m-[10px] bg-[#ffe1ea] text-[#95002b] hover:bg-[#ffb1c8] active:bg-[#ff6390] disabled:bg-[#e4e6ed] disabled:text-[#9aa1b9]"
            onClick={() => setPage(page + 1)}
            disabled={!hasMoreData} // Disable the "Next" button when there's no more data
          >
            Next
          </button>
        </div>
                    </div>*/}
      {/* Footer Section */}
      <footer className="flex w-screen h-96 px-8 justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center max-w-screen-lg w-full h-64 justify-between">
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" />
            <div className="text-gray-700 text-center font-nunito text-[20px] font-semibold leading-150">
              New generation of online dating website for everyone
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-gray-600 font-nunito text-[14px] font-medium leading-150">
              copyright ©2022 merrymatch.com All rights reserved
            </div>
            <div className="flex items-center my-[10px] gap-4">
              <img
                src={facebookIcon}
                alt="Facebook"
                className="p-[12px] rounded-[24px] bg-[#a62d82]"
              />
              <img
                src={instagramIcon}
                alt="Instagram"
                className="p-[12px] rounded-[24px] bg-[#a62d82]"
              />
              <img
                src={twitterIcon}
                alt="Twitter"
                className="p-[12px] rounded-[24px] bg-[#a62d82]"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MerryListPage;
