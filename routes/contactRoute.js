const express =  require('express');
const router = express.Router();
const { getContact, createContact, editContact, updateContact, deleteContact } = require("../controllers/ContactController");

router.route("/").get(getContact).post(createContact);
router.route("/:id").get(editContact).put(updateContact).delete(deleteContact);

module.exports = router;