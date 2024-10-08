import { createContext, useContext } from "react";
import { Action } from "./select";

export const SelectContext = createContext<{
    name?: string;
    multiple: boolean;
    triggerId: string;
    dispatch: React.Dispatch<Action>;
    selectMenuId: string;
    triggerRef: React.RefObject<HTMLButtonElement>;
    menuRef: React.RefObject<HTMLUListElement>;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
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
