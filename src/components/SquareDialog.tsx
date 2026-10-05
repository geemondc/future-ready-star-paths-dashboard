import { Square } from "@/data/squares";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

interface SquareDialogProps {
  square: Square | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SquareDialog({ square, open, onOpenChange }: SquareDialogProps) {
  if (!square) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg text-foreground">
            <span className="text-primary mr-2">#{square.id}</span>
            {square.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            {square.description}
          </DialogDescription>
        </DialogHeader>
        <a
          href={square.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-2 rounded-md bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <ExternalLink size={16} />
          Visit {square.name}
        </a>
      </DialogContent>
    </Dialog>
  );
}
