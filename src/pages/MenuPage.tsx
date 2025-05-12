
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

const sampleMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Nasi Lemak with Chicken",
    description: "Coconut rice with chicken and sambal sauce",
    price: 8.50,
    category: "main",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    available: true,
  },
  {
    id: "2",
    name: "Mee Goreng",
    description: "Fried noodles with vegetables and egg",
    price: 7.00,
    category: "main",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    available: true,
  },
  {
    id: "3",
    name: "Teh Tarik",
    description: "Pulled milk tea",
    price: 3.00,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    available: true,
  },
  {
    id: "4",
    name: "Ice Milo",
    description: "Cold chocolate malt drink",
    price: 3.50,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    available: false,
  },
];

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredItems = sampleMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Menu Management</h2>
          <Button className="bg-vendor-blue hover:bg-vendor-darkblue">
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs 
            defaultValue="all" 
            className="w-full md:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="main">Main Dishes</TabsTrigger>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="w-full md:w-72">
            <Input 
              placeholder="Search menu items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-sm">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant={item.available ? "default" : "outline"}>
                    {item.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-2 text-lg font-bold">RM {item.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="text-vendor-red hover:text-vendor-red">
                  <Trash2 className="mr-2 h-4 w-4" /> Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </VendorLayout>
  );
};

export default MenuPage;
