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
export const getBooksQueryPageRegExp = new RegExp('^\\d+$');
export const getBooksQueryLimitRegExp = new RegExp('^\\d+$');
export const getBooksQueryIsbnRegExp = new RegExp('^\\d{13}$');


export const getBooksQueryParams = zod.object({
  "page": zod.string().min(1).regex(getBooksQueryPageRegExp).optional(),
  "limit": zod.string().min(1).regex(getBooksQueryLimitRegExp).optional(),
  "title": zod.string().optional(),
  "author": zod.string().optional(),
  "publisher": zod.string().optional(),
  "isbn": zod.string().regex(getBooksQueryIsbnRegExp).optional()
})

export const getBooksResponseIsbnRegExp = new RegExp('^\\d{13}$');


export const getBooksResponseItem = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "author": zod.array(zod.string()),
  "publisher": zod.string(),
  "thumbnail": zod.string().url().optional(),
  "isbn": zod.string().regex(getBooksResponseIsbnRegExp),
  "stock": zod.number()
})
export const getBooksResponse = zod.array(getBooksResponseItem)


/**
 * @summary 書籍を追加する
 */
export const createBookBodyIsbnRegExp = new RegExp('^\\d{13}$');


export const createBookBody = zod.object({
  "title": zod.string(),
  "author": zod.array(zod.string()),
  "publisher": zod.string(),
  "thumbnail": zod.string().optional(),
  "isbn": zod.string().regex(createBookBodyIsbnRegExp),
  "stock": zod.number()
})


/**
 * @summary 特定の書籍の情報を取得する
 */
export const getBookPathBookIdRegExp = new RegExp('^\\d+$');


export const getBookParams = zod.object({
  "bookId": zod.string().regex(getBookPathBookIdRegExp)
})

export const getBookResponseIsbnRegExp = new RegExp('^\\d{13}$');


export const getBookResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "author": zod.array(zod.string()),
  "publisher": zod.string(),
  "thumbnail": zod.string().url().optional(),
  "isbn": zod.string().regex(getBookResponseIsbnRegExp),
  "stock": zod.number()
})


/**
 * リクエストボディで指定された情報のみ更新する． 書籍が登録済みの場合は蔵書数を+1する．

 * @summary 特定の書籍の情報を更新する
 */
export const updateBookPathBookIdRegExp = new RegExp('^\\d+$');


export const updateBookParams = zod.object({
  "bookId": zod.string().regex(updateBookPathBookIdRegExp)
})

export const updateBookBodyIsbnRegExp = new RegExp('^\\d{13}$');


export const updateBookBody = zod.object({
  "title": zod.string().optional(),
  "author": zod.array(zod.string()).optional(),
  "publisher": zod.string().optional(),
  "isbn": zod.string().regex(updateBookBodyIsbnRegExp).optional(),
  "stock": zod.number().optional()
})

export const updateBookResponseIsbnRegExp = new RegExp('^\\d{13}$');


export const updateBookResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "author": zod.array(zod.string()),
  "publisher": zod.string(),
  "thumbnail": zod.string().url().optional(),
  "isbn": zod.string().regex(updateBookResponseIsbnRegExp),
  "stock": zod.number()
})


/**
 * @summary 特定の書籍を削除する
 */
export const deleteBookPathBookIdRegExp = new RegExp('^\\d+$');


export const deleteBookParams = zod.object({
  "bookId": zod.string().regex(deleteBookPathBookIdRegExp)
})


/**
 * @summary 書籍を検索する
 */
export const searchBooksQueryPageRegExp = new RegExp('^\\d+$');
export const searchBooksQueryLimitRegExp = new RegExp('^\\d+$');
export const searchBooksQueryIsbnRegExp = new RegExp('^\\\\d{13}$');


export const searchBooksQueryParams = zod.object({
  "page": zod.string().min(1).regex(searchBooksQueryPageRegExp).optional(),
  "limit": zod.string().min(1).regex(searchBooksQueryLimitRegExp).optional(),
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
export const getUsersQueryPageRegExp = new RegExp('^\\d+$');
export const getUsersQueryLimitRegExp = new RegExp('^\\d+$');


export const getUsersQueryParams = zod.object({
  "page": zod.string().min(1).regex(getUsersQueryPageRegExp).optional(),
  "limit": zod.string().min(1).regex(getUsersQueryLimitRegExp).optional()
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
  "name": zod.string(),
  "email": zod.string().email(),
  "password": zod.string()
})


/**
 * @summary 特定のユーザーの情報を取得する
 */
export const getUserPathUserIdRegExp = new RegExp('^\\d+$');


export const getUserParams = zod.object({
  "userId": zod.string().regex(getUserPathUserIdRegExp)
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
export const updateUserPathUserIdRegExp = new RegExp('^\\d+$');


export const updateUserParams = zod.object({
  "userId": zod.string().regex(updateUserPathUserIdRegExp)
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
export const deleteUserPathUserIdRegExp = new RegExp('^\\d+$');


export const deleteUserParams = zod.object({
  "userId": zod.string().regex(deleteUserPathUserIdRegExp)
})


/**
 * 指定された条件に合致する貸出履歴を返す
 * @summary 貸出履歴を取得する
 */
export const getLoansQueryUserIdRegExp = new RegExp('^\\d+$');
export const getLoansQueryBookIdRegExp = new RegExp('^\\d+$');
export const getLoansQueryPageRegExp = new RegExp('^\\d+$');
export const getLoansQueryLimitRegExp = new RegExp('^\\d+$');


export const getLoansQueryParams = zod.object({
  "userId": zod.string().regex(getLoansQueryUserIdRegExp).optional(),
  "bookId": zod.string().regex(getLoansQueryBookIdRegExp).optional(),
  "page": zod.string().min(1).regex(getLoansQueryPageRegExp).optional(),
  "limit": zod.string().min(1).regex(getLoansQueryLimitRegExp).optional()
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
  "userId": zod.number(),
  "bookId": zod.number(),
  "volume": zod.number().min(1)
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
  "userId": zod.number(),
  "bookId": zod.number(),
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
  "email": zod.string().email(),
  "password": zod.string()
})

export const loginResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "passwordDigest": zod.string().optional()
})


