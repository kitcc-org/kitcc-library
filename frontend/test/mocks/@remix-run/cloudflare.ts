export const redirect = vi
	.fn()
	.mockImplementation((url: string, init?: number | ResponseInit) => {
		return null;
	});
