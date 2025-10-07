import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const stripeWebhooks = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY); // Make sure this is your Stripe secret key
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    // Stripe requires the raw body for webhook verification
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRETE);
  } catch (error) {
    
    console.log("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { transactionId, appId } = session.metadata;

      // Ignore events from other apps
      if (appId !== "AI-CHATBOT") return res.json({ received: true, message: "Ignored invalid app" });

      // Find transaction that is not yet paid
      const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });
      if (!transaction) return res.json({ received: true, message: "Transaction already paid or not found" });

      // Update user credits
       await User.findByIdAndUpdate(transaction.userId, { $inc: { credits: transaction.credits } });

      // Mark transaction as paid
      transaction.isPaid = true;
      await transaction.save();

      console.log(`Transaction ${transactionId} completed successfully`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).send("Internal server error!");
  }
};
