import { useForm } from "react-hook-form";
import InputSelect from "../components/common/InputSelect.jsx";
import { supabase } from "../utils/supabaseClient.js";
import { useState, useEffect, useRef } from "react";

function Step1Inputs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [userId, setUserId] = useState(null);
  const formDataRef = useRef(null);

  const onSubmit = async (formData) => {
    console.log(formData);
    formDataRef.current = formData; // Store formData in the ref
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      console.log("Sign-up Response:", { signUpData, error });

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("User signed up successfully:", signUpData.user.id);

        setUserId(signUpData.user.id);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      if (userId !== null) {
        console.log("userId:", userId);

        const insertUserData = async () => {
          try {
            const { data: insertData, error: insertError } = await supabase
              .from("profiles")
              .upsert({
                id: userId,
                username: formDataRef.current.username,
                full_name: formDataRef.current.name,
                country: formDataRef.current.location.value,
                city: formDataRef.current.city,
                email: formDataRef.current.email,
                date_of_birth: formDataRef.current.dob,
                updated_at: new Date(),
              })
              .select();

            console.log(insertData, insertError);

            if (insertError) {
              console.error("Error inserting user data:", insertError.message);
            } else {
              console.log("User data inserted successfully:", insertData);
            }
          } catch (error) {
            console.error("Error inserting user data:", error.message);
          }
        };

        insertUserData();
      }
    };

    checkUserAuthentication();
  }, [userId]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <div className="font-nunito">
        <div>
          <h1 className="flex justify-start absolute left-[290px] top-[280px] pb-2 2xl:pt-[70px] text-2xl text-[#A62D82] font-bold">
            Basic Information
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-center ml-1 mt-72 gap-10"
        >
          <div className="flex flex-col w-[453px]">
            <label htmlFor="name" className="text-left">
              Name
            </label>
            <input
              defaultValue=""
              {...register("name", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="John Snow"
              type="text"
            />
            {errors.name && <span>This field is required</span>}

            <InputSelect control={control} name="location" label="Location" />

            <label htmlFor="username" className="text-left">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 6 characters"
            />
            {errors.username && <span>This field is required</span>}

            <label htmlFor="password" className="text-left">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className="border-2 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 8 characters"
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
            />

            <label htmlFor="city" className="text-left">
              City
            </label>
            <input
              {...register("city", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="Bangkok"
            />
            {errors.city && <span>This field is required</span>}

            <label htmlFor="email" className="text-left">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="name@website.com"
            />
            {errors.email && <span>This field is required</span>}

            <label htmlFor="confirm-password" className="text-left">
              Confirm-password
            </label>
            <input
              {...register("confirm-password", { required: true })}
              className="border-2 px-3 py-2 mb-6 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a62d82]"
              placeholder="At least 8 characters"
            />
            {errors.password && <span>This field is required</span>}
          </div>
        </form>
      </div>
    </>
  );
}

export default Step1Inputs;
