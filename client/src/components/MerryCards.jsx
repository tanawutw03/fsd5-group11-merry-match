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
      try {
        console.log("Fetching images...");

        const { data, error } = await supabase.storage
          .from("user-profiles")
          .list(null, {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

        if (error) {
          console.error("Error fetching images:", error);
          setError(error.message);
        } else {
          console.log("Fetched raw data:", data);

          // Construct the image URLs
          const imageUrls = data.map((item) => {
            const imageUrl = supabase.storage
              .from("user-profiles")
              .getPublicUrl(item.name);

            return { ...item, url: imageUrl };
          });

          console.log("Image URLs:", imageUrls);

          setPeople(imageUrls);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setError("Unexpected error");
      } finally {
        setIsLoading(false);
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
        <div className="h-[836px] w-[805px] bg-[#160404] flex justify-center items-center gap-5 border-2 overflow-hidden  ">
          <div className="flex flex-row mt-[530px]  absolute z-10 ">
            <img className=" w-[80px] h-[80px]  " src={action} />
            <img className=" w-[80px] h-[80px] " src={heart} />
          </div>
          <div className=" flex flex-row absolute z-20 mt-[670px] ">
            <p className="text-[#646D89]">Merry limit today</p>
            <p className="ml-2 text-[#FF1659]">2/20</p>
          </div>
          <div className=" flex flex-row absolute z-30 mt-[365px] ml-[420px]  ">
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
                className="bg-center bg-no-repeat bg-[length:620px_620px]  p-5 relative w-[620px] h-[620px] rounded-2xl hover:cursor-grab active:cursor-grabbing"
                style={{ backgroundImage: `url(${person.url.data.publicUrl})` }}
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
