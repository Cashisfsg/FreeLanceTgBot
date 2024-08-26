import { Outlet } from "react-router-dom";

import { ApplicationLayoutHeader } from "@/widgets/application-layout-header";

export const ApplicationLayout = () => {
    return (
        <>
            <ApplicationLayoutHeader />

            <Outlet />
        </>
    );
};
