import BookSearchModeButton from './BookSearchModeButton'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'
import BookSearchForm from './BookSearchForm'

interface BookSearchComponentProps {
  isOpen: boolean
  open: () => void
  close: () => void
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
  handleSubmit: (props: GetBooksParams) => void
}

const BookSearchComponent = ({
  isOpen,
  open,
  close,
  form,
  handleSubmit
}: BookSearchComponentProps) => {
  return (
    <>
      <BookSearchModeButton isOpen={isOpen} open={open} close={close} />
      <BookSearchForm isOpen={isOpen} form={form} handleSubmit={handleSubmit} />
    </>
  )
}

export default BookSearchComponent