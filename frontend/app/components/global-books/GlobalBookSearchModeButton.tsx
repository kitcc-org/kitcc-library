import { Button } from '@mantine/core';

interface GlobalSearchModeButtonProps {
	isOpen: boolean;
	open: () => void;
	close: () => void;
}

const GlobalBookSearchModeButton = ({
	isOpen,
	open,
	close,
}: GlobalSearchModeButtonProps) => {
	if (isOpen)
		return (
			<Button
				id="search-mode-button"
				color="lime"
				onClick={close}
				variant="light"
				size="md"
			>
				検索条件を閉じる
			</Button>
		);
	return (
		<Button
			id="search-mode-button"
			color="lime"
			onClick={open}
			variant="light"
			size="md"
		>
			検索条件を開く
		</Button>
	);
};

export default GlobalBookSearchModeButton;
