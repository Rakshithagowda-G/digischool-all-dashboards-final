import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FeesCard from "@/components/dashboard/FeesCard";
import ActiveUsersChart from "@/components/dashboard/ActiveUsersChart";
import NotificationPopup from "@/components/dashboard/NotificationPopup";
import { Users, GraduationCap, UserCircle, Megaphone, Clock, Users as UsersIcon, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { label: "Total Students", value: 245, icon: GraduationCap, color: "text-primary" },
    { label: "Total Teachers", value: 32, icon: Users, color: "text-secondary" },
    { label: "Total Parents", value: 198, icon: UserCircle, color: "text-accent" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);

  useEffect(() => {
    // TODO: Replace with axios call
    // Example: const fetchDashboardStats = async () => { ... }
    
    // Mock recent announcements data (same as Announcements page)
    setRecentAnnouncements([
      {
        id: 1,
        title: "School Holiday Notification",
        description: "School will remain closed on Friday, 26th January due to Republic Day...",
        recipients: ["All"],
        timestamp: "2024-01-20 10:30 AM",
      },
      {
        id: 2,
        title: "Parent-Teacher Meeting",
        description: "Parent-Teacher meeting is scheduled for next Saturday...",
        recipients: ["Parents"],
        timestamp: "2024-01-19 02:15 PM",
      },
      {
        id: 3,
        title: "Exam Schedule Released",
        description: "The final examination schedule for all classes has been released...",
        recipients: ["Students", "Parents"],
        timestamp: "2024-01-18 09:00 AM",
      },
    ]);
  }, []);

  const getRecipientBadgeColor = (recipient) => {
    switch (recipient) {
      case "All": return "bg-primary/10 text-primary";
      case "Students": return "bg-blue-500/10 text-blue-600";
      case "Teachers": return "bg-green-500/10 text-green-600";
      case "Parents": return "bg-purple-500/10 text-purple-600";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <NotificationPopup />
      
      {/* Header - Responsive */}
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 text-foreground">Dashboard Overview</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Welcome! Here's a snapshot of your LMS.</p>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4 md:mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-muted flex-shrink-0 ml-3">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Fees Card + Active Users Chart - Responsive Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 lg:grid-cols-2 mb-6 md:mb-8">
        <FeesCard />
        <ActiveUsersChart />
      </div>

      {/* Recent Announcements Section - Responsive */}
      <Card className="p-4 sm:p-6 md:p-8">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground truncate">
                Recent Announcements
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                Stay updated with latest school news
              </p>
            </div>
          </div>
          <Button variant="outline" asChild className="w-full sm:w-auto text-sm h-9 sm:h-10">
            <Link to="/announcements" className="flex items-center justify-center gap-2">
              <span className="hidden sm:inline">View All Announcements</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Announcements List - Responsive */}
        {recentAnnouncements.length === 0 ? (
          <div className="text-center py-8 sm:py-10 md:py-12">
            <Megaphone className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg text-muted-foreground">No recent announcements</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 max-h-none sm:max-h-80 md:max-h-96 overflow-y-auto">
            {recentAnnouncements.slice(0, 4).map((announcement) => (
              <div
                key={announcement.id}
                className="p-3 sm:p-4 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-primary/20"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                      {announcement.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
                      {announcement.description}
                    </p>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{announcement.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        <UsersIcon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        {announcement.recipients.map((recipient) => (
                          <Badge
                            key={recipient}
                            variant="secondary"
                            className={`px-1.5 sm:px-2 py-0.5 text-xs ${getRecipientBadgeColor(recipient)}`}
                          >
                            {recipient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Scroll Hint */}
        {recentAnnouncements.length > 3 && (
          <p className="text-xs text-muted-foreground mt-3 text-center sm:hidden">
            Scroll for more announcements
          </p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
