import { FC } from "react";
import { Stack, Fab } from "@mui/material";
import { useTimer } from "../../hooks/useTimer";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const TimerButtons: FC = () => {
    const timer = useTimer();

    return (
        <Stack
            direction="row"
            spacing="1rem"
            justifyContent="center"
            alignItems="center"
            my="1rem"
        >
            <Fab size="medium" onClick={() => timer.restart()}>
                <RestartAltIcon />
            </Fab>
            {timer.status === "idle" ? (
                <Fab
                    color="primary"
                    onClick={() => {
                        timer.start();
                    }}
                >
                    <PlayArrowIcon />
                </Fab>
            ) : (
                <Fab color="primary" onClick={() => timer.stop()}>
                    <PauseIcon />
                </Fab>
            )}
            <Fab size="medium" onClick={() => timer.skip()}>
                <SkipNextIcon />
            </Fab>
        </Stack>
    );
};

export { TimerButtons };
