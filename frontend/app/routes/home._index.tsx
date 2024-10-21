import { getBooks } from 'orval/client'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import BookListComponent from '~/components/books/BookListComponent'
import { useForm } from '@mantine/form'
import { GetBooksParams } from 'orval/client.schemas'

export const loader = async () => {
  const response = await getBooks()
  return json({ booksResponse: response })
}

const BooKListPage = () => {
  const { booksResponse } = useLoaderData<typeof loader>()
  const form = useForm<GetBooksParams>()

  return (
    <BookListComponent
      booksResponse={booksResponse}
    />
  )
}

export default BooKListPage