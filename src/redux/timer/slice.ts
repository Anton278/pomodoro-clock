import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitState } from "./types";
import { normalizeMinutes } from "../../utils/normalizeMinutes";

const initialState: InitState = {
    workTime: 25,
    workRemainingTime: "25 : 00",
    shortBreakTime: 5,
    shortBreakRemainingTime: "05 : 00",
    longBreakTime: 20,
    longBreakRemainingTime: "20 : 00",
    totalSessionsAmount: 4,
    sessionCounter: 1,
    stage: "work",
    isOtherPagesLocked: false,
    percentRemainingTime: 100,
};

const timer = createSlice({
    name: "timer",
    initialState,
    reducers: {
        setWorkTime(state, action: PayloadAction<number>) {
            state.workTime = action.payload;
            state.workRemainingTime = normalizeMinutes(action.payload);
        },
        setWorkRemainingTime(state, action: PayloadAction<string>) {
            state.workRemainingTime = action.payload;
        },
        setShortBreakTime(state, action: PayloadAction<number>) {
            state.shortBreakTime = action.payload;
            state.shortBreakRemainingTime = normalizeMinutes(action.payload);
        },
        setShortBreakRemainingTime(state, action: PayloadAction<string>) {
            state.shortBreakRemainingTime = action.payload;
        },
        setLongBreakTime(state, action: PayloadAction<number>) {
            state.longBreakTime = action.payload;
            state.longBreakRemainingTime = normalizeMinutes(action.payload);
        },
        setLongBreakRemainingTime(state, action: PayloadAction<string>) {
            state.longBreakRemainingTime = action.payload;
        },
        setTotalSessionsAmount(state, action: PayloadAction<number>) {
            state.totalSessionsAmount = action.payload;
        },
        nextStage(state) {
            if (state.stage === "work") {
                if (state.sessionCounter === state.totalSessionsAmount) {
                    state.stage = "long-break";
                } else {
                    state.stage = "short-break";
                }
            } else if (state.stage === "short-break") {
                state.sessionCounter += 1;
                state.stage = "work";
            } else if (state.stage === "long-break") {
                state.stage = "work";
                state.sessionCounter = 1;
            }
        },
        setIsOtherPagesLocked(state, action: PayloadAction<boolean>) {
            state.isOtherPagesLocked = action.payload;
        },
        setInitValues(state) {
            state.workRemainingTime = normalizeMinutes(state.workTime);
            state.shortBreakRemainingTime = normalizeMinutes(
                state.shortBreakTime
            );
            state.longBreakRemainingTime = normalizeMinutes(
                state.longBreakTime
            );
            state.percentRemainingTime = 100;
        },
        setPercentRemainingTime(state, action: PayloadAction<number>) {
            state.percentRemainingTime = action.payload;
        },
    },
});

export const {
    setWorkTime,
    setWorkRemainingTime,
    setShortBreakTime,
    setShortBreakRemainingTime,
    setTotalSessionsAmount,
    setLongBreakTime,
    setLongBreakRemainingTime,
    setIsOtherPagesLocked,
    nextStage,
    setInitValues,
    setPercentRemainingTime,
} = timer.actions;

export default timer.reducer;
