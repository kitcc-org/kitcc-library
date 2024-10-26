import { Stack, Grid, rem } from '@mantine/core'
import ErrorComponent from '~/components/common/ErrorComponent'

import BookDetailContent from './BookDetailContent'
import { getBookResponse } from 'orval/client'
import BookDetailControlPanel from './BookDetailControlPanel'

interface BookDetailComponentProps {
  bookResponse: getBookResponse
}

const BookDetailComponent = ({ bookResponse }: BookDetailComponentProps) => {
  switch (bookResponse.status) {
    case 400:
      return <ErrorComponent message='リクエストが不正です' />
    case 404:
      return <ErrorComponent message='書籍が見つかりません' />
    case 500:
      return <ErrorComponent message='サーバーエラーが発生しました' />
  }

  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify='flex-start'
    >
      <Grid gutter={rem(50)}>
        <Grid.Col span={4}>
          <BookDetailControlPanel thumbnail={bookResponse.data.thumbnail} />
        </Grid.Col>
        <Grid.Col span={8}>
          <BookDetailContent book={bookResponse.data} />
        </Grid.Col>
      </Grid>
    </Stack>
  )
}

export default BookDetailComponent