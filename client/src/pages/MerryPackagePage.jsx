import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/common/NavBar";
import logo from "../assets/merryPackagePage/logo.svg";
import fillCheckbox from "../assets/merryPackagePage/checkbox-circle-fill.svg";
import facebookIcon from "../assets/merryPackagePage/facebook-circle-fill.svg";
import instagramIcon from "../assets/merryPackagePage/instagram-fill.svg";
import twitterIcon from "../assets/merryPackagePage/twitter-fill.svg";
import { supabase } from "../utils/supabaseClient";
// import stripe from "stripe";

import { Spinner } from "@chakra-ui/react";

function PackagePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [session, setSession] = useState(null);
  const [userProfileId, setUserProfileId] = useState(null);
  const [userProfileEmail, setUserProfileEmail] = useState(null);
  const [userProfileFullname, setUserProfileFullname] = useState(null);
  const [userProfileCity, setUserProfileCity] = useState(null);
  const [userProfileCountry, setUserProfileCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_PORT = "http://localhost:4008";

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setUserProfileId(session.user.id);
        setUserProfileEmail(session.user.email);
        // localStorage.setItem('userProfileId', session.user.id);
        console.log("OnAuth_UserProfileID : ", session.user.id);
        console.log("OnAuth_UserProfileEmail: ", session.user.email);
        console.log("OnAuth_User: ", session.user);
      } else {
        setUserProfileId(null);
        // Clear userProfileId from local storage if user is not authenticated
        localStorage.removeItem("userProfileId");
      }
    });

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_PORT}/admin/package`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataProfiles = async () => {
      try {
        const resProfile = await axios.get(
          `${API_PORT}/user/profile/${userProfileId}`
        );
        const profileFullname = resProfile.data[0].full_name;
        const profileCity = resProfile.data[0].city;
        const profileCountry = resProfile.data[0].country;
        setUserProfileFullname(profileFullname);
        setUserProfileCity(profileCity);
        setUserProfileCountry(profileCountry);
        setDataProfile(resProfile.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    if (userProfileId) {
      fetchDataProfiles();
    }
  }, [userProfileId]);

  const handlePackageSelection = (packageId, packageName, packagePrice) => {
    setSelectedPackage({ packageId, packageName, packagePrice });

    const sentOrderData = async () => {
      try {
        const data = {
          user: {
            name: `${userProfileFullname}`,
            address: `${userProfileCity}, ${userProfileCountry}`,
            profile_id: userProfileId,
            email: userProfileEmail,
          },
          product: {
            name: packageName,
            price: packagePrice,
            quantity: 1,
            package_id: packageId,
          },
        };

        const response = await axios.post(`${API_PORT}/checkout`, data);
        const resData = response.data;
        const sessionId = resData.session_id;
        const { data: urlData, error: errorUrlData } = await supabase
          .from("orders")
          .select("stripe_url")
          .eq("session_id", sessionId);

        if (urlData && urlData.length > 0) {
          const stripeUrl = urlData[0].stripe_url;

          setTimeout(() => {
            setLoading(false);
            console.log(stripeUrl);
            window.location.href = stripeUrl;
          }, 6000);
        } else {
          console.log("No payment link found.");
        }
      } catch (error) {
        console.log("error message: ", error);
      } finally {
        setLoading(false);
      }
    };

    // stripe.redirectToCheckout({ sessionId });
    sentOrderData();
  };

  return (
    <>
      <div className="nav-container flex justify-center items-center">
        <NavBar
          firstMenuName="Start Matching!"
          secondMenuName="Merry Membership"
          name="login"
          color="red"
          showBell
          useMenu
          onClickFirstMenu={() => navigate("/matching")}
          onClickSecondMenu={() => navigate("/package")}
        />
      </div>

      <section className="relative">
        {loading && ( // Show spinner if loading state is true
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}

        <div className="package-container flex flex-col mt-[80px] mb-[160px] ml-[160px] mr-[160px] font-nunito">
          <p className="merry-membership-title text-[14px] text-[#7B4429]">
            MERRY MEMBERSHIP
          </p>

          <div className="merry-membership-ads text-[46px] text-[#a62d82] font-black">
            <p>Be part of Merry Membership</p>
            <p>to make more Merry!</p>
          </div>
          <div className="flex justify-center items-center max-[1120px]:flex-col gap-[24px] mt-[80px]">
            {data.map((packages, index) => (
              <div
                key={index}
                className="basic-package-con flex flex-col items-start w-[357px] p-[40px] gap-[24px] rounded-[32px] border-[1px] border-solid border-gray-400 bg-[#FFF]"
              >
                <ul>
                  <div className="basic-packagese">
                    <li className="card-icon mb-[24px]">
                      <img
                        src={packages.iconurl}
                        alt=""
                        className="w-[36px] h-[36px] flex-shrink-0"
                      />
                    </li>
                    <li className="card-category font-nunito text-[32px] font-bold text-[#411032]">
                      {packages.name}
                    </li>
                    <li className="card-paid-condition mb-[24px]">
                      <span className="card-package-price font-nunito text-[20px] font-bold text-gray-900">
                        THB {packages.price} /month
                      </span>
                    </li>

                    <li className="fill-checkbox-icon">
                      <div className="flex">
                        <img src={fillCheckbox} alt="" />
                        <p>‘Merry’ more than a daily limited </p>
                      </div>
                      <div className="flex pb-[36px]">
                        <img src={fillCheckbox} alt="" />
                        <p>Up to {packages.merry_limit} Merry per day</p>
                      </div>
                    </li>
                    <button
                      className="choose-package-btn flex justify-center items-center gap-[8px] w-[277px] shadow-setShadow01 h-12 p-[16px] rounded-[99px]
                                                 bg-[#ffe1ea] text-[#95002b] hover:bg-[#ffb1c8] active:bg-[#ff6390] disabled:bg-[#e4e6ed] disabled:text-[#9aa1b9]"
                      type="button"
                      onClick={() =>
                        handlePackageSelection(
                          packages.package_id,
                          packages.name,
                          packages.price
                        )
                      } // Pass the package id and name to the handler
                      disabled={
                        selectedPackage &&
                        selectedPackage.packageId !== packages.package_id
                      } // Disable button if already selected
                    >
                      <label
                        className="font-nunito text-center text-[16px] font-bold p-[12px,24px]"
                        htmlFor="ChoosePackageSection"
                      >
                        {selectedPackage &&
                        selectedPackage.packageId === packages.package_id ? (
                          <Spinner size="md" color="red.500" />
                        ) : (
                          "Choose Package"
                        )}
                      </label>
                    </button>
                  </div>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-screen h-[371px] p-[48px,160px] bg-gray-100">
            <ul className="flex  flex-col justify-center items-center w-[1120px] h-[275px] flex-shrink-0">
              <li className="merry-match-logo ">
                <img src={logo} alt="logo" />
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
                    alt="Facebook Icon"
                    className="p-[12px] rounded-[24px] bg-purple-500"
                  />

                  <img
                    src={instagramIcon}
                    alt="Instagram Icon"
                    className="p-[12px]  rounded-[24px] bg-purple-500"
                  />

                  <img
                    src={twitterIcon}
                    alt="Twitter Icon"
                    className="p-[12px] rounded-[24px] bg-purple-500"
                  />
                </div>
              </div>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PackagePage;
