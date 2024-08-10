const express =  require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken.js');

const { getContact, createContact, editContact, updateContact, deleteContact } = require("../controllers/ContactController");
router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(editContact).put(updateContact).delete(deleteContact);

module.exports = router;