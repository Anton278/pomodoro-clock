import { RootState } from "../store";

export const selectWorkTime = (state: RootState) => state.timer.workTime;
export const selectWorkRemainingTime = (state: RootState) =>
    state.timer.workRemainingTime;

export const selectShortBreakTime = (state: RootState) =>
    state.timer.shortBreakTime;
export const selectShortBreakRemainingTime = (state: RootState) =>
    state.timer.shortBreakRemainingTime;

export const selectLongBreakTime = (state: RootState) =>
    state.timer.longBreakTime;
export const selectLongBreakRemainingTime = (state: RootState) =>
    state.timer.longBreakRemainingTime;

export const selectTotalSessionsAmount = (state: RootState) =>
    state.timer.totalSessionsAmount;
export const selectSessionCounter = (state: RootState) =>
    state.timer.sessionCounter;

export const selectStage = (state: RootState) => state.timer.stage;
export const selectIsOtherPagesLocked = (state: RootState) =>
    state.timer.isOtherPagesLocked;
export const selectPercentRemainingTime = (state: RootState) =>
    state.timer.percentRemainingTime;
