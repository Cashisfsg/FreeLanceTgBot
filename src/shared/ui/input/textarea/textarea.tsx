import { cnBase } from "tailwind-variants";

import Textarea from "./Textarea.module.css";

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {}

export const TextArea: React.FC<TextAreaProps> = ({
    className,
    rows = 3,
    maxLength = 2048,
    ...props
}) => {
    return (
        <textarea
            rows={rows}
            maxLength={maxLength}
            className={cnBase(Textarea.textarea, className)}
            {...props}
        />
    );
};
