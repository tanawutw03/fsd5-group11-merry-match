import { useForm } from "react-hook-form";
import { Select } from "@chakra-ui/react";
import TagSelect from "./common/TagSelect.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import makeAnimated from "react-select/animated";
import hobbiesOptions from "../data/hobbiesData.js";
import { useEffect } from "react";
function Step2Inputs({ onFormChange }) {
  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  // const [formData, setFormData] = useState({});
  const [selectedHobby, setSelectedHobby] = useState([]);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    // Initialize formData with default values of hobbies
    const initialHobbies = [
      hobbiesOptions[0],
      hobbiesOptions[1],
      hobbiesOptions[2],
    ];

    const initialFormData = {
      ...selectedHobby,
      hobbies: initialHobbies.map((hobby) => hobby.value),
    };
    setSelectedHobby(initialHobbies);
    onFormChange(initialFormData);
  }, []); // This effect runs once on component mount

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
      <div className="flex flex-col w-full h-full">
        <div className="h-[70px]">
          <h1 className="text-2xl text-[#A62D82] font-bold text-left w-full pl-28">
            Identities&nbsp;and&nbsp;Interests
          </h1>
        </div>

        <form className="flex flex-col justify-center w-full h-[500px]">
          <div className="flex w-full justify-center gap-5">
            <div className="flex flex-col w-1/4">
              <h3>Sexual&nbsp;Identities</h3>
              <Select
                placeholder="Select option"
                {...register("sex_identities")}
                name="sex_identities"
                mb={10}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>

              <h3>Racial&nbsp;Preferences</h3>
              <Select
                placeholder="Select option"
                {...register("racial_preferences")}
                name="racial_preferences"
                onChange={handleInputChange}
              >
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

            <div className="flex flex-col w-1/4">
              <h3>Sexual&nbsp;Preferences</h3>
              <Select
                placeholder="Select option"
                {...register("sex_preference")}
                mb={10}
                name="sex_preferences"
                onChange={(e) => handleInputChange(e, "sex_identities")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>

              <h3>Meeting&nbsp;Interests</h3>
              <Select
                placeholder="Select option"
                {...register("meeting_interest")}
                name="meeting_interest"
                onChange={handleInputChange}
              >
                <option value="date">Date</option>
                <option value="friends">Friends</option>
                <option value="other">Other</option>
              </Select>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="flex flex-col w-1/2">
              <h3 className="pt-10">
                Hobbies&nbsp;/&nbsp;Interests&nbsp;(Maximum&nbsp;10)
              </h3>

              <TagSelect
                control={control}
                name="hobbies"
                onHobbyChange={handleHobbyChange}
                label=""
                options={hobbiesOptions}
                defaultValue={[
                  hobbiesOptions[0],
                  hobbiesOptions[1],
                  hobbiesOptions[2],
                ]}
                max={10}
                components={animatedComponents}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

Step2Inputs.propTypes = {
  onFormChange: PropTypes.func.isRequired,
};

export default Step2Inputs;
