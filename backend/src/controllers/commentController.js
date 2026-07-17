const Comment = require('../models/commentModel');

const createComment = async (req , res) =>{
  try {
    const userId = req.user.id ;
    const postId = req.params.postId ;
    const {content} = req.body ;
    if(!content || !content.trim())
    {
        res.status(400).json({
            success: false ,
            message: 'content will be required'
        })
    }

    const comment = await Comment.addComment(postId, userId , content.trim());
    res.status(201).json({
        success: true ,
        message: 'comment will be added successfully',
        comment
    });
    
  } catch (error)
   {
      res.status(500).json({
        success: false ,
        message: 'comment will not added till now.'
      })
  }
}

const getComments = async (req ,res) =>{
    try {
        const postId = req.params.postId ;
        const comment = await Comment.getComment(postId);
        res.status(200).json({
            success: true ,
            message: 'getComments fetch successfully',
            comment
        })
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        })
    }
}

module.exports = {createComment , getComments} 