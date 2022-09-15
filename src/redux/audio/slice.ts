import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitState } from "./types";

const initialState: InitState = {
    audioSrc: "/audios/long.mp3",
};

const audio = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setAudioSrc(state, action: PayloadAction<string>) {
            state.audioSrc = action.payload;
        },
    },
});

export const { setAudioSrc } = audio.actions;

export default audio.reducer;
