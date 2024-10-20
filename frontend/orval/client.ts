/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * KITCC Library API
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  BadRequestResponse,
  Book,
  CreateBookBody,
  CreateUserBody,
  DeleteUser204,
  Error,
  GetBooks200,
  GetBooksParams,
  GetLoans200,
  GetLoansParams,
  GetUsers200,
  GetUsersParams,
  InternalServerErrorResponse,
  Loan,
  LoginBody,
  Logout200,
  NotFoundResponse,
  SearchBooks200,
  SearchBooksParams,
  UnauthorizedResponse,
  UpdateBookBody,
  UpdateUserBody,
  UpsertLoans404,
  UpsertLoans409,
  UpsertLoansBodyItem,
  User
} from './client.schemas'

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;



/**
 * ページ番号が指定されなかった場合は1ページ目を返す
 * @summary 書籍の情報を取得する
 */
export type getBooksResponse = {
  data: GetBooks200;
  status: number;
}

export const getGetBooksUrl = (params?: GetBooksParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  return normalizedParams.size ? `http://localhost:8787/books?${normalizedParams.toString()}` : `http://localhost:8787/books`
}

export const getBooks = async (params?: GetBooksParams, options?: RequestInit): Promise<getBooksResponse> => {
  
  const res = await fetch(getGetBooksUrl(params),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}



export const getGetBooksQueryKey = (params?: GetBooksParams,) => {
    return [`http://localhost:8787/books`, ...(params ? [params]: [])] as const;
    }

    
export const getGetBooksQueryOptions = <TData = Awaited<ReturnType<typeof getBooks>>, TError = BadRequestResponse | InternalServerErrorResponse>(params?: GetBooksParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getBooks>>, TError, TData>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetBooksQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getBooks>>> = ({ signal }) => getBooks(params, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getBooks>>, TError, TData> & { queryKey: QueryKey }
}

export type GetBooksQueryResult = NonNullable<Awaited<ReturnType<typeof getBooks>>>
export type GetBooksQueryError = BadRequestResponse | InternalServerErrorResponse


/**
 * @summary 書籍の情報を取得する
 */

export function useGetBooks<TData = Awaited<ReturnType<typeof getBooks>>, TError = BadRequestResponse | InternalServerErrorResponse>(
 params?: GetBooksParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getBooks>>, TError, TData>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetBooksQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary 書籍を追加する
 */
export type createBookResponse = {
  data: Book;
  status: number;
}

export const getCreateBookUrl = () => {


  return `http://localhost:8787/books`
}

export const createBook = async (createBookBody: CreateBookBody, options?: RequestInit): Promise<createBookResponse> => {
  
  const res = await fetch(getCreateBookUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      createBookBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getCreateBookMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createBook>>, TError,{data: CreateBookBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof createBook>>, TError,{data: CreateBookBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createBook>>, {data: CreateBookBody}> = (props) => {
          const {data} = props ?? {};

          return  createBook(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateBookMutationResult = NonNullable<Awaited<ReturnType<typeof createBook>>>
    export type CreateBookMutationBody = CreateBookBody
    export type CreateBookMutationError = BadRequestResponse | UnauthorizedResponse | InternalServerErrorResponse

    /**
 * @summary 書籍を追加する
 */
export const useCreateBook = <TError = BadRequestResponse | UnauthorizedResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createBook>>, TError,{data: CreateBookBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof createBook>>,
        TError,
        {data: CreateBookBody},
        TContext
      > => {

      const mutationOptions = getCreateBookMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * @summary 特定の書籍の情報を取得する
 */
export type getBookResponse = {
  data: Book;
  status: number;
}

export const getGetBookUrl = (bookId: string,) => {


  return `http://localhost:8787/books/${bookId}`
}

export const getBook = async (bookId: string, options?: RequestInit): Promise<getBookResponse> => {
  
  const res = await fetch(getGetBookUrl(bookId),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}



export const getGetBookQueryKey = (bookId: string,) => {
    return [`http://localhost:8787/books/${bookId}`] as const;
    }

    
export const getGetBookQueryOptions = <TData = Awaited<ReturnType<typeof getBook>>, TError = BadRequestResponse | NotFoundResponse | InternalServerErrorResponse>(bookId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getBook>>, TError, TData>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetBookQueryKey(bookId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getBook>>> = ({ signal }) => getBook(bookId, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(bookId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getBook>>, TError, TData> & { queryKey: QueryKey }
}

export type GetBookQueryResult = NonNullable<Awaited<ReturnType<typeof getBook>>>
export type GetBookQueryError = BadRequestResponse | NotFoundResponse | InternalServerErrorResponse


/**
 * @summary 特定の書籍の情報を取得する
 */

export function useGetBook<TData = Awaited<ReturnType<typeof getBook>>, TError = BadRequestResponse | NotFoundResponse | InternalServerErrorResponse>(
 bookId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getBook>>, TError, TData>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetBookQueryOptions(bookId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * リクエストボディで指定された情報のみ更新する． 書籍が登録済みの場合は蔵書数を+1する．

 * @summary 特定の書籍の情報を更新する
 */
export type updateBookResponse = {
  data: Book;
  status: number;
}

export const getUpdateBookUrl = (bookId: string,) => {


  return `http://localhost:8787/books/${bookId}`
}

export const updateBook = async (bookId: string,
    updateBookBody: UpdateBookBody, options?: RequestInit): Promise<updateBookResponse> => {
  
  const res = await fetch(getUpdateBookUrl(bookId),
  {      
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      updateBookBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getUpdateBookMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateBook>>, TError,{bookId: string;data: UpdateBookBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof updateBook>>, TError,{bookId: string;data: UpdateBookBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateBook>>, {bookId: string;data: UpdateBookBody}> = (props) => {
          const {bookId,data} = props ?? {};

          return  updateBook(bookId,data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateBookMutationResult = NonNullable<Awaited<ReturnType<typeof updateBook>>>
    export type UpdateBookMutationBody = UpdateBookBody
    export type UpdateBookMutationError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse

    /**
 * @summary 特定の書籍の情報を更新する
 */
export const useUpdateBook = <TError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateBook>>, TError,{bookId: string;data: UpdateBookBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof updateBook>>,
        TError,
        {bookId: string;data: UpdateBookBody},
        TContext
      > => {

      const mutationOptions = getUpdateBookMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * @summary 特定の書籍を削除する
 */
export type deleteBookResponse = {
  data: void;
  status: number;
}

export const getDeleteBookUrl = (bookId: string,) => {


  return `http://localhost:8787/books/${bookId}`
}

export const deleteBook = async (bookId: string, options?: RequestInit): Promise<deleteBookResponse> => {
  
  const res = await fetch(getDeleteBookUrl(bookId),
  {      
    ...options,
    method: 'DELETE'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getDeleteBookMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteBook>>, TError,{bookId: string}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof deleteBook>>, TError,{bookId: string}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteBook>>, {bookId: string}> = (props) => {
          const {bookId} = props ?? {};

          return  deleteBook(bookId,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteBookMutationResult = NonNullable<Awaited<ReturnType<typeof deleteBook>>>
    
    export type DeleteBookMutationError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse

    /**
 * @summary 特定の書籍を削除する
 */
export const useDeleteBook = <TError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteBook>>, TError,{bookId: string}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteBook>>,
        TError,
        {bookId: string},
        TContext
      > => {

      const mutationOptions = getDeleteBookMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * @summary 書籍を検索する
 */
export type searchBooksResponse = {
  data: SearchBooks200;
  status: number;
}

export const getSearchBooksUrl = (params?: SearchBooksParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  return normalizedParams.size ? `http://localhost:8787/books/search?${normalizedParams.toString()}` : `http://localhost:8787/books/search`
}

export const searchBooks = async (params?: SearchBooksParams, options?: RequestInit): Promise<searchBooksResponse> => {
  
  const res = await fetch(getSearchBooksUrl(params),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}



export const getSearchBooksQueryKey = (params?: SearchBooksParams,) => {
    return [`http://localhost:8787/books/search`, ...(params ? [params]: [])] as const;
    }

    
export const getSearchBooksQueryOptions = <TData = Awaited<ReturnType<typeof searchBooks>>, TError = BadRequestResponse | InternalServerErrorResponse>(params?: SearchBooksParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof searchBooks>>, TError, TData>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getSearchBooksQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof searchBooks>>> = ({ signal }) => searchBooks(params, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof searchBooks>>, TError, TData> & { queryKey: QueryKey }
}

export type SearchBooksQueryResult = NonNullable<Awaited<ReturnType<typeof searchBooks>>>
export type SearchBooksQueryError = BadRequestResponse | InternalServerErrorResponse


/**
 * @summary 書籍を検索する
 */

export function useSearchBooks<TData = Awaited<ReturnType<typeof searchBooks>>, TError = BadRequestResponse | InternalServerErrorResponse>(
 params?: SearchBooksParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof searchBooks>>, TError, TData>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getSearchBooksQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * ページ番号が指定されなかった場合は1ページ目を返す
 * @summary ユーザーの情報を取得する
 */
export type getUsersResponse = {
  data: GetUsers200;
  status: number;
}

export const getGetUsersUrl = (params?: GetUsersParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  return normalizedParams.size ? `http://localhost:8787/users?${normalizedParams.toString()}` : `http://localhost:8787/users`
}

export const getUsers = async (params?: GetUsersParams, options?: RequestInit): Promise<getUsersResponse> => {
  
  const res = await fetch(getGetUsersUrl(params),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}



export const getGetUsersQueryKey = (params?: GetUsersParams,) => {
    return [`http://localhost:8787/users`, ...(params ? [params]: [])] as const;
    }

    
export const getGetUsersQueryOptions = <TData = Awaited<ReturnType<typeof getUsers>>, TError = BadRequestResponse | InternalServerErrorResponse>(params?: GetUsersParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUsersQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({ signal }) => getUsers(params, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData> & { queryKey: QueryKey }
}

export type GetUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getUsers>>>
export type GetUsersQueryError = BadRequestResponse | InternalServerErrorResponse


/**
 * @summary ユーザーの情報を取得する
 */

export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = BadRequestResponse | InternalServerErrorResponse>(
 params?: GetUsersParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetUsersQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary ユーザーを追加する
 */
export type createUserResponse = {
  data: User;
  status: number;
}

export const getCreateUserUrl = () => {


  return `http://localhost:8787/users`
}

export const createUser = async (createUserBody: CreateUserBody, options?: RequestInit): Promise<createUserResponse> => {
  
  const res = await fetch(getCreateUserUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      createUserBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getCreateUserMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | Error | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createUser>>, TError,{data: CreateUserBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof createUser>>, TError,{data: CreateUserBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createUser>>, {data: CreateUserBody}> = (props) => {
          const {data} = props ?? {};

          return  createUser(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateUserMutationResult = NonNullable<Awaited<ReturnType<typeof createUser>>>
    export type CreateUserMutationBody = CreateUserBody
    export type CreateUserMutationError = BadRequestResponse | UnauthorizedResponse | Error | InternalServerErrorResponse

    /**
 * @summary ユーザーを追加する
 */
export const useCreateUser = <TError = BadRequestResponse | UnauthorizedResponse | Error | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createUser>>, TError,{data: CreateUserBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof createUser>>,
        TError,
        {data: CreateUserBody},
        TContext
      > => {

      const mutationOptions = getCreateUserMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * @summary 特定のユーザーの情報を取得する
 */
export type getUserResponse = {
  data: User;
  status: number;
}

export const getGetUserUrl = (userId: string,) => {


  return `http://localhost:8787/users/${userId}`
}

export const getUser = async (userId: string, options?: RequestInit): Promise<getUserResponse> => {
  
  const res = await fetch(getGetUserUrl(userId),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}



export const getGetUserQueryKey = (userId: string,) => {
    return [`http://localhost:8787/users/${userId}`] as const;
    }

    
export const getGetUserQueryOptions = <TData = Awaited<ReturnType<typeof getUser>>, TError = BadRequestResponse | NotFoundResponse | InternalServerErrorResponse>(userId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUser>>> = ({ signal }) => getUser(userId, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData> & { queryKey: QueryKey }
}

export type GetUserQueryResult = NonNullable<Awaited<ReturnType<typeof getUser>>>
export type GetUserQueryError = BadRequestResponse | NotFoundResponse | InternalServerErrorResponse


/**
 * @summary 特定のユーザーの情報を取得する
 */

export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = BadRequestResponse | NotFoundResponse | InternalServerErrorResponse>(
 userId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetUserQueryOptions(userId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * リクエストボディに含まれている情報のみ更新する
 * @summary 特定のユーザーの情報を更新する
 */
export type updateUserResponse = {
  data: User;
  status: number;
}

export const getUpdateUserUrl = (userId: string,) => {


  return `http://localhost:8787/users/${userId}`
}

export const updateUser = async (userId: string,
    updateUserBody: UpdateUserBody, options?: RequestInit): Promise<updateUserResponse> => {
  
  const res = await fetch(getUpdateUserUrl(userId),
  {      
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      updateUserBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getUpdateUserMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateUser>>, TError,{userId: string;data: UpdateUserBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof updateUser>>, TError,{userId: string;data: UpdateUserBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateUser>>, {userId: string;data: UpdateUserBody}> = (props) => {
          const {userId,data} = props ?? {};

          return  updateUser(userId,data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateUserMutationResult = NonNullable<Awaited<ReturnType<typeof updateUser>>>
    export type UpdateUserMutationBody = UpdateUserBody
    export type UpdateUserMutationError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse

    /**
 * @summary 特定のユーザーの情報を更新する
 */
export const useUpdateUser = <TError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateUser>>, TError,{userId: string;data: UpdateUserBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof updateUser>>,
        TError,
        {userId: string;data: UpdateUserBody},
        TContext
      > => {

      const mutationOptions = getUpdateUserMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * @summary 特定のユーザーを削除する
 */
export type deleteUserResponse = {
  data: DeleteUser204;
  status: number;
}

export const getDeleteUserUrl = (userId: string,) => {


  return `http://localhost:8787/users/${userId}`
}

export const deleteUser = async (userId: string, options?: RequestInit): Promise<deleteUserResponse> => {
  
  const res = await fetch(getDeleteUserUrl(userId),
  {      
    ...options,
    method: 'DELETE'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getDeleteUserMutationOptions = <TError = BadRequestResponse | Error | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError,{userId: string}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError,{userId: string}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteUser>>, {userId: string}> = (props) => {
          const {userId} = props ?? {};

          return  deleteUser(userId,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteUserMutationResult = NonNullable<Awaited<ReturnType<typeof deleteUser>>>
    
    export type DeleteUserMutationError = BadRequestResponse | Error | NotFoundResponse | InternalServerErrorResponse

    /**
 * @summary 特定のユーザーを削除する
 */
export const useDeleteUser = <TError = BadRequestResponse | Error | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError,{userId: string}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteUser>>,
        TError,
        {userId: string},
        TContext
      > => {

      const mutationOptions = getDeleteUserMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * 指定された条件に合致する貸出履歴を返す
 * @summary 貸出履歴を取得する
 */
export type getLoansResponse = {
  data: GetLoans200;
  status: number;
}

export const getGetLoansUrl = (params?: GetLoansParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  return normalizedParams.size ? `http://localhost:8787/loans?${normalizedParams.toString()}` : `http://localhost:8787/loans`
}

export const getLoans = async (params?: GetLoansParams, options?: RequestInit): Promise<getLoansResponse> => {
  
  const res = await fetch(getGetLoansUrl(params),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}



export const getGetLoansQueryKey = (params?: GetLoansParams,) => {
    return [`http://localhost:8787/loans`, ...(params ? [params]: [])] as const;
    }

    
export const getGetLoansQueryOptions = <TData = Awaited<ReturnType<typeof getLoans>>, TError = BadRequestResponse | UnauthorizedResponse | InternalServerErrorResponse>(params?: GetLoansParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getLoans>>, TError, TData>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetLoansQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getLoans>>> = ({ signal }) => getLoans(params, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getLoans>>, TError, TData> & { queryKey: QueryKey }
}

export type GetLoansQueryResult = NonNullable<Awaited<ReturnType<typeof getLoans>>>
export type GetLoansQueryError = BadRequestResponse | UnauthorizedResponse | InternalServerErrorResponse


/**
 * @summary 貸出履歴を取得する
 */

export function useGetLoans<TData = Awaited<ReturnType<typeof getLoans>>, TError = BadRequestResponse | UnauthorizedResponse | InternalServerErrorResponse>(
 params?: GetLoansParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getLoans>>, TError, TData>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetLoansQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary 貸出履歴を更新する
 */
export type upsertLoansResponse = {
  data: Loan[];
  status: number;
}

export const getUpsertLoansUrl = () => {


  return `http://localhost:8787/loans`
}

export const upsertLoans = async (upsertLoansBodyItem: UpsertLoansBodyItem[], options?: RequestInit): Promise<upsertLoansResponse> => {
  
  const res = await fetch(getUpsertLoansUrl(),
  {      
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      upsertLoansBodyItem,)
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getUpsertLoansMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | UpsertLoans404 | UpsertLoans409 | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof upsertLoans>>, TError,{data: UpsertLoansBodyItem[]}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof upsertLoans>>, TError,{data: UpsertLoansBodyItem[]}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof upsertLoans>>, {data: UpsertLoansBodyItem[]}> = (props) => {
          const {data} = props ?? {};

          return  upsertLoans(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpsertLoansMutationResult = NonNullable<Awaited<ReturnType<typeof upsertLoans>>>
    export type UpsertLoansMutationBody = UpsertLoansBodyItem[]
    export type UpsertLoansMutationError = BadRequestResponse | UnauthorizedResponse | UpsertLoans404 | UpsertLoans409 | InternalServerErrorResponse

    /**
 * @summary 貸出履歴を更新する
 */
export const useUpsertLoans = <TError = BadRequestResponse | UnauthorizedResponse | UpsertLoans404 | UpsertLoans409 | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof upsertLoans>>, TError,{data: UpsertLoansBodyItem[]}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof upsertLoans>>,
        TError,
        {data: UpsertLoansBodyItem[]},
        TContext
      > => {

      const mutationOptions = getUpsertLoansMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * セッションIDをCookieに保存する
 * @summary ログインする
 */
export type loginResponse = {
  data: User;
  status: number;
}

export const getLoginUrl = () => {


  return `http://localhost:8787/auth`
}

export const login = async (loginBody: LoginBody, options?: RequestInit): Promise<loginResponse> => {
  
  const res = await fetch(getLoginUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      loginBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getLoginMutationOptions = <TError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof login>>, TError,{data: LoginBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof login>>, TError,{data: LoginBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof login>>, {data: LoginBody}> = (props) => {
          const {data} = props ?? {};

          return  login(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>
    export type LoginMutationBody = LoginBody
    export type LoginMutationError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse

    /**
 * @summary ログインする
 */
export const useLogin = <TError = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof login>>, TError,{data: LoginBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof login>>,
        TError,
        {data: LoginBody},
        TContext
      > => {

      const mutationOptions = getLoginMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * CookieからセッションIDを削除する
 * @summary ログアウトする
 */
export type logoutResponse = {
  data: Logout200;
  status: number;
}

export const getLogoutUrl = () => {


  return `http://localhost:8787/auth`
}

export const logout = async ( options?: RequestInit): Promise<logoutResponse> => {
  
  const res = await fetch(getLogoutUrl(),
  {      
    ...options,
    method: 'DELETE'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getLogoutMutationOptions = <TError = InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError,void, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError,void, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof logout>>, void> = () => {
          

          return  logout(fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type LogoutMutationResult = NonNullable<Awaited<ReturnType<typeof logout>>>
    
    export type LogoutMutationError = InternalServerErrorResponse

    /**
 * @summary ログアウトする
 */
export const useLogout = <TError = InternalServerErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError,void, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof logout>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getLogoutMutationOptions(options);

      return useMutation(mutationOptions);
    }
    