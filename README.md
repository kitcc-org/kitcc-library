# KITCC Library

![frontend vitest](https://github.com/kitcc-org/kitcc-library/actions/workflows/frontend-vitest.yml/badge.svg)
![backend vitest](https://github.com/kitcc-org/kitcc-library/actions/workflows/backend-vitest.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-yellow)

KITCC が所有する書籍を管理する Web アプリ

- [アプリのリンク](https://kitcc-library-web.pages.dev/)
- [API 仕様書](https://kitcc-library-api-doc.pages.dev/)

## 機能一覧

- 蔵書管理
  - [x] 蔵書検索
  - [x] グローバル検索
  - [x] 蔵書追加
  - [x] 蔵書編集
  - [x] 蔵書削除
- ユーザー管理
  - [x] ユーザー一覧
  - [x] ユーザー追加
  - [x] ユーザー編集
  - [x] ユーザー削除
- 認証機能
  - [x] ログイン
  - [x] ログアウト
- カート機能
  - [x] カートに追加
  - [x] カートから削除
  - [x] カートの中身を確認
- 貸出履歴管理
  - [x] 貸出
  - [x] 返却

## 使用技術

| カテゴリ       | 技術                                                                                                                                                     |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| フロントエンド | [TypeScript][TS] , [Remix][Remix] , [TanStack Query][TSQ] , [Mantine][Mantine] , [Jotai][Jotai] , [Vitest][Vitest] , [Testing Library][RTL] , [MSW][MSW] |
| バックエンド   | [TypeScript][TS] , [Hono][Hono] , [Zod][Zod] , [Drizzle][Drizzle] , [Vitest][Vitest]                                                                     |
| データベース   | [D1][D1]                                                                                                                                                 |
| インフラ       | [Pages][Pages] , [Workers][Workers]                                                                                                                      |
| CI/CD          | [GitHub Actions][Actions]                                                                                                                                |
| 開発ツール     | [Orval][Orval] , [ESLint][ESLint] , [Prettier][Prettier] , [Husky][Husky] , [lint-staged][lint-staged]                                                   |

## ER 図

![ER図](https://github.com/user-attachments/assets/6b9cc0ed-4be6-43d3-9b81-179ae72b0acd)

## ワイヤーフレーム

[Miro のリンク](https://miro.com/app/board/uXjVKhyZcq4=/?share_link_id=764975652044)

[Actions]: https://github.co.jp/features/actions
[ESLint]: https://eslint.org/
[D1]: https://developers.cloudflare.com/d1/
[Drizzle]: https://orm.drizzle.team/
[Hono]: https://hono.dev/
[Husky]: https://typicode.github.io/husky/
[Jotai]: https://jotai.org/
[lint-staged]: https://www.npmjs.com/package/lint-staged
[Mantine]: https://mantine.dev/
[MSW]: https://mswjs.io/
[Orval]: https://orval.dev/
[Pages]: https://developers.cloudflare.com/pages/
[Prettier]: https://prettier.io/
[RTL]: https://testing-library.com/docs/react-testing-library/intro/
[Remix]: https://remix.run/
[TSQ]: https://tanstack.com/query/latest
[TS]: https://www.typescriptlang.org/
[Vitest]: https://vitest.dev/
[Workers]: https://developers.cloudflare.com/workers/
[Zod]: https://zod.dev/
