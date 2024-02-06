import { useForm } from "react-hook-form";
import CountryInputSelect from "./common/CountryInputSelect.jsx";
import CityInputSelect from "./common/CityInputSelect.jsx";
import { supabase } from "../utils/supabaseClient.js";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Step1Inputs({ setData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [userId, setUserId] = useState(null);
  const formDataRef = useRef({});
  const [selectedCountry, setSelectedCountry] = useState(null);

  const onSubmit = async (formData) => {
    console.log(formData);
    formDataRef.current = formData; // Store formData in the ref
    setData(formData);
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      console.log("Sign-up Response:", { signUpData, error });

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("User signed up successfully:", signUpData.user.id);

        setUserId(signUpData.user.id);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      if (userId !== null) {
        console.log("userId:", userId);

        const insertUserData = async () => {
          try {
            const { data: insertData, error: insertError } = await supabase
              .from("profiles")
              .upsert({
                id: userId,
                username: formDataRef.current.username,
                full_name: formDataRef.current.name,
                country: formDataRef.current.location?.value,
                city: formDataRef.current.city?.value,
                email: formDataRef.current.email,
                date_of_birth: formDataRef.current.dob,
                updated_at: new Date(),
              })
              .select();

            console.log(insertData, insertError);

            if (insertError) {
              console.error("Error inserting user data:", insertError.message);
            } else {
              console.log("User data inserted successfully:", insertData);
            }
          } catch (error) {
            console.error("Error inserting user data:", error.message);
          }
        };

        insertUserData();
      }
    };

    checkUserAuthentication();
  }, [userId]);

  return (
    <>
      <div className="font-nunito h-screen w-screen mt-10">
        <div className="flex justify-end absolute font-nunito gap-3 right-40 top-28 bg-[#fcfcfe]">
          <div className="h-20 w-[250px] p-4 pr-8 border border-[#A62D82] rounded-2xl flex justify-start items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-200 flex justify-center items-center text-[#A62D82] text-2xl font-bold">
              1
            </div>
            <div className="flex flex-col items-start">
              <p className="text-gray-700 text-xs font-medium">Step 1/3</p>
              <p className="text-[#A62D82] text-base font-extrabold">
                Basic Information
              </p>
            </div>
          </div>
          <div className="w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center">
            <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex justify-center items-center text-2xl font-bold text-gray-600">
              2
            </div>
          </div>
          <div className="w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center">
            <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex justify-center items-center text-2xl font-bold text-gray-600">
              3
            </div>
          </div>
        </div>

        <div>
          <h1 className="flex flex-col items-start mt-[17%] left-72 absolute text-2xl text-[#A62D82] font-bold">
            Basic Information
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-center mr-4 mt-[300px] gap-10"
        >
          <div className="flex flex-col w-[453px]">
            <label htmlFor="name" className="text-left">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="John Snow"
              type="text"
            />
            {errors.name && (
              <span className="flex justify-start -mt-4 text-[#af2758]">
                This field is required
              </span>
            )}

            <CountryInputSelect
              control={control}
              name="location"
              label="Location"
              onCountryChange={setSelectedCountry}
            />
            {errors.name && (
              <span className="flex justify-start -mt-4 text-[#af2758]">
                This field is required
              </span>
            )}

            <label htmlFor="username" className="text-left">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 6 characters"
            />
            {errors.username && (
              <span className="flex justify-start -mt-4 text-[#af2758]">
                This field is required
              </span>
            )}

            <label htmlFor="password" className="text-left">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className="border-2 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 8 characters"
            />
            {errors.password && (
              <span className="flex justify-start mt-1 text-[#af2758]">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col w-[453px]">
            <label htmlFor="dob" className="text-left">
              Date of Birth
            </label>
            <input
              {...register("dob", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="01/01/2022"
            />
            {errors.name && (
              <span className="flex justify-start -mt-4 text-[#af2758]">
                This field is required
              </span>
            )}

            <CityInputSelect
              label="City"
              name="city"
              control={control}
              selectedCountry={selectedCountry}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82] text-left"
            />
            {errors.city && (
              <span className="flex justify-start mt-1 -mb-6 text-[#af2758]">
                This field is required
              </span>
            )}

            <label htmlFor="mail" className="text-left mt-8">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="name@website.com"
            />
            {errors.email && (
              <span className="flex justify-start -mt-4 text-[#af2758]">
                This field is required
              </span>
            )}

            <label htmlFor="confirmPassword" className="text-left">
              Confirm password
            </label>
            <input
              {...register("confirmPassword", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 8 characters"
            />
            {errors.confirmPassword && (
              <span className="flex justify-start -mt-4 text-[#af2758]">
                This field is required
              </span>
            )}
          </div>
          <input
            className="flex justify-end items-center absolute bottom-0"
            type="submit"
          />
        </form>
      </div>
    </>
  );
}
//<input type="submit" />

Step1Inputs.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default Step1Inputs;
