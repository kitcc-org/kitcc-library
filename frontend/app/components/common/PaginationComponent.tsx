import { Center, Pagination } from '@mantine/core'
import React from 'react'

interface PaginationComponentProps {
  totalNum?: number
  page?: number
  limit?: number
  handlePaginationChange: (newPage: number) => void
}

const PaginationComponent = ({
  totalNum,
  page,
  limit,
  handlePaginationChange
}: PaginationComponentProps) => {
  const limitNum = limit ?? 10
  const totalPage = (totalNum && limit) ? (totalNum / limitNum) + 1 : undefined
  return (
    <Center>
      <Pagination
        total={totalPage ?? 1}
        value={(!page || Number.isNaN(page)) ? 1 : page}
        withEdges
        onChange={handlePaginationChange}
      />
    </Center>
  )
}

export default PaginationComponent