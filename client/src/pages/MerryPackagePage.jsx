import logo from "../assets/merryPackagePage/logo.svg";
<<<<<<< HEAD
=======
import bell from "../assets/merryPackagePage/frame.svg";
<<<<<<< HEAD
>>>>>>> 28ad5e8 (feat:fix folder in  merry-package-page solve w-screen)
import basic from "../assets/merryPackagePage/basic.svg";
import fillCheckbox from "../assets/merryPackagePage/checkbox-circle-fill.svg";
import platinum from "../assets/merryPackagePage/platinum.svg";
import premium from "../assets/merryPackagePage/premium.svg";
<<<<<<< HEAD
import facebookIcon from "../assets/merryPackagePage/facebook-circle-fill.svg";
import instagramIcon from "../assets/merryPackagePage/instagram-fill.svg";
import twitterIcon from "../assets/merryPackagePage/twitter-fill.svg";
import NavBar from "../components/common/NavBar";
import { useNavigate } from "react-router-dom";
=======
=======
import fillCheckbox from "../assets/merryPackagePage/checkbox-circle-fill.svg";
>>>>>>> 5214ee2 (feat:update merry-match-page)
import person01 from "../assets/merryPackagePage/person01.png";
import facebookIcon from "../assets/merryPackagePage/facebook-circle-fill.svg";
import instagramIcon from "../assets/merryPackagePage/instagram-fill.svg";
import twitterIcon from "../assets/merryPackagePage/twitter-fill.svg";
<<<<<<< HEAD
>>>>>>> 28ad5e8 (feat:fix folder in  merry-package-page solve w-screen)

function PackagePage() {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 99fd8e4 (fix: conflict)
=======
import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from "react";

function PackagePage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages();
  }, []);

  async function getPackages() {
    try {
      const { data, error } = await supabase.from("packages").select("*");
      // .limmit(3);
      if (error) throw error;
      if (data != null) {
        setPackages(data);
      }
      console.log(packages);
    } catch (error) {
      console.log(error.message);
    }
  }
