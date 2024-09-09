import { useId } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useMeasure from "react-use-measure";

import { ProgressBar } from "@/shared/ui/progress-bar";

export const ApplicationLayoutHeader = () => {
    const [containerRef, { width }] = useMeasure();

    const locations = {
        category: {
            id: `menuitem-${useId()}`,
            label: "Bot category",
            // url: "category",
            value: 1
        },
        // "ai-assist-description": {
        //     id: `menuitem-${useId()}`,
        //     value: 2
        // },
        functionality: {
            id: `menuitem-${useId()}`,
            label: "Functionality",
            // url: "functionality",
            value: 2
        },
        conditions: {
            id: `menuitem-${useId()}`,
            label: "Work conditions",
            // url: "conditions",
            value: 3
        }
    } as const;

    const currentLocation = useLocation()
        .pathname.split("/")
        .at(-1) as keyof typeof locations;

    return (
        <header ref={containerRef}>
            <ProgressBar
                width={width}
                min={1}
                max={3}
                step={1}
                value={locations[currentLocation].value}
                valueText="Text values"
                aria-labelledby={locations[currentLocation].id}
                className="-mx-[7px] w-[calc(100%_+_14px)] max-w-none"
            />

            <nav>
                <ul
                    role="menubar"
                    className="grid grid-cols-[2fr_3fr_2fr] gap-x-2 text-sm font-semibold text-[#007aff] underline underline-offset-2"
                >
                    {(
                        Object.keys(locations) as Array<keyof typeof locations>
                    ).map((key, index) => (
                        <li
                            key={locations[key].id}
                            role="none"
                            className="contents"
                        >
                            <NavLink
                                to={`/application/${key}`}
                                id={locations[key].id}
                                role="menuitem"
                                className={
                                    index === 0
                                        ? "text-left"
                                        : index !==
                                            Object.keys(locations).length - 1
                                          ? "text-center"
                                          : "text-right"
                                }
                            >
                                {locations[key].label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};
