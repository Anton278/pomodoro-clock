interface IMark {
    value: number;
    label: string;
}

interface ISliderMarks {
    workTime: IMark[];
    shortBreak: IMark[];
    longBreak: IMark[];
    rounds: IMark[];
}

export const sliderMarks: ISliderMarks = {
    workTime: [
        {
            value: 5,
            label: "5 min",
        },
        {
            value: 25,
            label: "25 min",
        },
        {
            value: 60,
            label: "60 min",
        },
    ],
    shortBreak: [
        {
            value: 1,
            label: "1 min",
        },
        {
            value: 5,
            label: "5 min",
        },
        {
            value: 30,
            label: "30 min",
        },
    ],
    longBreak: [
        {
            value: 1,
            label: "1 min",
        },
        {
            value: 20,
            label: "20 min",
        },
        {
            value: 45,
            label: "45 min",
        },
    ],
    rounds: [
        {
            value: 2,
            label: "2",
        },
        {
            value: 4,
            label: "4",
        },
        {
            value: 15,
            label: "15",
        },
    ],
};
