const Follow = require('../models/followModel');

const toggelFollow = async (req, res)=>{
    try {
        const followerId = req.user.id ;
    const followingId = req.params.userId ;

    //user cannot follow yourself
    if(String(followerId) === String(followingId))
    {
      return  res.status(400).json({
            success: false ,
            message: 'user cannot follow yourself'
        });

    }
    
    const existingUser = await Follow.findFollwer(followerId , followingId);
     let following ;
     if(existingUser)
     {
        await Follow.removeFollower(followerId , followingId) 
        following = false 
     }
     else
     {
        await Follow.addFollwer(followerId , followingId)
        following = true 
     }

     const followerCount = await Follow.countFollower(followingId);
     return res.status(200).json({
        success: true ,
        message: following ? 'Follow Successfully ' : 'UnfollowSuccessfully',
        following,
        followerCount
     });
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: 'server error occure'
        });
    }
}
module.exports = {toggelFollow} ;