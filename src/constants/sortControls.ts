const control = { '최신 순': 'desc', '오래된 순': 'asc' } as const;

type ControlKeys = keyof typeof control;
type ControlValues = (typeof control)[ControlKeys];

const controls: ControlKeys[] = ['최신 순', '오래된 순'];

export type { ControlKeys, ControlValues };
export { control, controls };
