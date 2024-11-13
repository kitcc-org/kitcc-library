import { Checkbox, Group } from '@mantine/core';
import { useAtom } from 'jotai';
import type { SelectedBookProps } from '~/stores/bookAtom';
import { cartAtom, selectedCartBooksAtom } from '~/stores/cartAtom';
import CartCardNumberInput from './CartCardNumberInput';

interface CartCardHeaderProps {
	id: number;
	stock: number;
	title: string;
	volume: number;
	thumbnail?: string;
}

const CartCardHeader = ({
	id,
	stock,
	title,
	volume,
	thumbnail,
}: CartCardHeaderProps) => {
	const [cart, setCart] = useAtom(cartAtom);
	const [selectedCartBook, setSelectedCartBook] = useAtom(
		selectedCartBooksAtom,
	);

	// 該当する本のvolumeを変更する
	const handleChangeVolume = (id: number, value: number) => {
		setCart(
			cart.map((element) => {
				if (element.id === id) {
					return {
						id: element.id,
						stock: element.stock,
						title: element.title,
						thumbnail: element.thumbnail,
						volume: value,
					};
				}
				return element;
			}),
		);
	};

	//  選択されている本のIDと表示する本のIDを比較する関数
	const selectedCheck = (element: SelectedBookProps) => element.id === id;

	const selectedBookAdd = () => {
		// チェックボックスの状態が変化した時に
		if (selectedCartBook.some(selectedCheck)) {
			// すでに選択されていた場合は選択を外す
			setSelectedCartBook(
				selectedCartBook.filter((element) => element.id !== id),
			);
		} else {
			// 選択されていなかった場合は選択する
			setSelectedCartBook([
				...selectedCartBook,
				{ id, stock, title, thumbnail, volume: 1 },
			]);
		}
	};

	return (
		<Group justify="space-between" py={10}>
			<Checkbox
				value={id}
				checked={selectedCartBook.some(selectedCheck)}
				onChange={selectedBookAdd}
			/>
			<CartCardNumberInput
				id={id}
				stock={stock}
				volume={volume}
				handleChangeVolume={handleChangeVolume}
			/>
		</Group>
	);
};

export default CartCardHeader;
