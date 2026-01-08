import { useState, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { useProfile } from "@/contexts/ProfileContext";
import { LayoutDashboard, Mail, Users, GraduationCap, UserCircle, Layers, CheckSquare, BookOpen, Megaphone, Award, X, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { setProfileDialogOpen, profileData } = useProfile();
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const linkClasses =
    "flex items-center gap-3 px-4 py-3 text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground transition-all duration-200 ease-in-out group relative rounded-lg";
  const activeClasses =
    "bg-background text-primary font-semibold border-l-4 border-primary pointer-events-none";

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Mail, label: "Requests", path: "/requests" },
    { icon: Users, label: "Teachers", path: "/teachers" },
    { icon: GraduationCap, label: "Students", path: "/students" },
    { icon: UserCircle, label: "Parents", path: "/parents" },
    { icon: BookOpen, label: "Subjects", path: "/subjects" },
    { icon: CheckSquare, label: "Attendance", path: "/attendance" },
    { icon: Award, label: "Results", path: "/results" },
    { icon: Megaphone, label: "Announcements", path: "/announcements" },
  ];

  const MenuItem = ({ item, isActive }) => {
    const content = (
      <>
        <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
        {(!isCollapsed || isMobile) && <span className="font-medium whitespace-nowrap">{item.label}</span>}
      </>
    );

    // No tooltip on mobile
    if (isCollapsed && !isMobile) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={item.path}
              className={linkClasses}
              activeClassName={activeClasses}
            >
              {content}
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <NavLink
        to={item.path}
        className={linkClasses}
        activeClassName={activeClasses}
      >
        {content}
      </NavLink>
    );
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
      {/* Mobile Menu Button - Fixed at top */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-card shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-sidebar flex flex-col transition-all duration-300 ease-in-out h-screen shadow-lg",
          // Mobile styles
          "lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop styles
          isMobile ? "w-64" : (isCollapsed ? "w-20" : "w-64")
        )}
        onMouseEnter={() => !isMobile && setIsCollapsed(false)}
        onMouseLeave={() => !isMobile && setIsCollapsed(true)}
      >
        {/* Header */}
        <div className={cn(
          "border-b border-sidebar-border/30 transition-all duration-300 flex items-center justify-between",
          isCollapsed && !isMobile ? "p-4" : "p-6"
        )}>
          <div className="flex items-center gap-2">
            <Layers className={cn(
              "text-sidebar-foreground flex-shrink-0 transition-all duration-300",
              isCollapsed && !isMobile ? "w-8 h-8" : "w-6 h-6"
            )} />
            {(!isCollapsed || isMobile) && (
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground whitespace-nowrap">LMS Admin</h1>
                <p className="text-sm text-sidebar-foreground/70">Management System</p>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <MenuItem key={item.path} item={item} />
          ))}
        </nav>
        
        {/* Admin Profile Section */}
        <div className="p-3 md:p-4 border-t border-sidebar-border/30">
          <div 
            className={cn(
              "flex items-center gap-3 rounded-lg hover:bg-sidebar-hover transition-colors cursor-pointer",
              isCollapsed && !isMobile ? "px-2 py-3 justify-center" : "px-3 md:px-4 py-3"
            )}
            onClick={() => {
              setProfileDialogOpen(true);
              setIsMobileMenuOpen(false);
            }}
          >
            <div 
              className="w-10 h-10 rounded-full bg-sidebar-accent text-sidebar-foreground flex items-center justify-center font-semibold flex-shrink-0 overflow-hidden"
              style={{ 
                backgroundImage: profileData.profilePicture ? `url(${profileData.profilePicture})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!profileData.profilePicture && getInitials(profileData.name)}
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-sidebar-foreground truncate">{profileData.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{profileData.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Spacer for desktop to prevent content overlap */}
      <div 
        className={cn(
          "hidden lg:block transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      />
    </>
  );
};

export default Sidebar;
