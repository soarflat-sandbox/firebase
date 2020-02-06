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
