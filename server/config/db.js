import mongoose from "mongoose";
const connectBD=async ()=>{
    try{
        mongoose.connection.on('connected',()=>console.log('DB Connected!'));
        
        await mongoose.connect(`${process.env.MONGO_URI}`)
    }
    catch(error){
        error.log(error.message)
    }
}
export default connectBD