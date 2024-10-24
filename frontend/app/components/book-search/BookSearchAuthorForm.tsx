import { TextInput } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'

interface BookSearchAuthorFormProps {
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
}

const BookSearchAuthorForm = ({ form }: BookSearchAuthorFormProps) => {
  return (
    <TextInput
      label="筆者"
      placeholder="竹岡尚三"
      key={form.key('author')}
      {...form.getInputProps('author')}
    />
  )
}

export default BookSearchAuthorForm