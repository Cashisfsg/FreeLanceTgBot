// import { useState } from "react";
// import { useState } from "react";
import { cnBase } from "tailwind-variants";

import { HeaderGroup } from "@/shared/ui/header-group";
import { Input } from "@/shared/ui/input";
import { TextArea } from "@/shared/ui/input/textarea";
import { FileUploader } from "@/shared/ui/file-uploader";

import { Question } from "../../api";
// import { DragDropInput } from "@/shared/ui/input/drag_and_drop/drag_and_drop";
import { OptionGroup } from "./option-group";

interface QuestionListItemProps
    extends React.ComponentPropsWithoutRef<"section"> {
    question: Question;
}

export const QuestionListItem: React.FC<QuestionListItemProps> = ({
    question,
    className,
    ...props
}) => {
    return (
        <section
            className={cnBase("space-y-8", className)}
            {...props}
        >
            <header>
                <HeaderGroup.Root>
                    <HeaderGroup.Title as="h2">
                        {question.question_text}
                    </HeaderGroup.Title>
                    <HeaderGroup.SubTitle>
                        {question.question_description}
                    </HeaderGroup.SubTitle>
                </HeaderGroup.Root>
            </header>

            {question.question_type === "drag_and_drop" ? (
                <></>
            ) : // <DragDropInput
            //     availableItems={availableItems}
            //     selectedItems={selectedItems}
            //     onChange={handleDragDropChange}
            // />
            question.options.length !== 0 ? (
                <OptionGroup
                    type={question.question_type}
                    options={question.options}
                />
            ) : null}

            {question.has_text_input ? (
                <fieldset className="space-y-2.5">
                    <label
                        htmlFor={`question-${question.question_id}`}
                        className="block text-xl/tight font-bold"
                    >
                        {question?.text_input_description}
                    </label>
                    {question?.text_input_type === "textarea" ? (
                        <TextArea
                            id={`question-${question.question_id}`}
                            placeholder={question?.text_input_placeholder}
                        />
                    ) : (
                        <Input
                            id={`question-${question.question_id}`}
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
