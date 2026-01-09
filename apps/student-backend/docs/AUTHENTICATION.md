# Student Authentication System

## Overview

This document describes the student authentication system implemented for the Student Backend (BFF).

## Features

- ✅ Student login with loginId and password
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Token expiration (7 days)
- ✅ Protected API routes
- ✅ Automatic studentId resolution from token

## Authentication Flow

```
1. Student enters loginId and password
2. Backend validates credentials
3. Backend generates JWT token
4. Token contains: role, studentId, educationLevel
5. Frontend stores token (localStorage/sessionStorage)
6. Frontend sends token in Authorization header
7. Backend middleware verifies token
8. Backend extracts studentId from token
9. API uses studentId from req.user
```

## API Endpoints

### 1. Login
```
POST /api/auth/login

Request Body:
{
  "loginId": "stu001.university",
  "password": "password123"
}

Success Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "student",
  "studentId": "STU001",
  "educationLevel": "university",
  "name": "John Doe"
}

Error Responses:
400 - Missing loginId or password
401 - Invalid credentials
500 - Server error
```

### 2. Verify Token
```
GET /api/auth/verify

Headers:
Authorization: Bearer <token>

Success Response (200):
{
  "valid": true,
  "user": {
    "role": "student",
    "studentId": "STU001",
    "educationLevel": "university"
  }
}

Error Responses:
401 - No token provided / Invalid token / Token expired
500 - Server error
```

## Student Credentials

After running the seed script, the following credentials are available:

| StudentID | LoginID | Password | Education Level |
|-----------|---------|----------|-----------------|
| STU001 | stu001.university | password123 | University |
| STU002 | stu002.middle | password123 | Middle School |
| STU003 | stu003.primary | password123 | Primary |

## Setup Instructions

### 1. Install Dependencies
```bash
cd student-backend
npm install
```

This will install:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation/verification

### 2. Add JWT Secret to .env
```bash
# Add to .env file
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

⚠️ **Important:** Change the JWT_SECRET in production!

### 3. Seed Student Credentials
```bash
node scripts/seedStudentCredentials.js
```

This will:
- Add `loginId` field to existing students
- Add hashed `password` field
- Add `role` field (default: "student")

### 4. Start the Server
```bash
npm start
# or for development
npm run dev
```

## Frontend Integration

### 1. Login Request
```javascript
const login = async (loginId, password) => {
  const response = await fetch('http://localhost:3002/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ loginId, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const data = await response.json();
  
  // Store token
  localStorage.setItem('token', data.token);
  localStorage.setItem('studentId', data.studentId);
  localStorage.setItem('educationLevel', data.educationLevel);
  
  return data;
};
```

### 2. Making Authenticated Requests
```javascript
const getStudentData = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3002/api/student/home/welcome', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.json();
};
```

### 3. Logout
```javascript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('studentId');
  localStorage.removeItem('educationLevel');
  // Redirect to login page
};
```

## Protecting Student Routes

### Option 1: Protect All Student Routes (Recommended)
Update `app.js` to apply auth middleware to all student routes:

```javascript
import { authenticate } from './middleware/auth.middleware.js';

// Apply auth middleware to all /api/student/* routes
app.use('/api/student', authenticate);
app.use('/api/student/home', studentHomeRoutes);
app.use('/api/student/results', studentResultsRoutes);
// ... other routes
```

### Option 2: Protect Individual Routes
Apply middleware to specific routes:

```javascript
// In student.home.routes.js
import { authenticate } from '../middleware/auth.middleware.js';

router.get('/welcome', authenticate, getWelcomeData);
```

## Updating Controllers

Controllers should now read `studentId` from `req.user` instead of `req.query`:

### Before:
```javascript
export const getWelcomeData = async (req, res) => {
    const studentId = req.user?.studentId || req.query.studentId;
    // ...
};
```

### After (with auth):
```javascript
export const getWelcomeData = async (req, res) => {
    const studentId = req.user.studentId; // From JWT token
    // ...
};
```

## Security Best Practices

1. ✅ **Passwords are hashed** using bcrypt (10 rounds)
2. ✅ **Passwords not returned** in queries (select: false)
3. ✅ **JWT tokens expire** after 7 days
4. ✅ **Tokens verified** on every protected request
5. ⚠️ **Change JWT_SECRET** in production
6. ⚠️ **Use HTTPS** in production
7. ⚠️ **Implement rate limiting** for login endpoint

## Testing with Postman

### 1. Login
```
POST http://localhost:3002/api/auth/login
Content-Type: application/json

{
  "loginId": "stu001.university",
  "password": "password123"
}
```

Copy the `token` from the response.

### 2. Access Protected Route
```
GET http://localhost:3002/api/student/home/welcome
Authorization: Bearer <paste_token_here>
```

## Troubleshooting

### Error: "Access denied. No token provided."
- Make sure you're sending the Authorization header
- Format: `Authorization: Bearer <token>`

### Error: "Invalid token"
- Token might be malformed
- Check if you copied the entire token

### Error: "Token expired"
- Token has expired (7 days)
- User needs to login again

### Error: "Invalid credentials"
- Wrong loginId or password
- Check credentials in database

## Future Enhancements

- [ ] Refresh tokens
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Login attempt limiting
- [ ] Password strength validation
- [ ] Remember me functionality

## Files Created

1. `controllers/auth.controller.js` - Login and token verification
2. `middleware/auth.middleware.js` - JWT verification middleware
3. `routes/auth.routes.js` - Authentication routes
4. `scripts/seedStudentCredentials.js` - Seed login credentials
5. `docs/AUTHENTICATION.md` - This documentation

## Files Modified

1. `models/student.model.js` - Added loginId, password, role fields
2. `app.js` - Registered auth routes
3. `package.json` - Added bcryptjs and jsonwebtoken dependencies
