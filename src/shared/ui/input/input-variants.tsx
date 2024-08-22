import { tv, type VariantProps } from "tailwind-variants";

import Input from "./Input.module.css";

export const inputVariants = tv({
    base: "",
    variants: {
        variant: {
            text: "rounded-xl bg-white px-4 py-3.5 placeholder:text-[#a2acb0]",
            radio: `size-6 cursor-pointer appearance-none rounded-full border-2 border-black/5 transition-colors duration-150 checked:border-[#007aff] checked:bg-[#007aff] ${Input.checkbox}`,
            checkbox: `size-6 cursor-pointer appearance-none rounded-full border-2 border-black/5 transition-colors duration-150 checked:border-[#007aff] checked:bg-[#007aff] ${Input.checkbox}`
        }
    },
    defaultVariants: {
        variant: "text"
    }
});

export type InputVariants = VariantProps<typeof inputVariants>;
