import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { supabase } from "../utils/supabaseClient.js";
import action from "../assets/Matching/action button.svg";
import heart from "../assets/Matching/heart button (1).svg";
import { ArrowForwardIcon, ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import PropTypes from "prop-types";
import MerryMatch from "./MerryMatch.jsx";
import { useDisclosure } from "@chakra-ui/react";
import PopUpProfile from "./PopUpProfile.jsx";
function MerryCards({ user }) {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [mutualMatch, setMutualMatch] = useState(false);
  const { isOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [merryCount, setMerryCount] = useState();
  const [limitCount, setLimitCount] = useState();

  const onSwipe = async (direction, swipedUserId) => {
    console.log("You swiped: " + direction);
    console.log(`Your Id:`, user.user.id);
    console.log(`Your Swipe:`, swipedUserId);

    const swipedUserIdsArray = Array.isArray(swipedUserId)
      ? swipedUserId
      : [swipedUserId];
    console.log(swipedUserIdsArray);

    if (direction === "right" && user.user.id) {
      const response = await updateMatches(user.user.id, swipedUserIdsArray);

      const decreaseLimitResponse = await axios.put(
        "http://localhost:4008/merryLimit/count/" + user.user.id
      );

      if (response.message === "Mutual match") {
        setMutualMatch(true);
      }

      // Update merry count state
      const updatedMerryCount = merryCount - 1;
      setMerryCount(updatedMerryCount);
    } else if (direction === "left" && user.user.id) {
      const response = await updatedUnmatched(user.user.id, swipedUserIdsArray);
      // if(response.message === "User unmatched successfully"){}
      console.log(response);
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const updateMatches = async (swipingUserId, swipedUserIdsArray) => {
    try {
      const response = await axios.put(
        "http://localhost:4008/matching/api/v1/match",
        {
          userId: swipingUserId,
          matchedUserId: swipedUserIdsArray,
        }
      );

      console.log(response);
      return response.data; // Return the response for trigger modal
    } catch (error) {
      console.error("Error updating matches:", error);
      return null;
    }
  };

  const updatedUnmatched = async (swipingUserId, swipedUserIdsArray) => {
    try {
      const response = await axios.put(
        "http://localhost:4008/matching/api/v1/unmatch",
        {
          userId: swipingUserId,
          unmatchUserId: swipedUserIdsArray,
        }
      );

      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error updating unmatched:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch profile data
        const profileResponse = await axios.get(
          `http://localhost:4008/profile/api/v1/profile/${user.user.id}/5`
        );
        if (profileResponse.data.data.length === 0) {
          // Handle case when no profiles are fetched
        } else {
          setPeople(profileResponse.data.data);

          // Fetch merry count data
          const merryResponse = await axios.get(
            "http://localhost:4008/merryLimit/count/" + user.user.id
          );
          const limitResponse = await axios.get(
            "http://localhost:4008/merryLimit/limit/" + user.user.id
          );
          const currentDate = new Date().toISOString();
          const formattedDate = currentDate.substring(0, 10); // Extract 'yyyy-mm-dd'

          const { data: insertCurrentDate, error: errorInsertCurrentDate } =
            await supabase
              .from("merry_limits")
              .update({ last_login_date: formattedDate })
              .eq("id", user.user.id)
              .select();

          setMerryCount(merryResponse.data.remainingCount);
          setLimitCount(limitResponse.data.merry_limit);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
        setDataLoaded(true);
      }
    };

    fetchData();
  }, [user.user.id]);

  useEffect(() => {
    if (mutualMatch) {
      console.log(`Open the modal:`, mutualMatch);
      setIsModalOpen(true);
    }
  }, [mutualMatch]);

  return (
    <div className="w-[700px] flex justify-center items-center ">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {dataLoaded && !isLoading && !error && people.length > 0 && (
        <div className="h-[936px] w-full bg-[#160404] flex justify-center relative items-center gap-5 border-2 overflow-hidden borer-4 border-amber-500 ">
          <div className="flex  flex-row absolute bottom-16 z-30 ">
            <img className=" w-[90px] h-[90px]  " src={action} />
            <img className=" w-[90px] h-[90px] " src={heart} />
          </div>
          <div className=" flex flex-row  absolute z-20 bottom-4 ">
            <p className="text-[#646D89]">Merry limit today</p>
            <p className="  text-[#FF1659]">{`${merryCount} / ${limitCount}`}</p>
          </div>

          {people.map((person) => (
            <TinderCard
              className=" absolute"
              key={person.id}
              onSwipe={(dir) => onSwipe(dir, person.id)}
              onCardLeftScreen={() => onCardLeftScreen(person.full_name)}
            >
              <div
                className="bg-center bg-no-repeat bg-[length:620px_720px]   p-5 relative w-[620px] h-[720px] rounded-2xl hover:cursor-grab active:cursor-grabbing"
                style={{
                  backgroundImage: `url(${person.avatarUrl})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent  rounded-2xl to-[#411849]"></div>
              <div className=" flex flex-row absolute w-full z-40 bottom-20  justify-between p-10 ">
                <div className=" flex flex-row space-x-5 items-center">
                  <h1 className=" text-white font-bold text-xl   ">
                    {person.full_name}
                  </h1>
                  <span className="text-white">{person.age}</span>
                  <PopUpProfile useMenu={true} />
                </div>
                <div>
                  <ArrowBackIcon w={5} h={5} color="white" />
                  <ArrowForwardIcon w={5} h={5} color="white" />
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
      )}
      {mutualMatch && (
        <MerryMatch
          isOpen={isModalOpen}
          onClose={() => {
            setMutualMatch(false);
            console.log(`mutualMatch onClose:`, mutualMatch);
          }}
        />
      )}
    </div>
  );
}

MerryCards.propTypes = {
  user: PropTypes.object,
};

export default MerryCards;
