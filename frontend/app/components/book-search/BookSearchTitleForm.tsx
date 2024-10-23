import { TextInput } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'

interface SearchTitleFormProps {
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
}

const BookSearchTitleForm = ({ form }: SearchTitleFormProps) => {
  return (
    <TextInput
      label="タイトル"
      placeholder="Javaプログラミング徹底マスター"
      key={form.key('title')}
      {...form.getInputProps('title')}
    />
  )
}

export default BookSearchTitleForm