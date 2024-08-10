const express = require('express');
const router = express.Router();
const {register, login, currentUser} = require('../controllers/UserController');
const validateToken = require('../middleware/validateToken.js');


router.get('/', validateToken, currentUser);


router.route('/register').post(register);

router.route('/login').post(login);



module.exports = router;