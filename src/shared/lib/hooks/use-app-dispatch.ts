import { useDispatch } from "react-redux";
import { store } from "@/app/providers/redux/store";

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch<AppDispatch>;
