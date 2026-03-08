import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#1A62FF] text-white hover:bg-[#034AE8] active:bg-[#043CB9] focus-visible:ring-[#1A62FF]",
        secondary:
          "bg-white text-[#1A62FF] hover:bg-[#CDE0FF] active:bg-[#A0C3FF] focus-visible:ring-[#1A62FF]",
        outline:
          "bg-white text-[#1A62FF] border-2 border-[#1A62FF] hover:bg-[#CDE0FF] active:bg-[#A0C3FF] focus-visible:ring-[#1A62FF]",
        toggle:
          "bg-white text-[#1A62FF] hover:bg-[#CDE0FF] active:bg-[#A0C3FF] focus-visible:ring-[#1A62FF]",
        ghost:
          "bg-transparent text-[#171717] hover:bg-[rgba(23,23,23,0.1)] active:bg-[rgba(23,23,23,0.2)] focus-visible:ring-[#171717]",
        destructive:
          "bg-[#EF4444] text-white hover:bg-[#dc2626] active:bg-[#b91c1c] focus-visible:ring-[#EF4444]",
        "danger-secondary":
          "bg-white text-[#EF4444] hover:bg-[rgba(255,0,0,0.1)] active:bg-[rgba(255,0,0,0.2)] focus-visible:ring-[#EF4444]",
        link: "text-[#1A62FF] underline-offset-4 hover:underline focus-visible:ring-[#1A62FF]",
      },
      size: {
        default: "h-10 px-2 gap-2 text-button-lg [&_svg]:size-6",
        sm: "h-8 px-2 gap-1 text-button-sm [&_svg]:size-4",
        icon: "h-10 w-10 [&_svg]:size-6",
        "icon-sm": "h-8 w-8 [&_svg]:size-4",
        xs: "h-7 px-2 gap-1 text-button-sm [&_svg]:size-4",
        lg: "h-10 px-2 gap-2 text-button-lg [&_svg]:size-6",
        "icon-lg": "h-10 w-10 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
