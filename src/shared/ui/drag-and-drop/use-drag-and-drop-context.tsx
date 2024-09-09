import { createContext, RefObject, useContext } from "react";

export interface Option {
    id: string;
    label: string;
    value: string | number;
}

export const DragAndDropContext = createContext<{
    draggableOption: RefObject<Option>;
    menuRef: RefObject<HTMLUListElement>;
} | null>(null);

export const useDragAndDropContext = () => {
    const context = useContext(DragAndDropContext);

    if (!context) {
        throw new Error(
            "Component must be rendered as child of DragAndDrop component"
        );
    }

    return context;
};
