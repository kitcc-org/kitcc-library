import { TextInput } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'

interface SearchIsbnFormProps {
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
}

const SearchIsbnForm = ({ form }: SearchIsbnFormProps) => {
  return (
    <TextInput
      label="ISBN"
      placeholder="13桁のISBNを入力"
      key={form.key('isbn')}
      {...form.getInputProps('isbn')}
    />
  )
}

export default SearchIsbnForm