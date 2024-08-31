import { tv, type VariantProps } from "tailwind-variants";

export const headerGroupVariants = tv({
    variants: {
        variant: {
            primary: {
                group: "space-y-4 text-pretty",
                title: "text-4xl/tight font-semibold",
                subtitle: ""
            },
            secondary: {
                group: "space-y-2",
                title: "text-xl/tight font-bold",
                subtitle: ""
            }
        }
    },
    slots: {
        group: "",
        title: "",
        subtitle: "text-[#707579] tracking-tight text-lg/6"
    },
    defaultVariants: {
        variant: "primary"
    }
});

export type HeaderGroupVariants = VariantProps<typeof headerGroupVariants>;
