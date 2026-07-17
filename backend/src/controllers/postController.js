const Post = require('../models/postModel');


const createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        const post = await Post.createPost(userId, imageUrl, caption || "");

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getPost = async (req, res) =>{
    try {
          const currentPostUserId = req.user?.id ;
          const posts = await Post.getPost(currentPostUserId)
          res.status(200).json({
            success: true ,
            message: "Post integrate Successfully",
            posts
          });

        
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        });
        
    }
}

module.exports = {
   
    createPost , getPost
};
