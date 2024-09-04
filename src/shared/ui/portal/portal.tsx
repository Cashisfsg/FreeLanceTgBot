import ReactDOM from "react-dom";

const portalRoot = document.querySelector("body")!;

export const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
    return ReactDOM.createPortal(children, portalRoot);
};
