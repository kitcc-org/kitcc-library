import { Grid, rem, Stack } from "@mantine/core";
import ErrorComponent from "~/components/common/ErrorComponent";

import { getBookResponse } from "client/client";
import BookDetailContent from "./BookDetailContent";
import BookDetailControlPanel from "./BookDetailControlPanel";

interface BookDetailComponentProps {
  bookResponse: getBookResponse;
}

const BookDetailComponent = ({ bookResponse }: BookDetailComponentProps) => {
  switch (bookResponse.status) {
    case 400:
      return <ErrorComponent message="リクエストが不正です" />;
    case 404:
      return <ErrorComponent message="書籍が見つかりませんでした" />;
    case 500:
      return <ErrorComponent message="サーバーエラーが発生しました" />;
  }

  return (
    <Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
      <Grid gutter={rem(50)}>
        <Grid.Col span={3}>
          <BookDetailControlPanel
            id={bookResponse.data.id}
            thumbnail={bookResponse.data.thumbnail}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <BookDetailContent book={bookResponse.data} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default BookDetailComponent;
