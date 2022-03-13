const { Router } = require('express');
const express = require('express');

const authController = require('./../controllers/authController')


const router = express.Router();

router.route('/').get(authController.getAllUsers)
router.route('/:id').get(authController.getUser).delete(authController.removeUser).patch(authController.updateUser)
router.post('/upload', authController.uploadCloud)
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;