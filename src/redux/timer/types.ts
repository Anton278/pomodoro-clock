export interface InitState {
    workTime: number;
    workRemainingTime: string;
    shortBreakTime: number;
    shortBreakRemainingTime: string;
    totalSessionsAmount: number;
    sessionCounter: number;
    longBreakTime: number;
    longBreakRemainingTime: string;
    stage: "work" | "short-break" | "long-break";
    isOtherPagesLocked: boolean;
    percentRemainingTime: number;
}
