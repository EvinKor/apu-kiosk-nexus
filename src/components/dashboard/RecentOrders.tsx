
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  items: string[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed";
  time: string;
}

const recentOrders: Order[] = [
  {
    id: "#4523",
    items: ["Nasi Lemak", "Teh Tarik"],
    total: 12.50,
    status: "pending",
    time: "5 mins ago",
  },
  {
    id: "#4522",
    items: ["Chicken Rice", "Lime Juice"],
    total: 14.00,
    status: "preparing",
    time: "12 mins ago",
  },
  {
    id: "#4521",
    items: ["Mee Goreng", "Ice Coffee"],
    total: 11.50,
    status: "ready",
    time: "18 mins ago",
  },
  {
    id: "#4520",
    items: ["Roti Canai", "Teh Tarik"],
    total: 8.00,
    status: "completed",
    time: "32 mins ago",
  },
];

export function RecentOrders() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Orders</CardTitle>
        <Link to="/orders">
          <Button variant="ghost" size="sm" className="text-vendor-blue flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.items.join(", ")}</TableCell>
                <TableCell>RM {order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`status-${order.status}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{order.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
