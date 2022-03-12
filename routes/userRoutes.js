const express = require('express');

const authController = require('./../controllers/authController')


const router = express.Router();

router.post('/upload', authController.uploadUserPhoto, authController.upload);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;