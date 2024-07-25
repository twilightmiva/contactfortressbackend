import { Router } from "express";
import Contact from "../models/contacts.js";
const router = Router();
//addContacts
router.post("/new", async (req, res) => {
  const { contactImageURL, firstName, lastName, phoneNumber, email } = req.body;
  try {
    const contact = await Contact.findOne({ phoneNumber });
    if (contact) {
      return res.status(400).json({ mesage: "Contact already exists" });
    }
    const newContact = new Contact({
      contactImageURL,
      firstName,
      phoneNumber,
      email,
    });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
//getAll Contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    return;
  }
});
//getOne Contacts
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    return res.status(200).json(contact);
  } catch (error) {
    return;
  }
});
//update  contact
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = ({
      contactImageURL,
      firstName,
      lastName,
      phoneNumber,
      email,
    } = req.body);
    const updatedContact = findOneAndUpdate({ _id: id }, update, { new: true });
    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
//delete Contact
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contactToDelete = await Contact.findOneAndDelete({ _id: id });
    return res.status(200).json(contactToDelete);
  } catch (error) {
    return;
  }
});

export { router };
