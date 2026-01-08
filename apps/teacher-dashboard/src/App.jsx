import { useState } from 'react'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('login')

  if (currentPage === 'login') {
    return <Login onNavigate={setCurrentPage} />
  }

  if (currentPage === 'admin') {
    return <AdminDashboard onNavigate={setCurrentPage} />
  }

  if (currentPage === 'teacher') {
    return <TeacherDashboard onNavigate={setCurrentPage} />
  }
}

export default App
