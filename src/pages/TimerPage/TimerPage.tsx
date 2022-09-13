import { FC } from "react";
import { Container } from "@mui/material";

import { Timer } from "../../components/Timer";
import { TimerButtons } from "../../components/TimerButtons";
import { SessionCounter } from "../../components/SessionCounter";

const TimerPage: FC = () => {
    return (
        <Container
            sx={{
                height: "calc(100% - 64px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            disableGutters
        >
            <Timer />
            <TimerButtons />
            <SessionCounter />
        </Container>
    );
};

export { TimerPage };
