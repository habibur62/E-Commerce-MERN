const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
   // console.log("AuthToken middleware called");
    try {
        
        // Get the token from cookies or Authorization header
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1]; // Extract from Bearer

        // Log the token for debugging
       // console.log("Token received:", token);

        if (!token) {
            return res.status(403).json({ message: 'Access denied. No token provided.' });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
               // console.log("JWT verification error:", err); // Log error if token is invalid
                return res.status(403).json({ message: 'Invalid token' });
            }

            // Log the decoded token
            //console.log("Decoded token:", decoded);

            // Attach the decoded token (user data) to the request object
            req.userId = decoded?._id;

            // Call the next middleware or route handler
            next();
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
