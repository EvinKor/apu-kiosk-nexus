
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, Search, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed";
  previousStatus?: "pending" | "preparing" | "ready" | "completed";
  time: string;
  studentId?: string;
}

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#4523",
      customerName: "John Smith",
      studentId: "TP058734",
      items: [
        { name: "Nasi Lemak", quantity: 1, price: 8.50 },
        { name: "Teh Tarik", quantity: 1, price: 3.00 }
      ],
      total: 11.50,
      status: "pending",
      time: "5 mins ago",
    },
    {
      id: "#4522",
      customerName: "Sarah Lee",
      studentId: "TP045621",
      items: [
        { name: "Chicken Rice", quantity: 1, price: 9.00 },
        { name: "Lime Juice", quantity: 1, price: 3.00 },
        { name: "Curry Puff", quantity: 2, price: 2.00 }
      ],
      total: 16.00,
      status: "preparing",
      time: "12 mins ago",
    },
    {
      id: "#4521",
      customerName: "Ahmed Hassan",
      studentId: "TP058123",
      items: [
        { name: "Mee Goreng", quantity: 1, price: 7.00 },
        { name: "Ice Coffee", quantity: 1, price: 4.50 }
      ],
      total: 11.50,
      status: "ready",
      time: "18 mins ago",
    },
    {
      id: "#4520",
      customerName: "Grace Wong",
      studentId: "TP059876",
      items: [
        { name: "Roti Canai", quantity: 2, price: 3.00 },
        { name: "Teh Tarik", quantity: 1, price: 3.00 }
      ],
      total: 9.00,
      status: "completed",
      time: "32 mins ago",
    },
  ]);
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.studentId && order.studentId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = activeTab === "all" || order.status === activeTab;
    
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: "pending" | "preparing" | "ready" | "completed") => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { 
          ...order, 
          previousStatus: order.status, // Store the previous status before updating
          status: newStatus 
        };
      }
      return order;
    }));
    
    const statusMessages = {
      preparing: "Order is now being prepared",
      ready: "Order is ready for pickup",
      completed: "Order has been completed"
    };
    
    toast({
      title: `Order ${orderId} Updated`,
      description: statusMessages[newStatus] || "Status updated successfully",
      variant: "default",
    });
  };
  
  const revertOrderStatus = (orderId: string) => {
    const orderToRevert = orders.find(order => order.id === orderId);
    
    if (orderToRevert && orderToRevert.previousStatus) {
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          const { previousStatus } = order;
          return { 
            ...order, 
            status: previousStatus,
            previousStatus: undefined // Clear the previous status after reverting
          };
        }
        return order;
      }));
      
      toast({
        title: `Order ${orderId} Reverted`,
        description: `Order status reverted to ${orderToRevert.previousStatus}`,
        variant: "default",
      });
    } else {
      toast({
        title: `Cannot Revert Order ${orderId}`,
        description: "No previous status found for this order",
        variant: "destructive",
      });
    }
  };
  
  const getActionButton = (order: Order) => {
    const { id, status } = order;
    
    switch (status) {
      case "pending":
        return (
          <Button 
            size="sm"
            onClick={() => updateOrderStatus(id, "preparing")}
          >
            <Clock className="mr-1 h-4 w-4" /> Start Preparing
          </Button>
        );
      case "preparing":
        return (
          <Button 
            size="sm"
            onClick={() => updateOrderStatus(id, "ready")}
          >
            <Check className="mr-1 h-4 w-4" /> Mark as Ready
          </Button>
        );
      case "ready":
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => updateOrderStatus(id, "completed")}
          >
            <Check className="mr-1 h-4 w-4" /> Mark as Completed
          </Button>
        );
      default:
        return null;
    }
  };

  const canRevert = (order: Order) => {
    return order.previousStatus !== undefined;
  };
  
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs 
            defaultValue="all" 
            className="w-full md:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search orders..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-4 items-center">
                    <CardTitle>{order.id}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`status-${order.status}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{order.time}</span>
                    {canRevert(order) && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => revertOrderStatus(order.id)}
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <Undo className="mr-1 h-4 w-4" /> Revert
                      </Button>
                    )}
                    {getActionButton(order)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Customer</h4>
                    <p>{order.customerName}</p>
                    {order.studentId && <p className="text-sm text-muted-foreground">ID: {order.studentId}</p>}
                  </div>
                  <div className="md:col-span-1">
                    <h4 className="text-sm font-medium text-muted-foreground">Items</h4>
                    <ul className="text-sm mt-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                          <span>RM {(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col items-end">
                    <h4 className="text-sm font-medium text-muted-foreground">Total</h4>
                    <p className="text-lg font-semibold">RM {order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </VendorLayout>
  );
};

export default OrdersPage;
