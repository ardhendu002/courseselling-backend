const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
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

        await Admin.create({
            username: username,
            password: password
        })

        res.json({
            message: "Admin created ssuccesfully"
        })
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
            res.status(404).json({msg: "Admin already exists"});
        }
        else{
            const token = jwt.sign({
                username
            },JWT_SECRET);
            res.json({token});
        }
    }
    catch(err)
    {
        res.send(400).json({msg: "Some error occured in signin"})
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
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
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const search = req.header.tittle;
    const response = await Course.find({tittle});
    res.json({
        courses: response
    })
});

module.exports = router;