import { Anchor, Text } from '@mantine/core';

interface GlobalBookDetailLinkProps {
	bookId: number;
}

const GlobalBookDetailLink = ({ bookId }: GlobalBookDetailLinkProps) => {
	return (
		<Text>
			この書籍はすでに登録されています。蔵書の詳細ページは
			<Anchor href={`/home/books/${bookId}`}>こちら</Anchor>
		</Text>
	);
};

export default GlobalBookDetailLink;
