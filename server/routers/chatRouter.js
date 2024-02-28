import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const chatRouter = Router();

// GET api/v1/chat
chatRouter.get(`/api/v1/chat`, async (req, res) => {
  const { userId, profileId } = req.query; // Retrieve query parameters instead of body

  try {
    const { data, error } = await supabase
      .from("messages")
      .select("messages")
      .eq("from_userid", userId)
      .eq("to_userid", profileId)
      .order("created_at", { ascending: true })
      .select();

    if (error) {
      throw error;
    }

    console.log(data);
    res.json({
      messages: "Fetch message successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" }); // Handle error response
  }
});

// PUT api/v/1/chat
chatRouter.put(`/api/v1/chat`, async (req, res) => {
  const { userId, profileId, messages } = req.body;

  // Log the received data
  console.log(
    "Received data - userId:",
    userId,
    "profileId:",
    profileId,
    "message:",
    messages
  );

  try {
    const { data, error } = await supabase
      .from("messages")
      .insert({ from_userid: userId, to_userid: profileId, message: messages })
      .select();

    res.json({
      messages: "Send message successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

export default chatRouter;
