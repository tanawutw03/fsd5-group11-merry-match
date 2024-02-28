import PropTypes from "prop-types";
import ChakraButton from "./common/ChakraButton";
import { supabase } from "../utils/supabaseClient.js";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Chatroom({ profile, user }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Access the channel you want to interact with
    const chatChannel = supabase.realtime.channel(
      `from-${user.user.id}-to-${profile.id}`
    );

    // Subscribe to the channel
    chatChannel.subscribe();

    // Log to see if the channel is successfully created
    console.log("Chat channel created:", chatChannel);

    return () => {
      // Unsubscribe when the component unmounts
      chatChannel.unsubscribe();
    };
  }, [profile.id]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4008/chat/api/v1/chat`,
        {
          params: {
            userId: user.user.id,
            profileId: profile.id,
          },
        }
      );

      setChatMessages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [profile.id]);

  useEffect(() => {
    // Scroll to the bottom when chatMessages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatMessages]);

  const handleSendMessage = async () => {
    try {
      await axios.put(`http://localhost:4008/chat/api/v1/chat/`, {
        userId: user.user.id,
        profileId: profile.id,
        messages: message,
      });
      setMessage("");

      // Fetch messages again after sending a new message
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <div className="bg-black w-full h-full p-5 flex flex-col justify-between items-center">
        <div className="bg-white rounded p-5 w-fit border-2 border-green-500 flex flex-col justify-center items-start">
          <h1>Now you and {profile.full_name} are Merry Match!</h1>
          <h1>
            You can message something nice and make a good conversation. Happy
            Merry!
          </h1>
        </div>

        <div className="w-full h-4/5 overflow-auto" ref={chatContainerRef}>
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className="text-white mb-2 border-2 border-red-500"
            >
              {msg.message}
            </div>
          ))}
        </div>

        <div className="flex w-full">
          <input
            type="text"
            className="rounded w-full p-5"
            placeholder="Message here..."
            value={message}
            onChange={handleMessageChange}
          />

          <ChakraButton name="Send" onClick={handleSendMessage} />
        </div>
      </div>
    </>
  );
}

Chatroom.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object,
};

export default Chatroom;
