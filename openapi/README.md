## ディレクトリ構造

```
openapi
├── bundle.yml ... APIに仕様を1つにまとめたYAMLファイル
├── components ... 使い回すために部品化された仕様
│   ├── examples
│   ├── responses
│   └── schemas
├── openapi.yml ... エントリーポイント
├── paths       ... 利用可能なエンドポイントとメソッド
└── redocly.yml ... redocly-cliの設定ファイル
```

## CLI

バリデーション

```
$ npm run lint
```

API の仕様を 1 つの YAML ファイルにまとめる

```
$ npm run bundle
```
