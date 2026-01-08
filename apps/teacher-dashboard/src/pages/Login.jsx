import { useState } from 'react'

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!role) {
      setError('Please select Admin or Teacher')
      return
    }

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    onNavigate(role)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-500 via-white to-white p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Select your role and login to continue
        </p>
        
        {/* Role Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Select Role
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                role === 'admin'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                role === 'teacher'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Teacher
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          {error && (
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Login as {role ? role.charAt(0).toUpperCase() + role.slice(1) : '...'}
          </button>
        </form>

        
      </div>
    </div>
  )
}
