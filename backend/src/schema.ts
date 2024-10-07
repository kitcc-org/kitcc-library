/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * KITCC Library API
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod'


/**
 * ページ番号が指定されなかった場合は1ページ目を返す
 * @summary 書籍の情報を取得する
 */
export const getBooksQueryParams = zod.object({
  "page": zod.number().min(1).optional(),
  "limit": zod.number().min(1).optional()
})

export const getBooksResponseIsbnRegExp = new RegExp('^\\d{13}$');


export const getBooksResponseItem = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "author": zod.array(zod.string()),
  "publisher": zod.string(),
  "thumbnail": zod.string().optional(),
  "isbn": zod.string().regex(getBooksResponseIsbnRegExp),
  "stock": zod.number()
})
export const getBooksResponse = zod.array(getBooksResponseItem)


/**
 * @summary 書籍を追加する
 */
export const createBookBodyIsbnRegExp = new RegExp('^\\d{13}$');


export const createBookBody = zod.object({
  "title": zod.string().optional(),
  "author": zod.string().optional(),
  "publisher": zod.array(zod.string()).optional(),
  "thumbnail": zod.string().optional(),
  "isbn": zod.string().regex(createBookBodyIsbnRegExp).optional(),
  "stock": zod.number().optional()
})


/**
 * @summary 特定の書籍の情報を取得する
 */
export const getBookParams = zod.object({
  "bookId": zod.number()
})

export const getBookResponseIsbnRegExp = new RegExp('^\\d{13}$');


export const getBookResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "author": zod.array(zod.string()),
  "publisher": zod.string(),
  "thumbnail": zod.string().optional(),
  "isbn": zod.string().regex(getBookResponseIsbnRegExp),
  "stock": zod.number()
})


/**
 * リクエストボディで指定された情報のみ更新する
 * @summary 特定の書籍の情報を更新する
 */
export const updateBookParams = zod.object({
  "bookId": zod.number()
})

export const updateBookBody = zod.object({
  "title": zod.string().optional(),
  "author": zod.array(zod.string()).optional(),
  "publisher": zod.string().optional(),
  "stock": zod.number().optional()
})

export const updateBookResponseIsbnRegExp = new RegExp('^\\d{13}$');


export const updateBookResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "author": zod.array(zod.string()),
  "publisher": zod.string(),
  "thumbnail": zod.string().optional(),
  "isbn": zod.string().regex(updateBookResponseIsbnRegExp),
  "stock": zod.number()
})


/**
 * @summary 特定の書籍を削除する
 */
export const deleteBookParams = zod.object({
  "bookId": zod.number()
})


/**
 * @summary 書籍を検索する
 */
export const searchBooksQueryIsbnRegExp = new RegExp('^\\\\d{13}$');


export const searchBooksQueryParams = zod.object({
  "page": zod.number().min(1).optional(),
  "limit": zod.number().min(1).optional(),
  "title": zod.string().optional(),
  "author": zod.string().optional(),
  "publisher": zod.string().optional(),
  "isbn": zod.string().regex(searchBooksQueryIsbnRegExp).optional()
})

export const searchBooksResponseIsbnRegExp = new RegExp('^\\d{13}$');


export const searchBooksResponseItem = zod.object({
  "title": zod.string().optional(),
  "author": zod.array(zod.string()).optional(),
  "publisher": zod.string().optional(),
  "thumbnail": zod.string().optional(),
  "isbn": zod.string().regex(searchBooksResponseIsbnRegExp).optional()
})
export const searchBooksResponse = zod.array(searchBooksResponseItem)


/**
 * ページ番号が指定されなかった場合は1ページ目を返す
 * @summary ユーザーの情報を取得する
 */
export const getUsersQueryParams = zod.object({
  "page": zod.number().min(1).optional(),
  "limit": zod.number().min(1).optional()
})

export const getUsersResponseItem = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "passwordDigest": zod.string().optional()
})
export const getUsersResponse = zod.array(getUsersResponseItem)


/**
 * @summary ユーザーを追加する
 */
export const createUserBody = zod.object({
  "name": zod.string().optional(),
  "email": zod.string().email().optional(),
  "password": zod.string().optional()
})


/**
 * @summary 特定のユーザーの情報を取得する
 */
export const getUserParams = zod.object({
  "userId": zod.number()
})

export const getUserResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "passwordDigest": zod.string().optional()
})


/**
 * リクエストボディに含まれている情報のみ更新する
 * @summary 特定のユーザーの情報を更新する
 */
export const updateUserParams = zod.object({
  "userId": zod.number()
})

export const updateUserBody = zod.object({
  "name": zod.string().optional(),
  "email": zod.string().email().optional(),
  "password": zod.string().optional()
})

export const updateUserResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "passwordDigest": zod.string().optional()
})


/**
 * @summary 特定のユーザーを削除する
 */
export const deleteUserParams = zod.object({
  "userId": zod.number()
})


/**
 * 指定された条件に合致する貸出履歴を返す
 * @summary 貸出履歴を取得する
 */
export const getLoansQueryParams = zod.object({
  "userId": zod.number().optional(),
  "bookId": zod.number().optional(),
  "page": zod.number().min(1).optional(),
  "limit": zod.number().min(1).optional()
})

export const getLoansResponseItem = zod.object({
  "id": zod.number().optional(),
  "userId": zod.number().optional(),
  "bookId": zod.number().optional(),
  "volume": zod.number().optional(),
  "createdAt": zod.string().datetime().optional(),
  "updatedAt": zod.string().datetime().optional()
})
export const getLoansResponse = zod.array(getLoansResponseItem)


/**
 * @summary 貸出履歴を追加する
 */
export const createLoansBodyItem = zod.object({
  "userId": zod.number().optional(),
  "bookId": zod.number().optional(),
  "volume": zod.number().min(1).optional()
})
export const createLoansBody = zod.array(createLoansBodyItem)

export const createLoansResponse = zod.object({
  "id": zod.number().optional(),
  "userId": zod.number().optional(),
  "bookId": zod.number().optional(),
  "volume": zod.number().optional(),
  "createdAt": zod.string().datetime().optional(),
  "updatedAt": zod.string().datetime().optional()
})


/**
 * リクエストボディに含まれている情報のみ更新する
 * @summary 貸出履歴を更新する
 */
export const updateLoansBodyItem = zod.object({
  "userId": zod.number().optional(),
  "bookId": zod.number().optional(),
  "volume": zod.number().optional()
})
export const updateLoansBody = zod.array(updateLoansBodyItem)

export const updateLoansResponse = zod.object({
  "id": zod.number().optional(),
  "userId": zod.number().optional(),
  "bookId": zod.number().optional(),
  "volume": zod.number().optional(),
  "createdAt": zod.string().datetime().optional(),
  "updatedAt": zod.string().datetime().optional()
})


/**
 * セッションIDをCookieに保存する
 * @summary ログインする
 */
export const loginBody = zod.object({
  "email": zod.string().email().optional(),
  "password": zod.string().optional()
})

export const loginResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "passwordDigest": zod.string().optional()
})

