import { getBooks } from 'orval/kITCCLibraryAPI'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import BookListComponent from '~/components/books/BookListComponent'

export const loader = async () => {
  const response = await getBooks()
  return json({ booksResponse: response })
}

const BooKListPage = () => {
  const { booksResponse } = useLoaderData<typeof loader>()

  return (
    <BookListComponent booksResponse={booksResponse} />
  )
}

export default BooKListPage