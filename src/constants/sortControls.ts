type SortOption = keyof typeof control;
type SortValue = (typeof control)[SortOption];

const control = { asc: '오래된 순', desc: '최신 순' } as const;
const controls: Array<SortOption> = ['asc', 'desc'];

export type { SortOption, SortValue };
export { control, controls };
