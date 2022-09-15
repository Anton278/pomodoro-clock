import { RootState } from "../store";

export const selectAudioSrc = (state: RootState) => state.audio.audioSrc;
