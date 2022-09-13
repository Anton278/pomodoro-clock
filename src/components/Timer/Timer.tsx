import { FC } from "react";

import { Typography, CircularProgress, Box } from "@mui/material";

import { useSelector } from "react-redux";
import {
    selectStage,
    selectWorkRemainingTime,
    selectShortBreakRemainingTime,
    selectLongBreakRemainingTime,
    selectPercentRemainingTime,
} from "../../redux/timer/selectors";

const Timer: FC = () => {
    const stage = useSelector(selectStage);
    const workRemainingTime = useSelector(selectWorkRemainingTime);
    const shortBreakRemainingTime = useSelector(selectShortBreakRemainingTime);
    const longBreakRemainingTime = useSelector(selectLongBreakRemainingTime);
    const percentRemainingTime = useSelector(selectPercentRemainingTime);

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <CircularProgress
                    size={250}
                    thickness={3}
                    color="secondary"
                    value={100}
                    variant="determinate"
                ></CircularProgress>
            </Box>
            <CircularProgress
                size={250}
                thickness={3}
                variant="determinate"
                value={percentRemainingTime}
            ></CircularProgress>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <Typography variant="h3">
                    {stage === "work"
                        ? workRemainingTime
                        : stage === "short-break"
                        ? shortBreakRemainingTime
                        : longBreakRemainingTime}
                </Typography>
                <Typography mt="1rem" variant="h5">
                    {stage === "work" ? "Focus" : "Relax"}
                </Typography>
            </Box>
        </Box>
    );
};

export { Timer };
