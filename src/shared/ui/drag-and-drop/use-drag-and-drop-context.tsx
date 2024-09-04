import { createContext, RefObject, useContext } from "react";

interface Option {
    label: string;
    value: string | number;
    // element: React.RefObject<HTMLLIElement>;
}

export const DragAndDropContext = createContext<{
    draggableOption: RefObject<Option>;
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
