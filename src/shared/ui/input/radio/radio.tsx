import { cnBase } from "tailwind-variants";

import styles from "./Radio.module.css";

interface RadioProps
    extends Omit<React.ComponentPropsWithoutRef<"input">, "type"> {}

export const Radio: React.FC<RadioProps> = ({ className, ...props }) => {
    return (
        <input
            type="radio"
            className={cnBase(
                "size-6 cursor-pointer appearance-none rounded-full border-2 border-black/5",
                styles.radio,
                className
            )}
            {...props}
        />
    );
};
