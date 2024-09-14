import React, { useState, useReducer, useRef, useId } from "react";
import { cnBase } from "tailwind-variants";

import { SelectContext, useSelectContext } from "./use-select-context";

import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

import Select from "./Select.module.css";
import Close from "@/assets/img/svg/close.svg";

interface RootProps extends React.ComponentPropsWithoutRef<"fieldset"> {
    name?: string;
    placeholder?: string;
    multiple?: boolean;
}

interface Option {
    id: string;
    label: string | number;
    value: string | number;
}

type State = Option[];

export type Action =
    | { type: "set"; payload: Option }
    | { type: "toggle"; payload: Option }
    | { type: "delete"; payload: Option };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "set":
            if (state.some(option => option.id === action.payload.id))
                return state;

            return [
                ...state,
                {
                    id: action.payload.id,
                    label: action.payload.label,
                    value: action.payload.value
                }
            ];

        case "toggle": {
            if (state.some(option => option.id === action.payload.id)) {
                return state.filter(
                    option => option.value !== action.payload.value
                );
            }

            return [
                ...state,
                {
                    id: action.payload.id,
                    label: action.payload.label,
                    value: action.payload.value
                }
            ];
        }

        case "delete":
            return state.filter(
                option => option.value !== action.payload.value
            );

        default:
            return state;
    }
}

