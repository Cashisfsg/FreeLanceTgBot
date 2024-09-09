import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
    base: "w-full inline-block text-base/5.5 text-balance rounded-xl font-semibold tracking-tight",
    variants: {
        variant: {
            primary: "bg-[#007aff] text-white",
            secondary: "bg-[#4378ff]/10 text-[#007aff]"
        },
        size: {
            small: "px-3 py-2",
            base: "px-4 py-3.5"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "base"
    }
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
