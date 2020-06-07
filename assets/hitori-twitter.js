$(function() {
  // 初期描画
  var tweetArray = [];
  tweetDraw();
  // ツイート入力欄にフォーカスがあたったときの振る舞い
  $("#form textarea").click(function() {
   $(this).addClass("focus");
   $("#form input").show();
  });
  // ツイート送信
  $(document).on("submit", "#form", function() {
   // ツイートの取得
   var tweetText = $("#form textarea").val();
   $("form textarea").val("");
   // ローカルストレージにツイートを追加
   tweetArray.push(tweetText);
   var saveTweet = JSON.stringify(tweetArray)
   localStorage.setItem("tweetsJson", saveTweet);
   // ツイートを描画
   tweetDraw();
   return false;
  });
  // ツイートをすべて削除
  $("#resetBtn").click(function() {
    if (window.confirm("ツイートをすべて削除してもよろしいですか？")) {
      localStorage.removeItem("tweetsJson");
      tweetArray = [];
      tweetDraw();
    }
  });
  // ツイート描画の関数
  function tweetDraw() {
    var tweetHtml = "";
    var tweet = localStorage.getItem("tweetsJson");
    if (tweet) {
      tweetArray = JSON.parse(tweet);
    }
    if (tweetArray.length > 0) {
      var i = tweetArray.length - 1;
      tweetArray.forEach(function() {
        console.log(tweetArray[i]);
        tweetHtml +=
        '<div class="stream-item"><div class="stream-item-header"><img src="assets/img/prof.jpg" width="48" height="48"><span class="full-name">Yuuki Nishiyama</span><span class="user-name">@yuuki_nishiyama</span></div><div class="tweet-text">' +
        tweetArray[i] +
        "</div></div>";
       i--;
      });
      $(".stream").html(tweetHtml);
    } else {
      $(".stream").html("<div class='no-tweet'>ツイートはまだありません</div>");
    }
  }
});