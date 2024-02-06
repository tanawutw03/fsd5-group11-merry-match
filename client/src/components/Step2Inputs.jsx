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

  const [formData, setFormData] = useState({});
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
      ...formData,
      hobbies: initialHobbies.map((hobby) => hobby.value),
    };

    setFormData(initialFormData);
    onFormChange(initialFormData);
  }, []); // This effect runs once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("handleInputChange - name:", name, "value:", value);

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    onFormChange(updatedFormData);
    console.log(formData);
  };

  const handleHobbyChange = (selectedHobbyData) => {
    console.log(selectedHobbyData);

    const updatedFormData = {
      ...formData,
      hobbies: selectedHobbyData.map((hobby) => hobby.value),
    };

    setFormData(updatedFormData);
    setSelectedHobby(selectedHobbyData);
    onFormChange(updatedFormData);
  };

  return (
    <>
      <div>
        <div className="flex justify-end absolute font-nunito gap-3 right-40 top-28 bg-[#fcfcfe]">
          <div className="w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center">
            <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex justify-center items-center text-2xl font-bold text-gray-600">
              1
            </div>
          </div>
          <div className="h-20 w-[288px] p-4 pr-8 border border-[#A62D82] rounded-2xl flex justify-start items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-200 flex justify-center items-center text-[#A62D82] text-2xl font-bold">
              2
            </div>
            <div className="flex flex-col items-start">
              <p className="text-gray-700 text-xs font-medium">Step 2/3</p>
              <p className="text-[#A62D82] text-base font-extrabold">
                Identities and Interests
              </p>
            </div>
          </div>

          <div className="w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center">
            <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex justify-center items-center text-2xl font-bold text-gray-600">
              3
            </div>
          </div>
        </div>

        <div>
          <h1 className="flex justify-start left-[290px] top-[290px] pb-5 text-2xl text-[#A62D82] font-bold font-nunito">
            Identities&nbsp;and&nbsp;Interests
          </h1>
        </div>
        <form className="grid grid-cols-2 gap-10 text-left ">
          <div className="h-[48px] w-[453px] flex flex-col">
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

          <div className="h-[48px] w-[453px] flex flex-col">
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
          <div className="justify-center absolute w-[946px] h-[53px] top-3/4 text-left">
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
        </form>
      </div>
    </>
  );
}

Step2Inputs.propTypes = {
  onFormChange: PropTypes.func.isRequired,
};

export default Step2Inputs;
