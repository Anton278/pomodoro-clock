import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import timer from "./timer/slice";
import pushNotifications from "./pushNotifications/slice";
import audio from "./audio/slice";

export const store = configureStore({
    reducer: { timer, pushNotifications, audio },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
