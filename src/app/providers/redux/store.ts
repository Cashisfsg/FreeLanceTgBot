import { configureStore } from "@reduxjs/toolkit";

import { rootApi } from "@/shared/api/api";

export const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(rootApi.middleware)
});
