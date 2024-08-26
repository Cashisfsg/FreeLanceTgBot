import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@/app/providers/router";
import { ReduxProvider } from "./app/providers/redux";
import "@/app/styles/index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider>
            <RouterProvider />
        </ReduxProvider>
    </StrictMode>
);
