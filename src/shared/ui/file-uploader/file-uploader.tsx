import { useReducer, useRef } from "react";
import { cnBase } from "tailwind-variants";

import Clip from "@/assets/img/svg/clip.svg";
import Cross from "@/assets/img/svg/cross.svg";
import { buttonVariants } from "@/shared/ui/button";

import DocumentIcon from "@/assets/img/svg/document.svg";

interface Document {
    file: File;
    url: string;
}

type State = Document[];

type Action =
    | {
          type: "append";
          payload: File[];
      }
    | {
          type: "remove";
          payload: File;
      };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "append": {
            return [
                ...state,
                ...action.payload.map(document => ({
                    file: document,
                    url: URL.createObjectURL(document)
                }))
            ];
        }
        case "remove":
            return state.filter(document => {
                if (document.file !== action.payload) {
                    return true;
                } else {
                    URL.revokeObjectURL(document.url);
                    return false;
                }
            });

        default:
            return state;
    }
};

interface FileUploaderProps extends React.ComponentPropsWithoutRef<"div"> {
    fileTypes?: string;
    buttonText: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
    className,
    fileTypes,
    buttonText,
    ...props
}) => {
    const [fileList, dispatch] = useReducer(reducer, []);
    const dataTransfer = useRef(new DataTransfer());

    const onChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;
        const files = input.files;

        if (!files || files.length === 0) return;

        const newFiles = Array.from(files);

        [...fileList.map(file => file.file), ...newFiles].forEach(file =>
            dataTransfer.current.items.add(file)
        );
        input.files = dataTransfer.current.files;
        dispatch({ type: "append", payload: newFiles });
    };

    const removeFile = (file: File) => {
        dispatch({ type: "remove", payload: file });
    };

    return (
        <div
            className={cnBase(
                "group rounded-xl has-[ul]:bg-white has-[ul]:px-4 has-[ul]:shadow-md",
                className
            )}
            {...props}
        >
            {fileList.length !== 0 ? (
                <ul>
                    {fileList.map(document => (
                        <li
                            key={document.file.lastModified}
                            className="grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-4 gap-y-0.5 border-b border-black/15 py-3"
                        >
                            <img
                                src={
                                    document.file.type.startsWith("image")
                                        ? document.url
                                        : DocumentIcon
                                }
                                alt={document.file.name}
                                height="48"
                                width="48"
                                className={`row-span-2 size-12 rounded-lg object-center ${document.file.type.startsWith("image") ? "object-cover" : document.file.size > 10 * 1024 * 1024 ? "bg-[#f12e2e]/5 p-2.5" : "bg-[#4378ff]/10 p-2.5"}`}
                            />
                            <dl className="row-span-2 grid grid-rows-subgrid">
                                <dt className="self-end truncate text-base/tight">
                                    {document.file.name}
                                </dt>
                                <dd
                                    className={`self-start truncate text-sm/tight text-[#a2acb0] first-letter:uppercase ${document.file.size > 10 * 1024 * 1024 ? "text-[#E53935]" : ""}`}
                                >
                                    {document.file.size > 10 * 1024 * 1024
                                        ? "Maximum allowed file size of 10 MB exceeded."
                                        : document.file.type}
                                </dd>
                            </dl>
                            <button
                                type="button"
                                onClick={() => removeFile(document.file)}
                                className="row-span-2 flex size-6 items-center justify-center self-center"
                            >
                                <img
                                    src={Cross}
                                    alt="Cross"
                                    height="16"
                                    width="16"
                                />
                                <span className="sr-only">Delete file</span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
            <label className="gap-x-4.5 flex w-fit cursor-pointer items-center group-has-[ul]:py-3">
                {fileList.length !== 0 ? (
                    <>
                        <img
                            src={Clip}
                            alt="Clip"
                            height="16"
                            width="16"
                        />
                        <span className="text-base/6 text-[#007aff]">
                            Attach files
                        </span>
                    </>
                ) : (
                    <span
                        className={buttonVariants({
                            variant: "secondary",
                            size: "small",
                            className: "w-max rounded-full"
                        })}
                    >
                        {buttonText}
                    </span>
                )}
                <input
                    type="file"
                    name=""
                    accept={fileTypes}
                    multiple
                    hidden
                    onChange={onChangeHandler}
                />
            </label>
        </div>
    );
};
