const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const {email, password} = req.body

        if(!password){
            throw new Error("Please provide password");
            
        }
        if(!email){
            throw new Error("Please provide email");
            
        }

        const user = await userModel.findOne({email})

        if(!user){
                throw new Error("User not found");
        }

        const checkPassword = bcrypt.compareSync(password, user.password);

        if(checkPassword){
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            
            const tokenOption = {
                httpOnly : true,
                secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
                sameSite: 'Strict', 
                path: '/'

            }

            return res.cookie("token", token, tokenOption).json({
                success: true,
                error: false,
                message: "Login Sucessfully!",
                data: token,
            })
            
        }else{
            throw new Error("Please check the password");
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
    
}
module.exports = userSignInController