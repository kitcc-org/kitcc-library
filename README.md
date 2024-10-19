# KITCC Library

[API仕様書](https://kitcc-library-api-doc.pages.dev/)

## Orval

OpenAPIからzodのスキーマを生成する
```
npx orval [--config <config.js>]
```

## Prism

Prismのインストール
```
npm install -g @stoplight/prism-cli
```

モックサーバの起動
```
prism mock ./api/openapi.yml
```
