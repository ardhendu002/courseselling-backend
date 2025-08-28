const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: "Admin created ssuccesfully"
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
        res.status(404).json({msg: "user already exists"});
    }
    else{
        const token = jwt.sign({
            username
        },JWT_SECRET);
        res.json({token});
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    const tittle = req.body.tittle;
    const description = req.body.description;
    const imageLink= req.body.imageLink;
    const price = req.body.price;

    const newcourse = await Course.create({
        tittle,
        description,
        imageLink,
        price
    })

    res.json({
        msg: "Your course has been created"
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const search = req.header.tittle;
    const response = await Course.find({tittle});
    res.json({
        courses: response
    })
});

module.exports = router;