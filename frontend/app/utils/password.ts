const checkPassword = (password: string) => {
	return (
		password.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password)
	);
};

export const generatePassword = () => {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const password = Math.random().toString(36).substring(2);
		if (checkPassword(password)) {
			return password;
		}
	}
};
