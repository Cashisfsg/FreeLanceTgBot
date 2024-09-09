import { useEffect, useRef, useId } from "react";
import { cnBase } from "tailwind-variants";
import { Portal as PortalPrimitive } from "../portal";

import { TooltipContext, useTooltipContext } from "./use-tooltip-context";

import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

import Tooltip from "./Tooltip.module.css";

interface RootProps extends React.PropsWithChildren {}

export const Root: React.FC<RootProps> = ({ children }) => {
    const anchorId = `tooltip-trigger-${useId()}`;
    const tooltipId = `tooltip-${useId()}`;
    const triggerRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    return (
        <TooltipContext.Provider
            value={{ anchorId, tooltipId, triggerRef, tooltipRef, timerRef }}
        >
            {children}
        </TooltipContext.Provider>
    );
};

Root.displayName = "Tooltip.Root";

interface TriggerProps extends React.ComponentProps<"button"> {}

export const Trigger: React.FC<TriggerProps> = ({
    className,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    const { anchorId, tooltipId, triggerRef, tooltipRef, timerRef } =
        useTooltipContext();

    useEffect(() => {
        if (!triggerRef.current) return;

        triggerRef.current.style.setProperty(
            "--tooltip-trigger",
            `--${tooltipId.replace(/:/g, "")}`
        );
    }, [tooltipId, triggerRef]);

    const onBlurHandler: React.FocusEventHandler<HTMLButtonElement> = () => {
        tooltipRef.current?.hidePopover();
        clearTimeout(timerRef.current);
    };

    const onFocusHandler: React.FocusEventHandler<HTMLButtonElement> = () => {
        const tooltip = tooltipRef.current;

        if (!tooltip) return;

        if (tooltip.matches(":popover-open")) {
            clearTimeout(timerRef.current);
        } else {
            timerRef.current = setTimeout(() => {
                tooltip.showPopover();
            }, 1000);
        }
    };

    const onKeyDownHandler: React.KeyboardEventHandler<
        HTMLButtonElement
    > = event => {
        const { key } = event;

        if (key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            tooltipRef.current?.hidePopover();
        }
    };

    const onMouseEnterHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = () => {
        const tooltip = tooltipRef.current;

        if (!tooltip) return;

        if (tooltip.matches(":popover-open")) {
            clearTimeout(timerRef.current);
        } else {
            timerRef.current = setTimeout(() => {
                tooltip.showPopover();
            }, 1000);
        }
    };

    const onMouseLeaveHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = () => {
        const tooltip = tooltipRef.current;

        if (!tooltip) return;

        if (tooltip.matches(":popover-open")) {
            timerRef.current = setTimeout(() => {
                tooltip.hidePopover();
            }, 500);
        } else {
            clearTimeout(timerRef.current);
        }
    };

    return (
        <button
            id={anchorId}
            type="button"
            popovertarget={tooltipId}
            popovertargetaction="toggle"
            aria-describedby={tooltipId}
            onBlur={composeEventHandlers(onBlur, onBlurHandler)}
            onFocus={composeEventHandlers(onFocus, onFocusHandler)}
            onKeyDown={composeEventHandlers(onKeyDown, onKeyDownHandler)}
            onMouseEnter={composeEventHandlers(
                onMouseEnter,
                onMouseEnterHandler
            )}
            onMouseLeave={composeEventHandlers(
                onMouseLeave,
                onMouseLeaveHandler
            )}
            className={cnBase(Tooltip.trigger, className)}
            ref={triggerRef}
            {...props}
        />
    );
};

Trigger.displayName = "Tooltip.Trigger";

export const Portal = PortalPrimitive;

Portal.displayName = "Tooltip.Portal";

interface ContentProps extends React.ComponentProps<"div"> {}

export const Content: React.FC<ContentProps> = ({
    className,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    const { tooltipId, tooltipRef, timerRef } = useTooltipContext();

    useEffect(() => {
        if (!tooltipRef.current) return;

        tooltipRef.current.style.setProperty(
            "--tooltip-trigger",
            `--${tooltipId.replace(/:/g, "")}`
        );
    }, [tooltipId, tooltipRef]);

    const onMouseEnterHandler: React.MouseEventHandler<
        HTMLDivElement
    > = event => {
        const tooltip = event.currentTarget;

        if (!tooltip.matches(":popover-open")) return;

        clearTimeout(timerRef.current);
    };

    const onMouseLeaveHandler: React.MouseEventHandler<
        HTMLDivElement
    > = event => {
        const tooltip = event.currentTarget;

        if (tooltip.matches(":popover-open")) {
            timerRef.current = setTimeout(() => {
                tooltip.hidePopover();
            }, 500);
        } else {
            clearTimeout(timerRef.current);
        }
    };

    return (
        <>
            <div
                id={tooltipId}
                role="tooltip"
                popover="manual"
                tabIndex={-1}
                onMouseEnter={composeEventHandlers(
                    onMouseEnter,
                    onMouseEnterHandler
                )}
                onMouseLeave={composeEventHandlers(
                    onMouseLeave,
                    onMouseLeaveHandler
                )}
                ref={tooltipRef}
                className={cnBase(Tooltip.content, className)}
                {...props}
            />
            {/* <div className={Tooltip.arrow} /> */}
        </>
    );
};

Content.displayName = "Tooltip.Content";
