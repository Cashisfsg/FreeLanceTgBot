import { createContext, useContext } from "react";

export const SelectContext = createContext<{
    triggerId: string;
    selectMenuId: string;
    triggerRef: React.RefObject<HTMLButtonElement>;
    menuRef: React.RefObject<HTMLUListElement>;
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
