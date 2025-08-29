const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


// Admin Routes
router.post('/signup', async (req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        console.log(username+password)

        const Adminexists = await Admin.findOne({
            username,
            password
        })

        if(Adminexists)
        {
            res.status(400).json({msg: "Admin already exists"});
        }
        else{
        await Admin.create({
            username: username,
            password: password
        })

        res.json({
            message: "Admin created ssuccesfully"
        })
        }
    }
    catch(err)
    {
        res.json({msg : "Signup error"})
    }
});

router.post('/signin', async(req, res) => {
    try{
        const usernamec = req.body.username;
        const passwordc = req.body.password;

        const Adminexists = await Admin.findOne({
            username: usernamec,
            password: passwordc
        })

        console.log(Adminexists)

        if(Adminexists)
        {
            const tokens = jwt.sign({ username: usernamec }, JWT_SECRET)
            return res.status(200).json({msg:"Signin sucess",tokens});
        }
        else{
            res.status(401).json({msg:"Admin dont exists"})
        }
    }
    catch(err)
    {
        res.status(500).json({msg: "Some error occured in signin"})
    }
});

router.post('/courses/create', adminMiddleware, async(req, res) => {
    try{
        const tittle = req.body.tittle;
        const description = req.body.description;
        const imageLink= req.body.imageLink;
        const price = req.body.price;
        const tutor = req.body.tutor;
        const category = req.body.category;

        const newcourse = await Course.create({
            tittle,
            description,
            imageLink,
            price,
            tutor,
            category
        })

        res.json({
            msg: "Your course has been created"
        })
    }
    catch(err){
        res.status(500).json({msg:"course creation error"})
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const response = await Course.find({});
    res.json({
        response
    })
});

module.exports = router;