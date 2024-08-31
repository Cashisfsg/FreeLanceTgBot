import { inputVariants, type InputVariants } from "./input-variants";

interface InputProps
    extends Omit<React.ComponentPropsWithoutRef<"input">, "type">,
        InputVariants {}

export const Input: React.FC<InputProps> = ({
    className,
    variant,
    ...props
}) => {
    return (
        <input
            type={variant}
            className={inputVariants({ variant, className })}
            {...props}
        />
    );
};