>>>>>>> 5214ee2 (feat:update merry-match-page)
  return (
    <>
<<<<<<< HEAD
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

      <section>
        <div className="package-container flex flex-col mt-[80px] mb-[160px] ml-[160px] mr-[160px]">
          <p className="merry-membership-title  font-nunito text-[14px] text-[#7B4429]">
            MERRY MEMBERSHIP
          </p>
=======
      <div className="main-container w-screen  p-[80px,161px,160px,160px]">
        <div className="nav-container">
          <ul className="flex justify-between items-center  text-red-400 text-xl  text-center m-[20px]">
            <li className="merry-math-logo ml-[160px]">
              <img src={logo} />
            </li>

            <div className="flex justify-center items-center">
              <li className="start-matching-link font-nunito text-[16px] text-[#191C77] font-bold mr-[24px]">
                <a href="">Start Matching</a>
              </li>
              <li className="merry-membership-link font-nunito text-[16px] text-[#191C77] font-bold mr-[24px]">
                <a href="">Merry Membership</a>
              </li>
              <div className="flex ">
                <div className="flex mr-[12px] justify-center items-center w-[48px] h-[48px] bg-[#F6F7FC] rounded-[999px] object-fit object-cover">
                  <li>
                    <img
                      className="flex-shrink-0 w-[24px] h-[24px] "
                      src={bell}
                      alt=""
                    />
                  </li>
                </div>
                <li className="mr-[160px]">
                  <img
                    className="w-[48px] h-[48px] rounded-[999px] object-fit object-cover"
                    src={person01}
                    alt=""
                  />
                </li>
              </div>
            </div>
          </ul>
        </div>
>>>>>>> 28ad5e8 (feat:fix folder in  merry-package-page solve w-screen)

          <div className="merry-membership-ads">
            <p className="font-nunito text-[46px]  text-purple-500">
              Be part of Merry Membership
            </p>
            <p className="font-nunito text-[46px]  text-purple-500">
              to make more Merry!
            </p>
<<<<<<< HEAD
=======

            <div className="merry-membership-ads">
              <p className="font-nunito text-[46px]  text-purple-500">
                Be part of Merry Membership
              </p>
              <p className="font-nunito text-[46px]  text-purple-500">
                to make more Merry!
              </p>
            </div>

            <div className="flex justify-center items-center gap-[24px] mt-[80px]">
              {packages.map((packages, index) => (
                <div className="basic-package-con flex flex-col items-start w-[357px] p-[40px] gap-[24px] rounded-[32px] border-[1px] border-solid border-gray-400 bg-[#FFF]">
                  <ul key={index}>
                    <div className="basic-package">
                      <li className="card-icon mb-[24px]">
                        <img
                          src={packages.iconurl}
                          alt=""
                          className="w-[36px] h-[36px] flex-shrink-0"
                        />
                      </li>
                      <li className="card-category font-nunito text-[32px] font-bold text-purple-800">
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
                        className="choose-package-btn flex justify-center items-center gap-[8px] w-[277px]   
                           rounded-[99px]  bg-red-100  hover:bg-red-200 active:bg-red-300  shadow-setShadow01 h-12 p-[16px]"
                        type="button"
                        disabled
                      >
                        <label
                          className="font-nunito text-center text-[16px] font-bold text-red-600 p-[12px,24px]  "
                          htmlFor="ChoosePackageSection"
                        >
                          Choose Package
                        </label>
                      </button>
                    </div>
                  </ul>
                </div>
              ))}
            </div>
>>>>>>> 5214ee2 (feat:update merry-match-page)
          </div>

<<<<<<< HEAD
          <div className="flex justify-center items-center gap-[24px] mt-[80px]">
            <div className="basic-package-con flex flex-col items-start w-[357px] p-[40px] gap-[24px] rounded-[32px] border-[1px] border-solid border-gray-400 bg-[#FFF]">
              <ul>
                <div className="basic-package">
                  <li className="card-icon mb-[24px]">
                    <img
                      src={basic}
                      alt=""
                      className="w-[36px] h-[36px] flex-shrink-0"
                    />
                  </li>
                  <li className="card-category font-nunito text-[32px] font-bold text-purple-800">
                    Basic
                  </li>
                  <li className="card-paid-condition mb-[24px]">
                    <span className="card-package-price font-nunito text-[20px] font-bold text-gray-900">
                      THB 59.00
                    </span>
                    <span className="card-package-period font-nunito text-[16px] font-bold text-gray-600">
                      /month
                    </span>
=======
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
>>>>>>> 28ad5e8 (feat:fix folder in  merry-package-page solve w-screen)
                  </li>

                  <li className="fill-checkbox-icon">
                    <div className="flex">
                      <img src={fillCheckbox} alt="" />
                      <p>‘Merry’ more than a daily limited </p>
                    </div>
                    <div className="flex pb-[36px]">
                      <img src={fillCheckbox} alt="" />
                      <p>Up to 25 Merry per day</p>
                    </div>
                  </li>
                  <button
                    className="choose-package-btn flex justify-center items-center gap-[8px] w-[277px]   
                           rounded-[99px]  bg-red-100  hover:bg-red-200 active:bg-red-300  shadow-setShadow01"
                    type="button"
                    disabled
                  >
                    <label
                      className="font-nunito text-center text-[16px] font-bold text-red-600 p-[12px,24px]  "
                      htmlFor="ChoosePackageSection"
                    >
                      Choose Package
                    </label>
                  </button>
                </div>
              </ul>
            </div>

            <div className="platinum-package-con flex flex-col items-start w-[357px] p-[40px] gap-[24px] rounded-[32px] border-[1px] border-solid border-gray-400 bg-[#FFF]">
              <ul>
                <div className="paltinum-package">
                  <li className="card-icon mb-[24px]">
                    <img
                      src={platinum}
                      alt=""
                      className="w-[36px] h-[36px] flex-shrink-0"
                    />
                  </li>
                  <li className="card-category font-nunito text-[32px] font-bold text-purple-800">
                    Paltinum
                  </li>
                  <li className="card-paid-condition mb-[24px]">
                    <span className="card-package-price font-nunito text-[20px] font-bold text-gray-900">
                      THB 99.00
                    </span>
                    <span className="card-package-period font-nunito text-[16px] font-bold text-gray-600">
                      /month
                    </span>
                  </li>

                  <li className="fill-checkbox-icon">
                    <div className="flex">
                      <img src={fillCheckbox} alt="" />
                      <p>‘Merry’ more than a daily limited </p>
                    </div>
                    <div className="flex pb-[36px]">
                      <img src={fillCheckbox} alt="" />
                      <p>Up to 45 Merry per day</p>
                    </div>
                  </li>
                  <button
                    className="choose-package-btn flex justify-center items-center gap-[8px] w-[277px]  p-[12px,24px]  
                           rounded-[99px]  bg-red-100  hover:bg-red-200 active:bg-red-300  shadow-setShadow01"
                    type="button"
                    disabled
                  >
                    <label
                      className="font-nunito text-center text-[16px] font-bold text-red-600 leading-6"
                      htmlFor="ChoosePackageSection"
                    >
                      Choose Package
                    </label>
                  </button>
                </div>
              </ul>
            </div>

            <div className="premium-package-con flex flex-col items-start w-[357px] p-[40px] gap-[24px] rounded-[32px] border-[1px] border-solid border-gray-400 bg-[#FFF]">
              <ul>
                <div className="premium-package">
                  <li className="card-icon mb-[24px]">
                    <img
                      src={premium}
                      alt=""
                      className="w-[36px] h-[36px] flex-shrink-0"
                    />
                  </li>
                  <li className="card-category font-nunito text-[32px] font-bold text-purple-800">
                    Premium
                  </li>
                  <li className="card-paid-condition mb-[24px]">
                    <span className="card-package-price font-nunito text-[20px] font-bold text-gray-900">
                      THB 149.00
                    </span>
                    <span className="card-package-period font-nunito text-[16px] font-bold text-gray-600">
                      /month
                    </span>
                  </li>

                  <li className="fill-checkbox-icon">
                    <div className="flex">
                      <img src={fillCheckbox} alt="" />
                      <p>‘Merry’ more than a daily limited </p>
                    </div>
                    <div className="flex pb-[36px]">
                      <img src={fillCheckbox} alt="" />
                      <p>Up to 70 Merry per day</p>
                    </div>
                  </li>
                  <button
                    className="choose-package-btn flex justify-center items-center gap-[8px] w-[277px]  p-[12px,24px]  
                           rounded-[99px]  bg-red-100  hover:bg-red-200 active:bg-red-300  shadow-setShadow01"
                    type="button"
                    disabled
                  >
                    <label
                      className="font-nunito text-center text-[16px] font-bold text-red-600   "
                      htmlFor="ChoosePackageSection"
                    >
                      Choose Package
                    </label>
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-[1440px] h-[371px] p-[48px,160px] bg-gray-100">
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
    </>
  );
}

export default PackagePage;
