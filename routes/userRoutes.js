const express = require('express');
const multer = require('multer');
const authController = require('./../controllers/authController')

const upload = multer({ destination: 'public/img/users'});

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;