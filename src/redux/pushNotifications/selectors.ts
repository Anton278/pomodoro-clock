import { RootState } from "../store";

export const selectIsAllowed = (state: RootState) =>
    state.pushNotifications.isAllowed;
export const selectUserID = (state: RootState) =>
    state.pushNotifications.userID;
