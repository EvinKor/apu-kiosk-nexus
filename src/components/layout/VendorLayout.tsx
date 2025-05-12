
import { useState } from "react";
import { VendorHeader } from "./VendorHeader";
import { VendorSidebar } from "./VendorSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface VendorLayoutProps {
  children: React.ReactNode;
}

export function VendorLayout({ children }: VendorLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <VendorHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <VendorSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main
          className={`flex-1 p-4 transition-all duration-200 bg-vendor-lightgray ${
            isMobile ? "ml-0" : sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
