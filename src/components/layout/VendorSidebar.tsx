
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MenuSquare,
  Clock,
  BarChart3,
  Settings,
  ChevronLeft,
  UserCog,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Menu Management",
    href: "/menu",
    icon: MenuSquare,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: Clock,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCog,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface VendorSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function VendorSidebar({ isOpen, setIsOpen }: VendorSidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-200 ease-in-out border-r border-sidebar-border",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-20 flex items-center justify-between border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/5789c9cf-9c55-4187-b66c-97e584d75656.png" 
            alt="APU Food Court Kiosk" 
            className="h-10 w-auto"
          />
          <div className="text-white">
            <h2 className="text-lg font-bold leading-tight">KIOSK</h2>
            <p className="text-xs text-sidebar-foreground/70">APU Food Court</p>
          </div>
        </div>
        
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link to={item.href} key={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-white",
                location.pathname === item.href && "bg-sidebar-accent"
              )}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-0 right-0 p-4">
        <div className="text-sidebar-foreground/70 text-sm text-center">
          <p>APU Food Court Kiosk System</p>
          <p className="text-xs">Vendor Portal v1.0</p>
        </div>
      </div>
    </div>
  );
}
