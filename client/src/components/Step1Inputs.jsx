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

  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onFormChange(formData); // Pass the updated data to the parent component
  };

  // Use onCountryChange to update selectedCountry and trigger form change
  const handleCountryChange = (selectedCountryData) => {
    setSelectedCountry(selectedCountryData); // Set the selected country data
    const updatedFormData = {
      ...formData,
      location: selectedCountryData ? selectedCountryData.value : "", // Use the selected country value
    };
    setFormData(updatedFormData);
    onFormChange(updatedFormData); // Pass the updated data to the parent component
  };

  const handleCityChange = (selectedCityData) => {
    console.log(selectedCityData);
    setSelectedCity(selectedCityData);
    const updatedFormData = {
      ...formData,
      city: selectedCityData ? selectedCityData.value : "",
    };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  return (
    <>
      <div className="font-nunito h-screen w-screen mt-10">
        <div>
          <h1 className="flex flex-col items-start mt-[17%] left-72 absolute text-2xl text-[#A62D82] font-bold">
            Basic Information
          </h1>
        </div>
        <form className="flex flex-row justify-center mr-4 mt-[300px] gap-10">
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
            {errors.name && <span>This field is required</span>}

            <CountryInputSelect
              control={control}
              name="location"
              label="Location"
              onCountryChange={handleCountryChange}
            />
            {errors.name && <span>This field is required</span>}

            <label htmlFor="username" className="text-left">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 6 characters"
              onChange={handleInputChange}
            />
            {errors.username && <span>This field is required</span>}

            <label htmlFor="password" className="text-left">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className="border-2 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 8 characters"
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
            {errors.name && <span>This field is required</span>}

            <CityInputSelect
              label="City"
              name="city"
              control={control}
              selectedCountry={selectedCountry}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82] text-left"
              onCityChange={handleCityChange}
            />
            {errors.city && <span>This field is required</span>}

            <label htmlFor="mail" className="text-left mt-8">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="name@website.com"
              onChange={handleInputChange}
            />
            {errors.email && <span>This field is required</span>}

            <label htmlFor="confirmPassword" className="text-left">
              Confirm password
            </label>
            <input
              {...register("confirmPassword", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 8 characters"
              onChange={handleInputChange}
            />
            {errors.confirmPassword && <span>This field is required</span>}
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
