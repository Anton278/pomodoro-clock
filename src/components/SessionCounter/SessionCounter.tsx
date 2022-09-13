import { FC } from "react";
import { useSelector } from "react-redux";
import {
    selectSessionCounter,
    selectTotalSessionsAmount,
} from "../../redux/timer/selectors";
import { Typography, Box } from "@mui/material";

const SessionCounter: FC = () => {
    const sessionCounter = useSelector(selectSessionCounter);
    const totalSessionsAmount = useSelector(selectTotalSessionsAmount);

    return (
        <Box mt="1.5rem">
            <Typography align="center">
                {sessionCounter} of {totalSessionsAmount}
            </Typography>
            <Typography>sessions</Typography>
        </Box>
    );
};

export { SessionCounter };