export const Root: React.FC<RootProps> = ({
    className,
    name,
    multiple = false,
    children,
    ...props
}) => {
    const triggerId = `trigger-${useId()}`;
    const selectMenuId = `select-menu-${useId()}`;

    const [options, dispatch] = useReducer(reducer, []);
    const [query, setQuery] = useState("");

    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const deleteOption = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        option: Option
    ) => {
        if (!menuRef.current) return;
        event.stopPropagation();

        const options = menuRef.current.children;
        const removableOption = Array.prototype.find.call(
            options,
            (optionElement: HTMLLIElement) =>
                optionElement.getAttribute("id") === option.id
        ) as HTMLLIElement;
        removableOption?.setAttribute("aria-selected", "false");

        dispatch({
            type: "delete",
            payload: option
        });
    };

    const onClickHandler: React.MouseEventHandler<HTMLFieldSetElement> = () => {
        const ariaExpanded =
            triggerRef.current?.getAttribute("aria-expanded") === "true";
        triggerRef.current?.setAttribute(
            "aria-expanded",
            String(!ariaExpanded)
        );
    };

    return (
        <SelectContext.Provider
            value={{
                triggerId,
                name,
                multiple,
                dispatch,
                selectMenuId,
                triggerRef,
                menuRef,
                query,
                setQuery
            }}
        >
            <fieldset
                onClick={onClickHandler}
                className={cnBase(
                    Select.root,
                    className,
                    "flex items-center gap-2 rounded-xl bg-white p-2 shadow-md"
                )}
                {...props}
            >
                <ul className="flex flex-wrap gap-2">
                    {options.map(option => (
                        <li
                            key={option.value}
                            className="flex gap-2 rounded-md bg-black/5 px-3 py-2 text-base/5 font-bold"
                        >
                            <span className="min-w-16">{option.label}</span>
                            <button
                                onClick={event => deleteOption(event, option)}
                            >
                                <span className="sr-only">Delete item</span>
                                <img
                                    src={Close}
                                    alt="Cross icon"
                                    width={16}
                                    height={16}
                                    className="size-4 p-[3px]"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
                {children}
                <div>
                    {options.map(option => (
                        <input
                            key={option.value}
                            name={name}
                            value={option.value}
                            hidden
                            className="bg-transparent"
                        />
                    ))}
                </div>
            </fieldset>
        </SelectContext.Provider>
    );
};

Root.displayName = "Select.Root";

interface TriggerProps
    extends Omit<
        React.ComponentPropsWithoutRef<"button">,
        | "id"
        | "role"
        | "aria-expanded"
        | "aria-haspopup"
        | "aria-controls"
        | "aria-activedescendant"
    > {}

export const Trigger: React.FC<TriggerProps> = ({
    className,
    onClick,
    onKeyDown,
    ...props
}) => {
    const { triggerId, selectMenuId, triggerRef, menuRef } = useSelectContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        const trigger = event.currentTarget;
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        trigger.setAttribute("aria-expanded", String(!isOpen));
        event.stopPropagation();

        // const currentOption = Array.prototype.find.call(
        //     menuRef.current?.children,
        //     (child: HTMLLinkElement) =>
        //         child.getAttribute("aria-selected") === "true"
        // );
        // const activedescendant = currentOption.getAttribute("id")!;

        // trigger.setAttribute("aria-activedescendant", activedescendant);
    };

    const onKeyDownHandler: React.KeyboardEventHandler<
        HTMLButtonElement
    > = event => {
        const { key } = event;
        const trigger = event.currentTarget;
        const currentOption = Array.prototype.find.call(
            menuRef.current?.children,
            (child: HTMLLinkElement) =>
                child.getAttribute("aria-selected") === "true"
        ) as HTMLLIElement;

        switch (key) {
            case "Enter":
            case "Space":
                trigger.setAttribute("aria-expanded", "true");
                event.preventDefault();
                event.stopPropagation();
                break;

            case "Home":
                menuRef.current?.firstElementChild?.classList.add(
                    "current-option"
                );
                trigger.setAttribute("aria-expanded", "true");
                break;

            case "End":
                menuRef.current?.lastElementChild?.classList.add(
                    "current-option"
                );
                trigger.setAttribute("aria-expanded", "true");
                break;

            case "ArrowUp": {
                if (trigger.getAttribute("aria-expanded") === "false") {
                    trigger.setAttribute("aria-expanded", "true");
                    break;
                }

                const option =
                    currentOption?.previousElementSibling ||
                    menuRef.current?.firstElementChild;
                const id = option?.getAttribute("id");

                currentOption?.classList.remove("current-option");
                option?.classList.add("current-option");
                trigger.setAttribute("aria-expanded", "true");
                trigger.setAttribute("aria-activedescendant", id || "");
                break;
            }

            case "ArrowDown": {
                if (trigger.getAttribute("aria-expanded") === "false") {
                    trigger.setAttribute("aria-expanded", "true");
                    break;
                }

                const option =
                    currentOption?.nextElementSibling ||
                    menuRef.current?.lastElementChild;
                const id = option?.getAttribute("id");

                currentOption?.classList.remove("current-option");
                option?.classList.add("current-option");
                trigger.setAttribute("aria-expanded", "true");
                trigger.setAttribute("aria-activedescendant", id || "");

                break;
            }

            default:
                break;
        }
    };

    return (
        <button
            id={triggerId}
            type="button"
            role="combobox"
            aria-expanded="false"
            aria-haspopup="listbox"
            aria-controls={selectMenuId}
            aria-activedescendant=""
            // popovertarget={selectMenuId}
            onClick={composeEventHandlers(onClick, onClickHandler)}
            onKeyDown={composeEventHandlers(onKeyDown, onKeyDownHandler)}
            className={cnBase(Select.trigger, className)}
            ref={triggerRef}
            {...props}
        />
    );
};

interface SearchProps
    extends Omit<React.ComponentPropsWithoutRef<"input">, "type"> {}

export const Search: React.FC<SearchProps> = ({
    // onFocus,
    // onBlur,
    children,
    ...props
}) => {
    const { selectMenuId, query, setQuery } = useSelectContext();

    // const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
    //     // const trigger = triggerRef.current;

    //     // if (!trigger) return;

    //     // const expanded = trigger.getAttribute("aria-expanded") === "true";
    //     triggerRef.current?.setAttribute("aria-expanded", "true");
    // };

    // const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = () => {
    //     triggerRef.current?.setAttribute("aria-expanded", "false");
    // };

    const onChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        setQuery(event.target.value);
    };

    return (
        <search className="flex-auto self-stretch">
            <input
                type="search"
                role="combobox"
                aria-expanded="false"
                aria-haspopup="listbox"
                aria-controls={selectMenuId}
                placeholder="Placeholder"
                value={query}
                onChange={onChangeHandler}
                // onFocus={composeEventHandlers(onFocus, onFocusHandler)}
                // onBlur={composeEventHandlers(onBlur, onBlurHandler)}
                className="h-9 w-fit bg-transparent focus:border-none focus:outline-none"
                {...props}
            />
            {children}
        </search>
    );
};

