const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course , User } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

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
            res.json({tokens});
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

router.get('/courses', userMiddleware ,async (req, res) => {
    try{
        const fetchcourse = await Course.find({});
        res.status(200).json({
            fetchcourse
        })
        res.json({msg: "Course fetched succesfully"});
    }
    catch(err)
    {
        res.status(500).json({msg: "Courses cant be fetched now"})
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    try{
        const courseId = req.params.courseId;
        const userId = req.userId;

        const checkcourse = await User.findOne({userId})
        if(checkcourse.usercourse.includes(courseId))
        {
            res.json({msg:"course already present"})
        }
        await User.findByIdAndUpdate(userId,{$push:{usercourse:courseId}});
        res.json({msg: "Course purchase sucess"})
    }
    catch(err)  
    {
        res.status(500).json({msg:"Some error Occured"})
    }

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    try{
        const userId = req.userId;
        const purchasedcourse = await User.findOne({userId})
        if(purchasedcourse)
        {
            const fetchcourse = purchasedcourse.usercourse;
            res.json({fetchcourse});
        }
        res.status(400).json({msg: "Course not present"})
    }
    catch(err)
    {
        res.status(500).json({msg: "Some error occured"})
    }
});

module.exports = router