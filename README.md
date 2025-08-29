# Course Selling Backend

A backend server for a course-selling platform with JWT-based authentication, built using **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

---

##  Description

This project serves as a backend for a course-selling web application. It supports secure authentication for both **admins** and **users**, using JSON Web Tokens (JWT). Admins can create and manage courses, while users can view, purchase, and list their purchased courses.

---

##  Technologies Used

- **Node.js**
- **Express**
- **MongoDB** with **Mongoose**
- **JWT (jsonwebtoken)**
- **dotenv** for environment configuration

---

##  Available Routes

### Admin Routes

| Endpoint               | Method | Description                                  | Input                                                                 | Output                                                         |
|------------------------|--------|----------------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------|
| `/admin/signup`        | POST   | Create a new admin account                   | `{ username, password }`                                               | `{ message: 'Admin created successfully' }`                    |
| `/admin/signin`        | POST   | Authenticate admin and issue a JWT           | `{ username, password }`                                               | `{ token: 'your-token' }`                                      |
| `/admin/courses`       | POST   | Create a new course                          | Header: `Authorization: Bearer <token>`<br>Body: `{ title, description, price, imageLink }` | `{ message: 'Course created successfully', courseId: '<id>' }` |
|                        | GET    | Fetch all courses                            | Header: `Authorization: Bearer <token>`                                | `{ courses: [ … ] }`                                           |

---

### User Routes

| Endpoint                     | Method | Description                                      | Input                                                                 | Output                                                             |
|------------------------------|--------|--------------------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------|
| `/users/signup`              | POST   | Create a new user account                        | `{ username, password }`                                               | `{ message: 'User created successfully' }`                         |
| `/users/signin`              | POST   | Authenticate user and issue a JWT                | `{ username, password }`                                               | `{ token: 'your-token' }`                                          |
| `/users/courses`             | GET    | List all available (published) courses           | Header: `Authorization: Bearer <token>`                                | `{ courses: [ … ] }`                                               |
| `/users/courses/:courseId`   | POST   | Purchase a course                                | Header: `Authorization: Bearer <token>`                                | `{ message: 'Course purchased successfully' }`                     |
| `/users/purchasedCourses`    | GET    | View all courses purchased by the user           | Header: `Authorization: Bearer <token>`                                | `{ purchasedCourses: [ … ] }`                                      |

---

##  Environment Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ardhendu002/courseselling-backend.git
    cd courseselling-backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file** at the project root:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

4. **Start the server**:
    ```bash
    npm start
    ```

---

##  Usage Guide

### For Admins:
- **Sign Up**: POST `/admin/signup` with `{ username, password }`
- **Sign In**: POST `/admin/signin` → receive JWT
- **Create Course**: POST `/admin/courses` with token and course details
- **View All Courses**: GET `/admin/courses` with token

### For Users:
- **Sign Up**: POST `/users/signup`
- **Sign In**: POST `/users/signin` → receive JWT
- **View Courses**: GET `/users/courses` with token
- **Purchase Course**: POST `/users/courses/:courseId` with token
- **View Purchased**: GET `/users/purchasedCourses` with token

---

##  Highlights

- **Secure authentication** for admin and user workflows using JWT.
- **Role-based access** ensures only admins can manage courses.
- Persistent data storage with **MongoDB** and schema validation via **Mongoose**.
- Modular and well-structured routing for easy expansion.

---

