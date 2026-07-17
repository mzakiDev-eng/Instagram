const pool = require('../config/db');

const findLike = async (postId , userId) =>{
    const result = await pool.query(
        ` select * from app_likes where post_id = $1 and user_id = $2 ;
    ` ,
    [postId , userId] 
   
    )
    return result.rows[0] ;
   
}

const addLike = async (postId , userId) =>{
    const result = await pool.query(
        `insert into app_likes (post_id , user_id) values( $1, $2) Returning *` ,
        [postId , userId]
    )
    return result.rows[0];
}

const removeLike = async (postId  , userId) =>{
    const result = await pool.query(
        `delete from app_likes where post_id = $1 and user_id = $2`,
        [postId , userId]
    );
    return result.rows[0];
}

const countLikes = async (postId ) =>{
    const result = await pool.query(
        `select count(*):: int as count from app_likes where post_id = $1`,
        [postId]
    )
    return result.rows[0].count
}

module.exports = {findLike , addLike , removeLike , countLikes};
