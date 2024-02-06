import { useForm } from "react-hook-form";
import { Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TagSelect from "./common/TagSelect.jsx";
import ChakraButton from "./common/ChakraButton.jsx";
import PropTypes from "prop-types";
import { useState } from "react";

const hobbiesOptions = [
  { value: "e-sports", label: "E-sports" },
  { value: "series", label: "Series" },
  { value: "workout", label: "Workout" },
  { value: "travel", label: "Travel" },
  { value: "movies", label: "Movies" },
  { value: "photography", label: "Photography" },
  { value: "singing", label: "Singing" },
  { value: "meditation", label: "Meditation" },
  { value: "painting", label: "Painting" },
  { value: "music", label: "Music" },
  { value: "cafe", label: "Cafe hopping" },
  { value: "party", label: "Party" },
  { value: "festival", label: "Festival" },
];
function Step2Inputs({ onFormChange }) {
  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  const [formData, setFormData] = useState({});
  const [selectedHobby, setSelectedHobby] = useState([{}]);

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

    const hobbyValues = selectedHobbyData.map((hobby) => hobby.value);
    setSelectedHobby(selectedHobbyData);

    const updatedFormData = {
      ...formData,
      hobbies: hobbyValues,
    };

    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  return (
    <>
      <div className="flex flex-col justify-between item-center w-[930px] h-full font-nunito bg-[#fcfcfe] mb-[100px]">
        <div className="flex justify-start my-[30px]">
          <h1 className="text-2xl text-[#A62D82] font-bold">
            Identities&nbsp;and&nbsp;Interests
          </h1>
        </div>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2  text-left item-center "
        >
          {/* First selector column */}
          <div className="h-[48px] w-[453px] flex flex-col justify-center my-[10%]">
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

          {/* Second selector column */}
          <div className="h-[48px] w-[453px] flex flex-col justify-center my-[10%]">
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
              // onChange={(event) => {
              //   handleInputChange(event);
              //   console.log(event.target.value);
              // }}
              onChange={handleInputChange}
            >
              <option value="date">Date</option>
              <option value="friends">Friends</option>
              <option value="other">Other</option>
            </Select>
          </div>
          <div className=" justify-center item-center w-full  h-[53px]  text-left col-span-2">
            <h3 className="pt-10">
              Hobbies&nbsp;/&nbsp;Interests&nbsp;(Maximum&nbsp;10)
            </h3>
            <TagSelect
              control={control}
              name="hobbies"
              onHobbyChange={handleHobbyChange}
              label=""
              options={hobbiesOptions}
              max={10}
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
