<<<<<<< HEAD
<<<<<<< HEAD
import { useForm } from "react-hook-form";
import InputSelect from "../components/common/InputSelect";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="h-screen w-screen flex justify-center items-center border-2 border-red-700 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-5"
      >
<<<<<<< HEAD
=======
        <div className=" justify-start">
          <div>Register</div>
          <div className="text-5xl max-w-md h-28 text-[#A62D82]">
            Join us and start matching
          </div>
        </div>
>>>>>>> 1bd7889 (feat:commit)
        <div className="h-fit w-[450px] flex flex-col border-2 border-blue-700 ">
          <label htmlFor="name">Name</label>
          <input
            defaultValue=""
            {...register("name", { required: true })}
            className="border-2 mb-10"
            placeholder="John Snow"
            type="text"
          />
          {errors.name && <span>This field is required</span>}

          <InputSelect control={control} name="location" label="Location" />

          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: true })}
            className="border-2 mb-10"
            placeholder="At least 6 characters"
          />
          {errors.username && <span>This field is required</span>}

          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            className="border-2"
            placeholder="At least 8 characters"
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div className="h-fit w-fit flex flex-col border-2 border-red-700 gap-10">
          <input
            {...register("dob", { required: true })}
            className="border-2"
            placeholder="01/01/2022"
          />
          {errors.dob && <span>This field is required</span>}

          <input
            {...register("city", { required: true })}
            className="border-2"
            placeholder="Bangkok"
          />
          {errors.city && <span>This field is required</span>}

          <input
            {...register("email", { required: true })}
            className="border-2"
            placeholder="name@website.com"
          />
          {errors.email && <span>This field is required</span>}

          <input
            {...register("confirm-password", { required: true })}
            className="border-2"
            placeholder="At least 8 characters"
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <input type="submit" />
=======
=======
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Country } from "country-state-city";
import { useState, useEffect } from "react";

>>>>>>> 8cbd79b (fix:add register page step 1)
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [countries, setCountries] = useState([]); // State to store countries
  const [selectedOption, setSelectedOption] = useState(null);

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    // Fetch countries data within a useEffect hook
    async function fetchCountries() {
      const fetchedCountries = await Country.getAllCountries();
      setCountries(fetchedCountries);
    }
    fetchCountries();
  }, []);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="h-screen w-screen flex justify-center items-center border-2 border-red-700 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-5"
      >
        <div className="h-fit w-[450px] flex flex-col border-2 border-blue-700 ">
          <label htmlFor="name">Name</label>
          <input
            defaultValue=""
            {...register("name", { required: true })}
            className="border-2 mb-10"
            placeholder="John Snow"
            type="text"
          />
          {errors.name && <span>This field is required</span>}

          <label htmlFor="location">Location</label>
          <Select
            defaultValue={selectedOption}
            {...register("location", { required: true })}
            onChange={setSelectedOption}
            options={countries.map((country) => ({
              value: country.name, // Use country.name as value for Select
              label: country.name,
            }))}
            isSearchable
            // Add loading state while fetching countries
            isLoading={!countries.length}
            placeholder={
              !countries.length ? "Loading countries..." : "Select a country"
            }
          />

          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: true })}
            className="border-2 mb-10"
            placeholder="At least 6 characters"
          />
          {errors.username && <span>This field is required</span>}

          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            className="border-2"
            placeholder="At least 8 characters"
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div className="h-fit w-fit flex flex-col border-2 border-red-700 gap-10">
          <input
            {...register("dob", { required: true })}
            className="border-2"
            placeholder="01/01/2022"
          />
          {errors.dob && <span>This field is required</span>}

          <input
            {...register("city", { required: true })}
            className="border-2"
            placeholder="Bangkok"
          />
          {errors.city && <span>This field is required</span>}

          <input
            {...register("email", { required: true })}
            className="border-2"
            placeholder="name@website.com"
          />
          {errors.email && <span>This field is required</span>}

          <input
            {...register("password", { required: true })}
            className="border-2"
            placeholder="At least 8 characters"
          />
          {errors.password && <span>This field is required</span>}
        </div>
<<<<<<< HEAD
>>>>>>> bd08fb3 (fix: add register page)
=======
        <input type="submit" className="" />
>>>>>>> 8cbd79b (fix:add register page step 1)
      </form>
    </div>
  );
};

export default RegisterPage;
