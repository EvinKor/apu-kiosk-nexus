
import { VendorLayout } from "@/components/layout/VendorLayout";
import { StatCards } from "@/components/dashboard/StatCards";
import { OrdersSummary } from "@/components/dashboard/OrdersSummary";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { SalesChart } from "@/components/dashboard/SalesChart";

const Index = () => {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        
        <StatCards />
        
        <OrdersSummary 
          pending={5} 
          preparing={3} 
          ready={2} 
          completed={14} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <RecentOrders />
        </div>
      </div>
    </VendorLayout>
  );
};

export default Index;
