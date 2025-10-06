
import imagekit from "../config/imageKit.js";
import openai from "../config/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import axios from 'axios'
// Text Controller API
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }
    const { chatId, prompt } = req.body;

    // Check if chat exists
    const chat = await Chat.findOne({ userId, _id: chatId });

    // Push new message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    return res.status(200).json({
      success: true,
      message: "Message added successfully",
      chat,
    });
  } catch (error) {
    console.error("Error in textMessageController:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Image generation message controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message: "You dont have enough credits to use this feature!",
      });
    }

    const {  chatId,prompt, isPublished } = req.body;

    // Find chat
    const chat = await Chat.findOne({ userId, _id: chatId });
  if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }
    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Encode the prompt
    const encodedPrompt = encodeURIComponent(prompt);

    // Construct IMAGEkit generated url
    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
    });

    // convert to base64
    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
      "binary"
    ).toString("base64")}`;

    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "AI-CHATBOT",
    });

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished,
    };

    chat.messages.push(reply);
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    return res.json({ success: true, reply });
  } catch (error) {
    console.error("Error in imageMessageController:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
