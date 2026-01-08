// pages/Meeting.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Video, Calendar, Clock, Users, Copy, Check } from 'lucide-react';


const Meeting = () => {
  const [showMeetingForm, setShowMeetingForm] = useState(true);
  const [showJitsiMeet, setShowJitsiMeet] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set([0]));
  
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    description: '',
    hostName: '',
    date: '',
    time: '',
    duration: '60',
    participants: '',
    roomName: ''
  });

  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const sectionRefs = useRef([]);

  // Bidirectional Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleSections((prev) => new Set([...prev, index]));
              }, 50);
            } else {
              if (index !== 0) {
                setVisibleSections((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(index);
                  return newSet;
                });
              }
            }
          });
        },
        observerOptions
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [showMeetingForm]);

  // Load Jitsi Meet API script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateRoomName = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${meetingDetails.title.replace(/\s+/g, '-').toLowerCase()}-${randomString}`;
  };

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    
    const roomName = generateRoomName();
    const meetingLink = `https://meet.jit.si/${roomName}`;
    
    const newMeeting = {
      ...meetingDetails,
      roomName,
      meetingLink,
      id: Date.now(),
      status: 'Scheduled'
    };

    setScheduledMeetings(prev => [...prev, newMeeting]);
    
    setMeetingDetails({
      title: '',
      description: '',
      hostName: '',
      date: '',
      time: '',
      duration: '60',
      participants: '',
      roomName: ''
    });

    alert('Meeting scheduled successfully!');
  };

  const startMeeting = (meeting) => {
    setMeetingDetails(meeting);
    setShowJitsiMeet(true);
    setShowMeetingForm(false);
  };

  const copyMeetingLink = (link) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const JitsiMeetComponent = ({ roomName, displayName }) => {
    useEffect(() => {
      if (window.JitsiMeetExternalAPI && roomName) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: roomName,
          width: '100%',
          height: 600,
          parentNode: document.querySelector('#jitsi-container'),
          userInfo: {
            displayName: displayName
          },
          configOverwrite: {
            startWithAudioMuted: true,
            startWithVideoMuted: false,
            disableModeratorIndicator: false,
            enableWelcomePage: false
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 
              'fullscreen', 'fodeviceselection', 'hangup', 'profile',
              'chat', 'recording', 'livestreaming', 'etherpad', 
              'sharedvideo', 'settings', 'raisehand', 'videoquality',
              'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
            ]
          }
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);

        api.addEventListener('videoConferenceJoined', () => {
          console.log('User joined the meeting');
        });

        api.addEventListener('videoConferenceLeft', () => {
          console.log('User left the meeting');
        });

        return () => {
          api.dispose();
        };
      }
    }, [roomName, displayName]);

    return <div id="jitsi-container" className="rounded-lg overflow-hidden shadow-lg"></div>;
  };

  return (
    <div className="max-w-8xl mx-auto">
      {/* Header */}
      <div 
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`mb-8 transition-all duration-1000 ease-out ${
          visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Video className="text-[#2F69FF] animate-pulse-slow" size={36} />
          Jitsi Meetings
        </h1>
        <p className="text-gray-600 mt-2">Schedule and join video meetings with Jitsi Meet</p>
      </div>

      {showMeetingForm && (
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 ease-out ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Schedule Meeting Form */}
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <Calendar size={24} className="text-[#2F69FF]" />
              Schedule New Meeting
            </h2>
            
            <form onSubmit={handleScheduleMeeting} className="space-y-4">
              <div className="animate-fade-in-stagger" style={{ animationDelay: '0ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Title 
                </label>
                <input
                  type="text"
                  name="title"
                  value={meetingDetails.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Math Class - Grade 10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition-all duration-300"
                />
              </div>

              <div className="animate-fade-in-stagger" style={{ animationDelay: '100ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host Name 
                </label>
                <input
                  type="text"
                  name="hostName"
                  value={meetingDetails.hostName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition-all duration-300"
                />
              </div>

              <div className="animate-fade-in-stagger" style={{ animationDelay: '200ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={meetingDetails.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Meeting agenda or description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 animate-fade-in-stagger" style={{ animationDelay: '300ms' }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date 
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={meetingDetails.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time 
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={meetingDetails.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="animate-fade-in-stagger" style={{ animationDelay: '400ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) 
                </label>
                <select
                  name="duration"
                  value={meetingDetails.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition-all duration-300"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2F69FF] to-[#1e4fd9] text-white py-3 rounded-3xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
                style={{ animationDelay: '500ms' }}
              >
                Schedule Meeting
              </button>
            </form>
          </div>

          {/* Scheduled Meetings List */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <Clock size={24} className="text-[#2F69FF]" />
              Scheduled Meetings ({scheduledMeetings.length})
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              {scheduledMeetings.length === 0 ? (
                <div className="text-center py-12 text-gray-400 animate-fade-in">
                  <Calendar size={48} className="mx-auto mb-3 opacity-50 animate-bounce-slow" />
                  <p>No meetings scheduled yet</p>
                </div>
              ) : (
                scheduledMeetings.map((meeting, idx) => (
                  <div
                    key={meeting.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:scale-102 transition-all duration-300 animate-fade-in-stagger"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">{meeting.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p className="flex items-center gap-2">
                        <Users size={16} />
                        Host: {meeting.hostName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar size={16} />
                        {meeting.date} at {meeting.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} />
                        Duration: {meeting.duration} minutes
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="text"
                        value={meeting.meetingLink}
                        readOnly
                        className="flex-1 px-3 py-1 bg-gray-50 border border-gray-300 rounded text-xs"
                      />
                      <button
                        onClick={() => copyMeetingLink(meeting.meetingLink)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded transition-all duration-300 hover:scale-110"
                        title="Copy link"
                      >
                        {copied ? <Check size={16} className="text-green-600 animate-scale-in" /> : <Copy size={16} />}
                      </button>
                    </div>

                    <button
                      onClick={() => startMeeting(meeting)}
                      className="w-full bg-[#2F69FF] text-white py-2 rounded-lg font-medium hover:bg-[#1e4fd9] hover:scale-105 transition-all duration-300"
                    >
                      Join Meeting
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Jitsi Meet Video Conference */}
      {showJitsiMeet && (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{meetingDetails.title}</h2>
            <button
              onClick={() => {
                setShowJitsiMeet(false);
                setShowMeetingForm(true);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
            >
              Leave Meeting
            </button>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <JitsiMeetComponent 
              roomName={meetingDetails.roomName} 
              displayName={meetingDetails.hostName}
            />
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-stagger {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .hover:scale-102:hover {
          transform: scale(1.02);
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Meeting;
