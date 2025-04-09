const displayType = {
	LIST: '목록',
	CHART: '차트',
} as const;

type DisplayType<T> = T[keyof T];
type DisplayValues = DisplayType<typeof displayType>;

export type { DisplayType, DisplayValues };
export { displayType };
