import { Router } from "express";
import Category from "../models/categories.js";
const router = Router();
//addCategory
router.post("/new", async (req, res) => {
    const {categoryName,description} = req.body;
    try {
        const category = await Category.findOne({categoryName});
        if (category) {
          return res.status(400).json({ mesage: "Category already exists" });
        }
        const newCategory = new Category({
          categoryName,
          description,
        
        
        });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
  })
  //getAll Categories
router.get("/",async(req,res)=>{
  try{
const categories=await Category.find()
return res.status(200).json(categories);
  }catch(error){
    return
  }
})
//getOne Category
router.get("/:id",async(req,res)=>{
  try{
const {id}= req.params
const category=await Category.findById(id)
return res.status(200).json(category);
  }catch(error){
    return
  }
})
//update  category
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = ({
      categoryName,
      description,
    
    } = req.body);
    const updatedCategory = findOneAndUpdate({ _id: id }, update, { new: true });
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
//delete Category
router.delete("/:id",async(req,res)=>{
  try{
const {id}= req.params
const categoryToDelete=await Category.findOneAndDelete({_id:id})
return res.status(200).json(categoryToDelete);
  }catch(error){
    return
  }
})
  export {router}