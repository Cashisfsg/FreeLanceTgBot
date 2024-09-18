import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
    base: "inline-block min-w-20 truncate rounded-full px-1.5 py-0.5 text-center select-none text-xs font-semibold -tracking-wider",
    variants: {
        variant: {
            primary: "bg-[#007aff] text-white",
            secondary: "bg-[#4378ff]/10 text-[#007aff]"
        }
    },
    defaultVariants: {
        variant: "primary"
    }
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
