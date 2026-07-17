const bcrypt = require("bcrypt");
const userModel = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const register = async (req, res)=>{
    try{
        const {username , email , password} = req.body ;

        //check kro k user phly saye exists tu nahi krta 
        const existsUser = await userModel.findUserByEmail(email)
        if(existsUser)
        {
            return res.status(400).json({
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
    }
};
module.exports ={register,login} ;