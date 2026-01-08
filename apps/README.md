# Digi-Dash - Unified Digital Dashboard

A comprehensive digital dashboard system with role-based authentication and separate applications for different user roles.

## 🏗️ Project Structure

```
digi-dash/
├── login/                          # Login & Authentication (Port 3000)
├── 5th_grade/                      # Student Dashboard (Port 5173)
├── ADMIN-DB/                       # Admin Dashboard (Port 5174)
├── schoolManagementFrontend/       # Teacher Dashboard (Port 5175)
├── Parent/                         # Parent Dashboard (Port 5176)
├── student-middle-school/          # Middle School Student Dashboard
├── student-backend/                # Student BFF Backend (Port 3002)
└── package.json                    # Root package for running all apps
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend services)

### Installation

1. **Install all dependencies for all applications:**

```bash
npm run install:all
```

Or install manually for each application:

```bash
# Root dependencies
npm install

# Login app
cd login && npm install && cd ..

# Student app
cd 5th_grade && npm install && cd ..

# Admin app
cd ADMIN-DB && npm install && cd ..

# Teacher app
cd schoolManagementFrontend && npm install && cd ..

# Parent app
cd Parent && npm install && cd ..

# Middle School Student app
cd student-middle-school && npm install && cd ..

# Student Backend
cd student-backend && npm install && cd ..
```

### Running the Application

**Run all applications at once (Recommended):**

```bash
npm run dev
```

This will start all applications concurrently:
- 🔐 Login: http://localhost:3000
- 👨‍🎓 Student: http://localhost:5173
- 👨‍💼 Admin: http://localhost:5174
- 👨‍🏫 Teacher: http://localhost:5175
- 👨‍👩‍👧 Parent: http://localhost:5176
- 🎓 Middle School: http://localhost:5171
- 🔌 Student Backend: http://localhost:3002

**Run individual applications:**

```bash
# Login only
npm run dev:login

# Student only
npm run dev:student

# Admin only
npm run dev:admin

# Teacher only
npm run dev:teacher

# Parent only
npm run dev:parent

# Middle School only
cd student-middle-school && npm run dev

# Student Backend only
cd student-backend && npm start
```

## 🔐 Authentication Flow

1. **Navigate to the login page:** http://localhost:3000
2. **Select your role:** Student, Teacher, Parent, or Admin
3. **Enter credentials and login**
4. **Automatic redirect:** You'll be redirected to the appropriate dashboard based on your role:
   - **Student** → http://localhost:5173 (5th_grade)
   - **Admin** → http://localhost:5174 (ADMIN-DB)
   - **Teacher** → http://localhost:5175 (schoolManagementFrontend)
   - **Parent** → http://localhost:5176 (Parent)
   - **Middle School Student** → http://localhost:5171 (student-middle-school)

## 📋 Port Configuration

| Application | Port | Path |
|------------|------|------|
| Login | 3000 | `/login` |
| Student Dashboard | 5173 | `/5th_grade` |
| Admin Dashboard | 5174 | `/ADMIN-DB` |
| Teacher Dashboard | 5175 | `/schoolManagementFrontend` |
| Parent Dashboard | 5176 | `/Parent` |
| Middle School Dashboard | 5171 | `/student-middle-school` |
| Student Backend API | 3002 | `/student-backend` |

## 🛠️ Technology Stack

- **Login App:** React (Create React App)
- **Student App:** React + Vite
- **Admin App:** React + Vite + TypeScript
- **Teacher App:** React + Vite
- **Parent App:** React + Vite
- **Middle School App:** React + Vite + TailwindCSS
- **Student Backend:** Node.js + Express + MongoDB

## ✅ Middle School Student Dashboard - Backend Integration Status

### **Completed Pages (5/5)**

All pages have been fully integrated with backend APIs and are production-ready:

#### 1. **Results Page** ✅
- **Status:** Fully Integrated
- **APIs Used:**
  - `GET /api/student/results/overview` - Overall results summary
  - `GET /api/student/results/subjects` - Subject-wise marks
  - `GET /api/student/results/top-subjects` - Top performing subjects
  - `GET /api/student/results/remarks` - Teacher remarks
  - `GET /api/student/home/welcome` - Student name
  - `GET /api/student/profile` - Profile data
- **Features:**
  - Dynamic result overview (percentage, rank, total marks)
  - Subject-wise marks pie chart
  - Top 3 performing subjects with medals
  - Detailed course performance table
  - Teacher remarks display
  - Loading and error states
  - Empty state handling

#### 2. **Events Page** ✅
- **Status:** Fully Integrated
- **APIs Used:**
  - `GET /api/student/events/today` - Today's events
  - `GET /api/student/events/upcoming` - Upcoming events
  - `GET /api/student/home/welcome` - Student name
- **Features:**
  - Today's schedule timeline view
  - Upcoming events list with dates and times
  - Dynamic event cards with color coding
  - Instructor/teacher information
  - Loading and error states
  - Empty state: "No events scheduled"

#### 3. **Assignments Page** ✅
- **Status:** Fully Integrated
- **APIs Used:**
  - `GET /api/student/assignments/summary` - Summary statistics
  - `GET /api/student/assignments` - Assignment list
  - `GET /api/student/assignments/submit-today` - Today's submissions
  - `GET /api/student/home/welcome` - Student name
- **Features:**
  - Summary cards (Total, Pending, Submitted, Overdue)
  - Assignment list with status badges
  - Submit Today section with due dates
  - File upload UI (UI-only, READ-only app)
  - Dynamic status colors (Pending, Submitted, Overdue)
  - Loading and error states
  - Empty state: "All caught up!" with checkmark icon

#### 4. **Attendance Page** ✅
- **Status:** Fully Integrated
- **APIs Used:**
  - `GET /api/student/attendance/header` - Header statistics
  - `GET /api/student/attendance/summary` - Summary metrics
  - `GET /api/student/attendance/monthly-rate` - Monthly chart data
  - `GET /api/student/attendance/subject-wise` - Subject attendance
  - `GET /api/student/home/welcome` - Student name
  - `GET /api/student/profile` - Profile information
- **Features:**
  - Student profile header with stats
  - Monthly attendance rate chart
  - Summary cards (Present, Absent, Leaves)
  - Subject-wise attendance table
  - Animated percentage counter
  - Loading and error states
  - Empty state handling

#### 5. **Profile Page** ✅
- **Status:** Fully Integrated
- **APIs Used:**
  - `GET /api/student/profile` - Complete profile data
- **Features:**
  - Personal information display (Name, DOB, Phone, Course)
  - Profile image with fallback
  - Language & Region settings
  - Dark mode toggle (functional)
  - Privacy settings UI
  - Loading and error states
  - "Not set" fallback for missing data

### **Backend API Architecture**

**Base URL:** `http://localhost:3002/api/student`

