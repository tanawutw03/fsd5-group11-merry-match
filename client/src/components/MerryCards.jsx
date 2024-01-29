import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { supabase } from "../utils/supabaseClient.js";

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
        <div className="h-screen flex justify-center items-center gap-5">
          {people.map((person) => (
            <TinderCard
              key={person.name}
              onSwipe={onSwipe}
              onCardLeftScreen={() => onCardLeftScreen(person.name)}
            >
              <div
                className="bg-center bg-no-repeat bg-[length:600px_600px] p-5 relative w-[600px] h-[600px] rounded-2xl hover:cursor-grab active:cursor-grabbing"
                style={{ backgroundImage: `url(${person.url.data.publicUrl})` }}
              />
              <h1 className="absolute bottom-10 left-5 text-white font-bold text-2xl">
                {person.name}
              </h1>
            </TinderCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default MerryCards;
