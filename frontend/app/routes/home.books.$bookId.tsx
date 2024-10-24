import React from 'react'
import { json } from '@remix-run/cloudflare'
import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getBook, getLoans } from 'orval/client'
import { useLoaderData } from '@remix-run/react'
import BookDetailComponent from '~/components/book-detail/BookDetailComponent'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const bookId = params.bookId ?? ''
  const response = await getBook(bookId)
  return json({ bookResponse: response })
}

const BookDetailPage = () => {
  const { bookResponse } = useLoaderData<typeof loader>()
  return (
    <BookDetailComponent
      bookResponse={bookResponse}
    />
  )
}

export default BookDetailPage