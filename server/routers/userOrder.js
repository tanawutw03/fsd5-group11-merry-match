import { Router } from "express";
import express from "express";
import stripePackage from "stripe";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../utils/supabaseClient.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
const userOrderRoute = Router();

userOrderRoute.post("/checkout", express.json(), async (req, res) => {
  try {
    // create payment session
    const { user, product } = req.body;
    if (
      !user ||
      !product ||
      !user.name ||
      !user.address ||
      !product.name ||
      !product.price ||
      !product.quantity
    ) {
      return res.status(400).json({ error: "Invalid user or product data" });
    }

    const orderId = uuidv4();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:8888/success.html?id=${orderId}`,
      cancel_url: `http://localhost:8888/cancel.html?id=${orderId}`,
    });

    const { data, error } = await supabase.from("orders").insert([
      {
        fullname: user.name,
        address: user.address,
        session_id: session.id,
        status: session.status,
        stripe_url: session.url,
        order_id: orderId,
      },
    ]);

    if (error) {
      console.error("Error creating order:", error.message);
      return res.status(400).json({ error: "Error creating order" });
    }

    res.json({
      user,
      product,
      session_id: session.id,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(400).json({ error: "Error creating order" });
  }
});

userOrderRoute.get("/order/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error) {
      console.log("error", error);
      throw new Error("Failed to fetch order");
    }

    res.json({
      order: data,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "something wrong",
      error,
    });
  }
});

userOrderRoute.get("/order", (req, res) => {
  res.json("Test, check Route Order!");
});

userOrderRoute.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  try {
    const event = req.body;
    switch (event.type) {
      case "checkout.session.completed":
        const paymentData = event.data.object;

        const sessionId = paymentData.id;
        const timestamp = paymentData.created; // UNIX
        var milliseconds = timestamp * 1000;

        var date = new Date(milliseconds);
        var Datetime = date.toLocaleString();
        date.setHours(date.getHours());

        var formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const data = {
          status: paymentData.status,
          created: formattedDate,
        };

        const { data: updatedData, error } = await supabase
          .from("orders")
          .update(data)
          .eq("session_id", sessionId);

        if (error) {
          console.error("Error updating order:", error.message);
          return res.status(400).json({ error: "Error updating order" });
        }

        res.json({ success: true });
        return;
        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        break;

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return res.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
  }
});

export default userOrderRoute;
