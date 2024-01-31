import { Button } from "@chakra-ui/react";
import logo from "../assets/NonUserHomePage/logo.png";
import image1 from "../assets/NonUserHomePage/image-1.png";
import image2 from "../assets/NonUserHomePage/image-2.png";
import vector from "../assets/NonUserHomePage/vector.png";
import heart from "../assets/NonUserHomePage/heart.png";
import heart2 from "../assets/NonUserHomePage/heart2.png";
import heart3 from "../assets/NonUserHomePage/heart3.png";
import logofooter from "../assets/NonUserHomePage/logofooter.png";
import fb from "../assets/NonUserHomePage/fb.png";
import ig from "../assets/NonUserHomePage/ig.png";
import tw from "../assets/NonUserHomePage/tw.png";
import { useNavigate } from "react-router-dom";

function NonUserHomePage() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    navigate("/register1");
  };

  return (
    <div className=" min-w-[1440px] bg-white z-auto flex flex-col items-center">
      <nav className="bg-white w-[1440px] flex flex-row justify-between items-center h-[88px] font-nunito z-10">
        <img src={logo} className="px-[40px] z-50" />
        <div className=" flex w-1/3 flex-row justify-around items-center font-nunito z-40">
          <Button
            colorScheme="Pink 800"
            variant="link"
            onClick={() => scrollToSection("WhyMarry")}
          >
            Why Marry Match?
          </Button>
          <Button
            colorScheme="Pink 800"
            variant="link"
            onClick={() => scrollToSection("HowToMarry")}
          >
            How To Marry
          </Button>
          <Button colorScheme="pink" onClick={handleClick}>
            Register
          </Button>
        </div>
      </nav>
      <header className="bg-[#160404] w-[1440px] h-[758px] flex flex-col justify-center items-center font-nunito relative overflow-hidden">
        <img
          src={image1}
          className=" absolute right-[203px] bottom-[403px] z-auto"
        />
        <img src={heart2} className=" absolute right-[558px] top-[117px]" />
        <img
          src={image2}
          className=" absolute left-[203px] bottom-0 rounded-full"
        />
        <div className="h-[8px] w-[8px] absolute right-[197px] bottom-[197px] bg-[#7B4429] rounded-full"></div>
        <div className="h-[67px] w-[67px] absolute left-[-9px] top-[108px] bg-[#411032] rounded-full"></div>
        <div className="h-[7px] w-[7px] absolute left-[118px] top-[72px] bg-[#FF6390] rounded-full"></div>
        <div className="h-[60px] w-[60px] absolute right-[68px] bottom-[247px] bg-[#32000E] rounded-full"></div>
        <div className=" absolute right-[114px] bottom-[249px]  text-[28px]">
          😄
        </div>
        <div className=" font-nunito flex justify-center items-center w-[148px] h-[41px] absolute rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[0px] bg-red-700 text-white text-center font-nunito text-[12px] font-semibold leading-150 right-[160px] top-[254px]">
          Hi! Nice to meet you
        </div>
        <div className=" font-nunito flex justify-center items-center w-[148px] h-[41px] absolute rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[0px] rounded-br-[24px] bg-red-700 text-white text-center font-nunito text-[12px] font-semibold leading-150 left-[160px] top-[336px]">
          Nice to meet you too!
        </div>
        <div className="font-nunito w-[358px] h-[360px] flex flex-col justify-center items-center">
          <div className="font-nunito text-white text-center font-nunito text-[50px] font-extrabold leading-115 tracking-tight mb-[24px]">
            Make the first ‘Merry’
          </div>
          <div className="text-white font-nunito text-center font-nunito text-[20px] font-semibold leading-150 mb-[30px]">
            If you feel lonely, let’s start meeting new people in your area!
            Dont’t forget to get Merry with us
          </div>
          <Button colorScheme="pink">Start matching!</Button>
        </div>
      </header>
      <section
        id="WhyMarry"
        className=" bg-[#160404] w-[1440px] h-[533px] flex flex-col justify-center items-center font-nunito"
      >
        <div className="flex w-1120 items-center gap-6">
          <div className="flex flex-col justify-between items-start w-[549px] h-full">
            <div className="text-purple-300 font-nunito text-[46px] font-extrabold leading-125 tracking-tight">
              Why Merry Match?
            </div>
            <div className="text-white font-nunito text-[20px] font-semibold leading-150">
              Merry Match is a new generation of online dating website for
              everyone
            </div>
            <div className="text-gray-100 font-nunito text-[16px] font-normal leading-150">
              Whether you’re committed to dating, meeting new people, expanding
              your social network, meeting locals while traveling, or even just
              making a small chat with strangers.{" "}
            </div>
            <div className="text-gray-100 font-nunito text-[16px] font-normal leading-150">
              This site allows you to make your own dating profile, discover new
              people, save favorite profiles, and let them know that you’re
              interested
            </div>
          </div>
          <img src={vector} />
        </div>
      </section>
      <section
        id="HowToMarry"
        className="bg-[#160404] w-[1440px] flex flex-col h-[622px] px-16 py-20 justify-center items-center"
      >
        <div className="text-purple-300 text-center font-nunito text-[46px] font-extrabold leading-125 tracking-tight mb-[48px]">
          How to Merry
        </div>
        <div className="flex items-start gap-6 ">
          <div className="flex flex-col items-center w-[264px] p-8 gap-10 bg-[#2a0b21] rounded-[40px]">
            <div className="flex items-center justify-center w-[120px] h-[120px] bg-[#410f32] rounded-full text-[50px]">
              😎
            </div>
            <div className="text-white text-center font-nunito text-[24px] font-bold leading-125 tracking-tight">
              Upload your cool picture
            </div>
            <div className="text-gray-500 text-center font-nunito text-[16+px] font-normal leading-150">
              Lorem ipsum is a placeholder text
            </div>
          </div>
          <div className="flex flex-col items-center w-[264px] p-8 gap-10 bg-[#2a0b21] rounded-[40px]">
            <div className="flex items-center justify-center w-[120px] h-[120px] bg-[#410f32] rounded-full text-[50px]">
              🤩
            </div>
            <div className="text-white text-center font-nunito text-[24px] font-bold leading-125 tracking-tight">
              Explore and find the one you like
            </div>
            <div className="text-gray-500 text-center font-nunito text-[16+px] font-normal leading-150">
              Lorem ipsum is a placeholder text
            </div>
          </div>
          <div className="flex flex-col items-center w-[264px] p-8 gap-10 bg-[#2a0b21] rounded-[40px]">
            <div className="flex items-center justify-center w-[120px] h-[120px] bg-[#410f32] rounded-full text-[50px]">
              🥳
            </div>
            <div className="text-white text-center font-nunito text-[24px] font-bold leading-125 tracking-tight">
              Click ‘Merry’ for get to know!
            </div>
            <div className="text-gray-500 text-center font-nunito text-[16+px] font-normal leading-150">
              Lorem ipsum is a placeholder text
            </div>
          </div>
          <div className="flex flex-col items-center w-[264px] p-8 gap-10 bg-[#2a0b21] rounded-[40px]">
            <div className="flex items-center justify-center w-[120px] h-[120px] bg-[#410f32] rounded-full text-[50px]">
              😘
            </div>
            <div className="text-white text-center font-nunito text-[24px] font-bold leading-125 tracking-tight">
              Start chating and relationship
            </div>
            <div className="text-gray-500 text-center font-nunito text-[16+px] font-normal leading-150">
              Lorem ipsum is a placeholder text
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#160404] w-[1440px] flex flex-col h-[570px] px-16 py-20 justify-center items-center">
        <div className="w-[1120px] h-[369px] rounded-2xl bg-gradient-to-br from-red-900 to-pink-500 flex flex-col justify-evenly items-center relative">
          <div className="w-[588px] text-white text-center font-nunito text-4xl font-extrabold leading-125 tracking-tight">
            Let’s start finding and matching someone new
          </div>
          <button className="inline-flex p-3 md:p-4 justify-center items-center gap-2 md:gap-4 rounded-full bg-red-100 shadow-md text-red-600 text-center font-nunito text-base font-bold leading-150">
            Start Matching!
          </button>
          <img src={heart} className=" absolute right-0 bottom-[27px]" />
          <img src={heart2} className=" absolute right-[64px] bottom-[130px]" />
          <img src={heart3} className=" absolute left-[0px] bottom-[160px]" />
        </div>
      </section>
      <footer className="flex w-[1440px] h-96 px-8 justify-center items-center bg-gray-100">
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
    </div>
  );
}

export default NonUserHomePage;
