# Express with Cloud Functions

Cloud Functions で Express を利用するサンプル。

## セットアップ（ローカルでアプリケーションを起動できるまで）

```bash
$ cd functions; npm install; cd -
```

## ローカルでアプリケーションを起動

```bash
$ firebase serve --only hosting,functions
```

`http://localhost:5000`にアプリケーションが起動する。

- `http://localhost:5000`にアクセスすれば、`public/index.html`が表示される。
- `http://localhost:5000/hello`にアクセスすれば、Express が返した HTTP レスポンス（Hello Express!）が表示される。

## なぜ`http://localhost:5000/hello`にアクセスしたら Express が HTTP レスポンスを返すのか。

それを理解するために`firebase.json`と`src/index.js`を見ていく。

### `firebase.json`

ホスティングの設定ファイル。

```
{
  "hosting": {
    // Firebase Hosting にデプロイするディレクトリ
    "public": "public",
    // リライトの設定。リライトを設定すれば以下のようなことができる。
    // - 複数の URL で同じコンテンツを表示する
    // - パターンに一致する URL を受け取って、クライアント側コードで表示内容を決定する
    "rewrites": [
      {
        // function を指定することで、Firebase Hosting の URL から Cloud Functions を提供できる
        // 今回の場合、存在しないファイルまたはディレクトリへのリクエストに対して`express`関数を実行する
        "source": "**",
        "function": "express"
      }
    ]
  }
}
```

`rewrites`を指定しているので、`http://localhost:5000`以外にアクセスしたら、`express`関数が実行される。

この`express`関数は`functions/index.js`で定義されている`express`関数のこと。

### `functions/index.js`

以下の`exports.express`で定義している関数が実行される。

```js
'use strict';

const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello Express!');
});

// functions.https.onRequest を利用すれば、HTTP リクエスト経由で関数を呼び出せる。
// 今回、引数に app（Express アプリケーション）が渡しているので
// HTTP リクエストが発生したら、Express アプリケーションが動作するイメージ。
exports.express = functions.https.onRequest(app);
```

そのため、今回`http://localhost:5000/hello`にアクセスしたら

- 1. `functions.https.onRequest(app)`が実行される。
- 2. 引数に渡している`app`（Express アプリケーション）が実行される
- 3. `app`にはルーティング`app.get('/hello'...`が定義されているため、`http://localhost:5000/hello`のアクセスがあれば、`res.send('Hello Express!');`を実行する
- 4. 画面に「Hello Express!」が表示される。
