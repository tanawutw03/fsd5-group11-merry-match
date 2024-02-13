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

function MerryCards({ user }) {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [mutualMatch, setMutualMatch] = useState(false);
  const { isOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(`user info`, user);

  const onSwipe = async (direction, swipedUserId) => {
    console.log("You swiped: " + direction);
    console.log(`Your Id:`, user.user.id);
    console.log(`Your Swipe:`, swipedUserId);

    if (direction === "right" && user.user.id) {
      const response = await updateMatches(user.user.id, swipedUserId);

      console.log(response.message);
      if (response.message === "Mutual match") {
        setMutualMatch(true);
      }
    } else if (direction === "left" && user.user.id) {
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const updateMatches = async (swipingUserId, swipedUserId) => {
    console.log(swipingUserId);
    console.log(swipedUserId);

    const swipedUserIdsArray = Array.isArray(swipedUserId)
      ? swipedUserId
      : [swipedUserId];
    console.log(swipedUserIdsArray);

    try {
      const response = await axios.put(
        "http://localhost:4008/matching/api/v1/match",
        {
          userId: swipingUserId,
          matchedUserId: swipedUserIdsArray,
        }
      );

      console.log(response);
      console.log(response.data);
      return response.data; // Return the response for trigger modal
    } catch (error) {
      console.error("Error updating matches:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { data: profiles, error: errorQueryUUID } = await supabase
          .from("profiles")
          .select("id, full_name, age");

        if (errorQueryUUID) {
          console.error("Error querying UUIDs:", errorQueryUUID);
          setError(errorQueryUUID.message);
          return;
        }

        let allProfilesWithImages = [];

        for (const profile of profiles) {
          const { data: fileList, error: fileListError } =
            await supabase.storage.from("avatars").list(profile.id, {
              limit: 100,
              offset: 0,
              sortBy: { column: "name", order: "asc" },
            });

          if (fileListError) {
            console.error(
              `Error fetching images for UUID ${profile.id}:`,
              fileListError
            );
            continue;
          }

          const avatarUrls = await Promise.all(
            fileList.map(async (file) => {
              const response = await supabase.storage
                .from("avatars")
                .getPublicUrl(`${profile.id}/${file.name}`);
              if (response.error) {
                console.error(
                  `Error getting public URL for ${file.name}:`,
                  response.error
                );
                return null;
              } else {
                return response.data.publicUrl; // Make sure this matches the actual property name in the response
              }
            })
          );

          const filteredAvatarUrls = avatarUrls.filter((url) => url !== null);

          allProfilesWithImages.push({
            ...profile,
            avatarUrls: filteredAvatarUrls,
          });
        }

        setPeople(allProfilesWithImages);
      } catch (error) {
        console.error("Unexpected error:", error);
        setError("Unexpected error");
      } finally {
        setIsLoading(false);
        setDataLoaded(true);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    console.log("People state:", people);
  }, [people]);

  useEffect(() => {
    if (mutualMatch) {
      console.log(`Open the modal:`, mutualMatch);
      setIsModalOpen(true);
    }
  }, [mutualMatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {dataLoaded && !isLoading && !error && people.length > 0 && (
        <div className="h-[936px] w-[905px] bg-[#160404] flex justify-center items-center gap-5 border-2 overflow-hidden  ">
          <div className="flex flex-row mt-[710px]  absolute z-10 ">
            <img className=" w-[90px] h-[90px]  " src={action} />
            <img className=" w-[90px] h-[90px] " src={heart} />
          </div>
          <div className=" flex flex-row absolute z-20 mt-[870px] ">
            <p className="text-[#646D89]">Merry limit today</p>
            <p className="ml-2 text-[#FF1659]">2/20</p>
          </div>
          <div className=" flex flex-row absolute z-30 mt-[565px] ml-[520px]  ">
            <ArrowBackIcon w={5} h={5} color="white" mr={4} />
            <ArrowForwardIcon w={5} h={5} color="white" />
          </div>
          {people.map((person) => (
            <TinderCard
              className=" absolute"
              key={person.id}
              onSwipe={(dir) => onSwipe(dir, person.id)}
              onCardLeftScreen={() => onCardLeftScreen(person.full_name)}
            >
              <div
                className="bg-center bg-no-repeat bg-[length:720px_720px]  p-5 relative w-[720px] h-[720px] rounded-2xl hover:cursor-grab active:cursor-grabbing"
                style={{
                  backgroundImage: `url(${person.avatarUrls[0]})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent  rounded-2xl to-[#411849]"></div>
              <h1 className=" absolute bottom-16 left-5 text-white font-bold text-s ">
                {person.full_name}

                <ViewIcon w={5} h={5} ml={4} color="white" />
              </h1>
            </TinderCard>
          ))}
        </div>
      )}
      {mutualMatch && (
        <MerryMatch
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

MerryCards.propTypes = {
  user: PropTypes.object,
};

export default MerryCards;
