import { rootApi } from "@/shared/api/api";

import type {
    FetchAllQuestionsResponse,
    FetchAllQuestionsTransformedResponse
} from "./types";

export const getQuestionsApi = rootApi
    .enhanceEndpoints({
        addTagTypes: [""]
    })
    .injectEndpoints({
        endpoints: builder => ({
            fetchAllQuestions: builder.query<
                FetchAllQuestionsTransformedResponse,
                void
            >({
                query: () => "orders/form_structure",
                transformResponse: (response: FetchAllQuestionsResponse) =>
                    response?.sections
            })
        })
    });

export const { useFetchAllQuestionsQuery, useLazyFetchAllQuestionsQuery } =
    getQuestionsApi;
