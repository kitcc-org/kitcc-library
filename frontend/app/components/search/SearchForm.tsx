import { Collapse } from '@mantine/core'
import FormLayout from '../layouts/FormLayout'
import type { GetBooksParams } from 'orval/client.schemas'

interface SearchFormProps {
  isOpen: boolean

}

const SearchForm = ({ isOpen }: SearchFormProps) => {
  return (
    <Collapse in={isOpen}>
      <FormLayout<GetBooksParams>
        form={form}
        handleSubmit={handleSubmit}
      >

      </FormLayout>
    </Collapse>
  )
}

export default SearchForm