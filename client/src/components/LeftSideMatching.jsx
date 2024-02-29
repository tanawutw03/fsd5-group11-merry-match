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
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
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

      // const currentTime = moment().format(); // Current time
      // console.log(`currentTime:`, currentTime);
      // const messageTime = newMessage.created_at; // Time from payload
      // console.log(`messageTime:`, messageTime);
      // const timeDifference = currentTime.diff(messageTime);

      // if (timeDifference > 2) {
      //   // If more than 1 minute has passed, trigger a re-render
      //   setLastMessages((prevMessages) => [...prevMessages, newMessage]);
      // }

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

  console.log(`lastMessages:`, lastMessages);

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

  console.log(`merryMatch:`, merryMatch);

  return (
    <div className="w-2/6 h-screen">
      <div className="flex flex-col items-center pt-5 ">
        <ButtonNewMatch />
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
        <div className="flex flex-col pt-2 gap-3">
          {lastMessages.map((message) => {
            const profile = merryMatch.find(
              (profile) =>
                profile.id === message.to_userid ||
                profile.id === message.from_userid
            );

            const isCurrentUser = user.user.id === message.from_userid;
            console.log("Avatar URL:", profile);
            console.log(`message`, message);
            return (
              <div key={message.id} className="w-96 h-16 flex flex-row">
                <div className="rounded-full w-20 h-20">
                  {profile && profile.avatar_url && profile.avatar_url[0] && (
                    <img
                      className="rounded-full w-16 h-16"
                      src={profile?.avatar_url[0].publicUrl}
                      alt={profile?.full_name}
                    />
                  )}
                </div>
                <div className="w-96 pl-2">
                  <p>{moment(message.created_at).fromNow()}</p>
                  {isCurrentUser && <p>You: </p>}
                  <p>{message.message}</p>
                </div>
              </div>
            );
          })}
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
