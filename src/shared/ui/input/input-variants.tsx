import { tv, type VariantProps } from "tailwind-variants";
import Input from "./Input.module.css";

export const inputVariants = tv({
    base: "",
    variants: {
        variant: {
            text: "w-full rounded-xl bg-white p-4 placeholder:text-[#a2acb0] shadow-md",
            number: "w-full rounded-xl bg-white p-4 placeholder:text-[#a2acb0] shadow-md",
            date: "w-full rounded-xl bg-white p-4 placeholder:text-[#a2acb0] shadow-md",
            radio: `size-6 cursor-pointer appearance-none rounded-full border-2 border-black/5 ${Input.radio}`,
            checkbox: `size-6 cursor-pointer appearance-none rounded-full border-2 border-black/5 ${Input.radio}`,
            drag_and_drop: "w-full"
        }
    },
    defaultVariants: {
        variant: "text"
    }
});

export type InputVariants = VariantProps<typeof inputVariants>;
