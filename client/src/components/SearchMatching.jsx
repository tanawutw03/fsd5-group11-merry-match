import { Checkbox } from "@chakra-ui/react";
import SliderAge from "./SliderAge";
import { useUser } from "../app/userContext.js";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

function SearchMatching() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const navigate = useNavigate();
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(31);
  const [searchSex, setSearchSex] = useState([]);
  const [userData, setUserData] = useState("");
  const userId = user.user.id;

  useEffect(() => {
    async function fetchUserProfile() {
      const { data, error } = await supabase
        .from("search_user")
        .select("sex_preferences")
        .eq("id", userId)
        .single();
      if (error) {
        console.error("Error fetching user profile:", error.message);
        // Handle error appropriately
      } else {
        if (data) {
          setUserData(data.sex_preferences);
          setSearchSex([data.sex_preferences]);
        } else {
          console.log("User profile not found.");
        }
      }
    }

    // Fetch user profile data
    fetchUserProfile();
  }, [user]);

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSearchSex([...searchSex, value]);
    } else {
      setSearchSex(searchSex.filter((item) => item !== value));
    }
  };

  const handleSearch = async () => {
    try {
      await supabase
        .from("search_user")
        .update({
          sex_preferences: searchSex,
          min_age: minAge,
          max_age: maxAge,
        })
        .eq("id", userId);
      console.log("Search preferences updated successfully!");
    } catch (error) {
      console.error("Error updating search preferences:", error.message);
      // Handle error appropriately
    }
  };

  const handleClear = () => {
    setSearchSex(userData);
    setMinAge(18);
    setMaxAge(31);
  };

  return (
    <>
      <div className="flex-col flex ml-2 w-[220] h-[900px] justify-between">
        <div>
          <p className="text-[#191C77] text-base font-bold mt-[60px]">
            Sex you interest
          </p>
          <div className="mt-2 flex flex-col">
            {userData === "male" && (
              <>
                <Checkbox
                  colorScheme="pink"
                  defaultChecked
                  mt={2}
                  onChange={handleCheckboxChange}
                  value="male"
                >
                  default
                </Checkbox>
                <Checkbox
                  colorScheme="pink"
                  onChange={handleCheckboxChange}
                  value="female"
                >
                  female
                </Checkbox>
                <Checkbox
                  colorScheme="pink"
                  onChange={handleCheckboxChange}
                  value="other"
                >
                  Non-binary people
                </Checkbox>
              </>
            )}

            {userData === "female" && (
              <>
                <Checkbox
                  colorScheme="pink"
                  defaultChecked
                  mt={2}
                  onChange={handleCheckboxChange}
                  value="female"
                >
                  default
                </Checkbox>
                <Checkbox
                  colorScheme="pink"
                  onChange={handleCheckboxChange}
                  value="male"
                >
                  male
                </Checkbox>
                <Checkbox
                  colorScheme="pink"
                  onChange={handleCheckboxChange}
                  value="other"
                >
                  Non-binary people
                </Checkbox>
              </>
            )}

            {userData === "other" && (
              <>
                <Checkbox
                  colorScheme="pink"
                  defaultChecked
                  mt={2}
                  onChange={handleCheckboxChange}
                  value="other"
                >
                  default
                </Checkbox>
                <Checkbox
                  colorScheme="pink"
                  onChange={handleCheckboxChange}
                  value="male"
                >
                  male
                </Checkbox>
                <Checkbox
                  colorScheme="pink"
                  onChange={handleCheckboxChange}
                  value="female"
                >
                  female
                </Checkbox>
              </>
            )}
          </div>

          <div className="mt-[60px]">
            <p>Age Range</p>
            <SliderAge
              onRangeChange={(values) => {
                setMinAge(values.min_age);
                setMaxAge(values.max_age);
              }}
            />
          </div>
        </div>
        <div className="h-1/3 flex justify-around">
          <button
            className="flex p-3 w-fit h-fit text-[#95002B] text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-white"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="flex p-3 w-fit h-fit text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchMatching;
