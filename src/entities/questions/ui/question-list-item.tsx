import { cnBase } from "tailwind-variants";

import { HeaderGroup } from "@/shared/ui/header-group";
import { OptionGroup } from "@/shared/ui/option-group";
import { Input } from "@/shared/ui/input";
import { TextArea } from "@/shared/ui/input/textarea";
import { FileUploader } from "@/shared/ui/file-uploader";

import { Question } from "../../api";
import { DragDropInput } from "@/shared/ui/input/drag_and_drop/drag_and_drop";
import { useState } from "react";

interface QuestionListItemProps
    extends React.ComponentPropsWithoutRef<"section"> {
    question: Question;
}

export const QuestionListItem: React.FC<QuestionListItemProps> = ({
    question,
    className,
    ...props
}) => {
    const [availableItems, setAvailableItems] = useState(
        question.options.map(option => option.text)
    );
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleDragDropChange = (
        newAvailable: string[],
        newSelected: string[]
    ) => {
        setAvailableItems(newAvailable);
        setSelectedItems(newSelected);
        // Here you would typically update the question's answer in your form state
    };

    return (
        <section
            className={cnBase("space-y-8", className)}
            {...props}
        >
            <header>
                {/* <HeaderGroup.Root>
                    <HeaderGroup.Title as="h2">
                        {question.text}
                    </HeaderGroup.Title>
                    <HeaderGroup.SubTitle>
                        {question.description}
                    </HeaderGroup.SubTitle>
                </HeaderGroup.Root> */}
                <h2>{question.text}</h2>
                <p>{question.description}</p>
            </header>
            {question.type === "drag_and_drop" ? (
                <DragDropInput
                    availableItems={availableItems}
                    selectedItems={selectedItems}
                    onChange={handleDragDropChange}
                />
            ) : question.options.length !== 0 ? (
                <OptionGroup>
                    {question.options.map(option => (
                        <label key={option.id}>
                            <Input
                                variant={question.type?.toLowerCase()}
                                name="name"
                            />
                            {option.subtitle ? (
                                <dl>
                                    <dt>{option.text}</dt>
                                    <dd>{option.subtitle}</dd>
                                </dl>
                            ) : (
                                <p>{option.text}</p>
                            )}
                        </label>
                    ))}
                </OptionGroup>
            ) : null}
            {question.has_text_input ? (
                <fieldset className="space-y-2.5">
                    <label
                        htmlFor={`question-${question.id}`}
                        className="block text-xl/tight font-bold"
                    >
                        {question?.text_input_description}
                    </label>
                    {question?.text_input_type === "textarea" ? (
                        <TextArea
                            id={`question-${question.id}`}
                            placeholder={question?.text_input_placeholder}
                        />
                    ) : (
                        <Input
                            id={`question-${question.id}`}
                            variant={question?.text_input_type}
                            placeholder={question?.text_input_placeholder}
                        />
                    )}
                    {question?.has_file_input ? <FileUploader /> : null}
                </fieldset>
            ) : null}
        </section>
    );
};
