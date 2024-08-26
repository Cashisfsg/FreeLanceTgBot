import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/shared/api/config";

export const rootApi = createApi({
    reducerPath: "rootApi",
    baseQuery: baseQuery,
    endpoints: () => ({})
});
