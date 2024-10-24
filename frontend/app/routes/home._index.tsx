import { getBooks } from 'orval/client'
import { json } from '@remix-run/cloudflare'
import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData, useNavigate } from '@remix-run/react'
import BookListComponent from '~/components/books/BookListComponent'
import { useForm } from '@mantine/form'
import { GetBooksParams } from 'orval/client.schemas'
import { useDisclosure } from '@mantine/hooks'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') ?? undefined
  const publisher = url.searchParams.get('publisher') ?? undefined
  const isbn = url.searchParams.get('isbn') ?? undefined
  const auther = url.searchParams.get('author') ?? undefined
  const page = url.searchParams.get('page') ?? undefined
  const limit = url.searchParams.get('limit') ?? undefined
  const response = await getBooks({ title: title, author: auther, publisher: publisher, isbn: isbn, page: page, limit: limit })
  return json({ booksResponse: response, title: title, author: auther, publisher: publisher, isbn: isbn, page: page, limit: limit })
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
  const form = useForm<GetBooksParams>({
    mode: 'uncontrolled',
    initialValues: {
      title: title ?? '',
      author: author ?? '',
      publisher: publisher ?? '',
      isbn: isbn ?? '',
    }
  })


  const handleSubmit = (props: GetBooksParams) => {
    let url = '/home'
    let count = 0
    if (props.title !== '') {
      count += 1;
      url = (count === 1) ? `${url}?title=${props.title}` : `${url}&title=${props.title}`
    }
    if (props.author !== '') {
      count += 1;
      url = (count === 1) ? `${url}?author=${props.author}` : `${url}&author=${props.author}`
    }
    if (props.publisher !== '') {
      count += 1;
      url = (count === 1) ? `${url}?publisher=${props.publisher}` : `${url}&publisher=${props.publisher}`
    }
    if (props.isbn !== '') {
      count += 1;
      url = (count === 1) ? `${url}?isbn=${props.isbn}` : `${url}&isbn=${props.isbn}`
    }
    if (limit) {
      count += 1
      url = (count === 1) ? `${url}?limit=${limit}` : `${url}&limit=${limit}`
    }
    url = `${url}#search-mode-button`
    navigate(url)
  }

  const handlePaginationChange = (newPage: number) => {
    let url = '/home'
    let count = 0
    if (title) {
      count += 1
      url = (count === 1) ? `${url}?title=${title}` : `${url}&title=${title}`
    }
    if (author) {
      count += 1;
      url = (count === 1) ? `${url}?author=${author}` : `${url}&author=${author}`
    }
    if (publisher) {
      count += 1;
      url = (count === 1) ? `${url}?publisher=${publisher}` : `${url}&publisher=${publisher}`
    }
    if (isbn) {
      count += 1;
      url = (count === 1) ? `${url}?isbn=${isbn}` : `${url}&isbn=${isbn}`
    }
    if (limit) {
      count += 1
      url = (count === 1) ? `${url}?limit=${limit}` : `${url}&limit=${limit}`
    }
    url = (count === 0) ? `${url}?page=${newPage}` : `${url}&page=${newPage}`
    url = `${url}#search-mode-button`
    navigate(url)
  }

  const handleLimitChange = (newLimit: number) => {
    let url = '/home'
    let count = 0
    if (title) {
      count += 1
      url = (count === 1) ? `${url}?title=${title}` : `${url}&title=${title}`
    }
    if (author) {
      count += 1;
      url = (count === 1) ? `${url}?author=${author}` : `${url}&author=${author}`
    }
    if (publisher) {
      count += 1;
      url = (count === 1) ? `${url}?publisher=${publisher}` : `${url}&publisher=${publisher}`
    }
    if (isbn) {
      count += 1;
      url = (count === 1) ? `${url}?isbn=${isbn}` : `${url}&isbn=${isbn}`
    }
    url = (count === 0) ? `${url}?limit=${newLimit}` : `${url}&limit=${newLimit}`
    url = `${url}#search-mode-button`
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
      page={Number(page)}
      limit={Number(limit)}
      totalBook={booksResponse.data.totalBook}
    />
  )
}

export default BooKListPage