import { Checkbox, Group } from '@mantine/core';
import { useAtom } from 'jotai';
import CartCardNumberInput from '~/routes/home.cart/components/CartCardNumberInput';
import type { CartProps } from '~/stores/cartAtom';
import { displayLoanAtom, selectedLoanAtom } from '~/stores/loanAtom';

interface LoanCardHeaderProps {
	id: number;
}

const LoanCardHeader = ({ id }: LoanCardHeaderProps) => {
	const [selectedLoan, setSelectedLoan] = useAtom(selectedLoanAtom);
	const [displayLoan, setDisplayLoan] = useAtom(displayLoanAtom);

	//  選択されている本のIDと表示する本のIDを比較する関数
	const isSelected = (element: CartProps) => element.id === id;

	// 該当する本のvolumeを変更する
	const handleVolumeChange = (id: number, value: number) => {
		setDisplayLoan(
			displayLoan.map((element) => {
				if (element.id === id) {
					return {
						...element,
						volume: value,
					};
				}
				return element;
			}),
		);
		const target = selectedLoan.find(isSelected);
		if (target) {
			setSelectedLoan(
				selectedLoan.map((element) => {
					if (element.id === id) {
						return {
							...element,
							volume: value,
						};
					}
					return element;
				}),
			);
		}
	};

	const switchLoanSelect = () => {
		const target = displayLoan.find(isSelected);
		if (target) {
			// チェックボックスの状態が変化した時に
			if (selectedLoan.some(isSelected)) {
				// すでに選択されていた場合は選択を外す
				setSelectedLoan(selectedLoan.filter((element) => element.id !== id));
			} else {
				// 選択されていなかった場合は選択する
				setSelectedLoan([...selectedLoan, target]);
			}
		}
	};

	return (
		<Group justify="space-between" py={10}>
			<Checkbox
				value={id}
				checked={selectedLoan.some(isSelected)}
				onChange={switchLoanSelect}
			/>
			<CartCardNumberInput
				id={id}
				stock={displayLoan.find(isSelected)?.stock || 1}
				volume={displayLoan.find(isSelected)?.volume || 1}
				handleVolumeChange={handleVolumeChange}
			/>
		</Group>
	);
};

export default LoanCardHeader;
