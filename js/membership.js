/* グローバル変数 */
const owner = "ringo";
const DEBUG_MODE = false; //debug時はここをtrueに
let DEVELOPER_MODE = false;

//apikey
const K_LIST = []; //キーを編集
const Y_API_KEY1 = config.y_apikey_1;
const Y_API_KEY2 = config.y_apikey_2;
const Y_API_KEY3 = config.y_apikey_3;
const Y_API_KEY_D1 = config.y_apikey_d1;
const Y_API_KEY_D2 = config.y_apikey_d2;
const DEV_KEY = config.dev_key;
const TWITCH_C_ID = config.t_client_id;
const TWITCH_C_SEC = config.t_client_secret;
K_LIST.push(Y_API_KEY3);

let base_youtube_url;
let base_youtube_url_live;
let base_url_list = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=' + 'UUm-nZofnh3_1s_l2Gq3G1KQ' + '&key=' + decryption(Y_API_KEY_D1, owner.length) + '&part=snippet&maxResults=49';
let cnt = 0;
const mo_videoIds = [];
var video_c_obj_list_sorted;
var video_c_titles = [];
var video_c_descriptions = [];
var video_c_elms = [];
var SEACHING = false;
const FIRST_ANNIV = true;
var RUNNING_PARTICLE = false;
var TWITCH_STATUS = false;
const METRO_COLOR = ["#ff9500","#f62e36","#b5b5ac","#009bbf","#00bb85","#c1a470","#8f76d6","#00ac9b","#9c5e31","#f39700","#e60012","#9caeb7","#00a7db","#009944","#d7c447","#9b7cb6","#00ada9","#bb641d","#e85298","#0079c2","#6cbb5a","#b6007a","#e5171f","#522886","#0078ba","#019a66","#e44d93","#814721","#a9cc51","#ee7b1a","#00a0de",]
const COLOR_SET1 = ["#ff4c4c", "#ff4ca5", "#ff4cff", "#a54cff", "#4c4cff", "#4ca5ff", "#4cffff", "#4cffa5", "#4cff4c", "#a5ff4c", "#ffff4c", "#ffa54c"]
var TIMEOUT_ID1;
var TIMEOUT_ID2
var INTERVAL_ID;

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

// 読み込み中の状態を表示する関数
function showLoader(message) {
    if (localStorage.getItem('blk_api') == "true") {
        hideLoader();
        return;
    }
    var loaderOverlay = document.getElementById("loader-overlay");
    var loaderMessage = document.getElementById("loader-message");
    
    loaderMessage.textContent = message; // メッセージを設定
    loaderOverlay.style.display = "flex"; // ロード画面を表示
}
  
// ロード画面を非表示にする関数
function hideLoader() {
    document.getElementById("loader-overlay").style.display = "none";
    const ENDTIME = new Date().getTime();
    const timeDifference = ENDTIME - STARTTIME;
    console.log(`経過時間（ミリ秒）: ${timeDifference}`);
    //set_first_anniv();
}
showLoader("読み込み中...");

//console.log(excryption('', owner.length)); 
//console.log(decryption('', owner.length));

function excryption(string, key) {
    let result = ""
    for (let i = 0; i < string.length; i++) {
        result += String.fromCharCode(string.charCodeAt(i) - key);
    }
    return result;
}

function decryption(string, key) {
    let result = ""
    for (let i = 0; i < string.length; i++) {
        result += String.fromCharCode(string.charCodeAt(i) + key);
    }
    return result;
}

function setAPIKey(debug_mode) {
    if (debug_mode) { //止まったら切り替え可能
        return decryption(Y_API_KEY_D1, owner.length); 
        //return decryption(Y_API_KEY_D2, owner.length);
    } else {
        return decryption(K_LIST[0], owner.length);
    }
}
const APIKEY = setAPIKey(DEBUG_MODE);

