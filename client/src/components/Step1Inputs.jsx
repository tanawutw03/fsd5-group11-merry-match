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
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2">
          <div className="flex flex-col border-2 border-blue-700 ">
            <label htmlFor="name">Name</label>
            <input
              defaultValue=""
              {...register("name", { required: true })}
              className="border-2"
              placeholder="John Snow"
              type="text"
            />
            {errors.name && <span>This field is required</span>}

            <InputSelect control={control} name="location" label="Location" />

            <label htmlFor="username">Username</label>
            <input
              {...register("username", { required: true })}
              className="border-2 "
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
          <div className="flex flex-col border-2 border-red-700">
            <label htmlFor="dob">dob</label>
            <input
              {...register("dob", { required: true })}
              className="border-2"
              placeholder="01/01/2022"
            />

            <label htmlFor="city">city</label>
            <input
              {...register("city", { required: true })}
              className="border-2"
              placeholder="Bangkok"
            />
            {errors.city && <span>This field is required</span>}

            <label htmlFor="email">email</label>
            <input
              {...register("email", { required: true })}
              className="border-2"
              placeholder="name@website.com"
            />
            {errors.email && <span>This field is required</span>}

            <label htmlFor="confirm-password">confirm-password</label>
            <input
              {...register("confirm-password", { required: true })}
              className="border-2"
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
