export default function AdminDashboard({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => onNavigate('login')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Teachers</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              25
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Students</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              450
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Classes</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              18
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Pending Approvals</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              8
            </p>
          </div>
        </div>

        {/* Menu and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Admin Menu</h3>
              <ul className="space-y-2">
                <li className="px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white cursor-pointer">
                  Manage Teachers
                </li>
                <li className="px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors">
                  Manage Students
                </li>
                <li className="px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors">
                  Manage Classes
                </li>
                <li className="px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors">
                  View Reports
                </li>
                <li className="px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors">
                  Settings
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Overview</h2>
              <p className="text-gray-600">
                Welcome to the Admin Dashboard. Select an option from the menu to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
