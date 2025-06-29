
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FeedRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  twitter: z.string().optional(),
  projectName: z.string().optional(),
  useCase: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const FeedRequestDialog: React.FC<FeedRequestDialogProps> = ({ open, onOpenChange }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      twitter: "",
      projectName: "",
      useCase: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    
    // Create URLSearchParams object for form submission
    const formData = new URLSearchParams();
    
    // Add form fields
    formData.append("entry.215385148", data.email); // Email
    formData.append("entry.114907103", data.twitter || ''); // Twitter
    formData.append("entry.2135144926", data.projectName || ''); // Project name
    formData.append("entry.957691237", data.useCase || ''); // Use case info
    
    // Submit form to Google
    fetch("https://docs.google.com/forms/d/e/1FAIpQLSehU86EVMzA1GiHRhGeuzxEj5fBX3ZlLc4PGcolBms7sAJ68g/formResponse", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData
    })
    .then(() => {
      toast({
        title: "Request submitted",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      });
      
      form.reset();
      onOpenChange(false);
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gloria-dark border-gloria-dark-accent/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Request Custom Feed</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email address*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your@email.com" 
                      className="bg-black border-gray-700 max-w-[90%]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Twitter handle (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="@username" 
                      className="bg-black border-gray-700 max-w-[90%]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Project name (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your project" 
                      className="bg-black border-gray-700 max-w-[90%]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">How do you plan to use the news feed? (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your use case" 
                      className="bg-black border-gray-700 resize-none max-w-[90%]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button type="submit" className="w-full">Join Waitlist</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedRequestDialog;
