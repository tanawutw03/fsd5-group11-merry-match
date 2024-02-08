import { useForm } from "react-hook-form";
import { Select } from "@chakra-ui/react";
import TagSelect from "./common/TagSelect.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import makeAnimated from "react-select/animated";
import hobbiesOptions from "../data/hobbiesData.js";
import { useEffect } from "react";
import { Textarea } from "@chakra-ui/react";
function Step2Inputs({ onFormChange }) {
  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  // const [formData, setFormData] = useState({});
  const [selectedHobby, setSelectedHobby] = useState([]);
  const animatedComponents = makeAnimated();

  // useEffect(() => {
  //   // Initialize formData with default values of hobbies
  //   const initialHobbies = [
  //     hobbiesOptions[0],
  //     hobbiesOptions[1],
  //     hobbiesOptions[2],
  //   ];

  //   const initialFormData = {
  //     ...selectedHobby,
  //     hobbies: initialHobbies.map((hobby) => hobby.value),
  //   };
  //   setSelectedHobby(initialHobbies);
  //   onFormChange(initialFormData);
  // }, []); // This effect runs once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const handleHobbyChange = (selectedHobbyData) => {
    setSelectedHobby(selectedHobbyData);
    const hobbies = selectedHobbyData.map((hobby) => hobby.value);
    onFormChange({ hobbies });
  };

  return (
    <>
      <div className="w-full h-full">
        <h1 className="text-2xl text-[#A62D82] font-bold text-left w-2/3 m-4">
          Identities&nbsp;and&nbsp;Interests
        </h1>
        <div className="flex justify-center items-center">
          <form className="flex flex-col gap-10 w-2/3">
            {/* Row 1 - Sexual Identities and Preferences */}
            <div className="flex flex-row justify-between gap-4 text-left">
              <div className="flex flex-col w-1/2">
                <h3>Sexual Identities</h3>
                <Select
                  placeholder="Select option"
                  {...register("sex_identities")}
                  onChange={handleInputChange}
                >
                  {/* Options */}
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>
              <div className="flex flex-col w-1/2">
                <h3>Sexual Preferences</h3>
                <Select
                  placeholder="Select option"
                  {...register("sex_preferences")}
                  onChange={handleInputChange}
                >
                  {/* Options */}
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>
            </div>

            {/* Row 2 - Racial Preferences and Meeting Interests */}
            <div className="flex flex-row justify-between gap-4 text-left">
              <div className="flex flex-col w-1/2">
                <h3>Racial Preferences</h3>
                <Select
                  placeholder="Select option"
                  {...register("racial_preferences")}
                  onChange={handleInputChange}
                >
                  {/* Options */}
                  <option value="asian">Asian</option>
                  <option value="black">Black</option>
                  <option value="indian">Indian</option>
                  <option value="latino">Latino</option>
                  <option value="mideast">Middle Eastern</option>
                  <option value="white">White</option>
                  <option value="multi">Multi-Racial</option>
                  <option value="other">Other</option>
                </Select>
              </div>
              <div className="flex flex-col w-1/2">
                <h3>Meeting Interests</h3>
                <Select
                  placeholder="Select option"
                  {...register("meeting_interest")}
                  onChange={handleInputChange}
                >
                  {/* Options */}
                  <option value="date">Date</option>
                  <option value="friends">Friends</option>
                  <option value="other">Other</option>
                </Select>
              </div>
            </div>

            {/* Row 3 - Hobbies/Interests */}
            <div className="flex flex-col w-full text-left">
              <TagSelect
                control={control}
                name="hobbies"
                label="Hobbies / Interests (Maximum 10)"
                onHobbyChange={handleHobbyChange}
                options={hobbiesOptions}
                max={10}
                components={animatedComponents}
              />
            </div>

            {/* Row 4 - About Me Text Area */}
            <div className="flex flex-col w-full text-left">
              <label htmlFor="description">
                About me (Maximum 150 characters)
              </label>
              <Textarea
                placeholder="Say something about you"
                name="description"
                size="lg"
                {...register("description")}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

Step2Inputs.propTypes = {
  onFormChange: PropTypes.func.isRequired,
};

export default Step2Inputs;
