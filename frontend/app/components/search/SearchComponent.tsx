import React from 'react'
import SearchModeButton from './SearchModeButton'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'
import SearchForm from './SearchForm'

interface SearchComponentProps {
  isOpen: boolean
  open: () => void
  close: () => void
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
  handleSubmit: (props: GetBooksParams) => void
}

const SearchComponent = ({
  isOpen,
  open,
  close,
  form,
  handleSubmit
}: SearchComponentProps) => {
  return (
    <>
      <SearchModeButton isOpen={isOpen} open={open} close={close} />
      <SearchForm isOpen={isOpen} form={form} handleSubmit={handleSubmit} />
    </>
  )
}

export default SearchComponent