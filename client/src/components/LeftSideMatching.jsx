import seach from "../assets/Matching/search.svg";
import merrymatch from "../assets/MerryMatch/merrymatch.png";
import { useUser } from "../app/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LeftSideMatching = ({ mutualMatch, onMutualMatchClick }) => {
  const navigate = useNavigate();
  const [merryMatch, setMerryMatch] = useState([]);
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();

  const openChat = (profile) => {
    console.log("Open chatroom with mutual match:", profile);
    onMutualMatchClick(profile);
  };

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
    <div className="w-1/4 h-screen">
      <div className="flex flex-col items-center pt-5">
        <div className="flex  flex-col justify-center items-center w-[282px] h-[187px] border-[#A62D82] border rounded-[16px]">
          <img className="w-[55px] h-[55px]" src={seach} />
          <h1 className="text-xl font-bold text-[#95002B]">
            Discover New Match
          </h1>
          <p className="text-xs h-[42px] w-[234px] text-center">
            Start find and Merry to get know and connect with new friend!.
          </p>
        </div>
      </div>

      <div className="p-5">
        <div>
          <h1 className="text-xl font-bold">Merry Match!</h1>
          <div className="flex gap-2 w-full">
            {[...merryMatch].reverse().map((profile) => (
              <div
                key={profile.id}
                className=" relative w-16 h-16 snap-start "
                onClick={() => openChat(profile)}
              >
                <img
                  className="rounded-2xl w-16 h-16"
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
      </div>

      <div className="mt-5 ml-5">
        <h1 className="text-xl font-bold">Chat with Merry Match</h1>
        <div className="flex flex-col pt-2 gap-3  ">
          {[...merryMatch].reverse().map((profile) => (
            <div key={profile.id} className="w-96  h-16 flex flex-row ">
              <div className="rounded-full w-20 h-20">
                <img
                  className=" rounded-full w-16 h-16"
                  src={profile.avatar_url[0].publicUrl}
                />
              </div>
              <div className="w-96 pl-2 ">
                <p>Ygritte</p>
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
  onMutualMatchClick: PropTypes.func,
};

export default LeftSideMatching;
