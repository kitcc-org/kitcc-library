import { Title } from '@mantine/core'

interface BookDetailTitleProps {
  title: string
}

const BookDetailTitle = ({ title }: BookDetailTitleProps) => {
  return (
    <Title order={1}>{title}</Title>
  )
}

export default BookDetailTitle