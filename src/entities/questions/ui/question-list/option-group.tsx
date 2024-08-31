import { cnBase } from "tailwind-variants";
import type { QuestionType, Option } from "../../api";

import OptionStyles from "./Option.module.css";
import { OptionGroupItem } from "./option-group-item";

interface OptionGroupProps
    extends Omit<React.ComponentProps<"fieldset">, "children"> {
    options: Option[];
    type: QuestionType;
}

export const OptionGroup: React.FC<OptionGroupProps> = ({
    className,
    options,
    type,
    ...props
}) => {
    return (
        <fieldset
            className={cnBase(OptionStyles.group, className)}
            {...props}
        >
            {options.map(option => (
                <OptionGroupItem
                    type={type}
                    option={option}
                />
            ))}
        </fieldset>
    );
};
