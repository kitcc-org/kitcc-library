export const generateHash = async (password: string) => {
	const data = new TextEncoder().encode(password);
	const digest = await crypto.subtle.digest('SHA-256', data);
	const array = [...new Uint8Array(digest)];
	const hexString = array
		.map((b) => {
			return b.toString(16).padStart(2, '0');
		})
		.join('');

	return hexString;
};
