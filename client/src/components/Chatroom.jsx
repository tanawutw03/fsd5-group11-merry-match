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
    // Join a room/topic. Can be anything except for 'realtime'.
    const chatChannel = supabase.channel("chatroom");

    console.log(`chatChannel on mounted:`, chatChannel);

    // Simple function to log any messages we receive
    function messageReceived(payload) {
      console.log(payload);
      // Update the chat messages state with the new message
      setChatMessages((prevMessages) => [...prevMessages, payload]);
      fetchMessages();
    }

    // Subscribe to the Channel and listen for the 'broadcast' event with event type '*' wildcards
    chatChannel
      .on("broadcast", { event: "*" }, (payload) => messageReceived(payload))
      .subscribe();

    return () => {
      // Unsubscribe when the component unmounts
      chatChannel.unsubscribe();
    };
  }, [chatMessages]);

  const fetchMessages = async () => {
    try {
      const messageToOtherUserResponse = await axios.get(
        `http://localhost:4008/chat/api/v1/to-other-user`,
        {
          params: {
            userId: user.user.id,
            profileId: profile.id,
          },
        }
      );

      const messageFromOtherUserResponse = await axios.get(
        `http://localhost:4008/chat/api/v1/from-other-user`,
        {
          params: {
            userId: user.user.id,
            profileId: profile.id,
          },
        }
      );

      const messageToOtherUser = messageToOtherUserResponse.data.data.map(
        (msg) => ({ ...msg, fromCurrentUser: true })
      );
      const messageFromOtherUser = messageFromOtherUserResponse.data.data.map(
        (msg) => ({ ...msg, fromCurrentUser: false })
      );
      const allMessages = [...messageToOtherUser, ...messageFromOtherUser];

      // Sort the combined messages based on created_at timestamps
      const sortedMessages = allMessages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setChatMessages(sortedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [profile.id]);

  useEffect(() => {
    // Scroll to the bottom when chatMessages change
    const chatContainer = chatContainerRef.current;
    const lastMessage = chatContainer.lastElementChild;
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4008/chat/api/v1/chat/`,
        {
          userId: user.user.id,
          profileId: profile.id,
          messages: message,
        }
      );

      // Extract the ID of the newly inserted message from the response
      const messageId = response.data.data[0].id;
      console.log(`messageId:`, messageId);

      // Join a room/topic. Can be anything except for 'realtime'.
      const chatChannel = supabase.channel("chatroom");
      console.log(`chatChannel on broadcast:`, chatChannel);

      chatChannel.subscribe((status) => {
        // Wait for successful connection
        if (status !== "SUBSCRIBED") {
          return null;
        }

        // Send a broadcast message
        chatChannel.send({
          type: "broadcast",
          event: "new_message",
          payload: {
            id: messageId,
            message: message,
            from_userid: user.user.id,
            to_userid: profile.id,
            fromCurrentUser: true,
          },
        });
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
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`text-white mb-2 border-2 flex flex-col ${
                msg.from_userid === user.user.id
                  ? "border-green-500 items-end"
                  : "border-orange-500 items-start"
              }`}
            >
              <p>From: {msg.from_userid}</p>
              <p>To: {msg.to_userid}</p>
              <p>{msg.message}</p>
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
