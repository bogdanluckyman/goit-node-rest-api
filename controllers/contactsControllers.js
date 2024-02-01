const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const json = require("express");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getOneContact = async (req, res) => {
  try {
    const oneContact = await contactsService.getContactById(req.params.id);
    if (oneContact) {
      res.status(200).json(oneContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteContact = async (req, res) => {
  try {
    const deletedContact = await contactsService.removeContact(req.params.id);
    if (deleteContact) {
      res.status(200).json(deleteContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const createContact = async (req, res) => {
  try {
    const validateContact = createContactSchema.validate(req.body);

    if (validateContact.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }
    const { name, email, phone } = req.body;
    const newContact = await contactsService.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedData = req.body;
    const validatedContacts = updateContactSchema.validate(updatedData);
    if (validatedContacts.error) {
      return res.status(400).json({ message: validationResult.error.message });
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
