const pool =  require('../config/db');

const getPosts = async ()=>{
    const result = await pool.query("select * from app_posts")
    return result.rows ;
}
module.exports = {
    getPosts,
} ;