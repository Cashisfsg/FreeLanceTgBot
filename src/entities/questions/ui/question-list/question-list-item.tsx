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
import { DragAndDrop } from "@/shared/ui/drag-and-drop";
import { Tooltip } from "@/shared/ui/tooltip";

import QuestionMark from "@/assets/img/svg/question-mark.svg";

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
                <DragAndDrop.Root>
                    <DragAndDrop.DropArea
                        placeholder={
                            <p className="px-15 rounded-2xl border-2 border-dashed bg-white py-10 text-center text-[#a2acb0] shadow-md">
                                Drag and drop features that you like here
                            </p>
                        }
                        renderOptions={options => (
                            <ul className="flex min-h-32 flex-wrap items-start gap-4 rounded-2xl border-2 border-dashed bg-white p-4 shadow-md">
                                {options.map(option => (
                                    <li
                                        key={option.label}
                                        className="select-none rounded-3xl border-2 border-[#007aff] bg-white p-4 font-semibold shadow-md"
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    />
                    <DragAndDrop.OptionList className="mt-6 flex flex-wrap justify-center gap-4">
                        {question?.options ? (
                            question?.options.map(option => (
                                <DragAndDrop.Option
                                    key={option.option_id}
                                    label={option.option_text}
                                    value={option.option_key}
                                    // onDragStart={event => {
                                    //     event.currentTarget.classList.replace(
                                    //         "cursor-grab",
                                    //         "cursor-grabbing"
                                    //     );
                                    // }}
                                    className="group relative cursor-grab select-none rounded-3xl border-2 border-[#007aff] bg-white p-4 font-semibold shadow-md aria-selected:pointer-events-none aria-selected:border-transparent aria-selected:bg-black/5 aria-selected:text-transparent"
                                >
                                    <span>{option.option_text}</span>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger className="absolute -right-2.5 -top-2.5 flex size-7 items-center justify-center rounded-full bg-inherit p-1 group-aria-selected:hidden">
                                            <img
                                                src={QuestionMark}
                                                alt="Question mark"
                                                // className="inline"
                                            />
                                            <span className="sr-only">
                                                Hint
                                            </span>
                                        </Tooltip.Trigger>

                                        <Tooltip.Portal>
                                            <Tooltip.Content className="text-pretty rounded-xl bg-black/85 p-2.5 text-center text-sm -tracking-wider text-white">
                                                {option.hint}
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </DragAndDrop.Option>
                            ))
                        ) : (
                            <></>
                        )}
                    </DragAndDrop.OptionList>
                </DragAndDrop.Root>
            ) : // <DragDropInput
            //     availableItems={availableItems}
            //     selectedItems={selectedItems}
            //     onChange={handleDragDropChange}
            // />
            question.options && question.options.length !== 0 ? (
                <OptionGroup
                    type={question.question_type}
                    options={question.options}
                />
            ) : null}

            {question.text_input ? (
                <fieldset className="space-y-2.5">
                    <label
                        htmlFor={`question-${question.question_id}`}
                        className="block text-xl/tight font-bold"
                    >
                        {question?.text_input.description}
                    </label>
                    {question?.text_input.type === "textarea" ? (
                        <TextArea
                            id={`question-${question.question_id}`}
                            name={question?.question_key}
                            required={question?.is_required}
                            placeholder={question?.text_input.placeholder}
                        />
                    ) : (
                        <Input
                            id={`question-${question.question_id}`}
                            name={question?.question_key}
                            required={question?.is_required}
                            placeholder={question?.text_input.placeholder}
                            variant={question?.text_input.type}
                        />
                    )}
                    {question?.file_input ? (
                        <FileUploader
                            fileTypes={question.file_input.types}
                            buttonText={question.file_input.button_text}
                        />
                    ) : null}
                </fieldset>
            ) : null}
        </section>
    );
};
