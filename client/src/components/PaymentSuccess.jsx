import React, { useEffect, useState } from "react";
import correctCheck from "../assets/PaymentPage/CorrectCheck.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../app/userContext.js";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const [dataPackage, setDataPackage] = useState({});
  const baseURL = import.meta.env.DEV
    ? import.meta.env.VITE_BASE_URL_DEV
    : import.meta.env.VITE_BASE_URL_PROD;

  useEffect(() => {
    console.log(user.user.id);
    async function fetchPackageData() {
      try {
        const response = await axios.get(
          `${baseURL}}/userPackage/${user.user.id}`
        );
        const packageData = response.data[0];
        setDataPackage(packageData);
      } catch (error) {
        console.error("Error fetching package data:", error.message);
      }
    }
    fetchPackageData();
  }, [user.user.id]);

  {
    /*calculate date*/
  }
  const currentDate = new Date();

  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 30);

  const formatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const startDateString = currentDate.toLocaleDateString(
    "en-GB",
    formatOptions
  );
  const endDateString = endDate.toLocaleDateString("en-GB", formatOptions);

  return (
    <>
      {/* Left Section */}
      <div className="payment-success-container flex w-screen justify-center items-center border border-solid border-[white] font-nunito">
        <card className="flex flex-col justify-center items-start w-[641px] h-screen">
          <img
            src={correctCheck}
            className="flex w-[64px] h-[64px] my-[40px]"
          />
          <p className="text-[14px] text-[#7b4429] font-[600] leading-[21px]">
            PAYMENT SUCCESS
          </p>
          <h1 className="text-[46px] text-[#a62d82] font-black leading-[58px]">
            Welcome Merry Membership!
            <br />
            Thank you for joining us
          </h1>
          <div className="flex flex-row mt-[100px]">
            <button
              className="choose-package-btn flex justify-center items-center w-[170px] text-[16px] font-semibold rounded-full shadow-md font-nunito bg-[#ffe1ea] text-[#95002b] hover:bg-[#ffb1c8] active:bg-[#ff6390] h-12 p-[16px] mr-6"
              type="button"
              onClick={() => navigate("/homepage")}
              // onClick={handlePaymentConfirm}
            >
              Back to home
            </button>

            <button
              className="choose-package-btn flex justify-center items-center  w-[170px] text-[16px] font-semibold rounded-full shadow-md font-nunito bg-[#c70039] text-white hover:bg-[#ff1659] active:bg-[#95002b] h-12 p-[16px] mr-6"
              type="button"
              onClick={() => navigate("/usermembership")}
              // onClick={handlePaymentConfirm}
            >
              Check Membership
            </button>
          </div>
        </card>

        {/* Right Section */}
        <div className="text-white w-[357px] h-[454px] border rounded-3xl bg-gradient-to-r from-[#742138] from-20% to-[#a878bf] to-95% ml-28 mt-28 border-gray-200 grid grid-rows-[25%_20%_20%_10%_1%_24%]">
          <div className="ml-10 mt-10 w-[60px] h-[60px] rounded-2xl bg-gray-100 flex justify-center items-center">
            <img
              src={dataPackage.iconurl}
              alt="package icon"
              className="w-[36px] h-[36px]"
            />
          </div>
          <div className="ml-10  text-[32px] font-bold">
            {dataPackage.name}
            <div className="text-[20px] font-normal">
              {" "}
              {dataPackage.name === "default"
                ? "Free"
                : `THB ${dataPackage.price}.00`}
              <span className="text-[16px] font-light"> /Month</span>
            </div>
          </div>
          <div className="ml-10 flex">
            <img
              src={correctCheck}
              alt="success icon"
              className="w-[24px] h-[24px] mr-[12px]"
            />
            <p>‘Merry’ more than a daily limited</p>
          </div>
          <div className="ml-10 -mt-14 flex">
            <img
              src={correctCheck}
              alt="success icon"
              className="w-[24px] h-[24px] mr-[12px]"
            />
            <p>Up to {dataPackage.merry_limit} Merry per day</p>
          </div>
          <hr className=" border-gray-300 ml-10 mr-10 -mt-10" />
          <div className="ml-10 mt-10 grid-cols-2">
            <div className="flex justify-between -mt-10 ">
              <div className="flex text-purple-200 ">Start Membership</div>
              <div className="flex mr-10 ">
                {" "}
                {dataPackage.name === "default"
                  ? "Forever"
                  : `${startDateString}`}
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex text-purple-200 ">Next billing</div>
              <div className="flex mr-10">
                {" "}
                {dataPackage.name === "default"
                  ? "Forever"
                  : `${endDateString}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
