import { useEffect, useMemo, useReducer } from "react";

interface InitialState {
    status: "idle";
    data: undefined;
    error: null;
}

interface LoadingState<D> {
    status: "pending";
    data: D | undefined;
    error: null;
}

interface SuccessState<D> {
    status: "fulfilled";
    data: D;
    error: null;
}

interface ErrorState<D> {
    status: "rejected";
    data: D | undefined;
    error: Error;
}

type State<D> =
    | InitialState
    | LoadingState<D>
    | SuccessState<D>
    | ErrorState<D>;

type Action<D> =
    | { type: "pending" }
    | { type: "fulfilled"; payload: D }
    | { type: "rejected"; payload: Error };

type SearchParams = Record<string, string | number>;

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
        case "pending":
            return { ...state, status: "pending", error: null };
        case "fulfilled":
            return {
                ...state,
                status: "fulfilled",
                data: action.payload,
                error: null
            };
        case "rejected":
            return { ...state, status: "rejected", error: action.payload };

        default:
            return state;
    }
};

const initialState: InitialState = {
    status: "idle",
    data: undefined,
    error: null
};

export const useFetch = <T>(
    url: string,
    searchParams?: SearchParams,
    options?: RequestInit
): State<T> => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const params = useMemo(
        () =>
            searchParams
                ? `?${new URLSearchParams(
                      Object.fromEntries(
                          Object.entries(searchParams).map(([key, value]) => [
                              key,
                              String(value)
                          ])
                      )
                  )}`
                : "",
        [searchParams]
    );

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            dispatch({ type: "pending" });

            try {
                const response = await fetch(`${url}${params}`, {
                    ...options,
                    signal
                });
                const result = (await response.json()) as T;

                dispatch({ type: "fulfilled", payload: result });
            } catch (error) {
                dispatch({ type: "rejected", payload: error as Error });
            }
        })();

        return () => {
            controller.abort();
        };
    }, [url, params, options]);

    return state;
};
