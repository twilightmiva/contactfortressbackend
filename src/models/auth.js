import mongoose from "mongoose"
const userSchema=mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    phoneNumber:{type:String,required:true,unique:true}

})
export default mongoose.model("User",userSchema)