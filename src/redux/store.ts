import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import timer from "./timer/slice";

export const store = configureStore({
    reducer: { timer },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
