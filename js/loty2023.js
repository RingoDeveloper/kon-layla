/* 定数宣言 */
const startDateV1 = new Date('2024-01-01T00:00:00+09:00');
const startDateV2 = new Date('2024-01-08T00:00:00+09:00');
const endDateV2 = new Date('2024-01-15T00:00:00+09:00');
const unavailableClipIds = ["UgkxVF52HRVxAebLJ9SOaXnLyM0lNq6vEbm9", "Ugkx4ZFGWPGYIWYu39mIniZzMkddXJIHfd4H"]

function calculateRemainTime() {
    // 現在の日時を取得
    var now = new Date();
    return targetDate.getTime() - now.getTime();
}

/* 投票期間中かどうか返す関数 */
function checkTerm(termId) {
    var now = new Date();
    if (termId == 1) {
        return (now > startDateV1 && now < startDateV2); //第一回投票期間かどうか？
    } else if (termId == 2) {
        return (now > startDateV2 && now < endDateV2); //第二回投票期間かどうか？
    } else if (termId == 3) {
        return (now > endDateV2);// 投票終了後
    }
}

/* ノミネート表示切り替え */
function nominateItemsController() {
    var nominate_elm = document.getElementById("wrapper-nominate");
    if ((!checkTerm(2)) && (!checkTerm(3))) {
        console.log("delete");
        nominate_elm.remove();
    } else {
        nominate_elm.style.visibility = 'visible';
        if (laylips_nominate.length == 0) { //ノミネートクリップデータの中身が空
            var newElement = document.createElement('p'); // 新しい<p>要素を作成
            newElement.className = 'counting';           // クラスを追加
            newElement.textContent = '集計中';            // テキスト内容を設定

            document.querySelector("#clips-nominate").appendChild(newElement); // 作成した要素を追加
        }
    }
}
nominateItemsController();

/* LOTY 表示切り替え */
function lotyItemsController() {
    var loty_elm = document.getElementById("wrapper-loty");
    if (!checkTerm(3)) {
        console.log("delete");
        loty_elm.remove();
    } else {
        loty_elm.style.visibility = 'visible';
        if (loty.length == 0) { //ノミネートクリップデータの中身が空
            var newElement = document.createElement('p'); // 新しい<p>要素を作成
            newElement.className = 'counting';           // クラスを追加
            newElement.textContent = '集計中';            // テキスト内容を設定

            document.querySelector("#clips-loty").appendChild(newElement); // 作成した要素を追加
        }
    }
}
lotyItemsController();

/* ハンバーガーメニュー開閉ボタン */
function toggleNav() {
    var body = document.body;
    var hamburger = document.getElementById('js-hamburger');
    var blackBg = document.getElementById('js-black-bg');
  
    hamburger.addEventListener('click', function() {
      body.classList.toggle('nav-open');
    });
    blackBg.addEventListener('click', function() {
      body.classList.remove('nav-open');
    });
}
toggleNav();


/* 全クリップを格納(iframeを表示機能つき) */
laylips.forEach(clipData => {
    if (clipData.title && clipData.iframe) {
        // コンテナを作成
        const container = document.createElement('div');
        container.className = 'clip-container';
        container.id = `container_${clipData.clipId}`;
        if (!checkTerm(1)) {
            // サムネイルと再生ボタンを含むHTMLコンテンツ
            container.innerHTML = `
                <div class="thumbnail-container" id="thumbnail_${clipData.clipId}">
                    <img class="thumb-img" src="https://i.ytimg.com/vi/${clipData.videoId}/sddefault.jpg" alt="YouTube Thumbnail">
                </div>
                
                <p class="clip-title">${clipData.title}</p>
                <div class="button-container">
                    <div class="button-play clipbutton">
                        <a onclick="showIframe('${clipData.clipId}', 'all')">再生</a>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
            <div class="thumbnail-container" id="thumbnail_${clipData.clipId}">
                <img class="thumb-img" src="https://i.ytimg.com/vi/${clipData.videoId}/sddefault.jpg" alt="YouTube Thumbnail">
            </div>
            
            <p class="clip-title">${clipData.title}</p>
            <div class="button-container">
                <div class="button-play clipbutton">
                    <a onclick="showIframe('${clipData.clipId}', 'all')">再生</a>
                </div>
                <div class="button-vote clipbutton">
                    <a onclick="vote('${clipData.clipId}', 1)">投票</a>
                </div>
            </div>
        `;
        }
        // コンテナを追加
        document.querySelector('#clips-all').appendChild(container);
    }
});

