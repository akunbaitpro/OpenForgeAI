
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [avatarSrc, setAvatarSrc] = useState<string>("/lovable-uploads/a472f503-75e8-4dfe-8a42-36ab9c61247c.png");
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  // Array of predefined avatar options
  const avatarOptions = [
    "/lovable-uploads/a472f503-75e8-4dfe-8a42-36ab9c61247c.png",
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=250&h=250&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=250&h=250&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=250&h=250&fit=crop"
  ];

  const handleAvatarChange = (newSrc: string) => {
    setAvatarSrc(newSrc);
    setOpenDialog(false);
    toast({
      title: "Profile updated",
      description: "Your profile picture has been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="bg-gloria-dark-accent/10 rounded-lg p-8 mb-8">
        <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Current avatar */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-32 h-32 border-2 border-white/10">
              <AvatarImage src={avatarSrc} alt="Profile" />
              <AvatarFallback><User size={64} /></AvatarFallback>
            </Avatar>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Camera size={16} />
                  <span>Change Photo</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gloria-dark border border-gloria-dark-accent/50 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl mb-4">Select Profile Picture</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {avatarOptions.map((src, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleAvatarChange(src)}
                      className="cursor-pointer transition-all duration-200 hover:scale-105"
                    >
                      <Avatar className="w-20 h-20 mx-auto border-2 border-transparent hover:border-blue-500">
                        <AvatarImage src={src} alt={`Avatar option ${index + 1}`} />
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-gloria-dark-accent/20 pt-4">
                  <p className="text-sm text-gray-400 mb-2">
                    Custom upload feature coming soon
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Display Name</label>
              <input 
                type="text" 
                className="w-full bg-gloria-dark-accent/20 border border-gloria-dark-accent/30 rounded px-4 py-2 text-white" 
                placeholder="Your Name" 
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-gloria-dark-accent/20 border border-gloria-dark-accent/30 rounded px-4 py-2 text-white"
                placeholder="your.email@example.com" 
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gloria-dark-accent/10 rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-6">Preferences</h2>
        <p className="text-gray-400">
          Additional preferences and settings will be available soon.
        </p>
      </div>
    </div>
  );
};

export default Settings;
