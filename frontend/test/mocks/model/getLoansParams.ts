/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * KITCC Library API
 * OpenAPI spec version: 1.0.0
 */
import type { GetLoansSort } from './getLoansSort';

export type GetLoansParams = {
/**
 * 貸出履歴を取得するユーザーのID
 */
userId?: string;
/**
 * 貸出履歴を取得する書籍のID
 */
bookId?: string;
/**
 * ページ番号
 */
page?: string;
/**
 * 1ページあたりの表示数
 */
limit?: string;
/**
 * ソート順 0: ユーザID昇順 1: ユーザID降順 2: 書籍ID昇順 3: 書籍ID降順 4: 貸出日昇順 5: 貸出日降順

 */
sort?: GetLoansSort;
};
