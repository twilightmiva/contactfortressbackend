import { Router } from "express";
import User from "../models/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();
//signup

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ mesage: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
//signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const {password:userPassword, ...otherInfo} = user._doc

    const token = jwt.sign(otherInfo, process.env.JWT_SECRET);
    console.log(token);

    res.status(200).json({ ...otherInfo, accessToken: token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
export { router };
