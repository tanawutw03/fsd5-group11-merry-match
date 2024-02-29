import merrymatch from "../assets/MerryMatch/merrymatch.png";
import { useUser } from "../app/userContext";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { supabase } from "../utils/supabaseClient.js";
import moment from "moment";
import ButtonNewMatch from "./ButtonNewMatch.jsx";

const LeftSideMatching = ({ mutualMatch, onMutualMatchClick }) => {
  const [merryMatch, setMerryMatch] = useState([]);
  const { user } = useUser();
  const [lastMessages, setLastMessages] = useState([]);

  useEffect(() => {
    const changes = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          lastMessageReceived(payload);
        }
      )
      .subscribe();

    function lastMessageReceived(payload) {
      console.log(`payload:`, payload);
      const newMessage = payload.new;

      // Find the index of the existing message for the same profile icon, if any
      const existingMessageIndex = lastMessages.findIndex(
        (message) =>
          (message.to_userid === newMessage.to_userid &&
            message.from_userid === newMessage.from_userid) ||
          (message.to_userid === newMessage.from_userid &&
            message.from_userid === newMessage.to_userid)
      );

      if (existingMessageIndex !== -1) {
        // If an existing message is found, replace it with the new message
        setLastMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[existingMessageIndex] = newMessage;
          return updatedMessages;
        });
      } else {
        // If no existing message is found, add the new message to the state
        setLastMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }

    // Clean up subscription when component unmounts
    return () => changes.unsubscribe();
  }, [lastMessages]);

  const openChat = (profile) => {
    onMutualMatchClick(profile);
  };

  useEffect(() => {
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
    <>
      <div className="w-full h-full flex flex-col items-center justify-start p-5 gap-5">
        <ButtonNewMatch />
        <div className="w-full h-48">
          <h1 className="text-xl font-bold">Merry Match!</h1>
          <div className="flex overflow-auto w-full h-full gap-5">
            {[...merryMatch].reverse().map((profile) => (
              <div
                key={profile.id}
                className="relative pt-12 pl-36"
                onClick={() => openChat(profile)}
              >
                <img
                  className="absolute inset-0 w-36 h-36 rounded-3xl"
                  src={profile.avatar_url[0].publicUrl}
                />
                <img
                  className="w-6 h-6 absolute bottom-7 -right-1"
                  src={merrymatch}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-full truncate ...">
          <h1 className="text-xl font-bold mt-5">Chat with Merry Match</h1>
          {lastMessages.map((message) => {
            const profile = merryMatch.find(
              (profile) =>
                profile.id === message.to_userid ||
                profile.id === message.from_userid
            );

            const isCurrentUser = user.user.id === message.from_userid;
            const firstName = profile?.full_name.split(" ")[0];

            return (
              <div key={message.id} className="w-96 h-16 flex flex-row mt-5">
                <div className="rounded-full w-20 h-20">
                  {profile && profile.avatar_url && profile.avatar_url[0] && (
                    <img
                      className="rounded-full w-16 h-16"
                      src={profile?.avatar_url[0].publicUrl}
                      alt={profile?.full_name}
                    />
                  )}
                </div>
                <div className="w-full pl-2 flex flex-col justify-center items-start">
                  <p className="font-bold">{firstName}</p>
                  <div className="flex gap-2 ">
                    {isCurrentUser && <p>You:</p>}
                    <p className="">{message.message}</p>
                  </div>{" "}
                  <p>{moment(message.created_at).fromNow()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

LeftSideMatching.propTypes = {
  mutualMatch: PropTypes.bool,
  onMutualMatchClick: PropTypes.func,
};

export default LeftSideMatching;
