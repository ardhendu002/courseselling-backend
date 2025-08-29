const { Router } = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const JWT_SECRET = process.env.JWT_SECRET;
dotenv.config();
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

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
        const username = req.body.username;
        const password = req.body.password;

        const Adminexists = await Admin.findOne({
            username,
            password
        })

        if(Adminexists)
        {
            const tokens = jwt.sign({
                username
            },JWT_SECRET);
            res.json({tokens});
            res.json({msg:"Admin signin sucess"})

        }
        else{
            res.status(400).json({msg:"Invalid credentials od admin"})
        }
    }
    catch(err)
    {
        res.send(400).json({msg: "Some error occured in signin"})
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