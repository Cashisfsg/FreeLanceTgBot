import React, { useState } from "react";
import { inputVariants, InputVariants } from "../input-variants";

interface DragDropInputProps extends InputVariants {
    availableItems: string[];
    selectedItems: string[];
    onChange: (available: string[], selected: string[]) => void;
}

export const DragDropInput: React.FC<DragDropInputProps> = ({
    availableItems,
    selectedItems,
    onChange,
    className,
    ...props
}) => {
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        item: string
    ) => {
        setDraggedItem(item);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        targetColumn: "available" | "selected"
    ) => {
        e.preventDefault();
        if (draggedItem) {
            let newAvailable = [...availableItems];
            let newSelected = [...selectedItems];

            if (
                targetColumn === "available" &&
                selectedItems.includes(draggedItem)
            ) {
                newSelected = newSelected.filter(item => item !== draggedItem);
                newAvailable.push(draggedItem);
            } else if (
                targetColumn === "selected" &&
                availableItems.includes(draggedItem)
            ) {
                newAvailable = newAvailable.filter(
                    item => item !== draggedItem
                );
                newSelected.push(draggedItem);
            }

            onChange(newAvailable, newSelected);
        }
        setDraggedItem(null);
    };

    const renderSelectedItems = () => (
        <div
            className="mb-4 min-h-[124px] w-full rounded-lg rounded-xxl border-2 border-dashed border-white bg-white p-4"
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, "selected")}
        >
            <div className="flex flex-wrap gap-2">
                {selectedItems.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={e => handleDragStart(e, item)}
                        className="cursor-move rounded rounded-xxl border-2 border-accent bg-white p-4"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAvailableItems = () => (
        <div
            className="w-full p-4"
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, "available")}
        >
            <div className="flex flex-wrap gap-2">
                {availableItems.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={e => handleDragStart(e, item)}
                        className="cursor-move rounded-xxl bg-white p-4"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div
            className={inputVariants({ variant: "drag_and_drop", className })}
            {...props}
        >
            {renderSelectedItems()}
            {renderAvailableItems()}
        </div>
    );
};
