'use client';

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        default: "h-[24px] w-[44px]", // Default size
        sm: "h-[20px] w-[36px]", // Small size
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", // Default thumb size and translation
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0", // Small thumb size and translation
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);


export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}


const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps // Use the extended interface
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ size }), className)} // Apply root variants
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(thumbVariants({ size }))} // Apply thumb variants based on the same size prop
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch };
