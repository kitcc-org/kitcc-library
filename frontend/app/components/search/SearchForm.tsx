import { Collapse } from '@mantine/core'
import FormLayout from '../layouts/FormLayout'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'
import SearchTitleForm from './SearchTitleForm'
import SearchAuthorForm from './SearchAuthorForm'
import SearchPublisherForm from './SearchPublisherForm'
import SearchIsbnForm from './SearchIsbnForm'
import SearchSubmitButton from './SearchSubmitButton'

interface SearchFormProps {
  isOpen: boolean
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
  handleSubmit: (props: GetBooksParams) => void
}

const SearchForm = ({
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
        <SearchTitleForm form={form} />
        <SearchAuthorForm form={form} />
        <SearchPublisherForm form={form} />
        <SearchIsbnForm form={form} />
        <SearchSubmitButton />
      </FormLayout>
    </Collapse>
  )
}

export default SearchForm