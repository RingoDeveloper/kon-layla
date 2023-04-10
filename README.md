# LaylaMagnolia FanPage kon-layla

## <リリースノート>
### Ver. 0.1.0 [2023/04/02]
・初期バージョン
・Developerモードの実装

### Ver. 0.1.1 [2023/04/06]
・バージョン表記開始
・block APIモードを実装
・その他細かな修正


### Ver. 0.1.2 [2023/04/08]
・ヘッダーを変更
・メニューの実装
・オリジナルロゴ
・フッターの実装
・ハンバーガーメニューの実装
・その他バグ修正
・POTY2022も同様に修正
・タイトルを変更




{
  "kind": "youtube#video",
  "etag": "-CWzT5buxStZ3vYmmzH5fuQAzis",
  "id": "W3F-SEISqRQ",
  "liveStreamingDetails": {
    "actualStartTime": "2023-03-26T16:01:00Z",
    "actualEndTime": "2023-03-26T19:14:28Z",
    "scheduledStartTime": "2023-03-26T16:00:18Z"
  }
}



const values_completed_details = $.ajax({
                    type: 'GET',
                    url: (base_youtube_url_live+videoId_c_string) + '&channelId=UCm-nZofnh3_1s_l2Gq3G1KQ&eventType=completed',
                    datatype: 'json',
                    success: function(json){
                        json.items;
                    },
                    error: function(){
                        Swal.fire({
                            type: "warning",
                            title: "読み込みエラー",
                            html: "ページの読み込みに失敗しました。<br>恐れ入りますが再読み込みをお試しください。<br><br>解決しない場合はお手数ですが、下記リンクよりお問合せください。",
                            footer: '<a href="https://twitter.com/_ringodev_/status/1617468992071008258" target="_blank">エラーを報告する</a>',
                        });
                    }
                    });



decryption('<Du\Nt?^rf-HoqmJ1.nGi,RrBl,\cgTB.+=^i</', owner.length);