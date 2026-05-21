const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const app = express();

app.use(express.json());

/* ---------------- DATABASE CONNECTION ---------------- */

mongoose.connect("mongodb://kiruthikak2024_db_user:kiruthika281007@ac-yzhrevx-shard-00-00.umashc1.mongodb.net:27017,ac-yzhrevx-shard-00-01.umashc1.mongodb.net:27017,ac-yzhrevx-shard-00-02.umashc1.mongodb.net:27017/studentDB?ssl=true&replicaSet=atlas-af77v9-shard-0&authSource=admin&appName=Cluster0")
.then(() => {

    console.log("MongoDB Connected Successfully");

})
.catch((err) => {

    console.log("MongoDB Connection Error");
    console.log(err);

});

/* ---------------- STUDENT SCHEMA ---------------- */

const studentSchema = new mongoose.Schema({

    studentName: String,
    department: String,
    year: Number

});

const Student = mongoose.model("Student", studentSchema);

/* ---------------- HOME ROUTE ---------------- */

app.get("/", (req, res) => {

    res.send("Backend Running Successfully");

});

/* ---------------- CREATE USER API ---------------- */

app.post("/create-user", async (req, res) => {

    try {

        const newUser = new User({

            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            phoneNo: req.body.phoneNo

        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User Created Successfully",
            user: savedUser
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

/* ---------------- LOGIN API ---------------- */

app.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        if (user.password !== req.body.password) {

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        res.status(200).json({
            message: "Login Successful",
            user: user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

/* ---------------- ADD STUDENT API ---------------- */

app.post("/add-student", async (req, res) => {

    try {

        const newStudent = new Student({

            studentName: req.body.studentName,
            department: req.body.department,
            year: req.body.year

        });

        const savedStudent = await newStudent.save();

        res.status(201).json({
            message: "Student Added Successfully",
            student: savedStudent
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

/* ---------------- GET USERS API ---------------- */

app.get("/users", async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});