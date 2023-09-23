const sleep = (waitTime: number): Promise<void> =>
	new Promise(resolve => {
		setTimeout(resolve, waitTime);
	});

export default sleep;
