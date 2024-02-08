import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { supabase } from "../utils/supabaseClient.js";
import action from "../assets/Matching/action button.svg";
import heart from "../assets/Matching/heart button (1).svg";
import { ArrowForwardIcon, ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";

function MerryCards() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        // Step 1: Fetch all UUIDs from the "profiles" table
        const { data: queryUUID, error: errorQueryUUID } = await supabase
          .from("profiles")
          .select("id");

        if (errorQueryUUID) {
          console.error("Error querying UUIDs:", errorQueryUUID);
          setError(errorQueryUUID.message);
          return;
        }

        let allImages = [];

        // Step 2: Loop through each UUID to list files in each "avatars"/UUID/ folder
        for (const profile of queryUUID) {
          const { data, error } = await supabase.storage
            .from("avatars")
            .list(profile.id, {
              // Use the UUID as the folder path
              limit: 100,
              offset: 0,
              sortBy: { column: "name", order: "asc" },
            });

          if (error) {
            console.error(
              `Error fetching images for UUID ${profile.id}:`,
              error
            );
            continue; // Skip to the next UUID on error
          }

          // Step 3: Construct the image URLs for each file
          for (const item of data) {
            const { data, error: urlError } = supabase.storage
              .from("avatars")
              .getPublicUrl(`${profile.id}/${item.name}`);

            if (urlError) {
              console.error(
                `Error getting public URL for ${item.name}:`,
                urlError
              );
              continue; // Skip to the next item on error
            }

            allImages.push({ ...item, url: data });
          }
        }

        setPeople(allImages);
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
              key={person.name}
              onSwipe={onSwipe}
              onCardLeftScreen={() => onCardLeftScreen(person.name)}
            >
              <div
                className="bg-center bg-no-repeat bg-[length:720px_720px]  p-5 relative w-[720px] h-[720px] rounded-2xl hover:cursor-grab active:cursor-grabbing"
                style={{ backgroundImage: `url(${person.url.publicUrl})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent  rounded-2xl to-[#411849]"></div>
              <h1 className=" absolute bottom-16 left-5 text-white font-bold text-s ">
                {person.name}

                <ViewIcon w={5} h={5} ml={4} color="white" />
              </h1>
            </TinderCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default MerryCards;
