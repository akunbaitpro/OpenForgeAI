
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const PASSWORD = "cb123";
const LOCAL_STORAGE_KEY = "dashboard_auth";

interface PasswordProtectorProps {
  children: React.ReactNode;
}

const PasswordProtector: React.FC<PasswordProtectorProps> = ({ children }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // Check if already authenticated via localStorage
    const storedAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === PASSWORD) {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to the dashboard",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gloria-dark">
        <p className="text-white text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gloria-dark">
        <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Dashboard Access</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Access Dashboard
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PasswordProtector;
