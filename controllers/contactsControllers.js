const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const json = require("express");
const Contact = require("../model/contacts.js");

const getAllContacts = async (req, res) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (deletedContact) {
      res.status(200).json(deletedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await Book.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedData = req.body;

    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const validatedContacts = updateContactSchema.validate(updatedData);
    if (validatedContacts.error) {
      return res.status(400).json({ message: validatedContacts.error.message });
    }
    const updateContact = await contactsService.updateContacts(
      contactId,
      updatedData
    );
    if (!updateContact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updateContact);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
