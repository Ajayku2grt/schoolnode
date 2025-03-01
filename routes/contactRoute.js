const express =  require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken.js');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const { getContact, createContact, editContact, updateContact, deleteContact, importContact,exportContact } = require("../controllers/ContactController");


router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(editContact).put(updateContact).delete(deleteContact);
router.post('/import', upload.single('file'), importContact);
router.get('/export',exportContact);



module.exports = router;