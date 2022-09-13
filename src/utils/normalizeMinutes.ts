export const normalizeMinutes = (minutes: number): string => {
    if (minutes < 10) {
        return `0${minutes} : 00`;
    } else {
        return `${minutes} : 00`;
    }
};