function removeDataSizeAttribute() {
    const tweetLinks = document.getElementsByClassName('twitter-hashtag-button');
    
    for (let i = 0; i < tweetLinks.length; i++) {
      const tweetLink = tweetLinks[i];
      
      if (window.innerWidth < 480) {
        tweetLink.removeAttribute('data-size');
      }
    }
}
removeDataSizeAttribute(); // 初回の実行

var video_m_obj_list = []; //グローバル宣言
var video_l_obj_list = []; //グローバル宣言
var video_u_obj_list = [];
var mo_list_id1 = "PLCUfW5KwcvZFZi5ytVenKhtKIJP42ZQZx"; //メン限雑談配信リスト
var mo_list_id2 = "PLCUfW5KwcvZEgLeXOvqy4hWkTne4SXQKI"; //メン限同時視聴リスト
var mo_list_id3 = "PLCUfW5KwcvZHp-Jj27GkIb-UcYdiLd-C1"; //限定公開のアーカイブリスト
var mo_list_id_main = "UUMOm-nZofnh3_1s_l2Gq3G1KQ"; //メンバー限定の動画
var mo_list_addition = "PLr8ceCcnwq1n4nyVEUlZAauTUzodNhu29" //追加漏れ
const STARTTIME = new Date().getTime();
async function push_mo_ul() {
    try {
        //メン限雑談配信リスト取得
        const response1  = await $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            type: 'GET',
            dataType: 'json',
            data: {
            part: 'snippet',
            maxResults: 50, // 取得する動画の最大数（50まで）
            playlistId: mo_list_id1,
            key: APIKEY
            }
        });
        const items1 = response1.items;
        //video_u_obj_list = await checkVideoStatus("ZxNsc2aZ7xo", true, "TEST", video_u_obj_list); debug用
        for (var i = 0; i < items1.length; i++) {
            video_u_obj_list = await checkVideoStatus(items1[i].snippet.resourceId.videoId, true, items1[i].snippet.title, video_u_obj_list);
            //mo_videoIds.push(items[i].snippet.resourceId.videoId);
        }
        

        //メン限同時視聴リスト取得
        const response2  = await $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            type: 'GET',
            dataType: 'json',
            data: {
            part: 'snippet',
            maxResults: 50, // 取得する動画の最大数（50まで）
            playlistId: mo_list_id2,
            key: APIKEY
            }
        });
        const items2 = response2.items;
        for (var i = 0; i < items2.length; i++) {
            video_u_obj_list = await checkVideoStatus(items2[i].snippet.resourceId.videoId, true, items2[i].snippet.title, video_u_obj_list);
        }

        //限定公開のアーカイブリスト取得
        const response3  = await $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            type: 'GET',
            dataType: 'json',
            data: {
            part: 'snippet',
            maxResults: 50, // 取得する動画の最大数（50まで）
            playlistId: mo_list_id3,
            key: APIKEY
            }
        });
        const items3 = response3.items;
        for (var i = 0; i < items3.length; i++) {
            video_u_obj_list = await checkVideoStatus(items3[i].snippet.resourceId.videoId, true, items3[i].snippet.title, video_u_obj_list);
        }

        //限定公開のアーカイブリスト取得
        const response4  = await $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            type: 'GET',
            dataType: 'json',
            data: {
            part: 'snippet',
            maxResults: 50, // 取得する動画の最大数（50まで）
            playlistId: mo_list_addition,
            key: APIKEY
            }
        });
        const items4 = response4.items;
        for (var i = 0; i < items4.length; i++) {
            video_u_obj_list = await checkVideoStatus(items4[i].snippet.resourceId.videoId, true, items4[i].snippet.title, video_u_obj_list);
        }

        //過去のメン限動画リスト取得（重複チェック）
        const response5  = await $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            type: 'GET',
            dataType: 'json',
            data: {
            part: 'snippet',
            maxResults: 50, // 取得する動画の最大数（50まで）
            playlistId: mo_list_id_main,
            key: APIKEY
            }
        });
        const items5 = response5.items;
        for (var i = 0; i < items5.length; i++) {
            await DuplicationChecker(items5[i].snippet.resourceId.videoId, true, items5[i].snippet.title, video_u_obj_list);
        }
        
        await setMOVideo();
        await setUCVideo(video_u_obj_list);
        await setLVideo();
    } catch (error) {
        console.log('Error: Failed to retrieve member-exclusive videos.', error);
    } finally {
        hideLoader();
    }
}
async function DuplicationChecker(videoId, mo, title = "ERROR", videoUObjList = []) {
    if (
        video_m_obj_list.some(item => item.videoid === videoId) || 
        video_l_obj_list.some(item => item.videoid === videoId) || 
        videoUObjList.some(item => item.videoid === videoId) ||
        title.includes("ff14") ||
        title.includes("FF14")||
        title.includes("【MMD】粛聖!! ロリ神レクイエム☆ / しぐれうい（9さい）")
    ) {
        //console.log("重複:" + "https://www.youtube.com/watch?v=" + videoId);
    } else {
        console.log("[追加対象]: " + title  + "https://www.youtube.com/watch?v=" + videoId);
    }
}

