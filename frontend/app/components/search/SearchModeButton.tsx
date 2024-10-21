import { Button } from '@mantine/core'
import React from 'react'

interface SearchModeButtonProps {
  isOpen: boolean
  open: () => void
  close: () => void
}

const SearchModeButton = ({ isOpen, open, close }: SearchModeButtonProps) => {
  return (
    isOpen ? <Button onClick={close}>検索モードを閉じる</Button> : <Button onClick={open}>検索モードを開く</Button>
  )
}

export default SearchModeButton