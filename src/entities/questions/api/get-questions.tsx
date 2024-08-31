import { rootApi } from "@/shared/api/api";

import type { QuestionsResponse, QuestionsResponseModified } from "./types";

export const getQuestionsApi = rootApi
    .enhanceEndpoints({
        addTagTypes: [""]
    })
    .injectEndpoints({
        endpoints: builder => ({
            fetchQuestions: builder.query<QuestionsResponseModified, void>({
                query: () => "orders/form_structure",
                transformResponse: (response: QuestionsResponse) =>
                    response?.sections
            })
        })
    });

export const { useFetchQuestionsQuery, useLazyFetchQuestionsQuery } =
    getQuestionsApi;
