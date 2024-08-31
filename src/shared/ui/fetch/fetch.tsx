import { useFetch, type SearchParams } from "@/shared/lib/hooks/use-fetch";

type FetchProps<T> = {
    url: string;
    searchParams?: SearchParams;
    requestOptions?: RequestInit;
    renderSuccess: (data: T) => React.ReactNode;
    loadingFallback?: React.ReactElement;
    renderError?: (error: Error) => React.ReactElement;
};

export const Fetch = <T,>({
    url,
    searchParams,
    requestOptions,
    renderSuccess,
    loadingFallback = <p>Loading...</p>,
    renderError = error => <pre>{error.message}</pre>
}: FetchProps<T>) => {
    const { status, data, error } = useFetch<T>(
        url,
        searchParams,
        requestOptions
    );

    if (status === "pending") return loadingFallback;

    if (status === "rejected") return renderError(error);

    if (status === "fulfilled") return renderSuccess(data);

    return <></>;
};
