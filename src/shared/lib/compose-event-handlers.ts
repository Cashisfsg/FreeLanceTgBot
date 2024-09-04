interface EventType extends React.SyntheticEvent {}

export const composeEventHandlers = <E extends EventType>(
    external: ((event: E) => unknown) | undefined,
    internal: (event: E) => unknown
): ((event: E) => void) => {
    return function (event) {
        external?.(event);

        if (!event.defaultPrevented) {
            return internal(event);
        }
    };
};
