import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-10 w-10",
      icon: "h-10 w-10",
    },
    defaultVariants: {
      size: "default",
    },
  },
});

interface SpinnerPorps extends VariantProps<typeof spinnerVariants> {}
export const Spinner = ({ size }: SpinnerPorps) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};
