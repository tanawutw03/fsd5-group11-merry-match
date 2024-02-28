{
  /*import React, { useState } from "react";
import NavBar from "../components/common/NavBar";
import premuimIcon from "../assets/merryPackagePage/premium.svg";
import visa from "../assets/PaymentPage/Visa.png";
import masterCard from "../assets/PaymentPage/MasterCard.png";
import correctCheck from "../assets/PaymentPage/CorrectCheck.png";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [creditCardData, setCreditCardData] = useState({
    id: "",
    card_number: "",
    card_owner: "",
    expiry_date: "",
    cvc_cvv: "",
  });

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleInputChange = () => {};

  const handlePaymentConfirm = () => {
    // Simulate payment process
    const paymentSuccess = Math.random() < 0.5; // Simulating a 50% chance of success

    if (paymentSuccess) {
      setCurrentPage(2); // Navigate to PaymentSuccessPage
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  // const renderPage = () => {
  //   switch (currentPage) {
  //     case 1:
  //       return (
  //         <PaymentConfirmPage handlePaymentConfirm={handlePaymentConfirm} />
  //       );
  //     case 2:
  //       return <PaymentSuccessPage />;
  //     default:
  //       return null;
  //   }
  // };

  const renderPage = () => {
    // Check any condition here if you want to skip PaymentConfirmPage
    // For example, directly navigate to PaymentSuccessPage
    const shouldSkipPaymentConfirm = true; // Set this condition as needed

    if (shouldSkipPaymentConfirm) {
      return <PaymentSuccessPage />;
    }

    switch (currentPage) {
      case 1:
        return (
          <PaymentConfirmPage handlePaymentConfirm={handlePaymentConfirm} />
        );
      case 2:
        return <PaymentSuccessPage />;
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
};

export default PaymentPage;

const PaymentConfirmPage = ({ handlePaymentConfirm }) => {
  return (
    <>
      <div className="nav-container flex justify-center items-center">
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
      </div>
      <div className="payment-main-container flex justify-center mt-10 font-nunito bg-[#fcfcfe]">
        <div className="membership-card-container flex-col justify-center items-center mr-4 w-[358px] h-[244px] border border-[#d6d9e4] rounded-[24px] bg-[#f6f7fc]">
          <div className="flex justify-start items-center w-[310px] h-[30px] m-6">
            <img className="w-[24px] h-[24px] mr-4" src={premuimIcon} />
            <h3 className="text-[20px] text-[#646d89] font-[600] leading-[30px]">
              Merry Membership
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-[126px]">
            <div className="flex justify-between items-center w-[310px] h-[48px] text-[#646d89] border-solid border-b-[1px] border-[#e4e6ed]">
              <p className="text-[16px] font-[400] leading-[24px]">Package</p>
              <p>Price (Monthly)</p>
            </div>

            <div className="flex justify-between w-[310px] h-[78px] text-[20px] text-gray-900 font-[600] leading-[30px] pt-5">
              <p>Premium</p>
              <p>THB 59.00</p>
            </div>
          </div>
        </div>

        <div className="credit-card-container w-[548px] h-[554px] ml-4 border border-collapse border-[#d6d9e4] rounded-[24px]">
          <div className="flex justify-between items-center h-[78px] ml-4 mr-4">
            <p className="text-[20px] text-[#646d89] font-[600]">Credit Card</p>
            <div className="flex justify-center items-center w-[100px] h-[28px] gap-[12px] mr-4">
              <div className="w-[40px] h-[28px] mr-1">
                <img src={visa} />
              </div>
              <div className="w-[48px] h-[28px]">
                <img
                  src={masterCard}
                  className="w-[48px] h-[28px] gap-[40px] border "
                />
              </div>
            </div>
          </div>

          <form className="credit-card-info flex flex-col items-center w-full h-[372px] border-y-[1px] border-[#d6d9e4] p-[32px,24px,32px,24px] gap-[20px] ">
            <div className="flex flex-col mt-6 ">
              <div className="flex ">
                <label
                  htmlFor="CardNumber"
                  className="text-left text-[16px] text-neutral-900 font-[400] leading-[24px]"
                >
                  Card number
                </label>
                <p className="text-[18px] text-[red] ml-1 ">*</p>
              </div>
              <input
                type="text"
                id="card_number"
                name="card_number"
                // value={creditCardData.card_number || ""}
                // onChange={handleInputChange}
                className="border-2 w-[500px] h-[48px] px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                placeholder="Number of card"
              />
            </div>
            <div className="flex flex-col  ">
              <div className="flex ">
                <label
                  htmlFor="CardOwner"
                  className="text-left text-[16px] text-neutral-900 font-[400] leading-[24px]"
                >
                  Card owner
                </label>
                <p className="text-[18px] text-[red] ml-1 ">*</p>
              </div>
              <input
                type="text"
                id="card-owner"
                name="card-owner"
                // value={creditCardData.card_owner || ""}
                // onChange={handleInputChange}
                className="border-2 w-[500px] h-[48px]  px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                placeholder="Holder of card"
              />
            </div>
            <div className="flex flex-row justify-between  w-[500px] ">
              <div className="flex flex-col  ">
                <div className="flex ">
                  <label
                    htmlFor="ExpiryDate"
                    className="text-left text-[16px] text-neutral-900 font-[400] leading-[24px]"
                  >
                    Expiry date
                  </label>
                  <p className="text-[18px] text-[red] ml-1 ">*</p>
                </div>
                <input
                  type="text"
                  id="expiry_date"
                  name="expiry_date"
                  // value={creditCardData.expiry_date || ""}
                  // onChange={handleInputChange}
                  className="border-2 w-[239px] h-[48px] px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                  placeholder="MM/YY"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex ">
                  <label
                    htmlFor="CvcCvv"
                    className="text-left text-[16px] text-neutral-900 font-[400] leading-[24px]"
                  >
                    CVC/CVV
                  </label>
                  <p className="text-[18px] text-[red] ml-1 ">*</p>
                </div>
                <input
                  type="text"
                  id="cvc_cvv"
                  name="cvc_cvv"
                  // value={creditCardData.cvc_cvv || ""}
                  // onChange={handleInputChange}
                  className="border-2 w-[239px] h-[48px]  px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                  placeholder="xxx"
                />
              </div>
            </div>
          </form>
          <footer className="flex justify-between items-center w-[548px] h-[104px] p-[24px,24px,32px,24px] rounded-b-[24px]">
            <button
              className="choose-package-btn flex justify-start items-center text-[16px] text-[#c70039] hover:text-[#ff1659] active:text-[#95002b] font-bold h-12 p-[16px] ml-6"
              type="button"
              onClick={handlePaymentConfirm}
            >
              Cancel
            </button>

            <button
              className="choose-package-btn flex justify-center items-center w-[170px] text-[16px] font-bold  
                           rounded-full bg-[#c70039] text-white hover:bg-[#ff1659] active:bg-[#95002b] shadow-setShadow01 h-12 p-[16px] mr-6"
              type="button"
              onClick={handlePaymentConfirm}
            >
              Payment Confirm
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-container flex justify-center items-center">
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
      </div>
      <div className="payment-success-container flex w-screen justify-center items-center border border-solid border-[white] font-nunito">
        <card className="flex flex-col justify-center items-start w-[641px] h-screen border border-dashed border-[gold]">
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
        <div className="text-white w-[357px] h-[454px] border rounded-3xl bg-gradient-to-r from-[#742138] from-20% to-[#a878bf] to-95% ml-28 mt-28 border-gray-200 grid grid-rows-[25%_20%_20%_10%_1%_24%]">
          <div className="ml-10 mt-10 w-[60px] h-[60px] rounded-2xl bg-gray-100 flex justify-center items-center">
            <img
              src={correctCheck}
              alt="package icon"
              className="w-[36px] h-[36px]"
            />
          </div>
          <div className="ml-10  text-[32px] font-bold">
            ""
            <div className="text-[20px] font-normal">
              THB ... .00
              <span className="text-[16px] font-light">/Month</span>
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
            <p>{`Up to 100 Merry per day`}</p>
          </div>
          <hr className=" border-gray-300 ml-10 mr-10 -mt-10 " />
          <div className="ml-10 mt-10 grid-cols-2">
            <div className="flex justify-between -mt-10 ">
              <div className="flex text-purple-200 ">Start Membership</div>
              <div className="flex mr-10 ">...</div>
            </div>
            <div className="flex justify-between mt-2  ">
              <div className="flex text-purple-200 ">Next billing</div>
              <div className="flex mr-10">...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
*/
}

import React from "react";
import NavBar from "../components/common/NavBar";
import PaymentSuccessPage from "../components/PaymentSuccess";

const PaymentPage = () => {
  return (
    <>
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
      <PaymentSuccessPage />;
    </>
  );
};

export default PaymentPage;
