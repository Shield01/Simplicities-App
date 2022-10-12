const express = require('express');

const { createUser, userLogin } = require('../controllers/user.controller');

const router = express.Router();

router.post('/create_user', createUser);

router.post('/login', userLogin);

module.exports = router;