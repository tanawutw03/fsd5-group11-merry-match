import { useForm } from "react-hook-form";
import CountryInputSelect from "./common/CountryInputSelect.jsx";
import CityInputSelect from "./common/CityInputSelect.jsx";
import { useState } from "react";
import PropTypes from "prop-types";

function Step1Inputs({ onFormChange }) {
  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value }); // Pass the updated data to the parent component
  };

  // Use onCountryChange to update selectedCountry and trigger form change
  const handleCountryChange = (selectedCountryData) => {
    setSelectedCountry(selectedCountryData); // Set the selected country data
    onFormChange({
      location: selectedCountryData ? selectedCountryData.value : "",
    }); // Pass the updated data to the parent component
  };

  const handleCityChange = (selectedCityData) => {
    setSelectedCity(selectedCityData);
    onFormChange({ city: selectedCityData ? selectedCityData.value : "" }); // Pass the updated data to the parent component
  };

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
          onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onCountryChange={handleCountryChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              className="border-2 px-3 py-2 mb-7 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="01/01/2022"
              onChange={handleInputChange}
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
              className="border-2 px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82] text-left"
              onCityChange={handleCityChange}
            />
            {errors.city && (
              <span className="flex justify-start mt-1 -mb-6 text-[#af2758]">
                This field is required
              </span>
            )}

            <label htmlFor="mail" className="text-left mt-6">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="name@website.com"
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <span className="flex justify-start -mt-4 text-[#af2758]">
                This field is required
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
Step1Inputs.propTypes = {
  onFormChange: PropTypes.func.isRequired,
};

export default Step1Inputs;
