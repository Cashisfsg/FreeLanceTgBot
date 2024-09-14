import { createContext, useContext } from "react";

export interface Option {
    label: string | number;
    value: string | number;
}

export const SelectContext = createContext<{
    optionsListId: string;
    inputRef: React.RefObject<HTMLInputElement>;
    defaultOptions: React.MutableRefObject<Option[]>;
    selectedOptions: Option[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
} | null>(null);

export const useSelectContext = () => {
    const context = useContext(SelectContext);

    if (!context) {
        throw new Error(
            "Component must be rendered as child of Select component"
        );
    }

    return context;
};
