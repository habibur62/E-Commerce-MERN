const jwt = require('jsonwebtoken');

async function userLogOut(req, res) {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'Strict',
            path: '/'
        });
        
        
      // Respond with a success message
      return res.json({
        message: "Logged out successfully",
        error: false,
        success: true,
        data: []
    });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Logout failed",
            error: true,
            success: false
        });
    }
    
}

module.exports = userLogOut