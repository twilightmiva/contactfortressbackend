import mongoose from "mongoose"
const categorySchema=mongoose.Schema({
    categoryName:{type:String,required:true,unique:true},
    description:{type:String,required:true},


})
export default mongoose.model("Category",categorySchema)