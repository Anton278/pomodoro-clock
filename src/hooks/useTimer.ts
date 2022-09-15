import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";

import {
    selectIsAllowed,
    selectUserID,
} from "../redux/pushNotifications/selectors";
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
    setInitValues,
    setPercentRemainingTime,
} from "../redux/timer/slice";

import { calcPercentRemainingTime } from "../utils/calcPercentRemainingTime";
import { normalizeMilliseconds } from "../utils/normalizeMilliseconds";
import { selectAudioSrc } from "../redux/audio/selectors";

export const useTimer = () => {
    const INTERVAL = 1000;
    const dispatch = useAppDispatch();

    const [status, setStatus] = useState<"idle" | "work">("idle");
    const timeoutID = useRef<ReturnType<typeof setTimeout>>();
    const expectedFiredTime = useRef(0);

    const stage = useSelector(selectStage);
    const workTime = useSelector(selectWorkTime);
    const shortBreakTime = useSelector(selectShortBreakTime);
    const longBreakTime = useSelector(selectLongBreakTime);
    const isPushNotificationsAllowed = useSelector(selectIsAllowed);
    const userID = useSelector(selectUserID);
    const audioSrc = useSelector(selectAudioSrc);

    const audio = useRef(new Audio(audioSrc));

    const getStageInitTime = () => {
        switch (stage) {
            case "work":
                return workTime * 60 * 1000;
            case "short-break":
                return shortBreakTime * 60 * 1000;
            case "long-break":
                return longBreakTime * 60 * 1000;
        }
    };

    const remainingTime = useRef(getStageInitTime());

    useEffect(() => {
        remainingTime.current = getStageInitTime();
    }, [stage]);

    enum notificationMessages {
        work = "Time to work 👨‍💻",
        break = "Time to rest ☕",
    }

    const createNotification = (
        message: "Time to work 👨‍💻" | "Time to rest ☕"
    ) => {
        const url = "https://onesignal.com/api/v1/notifications";
        const appID = "91479291-8fb6-42b0-8738-afa711de76ae";
        axios.post(url, {
            include_player_ids: [userID],
            app_id: appID,
            contents: {
                en: message,
            },
        });
    };

    const step = () => {
        const drift = Date.now() - expectedFiredTime.current;

        const onFinishHandler = () => {
            clearTimeout(timeoutID.current);
            audio.current.play();
            setStatus("idle");
            if (isPushNotificationsAllowed) {
                if (stage === "work") {
                    createNotification(notificationMessages.break);
                } else {
                    createNotification(notificationMessages.work);
                }
            }
            dispatch(setInitValues());
            dispatch(nextStage());
        };

        if (drift > INTERVAL) {
            remainingTime.current -=
                Number(String(drift)[0] + "000") - INTERVAL;
            if (remainingTime.current <= 0) {
                return onFinishHandler();
            }
            expectedFiredTime.current += drift + (INTERVAL - (drift % 1000));
            timeoutID.current = setTimeout(step, INTERVAL - (drift % INTERVAL));
            return;
        }

        remainingTime.current -= 1000;

        if (remainingTime.current === 0) {
            return onFinishHandler();
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

        expectedFiredTime.current += INTERVAL;
        timeoutID.current = setTimeout(step, INTERVAL - drift);
    };

    return {
        status,
        start() {
            expectedFiredTime.current = Date.now() + INTERVAL;
            timeoutID.current = setTimeout(step, INTERVAL);
            setStatus("work");
            dispatch(setIsOtherPagesLocked(true));
        },
        stop() {
            clearTimeout(timeoutID.current);
            setStatus("idle");
        },
        restart() {
            dispatch(setInitValues());
            remainingTime.current = getStageInitTime();
            clearTimeout(timeoutID.current);
            setStatus("idle");
            dispatch(setIsOtherPagesLocked(false));
        },
        skip() {
            clearTimeout(timeoutID.current);
            dispatch(setInitValues());
            dispatch(nextStage());
            dispatch(setIsOtherPagesLocked(false));
            setStatus("idle");
        },
    };
};
