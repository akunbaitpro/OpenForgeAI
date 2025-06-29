
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the schema for the form
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  twitter: z.string().optional(), 
  telegram: z.string().optional(),
  projectName: z.string().optional(),
  useCases: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one option",
  }),
  otherUseCase: z.string().optional(),
  projectDescription: z.string().min(1, { message: "Please tell us about your project and motivation" }),
});

type FormValues = z.infer<typeof formSchema>;

// Define the use case options
const useCaseOptions = [
  { id: "ai-agent", label: "AI agent integration" },
  { id: "trading", label: "Trading / bots" },
  { id: "personal", label: "Personal" },
  { id: "embedding", label: "Product embedding" },
  { id: "other", label: "Other (please specify below)" },
];

interface EmailFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailFormDialog({ open, onOpenChange }: EmailFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      twitter: "",
      telegram: "",
      projectName: "",
      useCases: [],
      otherUseCase: "",
      projectDescription: "",
    },
  });

  // Watch the "other" option to conditionally show the other use case input
  const selectedUseCases = form.watch("useCases");
  const isOtherSelected = selectedUseCases && selectedUseCases.includes("other");

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    console.log("Submitting form data to Google Apps Script:", values);
    
    // Prepare the use cases and handle the "other" case if selected
    const useCases = values.useCases.filter(useCase => useCase !== "other");

    const formData = {
      email: values.email,
      twitter: values.twitter,
      telegram: values.telegram,
      projectName: values.projectName,
      useCases: useCases,
      useCaseOtherText: values.otherUseCase,
      description: values.projectDescription
    }
    
    // Submit form to the correct Google Apps Script endpoint
    fetch("https://app.itsgloria.ai/api/join-whitelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      toast({
        title: "Thank you for joining our waitlist!",
        description: "We'll review your submission and be in touch soon.",
      });
      form.reset();
      onOpenChange(false);
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your email. Please try again.",
        variant: "destructive",
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gloria-dark border-gloria-primary/20 max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh] overflow-auto">
          <div className="p-6 pt-3">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-gloria-light text-center text-3xl font-semibold mb-0">Tell Us About You</DialogTitle>
              <DialogDescription className="text-gloria-gray text-center text-lg mt-0">
                Request early access to curated insights and custom feeds.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr,2fr] gap-2 items-center">
                      <FormLabel className="text-gloria-light text-right font-medium mb-0">Email *</FormLabel>
                      <div className="space-y-1">
                        <FormControl>
                          <Input
                            className="bg-[#171B26] border-white/30 text-gloria-light max-w-[75%]"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </div>
                    </FormItem>
                  )}
                />
                
                {/* Twitter Handle Field */}
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr,2fr] gap-2 items-center">
                      <div className="text-right">
                        <FormLabel className="text-gloria-light font-medium mb-0">Twitter</FormLabel>
                        <div className="text-gloria-gray text-xs mt-0">optional</div>
                      </div>
                      <FormControl>
                        <Input
                          className="bg-[#171B26] border-white/30 text-gloria-light max-w-[75%]"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Telegram Handle Field */}
                <FormField
                  control={form.control}
                  name="telegram"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr,2fr] gap-2 items-center">
                      <div className="text-right">
                        <FormLabel className="text-gloria-light font-medium mb-0">Telegram</FormLabel>
                        <div className="text-gloria-gray text-xs mt-0">optional</div>
                      </div>
                      <FormControl>
                        <Input
                          className="bg-[#171B26] border-white/30 text-gloria-light max-w-[75%]"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Project Name Field */}
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr,2fr] gap-2 items-center">
                      <div className="text-right">
                        <FormLabel className="text-gloria-light font-medium mb-0">Project name</FormLabel>
                        <div className="text-gloria-gray text-xs mt-0">optional</div>
                      </div>
                      <FormControl>
                        <Input
                          className="bg-[#171B26] border-white/30 text-gloria-light max-w-[75%]"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Use Cases Field */}
                <FormField
                  control={form.control}
                  name="useCases"
                  render={() => (
                    <FormItem className="grid grid-cols-[1fr,2fr] gap-2 items-start">
                      <div className="text-right pt-1">
                        <FormLabel className="text-gloria-light font-medium mb-0">How will you use our news feed? *</FormLabel>
                      </div>
                      
                      <div className="space-y-2">
                        {useCaseOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="useCases"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        // Fix: Ensure field.value is always treated as an array
                                        const currentValues = Array.isArray(field.value) ? field.value : [];
                                        
                                        return checked
                                          ? field.onChange([...currentValues, option.id])
                                          : field.onChange(
                                              currentValues.filter(
                                                (value) => value !== option.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal text-gloria-light cursor-pointer select-none">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage className="text-red-400" />
                        
                        {/* Other Use Case Input (conditionally rendered) */}
                        {isOtherSelected && (
                          <FormField
                            control={form.control}
                            name="otherUseCase"
                            render={({ field }) => (
                              <FormItem className="ml-6">
                                <FormControl>
                                  <Input
                                    className="bg-[#171B26] border-white/30 text-gloria-light max-w-[75%]"
                                    placeholder=""
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                
                {/* Project Description Field */}
                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr,2fr] gap-2 items-start">
                      <div className="text-right pt-1">
                        <FormLabel className="text-gloria-light font-medium mb-0">Tell us about your project *</FormLabel>
                      </div>
                      <div className="space-y-1">
                        <FormControl>
                          <Textarea
                            className="bg-[#171B26] border-white/30 text-gloria-light resize-none min-h-28 max-w-[75%]"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </div>
                    </FormItem>
                  )}
                />
                
                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    size="nav"
                    className="bg-gloria-primary hover:bg-gloria-primary/90 text-gloria-light font-medium transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Join Waitlist"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
