import { Card } from "@mantine/core";
import { useAtom } from "jotai";
import type { Book } from "orval/client.schemas";
import { userAtom } from "~/stores/userAtom";
import BookCardFooter from "./BookCardFooter";
import BookCardHeader from "./BookCardHeader";
import BookCardThumbnail from "./BookCardThumbnail";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const [user] = useAtom(userAtom);
  return (
    <Card shadow="sm" radius="md" pb="xs" withBorder>
      <Card.Section withBorder inheritPadding>
        <BookCardHeader id={book.id} stock={book.stock} />
      </Card.Section>
      <Card.Section withBorder inheritPadding py="xs">
        <BookCardThumbnail id={book.id} thumbnail={book.thumbnail} />
      </Card.Section>

      {!!user && <BookCardFooter id={book.id} stock={book.stock} />}
    </Card>
  );
};

export default BookCard;
