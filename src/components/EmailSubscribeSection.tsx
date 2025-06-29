import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  projectName: z.string().optional(),
  useCases: z.array(z.string()).refine(value => value.length > 0, {
    message: "Please select at least one option"
  }),
  otherUseCase: z.string().optional(),
  projectDescription: z.string().min(1, {
    message: "Please tell us about your project and motivation"
  })
});
type FormValues = z.infer<typeof formSchema>;

// Define the use case options
const useCaseOptions = [{
  id: "ai-agent",
  label: "AI agent integration"
}, {
  id: "trading",
  label: "Trading / bots"
}, {
  id: "personal",
  label: "Personal"
}, {
  id: "embedding",
  label: "Product embedding"
}, {
  id: "other",
  label: "Other (please specify below)"
}];
const EmailSubscribeSection = () => {
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
      projectDescription: ""
    }
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
    };

    // Submit form to the correct Google Apps Script endpoint
    fetch("https://app.itsgloria.ai/api/join-whitelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(() => {
      toast({
        title: "Thank you for joining our waitlist!",
        description: "We'll review your submission and be in touch soon."
      });
      form.reset();
    }).catch(error => {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your email. Please try again.",
        variant: "destructive"
      });
    }).finally(() => {
      setIsSubmitting(false);
    });
  }
  return;
};
export default EmailSubscribeSection;