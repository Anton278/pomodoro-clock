import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import {
    selectLongBreakTime,
    selectShortBreakTime,
    selectStage,
    selectWorkTime,
} from "../redux/timer/selectors";
import {
    nextStage,
    setIsOtherPagesLocked,
    setLongBreakRemainingTime,
    setShortBreakRemainingTime,
    setWorkRemainingTime,
    setPercentRemainingTime,
} from "../redux/timer/slice";
import { calcPercentRemainingTime } from "../utils/calcPercentRemainingTime";

import { normalizeMilliseconds } from "../utils/normalizeMilliseconds";
import { normalizeMinutes } from "../utils/normalizeMinutes";

export const useTimer = () => {
    const timeoutID = useRef<ReturnType<typeof setTimeout>>();
    const [status, setStatus] = useState<"idle" | "work">("idle");
    const expected = useRef(0);

    const stage = useSelector(selectStage);
    const workTime = useSelector(selectWorkTime);
    const shortBreakTime = useSelector(selectShortBreakTime);
    const longBreakTime = useSelector(selectLongBreakTime);

    const calcRemainingTimeInitValue = () => {
        switch (stage) {
            case "work":
                return workTime * 60 * 1000;
            case "short-break":
                return shortBreakTime * 60 * 1000;
            case "long-break":
                return longBreakTime * 60 * 1000;
        }
    };

    const remainingTime = useRef(calcRemainingTimeInitValue());
    useEffect(() => {
        remainingTime.current = calcRemainingTimeInitValue();
    }, [stage]);

    const dispatch = useAppDispatch();
    const interval = 1000;

    const step = () => {
        const drift = Date.now() - expected.current;
        console.log("expected ===> ", expected);
        console.log("drift ===> ", drift);

        if (drift > interval) {
            remainingTime.current -=
                Number(String(drift)[0] + "000") - interval;
            if (remainingTime.current <= 0) {
                clearTimeout(timeoutID.current);
                dispatch(nextStage());
                setStatus("idle");
                return;
            }
            expected.current += drift + (interval - (drift % 1000));
            timeoutID.current = setTimeout(step, interval - (drift % interval));
            return;
        }
        remainingTime.current -= 1000;
        if (remainingTime.current === 0) {
            clearTimeout(timeoutID.current);
            dispatch(nextStage());
            setStatus("idle");
            return;
        }
        switch (stage) {
            case "work":
                dispatch(
                    setWorkRemainingTime(
                        normalizeMilliseconds(remainingTime.current)
                    )
                );
                dispatch(
                    setPercentRemainingTime(
                        calcPercentRemainingTime(
                            remainingTime.current,
                            workTime
                        )
                    )
                );
                break;
            case "short-break":
                dispatch(
                    setShortBreakRemainingTime(
                        normalizeMilliseconds(remainingTime.current)
                    )
                );
                dispatch(
                    setPercentRemainingTime(
                        calcPercentRemainingTime(
                            remainingTime.current,
                            shortBreakTime
                        )
                    )
                );
                break;
            case "long-break":
                dispatch(
                    setLongBreakRemainingTime(
                        normalizeMilliseconds(remainingTime.current)
                    )
                );
                dispatch(
                    setPercentRemainingTime(
                        calcPercentRemainingTime(
                            remainingTime.current,
                            longBreakTime
                        )
                    )
                );
        }

        console.log("remainingTime ===> ", remainingTime);
        expected.current += interval;
        timeoutID.current = setTimeout(step, interval - drift);
    };

    return {
        status,
        start() {
            expected.current = Date.now() + interval;
            timeoutID.current = setTimeout(step, interval);
            setStatus("work");
            dispatch(setIsOtherPagesLocked(true));
        },
        stop() {
            clearTimeout(timeoutID.current);
            setStatus("idle");
        },
        restart() {
            switch (stage) {
                case "work":
                    dispatch(setWorkRemainingTime(normalizeMinutes(workTime)));
                    break;
                case "short-break":
                    dispatch(
                        setShortBreakRemainingTime(
                            normalizeMinutes(shortBreakTime)
                        )
                    );
                    break;
                case "long-break":
                    dispatch(
                        setLongBreakRemainingTime(
                            normalizeMinutes(longBreakTime)
                        )
                    );
            }
            remainingTime.current = calcRemainingTimeInitValue();
            clearTimeout(timeoutID.current);
            setStatus("idle");
            dispatch(setIsOtherPagesLocked(false));
            dispatch(setPercentRemainingTime(100));
        },
        skip() {
            clearTimeout(timeoutID.current);
            dispatch(nextStage());
            dispatch(setIsOtherPagesLocked(false));
            setStatus("idle");
        },
    };
};