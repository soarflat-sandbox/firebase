# Firebase

### Firebaseとは
モバイル、及びWebアプリケーション開発プラットフォーム。mBaasとも言われている。

#### mBaasとは
**Mobile backend as a service** の略。モバイルアプリ開発に必要な様々なバックエンドの機能を提供するサービスのこと。あくまでモバイルをメインとしているだけなので、Webアプリケーション開発にも利用できる。

#### 何故Firebase（mBaas）を利用するのか
自分でインフラや機能を用意する必要がないため、以下のメリットがある。

- より手軽にアプリケーションを開発できる（特に個人開発）。
- アプリケーションの開発に集中できるため、実装のコストや工数を削れる。

>Firebase には RealtimeDatabase、FireStore といった Database を始めとして、CloudMessaging(Push通知基盤)、Authentication(認証基盤)といった開発のためのツールがあります。 これらの機能はサービス開発において大抵必要不可欠なものですが、サービスリリースまでの間ではメインの機能に時間を取られ、あまり時間を割くことができない部分になります。

>これらの基盤部分が開発開始時から品質が担保された上で提供されていることで、本来のサービス開発に時間をかけることができ、開発スピード、アプリケーションの品質を高くすることができます。 また作っては壊しといったことを繰り返すリリース前の段階での開発においては、修正の範囲がクライアントのみで済むため非常にコストが低くアプリケーションの改修を行うことができます。

[Cookpad の新規事業と Firebase](http://techlife.cookpad.com/entry/2018/02/09/102554)

### サンプルやチュートリアル
- [Google Codelabsで「firebase」で検索](https://codelabs.developers.google.com/)
- [firebase/quickstart-js](https://github.com/firebase/quickstart-js)

