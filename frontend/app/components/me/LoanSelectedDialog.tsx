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
				<Button fz="sm" color="red" onClick={handleReturnButtonClick}>
					返却する
				</Button>
				<Button
					fz="sm"
					color="blue"
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
