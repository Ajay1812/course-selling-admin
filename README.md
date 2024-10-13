# Course Selling Website

This project is a Course Selling Website built using React and nodejs. It allows users to sign up, sign in, and browse through various courses. Admins can manage courses, add new ones, and update them through a dashboard connected to a MongoDB backend.

## Demo Screenshots

### Signup Page

<img width="807" alt="Signup" src="https://github.com/user-attachments/assets/1131d810-2ab7-4e5f-8ab0-85b9ae60e585">

### Signin Page

<img width="868" alt="Signin" src="https://github.com/user-attachments/assets/4a5c50a3-7919-4bb2-b4e0-c109f2a83c87">

### Courses Page

<img width="1435" alt="course" src="https://github.com/user-attachments/assets/d6c48bfc-6960-469b-a1f1-446459cb54f6">

### Add Course and Courses Table Page

<img width="1440" alt="addcourse page and table" src="https://github.com/user-attachments/assets/58cd6c25-1b81-47b6-9a27-8da922e68149">

### MongoDB Database Overview

<img width="1437" alt="mongodb" src="https://github.com/user-attachments/assets/bad33e07-def0-4a21-af80-ecb9372fec09">

### Dialog Box for Course Update

<img width="1440" alt="Dialog box for updation" src="https://github.com/user-attachments/assets/07fbc829-9be4-4fbf-a964-56c64c6d93c9">

## Features

- **User Authentication:** Users can sign up and log in.
- **Courses:** Users can view a list of available courses.
- **Admin Dashboard:**
  - Add, update, and delete courses.
  - Manage course details including title, description, price, and more.
  - MongoDB Integration: All course and user data is stored in MongoDB.

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - React.js for building UI components
- **Backend:**
  - Node.js and Express.js for server-side logic
  - MongoDB as the database for storing courses and users
- **Authentication:**
  - JWT (JSON Web Tokens) for user authentication and authorization
- **State Management:**
  - React Context API for managing global state
- **Axios:** For making HTTP requests to the backend
- **Material-UI:** For UI components like tables, dialog boxes, etc.

## Installation

1. **Installation and Setup**

```bash
    git clone https://github.com/Ajay1812/Cohort_Full_Stack.git
    cd JavaScript/Assignments/week4/vite-course-selling-app
```

2. **Install dependencies:** Navigate to the project directory and install the required packages for both frontend and backend:

```bash
    cd vite-course-selling-app
    npm install
```

3. **Set up MongoDB:**

- Ensure MongoDB is installed and running on your system.
- Create a .env file in the root directory and add your MongoDB connection string:

```bash
    MONGO_USER=your-mongodb-user
    MONGO_PASSWORD=your-secret-password
    SECRET_JWT=your-secret
```

4. **Run the application:** Start both the frontend and backend servers:

```bash
   ## Run the backend server
    npm run server

   ## In another terminal, run the frontend
    npm start
```

5. **Access the website:**

- Open your browser and go to http://localhost:3000 to access the website.

## Future Improvements

- Implement payment gateway integration for course purchases.
- Add course categories and filtering options.
- Improve the UI/UX design with enhanced styling.
- Optimize performance and scalability for a larger user base.
