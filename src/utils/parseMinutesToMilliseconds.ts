export const parseMinutesToMilliseconds = (time: string) => {
    /* */
    const minutes = Number(time.split(" : ")[0]);
    const seconds = Number(time.split(" : ")[1]);
    return minutes * 60 * 1000 + seconds * 1000;
};
