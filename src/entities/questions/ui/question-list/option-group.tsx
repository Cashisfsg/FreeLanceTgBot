import { useState } from "react";

import { cnBase } from "tailwind-variants";
import type { QuestionType, Option } from "../../api";

import OptionStyles from "./Option.module.css";
import { OptionGroupItem } from "./option-group-item";
import { ProgressBar } from "@/shared/ui/progress-bar";

interface OptionGroupProps
    extends Omit<React.ComponentProps<"fieldset">, "children"> {
    options: Option[];
    type: QuestionType;
    name: string;
    required?: boolean;
}

export const OptionGroup: React.FC<OptionGroupProps> = ({
    className,
    options,
    type,
    name,
    required,
    ...props
}) => {
    if (type === "vertical_slider")
        return (
            <VerticalSlider
                className={className}
                options={options}
                name={name}
                required={required}
                {...props}
            />
        );

    return (
        <fieldset
            className={cnBase(OptionStyles.group, className)}
            {...props}
        >
            {options.map(option => (
                <OptionGroupItem
                    key={option.option_id}
                    type={type}
                    option={option}
                    name={name}
                    required={required}
                />
            ))}
        </fieldset>
    );
};

interface VerticalSliderProps
    extends React.ComponentPropsWithoutRef<"fieldset"> {
    options: Option[];
    name: string;
    required?: boolean;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
    className,
    options,
    name,
    required,
    ...props
}) => {
    const [currentOption, setCurrentOption] = useState<{
        value: number | undefined;
        label: string | undefined;
    }>({ value: undefined, label: undefined });

    const onChangeHandler = (value: number, label: string) => {
        setCurrentOption(option => ({ ...option, value, label }));
    };

    return (
        <fieldset
            className={cnBase(OptionStyles["progress-bar"], className)}
            {...props}
        >
            <ProgressBar
                orientation="vertical"
                min={1}
                max={options.length}
                step={1}
                value={currentOption.value}
                valueText={currentOption.label}
                height={options.length * 48 - 22}
            />
            <div>
                {options.map(option => (
                    <OptionGroupItem
                        key={option.option_id}
                        type={"vertical_slider"}
                        option={option}
                        name={name}
                        required={required}
                        onChange={() =>
                            onChangeHandler(
                                option.display_order,
                                option.option_text
                            )
                        }
                        className="text-base/5.5"
                    />
                ))}
            </div>
        </fieldset>
    );
};
