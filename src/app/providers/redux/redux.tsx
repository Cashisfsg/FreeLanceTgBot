import { Provider } from "react-redux";
import { store } from "./store";

interface ReduxProviderProps extends React.PropsWithChildren {}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
