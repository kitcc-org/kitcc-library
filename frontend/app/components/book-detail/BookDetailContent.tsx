import { Stack } from "@mantine/core";
import { Book } from "client/client.schemas";
import { useAtom } from "jotai";
import { userAtom } from "~/stores/userAtom";
import BookDetailBorrower from "./BookDetailBorrower";
import BookDetailContentTable from "./BookDetailContentTable";
import BookDetailDescription from "./BookDetailDescription";
import BookDetailTitle from "./BookDetailTitle";

interface BookDetailComponentProps {
  book: Book;
}

const BookDetailContent = ({ book }: BookDetailComponentProps) => {
  const [user] = useAtom(userAtom);
  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="flex-start"
      gap="xl"
    >
      <BookDetailTitle title={book.title} />
      <BookDetailContentTable book={book} />
      <BookDetailDescription description={book.description} />
      {!!user && <BookDetailBorrower />}
    </Stack>
  );
};

export default BookDetailContent;
