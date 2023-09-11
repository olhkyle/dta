const formatCurrencyUnit = (value: number | undefined) => {
	return value
		?.toString()
		.replace(/,/gi, '')
		.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

const unformatCurrencyUnit = (value: string) => {
	return value.replace(/,/g, '');
};

export { formatCurrencyUnit, unformatCurrencyUnit };
