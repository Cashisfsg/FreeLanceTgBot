import { createContext, useContext } from "react";

export const HeaderGroupContext = createContext<{
    variant: "primary" | "secondary" | undefined;
} | null>(null);

export const useHeaderGroupContext = () => {
    const context = useContext(HeaderGroupContext);

    if (!context) {
        throw new Error(
            "Component must be rendered as child of HeaderGroup component"
        );
    }

    return context;
};
