const express = require('express');
const router = express.Router();
const {register, login, currentUser} = require('../controllers/UserController');


router.route('/').get(currentUser);


router.route('/register').post(register);

router.route('/login').post(login);



module.exports = router;