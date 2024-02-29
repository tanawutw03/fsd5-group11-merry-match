import merrymatch from "../assets/MerryMatch/merrymatch.png";
import { useUser } from "../app/userContext";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ButtonNewMatch from "./ButtonNewMatch";
const LeftSideMatching = ({ mutualMatch }) => {
  const [merryMatch, setMerryMatch] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    console.log(`mutualMatch:`, mutualMatch);
    const id = user.user.id;

    async function fetchMerryMatch() {
      try {
        const response = await axios.get(
          `http://localhost:4008/match/api/v1/mutual_matches/${id}`
        );

        const data = response.data.data;
        setMerryMatch(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    // Always fetch data when mutualMatch changes
    if (mutualMatch) {
      fetchMerryMatch();
    }

    fetchMerryMatch();
    return () => {};
  }, [user.user.id, mutualMatch]);

  return (
    <div className="w-2/6 h-screen">
      <div className="flex flex-col items-center pt-5 ">
        <ButtonNewMatch />
      </div>

      <div className="pl-5 mt-10 border-t border-solid border-t-[color:var(--gray-300,#E4E6ED)] ">
        <h1 className="text-xl font-bold">Merry Match!</h1>
        <div className="flex overflow-x-auto gap-3 px-5 mt-4 w-96 h-36 scrollbar-hide md:scrollbar-default hover:cursor-grab active:cursor-grabbing ">
          {[...merryMatch].reverse().map((profile) => (
            <div
              key={profile.id}
              className="flex overflow-hidden relative flex-col     pt-12 pl-36 rounded-xl "
            >
              <img
                className="object-cover absolute inset-0 w-36 h-36"
                src={profile.avatar_url[0].publicUrl}
              />
              <img
                className="w-6 h-6 absolute bottom-0 right-0 "
                src={merrymatch}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 ml-5 ">
        <h1 className="text-xl font-bold">Chat with Merry Match</h1>
        <div className="flex flex-col pt-5 gap-3 h-[420px] overflow-y-auto scrollbar-hide md:scrollbar-default hover:cursor-grab active:cursor-grabbing    ">
          {[...merryMatch].reverse().map((profile) => (
            <div key={profile.id} className="w-96  h-20 flex flex-row  ">
              <div className="rounded-full w-20 h-20">
                <img
                  className=" rounded-full w-16 h-16"
                  src={profile.avatar_url[0].publicUrl}
                />
              </div>
              <div className="w-96 pl-2 ">
                <p>{profile.full_name}</p>
                <p>You know nothing Jon Snow</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
LeftSideMatching.propTypes = {
  mutualMatch: PropTypes.bool,
};

export default LeftSideMatching;
