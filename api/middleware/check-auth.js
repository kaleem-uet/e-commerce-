const jwt = require('jsonwebtoken');
const JWT_KEY="kaleem";
module.exports = (req, res, next) => {
    
     

    try {
        const authHeader = req.headers.token;
        const token = authHeader.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(token, "kaleem");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};