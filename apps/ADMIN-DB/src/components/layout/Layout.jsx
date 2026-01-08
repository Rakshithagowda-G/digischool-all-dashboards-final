import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 p-0 sm:p-3 md:p-4 lg:p-6">
      <div className={cn(
        "min-h-screen sm:min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]",
        "bg-card border border-border",
        "sm:rounded-2xl md:rounded-3xl",
        "sm:shadow-2xl md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 ease-in-out",
        "lg:ml-20",
        !isCollapsed && "lg:ml-64",
        "ml-0",
        "overflow-hidden"
      )}>
        <Sidebar />
        
        <div className="flex flex-col h-full">
          <Topbar />
          
          <main className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-background to-muted/20">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
