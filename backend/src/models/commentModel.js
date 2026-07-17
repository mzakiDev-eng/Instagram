const pool = require('../config/db')

const addComment = async (postId, userId , content) =>{
    const query = `
    insert into app_comments(post_id , user_id , content) values($1,$2,$3)
    returning id , post_id , user_id , content , created_at
    ` 
    const value = [postId , userId , content] ;
    const result = await pool.query(query , value);
    return result.rows[0] ;
}

const getComment = async(postId) =>{
    const query = `
    select * from app_comments as c
    inner join
    app_users as u
    On u.user_id = c.id 
    where c.post_id = $1
    order by c.created_at asc ;

    `
    const value = [postId]
    const result = await pool.query(query, value);
    return result.rows[0];
}
module.exports = {addComment, getComment} ;