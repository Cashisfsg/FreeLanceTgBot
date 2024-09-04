import { DragAndDrop } from "@/shared/ui/drag-and-drop";
import { Tooltip } from "@/shared/ui/tooltip";

import QuestionMark from "@/assets/img/svg/question-mark.svg";

const options = [
    { label: "Payments", value: "" },
    { label: "Referral system", value: "" },
    { label: "Physical Item Sales", value: "" },
    { label: "User Mailing", value: "" },
    { label: "Admin Panel", value: "" },
    { label: "Internationalization", value: "" }
];

export const ApplicationFunctionalityPage = () => {
    return (
        <>
            Application functionality
            <DragAndDrop.Root>
                <DragAndDrop.DropArea
                    renderItems={option => (
                        <li
                            key={option.label}
                            className="select-none rounded-3xl border-2 border-[#007aff] bg-white p-4 font-semibold shadow-md"
                        >
                            {option.label}
                        </li>
                    )}
                    className="flex min-h-32 flex-wrap items-start gap-4 rounded-2xl border-2 border-dashed bg-white p-4 shadow-md"
                />
                <DragAndDrop.OptionList className="mt-6 flex flex-wrap justify-center gap-4">
                    {options.map(option => (
                        <DragAndDrop.Option
                            key={option.label}
                            label={option.label}
                            value={option.value}
                            // onDragStart={event => {
                            //     event.currentTarget.classList.replace(
                            //         "cursor-grab",
                            //         "cursor-grabbing"
                            //     );
                            // }}
                            className="relative cursor-grab select-none rounded-3xl border-2 border-[#007aff] bg-white p-4 font-semibold shadow-md aria-selected:bg-black/5 aria-selected:bg-red-500"
                        >
                            <span>{option.label}</span>
                            <Tooltip.Root>
                                <Tooltip.Trigger
                                    style={{
                                        "--tooltip-trigger": `--trigger-${option.label.replace(" ", "-")}`
                                    }}
                                    className="absolute -right-2.5 -top-2.5 flex size-7 items-center justify-center rounded-full bg-inherit p-1"
                                >
                                    <img
                                        src={QuestionMark}
                                        alt="Question mark"
                                        // className="inline"
                                    />
                                    <span className="sr-only">Hint</span>
                                </Tooltip.Trigger>

                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        style={{
                                            "--tooltip-trigger": `--trigger-${option.label.replace(" ", "-")}`
                                        }}
                                        className="text-pretty rounded-xl bg-black/85 p-2.5 text-center text-sm -tracking-wider text-white"
                                    >
                                        All digital goods/services must be sold
                                        using Telegram Stars
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </DragAndDrop.Option>
                    ))}
                </DragAndDrop.OptionList>
            </DragAndDrop.Root>
        </>
    );
};
