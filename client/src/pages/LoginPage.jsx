import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import LoginBanner from "../assets/LoginPage/LoginBanner.svg";

const Login = () => {
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
    console.log(event.target.name);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        username: formData.username,
        password: formData.password,
      });

      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div className="bg-white h-screen w-screen flex items-center justify-center">
        <div className="flex">
          <img src={LoginBanner} alt="" className="w-3/4" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-gray-500 text-2xl font-medium mb-4">Login</p>
          <h1 className="text-[#A62D82] text-4xl font-bold tracking-tight mb-4">
            Welcome back to
          </h1>
          <h1 className="text-[#A62D82] text-4xl font-bold tracking-tight mb-8">
            Merry Match
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <label
              for="username"
              className="mt-4 mb-2 font-medium text-gray-700"
            >
              Username or Email
            </label>
            <input
              id="username"
              type="text"
              onChange={handleChange}
              placeholder="Enter Username or Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label
              for="password"
              className="mt-4 mb-2 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              className="mt-8 w-full px-4 py-3 bg-[#C70039] text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Submit
            </button>
          </form>
          <div className="mt-4">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
