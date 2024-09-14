// import { useState } from "react";
// import { useState } from "react";
import { cnBase } from "tailwind-variants";

import { HeaderGroup } from "@/shared/ui/header-group";
import { Select } from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { TextArea } from "@/shared/ui/input/textarea";
import { FileUploader } from "@/shared/ui/file-uploader";

import { Question } from "../../api";
// import { DragDropInput } from "@/shared/ui/input/drag_and_drop/drag_and_drop";
import { OptionGroup } from "./option-group";
import { DragAndDrop } from "@/shared/ui/drag-and-drop";
import { Tooltip } from "@/shared/ui/tooltip";

import QuestionMark from "@/assets/img/svg/question-mark.svg";
import ArrowDown from "@/assets/img/svg/arrow-down.svg";

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
                            <p className="rounded-2xl border-2 border-dashed bg-white px-15 py-10 text-center text-[#a2acb0] shadow-md">
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
            question.question_type === "combobox" ? (
                <Select.Root name="select name">
                    <Select.Search>
                        <section>
                            <Select.Menu className="rounded-xl bg-white pl-4">
                                {question.options?.map(option => (
                                    <Select.Option
                                        key={option.option_id}
                                        value={option.option_key}
                                        label={option.option_text}
                                        className="group flex h-12 cursor-pointer select-none content-center items-center justify-between border-b py-2 pr-4 text-base/5.5"
                                    >
                                        <span>{option.option_text}</span>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="hidden group-aria-selected:block"
                                        >
                                            <path
                                                d="M6.17435 16C5.70054 16 5.2978 15.7902 4.96613 15.3706L0.364242 9.55074C0.233944 9.39263 0.139182 9.23755 0.0799556 9.08552C0.0266519 8.93349 0 8.77537 0 8.61117C0 8.24629 0.118453 7.94527 0.355358 7.7081C0.592264 7.47092 0.891357 7.35234 1.25264 7.35234C1.6613 7.35234 2.00481 7.53174 2.28318 7.89054L6.13881 12.9076L13.6635 0.665906C13.8175 0.422653 13.9774 0.252376 14.1433 0.155074C14.3091 0.0516914 14.5164 0 14.7651 0C15.1264 0 15.4225 0.115545 15.6535 0.346636C15.8845 0.577727 16 0.872672 16 1.23147C16 1.37742 15.9763 1.52338 15.9289 1.66933C15.8815 1.81528 15.8075 1.96731 15.7068 2.12543L7.39145 15.3341C7.10716 15.778 6.70146 16 6.17435 16Z"
                                                fill="#007AFF"
                                            />
                                        </svg>
                                    </Select.Option>
                                ))}
                            </Select.Menu>
                        </section>
                    </Select.Search>
                    <Select.Trigger className="group">
                        <img
                            src={ArrowDown}
                            alt="Arrow down"
                            width={12}
                            height={8}
                            className="h-2 w-3 max-w-none transition-transform duration-300 group-aria-expanded:rotate-180"
                        />
                    </Select.Trigger>
                </Select.Root>
            ) : question.options && question.options.length !== 0 ? (
                <OptionGroup
                    type={question.question_type}
                    name={question.question_key}
                    required={question?.is_required}
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
