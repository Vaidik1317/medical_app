const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.status(401).json({message: 'No token provided'});

    const token = authHeader.split(' ')[1]; //bearer <token>
    if(!token) return res.status(401).json({message: 'Invalid token'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //
        next();
    } catch (error) {
        console.log("🚀 ~ verifyToken ~ error:", error)
        res.status(403).json({message:"something went wrong"})
        
    }


}

module.exports = {verifyToken}