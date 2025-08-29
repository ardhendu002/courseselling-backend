// Middleware for handling auth
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


function adminMiddleware(req, res, next) {
    try{
        const token = req.headers.authorization;
        const words = token.split(" ");
        const jwtToken = words[1];
        const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
        if(decodedValue.username)
        {
            next();
        }
        else{
            res.status(403).json({msg: "You are not authrnticated"});
        }
    }
    catch(err)
    {
        res.json({
            msg:"Incorrect inputs"
        })
    }
}

module.exports = adminMiddleware;

