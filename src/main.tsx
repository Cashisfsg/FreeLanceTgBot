import React from "react";
import ReactDOM from "react-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@/app/providers/router";
import { ReduxProvider } from "./app/providers/redux";
import "@/app/styles/index.css";

if (process.env.NODE_ENV !== "production") {
    import("@axe-core/react").then(axe => {
        axe.default(React, ReactDOM, 1000);
    });
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider>
            <RouterProvider />
        </ReduxProvider>
    </StrictMode>
);
