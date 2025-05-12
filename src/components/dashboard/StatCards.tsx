
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Package, Clock } from "lucide-react";

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Sales Today</p>
              <h3 className="text-2xl font-bold mt-1">RM 458.50</h3>
              <div className="flex items-center mt-2 text-sm">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>12.5%</span>
                </div>
                <span className="text-muted-foreground ml-2">vs yesterday</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <BarChart3 className="h-6 w-6 text-vendor-blue" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders Today</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
              <div className="flex items-center mt-2 text-sm">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>8.2%</span>
                </div>
                <span className="text-muted-foreground ml-2">vs yesterday</span>
              </div>
            </div>
            <div className="bg-amber-50 p-3 rounded-md">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Preparation Time</p>
              <h3 className="text-2xl font-bold mt-1">12.5 min</h3>
              <div className="flex items-center mt-2 text-sm">
                <div className="flex items-center text-red-600">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>2.1%</span>
                </div>
                <span className="text-muted-foreground ml-2">faster than avg</span>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Popular Item</p>
              <h3 className="text-2xl font-bold mt-1">Nasi Lemak</h3>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-muted-foreground">18 orders today</span>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-md">
              <Utensils className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { BarChart3, Utensils } from "lucide-react";
