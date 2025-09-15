import openai from "../config/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

// Text Controller API
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    // Check if chat exists
    const chat = await Chat.findOne({ userId, _id: chatId });
    // if (!chat) {
    //   return res.status(404).json({ message: "Chat not found" });
    // }

    // Push new message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });
const {choices} = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
          {
            role: "user",
            content: prompt,
        },
    ],
});
const reply={...choices[0].message,timestamp: Date.now(),
      isImage: false,}
      res.json({success:true,reply})
    // Save updated chat
    chat.messages.push(reply)
    await chat.save()
await User.updateOne({_id:userId},{$inc:{credits:-1}})
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

//Image generation message controller
export const imageMessageController=async (req,res)=>{
    try{
        const userId=req.user._id;
        if(req.user.credits<2){
            return res.json({success:false,message:"You dont have enough credits to use this feature!"})
        }
        const {prompt,chatId,isPublished}=req.body
        //Finf chat
        const cha=await Chat.findOne({userId,_id:chatId})
        //push messages
        chat.messages.push({
            role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
        })
   }catch(error){}
}