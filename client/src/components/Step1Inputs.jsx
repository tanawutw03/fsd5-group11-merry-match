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
      <div className="font-nunito">
        <div>
          <h1 className="flex justify-start absolute left-[290px] top-[280px] pb-2 2xl:pt-[70px] text-2xl text-[#A62D82] font-bold">
            Basic Information
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-center ml-1 mt-72 gap-10"
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
            {errors.name && <span>This field is required</span>}

            <CountryInputSelect
              control={control}
              name="location"
              label="Location"
              onCountryChange={setSelectedCountry}
            />

            <label htmlFor="username" className="text-left">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 6 characters"
            />
            {errors.username && <span>This field is required</span>}

            <label htmlFor="password" className="text-left">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className="border-2 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 8 characters"
            />
            {errors.password && <span>This field is required</span>}
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

            <label htmlFor="city" className="text-left">
              City
            </label>
            <input
              {...register("city", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="Bangkok"
            />
            {errors.city && <span>This field is required</span>}

            <label htmlFor="email" className="text-left">
              Email
            </label>
            <CityInputSelect
              label="City"
              name="city"
              control={control}
              selectedCountry={selectedCountry}
            />
            {errors.city && <span>This field is required</span>}

            <label htmlFor="mail">Email</label>
            <input
              {...register("email", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="name@website.com"
            />
            {errors.email && <span>This field is required</span>}

            <label htmlFor="confirmPassword" className="text-left">
              Confirm password
            </label>
            <input
              {...register("confirmPassword", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
            />

            {errors.confirmPassword && <span>This field is required</span>}
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

Step1Inputs.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default Step1Inputs;
