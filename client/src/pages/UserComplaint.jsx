/* eslint-disable react/no-unescaped-entities */
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
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useUser } from "../app/userContext.js";

function UserComplaint() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [dateSubmitted, setDateSubmitted] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user.user.id);
    async function fetchUserProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.user.id) // ใช้ user.id เพื่อเลือกข้อมูลของผู้ใช้ที่เป็นคนล็อกอิน
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
        // Handle error appropriately
      } else {
        if (data) {
          // ถ้ามีข้อมูล fullname ในฐานข้อมูล
          setFullname(data.full_name);
        } else {
          console.log("User profile not found.");
        }
      }
    }

    // เรียกใช้ฟังก์ชันดึงข้อมูล
    fetchUserProfile();
  }, [user]); // ให้ useEffect เรียกใช้ฟังก์ชันเมื่อ user เปลี่ยนแปลง

  const handleSubmit = async () => {
    const { data, error } = await supabase.from("complaints").insert([
      {
        issue: issue,
        description: description,
        date_submitted: dateSubmitted,
        fullname: fullname, // ใช้ fullname ที่ดึงมาจากฐานข้อมูล
      },
    ]);

    if (error) {
      console.error("Error submitting complaint:", error.message);
      // Handle error appropriately
    } else {
      console.log("Complaint submitted successfully:", data);
      // Clear input fields after successful submission
      setIssue("");
      setDescription("");
      setDateSubmitted("");
    }
  };

  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    navigate("/login");
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

      <section className="h-[1023px] w-screen  flex flex-row justify-center items-center gap-[80px]">
        <div className="w-1/4 max-w-[580px] h-fit flex flex-col justify-center items-start">
          <div className="my-[50px]">
            <div className="tagline font-nunito text-[14px] font-semibold leading-5 text-left text-[#7B4429]">
              COMPLAINT
            </div>
            <div className="font-nunito text-4xl font-[46px] leading-58 tracking-tighter text-left text-[#A62D82]">
              <p> If you have any trouble Don't be afraid to tell us!</p>
            </div>
          </div>
          <div className="my-[50px] flex flex-col justify-between items-start w-full gap-[40px]">
            <FormControl isRequired>
              <FormLabel>Issue</FormLabel>
              <Input
                placeholder="Issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                resize="none"
                style={{ height: "200px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <div className="w-1/2">
              <FormControl isRequired>
                <FormLabel>Date Submitted</FormLabel>
                <Input
                  type="date"
                  size="lg"
                  value={dateSubmitted}
                  onChange={(e) => setDateSubmitted(e.target.value)}
                />
              </FormControl>
            </div>
          </div>
          <Button
            colorScheme="red"
            className="my-[50px] "
            onClick={handleSubmit}
          >
            submit
          </Button>
        </div>
        <img src={banner} />
      </section>
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
    </div>
  );
}

UserComplaint.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default UserComplaint;
