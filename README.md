# KITCC Library

![frontend vitest](https://github.com/kitcc-org/kitcc-library/actions/workflows/frontend_vitest.yml/badge.svg)
![backend vitest](https://github.com/kitcc-org/kitcc-library/actions/workflows/backend_vitest.yml/badge.svg)
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
  - [ ] ユーザー一覧
  - [ ] ユーザー追加
  - [ ] ユーザー編集
  - [ ] ユーザー削除
- 認証機能
  - [x] ログイン
  - [x] ログアウト
- カート機能
  - [x] カートに追加
  - [ ] カートから削除
  - [ ] カートの中身を確認
- 貸出履歴管理
  - [ ] 貸出
  - [ ] 返却

## 使用技術

### フロントエンド

- TypeScript
- [Remix][Remix]
- [Mantine][Mantine]
- [Jotai][Jotai]
- [Vitest][Vitest]
- [React Testing Library][RTL]
- [MSW][MSW]

### バックエンド

- TypeScript
- [Hono][Hono]
- [Drizzle ORM][Drizzle]
- [Vitest][Vitest]

### データベース

- [Cloudflare D1][D1]

### インフラ

- [Cloudflare Pages][Pages]
- [Cloudflare Workers][Workers]

### CI/CD

- GitHub Actions

### 開発ツール

- [Orval][Orval]
- [ESLint][ESLint]
- [Prettier][Prettier]
- [Husky][Husky]
- lint-staged

## ER 図

![ER図](https://github.com/user-attachments/assets/ee0d581a-ed7f-4957-b00a-30f6de454055)
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
[Vitest]: https://vitest.dev/
[Workers]: https://developers.cloudflare.com/workers/
