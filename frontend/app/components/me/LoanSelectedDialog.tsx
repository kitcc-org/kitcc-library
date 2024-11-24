import { Button, Dialog, Stack } from '@mantine/core';
import { useSubmit } from '@remix-run/react';
import { useAtom } from 'jotai';
import { selectedLoanAtom } from '~/stores/loanAtom';

const LoanSelectedDialog = () => {
	const [selectedLoan, setSelectedLoan] = useAtom(selectedLoanAtom);

	const submit = useSubmit();

	const handleReturnButtonClick = () => {
		submit(JSON.stringify({ selectedLoan: selectedLoan }), {
			action: '/home/me?index',
			method: 'PATCH',
			encType: 'application/json',
		});
		setSelectedLoan([]);
	};

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