/* ノミネートクリップを格納(iframeを表示機能つき) */
laylips_nominate.forEach(clipData => {
    if (clipData.title && clipData.iframe) {
        // コンテナを作成
        const container = document.createElement('div');
        container.className = 'clip-container';
        container.id = `container_${clipData.clipId}`;
        if (checkTerm(2)) {
            container.innerHTML = `
                <div class="thumbnail-container" id="thumbnail_${clipData.clipId}_nominate">
                    <img class="thumb-img" src="https://i.ytimg.com/vi/${clipData.videoId}/sddefault.jpg" alt="YouTube Thumbnail">
                </div>
                
                <p class="clip-title">${clipData.title}</p>
                <div class="button-container">
                    <div class="button-play clipbutton">
                        <a onclick="showIframe('${clipData.clipId}', 'nominate')">再生</a>
                    </div>
                    <div class="button-vote clipbutton">
                        <a onclick="vote('${clipData.clipId}', 2)">投票</a>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="thumbnail-container" id="thumbnail_${clipData.clipId}">
                    <img class="thumb-img" src="https://i.ytimg.com/vi/${clipData.videoId}/sddefault.jpg" alt="YouTube Thumbnail">
                </div>
                
                <p class="clip-title">${clipData.title}</p>
                <div class="button-container">
                    <div class="button-play clipbutton">
                        <a onclick="showIframe('${clipData.clipId}', 'nominate')">再生</a>
                    </div>
                </div>
            `;
        }
        
        // コンテナを追加
        document.querySelector('#clips-nominate').appendChild(container);
    }
});

// 再生ボタンがクリックされた時の動作
function showIframe(clipId, erea) {
    // すべてのサムネイルコンテナを取得
    const allThumbnails = document.querySelectorAll('.thumbnail-container');

    // 他のすべてのiframeを元のサムネイル画像に置き換える
    allThumbnails.forEach(thumbnail => {
        // 同一のclipIdを持つサムネイル（ノミネート版と通常版の両方）をサムネイルに戻す
        if (thumbnail.id === `thumbnail_${clipId}_nominate` || thumbnail.id === `thumbnail_${clipId}`) {
            const clipData = laylips.find(clip => clip.clipId === clipId);
            if (clipData) {
                thumbnail.innerHTML = `
                    <img class="thumb-img" src="https://i.ytimg.com/vi/${clipData.videoId}/sddefault.jpg" alt="YouTube Thumbnail">
                `;
            }
        }
        // その他のサムネイルを元に戻す
        else if (!thumbnail.id.includes(`thumbnail_${clipId}`)) {
            const baseId = thumbnail.id.replace('_nominate', '');
            const clipData = laylips.find(clip => `thumbnail_${clip.clipId}` === baseId);
            if (clipData) {
                thumbnail.innerHTML = `
                    <img class="thumb-img" src="https://i.ytimg.com/vi/${clipData.videoId}/sddefault.jpg" alt="YouTube Thumbnail">
                `;
            }
        }
    });

    if (unavailableClipIds.includes(clipId)) {
        window.open(`https://www.youtube.com/clip/${clipId}`, '_blank');
    } else {
        // 選択されたコンテナのサムネイルをiframeに置き換える
        const selectedThumbnailId = erea === 'nominate' ? `thumbnail_${clipId}_nominate` : `thumbnail_${clipId}`;
        const selectedThumbnail = document.getElementById(selectedThumbnailId);
        const selectedClipData = laylips.find(clip => clip.clipId === clipId);
        if (selectedClipData) {
            selectedThumbnail.innerHTML = `<div class="iframe-container">${selectedClipData.iframe}</div>`;
        }
    }
}


