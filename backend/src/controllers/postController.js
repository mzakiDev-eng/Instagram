const Post = require('../models/postModel') ;

const getPosts = async(req, res) =>{
    try{
        const posts = await Post.getPosts();
        res.status(200).json({
            success: true ,
            message: "Post create successfully",
            posts
        })
        console.log(posts);
    }
    catch(error)
    {
        res.status(500).json({
            success: false ,
            message: error.message
        });
    }
}
module.exports = {
    getPosts
};