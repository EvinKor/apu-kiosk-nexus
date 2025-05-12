
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [storeOpen, setStoreOpen] = useState(true);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
    });
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Store settings updated",
      description: "Your store settings have been successfully updated.",
    });
  };
  
  const toggleStoreStatus = () => {
    const newStatus = !storeOpen;
    setStoreOpen(newStatus);
    toast({
      title: `Store ${newStatus ? "opened" : "closed"}`,
      description: `Your store is now ${newStatus ? "accepting" : "not accepting"} orders.`,
    });
  };
  
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="store">Store Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <form onSubmit={handleSaveProfile}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your vendor account information and contact details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input id="storeName" defaultValue="Spice Haven" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner Name</Label>
                      <Input id="ownerName" defaultValue="Ahmad Bin Abdullah" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="ahmad@spicehaven.my" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+60 12-345-6789" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Store Description</Label>
                    <Textarea 
                      id="description" 
                      defaultValue="Spice Haven offers authentic Malaysian cuisine with a modern twist. Our dishes are prepared with the freshest ingredients and traditional spices." 
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Change Password</Label>
                    <Input id="password" type="password" placeholder="Enter new password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="store">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Store Status</CardTitle>
                <CardDescription>
                  Control whether your store is open or closed for orders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Store Status</p>
                    <p className="text-sm text-muted-foreground">
                      {storeOpen ? "Your store is currently open and accepting orders" : "Your store is currently closed and not accepting orders"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="storeStatus" 
                      checked={storeOpen} 
                      onCheckedChange={toggleStoreStatus} 
                    />
                    <Label htmlFor="storeStatus">{storeOpen ? "Open" : "Closed"}</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <form onSubmit={handleSaveStoreSettings}>
                <CardHeader>
                  <CardTitle>Store Settings</CardTitle>
                  <CardDescription>
                    Manage your store's operational settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preparationTime">Average Preparation Time (minutes)</Label>
                      <Input id="preparationTime" type="number" defaultValue="15" min="1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDailyOrders">Maximum Daily Orders (0 for unlimited)</Label>
                      <Input id="maxDailyOrders" type="number" defaultValue="0" min="0" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="autoAccept" 
                      checked={autoAcceptOrders} 
                      onCheckedChange={setAutoAcceptOrders} 
                    />
                    <Label htmlFor="autoAccept">Automatically accept new orders</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cuisineType">Cuisine Type</Label>
                    <Input id="cuisineType" defaultValue="Malaysian" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions for Customers</Label>
                    <Textarea 
                      id="specialInstructions" 
                      placeholder="Optional special instructions or notes for customers" 
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Settings</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <form onSubmit={handleSaveNotifications}>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications about your store.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="enableNotifications" 
                      checked={notificationsEnabled} 
                      onCheckedChange={setNotificationsEnabled} 
                    />
                    <Label htmlFor="enableNotifications">Enable notifications</Label>
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <h4 className="font-medium">Order Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="newOrders" className="flex-1">New order notifications</Label>
                      <Switch id="newOrders" defaultChecked={true} disabled={!notificationsEnabled} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="orderStatus" className="flex-1">Order status changes</Label>
                      <Switch id="orderStatus" defaultChecked={true} disabled={!notificationsEnabled} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="orderCancellations" className="flex-1">Order cancellations</Label>
                      <Switch id="orderCancellations" defaultChecked={true} disabled={!notificationsEnabled} />
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <h4 className="font-medium">System Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="systemUpdates" className="flex-1">System updates and maintenance</Label>
                      <Switch id="systemUpdates" defaultChecked={false} disabled={!notificationsEnabled} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics" className="flex-1">Daily analytics reports</Label>
                      <Switch id="analytics" defaultChecked={true} disabled={!notificationsEnabled} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="announcements" className="flex-1">APU food court announcements</Label>
                      <Switch id="announcements" defaultChecked={true} disabled={!notificationsEnabled} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={!notificationsEnabled}>Save Preferences</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default SettingsPage;
