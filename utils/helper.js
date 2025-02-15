export const sleep = (time) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`In Timeout: ${time}`);
			resolve();
		}, time);
	});
};

export const getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
};

export const getRandomIntInclusive = (min, max) => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};