function vote(clipId, term) {
    switch (term) {
        case 1: //第一回
            if (checkTerm(1)) { // 投票期間内
                var tweetText = `私が選んだ #LOTY2023 はこれだ！（予選の部） https://www.youtube.com/clip/${clipId}\n\n投票はこちらから: konlayla.com/loty2023\n#れいらおぶざいやー2023予選\n#レイラマグノリア`;
                var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
                window.open(tweetUrl, '_blank');
            } else {            // 投票期間外
                alert("投票期間外です。");
            }
            break;
        case 2: //第二回
            if (checkTerm(2)) { // 投票期間内
                var tweetText = `私が選んだ #LOTY2023 はこれだ！（決勝の部） https://www.youtube.com/clip/${clipId}\n\n投票はこちらから: konlayla.com/loty2023\n#れいらおぶざいやー2023決勝\n#レイラマグノリア`;
                var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
                window.open(tweetUrl, '_blank');
                break;
            } else {            // 投票期間外
                alert("投票期間外です。");
            }
        default:
            console.log("No match...")
    }
}



// /* iframe の同時再生を禁止する処理 */
// // YouTube IFrame APIの読み込みが完了したら実行される関数
// function onYouTubeIframeAPIReady() {
//     var iframes = Array.from(document.querySelectorAll('iframe'));
//     var players = iframes.map((iframe) => {
//         return new YT.Player(iframe, {
//             events: {
//                 'onStateChange': onPlayerStateChange,
//             },
//         });
//     });
// }
// const onPlayerStateChange = ({ target }) => {
//     // ループしてplay中の動画があるかチェック
//     players.forEach((player, index) => {
//       // targetと同じ場合はreturn
//       if (target === player) return ;

//       // プレイヤーのステータスを取得
//       let state = player.getPlayerState();

//       // プレイ中のものは再生を止める
//       if (state === YT.PlayerState.PLAYING) {
//         player.stopVideo();
//       }
//     });
// };


// /* iframを埋め込む処理 */
// laylips.forEach(clipData => {
//     if(clipData.title && clipData.iframe) {
//         const container = document.createElement('div');
//         container.className = 'clip-container';
        
//         container.innerHTML = `
//             <div class="iframe-container">${clipData.iframe}</div>
//             <p>${clipData.title}</p>
//             <div class="button" id="button_sch">
//                 <a onclick="show_sch()">投票</a>
//             </div>
//         `;
        
//         document.querySelector('.contents-container').appendChild(container);
//     }
// });

// /* サムネイルを埋め込む処理(再生リンク付き) */
// laylips.forEach(clipData => {
//     if(clipData.title && clipData.iframe) {
//         const container = document.createElement('div');
//         container.className = 'clip-container';
        
//         container.innerHTML = `
//             <div class="thumbnail-container">
//                 <a href="https://www.youtube.com/clip/${clipData.clipId}">
//                     <img class="thumb-img" src="https://i.ytimg.com/vi/${clipData.videoId}/sddefault.jpg" alt="YouTube Thumbnail">
//                 </a>
//             </div>
            
//             <p>${clipData.title}</p>
//             <div class="button" id="button_sch">
//                 <a onclick="show_sch()">投票</a>
//             </div>
//         `;
        
//         document.querySelector('.contents-container').appendChild(container);
//     }
// });


/* videoId付加用のコード */
// laylips.forEach(item => {
//     const match = item.iframe.match(/embed\/(.+?)\?/);
//     if (match) {
//         item.videoId = match[1];
//     }
// });
// //console.log(laylips)

// function saveDataToFile(data, filename) {
//     const json = JSON.stringify(data, null, 2); // エスケープせずに整形してJSONを生成
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     a.click();
//     URL.revokeObjectURL(url);
// }

// // 使用例
// saveDataToFile(laylips, 'laylips.json');
