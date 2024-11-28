# Course Selling Website

This project is a Course Selling Website built using React and nodejs. It allows users to sign up, sign in, and browse through various courses. Admins can manage courses, add new ones, and update them through a dashboard connected to a MongoDB backend.

## Demo Screenshots

### Langing Page
<img width="1440" alt="landing-page" src="https://github.com/user-attachments/assets/4b60949c-4017-4699-abfb-610256ddedeb">

### Signup Page
<img width="807" alt="Signup" src="https://github.com/user-attachments/assets/1131d810-2ab7-4e5f-8ab0-85b9ae60e585">

### Signin Page
<img width="1440" alt="signin" src="https://github.com/user-attachments/assets/7cb71235-1678-4a0f-92c6-820e871cf2e9">

### Courses Page
<img width="1440" alt="courses" src="https://github.com/user-attachments/assets/0794431d-547f-4adf-85bc-cb480da161a2">

### Add Course and Courses Table Page
<img width="1440" alt="course-management" src="https://github.com/user-attachments/assets/af67a55e-82c2-4e95-8523-e99abd00b5ad">
<img width="1436" alt="add courses" src="https://github.com/user-attachments/assets/94fde54a-5c8f-422e-a305-5126760dba81">

### MongoDB Database Overview

<img width="1437" alt="mongodb" src="https://github.com/user-attachments/assets/bad33e07-def0-4a21-af80-ecb9372fec09">

### Dialog Box for Course Update
<img width="1438" alt="add dialogbox" src="https://github.com/user-attachments/assets/e4d8f24a-1e48-4b51-a390-e3206955a4f5">

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
    git clone https://github.com/Ajay1812/course-selling-admin.git
    cd course-selling-admin
```

2. **Install dependencies:** Navigate to the project directory and install the required packages for both frontend and backend:

```bash
    cd course-selling-app/admin-client
    npm install
    cd ..
    cd server
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

4. **Run the application:** Start both the frontend and backend servers on PORT 3000:

```bash
    cd server
    npm start
```

5. **Access the website:**

- Open your browser and go to http://localhost:3000 to access the website.

## Future Improvements

- Implement payment gateway integration for course purchases.
- Add course categories and filtering options.
- Improve the UI/UX design with enhanced styling.
- Optimize performance and scalability for a larger user base.
