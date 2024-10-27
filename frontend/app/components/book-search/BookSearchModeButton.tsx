import { Button } from '@mantine/core';

interface SearchModeButtonProps {
	isOpen: boolean;
	open: () => void;
	close: () => void;
}

const BookSearchModeButton = ({
	isOpen,
	open,
	close,
}: SearchModeButtonProps) => {
	if (isOpen)
		return (
			<Button id="search-mode-button" onClick={close} variant="light">
				検索条件を閉じる
			</Button>
		);
	return (
		<Button id="search-mode-button" onClick={open} variant="light">
			検索条件を開く
		</Button>
	);
};

export default BookSearchModeButton;
