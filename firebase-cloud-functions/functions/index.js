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

exports.sendNotifications = functions.database.ref('/messages/{messageId}').onCreate(event => {
  const snapshot = event.data;

  // 通知の詳細
  const text = snapshot.val().text;
  const payload = {
    notification: {
      title: `${snapshot.val().name} posted ${text
        ? 'a message'
        : 'an image'}`,
      body: text
        ? (text.length <= 100
          ? text
          : text.substring(0, 97) + '...')
        : '',
      icon: snapshot.val().photoUrl || '/images/profile_placeholder.png',
      click_action: `https://${functions.config().firebase.authDomain}`
    }
  };

  // Firebaseリアルタイムデータベースからすべてのユーザのデバイストークンを収集し、それぞれに通知を送信する
  return admin.database().ref('fcmTokens').once('value').then(allTokens => {
    if (allTokens.val()) {
      // 全てのトークンをリストにする
      const tokens = Object.keys(allTokens.val());

      // すべてのトークンに通知を送信する
      return admin.messaging().sendToDevice(tokens, payload).then(response => {

        // 各メッセージについて、エラーがあったかどうかをチェックする
        // ユーザーから取得したトークンがブラウザやデバイスで使用されていない場合にエラーが発生する
        // たとえば、ユーザーがブラウザセッションの通知許可を取り消した場合など
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.error('Failure sending notification to', tokens[index], error);
            // 登録されていないトークンをクリーンアップする
            if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
              tokensToRemove.push(allTokens.ref.child(tokens[index]).remove());
            }
          }
        });
        return Promise.all(tokensToRemove);
      });
    }
  });
});