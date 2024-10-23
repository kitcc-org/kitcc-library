import { TextInput } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'

interface SearchPublisherFormProps {
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
}

const BookSearchPublisherForm = ({ form }: SearchPublisherFormProps) => {
  return (
    <TextInput
      label="出版社"
      placeholder="例: SOFTBANK"
      key={form.key('publisher')}
      {...form.getInputProps('publisher')}
    />
  )
}

export default BookSearchPublisherForm