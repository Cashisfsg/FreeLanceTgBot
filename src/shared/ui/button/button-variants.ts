import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
    base: "rounded-lg px-4 py-3.5 text-base/snug font-semibold -tracking-wide",
    variants: {
        variant: {
            primary: "bg-[#007AFF] text-white",
            secondary: "bg-[#4378FF]/10 text-[#007AFF]"
        }
    },
    defaultVariants: {
        variant: "primary"
    }
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
