import { Input } from "@/shared/ui/input";
import type { QuestionType, Option } from "../../api";

interface OptionGroupItemProps extends React.ComponentProps<"label"> {
    type: QuestionType;
    option: Option;
}

export const OptionGroupItem: React.FC<OptionGroupItemProps> = ({
    type,
    option,
    ...props
}) => {
    return (
        <label
            key={option.option_id}
            {...props}
        >
            <Input
                variant={type}
                name="name"
            />
            {option.subtitle ? (
                <dl>
                    <dt>{option.option_text}</dt>
                    <dd>{option.subtitle}</dd>
                </dl>
            ) : (
                <span>{option.option_text}</span>
            )}
        </label>
    );
};
