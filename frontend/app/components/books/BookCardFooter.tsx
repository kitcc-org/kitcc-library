import { Center } from '@mantine/core'
import BookCardCartButton from './BookCardCartButton'

interface BookCardFooterProps {
  id: number
  stock: number
}

const BookCardFooter = ({ id, stock }: BookCardFooterProps) => {
  return (
    <Center
      pt={10}
    >
      <BookCardCartButton id={id} stock={stock} />
    </Center>
  )
}

export default BookCardFooter