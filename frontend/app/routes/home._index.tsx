import { getBooks } from 'orval/client'
import { json } from '@remix-run/cloudflare'
import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData, useNavigate } from '@remix-run/react'
import BookListComponent from '~/components/books/BookListComponent'
import { useForm } from '@mantine/form'
import { GetBooksParams } from 'orval/client.schemas'
import { useDisclosure } from '@mantine/hooks'
import { useAtom } from 'jotai'
import { selectedBooksAtom } from '~/stores/cartAtom'
import { useEffect } from 'react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') ?? undefined
  const publisher = url.searchParams.get('publisher') ?? undefined
  const isbn = url.searchParams.get('isbn') ?? undefined
  const author = url.searchParams.get('author') ?? undefined
  const page = url.searchParams.get('page') ?? undefined
  const limit = url.searchParams.get('limit') ?? undefined
  const response = await getBooks({ title: title, author: author, publisher: publisher, isbn: isbn, page: page, limit: limit })
  return json({ booksResponse: response, title: title, author: author, publisher: publisher, isbn: isbn, page: page, limit: limit })
}

const BooKListPage = () => {
  const {
    booksResponse,
    title,
    author,
    publisher,
    isbn,
    page,
    limit
  } = useLoaderData<typeof loader>()
  const [opened, { open, close }] = useDisclosure()
  const navigate = useNavigate()
  const [, setSelectedBook] = useAtom(selectedBooksAtom)
  const form = useForm<GetBooksParams>({
    mode: 'uncontrolled',
    initialValues: {
      title: title ?? '',
      author: author ?? '',
      publisher: publisher ?? '',
      isbn: isbn ?? '',
    }
  })

  // 選択中の書籍をリセットする
  useEffect(() => {
    setSelectedBook([])
  }, [])

  const handleSubmit = (props: GetBooksParams) => {
    let url = '/home'
    let initial = true
    if (props.title && props.title !== '') {
      url = (initial === true) ? `${url}?title=${props.title}` : `${url}&title=${props.title}`
      initial = false
    }
    if (props.author && props.author !== '') {
      url = (initial === true) ? `${url}?author=${props.author}` : `${url}&author=${props.author}`
      initial = false
    }
    if (props.publisher && props.publisher !== '') {
      url = (initial === true) ? `${url}?publisher=${props.publisher}` : `${url}&publisher=${props.publisher}`
      initial = false
    }
    if (props.isbn && props.isbn !== '') {
      url = (initial === true) ? `${url}?isbn=${props.isbn}` : `${url}&isbn=${props.isbn}`
      initial = false
    }
    if (limit) {
      url = (initial === true) ? `${url}?limit=${limit}` : `${url}&limit=${limit}`
      initial = false
    }
    navigate(url)
  }

  const handlePaginationChange = (newPage: number) => {
    let url = '/home'
    let initial = true
    if (title) {
      url = (initial === true) ? `${url}?title=${title}` : `${url}&title=${title}`
      initial = false
    }
    if (author) {
      url = (initial === true) ? `${url}?author=${author}` : `${url}&author=${author}`
      initial = false
    }
    if (publisher) {
      url = (initial === true) ? `${url}?publisher=${publisher}` : `${url}&publisher=${publisher}`
      initial = false
    }
    if (isbn) {
      url = (initial === true) ? `${url}?isbn=${isbn}` : `${url}&isbn=${isbn}`
      initial = false
    }
    if (limit) {
      url = (initial === true) ? `${url}?limit=${limit}` : `${url}&limit=${limit}`
      initial = false
    }
    url = (initial === true) ? `${url}?page=${newPage}` : `${url}&page=${newPage}`
    navigate(url)
  }

  const handleLimitChange = (newLimit: number) => {
    let url = '/home'
    let initial = true
    if (title) {
      url = (initial === true) ? `${url}?title=${title}` : `${url}&title=${title}`
      initial = false
    }
    if (author) {
      url = (initial === true) ? `${url}?author=${author}` : `${url}&author=${author}`
      initial = false
    }
    if (publisher) {
      url = (initial === true) ? `${url}?publisher=${publisher}` : `${url}&publisher=${publisher}`
      initial = false
    }
    if (isbn) {
      url = (initial === true) ? `${url}?isbn=${isbn}` : `${url}&isbn=${isbn}`
      initial = false
    }
    url = (initial === true) ? `${url}?limit=${newLimit}` : `${url}&limit=${newLimit}`
    navigate(url)
  }

  return (
    <BookListComponent
      booksResponse={booksResponse}
      form={form}
      handleSubmit={handleSubmit}
      isOpen={opened}
      open={open}
      close={close}
      handlePaginationChange={handlePaginationChange}
      handleLimitChange={handleLimitChange}
      page={page ? Number(page) : undefined}
      limit={limit ? Number(limit) : undefined}
      totalBook={booksResponse.data.totalBook}
    />
  )
}

export default BooKListPage