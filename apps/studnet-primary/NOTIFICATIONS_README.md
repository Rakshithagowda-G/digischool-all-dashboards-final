# Notifications Component - Usage Guide

## Overview
A modern React notifications component that displays a preview of recent notifications and expands inline to show the full list without redirecting to another page.

## Features
✅ Shows latest 2 notifications in preview card
✅ "See All" button expands full list on the same page
✅ Smooth animations with Framer Motion
✅ Scrollable expanded panel (max-height: 500px)
✅ Close button (X) to collapse the panel
✅ Soft lavender theme (#CDA3F5)
✅ Unread notification indicators
✅ Color-coded notification types (success, warning, info)
✅ Responsive design

## Installation

### 1. Install Dependencies
```bash
npm install framer-motion lucide-react
```

### 2. Import the CSS (Optional)
Add to your main CSS file or `index.css`:
```css
@import './styles/notifications-scrollbar.css';
```

Or if using Tailwind, add the scrollbar plugin:
```bash
npm install -D tailwind-scrollbar
```

Then in `tailwind.config.js`:
```javascript
module.exports = {
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
```

## Usage

### Basic Usage
```jsx
import { Notifications } from './components/ui/Notifications';

function Dashboard() {
  return (
    <div className="p-8">
      <Notifications />
    </div>
  );
}
```

### In a Grid Layout
```jsx
import { Notifications } from './components/ui/Notifications';

function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Notifications */}
      <div>
        <Notifications />
      </div>

      {/* Other Content */}
      <div className="bg-white rounded-2xl p-6">
        <h2>Other Dashboard Content</h2>
      </div>
    </div>
  );
}
```

## Component Structure

### Notifications.jsx
- **Preview Mode**: Shows 2 latest notifications
- **Expanded Mode**: Shows all notifications (9 total in demo)
- **Toggle State**: Uses `useState` to manage expansion
- **Animations**: Smooth height/opacity transitions

### Key Props
The component is self-contained and doesn't require props. To customize:

1. **Change preview count**: Modify `slice(0, 2)` to `slice(0, n)`
2. **Add notifications**: Add to `allNotifications` array
3. **Theme colors**: Change `#CDA3F5` to your brand color

## Customization

### Change Theme Color
Replace all instances of `#CDA3F5` with your color:
```jsx
// In Notifications.jsx
className="bg-gradient-to-r from-[#YOUR_COLOR] to-[#YOUR_COLOR_DARK]"
```

### Modify Max Height
```jsx
// In the expanded panel
className="max-h-[500px] overflow-y-auto"
// Change to max-h-[600px] or any value
```

### Change Preview Count
```jsx
const previewNotifications = allNotifications.slice(0, 3); // Show 3 instead of 2
```

## Notification Data Structure
```javascript
{
  id: 1,
  type: "success" | "warning" | "info",
  title: "Notification Title",
  message: "Notification message content",
  time: "2h ago",
  read: false
}
```

## Styling

### Colors Used
- **Primary**: `#CDA3F5` (Lavender)
- **Secondary**: `#b88de6` (Darker Lavender)
- **Success**: Green (`text-green-500`)
- **Warning**: Yellow (`text-yellow-500`)
- **Info**: Blue (`text-blue-500`)

### Tailwind Classes
- `rounded-2xl` - Rounded corners
- `shadow-md` / `shadow-lg` - Shadows
- `border-gray-100` - Subtle borders
- `scrollbar-thin` - Custom scrollbar

## File Structure
```
src/
├── components/
│   └── ui/
│       └── Notifications.jsx
├── styles/
│   └── notifications-scrollbar.css
└── pages/
    └── NotificationsDemo.jsx (example)
```

## Browser Support
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Tips
1. Import the component where needed
2. Ensure Framer Motion is installed
3. The component is fully self-contained
4. No external state management needed
5. Works with any layout (grid, flex, etc.)

## Demo
See `NotificationsDemo.jsx` for a complete working example.

## License
Free to use in your project!