Search.displayName = "Select.Search";

interface MenuProps
    extends Omit<
        React.ComponentPropsWithoutRef<"ul">,
        "id" | "role" | "tabIndex"
    > {}

export const Menu: React.FC<MenuProps> = ({
    className,
    children,
    ...props
}) => {
    const { selectMenuId, menuRef, query } = useSelectContext();

    // const onClickHandler: React.MouseEventHandler<HTMLUListElement> = event => {
    //     const currentSelectedOption = (event.target as HTMLElement).closest(
    //         "li"
    //     );
    //     // const options = event.currentTarget.children;
    //     // const previousSelectedOption = Array.prototype.find.call(
    //     //     options,
    //     //     (child: HTMLLIElement) =>
    //     //         child.getAttribute("aria-selected") === "true"
    //     // ) as HTMLLIElement;

    //     // previousSelectedOption?.setAttribute("aria-selected", "false");
    //     // previousSelectedOption?.classList.remove("current-option");
    //     currentSelectedOption?.setAttribute("aria-selected", "true");
    //     triggerRef.current?.setAttribute("aria-expanded", "false");
    //     triggerRef.current?.setAttribute("aria-activedescendant", "");
    // };

    return (
        <ul
            id={selectMenuId}
            role="listbox"
            tabIndex={-1}
            // popover="auto"
            className={cnBase(
                Select.menu,
                className,
                "absolute left-0 top-full mt-2 shadow-md"
            )}
            // onClick={composeEventHandlers(onClick, onClickHandler)}
            ref={menuRef}
            {...props}
        >
            {React.Children.toArray(children).filter(child =>
                (child as React.ReactElement).props.label
                    .toLowerCase()
                    .includes(query.toLowerCase())
            )}
        </ul>
    );
};

Menu.displayName = "Select.Menu";

interface OptionProps
    extends Omit<React.ComponentPropsWithoutRef<"li">, "role"> {
    label: string | number;
    value: string | number;
}

export const Option: React.FC<OptionProps> = ({
    value,
    label,
    onClick,
    ...props
}) => {
    const optionId = `option-${useId()}`;
    const { dispatch } = useSelectContext();

    const onClickHandler: React.MouseEventHandler<HTMLLIElement> = event => {
        event.stopPropagation();
        const option = event.currentTarget;
        const id = option.getAttribute("id")!;
        const selected = option.getAttribute("aria-selected") === "true";

        // if (option.getAttribute("aria-selected") === "false") {
        option.setAttribute("aria-selected", String(!selected));
        // }

        // triggerRef.current?.setAttribute("aria-expanded", "false");
        dispatch({ type: "toggle", payload: { id, value, label } });
    };

    return (
        <li
            id={optionId}
            role="option"
            aria-selected="false"
            onClick={composeEventHandlers(onClick, onClickHandler)}
            {...props}
        />
    );
};

Option.displayName = "Select.Option";

interface NotFoundOptionProps
    extends React.ComponentPropsWithoutRef<"output"> {}

export const NotFoundOption: React.FC<NotFoundOptionProps> = ({ ...props }) => {
    return <output {...props} />;
};

NotFoundOption.displayName = "Select.NotFoundOption";
