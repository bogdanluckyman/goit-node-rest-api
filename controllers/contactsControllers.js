const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const json = require("express");
const Contact = require("../model/contacts.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (deletedContact) {
      res.status(200).json(deletedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    //-----це щоб ви перевірили що я минулого разу все виправив після прийняття домашки😊
    // const contactId = req.params.id;
    // const updatedData = req.body;
    // if (Object.keys(updatedData).length === 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Body must have at least one field" });
    // }
    // const validatedContacts = updateContactSchema.validate(updatedData);
    // if (validatedContacts.error) {
    //   return res.status(400).json({ message: validatedContacts.error.message });
    // }
    // const updateContact = await Contact.findByIdAndUpdate({
    //   contactId,
    //   updatedData,
    // });
    // if (!updateContact) {
    //   res.status(404).json({ message: "Not found" });
    // }
    // res.status(200).json(updateContact);
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined || typeof favorite !== "boolean") {
      return res
        .status(400)
        .json({ message: "Invalid 'favorite' value. It must be a boolean." });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
