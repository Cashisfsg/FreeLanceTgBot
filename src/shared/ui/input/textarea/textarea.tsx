import { cnBase } from "tailwind-variants";

import Textarea from "./Textarea.module.css";

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {}

export const TextArea: React.FC<TextAreaProps> = ({
    className,
    rows,
    maxLength,
    ...props
}) => {
    return (
        <textarea
            rows={rows || 3}
            maxLength={maxLength || 2048}
            className={cnBase(
                "w-full resize-none rounded-xl bg-white p-4 shadow-md placeholder:text-[#a2acb0]",
                Textarea.textarea,
                className
            )}
            {...props}
        />
    );
};
