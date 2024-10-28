const userModel = require("../../models/userModel")



async function userDetailsController(req, res) {
    try {
        const user = await userModel.findById(req.userId)
        res.json({
            data: user,
        })
       
      //  console.log("üser",user);


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userDetailsController