import { useFetch, type SearchParams } from "@/shared/model/hooks/use-fetch";

type FetchProps<T> = {
    url: string;
    searchParams?: SearchParams;
    options?: RequestInit;
    renderSuccess: (data: T) => React.ReactNode;
    loadingFallback?: React.ReactElement;
    renderError?: (error: Error) => React.ReactElement;
};

export const Fetch = <T,>({
    url,
    searchParams,
    options,
    renderSuccess,
    loadingFallback = <p>Loading...</p>,
    renderError = error => <pre>{error.message}</pre>
}: FetchProps<T>) => {
    const { status, data, error } = useFetch<T>(url, searchParams, options);

    if (status === "pending") return loadingFallback;

    if (status === "rejected") return renderError(error);

    if (status === "fulfilled") return renderSuccess(data);

    return <></>;
};
