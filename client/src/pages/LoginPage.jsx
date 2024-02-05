import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import LoginBanner from "../assets/LoginPage/LoginBanner.svg";
import PinkCircle from "../assets/LoginPage/PinkCircle.svg";
import RedDot from "../assets/LoginPage/RedDot.svg";
import logo from "../assets/merryPackagePage/logo.svg";
import PropTypes from "prop-types";
import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import { useUser } from "../app/userContext.js";
import { handleLogin } from "../app/auth.js";

const Login = () => {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.username,
        password: formData.password,
      });
      console.log(data, error);
      console.log("User Data:", data.user);
      if (error) {
        throw error;
      }
      setLoginSuccess(true);
      await handleLogin(user, setUser, avatarUrl, setAvatarUrl, navigate);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="fixed">
        <nav className="bg-white w-screen flex flex-row justify-between items-center h-[88px] shadow-md fixed font-nunito z-10">
          <a href="/">
            <img src={logo} className="px-[40px] z-50" />
          </a>
          <div className=" flex w-1/3 flex-row justify-around items-center font-nunito z-40">
            <Button
              colorScheme="custom"
              color="#191C77"
              variant="link"
              onClick={() => navigate("/")}
            >
              Why Marry Match?
            </Button>
            <Button
              colorScheme="custom"
              color="#191C77"
              variant="link"
              onClick={() => navigate("/")}
            >
              How To Marry
            </Button>
            <Button
              colorScheme="custom"
              bg="#C70039"
              _hover={{ bg: "#ff1659" }}
              variant="solid"
              rounded="full"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </nav>

        <div className="flex flex-col">
          <img
            src={PinkCircle}
            alt=""
            className="absolute h-16 w-16 top-36 -left-2"
          />
          <img
            src={RedDot}
            alt=""
            className="absolute h-2 w-2 top-60 left-16"
          />
        </div>

        <div className="bg-white h-screen w-screen flex items-center justify-center gap-36 pt-20">
          <div className="flex">
            <img src={LoginBanner} alt="" className="w-4/5" />
          </div>

          <div className="flex flex-col justify-center font-nunito">
            <p className="text-[#7b4429] text-md font-semibold mb-4">LOGIN</p>
            <h1 className="text-[#A62D82] text-5xl font-black mb-4">
              Welcome back to
            </h1>
            <h1 className="text-[#A62D82] text-5xl font-black mb-8">
              Merry Match
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <label
                htmlFor="username"
                className="mt-4 mb-2 font-medium text-gray-700"
              >
                Username or Email
              </label>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                placeholder="Enter Username or Email"
                className="w-[453px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a62d82]"
              />

              <label
                htmlFor="password"
                className="mt-4 mb-2 font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-[453px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a62d82]"
              />

              <button
                type="submit"
                className="mt-8 w-[453px] px-4 py-3 bg-[#C70039] text-white font-bold rounded-full hover:bg-[#ff1659] focus:outline-none focus:ring-red-500"
              >
                Submit
              </button>
            </form>
            <div className="mt-4">
              Don&apos;t have an account?
              <Link
                to="/register"
                className="text-[#C70039] hover:text-[#ff1659]  font-bold"
              >
                &nbsp;Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {loginSuccess && (
        <Stack spacing={3}>
          <Alert status="success">
            <AlertIcon />
            Login successful!
          </Alert>
        </Stack>
      )}
    </>
  );
};

Login.propTypes = {
  setToken: PropTypes.func,
};

export default Login;
