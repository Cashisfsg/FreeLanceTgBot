import React from "react";
import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

import {
    DragAndDropContext,
    useDragAndDropContext
} from "./use-drag-and-drop-context";

interface Option {
    label: string;
    value: string | number;
    // element: React.RefObject<HTMLLIElement>;
}

interface RootProps extends React.ComponentPropsWithoutRef<"section"> {}

export const Root: React.FC<RootProps> = ({ children, ...props }) => {
    const draggableOption = React.useRef<Option>(null);

    return (
        <DragAndDropContext.Provider
            value={{
                draggableOption
            }}
        >
            <section {...props}>{children}</section>
        </DragAndDropContext.Provider>
    );
};

interface DropAreaProps
    extends Omit<React.ComponentPropsWithoutRef<"ul">, "children"> {
    renderItems: (items: Option) => React.ReactElement;
}

export const DropArea: React.FC<DropAreaProps> = ({
    onDragOver,
    onDrop,
    renderItems,
    ...props
}) => {
    const [options, setOptions] = React.useState<Omit<Option, "element">[]>([]);

    const { draggableOption } = useDragAndDropContext();

    const onDropHandler: React.DragEventHandler<HTMLUListElement> = event => {
        event.preventDefault();

        console.log(draggableOption.current);

        setOptions(options => {
            if (!draggableOption.current) return options;

            return Array.from(
                new Set(
                    [
                        ...options,
                        {
                            label: draggableOption.current.label,
                            value: draggableOption.current.value
                        }
                    ].map(option => JSON.stringify(option))
                )
            ).map(option => JSON.parse(option));
        });

        // draggableOption.current?.element.current?.setAttribute(
        //     "aria-selected",
        //     "true"
        // );
        // draggableOption.current = null;
    };

    const onDragOverHandler: React.DragEventHandler<HTMLElement> = event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        // event.currentTarget.style.setProperty(
        //     "background",
        //     "rgba(0 0 0 / 0.05)"
        // );
    };

    return (
        <ul
            onDragOver={composeEventHandlers(onDragOver, onDragOverHandler)}
            onDrop={composeEventHandlers(onDrop, onDropHandler)}
            {...props}
        >
            {options.map(option => renderItems(option))}
        </ul>
    );
};

interface OptionListProps extends React.ComponentPropsWithoutRef<"ul"> {
    children:
        | React.ReactElement<OptionProps, "li">
        | React.ReactElement<OptionProps, "li">[];
}

export const OptionList: React.FC<OptionListProps> = ({ ...props }) => {
    return (
        <ul
            role="listbox"
            {...props}
        />
    );
};

interface OptionProps extends React.ComponentPropsWithoutRef<"li"> {
    label: string;
    value: string | number;
}

export const Option: React.FC<OptionProps> = ({
    onDragStart,
    onDragOver,
    value,
    label,
    ...props
}) => {
    // const optionRef = React.useRef<HTMLLIElement>(null);
    const { draggableOption } = useDragAndDropContext();

    const onDragStartHandler: React.DragEventHandler<HTMLLIElement> = event => {
        // const id = event.currentTarget.getAttribute("id")!;
        draggableOption.current = {
            label,
            value
            // element: optionRef
        };
        event.dataTransfer.effectAllowed = "move";
    };

    // const onDragEndHandler: React.DragEventHandler<HTMLLIElement> = event => {
    //     console.log(event.target);

    // event.currentTarget.style.setProperty("background", "");
    // event.currentTarget.setAttribute("aria-selected", "true");
    // };

    const onDragOverHandler: React.DragEventHandler<HTMLElement> = event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        // event.currentTarget.style.setProperty(
        //     "background",
        //     "rgba(0 0 0 / 0.05)"
        // );
    };

    return (
        <li
            id={`option-${React.useId()}`}
            role="option"
            draggable
            aria-selected="false"
            onDragStart={composeEventHandlers(onDragStart, onDragStartHandler)}
            // onDragEnd={onDragEndHandler}
            // onDragLeave={event => {
            //     event.currentTarget.style.setProperty("background", "red");
            // }}
            onDragOver={composeEventHandlers(onDragOver, onDragOverHandler)}
            // ref={optionRef}
            {...props}
        />
    );
};
