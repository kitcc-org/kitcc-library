import { ScrollArea, SimpleGrid } from '@mantine/core';
import { GetLoans200LoansItem } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import NoLoanComponent from './NoLoansComponent';
import LoanCard from './LoanCard';
import { displayLoanAtom } from '~/stores/loanAtom';
import LoanSelectedDialog from './LoanSelectedDialog';

interface LoanCardsProps {
	handleReturnButtonClick: () => void;
}

const LoanCards = ({ handleReturnButtonClick }: LoanCardsProps) => {
	const [loans] = useAtom(displayLoanAtom);
	if (loans.length === 0) return <NoLoanComponent />;

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
						<LoanCard key={loan.id} id={loan.id} thumbnail={loan.thumbnail} />
					))}
				</SimpleGrid>
			</ScrollArea>
			<LoanSelectedDialog handleReturnButtonClick={handleReturnButtonClick} />
		</>
	);
};

export default LoanCards;
