const bcrypt = require("bcrypt");
const userModel = require('../models/authModel');

const register = async (req, res)=>{
    try{
        const {username , email , password} = req.body ;

        //check kro k user phly saye exists tu nahi krta 
        const existsUser = await userModel.findUserByEmail(email)
        if(existsUser)
        {
            return
            res.status(400).json({
                success: false ,
                message:"User already exists with this Email"
            })
        }

        const hashPassword = await bcrypt.hash(password , 10) ;

        const user = await userModel.createUser(username , email , hashPassword) ;

        res.status(201).json({
            success: true ,
            message: "User create successfully",
            user
        })
    }
    catch(error)
    {
        res.status(500).json({
            success: false ,
            message: error.message
        });
    }
}

module.exports = register ;