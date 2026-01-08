import { cn } from '@/lib/utils'
import { Calendar, Clock } from 'lucide-react'

export const UpcomingWebinarCard = ({
  title = "Next Generation Frontend Architecture Using Layout Engine And React Native Web.",
  date = "17 Nov 23",
  duration = "32 minutes",
  onJoinClick,
  className
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-md p-5 w-full h-full flex flex-col',
        className
      )}
    >
      {/* Illustration */}
      <div className="w-full h-[120px] bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simple illustration placeholder - person with laptop */}
          <div className="relative scale-75">
            {/* Plant on left */}
            <div className="absolute -left-32 top-12">
              <div className="w-12 h-12 bg-green-400 rounded-full opacity-60"></div>
              <div className="w-8 h-8 bg-green-300 rounded-full opacity-70 ml-3 -mt-6"></div>
            </div>

            {/* Person */}
            <div className="flex flex-col items-center">
              {/* Head */}
              <div className="w-12 h-12 bg-slate-600 rounded-full mb-1"></div>
              {/* Body */}
              <div className="w-24 h-18 bg-indigo-500 rounded-t-3xl flex items-end justify-center pb-1">
                {/* Laptop */}
                <div className="w-18 h-12 bg-slate-700 rounded-lg"></div>
              </div>
            </div>

            {/* Chat bubble */}
            <div className="absolute -right-20 top-6">
              <div className="bg-green-400 text-white text-xs px-2 py-1 rounded-lg rounded-bl-none">
                ✓✓
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">
        Upcoming Webinar
      </h2>

      {/* Title */}
      <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
        {title}
      </p>

      {/* Date and Duration */}
      <div className="flex gap-6 mb-4">
        {/* Date */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{date}</div>
            <div className="text-xs text-gray-500">Date</div>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{duration}</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
        </div>
      </div>

      {/* Join Button */}
      <button
        onClick={onJoinClick}
        className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-md text-sm"
      >
        Join the event
      </button>
    </div>
  )
}
