const express = require('express');
const { signup, signin } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
