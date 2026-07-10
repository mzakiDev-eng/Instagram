const pool = require('../config/db');
const createUser = async (username , email, password) =>{
    const query = `insert into app_users(username, email, password) values($1,$2,$3)
    returning id, username, email , password , created_at
    `
    const values = [username , email , password] ;
    const result = await pool.query(query , values);
    return result.rows[0] ;

}
 const findUserByEmail = async (email)=>{
        const result = await pool.query(
            "select * from app_users where email = $1", [email]
        );
        return result.rows[0] ;
    };
module.exports = {createUser , findUserByEmail} ;