import { FC } from "react";
import { sliderMarks } from "./sliderMarks";
import {
    Box,
    Typography,
    Slider,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import {
    setWorkTime,
    setShortBreakTime,
    setLongBreakTime,
    setTotalSessionsAmount,
} from "../../redux/timer/slice";
import { useAppDispatch } from "../../redux/store";
import { normalizeMinutes } from "../../utils/normalizeMinutes";

const SettingsPage: FC = () => {
    const { workTime, shortBreak, longBreak, rounds } = sliderMarks;
    const dispatch = useAppDispatch();

    return (
        <Container maxWidth="xs">
            <Box mt="1rem" mb="2rem">
                <Typography>Work time</Typography>
                <Slider
                    aria-label="Work time"
                    defaultValue={25}
                    step={1}
                    min={5}
                    max={60}
                    marks={workTime}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(_, value) => {
                        if (typeof value === "number") {
                            dispatch(setWorkTime(value));
                        }
                    }}
                />
            </Box>
            <Box mb="2rem">
                <Typography>Short break duration</Typography>
                <Slider
                    aria-label="Short break duration"
                    defaultValue={5}
                    step={1}
                    min={1}
                    max={30}
                    marks={shortBreak}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(_, value) => {
                        if (typeof value === "number") {
                            dispatch(setShortBreakTime(value));
                        }
                    }}
                />
            </Box>
            <Box mb="2rem">
                <Typography>Long break duration</Typography>
                <Slider
                    aria-label="Long break duration"
                    defaultValue={20}
                    step={1}
                    min={1}
                    max={45}
                    marks={longBreak}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(_, value) => {
                        if (typeof value === "number") {
                            dispatch(setLongBreakTime(value));
                        }
                    }}
                />
            </Box>
            <Box mb="2rem">
                <Typography>Sessions amount</Typography>
                <Slider
                    aria-label="Rounds"
                    defaultValue={4}
                    step={1}
                    min={2}
                    max={15}
                    marks={rounds}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(_, value) => {
                        if (typeof value === "number") {
                            dispatch(setTotalSessionsAmount(value));
                        }
                    }}
                />
            </Box>
            <Box mb="1rem">
                <FormControl fullWidth>
                    <InputLabel id="notification-sound">
                        Notification sound
                    </InputLabel>
                    <Select
                        labelId="notification-sound"
                        label="notification-sound"
                    >
                        <MenuItem value="melody">Melody</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Container>
    );
};

export { SettingsPage };
