export const normalizeMilliseconds = (ms: number): string => {
    let seconds = ms / 1000;
    let minutes: number;
    if (seconds >= 60) {
        minutes = Math.trunc(seconds / 60);
        seconds %= 60;
        if (minutes < 10) {
            if (seconds < 10) {
                return `0${minutes} : 0${seconds}`;
            } else {
                return `0${minutes} : ${seconds}`;
            }
        } else {
            if (seconds < 10) {
                return `${minutes} : 0${seconds}`;
            } else {
                return `${minutes} : ${seconds}`;
            }
        }
    } else {
        if (seconds < 10) {
            return `00 : 0${seconds}`;
        } else {
            return `00 : ${seconds}`;
        }
    }
};
