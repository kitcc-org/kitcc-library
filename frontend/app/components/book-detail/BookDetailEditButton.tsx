import { Button } from '@mantine/core';
import { useLocation, useNavigate } from '@remix-run/react';
import { MdEdit } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';

interface BookDetailEditButtonProps {
	bookId: number;
}

const BookDetailEditButton = ({ bookId }: BookDetailEditButtonProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<>
			{location.pathname.includes('edit') ? (
				<Button
					leftSection={<RiArrowGoBackLine />}
					variant="light"
					fz="lg"
					bd="solid 2px"
					onClick={() => navigate(`/home/books/${bookId}`)}
				>
					キャンセル
				</Button>
			) : (
				<Button
					leftSection={<MdEdit />}
					fz="lg"
					onClick={() => navigate('edit')}
				>
					編集
				</Button>
			)}
		</>
	);
};

export default BookDetailEditButton;
