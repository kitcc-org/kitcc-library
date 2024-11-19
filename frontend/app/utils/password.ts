export const generatePassword = () => {
	let password = '';
	const checkPassword = (element: string) =>
		element.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(element);

	while (!checkPassword(password)) {
		password = Math.random().toString(36).substring(2);
	}

	return password;
};
