import { Bell, Search, ChevronDown, User, LogOut, Clock, Users, Upload, Image, Menu } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const Topbar = () => {
  const location = useLocation();
  const { profileDialogOpen, setProfileDialogOpen, profileData, setProfileData } = useProfile();
  const segments = location.pathname.split("/").filter(Boolean);
  
  const labelMap = {
    dashboard: "Dashboard",
    requests: "Requests",
    teachers: "Teachers",
    students: "Students",
    parents: "Parents",
    subjects: "Subjects",
    attendance: "Attendance",
    results: "Results",
    announcements: "Announcements",
    "add-teacher": "Add Teacher",
    "add-student": "Add Student",
  };

  const breadcrumbs = segments.length 
    ? segments.map((segment, index) => {
        const path = segments.slice(0, index + 1).join("/");
        const key = segment.toLowerCase();
        const label = labelMap[key] || segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        return { path, label, isLast: index === segments.length - 1 };
      })
    : [{ label: "Dashboard", path: "", isLast: true }];

  // States
  const [notificationsDialogOpen, setNotificationsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempProfileData, setTempProfileData] = useState(profileData);
  const [profileImagePreview, setProfileImagePreview] = useState(profileData.profilePicture);
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync tempProfileData when profileData changes
  useEffect(() => {
    setTempProfileData(profileData);
    setProfileImagePreview(profileData.profilePicture);
  }, [profileData]);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New student request",
      description: "John Smith requested admission to Class 5",
      time: "2 hours ago",
      unread: true,
      icon: "user-plus"
    },
    {
      id: 2,
      title: "Document uploaded",
      description: "Dr. Sarah Johnson uploaded notes for Class 10 Mathematics",
      time: "3 hours ago",
      unread: true,
      icon: "file-text"
    },
    {
      id: 3,
      title: "Fee payment received",
      description: "Payment of ₹25,000 received from Rajesh Sharma",
      time: "5 hours ago",
      unread: false,
      icon: "credit-card"
    },
    {
      id: 4,
      title: "New message",
      description: "Neha Patel sent you a message",
      time: "Yesterday",
      unread: false,
      icon: "message-circle"
    },
    {
      id: 5,
      title: "System update",
      description: "New features have been added to the dashboard",
      time: "2 days ago",
      unread: false,
      icon: "settings"
    }
  ];

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setTempProfileData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleProfileUpdate = () => {
    setProfileData(tempProfileData);
    setProfileImagePreview(tempProfileData.profilePicture);
    alert("Profile updated successfully!");
    setEditMode(false);
  };

  const handleProfileEdit = () => {
    setTempProfileData(profileData);
    setProfileImagePreview(profileData.profilePicture);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setTempProfileData(profileData);
    setProfileImagePreview(profileData.profilePicture);
    setEditMode(false);
  };

  const handleCloseDialog = () => {
    setProfileDialogOpen(false);
    if (editMode) {
      handleCancelEdit();
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="bg-card border-b border-border px-4 md:px-6 py-3 sticky top-0 z-10 shadow-sm pl-16 lg:pl-6">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Breadcrumbs - Hidden on mobile, show title instead */}
          <div className="flex-1 min-w-0">
            {/* Mobile Title */}
            <h1 className="md:hidden text-lg font-semibold text-foreground truncate">
              {breadcrumbs[breadcrumbs.length - 1].label}
            </h1>
            
            {/* Desktop Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="hidden md:block text-sm text-muted-foreground">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link to="/" className="text-foreground font-medium hover:underline">
                    Application
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    <span>&gt;</span>
                    {crumb.isLast ? (
                      <span className="text-foreground font-medium capitalize truncate">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link to={`/${crumb.path}`} className="hover:underline capitalize truncate">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <div className="hidden sm:block relative w-48 md:w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-muted/30 border-border h-9 text-sm"
              />
            </div>

            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="sm:hidden h-9 w-9 rounded-lg hover:bg-muted"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-4 h-4 text-foreground" />
            </Button>

            {/* Notification Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg hover:bg-muted">
                  <Bell className="w-4 h-4 text-foreground" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 sm:w-96 p-0" align="end">
                <div className="p-3 md:p-4 border-b">
                  <h3 className="font-semibold text-foreground text-sm md:text-base">Notifications</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    You have {notifications.filter(n => n.unread).length} unread notifications
                  </p>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="p-3 md:p-4 hover:bg-muted cursor-pointer border-b">
                      <div className="flex gap-3">
                        <div 
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            notification.unread ? 'bg-primary' : 'bg-muted-foreground/30'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground font-medium line-clamp-1">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-2 md:p-3 border-t text-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full h-9 md:h-10 text-sm font-medium hover:bg-primary/5"
                    onClick={() => setNotificationsDialogOpen(true)}
                  >
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-9 px-2 md:px-3 rounded-lg hover:bg-muted">
                  <div 
                    className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center font-semibold text-xs bg-gradient-to-r from-primary to-secondary text-primary-foreground flex-shrink-0"
                    style={{ 
                      backgroundImage: profileData.profilePicture ? `url(${profileData.profilePicture})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!profileData.profilePicture && getInitials(profileData.name)}
                  </div>
                  <span className="text-sm font-medium hidden lg:block max-w-32 truncate">{profileData.name}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-medium">
                  <p className="text-foreground truncate">{profileData.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{profileData.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setProfileDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {searchOpen && (
          <div className="sm:hidden mt-3 pb-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-muted/30 border-border h-9 text-sm w-full"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Notification Dialog - Responsive */}
      <Dialog open={notificationsDialogOpen} onOpenChange={setNotificationsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 md:gap-3 text-lg md:text-xl">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              All Notifications
            </DialogTitle>
            <p className="text-xs md:text-sm text-muted-foreground">
              {notifications.filter(n => n.unread).length} unread, {notifications.length} total
            </p>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto py-2 md:py-4 space-y-2 md:space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 md:p-4 rounded-lg md:rounded-xl border transition-all hover:shadow-md cursor-pointer ${
                  notification.unread 
                    ? 'bg-primary/5 border-primary/20 hover:bg-primary/10' 
                    : 'bg-background border-border hover:bg-muted'
                }`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full mt-1 ${
                        notification.unread ? 'bg-primary' : 'bg-muted-foreground/50'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <h4 className="font-semibold text-foreground text-sm md:text-base truncate flex-1">
                        {notification.title}
                      </h4>
                      <Badge 
                        variant={notification.unread ? "default" : "secondary"}
                        className="text-xs px-1.5 md:px-2 py-0.5"
                      >
                        {notification.unread ? "NEW" : "READ"}
                      </Badge>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{notification.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>System</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <DialogFooter className="pt-2">
            <Button 
              variant="outline" 
              onClick={() => setNotificationsDialogOpen(false)}
              className="w-full"
            >
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog - Responsive */}
      <Dialog open={profileDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="w-[95vw] max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 md:mb-6">
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-primary/20 p-1 bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg overflow-hidden"
                style={{ 
                  backgroundImage: profileData.profilePicture ? `url(${profileData.profilePicture})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!profileData.profilePicture && (
                  <div className="w-full h-full bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl md:text-2xl shadow-lg">
                    {getInitials(profileData.name)}
                  </div>
                )}
              </div>
            </div>
            
            <DialogTitle className="text-xl md:text-2xl font-bold">Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6 py-2 md:py-4">
            <div>
              <label className="text-xs md:text-sm font-medium text-muted-foreground mb-2 block">
                Name
              </label>
              {editMode ? (
                <Input
                  value={tempProfileData.name}
                  onChange={(e) => setTempProfileData({...tempProfileData, name: e.target.value})}
                  className="text-base md:text-lg font-semibold"
                />
              ) : (
                <p className="text-lg md:text-xl font-bold text-foreground">{profileData.name}</p>
              )}
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium text-muted-foreground mb-2 block">
                Email
              </label>
              {editMode ? (
                <Input
                  value={tempProfileData.email}
                  onChange={(e) => setTempProfileData({...tempProfileData, email: e.target.value})}
                  type="email"
                />
              ) : (
                <p className="text-base md:text-lg text-foreground break-all">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium text-muted-foreground mb-2 block">
                Phone
              </label>
              {editMode ? (
                <Input
                  value={tempProfileData.phone}
                  onChange={(e) => setTempProfileData({...tempProfileData, phone: e.target.value})}
                />
              ) : (
                <p className="text-base md:text-lg text-foreground">{profileData.phone}</p>
              )}
            </div>

            {editMode && (
              <div>
                <label className="text-xs md:text-sm font-medium text-muted-foreground mb-3 block flex items-center gap-2">
                  <Upload className="w-3 h-3 md:w-4 md:h-4" />
                  Profile Picture
                </label>
                <div className="space-y-2 md:space-y-3">
                  <div 
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-2 md:mb-3 border-2 border-muted overflow-hidden bg-gradient-to-r from-muted to-muted-foreground/20 flex items-center justify-center"
                    style={{ 
                      backgroundImage: profileImagePreview ? `url(${profileImagePreview})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!profileImagePreview && (
                      <span className="text-muted-foreground font-semibold text-sm">
                        {getInitials(tempProfileData.name)}
                      </span>
                    )}
                  </div>
                  <Input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer text-sm"
                  />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Image className="w-3 h-3" />
                    <span>PNG, JPG up to 2MB (Optional)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 pt-2 flex-col sm:flex-row">
            {!editMode ? (
              <>
                <Button 
                  onClick={handleProfileEdit}
                  className="w-full sm:flex-1 bg-primary hover:bg-primary/90"
                >
                  Edit Profile
                </Button>
                <Button 
                  variant="ghost"
                  onClick={handleCloseDialog}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleProfileUpdate}
                  className="w-full sm:flex-1"
                  disabled={
                    tempProfileData.name === profileData.name &&
                    tempProfileData.email === profileData.email &&
                    tempProfileData.phone === profileData.phone &&
                    tempProfileData.profilePicture === profileData.profilePicture
                  }
                >
                  Save Changes
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Topbar;
