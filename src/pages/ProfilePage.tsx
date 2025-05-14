
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
  const { toast } = useToast();
  const [vendorInfo, setVendorInfo] = useState({
    storeName: "Spice Haven",
    ownerName: "Ahmad Bin Abdullah",
    email: "ahmad@spicehaven.my",
    phone: "+60 12-345-6789",
    description: "Spice Haven offers authentic Malaysian cuisine with a modern twist. Our dishes are prepared with the freshest ingredients and traditional spices.",
    address: "APU Food Court, Technology Park Malaysia, Bukit Jalil, Kuala Lumpur",
    storeImage: "/lovable-uploads/5789c9cf-9c55-4187-b66c-97e584d75656.png"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setVendorInfo(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
    });
  };
  
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Vendor Profile</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your vendor account information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={vendorInfo.storeImage} alt={vendorInfo.storeName} />
                    <AvatarFallback>{vendorInfo.storeName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{vendorInfo.storeName}</h3>
                    <p className="text-sm text-muted-foreground">Upload a new store logo</p>
                    <Input type="file" className="mt-2" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input 
                      id="storeName" 
                      value={vendorInfo.storeName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input 
                      id="ownerName" 
                      value={vendorInfo.ownerName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={vendorInfo.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={vendorInfo.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Store Address</Label>
                  <Input 
                    id="address" 
                    value={vendorInfo.address}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Store Description</Label>
                  <Textarea 
                    id="description" 
                    value={vendorInfo.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Change Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter new password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>View your account details and status.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Account Type:</span>
                    <span className="text-sm">Vendor</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <span className="text-sm">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Member Since:</span>
                    <span className="text-sm">August 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Subscription Plan:</span>
                    <span className="text-sm">Premium</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Subscription Details</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Store Hours</CardTitle>
                <CardDescription>Set your store's operational hours.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monday - Friday:</span>
                    <span className="text-sm">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Saturday:</span>
                    <span className="text-sm">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sunday:</span>
                    <span className="text-sm">10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Edit Store Hours</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ProfilePage;
