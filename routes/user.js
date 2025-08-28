const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course , User } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({username})
    if(existingUser)
    {
        return res.status(400).json({msg:"User already exists"})
    }
    await User.create({
        username: username,
        password: password
    })

    res.json({
        msg: "you are authorised"
    })
});

router.post('/signin', async(req, res) => {
    try{

        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({
            username,
            password
        })

        if(user)
        {
            const tokens = jwt.sign({
                username
            },JWT_SECRET);
        }
        else{
            res.status(400).json({msg:"enter valid credentials"})
        
        }
    }
    catch(err)
    {
        res.status(500).json({msg: "error in sign "})
    }
});

router.get('/courses', userMiddleware ,(req, res) => {
    
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router