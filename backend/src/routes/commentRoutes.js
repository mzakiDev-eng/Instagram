const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.get('/:postId' , authMiddleware , commentController.getComments);
router.post('/:postId' , authMiddleware, commentController.createComment);

module.exports = router