**Authentication:** Query parameter-based (`?studentId=STU002`)

**API Categories:**
1. **Home APIs** - Welcome data, dashboard summaries
2. **Results APIs** - Academic performance data
3. **Events APIs** - Schedule and event information
4. **Assignments APIs** - Assignment tracking
5. **Attendance APIs** - Attendance records and statistics
6. **Profile APIs** - Student profile information

### **Data Flow Architecture**

```
Frontend (React + Vite)
    ↓
API Layer (lib/api.js)
    ↓
Student Backend (Node.js + Express)
    ↓
MongoDB Database
```

### **Key Implementation Details**

1. **StudentId Resolution:**
   - Read from URL query params: `?studentId=STU002`
   - Fallback to default: `STU002` (Middle School)
   - Prevents cross-student data leakage

2. **State Management:**
   - React hooks (`useState`, `useEffect`)
   - Concurrent API calls using `Promise.all`
   - Proper loading, error, and empty states

3. **Data Mapping:**
   - Backend field names mapped to UI requirements
   - Fallback values for missing data
   - Type-safe data transformations

4. **Error Handling:**
   - Try-catch blocks for all API calls
   - User-friendly error messages
   - Retry mechanisms where appropriate

5. **Performance Optimization:**
   - Concurrent data fetching
   - Minimal re-renders
   - Efficient state updates

### **Modified Files Summary**

**Pages:**
- `ResultPage.jsx` - Results integration
- `EventPage.jsx` - Events integration
- `AssignmentPage.jsx` - Assignments integration
- `StudentDetailsPage.jsx` - Attendance integration
- `profile-page.jsx` - Profile integration (already done)

**Components:**
- `ProfileHeader.jsx` - Attendance header
- `AttendanceRate.jsx` - Monthly chart
- `TopStudentsTable.jsx` - Subject table
- `VerticalMetric.jsx` - Summary cards
- `TopPerformersCard.jsx` - Top subjects
- `RoundedPieChart.jsx` - Marks distribution
- `ActivityCard.jsx` - Result metrics
- `CoursePerformance.jsx` - Subject details

**API Layer:**
- `lib/api.js` - All API functions defined

### **Testing Checklist**

- ✅ All pages load without errors
- ✅ Data displays correctly for STU002
- ✅ Loading states show during API calls
- ✅ Error states display on API failures
- ✅ Empty states show when no data
- ✅ No cross-student data leakage
- ✅ Navbar shows correct student name
- ✅ All charts and tables render properly
- ✅ Responsive design maintained

## 📝 Development Notes

- All applications run independently on different ports
- The login application handles authentication and redirects to the appropriate dashboard
- Each dashboard application is a separate React application with its own dependencies
- Use `concurrently` to run all applications simultaneously during development
- Student Backend uses MongoDB for data persistence
- All student dashboards are READ-only (no edit/update functionality)

## 🔧 Troubleshooting

**Port already in use:**
If you get a port conflict error, make sure no other applications are running on ports 3000, 3002, 5171, 5173, 5174, 5175, or 5176.

**Dependencies not installed:**
Run `npm run install:all` to install all dependencies for all applications.

**Application not redirecting:**
Make sure all applications are running. The redirect will only work if the target application is running on its designated port.

**MongoDB connection issues:**
Ensure MongoDB is running locally or update the connection string in `student-backend/.env`

**API not returning data:**
1. Check if student-backend is running on port 3002
2. Verify MongoDB has seeded data for STU002
3. Check browser console for CORS or network errors

## 📦 Building for Production

To build all applications for production:

```bash
# Build login app
cd login && npm run build && cd ..

# Build student app
cd 5th_grade && npm run build && cd ..

# Build admin app
cd ADMIN-DB && npm run build && cd ..

# Build teacher app
cd schoolManagementFrontend && npm run build && cd ..

# Build parent app
cd Parent && npm run build && cd ..

# Build middle school app
cd student-middle-school && npm run build && cd ..
```

## 🤝 Contributing

1. Make changes in the appropriate application directory
2. Test locally using `npm run dev`
3. Ensure all applications work together
4. Test API integrations with the backend
5. Submit your changes

## 📄 License

This project is private and proprietary.
