import { TextInput } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'

interface SearchAuthorFormProps {
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
}

const SearchAuthorForm = ({ form }: SearchAuthorFormProps) => {
  return (
    <TextInput
      label="筆者"
      placeholder="例：竹岡尚三"
      key={form.key('authot')}
      {...form.getInputProps('author')}
    />
  )
}

export default SearchAuthorForm