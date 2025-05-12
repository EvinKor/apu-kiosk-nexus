
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const salesData = [
  { date: "01 May", sales: 300 },
  { date: "02 May", sales: 320 },
  { date: "03 May", sales: 280 },
  { date: "04 May", sales: 350 },
  { date: "05 May", sales: 400 },
  { date: "06 May", sales: 380 },
  { date: "07 May", sales: 420 },
  { date: "08 May", sales: 450 },
  { date: "09 May", sales: 470 },
  { date: "10 May", sales: 400 },
  { date: "11 May", sales: 430 },
  { date: "12 May", sales: 450 },
  { date: "13 May", sales: 480 },
  { date: "14 May", sales: 500 },
];

const popularItems = [
  { name: "Nasi Lemak", value: 25 },
  { name: "Chicken Rice", value: 18 },
  { name: "Mee Goreng", value: 15 },
  { name: "Teh Tarik", value: 12 },
  { name: "Ice Milo", value: 10 },
  { name: "Others", value: 20 },
];

const COLORS = ["#1a73e8", "#34a853", "#fbbc04", "#ea4335", "#9e34a8", "#9aa0a6"];

const AnalyticsPage = () => {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        </div>
        
        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="items">Popular Items</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="sales" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Sales Trend (Last 14 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={salesData}
                        margin={{
                          top: 5,
                          right: 20,
                          left: 20,
                          bottom: 25,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis 
                          dataKey="date" 
                          angle={-45} 
                          textAnchor="end" 
                          height={70} 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "white", 
                            border: "1px solid #ddd",
                            borderRadius: "4px", 
                          }}
                          formatter={(value: any) => [`RM ${value}`, "Sales"]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sales" 
                          stroke="#1a73e8" 
                          strokeWidth={2} 
                          dot={{ r: 3 }} 
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Total Sales (This Month)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">RM 12,450.00</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      +15.2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Avg. Daily Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">RM 415.00</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      +8.7% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Highest Sales Day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">RM 580.00</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      On May 14, 2025
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Sales Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">RM 13,200.00</p>
                    <p className="text-sm text-blue-600 flex items-center mt-1">
                      Next month projection
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-6">
              <SalesChart />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Total Orders (This Month)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">752</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      +12.4% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Avg. Order Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">RM 16.55</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      +2.3% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Peak Order Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">12:00 PM</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Lunch time rush
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Avg. Preparation Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">12.5 min</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      Improved by 2.1%
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="items" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Most Popular Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={popularItems}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {popularItems.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip 
                          formatter={(value: any, name: any) => [`${value} orders`, name]}
                          contentStyle={{ 
                            backgroundColor: "white", 
                            border: "1px solid #ddd", 
                            borderRadius: "4px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Top Selling Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {popularItems.slice(0, 5).map((item, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                              <span className="text-white font-medium">{index + 1}</span>
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="text-muted-foreground">{item.value} orders</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Item Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Best Selling Time</h4>
                        <p className="text-sm text-muted-foreground">Nasi Lemak sells best during lunch hours (11:30 AM - 1:30 PM)</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Most Common Combinations</h4>
                        <p className="text-sm text-muted-foreground">Nasi Lemak + Teh Tarik (32% of Nasi Lemak orders)</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Sales Growth</h4>
                        <p className="text-sm text-muted-foreground">Chicken Rice has shown 15% growth in the last month</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Recommendation</h4>
                        <p className="text-sm text-muted-foreground">Consider featuring Mee Goreng as a promoted item to boost sales</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default AnalyticsPage;
