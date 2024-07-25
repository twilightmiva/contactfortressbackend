import mongoose from "mongoose"
const contactSchema=mongoose.Schema({
    contactImageURL:{type:String},
    firstName:{type:String,required:true},
    lastName:{type:String},
    phoneNumber:{type:String,required:true,unique:true},
    category:{type:String}

})
export default mongoose.model("Contact",contactSchema)

