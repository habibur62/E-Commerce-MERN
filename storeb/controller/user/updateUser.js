const userModel = require("../../models/userModel")


async function updateUser(req, res) {
    try{
        const sessionUser = req.userId

        const { userId,name, email, role} = req.body

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),

        }
        const user = await userModel.findById(sessionUser)
        
        const updateUser = await userModel.findByIdAndUpdate(userId, payload)
 
        res.json({
            message: "User is role updated",
            data: updateUser,
            success: true,
            error: false
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser
