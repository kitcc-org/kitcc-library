/**
 * Generated by orval v7.2.0 🍺
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
export const getBooksQueryPageRegExp = new RegExp('^[1-9]\\d*$');
export const getBooksQueryLimitRegExp = new RegExp('^[1-9]\\d*$');
export const getBooksQueryIsbnRegExp = new RegExp('^\\d{10}(\\d{3})?$');


export const getBooksQueryParams = zod.object({
  "page": zod.string().min(1).regex(getBooksQueryPageRegExp).optional(),
  "limit": zod.string().min(1).regex(getBooksQueryLimitRegExp).optional(),
  "title": zod.string().optional(),
  "author": zod.string().optional(),
  "publisher": zod.string().optional(),
  "isbn": zod.string().regex(getBooksQueryIsbnRegExp).optional(),
  "sort": zod.enum(['0', '1', '2', '3']).optional()
})

export const getBooksResponseBooksItemIsbnRegExp = new RegExp('^\\d{10}(\\d{3})?$');


export const getBooksResponse = zod.object({
  "totalBook": zod.number(),
  "books": zod.array(zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "authors": zod.array(zod.string()),
  "publisher": zod.string(),
  "publishedDate": zod.string(),
  "description": zod.string(),
  "thumbnail": zod.string().url().optional(),
  "isbn": zod.string().regex(getBooksResponseBooksItemIsbnRegExp),
  "stock": zod.number()
}))
})


/**
 * @summary 書籍を追加する
 */
export const createBookBodyIsbnRegExp = new RegExp('^\\d{10}(\\d{3})?$');


export const createBookBody = zod.object({
  "title": zod.string(),
  "authors": zod.array(zod.string()),
  "publisher": zod.string(),
  "publishedDate": zod.string(),
  "description": zod.string(),
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

export const getBookResponseIsbnRegExp = new RegExp('^\\d{10}(\\d{3})?$');


export const getBookResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "authors": zod.array(zod.string()),
  "publisher": zod.string(),
  "publishedDate": zod.string(),
  "description": zod.string(),
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

export const updateBookBodyIsbnRegExp = new RegExp('^\\d{10}(\\d{3})?$');


export const updateBookBody = zod.object({
  "title": zod.string().optional(),
  "authors": zod.array(zod.string()).optional(),
  "publisher": zod.string().optional(),
  "publishedDate": zod.string().optional(),
  "isbn": zod.string().regex(updateBookBodyIsbnRegExp).optional(),
  "stock": zod.number().optional()
})

export const updateBookResponseIsbnRegExp = new RegExp('^\\d{10}(\\d{3})?$');


export const updateBookResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "authors": zod.array(zod.string()),
  "publisher": zod.string(),
  "publishedDate": zod.string(),
  "description": zod.string(),
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
export const searchBooksQueryPageRegExp = new RegExp('^[1-9]\\d*$');
export const searchBooksQueryLimitMax = 40;

export const searchBooksQueryLimitRegExp = new RegExp('^[1-9]\\d*$');
export const searchBooksQueryIsbnRegExp = new RegExp('^\\d{10}(\\d{3})?$');


export const searchBooksQueryParams = zod.object({
  "page": zod.string().min(1).regex(searchBooksQueryPageRegExp).optional(),
  "limit": zod.string().min(1).max(searchBooksQueryLimitMax).regex(searchBooksQueryLimitRegExp).optional(),
  "keyword": zod.string().optional(),
  "intitle": zod.string().optional(),
  "inauthor": zod.string().optional(),
  "inpublisher": zod.string().optional(),
  "isbn": zod.string().regex(searchBooksQueryIsbnRegExp).optional()
})

export const searchBooksResponse = zod.object({
  "totalBook": zod.number(),
  "books": zod.array(zod.object({
  "title": zod.string(),
  "authors": zod.array(zod.string()),
  "publisher": zod.string().optional(),
  "publishedDate": zod.string().optional(),
  "description": zod.string().optional(),
  "thumbnail": zod.string().optional(),
  "isbn": zod.string().optional()
}))
})


/**
 * ページ番号が指定されなかった場合は1ページ目を返す
 * @summary ユーザーの情報を取得する
 */
export const getUsersQueryPageRegExp = new RegExp('^[1-9]\\d*$');
export const getUsersQueryLimitRegExp = new RegExp('^[1-9]\\d*$');


export const getUsersQueryParams = zod.object({
  "page": zod.string().min(1).regex(getUsersQueryPageRegExp).optional(),
  "limit": zod.string().min(1).regex(getUsersQueryLimitRegExp).optional(),
  "name": zod.string().optional(),
  "email": zod.string().email().optional()
})

export const getUsersResponse = zod.object({
  "totalUser": zod.number(),
  "users": zod.array(zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "sessionToken": zod.string().nullish()
}))
})


