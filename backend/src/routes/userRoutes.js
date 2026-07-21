const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/follow/:userId', authMiddleware, userController.toggelFollow );
module.exports = router