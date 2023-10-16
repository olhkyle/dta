const control = { '오래된 순': 'asc', '최신 순': 'desc' } as const;

type ControlKeys = keyof typeof control;
type ControlValues = (typeof control)[ControlKeys];

const controls: ControlKeys[] = ['오래된 순', '최신 순'];

export type { ControlKeys, ControlValues };
export { control, controls };
