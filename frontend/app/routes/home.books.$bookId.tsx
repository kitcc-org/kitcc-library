import { json, redirect } from '@remix-run/cloudflare'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { deleteBook, getBook } from 'orval/client'
import { useLoaderData } from '@remix-run/react'
import BookDetailComponent from '~/components/book-detail/BookDetailComponent'
import { errorNotifications, successNotifications } from '~/utils/notification'
import type { HeadersInit } from '@cloudflare/workers-types'

interface Response {
  method: string
  status: number
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const bookId = params.bookId ?? ''
  const response = await getBook(bookId)
  return json({ bookResponse: response })
}

export const action = async ({ request }: ActionFunctionArgs) => { // delete: 本の削除
  const cookieHeader = request.headers.get('Cookie')
  const formData = await request.formData()
  if (request.method === "DELETE") {
    const bookId = String(formData.get('bookId'))
    const response = await deleteBook(bookId, { headers: { 'Cookie': cookieHeader ?? "" } })
    switch (response.status) {
      case 204:
        successNotifications('削除しました')
        return redirect('/home')
      case 401:
        errorNotifications('ログインしてください')
        return redirect('/auth/login')
      case 404:
        errorNotifications('書籍が見つかりませんでした')
        return redirect('/home')
      case 500:
        errorNotifications('サーバーエラーが発生しました')
        return json<Response>({ method: 'DELETE', status: 500 })
    }
  }

  return null
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