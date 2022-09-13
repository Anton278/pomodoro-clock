export const normalizeTime = (time: number) => {
    // this function convert minutes into human-readable format
    let seconds: number | string = time * 60;
    let minutes: number | string = Math.trunc(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds %= 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return `${minutes} : ${seconds}`;
};
