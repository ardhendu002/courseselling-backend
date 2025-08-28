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

    await Course.create({
        username: username,
        password: password
    })

    res.json({
        msg: "you are authorised"
    })
});

router.post('/signin', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })

    if(user)
    {
        const tokens = await jwt.sign({
            username
        },JWT_SECRET);
    }
    else{

        
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