# Backend Endpoints Specification

This document outlines the required backend API endpoints to support the frontend application features.

## 1. Authentication & User Profile

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/user/profile` | Retrieve current user's profile information (name, email, avatar, school, bio). |
| `GET` | `/api/user/stats` | Retrieve user's summary statistics (attendance rate, class rank, average grade). |
| `GET` | `/api/user/experience` | Retrieve user's experience points and level progression. |

## 2. Dashboard

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard/assignments` | Retrieve a list of assignments. Supports filtering by status (New, In Progress, Complete) or type (Due Soon). |
| `GET` | `/api/dashboard/resources` | Retrieve a list of recent resources or recommended reading materials. |


| `GET` | `/api/dashboard/study-stats` | Retrieve weekly study time data for the "Average Study Time" bar chart (e.g., minutes per day). |
| `GET` | `/api/dashboard/notices` | Retrieve posts for the "Notice Board" and announcement board (author, role, timestamp, content, avatar). |
| `GET` | `/api/dashboard/performance-chart` | Retrieve data for "Your Performance" pie chart (subject/category scores) and overall trend percentage. |
| `POST` | `/api/assignments/:id/submit` | Submit an assignment. Requires file upload (multipart/form-data). |

## 3. Announcements

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/announcements` | Retrieve a list of school or class announcements (title, date, description, author). |

## 4. E-Library

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/library/books` | Retrieve a list of books. Query parameters can be used for categories like `new-uploads`, `continue-reading`, or `all`. |

## 5. Events & Schedule

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/events/ongoing` | Retrieve details of currently ongoing classes (progress, subject name). |
| `GET` | `/api/events/schedule` | Retrieve the daily class schedule with time slots. |
| `GET` | `/api/events/upcoming` | Retrieve a list of upcoming classes/events (teacher, date, time). |
| `GET` | `/api/events/calendar` | Retrieve monthly calendar data and progress metrics. |

## 6. Results & Grades

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/results/overview` | Retrieve overall academic performance (total marks obtained vs total possible, attendance,percentage). |
| `GET` | `/api/results/subjects` | Retrieve detailed marks breakdown by subject (Mathematics, Science, English, etc.). |
| `GET` | `/api/results/remarks` | Retrieve teacher's remarks and feedback. |

## 7. Notifications

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/notifications` | Retrieve a list of user notifications. |
| `POST` | `/api/notifications/:id/read` | Mark a specific notification as read. |
