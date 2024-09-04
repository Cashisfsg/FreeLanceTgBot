import { createContext, useContext } from "react";

export const TooltipContext = createContext<{
    anchorId: string;
    tooltipId: string;
    tooltipRef: React.RefObject<HTMLDivElement>;
    timerRef: React.RefObject<NodeJS.Timeout | undefined>;
} | null>(null);

export const useTooltipContext = () => {
    const context = useContext(TooltipContext);

    if (!context) {
        throw new Error(
            "Component must be rendered as child of HeaderGroup component"
        );
    }

    return context;
};
