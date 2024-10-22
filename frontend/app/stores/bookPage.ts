import { atom } from "jotai";

interface BookPageProps {
  auther: string
  title: string
  publisher: string
  isbn: string
  page: number
  limit: number
}

export const initialBookPage: BookPageProps = {
  auther: '',
  title: '',
  publisher: '',
  isbn: '',
  page: 1,
  limit: 10
}


