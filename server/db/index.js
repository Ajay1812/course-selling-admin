const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// Define Mongoose Schemas
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verifyToken:{ 
    type: String,
  }
});

adminSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(this.password, salt)
    this.password = hashedPass
    next()
  } catch (error) {
    next(error)
  }
})


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String, // Storing the relative image path
  published: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define Mongoose Models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
  User,
  Admin,
  Course,
};
