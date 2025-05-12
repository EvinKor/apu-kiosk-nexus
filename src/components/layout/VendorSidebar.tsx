
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MenuSquare,
  Clock,
  BarChart3,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
  
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-200 ease-in-out lg:translate-x-0 border-r border-sidebar-border",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-20 flex items-center justify-center border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/05e881a5-c9bd-46d4-a094-942741fad2bb.png" 
            alt="APU Food Court Kiosk" 
            className="h-10 w-auto"
          />
          <div className="text-white">
            <h2 className="text-lg font-bold leading-tight">KIOSK</h2>
            <p className="text-xs text-sidebar-foreground/70">APU Food Court</p>
          </div>
        </div>
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
              onClick={() => setIsOpen(false)}
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
