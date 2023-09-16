const sleep = (waitTime: number) =>
	new Promise(resolve => {
		setTimeout(resolve, waitTime);
	});

export default sleep;
