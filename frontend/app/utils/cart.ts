import { SelectedBookProps } from '~/stores/bookAtom';
import { CartProps } from '~/stores/cartAtom';

export const addBooksToCart = (
	cart: CartProps[],
	books: SelectedBookProps[],
) => {
	for (const book of books) {
		const index = cart.findIndex((cartBook) => cartBook.id === book.id);
		if (index !== -1) {
			cart[index].volume += 1;
		} else {
			cart.push({
				id: book.id,
				stock: book.stock,
				title: book.title,
				thumbnail: book.thumbnail,
				volume: 1,
			});
		}
	}
	return cart;
};

export const removeBooksFromCart = (cart: CartProps[], books: CartProps[]) => {
	const idList = books.map((book) => book.id);
	return cart.filter((cartBook) => !idList.includes(cartBook.id));
};
