import { Button } from '@mantine/core'
import { FaSearch } from "react-icons/fa";

const BookSearchSubmitButton = () => {
  return (
    <Button
      type='submit'
      leftSection={<FaSearch />}
    >
      検索する。
    </Button>
  )
}

export default BookSearchSubmitButton