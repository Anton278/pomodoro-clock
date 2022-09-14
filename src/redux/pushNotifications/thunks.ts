import { createAsyncThunk } from "@reduxjs/toolkit";
import OneSignal from "react-onesignal";
import { setIsAllowed, setUserID } from "./slice";

export const registerPush = createAsyncThunk(
    "pushNotifications/registerPush",
    async (_, { dispatch }) => {
        await OneSignal.init({ appId: "91479291-8fb6-42b0-8738-afa711de76ae" });
        await OneSignal.showNativePrompt();
        await OneSignal.isPushNotificationsEnabled(async (isEnabled) => {
            if (isEnabled) {
                const userID = await OneSignal.getUserId((userID) => userID);
                if (typeof userID === "string") {
                    dispatch(setIsAllowed(true));
                    dispatch(setUserID(userID));
                }
            }
        });
    }
);
