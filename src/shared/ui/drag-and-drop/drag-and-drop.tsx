import React from "react";
import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

import {
    DragAndDropContext,
    useDragAndDropContext,
    type Option
} from "./use-drag-and-drop-context";

interface RootProps extends React.ComponentPropsWithoutRef<"section"> {}

export const Root: React.FC<RootProps> = ({ children, ...props }) => {
    const draggableOption = React.useRef<Option>(null);
    const menuRef = React.useRef<HTMLUListElement>(null);

    return (
        <DragAndDropContext.Provider
            value={{
                draggableOption,
                menuRef
            }}
        >
            <section {...props}>{children}</section>
        </DragAndDropContext.Provider>
    );
};

interface DropAreaProps {
    placeholder: React.ReactElement;
    renderOptions: (options: Option[]) => React.ReactElement;
}

export const DropArea: React.FC<DropAreaProps> = ({
    renderOptions,
    placeholder
}) => {
    const [options, setOptions] = React.useState<Option[]>([]);

    const { draggableOption, menuRef } = useDragAndDropContext();

    const onDropHandler: React.DragEventHandler<HTMLUListElement> = event => {
        event.preventDefault();

        if (!draggableOption.current || !menuRef.current) return;

        const optionsList = menuRef.current.children;
        const id = draggableOption.current.id;

        setOptions(options => {
            if (!draggableOption.current) return options;

            return Array.from(
                new Set(
                    [
                        ...options,
                        {
                            id: draggableOption.current.id,
                            label: draggableOption.current.label,
                            value: draggableOption.current.value
                        }
                    ].map(option => JSON.stringify(option))
                )
            ).map(option => JSON.parse(option));
        });

        const option = Array.prototype.find.call(
            optionsList,
            option => (option as HTMLLIElement).getAttribute("id") === id
        );
        option.setAttribute("aria-selected", "true");
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

    const {
        onDragOver: onPlaceholderDragOver,
        onDrop: onPlaceholderDrop,
        ...restPlaceholderProps
    } = placeholder.props;
    const renderedOptions = renderOptions(options);
    const { onDragOver, onDrop, ...restRenderOptionProps } =
        renderedOptions.props;

    if (options.length === 0)
        return React.cloneElement(placeholder, {
            onDragOver: composeEventHandlers(
                onPlaceholderDragOver,
                onDragOverHandler
            ),
            onDrop: composeEventHandlers(onPlaceholderDrop, onDropHandler),
            ...restPlaceholderProps
        });

    // return (
    //     <ul
    //         onDragOver={composeEventHandlers(onDragOver, onDragOverHandler)}
    //         onDrop={composeEventHandlers(onDrop, onDropHandler)}
    //         {...props}
    //     >
    //         {options.map(option => renderItems(option))}
    //     </ul>
    // );

    return React.cloneElement(renderedOptions, {
        onDragOver: composeEventHandlers(onDragOver, onDragOverHandler),
        onDrop: composeEventHandlers(onDrop, onDropHandler),
        ...restRenderOptionProps
    });
};

interface OptionListProps extends React.ComponentPropsWithoutRef<"ul"> {
    children:
        | React.ReactElement<OptionProps, "li">
        | React.ReactElement<OptionProps, "li">[];
}

export const OptionList: React.FC<OptionListProps> = ({ ...props }) => {
    const { menuRef } = useDragAndDropContext();

    return (
        <ul
            role="listbox"
            ref={menuRef}
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
        const id = event.currentTarget.getAttribute("id")!;

        const element = event.currentTarget;

        draggableOption.current = {
            id,
            label,
            value,
            element
        };
        event.dataTransfer.effectAllowed = "move";
    };

    const onDragOverHandler: React.DragEventHandler<HTMLElement> = event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    return (
        <li
            id={`option-${React.useId()}`}
            role="option"
            draggable
            aria-selected="false"
            onDragStart={composeEventHandlers(onDragStart, onDragStartHandler)}
            onDragOver={composeEventHandlers(onDragOver, onDragOverHandler)}
            {...props}
        />
    );
};