/**
 * @summary ユーザーを追加する
 */
export const createUserBodyPasswordMin = 8;

export const createUserBodyPasswordRegExp = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$');


export const createUserBody = zod.object({
  "name": zod.string(),
  "email": zod.string().email(),
  "password": zod.string().min(createUserBodyPasswordMin).regex(createUserBodyPasswordRegExp)
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
  "sessionToken": zod.string().nullish()
})


/**
 * リクエストボディに含まれている情報のみ更新する
 * @summary 特定のユーザーの情報を更新する
 */
export const updateUserPathUserIdRegExp = new RegExp('^\\d+$');


export const updateUserParams = zod.object({
  "userId": zod.string().regex(updateUserPathUserIdRegExp)
})

export const updateUserBodyPasswordMin = 8;

export const updateUserBodyPasswordRegExp = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$');


export const updateUserBody = zod.object({
  "name": zod.string().optional(),
  "email": zod.string().email().optional(),
  "password": zod.string().min(updateUserBodyPasswordMin).regex(updateUserBodyPasswordRegExp).optional()
})

export const updateUserResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "sessionToken": zod.string().nullish()
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
export const getLoansQueryPageRegExp = new RegExp('^[1-9]\\d*$');
export const getLoansQueryLimitRegExp = new RegExp('^[1-9]\\d*$');


export const getLoansQueryParams = zod.object({
  "userId": zod.string().regex(getLoansQueryUserIdRegExp).optional(),
  "bookId": zod.string().regex(getLoansQueryBookIdRegExp).optional(),
  "page": zod.string().min(1).regex(getLoansQueryPageRegExp).optional(),
  "limit": zod.string().min(1).regex(getLoansQueryLimitRegExp).optional(),
  "sort": zod.enum(['0', '1', '2', '3', '4', '5']).optional()
})

export const getLoansResponseLoansItemBooksIsbnRegExp = new RegExp('^\\d{10}(\\d{3})?$');


export const getLoansResponse = zod.object({
  "totalLoan": zod.number(),
  "loans": zod.array(zod.object({
  "loans": zod.object({
  "userId": zod.number(),
  "bookId": zod.number(),
  "volume": zod.number(),
  "createdAt": zod.number().optional(),
  "updatedAt": zod.number().optional()
}).optional(),
  "users": zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "sessionToken": zod.string().nullish()
}).optional(),
  "books": zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "authors": zod.array(zod.string()),
  "publisher": zod.string(),
  "publishedDate": zod.string(),
  "description": zod.string(),
  "thumbnail": zod.string().url().optional(),
  "isbn": zod.string().regex(getLoansResponseLoansItemBooksIsbnRegExp),
  "stock": zod.number()
}).optional()
}))
})


/**
 * @summary 貸出履歴を更新する
 */
export const upsertLoansBodyItem = zod.object({
  "userId": zod.number(),
  "bookId": zod.number(),
  "volume": zod.number()
})
export const upsertLoansBody = zod.array(upsertLoansBodyItem)

export const upsertLoansResponseItem = zod.object({
  "userId": zod.number(),
  "bookId": zod.number(),
  "volume": zod.number(),
  "createdAt": zod.number().optional(),
  "updatedAt": zod.number().optional()
})
export const upsertLoansResponse = zod.array(upsertLoansResponseItem)


/**
 * セッションIDをCookieに保存する
 * @summary ログインする
 */
export const loginBodyPasswordMin = 8;

export const loginBodyPasswordRegExp = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$');


export const loginBody = zod.object({
  "email": zod.string().email(),
  "password": zod.string().min(loginBodyPasswordMin).regex(loginBodyPasswordRegExp)
})

export const loginResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string().email(),
  "sessionToken": zod.string().nullish()
})


