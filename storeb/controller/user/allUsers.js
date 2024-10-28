const userModel = require('../../models/userModel')


async function allUsers(req, res) {

    try{
        const users = await userModel.find()

        res.json({
            message: "all users",
            data: users,
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

module.exports = allUsers