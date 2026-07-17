const express = require('express');
const authMiddleware= require('../middleware/authMiddleware');
const likeController = require('../controllers/likeController')
const router = express.Router();

router.post('/:postId' , authMiddleware, likeController.toggelLike);

module.exports = router
