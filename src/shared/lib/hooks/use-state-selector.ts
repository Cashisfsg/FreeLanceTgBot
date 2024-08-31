import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { store } from "@/app/providers/redux/store";

type RootStore = ReturnType<typeof store.getState>;

export const useStateSelector: TypedUseSelectorHook<RootStore> = useSelector;
