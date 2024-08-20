import {
    createBrowserRouter,
    RouterProvider as Provider
} from "react-router-dom";

import { MainPage } from "@/pages/main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    }
]);

export const RouterProvider = () => {
    return <Provider router={router} />;
};
