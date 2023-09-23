const months: number[] = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const years: number[] = [2023, 2022, 2021, 2020];

const today: Date = new Date();

const yearOfToday = today.getFullYear();

const monthOfToday = today.getMonth() + 1;

export { months, years, today, yearOfToday, monthOfToday };
