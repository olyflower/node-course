export const sleep = (time) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`In Timeout: ${time}`);
			resolve();
		}, time);
	});
};
