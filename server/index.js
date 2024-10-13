const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const adminRouter = require('./routes/admin.js')
const userRouter = require('./routes/user.js')
const path = require('path');
const app = express()

require("dotenv").config();
app.use(cors())
app.use(express.json())
app.use('./assets', express.static(path.join(__dirname, 'assets')));

app.use('/admin', adminRouter)
app.use('/user', userRouter)

// Connect to MongoDB
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
mongoose.connect(
  // `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.fyfyk.mongodb.net/courses`
  `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.ytrig.mongodb.net/courses`
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
