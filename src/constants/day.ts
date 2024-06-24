const today: Date = new Date();

const yearOfToday = today.getFullYear();

const monthOfToday = today.getMonth() + 1;

const months: number[] = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const years: number[] = Array.from({ length: 4 }, (_, idx) => (idx === 0 ? yearOfToday : yearOfToday - idx));

export { months, years, today, yearOfToday, monthOfToday };
