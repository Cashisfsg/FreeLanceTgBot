import { buttonVariants, type ButtonVariants } from "./button-variants";

interface ButtonProps
    extends React.ComponentPropsWithoutRef<"button">,
        ButtonVariants {}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant,
    size,
    ...props
}) => {
    return (
        <button
            className={buttonVariants({ variant, size, className })}
            {...props}
        />
    );
};
