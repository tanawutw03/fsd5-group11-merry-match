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
        <div className=" justify-start">
          <div>Register</div>
          <div className="text-5xl max-w-md h-28 text-[#A62D82]">
            Join us and start matching
          </div>
        </div>
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
      </form>
    </div>
  );
};

export default RegisterPage;
