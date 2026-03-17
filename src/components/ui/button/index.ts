import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-control transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500",
        primary:
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500",
        // Navigation/tab-style button: blue text on white background
        // Used for inactive nav items (Explore / Collections / Info)
        nav:
          "border-2 border-transparent bg-white text-[var(--ct-primary-500)] hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500",
        // Active nav item: 2px primary outline, blue text
        navActive:
          "border-2 border-primary-500 bg-transparent text-[var(--ct-primary-500)] hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500",
        secondary:
          "border border-primary-500 bg-white text-[var(--ct-primary-500)] hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500",
        outline:
          "border border-primary-500 bg-white text-[var(--ct-primary-500)] hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500",
        outlined:
          "border border-primary-500 bg-white text-[var(--ct-primary-500)] hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500",
        toggle:
          "bg-white text-[var(--ct-primary-500)] hover:bg-primary-100 active:bg-primary-200 focus-visible:ring-2 focus-visible:ring-primary-500",
        ghost:
          "bg-transparent text-neutral-900 hover:bg-neutral-900/10 active:bg-neutral-900/20 focus-visible:ring-2 focus-visible:ring-neutral-900",
        destructive:
          "bg-error text-white hover:bg-[#dc3d3d] active:bg-[#c83333] focus-visible:ring-2 focus-visible:ring-error",
        danger:
          "bg-error text-white hover:bg-[#dc3d3d] active:bg-[#c83333] focus-visible:ring-2 focus-visible:ring-error",
        dangerSecondary:
          "bg-white text-error hover:bg-[rgba(255,0,0,0.10)] active:bg-[rgba(255,0,0,0.20)] focus-visible:ring-2 focus-visible:ring-error",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-2 text-sm font-semibold [&_svg]:size-6",
        xs: "h-8 gap-1 px-2 text-xs font-semibold [&_svg]:size-4",
        sm: "h-8 gap-1 px-2 text-sm font-semibold [&_svg]:size-4",
        lg: "h-10 gap-2 px-2 text-sm font-semibold [&_svg]:size-6",
        icon: "h-10 w-10 p-2 [&_svg]:size-6",
        "icon-sm": "h-8 w-8 p-2 [&_svg]:size-4",
        "icon-lg": "h-10 w-10 p-2 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
