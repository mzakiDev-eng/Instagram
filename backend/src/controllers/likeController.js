const Like = require('../models/likeModel');

const toggelLike = async (req , res) =>{
  try {
    const userId = req.user.id ;
    const postId = req.params.postId ;

    const existingLike = await Like.findLike(postId , userId)
    let liked ;
    if(existingLike)
    {
        await Like.removeLike(postId, userId)
        liked = false ;
    }
    else
    {
         await Like.addLike(postId, userId)
         liked = true ;
        
    }

    const likeCount = await Like.countLikes(postId);
    res.status(200).json({
        success: true ,
        message: liked ? 'Liked successfully' : 'Unliked successfully' ,
        liked,
        likeCount
    })
  } catch (error) {
    const message = 'Error will be occure during the like' ;
         res.status(500).json({
            success: false ,
            message: error.message
         });
  }
}
module.exports = {toggelLike}
