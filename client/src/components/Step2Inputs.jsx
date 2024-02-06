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
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-10 text-left "
        >
          {/* First selector column */}
          <div className="h-[48px] w-[453px] flex flex-col">
            <h3>Sexual&nbsp;Identities</h3>
            <Select defaultValue="male" {...register("sex")} mb={10}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>

            <h3>Racial&nbsp;Preferences</h3>
            <Select defaultValue="asian" {...register("racial_preference")}>
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
            <h3>Sexual&nbsp;Preferences</h3>
            <Select
              defaultValue="female"
              {...register("sex_preference")}
              mb={10}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>

            <h3>Meeting&nbsp;Interests</h3>
            <Select defaultValue="friends" {...register("meeting_interest")}>
              <option value="date">Date</option>
              <option value="friends">Friends</option>
              <option value="other">Other</option>
            </Select>

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className="justify-center absolute w-[946px] h-[53px] top-3/4 text-left">
            <h3 className="pt-10">
              Hobbies&nbsp;/&nbsp;Interests&nbsp;(Maximum&nbsp;10)
            </h3>
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
    </>
  );
}

export default Step2Inputs;
