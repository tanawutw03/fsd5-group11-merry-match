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

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

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
      <div className="flex flex-col w-full h-full">
        <div className="h-[70px]">
          <h1 className="text-2xl text-[#A62D82] font-bold text-left w-full pl-28">
            Basic Information
          </h1>
        </div>

        <form className="flex justify-center items-center w-full gap-5 h-[500px]">
          <div className="flex flex-col w-1/4">
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
            {errors.location && (
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

          <div className="flex flex-col w-1/4">
            <label htmlFor="dob" className="text-left">
              Date of birth
            </label>
            <input
              {...register("dob", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="01/01/2022"
              onChange={handleInputChange}
              type="date"
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
              className="border-2 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
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
