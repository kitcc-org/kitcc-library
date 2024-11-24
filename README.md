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

### フロントエンド

![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6?style=for-the-badge&logo=typescript&logoColor=white)
[![Remix](https://img.shields.io/badge/Remix-%23000000?style=for-the-badge&logo=remix&logoColor=white)][Remix]
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-%23FF4154?style=for-the-badge&logo=reactquery&logoColor=white)][TSQ]
[![Mantine](https://img.shields.io/badge/Mantine-%23339AF0?style=for-the-badge&logo=mantine&logoColor=white)][Mantine]
[![Jotai](https://img.shields.io/badge/Jotai-%23000000?style=for-the-badge&logo=ghostery&logoColor=white)][Jotai]
[![Vitest](https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white)][Vitest]
[![Testing Library](https://img.shields.io/badge/Testing_Library-%23E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)][RTL]
[![MSW](https://img.shields.io/badge/MSW-%23FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white)][MSW]

### バックエンド

![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6?style=for-the-badge&logo=typescript&logoColor=white)
[![Hono](https://img.shields.io/badge/Hono-%23FF6A33?style=for-the-badge&logo=hono&logoColor=white)][Hono]
[![Zod](https://img.shields.io/badge/zod-%233E67B1?style=for-the-badge&logo=zod&logoColor=white)][Zod]
[![Drizzle](https://img.shields.io/badge/Drizzle_ORM-%23C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)][Drizzle]
[![Vitest](https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white)][Vitest]

### データベース

[![D1](https://img.shields.io/badge/Cloudflare_D1-%23F38020?style=for-the-badge&logo=cloudflare&logoColor=white)][D1]

### インフラ

[![Pages](https://img.shields.io/badge/Cloudflare_Pages-%23F38020?style=for-the-badge&logo=cloudflarepages&logoColor=white)][Pages]
[![Workers](https://img.shields.io/badge/Cloudflare_Workers-%23F38020?style=for-the-badge&logo=cloudflareworkers&logoColor=white)][Workers]

### CI/CD

![Actions](https://img.shields.io/badge/GitHub_Actions-%232088FF?style=for-the-badge&logo=githubactions&logoColor=white)

### 開発ツール

[![Orval](https://img.shields.io/badge/Orval-%23683BC1?style=for-the-badge)][Orval]
[![ESLint](https://img.shields.io/badge/ESLint-%234B32C3?style=for-the-badge&logo=eslint&logoColor=white)][ESLint]
[![Prettier](https://img.shields.io/badge/Prettier-%23F7B93E?style=for-the-badge&logo=prettier&logoColor=black)][Prettier]
[![Husky](https://img.shields.io/badge/Husky-black?style=for-the-badge)][Husky]
![lint-staged](https://img.shields.io/badge/lint--staged-%23684730?style=for-the-badge)

## ER 図

![ER図](https://github.com/user-attachments/assets/6b9cc0ed-4be6-43d3-9b81-179ae72b0acd)

[Miro のリンク](https://miro.com/app/board/uXjVKhyZcq4=/?share_link_id=764975652044)

## ワイヤーフレーム

[Miro のリンク](https://miro.com/app/board/uXjVKhyZcq4=/?share_link_id=764975652044)

[ESLint]: https://eslint.org/
[D1]: https://developers.cloudflare.com/d1/
[Drizzle]: https://orm.drizzle.team/
[Hono]: https://hono.dev/
[Husky]: https://typicode.github.io/husky/
[Jotai]: https://jotai.org/
[Mantine]: https://mantine.dev/
[MSW]: https://mswjs.io/
[Orval]: https://orval.dev/
[Pages]: https://developers.cloudflare.com/pages/
[Prettier]: https://prettier.io/
[RTL]: https://testing-library.com/docs/react-testing-library/intro/
[Remix]: https://remix.run/
[TSQ]: https://tanstack.com/query/latest
[Vitest]: https://vitest.dev/
[Workers]: https://developers.cloudflare.com/workers/
[Zod]: https://zod.dev/
