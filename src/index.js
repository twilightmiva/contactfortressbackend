import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {router as authRoutes} from "./routes/auth.js"
import {router as contactRoutes} from "./routes/contacts.js"
import {router as categoryRoutes} from "./routes/categories.js"
import cors from "cors"
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {family:4})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`db is connected and server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/auth",authRoutes)
app.use("/api/contacts",contactRoutes)
app.use("/api/categories",categoryRoutes)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ContactFortress API" });
});
