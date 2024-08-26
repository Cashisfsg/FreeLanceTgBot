import { useId } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useMeasure from "react-use-measure";

import { ProgressBar } from "@/shared/ui/progress-bar";

export const ApplicationLayoutHeader = () => {
    const [containerRef, { width }] = useMeasure();

    const locations = {
        category: {
            value: 1,
            label: `menuitem-${useId()}`
        },
        "ai-assist-description": {
            value: 2,
            label: `menuitem-${useId()}`
        },
        features: {
            value: 2,
            label: `menuitem-${useId()}`
        },
        conditions: {
            value: 3,
            label: `menuitem-${useId()}`
        }
    };

    const location = useLocation()
        .pathname.split("/")
        .at(-1) as keyof typeof locations;

    return (
        <header ref={containerRef}>
            <ProgressBar
                width={width}
                min={1}
                max={3}
                step={1}
                value={locations[location].value}
                valueText="Text values"
                aria-labelledby={locations[location].label}
                className="-mx-[7px] w-[calc(100%_+_14px)] max-w-none"
            />

            <nav>
                <ul
                    role="menubar"
                    className="underline-offset-3 grid grid-cols-3 gap-x-2 text-sm font-semibold text-[#007aff] underline"
                >
                    <li role="none">
                        <NavLink
                            to="/application/category"
                            id={locations.category.label}
                            role="menuitem"
                        >
                            Bot Category
                        </NavLink>
                    </li>
                    <li
                        role="none"
                        className="text-center"
                    >
                        <NavLink
                            to="/application/functionality/ai-assist-description"
                            id={locations["ai-assist-description"].label}
                            role="menuitem"
                        >
                            Functionality
                        </NavLink>
                    </li>
                    <li
                        role="none"
                        className="text-right"
                    >
                        <NavLink
                            to="/application/conditions"
                            id={locations.conditions.label}
                            role="menuitem"
                        >
                            Work Conditions
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
