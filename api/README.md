## ディレクトリ構造
```
api
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

APIの仕様を1つのYAMLファイルにまとめる
```
$ npm run bundle
```
