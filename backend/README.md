## 動作確認の手順

```bash
# パッケージのインストール
pnpm install

# データベースのマイグレーション
pnpm run db:mig:gen
pnpm run db:mig:apply:local

# サンプルデータの追加
file=user.sql pnpm run db:seed:local
file=book.sql pnpm run db:seed:local

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

## drizzle-orm

マイグレーションのロールバック
```
pnpm drizzle-kit drop
```
