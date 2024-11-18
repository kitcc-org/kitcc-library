export const passwordGen = () => {
	let password = '';
	const passwordCheck = (element: string) =>
		element.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(element);

	while (!passwordCheck(password)) {
		password = Math.random().toString(36).substring(2);
	}

	return password;
};
