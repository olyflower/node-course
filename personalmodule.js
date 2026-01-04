function getMessage(username) {
	let greeting = "";
	let time = new Date();
	let currentHour = time.getHours();

	if (currentHour >= 5 && currentHour < 12) {
		greeting = "Good morning";
	} else if (currentHour >= 12 && currentHour < 18) {
		greeting = "Good afternoon";
	} else if (currentHour >= 18 && currentHour < 23) {
		greeting = "Good evening";
	} else {
		greeting = "Good night";
	}

	return `Date of request: ${time}\n${greeting}, ${username}`;
}
