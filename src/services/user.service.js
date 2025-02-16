const users = [
	{
		id: 1,
		firstName: "John",
		age: 30,
	},
];
function getUser(id) {
	return users.find((user) => user.id === parseInt(id));
}

function postUser(user) {
	users.push(user);
}

export { getUser, postUser };
