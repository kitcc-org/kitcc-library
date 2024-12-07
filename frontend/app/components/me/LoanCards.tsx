import { ScrollArea, SimpleGrid } from '@mantine/core';
import { useAtom } from 'jotai';
import { displayLoanAtom } from '~/stores/loanAtom';
import LoanCard from './LoanCard';
import LoanSelectedDialog from './LoanSelectedDialog';
import NoLoanComponent from './NoLoansComponent';

const LoanCards = () => {
	const [loans] = useAtom(displayLoanAtom);
	if (loans.length === 0) {
		return <NoLoanComponent />;
	}

	return (
		<>
			<ScrollArea h="70dh">
				<SimpleGrid
					type="container"
					cols={{
						base: 2,
						'500px': 3,
						'800px': 4,
						'1100px': 5,
						'1400px': 6,
						'1700px': 7,
					}}
					// 画面幅が300pxを超えた場合、カードの間をxlにする
					spacing={{ base: 10, '300px': 'xl' }}
				>
					{loans.map((loan) => (
						<LoanCard key={loan.id} loan={loan} />
					))}
				</SimpleGrid>
			</ScrollArea>
			<LoanSelectedDialog />
		</>
	);
};

export default LoanCards;
