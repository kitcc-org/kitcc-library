import { Badge, Blockquote, Group, rem, Stack, Text } from '@mantine/core';
import { getLoansResponse } from 'client/client';
import { MdError } from 'react-icons/md';

interface BookDetailBorrowerProps {
	loansResponse?: getLoansResponse;
}

const BookDetailBorrower = ({ loansResponse }: BookDetailBorrowerProps) => {
	return (
		<Stack gap="sm" align="stretch" justify="flex-start">
			<Text fz={rem(18)}>借りている人</Text>
			{!loansResponse || loansResponse.status !== 200 ? (
				<Blockquote color="red" icon={<MdError />} mt="xl">
					データの取得に失敗しました
				</Blockquote>
			) : (
				<Group gap={rem(7)}>
					{loansResponse.data.loans.map(
						(loan) =>
							loan.users && (
								<Badge
									key={`${loan.loans?.userId}-${loan.loans?.bookId}`}
									variant="light"
									color="rgba(0, 0, 0, 1)"
									size="lg"
								>
									{loan.users.name}
								</Badge>
							),
					)}
				</Group>
			)}
		</Stack>
	);
};

export default BookDetailBorrower;
