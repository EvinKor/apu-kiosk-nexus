
import { useState } from "react";
import { VendorHeader } from "./VendorHeader";
import { VendorSidebar } from "./VendorSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
            sidebarOpen ? (isMobile ? "ml-0" : "ml-64") : "ml-0"
          }`}
        >
          {!sidebarOpen && !isMobile && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleSidebar}
              className="mb-4 bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
