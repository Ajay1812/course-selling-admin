const {User, Course, Admin} = require('../db')
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../middleware/auth')
const {authenticateJwt} = require('../middleware/auth')
const express = require('express')
const router = express.Router() 
const nodemailer = require('nodemailer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  '../admin-client/assets'); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;  // Use timestamp to avoid conflicts
    cb(null, uniqueName);  // Save the file with the unique name
  }
});

const upload = multer({ storage });

router.get('/me', authenticateJwt, async (req, res) => {
  const username = req.user.username; 
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(201).json({ username: admin.username });
  } else {
    res.status(403).json({ message: "Admin not found" });
  }
} );

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, { expiresIn: "1h"});
    res.json({ message: "Admin created successfully", token });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.headers; 
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: admin.username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { username } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    const token = jwt.sign({ id: admin._id, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS, 
      },
    });
    let mailOptions = {
      from: process.env.GMAIL_USER, 
      to: admin.username, 
      subject: 'Reset your password',
      text: `Click here to reset your password: http://localhost:5173/admin/reset-password/${admin._id}/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email." });
      } else {
        return res.status(200).json({ message: "Check your email for the reset link." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});


// Create and update courses
router.post("/courses", authenticateJwt, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imagePath = `/assets/${req.file.filename}`;
  const courseData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: imagePath,  // Save relative path instead of image buffer
    published: req.body.published,
  };
  const course = new Course(courseData);
  await course.save();
  res.status(201).json({ message: "Course created successfully", courseId: course.id });
});

// get particular course
router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if(course){
    res.status(201).json({course})
  }else{
    res.status(403).json({message: "Course not found"})
  }
});

// get image
router.get("/courses/image/:courseId", async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course && course.image) {
    res.contentType('image/jpeg'); // Set appropriate content type
    res.send(course.image); // Send the binary data directly
  } else {
    res.status(404).json({ message: "Course not found or no image available" });
  }
});

// Update course
router.put("/courses/:courseId", authenticateJwt, upload.single('image'), async (req, res) => {
  const courseData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    published: req.body.published,
  };
  // If an image is uploaded, save the new relative path
  if (req.file) {
    const imagePath = `/assets/${req.file.filename}`;
    courseData.image = imagePath;  // Update relative path if new image uploaded
  }
  const course = await Course.findByIdAndUpdate(req.params.courseId, courseData, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully", course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

// Deleting the course
router.delete("/courses/:courseId", authenticateJwt, async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await Course.deleteOne({ _id: courseId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  // {} -> i want all course list otherwise we can give condtion like {price : 4999}
  const courses = await Course.find({});
  res.json({ courses });
});

module.exports = router