async function checkVideoStatus(videoId, mo, title = "ERROR", videoUObjList = []) {

    if (
        video_m_obj_list.some(item => item.videoid === videoId) || 
        video_l_obj_list.some(item => item.videoid === videoId) || 
        videoUObjList.some(item => item.videoid === videoId)
    ) {
        //console.log("重複:" + videoId);
        return videoUObjList;
    } 
    try {
        const data = await $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/videos',
            type: 'GET',
            dataType: 'json',
            data: {
                part: 'liveStreamingDetails',
                id: videoId,
                key: APIKEY
            }
        });
        
        const liveStreamingDetails = data.items[0].liveStreamingDetails;
        //console.log(title, liveStreamingDetails);
        if (liveStreamingDetails.actualEndTime && liveStreamingDetails.actualStartTime) { //終了済みのメン限配信
            let startTime = new Date(liveStreamingDetails.actualStartTime);
            video_m_obj_list.push({videoid: videoId, time: startTime});
        } else if (liveStreamingDetails.actualStartTime) { //配信中のメン限配信
            let startTime = new Date(liveStreamingDetails.actualStartTime);
            video_l_obj_list.push({videoid: videoId, time: startTime, title: title, mo: mo});
        } else { //配信予定のメン限
            let startTime = new Date(liveStreamingDetails.scheduledStartTime);
            videoUObjList.push({videoid: videoId, time: startTime, mo: mo});
        }
        return videoUObjList;
    } catch (error) {
        console.log('エラー:', error);
        return videoUObjList;
    }
}

function setLVideo() {
    //console.log("LSV: ", video_l_obj_list);
    
    if ((Object.keys(video_l_obj_list).length < 1)) {
        if (!TWITCH_STATUS) {
            document.getElementById("youtubeList_l").remove();
        }
    }
    else if (video_l_obj_list[0].mo == true) { //メン限コンテンツ
        var ID = video_l_obj_list[0].videoid;
        var TN_URL = `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`;    
        var TITLE = video_l_obj_list[0].title;
        $("#youtubeList_l").append('<div class="statetext"><h2>配信中🎥</h2></div>');
        $("#youtubeList_l").append('<div id="youtubeList_l_inner"></div>');
        if (false) {
            //配信中のアイテムを表示
            if (true) {
                //light mode
                $("#youtubeList_l_inner").append('<div class="iframe_wrapper_m"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="thumb" src=' + TN_URL + '><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' + TITLE + '</h2></a></div>'); /////
            } else {
                //nomal mode
                $("#youtubeList_l_inner").append('<div class="iframe_wrapper_m"><h2 class="sc-time">' +DATETIME_formated + '</h2><iframe src="https://www.youtube.com/embed/' + ID + '" frameborder="1" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" allowfullscreen></iframe></div>'); /////
            }
        } else {
            //nomal mode
            $("#youtubeList_l_inner").append('<div class="iframe_wrapper_m"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="thumb" src=' + TN_URL + '><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' + TITLE + '</h2></a></div>'); /////
        }
    } else {
        var ID = video_l_obj_list[0].videoid;
        var TN_URL = `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`; 
        var TITLE = video_l_obj_list[0].title;
        if (retCheckDev()) {
            //配信中のアイテムを表示
            if (true) {
                //light mode
                $("#youtubeList_l_inner").append('<div class="iframe_wrapper_l"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="thumb" src=' + TN_URL + '><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' + TITLE + '</h2></a></div>'); /////
            } else {
                //nomal mode
                $("#youtubeList_l_inner").append('<div class="iframe_wrapper_l"><h2 class="sc-time">' +DATETIME_formated + '</h2><iframe src="https://www.youtube.com/embed/' + ID + '" frameborder="1" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" allowfullscreen></iframe></div>'); /////
            }
        } else {
            //nomal mode
            $("#youtubeList_l_inner").append('<div class="iframe_wrapper_l"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="thumb" src=' + TN_URL + '><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' + TITLE + '</h2></a></div>'); /////
        }
    }
}
//checkVideoStatus("ZxNsc2aZ7xo", true, "TEST");

