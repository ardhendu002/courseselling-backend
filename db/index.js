const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const URLlink = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(URLlink,{
    useNewUrlParser: true,
    useUnifiedTopology: true});

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    usercourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    tittle: {type: String , required: true},
    description: {type: String , required: true},
    iamgeLink: String,
    tutor: String,
    category: {type: String,
        tags: ["programming", "design" , "health" , "education"]
    },
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}