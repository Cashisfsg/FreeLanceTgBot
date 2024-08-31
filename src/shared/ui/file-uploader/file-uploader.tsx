import { useReducer } from "react";

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
            action.payload.forEach(file => console.log(file.type));

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

export const FileUploader = () => {
    const [fileList, dispatch] = useReducer(reducer, []);

    const onChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const files = event.target.files;

        if (!files || files.length === 0) return;

        dispatch({ type: "append", payload: Array.from(files) });
    };

    const removeFile = (file: File) => {
        dispatch({ type: "remove", payload: file });
    };

    return (
        <>
            {fileList.length !== 0 ? (
                <ul className="rounded-xl bg-white">
                    {fileList.map(document => (
                        <li
                            key={document.file.lastModified}
                            className="grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-4 gap-y-0.5 border-b border-black/15 px-4 py-3"
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
                                className={`row-span-2 size-12 rounded-lg object-center ${document.file.type.startsWith("image") ? "object-cover" : "bg-[#4378ff]/10 p-2.5"}`}
                            />
                            <dl className="row-span-2 grid grid-rows-subgrid">
                                <dt className="self-end truncate text-base/tight">
                                    {document.file.name}
                                </dt>
                                <dd className="self-start truncate text-sm/tight text-[#a2acb0]">
                                    {document.file.type.startsWith("image")
                                        ? "Image"
                                        : "PDF Document"}
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
                    <li></li>
                </ul>
            ) : null}
            <label className="flex cursor-pointer items-center gap-x-4.5 px-4 py-3">
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
                        Or upload files
                    </span>
                )}
                <input
                    type="file"
                    name=""
                    accept="image/*, application/pdf"
                    multiple
                    hidden
                    onChange={onChangeHandler}
                />
            </label>
        </>
    );
};
