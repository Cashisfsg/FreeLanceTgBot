import {
    createBrowserRouter,
    RouterProvider as Provider,
    Navigate
} from "react-router-dom";

import { MainPage } from "@/pages/main";
import { ApplicationLayout } from "@/pages/application/layout";
import { ApplicationCategoryPage } from "@/pages/application/category";
import { ApplicationFunctionalityPage } from "@/pages/application/functionality";
import { ApplicationWorkConditionsPage } from "@/pages/application/work-conditions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "application",
        element: <ApplicationLayout />,
        children: [
            {
                path: "category",
                element: <ApplicationCategoryPage />
            },
            {
                path: "functionality",
                element: <ApplicationFunctionalityPage />
            },
            {
                path: "conditions",
                element: <ApplicationWorkConditionsPage />
            },
            {
                path: "*",
                element: <Navigate to="/application/category" />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export const RouterProvider = () => {
    return <Provider router={router} />;
};
