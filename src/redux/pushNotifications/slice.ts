import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitState } from "./types";

const initialState: InitState = {
    userID: null,
    isAllowed: false,
};

const pushNotifications = createSlice({
    name: "pushNotifications",
    initialState,
    reducers: {
        setUserID(state, action: PayloadAction<string>) {
            state.userID = action.payload;
        },
        setIsAllowed(state, action: PayloadAction<boolean>) {
            state.isAllowed = action.payload;
        },
    },
});

export const { setUserID, setIsAllowed } = pushNotifications.actions;

export default pushNotifications.reducer;
