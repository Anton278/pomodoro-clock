export const parseMinutesToNumber = (minutes: string): number => {
    // this function parse human readable minutes
    // into number (e.g. '25 : 00' => 25)
    let res = Number(minutes.split(" : ")[0]);
    return res;
};
