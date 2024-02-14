import React, { useState } from "react";
import NavBar from "../components/common/NavBar";
import premuimIcon from "../assets/merryPackagePage/premium.svg";
import visa from "../assets/PaymentPage/Visa.png";
import masterCard from "../assets/PaymentPage/MasterCard.png";

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handlePaymentConfirm = () => {
    // Simulate payment process
    const paymentSuccess = Math.random() < 0.5; // Simulating a 50% chance of success

    if (paymentSuccess) {
      setCurrentPage(2); // Navigate to PaymentSuccessPage
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  const renderPage = () => {
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
      <div className="flex justify-center items-">
        <div className="membership-card-container  w-[358px] h-[244px] border border-gray-400 rounded-[24px] ">
          <div className="flex justify-start items-center w-[310px] h-[30px] m-6">
            <img className="w-[24px] h-[24px] mr-4" src={premuimIcon} />
            <h3 className="font-nunito text-[20px] text-gray-700 font-[600] leading-[30px]">
              Merry Membership
            </h3>
          </div>
          <div className="flex flex-col w-[310px] h-[126px]">
            <div className="flex justify-between w-[310px] h-[48px]">
              <p className="font-nunito text-[16px] text-gray-700 font-[400] leading-[24px]">
                Package
              </p>
              <p>Price (Monthly)</p>
            </div>
            <div class="border-b"></div>
            <div className="flex justify-between w-[310px] h-[78px] font-nunito text-[20px] text-gray-900 font-[600] leading-[30px]">
              <p>Premium</p>
              <p>THB 59.00</p>
            </div>
          </div>
        </div>

        <div className="credit-card-container w-[548px] h-[554px] border border-gray-400 rounded-[24px]">
          <div className="flex">
            <p>Credit Card</p>
            <div className="flex">
              <img src={visa} />
              <img src={masterCard} />
            </div>
          </div>

          <button
            className="choose-package-btn flex justify-center items-center  w-[170px] font-nunito text-[16px] text-red-600 font-bold  
                           rounded-[10px]  bg-[white]  hover:bg-red-200 active:bg-red-500  active:text-[white]  shadow-setShadow01 h-12 p-[16px] mr-6"
            type="button"
            onClick={handlePaymentConfirm}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </>
  );
};

const PaymentSuccessPage = () => {
  return (
    <div>
      <h2>Payment Page Two</h2>
      {/* Content for Payment Page Two */}
    </div>
  );
};

export default PaymentPage;
