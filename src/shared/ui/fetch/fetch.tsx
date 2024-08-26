import { useFetch } from "@/shared/model/hooks/use-fetch";

type SearchParams = Record<string, string | number>;

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
    const { status, data, error } = useFetch(url, searchParams, options);

    if (status === "pending") return loadingFallback;

    if (status === "rejected") return renderError(error as Error);

    if (status === "fulfilled") return renderSuccess(data as T);

    return <></>;
};
