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
import { UserPage } from "@/pages/user";
import { SupportPage } from "@/pages/support";
import { FeedbackPage } from "@/pages/support/feedback";
import { IssuePage } from "@/pages/support/issue";
import { ProposalPage } from "@/pages/support/proposal";
import { AppreciationPage } from "@/pages/support/appreciation";

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
        path: "user",
        element: <UserPage />
    },
    {
        path: "support",
        element: <SupportPage />
    },
    {
        path: "support/feedback",
        element: <FeedbackPage />
    },
    {
        path: "support/issue",
        element: <IssuePage />
    },
    {
        path: "support/proposal",
        element: <ProposalPage />
    },
    {
        path: "support/appreciation",
        element: <AppreciationPage />
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export const RouterProvider = () => {
    return <Provider router={router} />;
};
