import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    credits:{type:Number,default:20},
})
//HASH PASSWORD BEFORE SAVING
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
    
})
const User=mongoose.model('User',userSchema)
export default User;