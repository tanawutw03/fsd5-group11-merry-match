import logofooter from "../assets/NonUserHomePage/logofooter.png";
import fb from "../assets/NonUserHomePage/fb.png";
import ig from "../assets/NonUserHomePage/ig.png";
import tw from "../assets/NonUserHomePage/tw.png";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import PropTypes from "prop-types";
import banner from "../assets/LoginPage/LoginBanner.svg";
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

function UserComplaint({ user, setUser }) {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className=" min-w-[1440px] bg-white z-auto flex flex-col items-center">
      <div className="shadow-md bg-opacity-10">
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
            color=""
            name="userAvatar"
          />
        ) : (
          <NavBar
            useMenu={false}
            name="Login"
            color="red"
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
      </div>
      <section className="h-[1023px] w-full  flex flex-row justify-center items-center gap-[80px]">
        <div className="w-1/4 max-w-[580px] h-fit flex flex-col justify-center items-start">
          <div className="my-[50px]">
            <div className="tagline font-nunito text-[14px] font-semibold leading-5 text-left text-[#7B4429]">
              COMPLAINT
            </div>
            <div className="font-nunito text-4xl font-[46px] leading-58 tracking-tighter text-left text-[#A62D82]">
              If you have any trouble Don't be afraid to tell us!
            </div>
          </div>
          <div className="my-[50px] flex flex-col justify-between items-start w-full gap-[40px]">
            <FormControl isRequired>
              <FormLabel>Issue</FormLabel>
              <Input placeholder="Issue" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                resize="none"
                style={{ height: "200px" }}
              />
            </FormControl>

            <div className="w-1/2">
              <FormControl isRequired>
                <FormLabel>Date Submitted</FormLabel>
                <Input type="date" size="lg" />
              </FormControl>
            </div>
          </div>
          <Button colorScheme="red" className="my-[50px] ">
            submit
          </Button>
        </div>
        <img src={banner} />
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

UserComplaint.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default UserComplaint;
