import { Button, Dialog, Stack } from '@mantine/core';
import { useAtom } from 'jotai';
import { selectedLoanAtom } from '~/stores/loanAtom';

interface LoanSelectedDialogProps {
	handleReturnButtonClick: () => void;
}

const LoanSelectedDialog = ({
	handleReturnButtonClick,
}: LoanSelectedDialogProps) => {
	const [selectedLoan, setSelectedLoan] = useAtom(selectedLoanAtom);

	return (
		<Dialog
			opened={selectedLoan.length > 0}
			onClose={() => setSelectedLoan([])}
		>
			<Stack
				bg="var(--mantine-color-body)"
				align="stretch"
				justify="center"
				gap="md"
			>
				<Button fz="xs" color="blue" onClick={handleReturnButtonClick}>
					返却する
				</Button>
				<Button
					fz="xs"
					variant="light"
					bd="solid 2px"
					onClick={() => setSelectedLoan([])}
				>
					選択を解除する
				</Button>
			</Stack>
		</Dialog>
	);
};

export default LoanSelectedDialog;
