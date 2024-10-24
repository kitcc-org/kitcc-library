import { ScrollArea, SimpleGrid } from "@mantine/core";
import { useAtom } from "jotai";
import { Book } from "orval/client.schemas";
import { noUser, userAtom } from "~/stores/userAtom";
import BookCard from "./BookCard";
import BookSelectedDialog from "./BookSelectedDialog";
import NoBookComponent from "./NoBookComponent";

interface BookCardsProps {
  books: Book[];
}

const BookCards = ({ books }: BookCardsProps) => {
  const [user, _] = useAtom(userAtom);
  if (books.length === 0) return <NoBookComponent />;

  return (
    <>
      <ScrollArea h="70dh">
        <SimpleGrid
          type="container"
          cols={{
            base: 1,
            "500px": 3,
            "800px": 4,
            "1100px": 5,
            "1400px": 6,
            "1700px": 7,
          }}
          spacing={{ base: 10, "300px": "xl" }}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </SimpleGrid>
      </ScrollArea>
      {user !== noUser && <BookSelectedDialog />}
    </>
  );
};

export default BookCards;
