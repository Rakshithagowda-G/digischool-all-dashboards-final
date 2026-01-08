# Digi-Dash Quick Start Guide

## 🚀 Quick Start (First Time Setup)

### Step 1: Install Dependencies
Run this command from the root directory (`I:\digi-dash`):

```bash
npm run install:all
```

This will install dependencies for all 5 applications. This may take a few minutes.

### Step 2: Start All Applications
```bash
npm run dev
```

This will start all applications simultaneously:
- 🔐 **Login**: http://localhost:3000
- 👨‍🎓 **Student Dashboard**: http://localhost:5173
- 👨‍💼 **Admin Dashboard**: http://localhost:5174
- 👨‍🏫 **Teacher Dashboard**: http://localhost:5175
- 👨‍👩‍👧 **Parent Dashboard**: http://localhost:5176

### Step 3: Access the Application
1. Open your browser and go to: **http://localhost:3000**
2. Select your role (Student, Teacher, Parent, or Admin)
3. Enter your credentials
4. You'll be automatically redirected to the appropriate dashboard!

## 🎯 Role-Based Redirects

After successful login, you'll be redirected based on your role:

| Role | Redirects To | URL |
|------|-------------|-----|
| 👨‍🎓 Student | 5th Grade Dashboard | http://localhost:5173 |
| 👨‍💼 Admin | Admin Dashboard | http://localhost:5174 |
| 👨‍🏫 Teacher | School Management | http://localhost:5175 |
| 👨‍👩‍👧 Parent | Parent Portal | http://localhost:5176 |

## ⚡ Daily Usage

After the first-time setup, you only need to run:

```bash
npm run dev
```

Then navigate to http://localhost:3000 to start using the application.

## 🛑 Stopping the Applications

Press `Ctrl+C` in the terminal where you ran `npm run dev` to stop all applications.

## 💡 Tips

- **Keep the terminal open**: Don't close the terminal window while using the applications
- **Wait for all apps to start**: It may take 30-60 seconds for all applications to start
- **Check the terminal**: Look for messages like "Local: http://localhost:XXXX" to confirm each app is running
- **Browser refresh**: If a page doesn't load, wait a few seconds and refresh

## ❓ Troubleshooting

**"Port already in use" error:**
- Close any other applications using ports 3000, 5173, 5174, 5175, or 5176
- Or restart your computer to free up the ports

**Applications not starting:**
- Make sure you ran `npm run install:all` first
- Check that you have Node.js installed (run `node --version`)

**Redirect not working:**
- Make sure all applications are running (check the terminal output)
- Wait for all apps to fully start before logging in

## 📞 Need Help?

If you encounter any issues, check the main README.md file for more detailed information.
