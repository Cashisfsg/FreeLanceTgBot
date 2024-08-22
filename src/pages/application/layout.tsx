import { Outlet } from "react-router-dom";

import { NavigationPanel } from "@/widgets/navigation";

export const ApplicationLayout = () => {
    return (
        <>
            <NavigationPanel />

            <Outlet />
        </>
    );
};
