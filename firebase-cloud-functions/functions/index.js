// Cloud FunctionsとFirebase Admin modulesをimportする

// Google Cloud Functions用のFirebase SDKをimportする
const functions = require('firebase-functions');

// Firebase Admin SDKをインポートして初期化する
const admin = require('firebase-admin');
// Firebase Admin SDKはCloud Functionsにデプロイすると自動的に設定できる
admin.initializeApp(functions.config().firebase);

// チャットアプリでユーザーが初めてログインしたときに実行される関数を追加する
// ユーザーを歓迎するチャットメッセージを追加する
// Firebaseアプリケーションで初めてユーザがサインインするたびに実行されるfunctions.auth().onCreateを利用する
exports.addWelcomeMessages = functions.auth.user().onCreate(event => {
  const user = event.data;
  console.log('A new user signed in for the first time.');
  const fullName = user.displayName || 'Anonymous';

  // 新しいウェルカムメッセージをデータベースに保存する
  // それがチャットクライアントに表示される
  return admin.database().ref('messages').push({
    name: 'Firebase Bot',
    photoUrl: '/images/firebase-logo.png', // Firebase logo
    text: `${fullName} signed in for the first time! Welcome!` // Using back-ticks.
  }).then(() => console.log('Welcome message written to database.'));
});

// TODO(DEVELOPER): Write the addWelcomeMessages Function here.

// TODO(DEVELOPER): Write the blurOffensiveImages Function here.

// TODO(DEVELOPER): Write the sendNotifications Function here.
