import {
    useFetchAllQuestionsQuery,
    type FetchAllQuestionsTransformedResponse
} from "../../api";
// import { handleErrorResponse } from "@/shared/utils/handle-error-response";

interface FetchQuestionsProps {
    renderSuccess: (
        questions: FetchAllQuestionsTransformedResponse
    ) => React.ReactElement;
    loadingFallback?: React.ReactNode;
    renderError?: (error: string | undefined) => React.ReactElement;
}

export const FetchQuestions: React.FC<FetchQuestionsProps> = ({
    renderSuccess,
    loadingFallback = <p>Loading...</p>,
    renderError = error => <pre>{error || "Unknown error"}</pre>
}) => {
    const { data, isLoading, isError, error } = useFetchAllQuestionsQuery();

    if (isLoading) return loadingFallback;

    if (isError) return renderError(error);

    if (data) return renderSuccess(data);

    return <></>;
};
