import { useState } from 'react';

let id = 0;

const generateId = (prefix = 'ttax-') => {
	id += 1;
	return `${prefix}${id}`;
};

const useId = (prefix?: string) => {
	const [id] = useState(() => generateId(prefix));

	return id;
};

export { generateId, useId };
