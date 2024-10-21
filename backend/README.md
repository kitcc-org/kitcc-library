## 動作確認の手順

```bash
# パッケージのインストール
pnpm install

# マイグレーションの実行
pnpm run db:mig:apply

# サンプルデータの追加
file=user.sql pnpm run db:seed
file=book.sql pnpm run db:seed
file=loan.sql pnpm run db:seed

# ローカルサーバの起動
pnpm run dev

# Drizzle Studioの起動
pnpm run db:studio
```

## pnpm

パッケージの一括インストール

```
pnpm install
```

パッケージの追加

```
pnpm add [-D] <pkg>
```

パッケージの削除

```
pnpm remove <pkg>
```

ローカルサーバの起動

```
pnpm run dev
```

テストの実行

```
pnpm run test
```

本番環境へのデプロイ

```
pnpm run deploy
```

## wrangler

### d1

```
npx wrangler d1 execute <database_name> (--command=<query> | --file=*.sql)
```

## drizzle-orm

マイグレーションのロールバック

```
pnpm drizzle-kit drop
```
