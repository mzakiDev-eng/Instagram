const pool = require('../config/db')
const addComment = async (postId, userId , content) =>{
    const query = 
    `
    WITH new_comment AS (
      INSERT INTO app_comments (post_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING id, post_id, user_id, content, created_at
    )
    SELECT
      nc.id,
      nc.post_id,
      nc.user_id,
      nc.content,
      nc.created_at,
      u.username
    FROM new_comment nc
    JOIN app_users u
      ON u.id = nc.user_id;
  `; 
    const value = [postId , userId , content] ;
    const result = await pool.query(query , value);
    return result.rows[0] ;
}

const getComment = async(postId) =>{
    const query = `
    select  c.id,
      c.post_id,
      c.user_id,
      c.content,
      c.created_at,
      u.username
     from app_comments as c
    inner join
    app_users as u
    On u.id = c.user_id 
    where c.post_id = $1
    order by c.created_at asc ;

    `
    const value = [postId]
    const result = await pool.query(query, value);
    return result.rows;
}
module.exports = {addComment, getComment} ;