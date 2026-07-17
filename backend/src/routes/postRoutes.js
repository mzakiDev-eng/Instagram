const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), postController.createPost);
router.get('/' ,authMiddleware , postController.getPost);

module.exports = router;
