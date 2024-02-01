import { useForm } from "react-hook-form";
import { Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TagSelect from "./common/TagSelect.jsx";
import ChakraButton from "./common/ChakraButton.jsx";

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

function Step2Inputs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/register3");
    console.log("Navigating to the next page");
  };

  const handlePrev = () => {
    navigate("/register1");
    console.log("Navigating to the prev page");
  };

  return (
    <>
      <div className="h-[300px] w-full flex flex-col items-center">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-10"
        >
          {/* First selector column */}
          <div className="h-[48px] w-[453px] flex flex-col">
            <h3>Sexual Identities</h3>
            <Select defaultValue="male" {...register("sex")} mb={10}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>

            <h3>Racial Preferences</h3>
            <Select
              defaultValue="asian"
              {...register("racial_preference")}
              mb={10}
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
          <div className="h-[48px] w-[453px] flex flex-col">
            <h3>Sexual Preferences</h3>
            <Select
              defaultValue="female"
              {...register("sex_preference")}
              mb={10}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>

            <h3>Meeting Interests</h3>
            <Select
              defaultValue="friends"
              {...register("meeting_interest")}
              mb={10}
            >
              <option value="date">Date</option>
              <option value="friends">Friends</option>
              <option value="other">Other</option>
            </Select>

            <input type="submit" className="flex justify-end mt-20" />
          </div>
          <div className="justify-center absolute w-[946px] h-[53px] bottom-52">
            <h3>Hobbies / Interests (Maximum 10)</h3>
            <TagSelect
              control={control}
              name="hobbies"
              label=""
              options={hobbiesOptions}
              defaultValue={[{ value: "e-sports" }, { value: "series" }]}
              max={10}
            />
          </div>
        </form>
      </div>
      <footer className="bottom-0 left-0 w-full h-112 p-5 bg-white shadow-md flex justify-end">
        <ChakraButton name="Back" color="gray" onNext={handlePrev} />
        <ChakraButton name="Next Step" color="red" onNext={handleNext} />
      </footer>
    </>
  );
}

export default Step2Inputs;
