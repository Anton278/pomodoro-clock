export const calcPercentRemainingTime = (
    remainingTime: number,
    totalTime: number
) => {
    totalTime = totalTime * 60 * 1000;
    return (remainingTime * 100) / totalTime;
};
