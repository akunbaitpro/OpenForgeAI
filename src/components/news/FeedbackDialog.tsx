
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feedbackText: string;
  onFeedbackTextChange: (text: string) => void;
  onSubmit: () => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  open,
  onOpenChange,
  feedbackText,
  onFeedbackTextChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Provide Feedback</DialogTitle>
          <DialogDescription className="text-gray-400">
            What's wrong with this content? Your feedback helps us improve.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Please describe why this content wasn't helpful..."
          className="bg-black border-gray-700 min-h-[100px]"
          value={feedbackText}
          onChange={(e) => onFeedbackTextChange(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
