import { FC, useRef } from "react";
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
import { useSelector } from "react-redux";
import {
    selectLongBreakTime,
    selectShortBreakTime,
    selectTotalSessionsAmount,
    selectWorkTime,
} from "../../redux/timer/selectors";

import { selectAudioSrc } from "../../redux/audio/selectors";
import { setAudioSrc } from "../../redux/audio/slice";

interface IAudio {
    path: string;
    name: string;
}

const SettingsPage: FC = () => {
    const dispatch = useAppDispatch();
    const workTime = useSelector(selectWorkTime);
    const shortBreakTime = useSelector(selectShortBreakTime);
    const longBreakTime = useSelector(selectLongBreakTime);
    const totalSessionsAmount = useSelector(selectTotalSessionsAmount);
    const audioSrc = useSelector(selectAudioSrc);
    const audio = useRef<HTMLAudioElement>(new Audio(audioSrc));

    const audios: IAudio[] = [
        { path: "/audios/long.mp3", name: "Long" },
        { path: "/audios/retro-alarm.mp3", name: "Retro Alarm" },
        { path: "/audios/short.mp3", name: "Short" },
    ];

    const onSelectChange = (e: any) => {
        audio.current.pause();
        dispatch(setAudioSrc(e.target.value));
        audio.current = new Audio(e.target.value);
        audio.current.play();
    };

    return (
        <Container maxWidth="xs">
            <Box mt="1rem" mb="2rem">
                <Typography>Work time</Typography>
                <Slider
                    aria-label="Work time"
                    value={workTime}
                    step={1}
                    min={5}
                    max={60}
                    marks={sliderMarks.workTime}
                    valueLabelDisplay="auto"
                    onChange={(e: any) => dispatch(setWorkTime(e.target.value))}
                />
            </Box>
            <Box mb="2rem">
                <Typography>Short break duration</Typography>
                <Slider
                    aria-label="Short break duration"
                    value={shortBreakTime}
                    step={1}
                    min={1}
                    max={30}
                    marks={sliderMarks.shortBreak}
                    valueLabelDisplay="auto"
                    onChange={(e: any) =>
                        dispatch(setShortBreakTime(e.target.value))
                    }
                />
            </Box>
            <Box mb="2rem">
                <Typography>Long break duration</Typography>
                <Slider
                    aria-label="Long break duration"
                    value={longBreakTime}
                    step={1}
                    min={1}
                    max={45}
                    marks={sliderMarks.longBreak}
                    valueLabelDisplay="auto"
                    onChange={(e: any) =>
                        dispatch(setLongBreakTime(e.target.value))
                    }
                />
            </Box>
            <Box mb="2rem">
                <Typography>Sessions amount</Typography>
                <Slider
                    aria-label="Sessions amount"
                    value={totalSessionsAmount}
                    step={1}
                    min={2}
                    max={15}
                    marks={sliderMarks.rounds}
                    valueLabelDisplay="auto"
                    onChange={(e: any) =>
                        dispatch(setTotalSessionsAmount(e.target.value))
                    }
                />
            </Box>
            <Box mb="1rem">
                <FormControl fullWidth>
                    <InputLabel>Notification sound</InputLabel>
                    <Select
                        label="notification-sound"
                        value={audioSrc}
                        onChange={onSelectChange}
                    >
                        {audios.map((audio: IAudio) => (
                            <MenuItem value={audio.path} key={audio.name}>
                                {audio.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Container>
    );
};

export { SettingsPage };
