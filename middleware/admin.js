// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
//const z = require("zod");

// function adminexists(username,password){
//     const usernamec = z.string.min(6).max(8);
//     const password = z.string.min(5).max(8).regex([/a-z/]);
//     const usernamecheck = usernamec.safeParse(username);
//     const passwordcheck = username.safeParse(password);

//     if(!usernamecheck.success && !passwordcheck.success)
//     {
//         return false;
//     }
//     else{
//         return true;
//     }
// }
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split("");
    const jwtToken = words[1];

    try{
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