async function setUCVideo(video_u_obj_list) {
    const video_u_obj_list_sorted = video_u_obj_list.sort(
        (a, b) => moment(a.time).diff(b.time)
    );
    //console.log("UCV_sorted: ", video_u_obj_list_sorted);
    for (let i = 0; i < Object.keys(video_u_obj_list_sorted).length; i++) {
        var ID = video_u_obj_list_sorted[i].videoid;
        var TN_URL = `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`;
        var DATETIME = video_u_obj_list_sorted[i].time;
        var year = DATETIME.getFullYear() ;	// 年
        var month = DATETIME.getMonth() + 1 ;	// 月
        var day = DATETIME.getDate() ;	// 日
        var hour = DATETIME.getHours() ;	// 時
        var minute = DATETIME.getMinutes() ;	// 分
        var second = DATETIME.getSeconds() ;	// 秒
        var dayOfWeek = DATETIME.getDay() ;	// 曜日(数値)
        var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;	// 曜日(日本語表記)
        var DATETIME_formated = `${month}/${day} (${dayOfWeekStr}) ${hour}:${minute.toString().padStart(2, '0')}`;
        //$("#youtubeList_u_inner").append(''); /////

        //配信予定のアイテムを表示

        if (video_u_obj_list_sorted[i].mo == true) { //メン限コンテンツ
            if (true) {
            //developer mode
            //console.log("https://www.youtube.com/watch?v=" + ID);
            await $("#youtubeList_u_inner").append('<div class="iframe_wrapper_m"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' +DATETIME_formated + '</h2><img class="thumb" src=' + TN_URL + '></a></div>'); /////
            } else {
                //nomal mode
                $("#youtubeList_u_inner").append('<div class="iframe_wrapper_m"><h2 class="sc-time">' +DATETIME_formated + '</h2><iframe src="https://www.youtube.com/embed/' + ID + '" frameborder="1" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" allowfullscreen></iframe></div>'); /////
            }
        } else {                                    //公開コンテンツ
            if (true) {
            //developer mode
            //console.log("https://www.youtube.com/watch?v=" + ID);
            await $("#youtubeList_u_inner").append('<div class="iframe_wrapper"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' +DATETIME_formated + '</h2><img class="thumb" src=' + TN_URL + '></a></div>'); /////
            } else {
                //nomal mode
                await $("#youtubeList_u_inner").append('<div class="iframe_wrapper"><h2 class="sc-time">' +DATETIME_formated + '</h2><iframe src="https://www.youtube.com/embed/' + ID + '" frameborder="1" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" allowfullscreen></iframe></div>'); /////
            }
        }
        
    }
}

