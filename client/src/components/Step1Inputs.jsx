import { useForm } from "react-hook-form";
import InputSelect from "../components/common/InputSelect.jsx";
import { supabase } from "../utils/supabaseClient.js";
import ChakraButton from "./common/ChakraButton.jsx";
import { useNavigate } from "react-router-dom";

function Step1Inputs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      // Step 1: Sign up the user
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      console.log("Sign-up Response:", { signUpData, error });

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("User signed up successfully:", signUpData.user.id);

        alert(
          "We just sent you a magic link to your email - click it to activate your account and start merry!"
        );

        // Step 2: Fetch user data using the UUID from signUp
        const { data: userData, error: fetchError } =
          await supabase.auth.getUser(signUpData.user.id);

        if (fetchError) {
          console.error("Error fetching user data:", fetchError.message);
        } else {
          // Step 3: Insert user data into the 'users' table
          const { data: insertData, error: insertError } = await supabase
            .from("users")
            .insert({
              // user_id: userData.id, // Ensure consistency with fetched UUID
              username: formData.username,
              email: formData.email,
              password: formData.password,
              // name: formData.name,
              // city: formData.city,
              // dob: formData.dob,
              // location: formData.location,
            })
            .select();

          console.log(insertData);

          if (insertError) {
            console.error("Error inserting user data:", insertError.message);
          } else {
            console.log("User data inserted successfully:", userData);
            // You can redirect the user to another page or perform additional actions here
          }
          // Step 4: Upload profile pictures
          const pictures = formData.profilePictures;

          if (pictures.length < 2 || pictures.length > 5) {
            console.error("Please upload between 2 and 5 profile pictures");
            return;
          }

          // Example: Upload pictures to Supabase storage
          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("profile-pictures")
              .upload("user-id/profile-picture", pictures, {
                cacheControl: "3600",
              });

          if (uploadError) {
            console.error(
              "Error uploading profile pictures:",
              uploadError.message
            );
          } else {
            console.log("Profile pictures uploaded successfully:", uploadData);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleNext = () => {
    navigate("/register2");
    console.log("Navigating to the next page");
  };

  const handlePrev = () => {
    navigate("/");
    console.log("Navigating to the prev page");
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <div className="h-full w-screen flex justify-center items-center border-2 border-red-700 ">
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
          <div className="h-fit w-[450px] flex flex-col border-2 border-red-700 gap-10">
            <input
              {...register("dob", { required: true })}
              className="border-2"
              placeholder="01/01/2022"
            />

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
      <div className="w-screen flex justify-end p-5">
        <ChakraButton name="Back" color="gray" onNext={handlePrev} />
        <ChakraButton name="Next Step" color="red" onNext={handleNext} />
      </div>
    </>
  );
}

export default Step1Inputs;
