import { useRef, useId } from "react";
import { cnBase } from "tailwind-variants";

import { SelectContext, useSelectContext } from "./use-select-context";

import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

import Select from "./Select.module.css";

interface RootProps extends React.ComponentPropsWithoutRef<"div"> {}

export const Root: React.FC<RootProps> = ({ className, ...props }) => {
    const triggerId = `trigger-${useId()}`;
    const selectMenuId = `select-menu-${useId()}`;

    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    return (
        <SelectContext.Provider
            value={{ triggerId, selectMenuId, triggerRef, menuRef }}
        >
            <div
                className={cnBase(Select.root, className)}
                {...props}
            />
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
        const currentOption = Array.prototype.find.call(
            menuRef.current?.children,
            (child: HTMLLinkElement) =>
                child.getAttribute("aria-selected") === "true"
        ) as HTMLLIElement;
        const activedescendant = currentOption.getAttribute("id")!;

        trigger.setAttribute("aria-expanded", String(!isOpen));
        trigger.setAttribute("aria-activedescendant", activedescendant);
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

        event.preventDefault();
        event.stopPropagation();

        switch (key) {
            case "Enter":
            case "Space":
                trigger.setAttribute("aria-expanded", "true");
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
            className={cnBase(Select.trigger, className)}
            onClick={composeEventHandlers(onClick, onClickHandler)}
            onKeyDown={composeEventHandlers(onKeyDown, onKeyDownHandler)}
            ref={triggerRef}
            {...props}
        />
    );
};

interface MenuProps
    extends Omit<
        React.ComponentPropsWithoutRef<"ul">,
        "id" | "role" | "tabIndex"
    > {}

export const Menu: React.FC<MenuProps> = ({ className, onClick, ...props }) => {
    const { selectMenuId, triggerRef, menuRef } = useSelectContext();

    const onClickHandler: React.MouseEventHandler<HTMLUListElement> = event => {
        const currentSelectedOption = (event.target as HTMLElement).closest(
            "li"
        );
        const menu = event.currentTarget;
        const previousSelectedOption = Array.prototype.find.call(
            menu.children,
            (child: HTMLLinkElement) =>
                child.getAttribute("aria-selected") === "true"
        ) as HTMLLIElement;

        previousSelectedOption?.setAttribute("aria-selected", "false");
        previousSelectedOption?.classList.remove("current-option");
        currentSelectedOption?.setAttribute("aria-selected", "true");
        triggerRef.current?.setAttribute("aria-expanded", "false");
        triggerRef.current?.setAttribute("aria-activedescendant", "");
    };

    return (
        <ul
            id={selectMenuId}
            role="listbox"
            tabIndex={-1}
            // popover="auto"
            className={cnBase(Select.menu, className)}
            onClick={composeEventHandlers(onClick, onClickHandler)}
            ref={menuRef}
            {...props}
        />
    );
};

Menu.displayName = "Select.Menu";

interface OptionProps
    extends Omit<React.ComponentPropsWithoutRef<"li">, "role"> {}

export const Option: React.FC<OptionProps> = ({ ...props }) => {
    const optionId = `option-${useId()}`;

    return (
        <li
            id={optionId}
            role="option"
            aria-selected="true"
            {...props}
        />
    );
};

Option.displayName = "Select.Option";
