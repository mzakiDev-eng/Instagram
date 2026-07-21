const pool = require('../config/db');

const createPost = async (userId, imageUrl, caption) => {
    const query = `
        INSERT INTO app_posts(user_id, img_url, caption)
        VALUES ($1, $2, $3)
        RETURNING id, user_id, img_url, caption, created_at
    `;
    const values = [userId ,imageUrl , caption] ;
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getPost = async (currentUserId) =>{
    const qurey = `
 SELECT 
  p.id, 
  p.caption, 
  p.img_url, 
  p.created_at, 
  u.id AS user_id, 
  u.username,
 
  (select count(*)::int from app_likes as l where l.post_id = p.id) AS like_count,
  (select count(*)::int from app_comments as c where c.post_id = p.id ) as comment_count ,
  EXISTS(
    select 1 from app_likes as ml WHERE ml.post_id = p.id AND ml.user_id = $1
  ) AS liked,
  (select count(*)::int from app_follow as fc where fc.following_id = p.user_id) AS follower_count,
  EXISTS(
    select 1 from app_follow as f WHERE f.follower_id = $1 AND f.following_id = p.user_id
  ) AS is_following
FROM app_posts AS p
JOIN app_users AS u ON u.id = p.user_id 
ORDER BY p.created_at DESC; 
    `

    const result = await pool.query(qurey, [currentUserId]);
    return result.rows
}

module.exports = {
    createPost , getPost
};
