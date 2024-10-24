import { Collapse } from '@mantine/core'
import FormLayout from '../layouts/FormLayout'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'
import BookSearchTitleForm from './BookSearchTitleForm'
import BookSearchAuthorForm from './BookSearchAuthorForm'
import BookSearchPublisherForm from './BookSearchPublisherForm'
import BookSearchIsbnForm from './BookSearchIsbnForm'
import BookSearchSubmitButton from './BookSearchSubmitButton'

interface SearchFormProps {
  isOpen: boolean
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
  handleSubmit: (props: GetBooksParams) => void
}

const BookSearchForm = ({
  isOpen,
  form,
  handleSubmit
}: SearchFormProps) => {
  return (
    <Collapse in={isOpen}>
      <FormLayout<GetBooksParams>
        form={form}
        handleSubmit={handleSubmit}
      >
        <BookSearchTitleForm form={form} />
        <BookSearchAuthorForm form={form} />
        <BookSearchPublisherForm form={form} />
        <BookSearchIsbnForm form={form} />
        <BookSearchSubmitButton />
      </FormLayout>
    </Collapse>
  )
}

export default BookSearchForm