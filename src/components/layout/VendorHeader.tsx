
import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface VendorHeaderProps {
  toggleSidebar: () => void;
}

export function VendorHeader({ toggleSidebar }: VendorHeaderProps) {
  const isMobile = useIsMobile();
  const [notifications] = useState(3);
  const vendorName = "Spice Haven";
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={toggleSidebar} className="flex md:flex">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/5789c9cf-9c55-4187-b66c-97e584d75656.png" 
            alt="APU Food Court Kiosk" 
            className="h-10 w-auto"
          />
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-semibold text-vendor-darkblue">
              {vendorName} Vendor Portal
            </h1>
            <span className="text-xs text-gray-500">Asia Pacific University Food Court Kiosk</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-vendor-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start">
              <p className="font-medium">New Order #4523</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start">
              <p className="font-medium">Order #4521 is ready for pickup</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start">
              <p className="font-medium">Daily sales report available</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
