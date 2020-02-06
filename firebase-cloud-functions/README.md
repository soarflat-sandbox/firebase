# Cloud Functions for Firebase

[Cloud Functions for Firebase](https://codelabs.developers.google.com/codelabs/firebase-cloud-functions/#0)

Google Cloud Functions を利用して[チャット](../firebase-web)を改善する。

- Firebase SDK を使用して Google Cloud Functions を作成する。
- Auth、Cloud Storage、および Realtime Database イベントに基づいて Cloud Functions をトリガーする。
- Web アプリケーションに Firebase Cloud Messaging サポートを追加する。

**このサンプルを動かすためには Firebase プロジェクトを作成後、以下の設定を変更する必要がある。**

- FireStore を Datastore モードからネイティブモードに変更する
- Google アカウントによる認証を有効にする

## Firebase CLI

### Firebase CLI のインストール

```bash
$ npm -g install firebase-tools
```

インストールが成功すれば、以下のコマンドでバージョンが出力される。

```bash
$ firebase --version
7.12.1 # バージョンが出力
```

### Firebase CLI の認証

以下のコマンドでブラウザでログイン画面が立ち上がる。

```bash
$ firebase login
```

ログインしたアカウントを選択し、Firebase CLI との連携を許可すれば認証が完了する。

### プロジェクトエイリアスを追加する

プロジェクトエイリアスを利用すれば、１つのディレクトリに複数の Firebase プロジェクトを関連付けることができる。

そのため、１つのディレクトリにステージング（`staging`）と本番環境（`production`）用の Firebase プロジェクトを関連付けると言った使い方ができる。

プロジェクトエイリアスを追加するためには、以下のコマンドを実行する。

```bash
$ firebase use --add
# エイリアスを追加したいプロジェクトを選択する
? Which project do you want to add? (Use arrow keys)
❯ project1
  project2
  project3
# エイリアスの名前を指定する
? What alias do you want to use for this project? (e.g. staging) staging
```

上記の場合、`project1`という名前の Firebase プロジェクトに`staging`というエイリアスを追加している。

エイリアスを追加すると、`.firebaserc`というファイルが生成される。

このファイルには以下のように、ディレクトリがどのプロジェクトのエイリアスに紐づいているのかが記述されている。

```json
{
  "projects": {
    // エイリアス名: Firebase プロジェクト名
    "staging": "project1"
  }
}
```

定義されているプロジェクトエイリアスは以下のコマンドでも確認できる。

```bash
$ firebase use
```

プロジェクトエイリアスを変更したい場合は、以下のコマンドを実行する。

```bash
$ firebase use [エイリアス名]
# staging エイリアスに変更したい場合は firebase use staging
```

特定のエイリアスの削除したい場合は、以下のコマンドを実行する。

```bash
$ firebase use --unalias [エイリアス名]
# staging エイリアスに変更したい場合は firebase use staging
```

## アプリケーションのデプロイ

以下のコマンドでアプリケーションをデプロイする。

```shell
$ firebase deploy --except functions
```

`--except`オプションでデプロイするターゲットを除外できる。今回は`functions`（Cloud Functions for Firebase）以外がデプロイされる。

`--except`オプションはドキュメントにはなかったが、`--help`オプションで使い方を確認できる。

```shell
$ firebase deploy --help
Usage: firebase deploy [options]

deploy code and assets to your Firebase project

Options:
  # 省略...
  --except <targets>       deploy to all targets except specified (e.g. "database")
  -h, --help               output usage information
```

### firebase.json
