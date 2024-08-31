import { useFetchQuestionsQuery, type QuestionsResponseModified } from "../api";

interface FetchQuestionsProps {
    renderSuccess: (data: QuestionsResponseModified) => React.ReactElement;
    loadingFallback?: React.ReactElement;
    renderError?: (error: string) => React.ReactElement;
}

export const FetchQuestions: React.FC<FetchQuestionsProps> = ({
    renderSuccess,
    loadingFallback = <p>Loading...</p>,
    renderError = error => <pre>{error}</pre>
}) => {
    const { data, isLoading, isSuccess, isError, error } =
        useFetchQuestionsQuery();

    if (isLoading) return loadingFallback;

    if (isError) return renderError(error);

    if (isSuccess) return renderSuccess(data);

    return <></>;
};
