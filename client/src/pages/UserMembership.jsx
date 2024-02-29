/* eslint-disable react/no-unescaped-entities */
import logofooter from "../assets/NonUserHomePage/logofooter.png";
import fb from "../assets/NonUserHomePage/fb.png";
import ig from "../assets/NonUserHomePage/ig.png";
import tw from "../assets/NonUserHomePage/tw.png";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import PropTypes from "prop-types";
import { useUser } from "../app/userContext.js";
import { useState, useEffect } from "react";
import CardVisa from "../assets/UserMembership/CardVisa.png";
import checkboxcircle from "../assets/UserMembership/checkbox-circle-fill.png";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function UserMembership() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const [dataPackage, setDataPackage] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [lastBill, setLastBill] = useState();

  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log(user.user.id);
    async function fetchPackageData() {
      try {
        const response = await axios.get(
          `http://localhost:4008/userPackage/${user.user.id}`
        );
        const packageData = response.data[0];
        setDataPackage(packageData);
      } catch (error) {
        console.error("Error fetching package data:", error.message);
      }
    }
    async function fetchHistoryData() {
      try {
        const response = await axios.get(
          `http://localhost:4008/userPackage/history/${user.user.id}`
        );
        const historyData = response.data;
        setHistory(historyData);
        const last = handlelastBill(historyData[0].created);
        setLastBill(last);
        console.log("lastData", last);
        console.log("lastbillData", lastBill);
        console.log("historyData", history);
      } catch (error) {
        console.error("Error fetching package data:", error.message);
      }
    }
    fetchHistoryData();
    fetchPackageData();
  }, [user.user.id]);
  // Logging the updated state value outside of useEffect to ensure it reflects the updated value

  const handleClick = () => {
    navigate("/login");
  };

  const handlePaymentEdit = () => {
    navigate("/payment");
  };

  const handleCancelPackage = () => {
    setShowCancelModal(true);
  };

  const handlelastBill = (inputText) => {
    // Split the input text by spaces to separate date and time
    const parts = inputText.split(" ");

    // Extract the date part
    const datePart = parts[0];

    // Split the date part by "/"
    const dateParts = datePart.split("/");

    // Create a Date object with the extracted date
    const currentDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    );

    // Add 30 days to the current date
    currentDate.setDate(currentDate.getDate() + 30);

    // Get the day, month, and year components of the new date
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = currentDate.getFullYear();

    // Format the date as "DD/MM/YYYY"
    const formattedDate =
      (day < 10 ? "0" + day : day) +
      "/" +
      (month < 10 ? "0" + month : month) +
      "/" +
      year;
    return formattedDate;
  };

  const handleCancelConfirmation = async () => {
    try {
      // Make an Axios PUT request to cancel the package
      const response = await axios.put(
        `http://localhost:4008/userPackage/cancel/${user.user.id}`
      );

      // Check if the cancellation was successful
      if (response.status === 200) {
        console.log("Package cancellation successful");

        // Close the modal
        setShowCancelModal(false);
      } else {
        console.error("Error cancelling the package");
      }
    } catch (error) {
      console.error("Error cancelling the package:", error.message);
    }
  };

  return (
    <div className=" w-screen bg-white z-auto flex flex-col items-center">
      {user ? (
        <NavBar
          useMenu={user}
          onClick={handleClick}
          firstMenuName="Start Matching!"
          secondMenuName="Merry Membership"
          onClickFirstMenu={() => navigate("/matching")}
          onClickSecondMenu={() => navigate("/package")}
          showBell={true}
          setUser={setUser}
          user={user}
          name="userAvatar"
        />
      ) : (
        <NavBar
          useMenu={false}
          name="Login"
          onClick={handleClick}
          firstMenuName="Why Merry Match?"
          secondMenuName="How to Merry"
          onClickFirstMenu={() => scrollToSection("WhyMerry")}
          onClickSecondMenu={() => scrollToSection("HowToMerry")}
          showBell={false}
          setUser={setUser}
          user={user}
        />
      )}
      <div className="MerryMembershipSection w-[1440px]  pl-[254px] pr-[255px] mt-[50px] pb-28 bg-white flex-col justify-start items-center  inline-flex">
        <div className="MerryMembershipContainer self-stretch flex-col justify-start items-center gap-20 inline-flex">
          <div className="Header w-[930px] justify-start items-end gap-4 inline-flex">
            <div className="RegsterWrapper grow shrink basis-0 flex-col justify-start items-end gap-[37px] inline-flex">
              <div className="Header self-stretch h-[145px] flex-col justify-start items-start gap-2 flex">
                <div className="MerryMembership self-stretch text-yellow-900 text-sm font-semibold font-['Nunito'] uppercase leading-[21px]">
                  Merry membership
                </div>
                <div className="ManageYourMembershipAndPaymentMethod self-stretch text-fuchsia-800 text-[46px] font-extrabold font-['Nunito'] leading-[57.50px]">
                  Manage your membership
                  <br />
                  and payment method
                </div>
              </div>
            </div>
          </div>
          <div className="MerryMembershipWrapper flex-col justify-start items-start gap-[60px] flex">
            <div className="MembershipWrapper flex-col justify-start items-start gap-6 flex">
              <div className="Email w-[931px] text-fuchsia-800 text-2xl font-bold font-['Nunito'] leading-[30px]">
                Merry Membership Package
              </div>
              <div className="PackageCard h-[222px] w-[931px] px-8 pt-8 pb-6 bg-pink-900 rounded-[32px] shadow flex-col justify-start items-end gap-4 flex">
                <div className="Top self-stretch pb-10 border-b border-pink-400 justify-between items-start inline-flex">
                  <div className="Left justify-start items-center gap-6 flex">
                    <div className="PackageName w-[319px] self-stretch justify-start items-start gap-4 flex">
                      <div className="Icon w-[78px] h-[78px]  bg-slate-50 rounded-2xl justify-center items-center flex">
                        <img
                          src={dataPackage.iconurl}
                          className="IconPremium grow shrink basis-0 self-stretch px-[1.80px] pt-[1.81px] pb-[1.80px] justify-center items-center inline-flex"
                        />
                      </div>
                      <div className="Top grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="Premium self-stretch text-white text-[32px] font-bold font-['Nunito'] leading-10">
                          {dataPackage.name}
                        </div>
                        <div className="Price self-stretch justify-start items-baseline gap-1.5 inline-flex">
                          <div className="Thb14900 text-pink-200 text-xl font-semibold font-['Nunito'] leading-[30px]">
                            {dataPackage.name === "default"
                              ? "Free"
                              : `THB ${dataPackage.price}`}
                          </div>
                          <div className="Month grow shrink basis-0 text-pink-200 text-base font-normal font-['Nunito'] leading-normal">
                            /Month
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Detail w-[357px] self-stretch flex-col justify-center items-start gap-2 inline-flex">
                      {dataPackage.description &&
                        dataPackage.description.map((desc, index) => (
                          <div
                            key={index}
                            className="Feature self-stretch justify-start items-start gap-3 inline-flex"
                          >
                            <img
                              src={checkboxcircle}
                              className="FillSystemCheckboxCircleFill w-6 h-6  justify-center items-center flex"
                            />
                            <div className="DescriptionText grow shrink basis-0 text-pink-100 text-base font-normal font-['Nunito'] leading-normal">
                              {desc}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="MerryStatus px-4 py-1 bg-red-100 rounded-[99px] justify-center items-center gap-1 flex">
                    <div className="Active text-amber-700 text-base font-extrabold font-['Nunito'] leading-normal">
                      Active
                    </div>
                  </div>
                </div>
                <div className="ButtonGhost px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex">
                  <button
                    onClick={handleCancelPackage}
                    className="Ghost text-white text-base font-bold font-['Nunito'] leading-normal"
                  >
                    Cancel Package
                  </button>
                </div>
              </div>
            </div>
            <div className="PaymentWrapper flex-col justify-start items-start gap-6 flex">
              <div className="Email w-[931px] text-fuchsia-800 text-2xl font-bold font-['Nunito'] leading-[30px]">
                Payment Method
              </div>
              <div className="PackageCard w-[931px] h-[194px] px-8 pt-8 pb-6 bg-white rounded-[32px] border border-gray-300 flex-col justify-start items-end gap-4 flex">
                <div className="Frame427320870 self-stretch pb-6 border-b border-gray-200 justify-start items-center gap-6 inline-flex">
                  <div className="Frame427320868 grow shrink basis-0 self-stretch justify-start items-start gap-4 flex">
                    <div className="Icon w-[66px] h-[66px]  bg-slate-50 rounded-2xl justify-center items-center flex">
                      <img
                        src={CardVisa}
                        className="Frame grow shrink basis-0 self-stretch px-0.5 py-[5px] flex-col justify-center items-start gap-[3px] inline-flex"
                      />
                    </div>
                    <div className="Top grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                      <div className="VisaEnding9899 self-stretch text-fuchsia-900 text-2xl font-bold font-['Nunito'] leading-[30px]">
                        Visa ending *9899
                      </div>
                      <div className="ExpireDate self-stretch justify-start items-center gap-1.5 inline-flex">
                        <div className="Expire042025 text-slate-500 text-base font-normal font-['Nunito'] leading-normal">
                          Expire 04/2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ButtonGhost px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex">
                  <button
                    onClick={handlePaymentEdit}
                    className="Ghost text-rose-700 text-base font-bold font-['Nunito'] leading-normal"
                  >
                    Edit Payment Method
                  </button>
                </div>
              </div>
            </div>
            <div className="BillingWrapper flex-col justify-start items-start gap-6 flex">
              <div className="Email w-[931px] text-fuchsia-800 text-2xl font-bold font-['Nunito'] leading-[30px]">
                Billing History
              </div>
              <div className="PackageCard  px-8 pt-8 pb-6 bg-white rounded-[32px] border border-gray-300 flex-col justify-start items-end gap-4 flex">
                <div className="Table w-[866px] py-2 border-b border-gray-200 justify-start items-start gap-4 inline-flex">
                  <div className="NextBilling01092022 grow shrink basis-0 text-slate-500 text-xl font-semibold font-['Nunito'] leading-[30px]">
                    Next billing : {lastBill ? lastBill : "No Packages"}
                  </div>
                </div>
                <div className="BillingDetail pb-6 border-b border-gray-200 flex-col justify-start items-start flex">
                  {history.map((billingRecord, index) => (
                    <div
                      key={index}
                      className={`Table w-[866px] p-4 ${
                        index % 2 === 0 ? "bg-slate-50 rounded-lg" : ""
                      } justify-start items-start gap-4 inline-flex`}
                    >
                      <div className="Date grow shrink basis-0 text-slate-500 text-base font-normal font-['Nunito'] leading-normal">
                        {billingRecord.created}
                      </div>
                      <div className="Amount text-slate-600 text-base font-normal font-['Nunito'] leading-normal">
                        THB {billingRecord.packages.price} bath
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex w-screen h-96 px-8 justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center w-1120 h-64  flex-shrink-0 justify-between">
          <div className="flex flex-col items-center">
            <img src={logofooter} />
            <div className="text-gray-700 text-center font-nunito text-[20px] font-semibold leading-150">
              New generation of online dating website for everyone
            </div>
          </div>
          <br />
          <div className="flex flex-col items-center">
            <div className="text-gray-600 font-nunito text-[14px] font-medium leading-150">
              copyright ©2022 merrymatch.com All rights reserved
            </div>
            <div className="flex items-center my-[10px]">
              <img src={fb} className="mx-[5px]" />
              <img src={ig} className="mx-[5px]" />
              <img src={tw} className="mx-[5px]" />
            </div>
          </div>
        </div>
      </footer>
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Package</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you want to cancel this package?</ModalBody>
          <ModalFooter>
            <div className="flex flex-row justify-evenly w-full">
              <button
                className="flex p-3 w-fit text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md "
                onClick={handleCancelConfirmation}
              >
                Yes, cancel this package
              </button>
              <button
                className="flex p-3 w-fit text-[#95002B] text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#FFE1EA] shadow-md "
                onClick={() => setShowCancelModal(false)}
              >
                No, give me more time
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

UserMembership.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default UserMembership;
