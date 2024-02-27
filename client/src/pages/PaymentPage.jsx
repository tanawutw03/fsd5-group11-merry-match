import React, { useState } from "react";
import NavBar from "../components/common/NavBar";
import premuimIcon from "../assets/merryPackagePage/premium.svg";
import visa from "../assets/PaymentPage/Visa.png";
import masterCard from "../assets/PaymentPage/MasterCard.png";
import correctCheck from "../assets/PaymentPage/CorrectCheck.png";

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
      <div className="payment-main-container flex justify-center mt-10 ">
        <div className="membership-card-container flex-col justify-center items-center mr-4 w-[358px] h-[244px] border border-gray-400 rounded-[24px] ">
          <div className="flex justify-start items-center w-[310px] h-[30px] m-6">
            <img className="w-[24px] h-[24px] mr-4" src={premuimIcon} />
            <h3 className="font-nunito text-[20px] text-gray-700 font-[600] leading-[30px]">
              Merry Membership
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-[126px]  ">
            <div className="flex justify-between items-center w-[310px] h-[48px]">
              <p className="font-nunito text-[16px] text-gray-700 font-[400] leading-[24px]">
                Package
              </p>
              <p>Price (Monthly)</p>
            </div>
            <div class="border border-gray-300 w-full "></div>
            <div className="flex justify-between w-[310px] h-[78px] font-nunito text-[20px] text-gray-900 font-[600] leading-[30px]">
              <p>Premium</p>
              <p>THB 59.00</p>
            </div>
          </div>
        </div>

        <div className="credit-card-container w-[548px] h-[554px] ml-4  border border-collapse border-gray-400 rounded-[24px]">
          <div className="flex justify-between items-center h-[78px] ml-4 mr-4 ">
            <p className="font-nunito text-[20px] text-gray-700 font-[600]">
              Credit Card
            </p>
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

          <form className="credit-card-info flex flex-col items-center w-full h-[372px] border  border-gray-100 shadow-setShadow01 p-[32px,24px,32px,24px] gap-[20px] ">
            <div className="flex flex-col mt-6 ">
              <div className="flex ">
                <label
                  htmlFor="CardNumber"
                  className="text-left font-nunito text-[16px] text-neutral-900 font-[400] leading-[24px]"
                >
                  Card number
                </label>
                <p className="font-nunito text-[18px] text-[red] ml-1 ">*</p>
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
                  className="text-left  font-nunito text-[16px] text-neutral-900 font-[400] leading-[24px]"
                >
                  Card owner
                </label>
                <p className="font-nunito text-[18px] text-[red] ml-1 ">*</p>
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
                    className="text-left  font-nunito text-[16px] text-neutral-900 font-[400] leading-[24px]"
                  >
                    Expiry date
                  </label>
                  <p className="font-nunito text-[18px] text-[red] ml-1 ">*</p>
                </div>
                <input
                  type="text"
                  id="expiry_date"
                  name="expiry_date"
                  // value={creditCardData.expiry_date || ""}
                  // onChange={handleInputChange}
                  className="border-2 w-[239px] h-[48px]  px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
                  placeholder="MM/YY"
                />
              </div>
              <div className="flex flex-col   ">
                <div className="flex ">
                  <label
                    htmlFor="CvcCvv"
                    className="text-left  font-nunito text-[16px] text-neutral-900 font-[400] leading-[24px]"
                  >
                    CVC/CVV
                  </label>
                  <p className="font-nunito text-[18px] text-[red] ml-1 ">*</p>
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

          <footer className="flex justify-between items-center w-[548px] h-[104px] border p-[24px,24px,32px,24px] ">
            <button
              className="choose-package-btn flex justify-center items-center  w-[170px] font-nunito text-[16px] text-red-600 font-bold  
                           rounded-[10px]  bg-[white]  hover:bg-red-200 active:bg-red-500  active:text-[white]  shadow-setShadow01 h-12 p-[16px] mr-6"
              type="button"
              onClick={handlePaymentConfirm}
            >
              Cancel
            </button>

            <button
              className="choose-package-btn flex justify-center items-center  w-[170px] font-nunito text-[16px] text-red-600 font-bold  
                           rounded-[10px]  bg-[white]  hover:bg-red-200 active:bg-red-500  active:text-[white]  shadow-setShadow01 h-12 p-[16px] mr-6"
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
      <div className="payment-success-container relative max-w-[1440px] h-[936px] border border-solid border-[white]">
        <card className="absulute top-[118px] left-[163px] gap-[80px] flex flex-col justify-start items-start   w-[641px] h-[393px] border border-dashed border-[gold]">
          <img src={correctCheck} className="flex  w-[64px] h-[64px] " />
          <p className="font-nunito text-[14px] text-[#7B4429] font-[600] leading-[21px]">
            PAYMENT SUCCESS
          </p>
          <h1 className=" font-nunito text-[46px] text-purple-500 font-[800] leading-[58px]">
            Welcom Merry Membership!
            <br />
            Thank you for joining us
          </h1>
          <div className="flex flex-row">
            <button
              className="choose-package-btn flex justify-center items-center  w-[170px] font-nunito text-[16px] text-red-600 font-bold  
                           rounded-[10px]  bg-[white]  hover:bg-red-200 active:bg-red-500  active:text-[white]  shadow-setShadow01 h-12 p-[16px] mr-6"
              type="button"
              // onClick={handlePaymentConfirm}
            >
              Back to home
            </button>

            <button
              className="choose-package-btn flex justify-center items-center  w-[170px] font-nunito text-[16px] text-red-600 font-bold  
                           rounded-[10px]  bg-[white]  hover:bg-red-200 active:bg-red-500  active:text-[white]  shadow-setShadow01 h-12 p-[16px] mr-6"
              type="button"
              // onClick={handlePaymentConfirm}
            >
              Check Membership
            </button>
          </div>
        </card>
      </div>
    </>
  );
};
