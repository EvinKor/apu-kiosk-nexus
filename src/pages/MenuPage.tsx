
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Trash2, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

const menuItemSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  category: z.string({ required_error: "Please select a category" }),
  image: z.string().url({ message: "Please enter a valid image URL" }).or(z.string().min(1, { message: "Image is required" })),
  available: z.boolean().default(true),
});

const sampleMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Lasagna",
    description: "Layers of pasta with minced meat, cheese and tomato sauce",
    price: 12.50,
    category: "main",
    image: "/lovable-uploads/5d9d537d-6aef-4f38-b011-5d7d1be5b913.png",
    available: true,
  },
  {
    id: "2",
    name: "Spaghetti Bolognese",
    description: "Spaghetti served with a rich meat sauce and parmesan cheese",
    price: 10.00,
    category: "main",
    image: "/lovable-uploads/e00f9934-ff29-4d75-9d37-52e92ea7459e.png",
    available: true,
  },
  {
    id: "3",
    name: "Mojito",
    description: "Fresh lime, mint, sugar, soda water and rum",
    price: 7.50,
    category: "drinks",
    image: "/lovable-uploads/91f9bcb7-3ef0-4658-849c-a80f1bd1dcc0.png",
    available: true,
  },
  {
    id: "4",
    name: "Pepperoni Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and pepperoni",
    price: 14.90,
    category: "main",
    image: "/lovable-uploads/45858f53-2b5a-46ef-afce-d08016d439e1.png",
    available: true,
  },
];

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);
  
  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "main",
      image: "",
      available: true,
    },
  });
  
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });
  
  // Open add dialog
  const handleAddNew = () => {
    form.reset({
      name: "",
      description: "",
      price: 0,
      category: "main",
      image: "",
      available: true,
    });
    setIsAddDialogOpen(true);
  };
  
  // Open edit dialog
  const handleEdit = (item: MenuItem) => {
    setCurrentItem(item);
    form.reset({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      available: item.available,
    });
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const handleDelete = (item: MenuItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle form submission for adding new item
  const handleAddSubmit = (data: z.infer<typeof menuItemSchema>) => {
    const newItem: MenuItem = {
      id: `${Date.now()}`, // Generate a unique ID
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image,
      available: data.available,
    };
    
    setMenuItems([...menuItems, newItem]);
    setIsAddDialogOpen(false);
    toast({
      title: "Menu Item Added",
      description: `${data.name} has been added to the menu`,
    });
  };
  
  // Handle form submission for editing an item
  const handleEditSubmit = (data: z.infer<typeof menuItemSchema>) => {
    if (!currentItem) return;
    
    setMenuItems(menuItems.map(item => 
      item.id === currentItem.id ? { 
        ...item, 
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        image: data.image,
        available: data.available,
      } : item
    ));
    
    setIsEditDialogOpen(false);
    toast({
      title: "Menu Item Updated",
      description: `${data.name} has been updated`,
    });
  };
  
  // Handle delete confirmation
  const confirmDelete = () => {
    if (!currentItem) return;
    
    setMenuItems(menuItems.filter(item => item.id !== currentItem.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Menu Item Removed",
      description: `${currentItem.name} has been removed from the menu`,
      variant: "destructive",
    });
  };
  
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Menu Management</h2>
          <Button className="bg-vendor-blue hover:bg-vendor-darkblue" onClick={handleAddNew}>
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
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-vendor-red hover:text-vendor-red"
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Add New Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>
              Create a new item for your menu. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (RM)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.10" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Item description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="main">Main Dishes</SelectItem>
                          <SelectItem value="drinks">Drinks</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Image URL" {...field} />
                        </FormControl>
                        <Button type="button" size="icon" variant="outline">
                          <Image className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Availability</FormLabel>
                      <FormDescription>
                        Set this item as available for ordering
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Item</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Make changes to the menu item. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (RM)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.10" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Item description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="main">Main Dishes</SelectItem>
                          <SelectItem value="drinks">Drinks</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Image URL" {...field} />
                        </FormControl>
                        <Button type="button" size="icon" variant="outline">
                          <Image className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Availability</FormLabel>
                      <FormDescription>
                        Set this item as available for ordering
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Menu Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this item from your menu?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentItem && (
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 overflow-hidden rounded-md">
                  <img 
                    src={currentItem.image} 
                    alt={currentItem.name} 
                    className="object-cover w-full h-full" 
                  />
                </div>
                <div>
                  <p className="font-medium">{currentItem.name}</p>
                  <p className="text-sm text-muted-foreground">RM {currentItem.price.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </VendorLayout>
  );
};

export default MenuPage;