async function setMOVideo() {
    const THUMB_TYPES = [
        /** w1280 */
        'maxresdefault.jpg',
        /** w640 */
        'sddefault.jpg',
        /** w480 */
        'hqdefault.jpg',
        /** w320 */
        'mqdefault.jpg',
        /** w120 */
        'default.jpg',
    ];
    
    let video_m_obj_list_sorted = video_m_obj_list.sort(
        (a, b) => moment(b.time).diff(a.time)
    );
    console.log(video_m_obj_list_sorted);
    //console.log("MOV: ", video_m_obj_list_sorted.length);
    for (let k = 0; k < video_m_obj_list_sorted.length; k++) {
        var ID = video_m_obj_list_sorted[k].videoid;
        let thumb_max = `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`;
        var TN_URL = thumb_max; // 初期値として maxresdefault サイズのサムネイルを使用

        const getYtThumbnail = async (videoId) => {
            return `https://img.youtube.com/vi/${videoId}/${THUMB_TYPES[0]}`; //単純にしてみた（ループをなくす）
            // 画像をロードする処理
            const loadImage = (src) => {
              return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = (e) => resolve(img);
                img.src = src;
              });
            };
            
          
            for (let i = 0; i < THUMB_TYPES.length; i++) {
              const fileName = `https://img.youtube.com/vi/${videoId}/${THUMB_TYPES[i]}`;
          
              const res = await loadImage(fileName);
          
              // ダミー画像じゃなかったら（横幅が121px以上だったら）
              // もしくは、これ以上小さい解像度が無かった場合は、このURLで決定
              if (
                !THUMB_TYPES[i + 1]
                || (res).width > 120
              ) {
                return fileName;
              }
            }
        };
        
        await (async () => {
            // Get the largest size under sddefault.jpg.
            TN_URL = await getYtThumbnail(ID, 'maxresdefault.jpg');
            var DATETIME = video_m_obj_list_sorted[k].time;
            var year = DATETIME.getFullYear();
            var month = DATETIME.getMonth() + 1;
            var day = DATETIME.getDate();
            var hour = DATETIME.getHours();
            var minute = DATETIME.getMinutes();
            var second = DATETIME.getSeconds();
            var dayOfWeek = DATETIME.getDay();
            var dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
            var DATETIME_formated = `${year}/${month}/${day} (${dayOfWeekStr}) ${hour}:${minute.toString().padStart(2, '0')}`;
            // 配信予定のアイテムを表示
            if (true) {
              // developer mode
              // console.log("https://www.youtube.com/watch?v=" + ID);
              await new Promise((resolve) => {
                $("#youtubeList_m_inner").append('<div class="iframe_wrapper_m"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' + DATETIME_formated + '</h2><img class="thumb" src=' + TN_URL + '></a></div>'); /////
                resolve();
              });
            } else {
              // nomal mode
              await new Promise((resolve) => {
                $("#youtubeList_m_inner").append('<div class="iframe_wrapper_m"><h2 class="sc-time">' + DATETIME_formated + '</h2><iframe src="https://www.youtube.com/embed/' + ID + '" frameborder="1" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" allowfullscreen></iframe></div>'); /////
                resolve();
              });
            }
        })();
          
    }
}

push_mo_ul();
/*
const CHANNEL_ID = "UCm-nZofnh3_1s_l2Gq3G1KQ";

async function getUpcomingLiveStreams() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=upcoming&type=video&key=${APIKEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
}

async function fetchLiveStreams() {
  try {
    const upcomingLiveStreams = await getUpcomingLiveStreams();
    const liveStreams = upcomingLiveStreams.map((stream) => {
      return {
        id: stream.id.videoId,
        title: stream.snippet.title,
        startAt: stream.snippet.publishTime,
        isPrivate: false, // YouTube API では非公開のライブ配信情報を取得できないため、常に false を設定する
      };
    });
    console.log(liveStreams);
  } catch (error) {
    console.error("Error fetching live streams:", error);
  }
}

fetchLiveStreams();
*/

