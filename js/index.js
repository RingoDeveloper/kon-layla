/* グローバル変数 */
const owner = "ringo";
const DEBUG_MODE = false; //debug時はここをtrueに

let base_youtube_url;
let base_youtube_url_live;
let cnt = 0;
const mo_videoIds = [];
var video_c_obj_list_sorted;
var video_c_titles = [];
var video_c_elms = [];
var SEACHING = false;

// 読み込み中の状態を表示する関数
function showLoader(message) {
    var loaderOverlay = document.getElementById("loader-overlay");
    var loaderMessage = document.getElementById("loader-message");
    
    loaderMessage.textContent = message; // メッセージを設定
    loaderOverlay.style.display = "flex"; // ロード画面を表示
}
  
// ロード画面を非表示にする関数
function hideLoader() {
    document.getElementById("loader-overlay").style.display = "none";
}
  
// 例: 読み込み中の状態を表示してから3秒後に非表示にする
showLoader("読み込み中...");

//console.log(excryption('AIzaSyDcwk2MtvrO63sLn1WwGq1ahlYG30BcnA4', owner.length));
//console.log(decryption(, owner.length));

function getRandomInt() {
    return Math.floor(Math.random() * max);
}

function show_sch() {
    window.open("https://www.youtube.com/@LaylaMagnolia/community?view=desktop");
}

function goto_mo() {
    var target = document.getElementById("youtubeList_m");
    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

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

const checkbox = document.getElementById('switch');
checkbox.addEventListener('click', ()=> {
    if (checkbox.checked) {
        localStorage.setItem('blk_api', "true");
    } else {
        localStorage.setItem('blk_api', "false");
    }
    window.location.reload();
});

const checkbox2 = document.getElementById('switch_light');
checkbox2.addEventListener('click', ()=> {
    if (checkbox2.checked) {
        localStorage.setItem('lightmode', "true");
    } else {
        localStorage.setItem('lightmode', "false");
    }
    window.location.reload();
});




/* define debug functions */
function enable_dev_mode() {
    pass_key = config.dev_key;
    input_pass = window.prompt("Developerモードを有効にします。\nパスキーを入力してください", "");
    if (input_pass == decryption(pass_key, owner.length)) {
        localStorage.setItem('dev_mode', 'true');
    } else {
        window.alert('パスキーが間違っています。')
    }
}

function disable_dev_mode() {
    localStorage.setItem('dev_mode', 'false');
}

function checkDevMode() {
    let result = localStorage.getItem('dev_mode');
    let ringo = document.getElementById("ringo");
    let blk_api_switch = document.getElementById("switch_label");
    let num_cv = check_num_cv();

    if (result == "true") { /* devmode */
        if (DEBUG_MODE == true) { //debug mode. using debug key
            base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + 45 + '&order=date&type=video&key=' + decryption(Y_API_KEY_D1, owner.length);//decryption(Y_API_KEY_D2, owner.length);
            base_youtube_url_live = 'https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&maxResults=' + 45 + '&key=' + decryption(Y_API_KEY_D1, owner.length) + '&id=';
            console.log("///USING DEBUG KEY NOW///\n");
        } else {
            base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + 45 + '&order=date&type=video&key=' + decryption(K_LIST[0], owner.length);//decryption(Y_API_KEY_D2, owner.length);
            base_youtube_url_live = 'https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&maxResults=' + 45 + '&key=' + decryption(K_LIST[0], owner.length) + '&id=';
        }
        
        //base_youtube_url_channel = 'https://www.googleapis.com/youtube/v3/channelSections?part=snippet&key=' + decryption(Y_API_KEY_D1, owner.length);

        console.log("developer");
        //デベロッパーモードで表示
        ringo.style.display = "flex";
        blk_api_switch.style.display = "flex";
    } else {
        /* 本番環境 */
        //ユーザモードで消す要素
        //ringo.style.display = "none";
        //blk_api_switch.style.display = "none";
        let switch_l_elm = document.getElementById("switch_light_label");
        if (switch_l_elm != null) {
            switch_l_elm.remove();
        }
        //
        base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + 45 + '&order=date&type=video&key=' + decryption(K_LIST[0], owner.length);
        base_youtube_url_live = 'https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&maxResults=' + 45 + '&key=' +decryption(K_LIST[0], owner.length) + '&id=';
        console.log("user");
        
        //console.log(keyindex);
        //console.log(base_youtube_url);
    }
}
checkDevMode();

function retCheckDev() {
    let result = localStorage.getItem('dev_mode');
    if (result != "true") {
        return false;
    }
    return true;
}

function checkBlkAPI() {
    let result = localStorage.getItem('blk_api');

    if (result == "true") {
        checkbox.checked = true;
        return true;
    } 
    return false;
}
checkBlkAPI();

function checkLightMode() {
    let result = localStorage.getItem('lightmode');

    if (!retCheckDev()) {
        checkbox2.checked = true;
        return true;
    } else if(result == "true") {
        checkbox2.checked = true;
        return true;
    }
    return false;
}

function secBtn() {
    cnt++;
    if (cnt >= 10) {
        enable_dev_mode();
        window.location.reload();
    }
}

function ringoBtn() {
    var result = window.confirm('Developerモードを無効にしますか?');
    if (result) {
        disable_dev_mode();
        window.location.reload();
    }
}

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

function update_num_CV() {
    var elm =  document.getElementById('numSelect');
    var val = elm.value;
    localStorage.setItem('num_cv', val);
    console.log("num = " + val);
    window.location.reload();
}

function check_num_cv() {
    let num_cv = localStorage.getItem('num_cv');
    if (num_cv == null) {
        num_cv = "20";
    }
    return num_cv;
}

function remove_develms() {
    if (localStorage.getItem('dev_mode') != "true") {
        elm = document.getElementsByClassName("develm");
        console.log(elm.length);
        for (var i = 0; i < elm.length; i++) {
            elm[i].style.visibility='hidden';
            while(elm[i].firstChild) {
                elm[i].firstChild.remove();
            }
        }
    }
}
remove_develms();

function check_screen_width() {
    var ww = window.screen.width;
    if (ww < 500) {
        var elm = document.getElementById("no-display-sp");
        elm.remove();
    }
}
check_screen_width()

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

function search_func() {
    if (SEACHING == true) {
        reset_func();
    }
    let keyword = document.getElementById("searchBox").value;
    let idxToShow = [];
    console.log(idxToShow);
    console.log(keyword);
    for (let i = 0; i < num_cv; i++) {
        //console.log(video_c_obj_list_sorted[i].title);
        if (video_c_obj_list_sorted[i].title.includes(keyword)) {
            idxToShow.push(i);
        }
    }

    const divElement = document.getElementById("youtubeList_c_inner");
    const childElements = divElement.children;
    for (let j = num_cv - 1; j >= 0; j--) {
        video_c_elms.unshift(childElements[j]);
        if (!idxToShow.includes(j)) {
            let elementToRemove = childElements[j];
            divElement.removeChild(elementToRemove);
        }
    }
    if (childElements.length == 0) {
        divElement.textContent = "検索結果に一致するコンテンツがありません";
    }
    SEACHING = true;
}

function reset_func() {
    if (SEACHING == false) {
        return 0;
    }
    const divElement = document.getElementById("youtubeList_c_inner");
    const childElements = divElement.children;
    if (childElements.length == 0) {
        divElement.textContent = "";
    } else {
        for (let i = 0; i < childElements.length; i++) {
            divElement.removeChild(childElements[i]);
        }
    }
    
    for (let j = 0; j < video_c_elms.length; j++) {
        divElement.appendChild(video_c_elms[j]);
    }
    console.log("comp_reset()");
    SEACHING = false;
}

var video_m_obj_list = []; //グローバル宣言
var video_l_obj_list = []; //グローバル宣言
var mo_list_id1 = "PLCUfW5KwcvZFZi5ytVenKhtKIJP42ZQZx"; //メン限雑談配信リスト
var mo_list_id2 = "PLCUfW5KwcvZEgLeXOvqy4hWkTne4SXQKI"; //メン限同時視聴リスト
var mo_list_id3 = "PLCUfW5KwcvZHp-Jj27GkIb-UcYdiLd-C1"; //限定公開のアーカイブリスト
async function push_mo_ul(video_u_obj_list) {
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
        //video_u_obj_list = await checkVideoStatus("ZxNsc2aZ7xo", true, "TEST", video_u_obj_list); debug用
        for (var i = 0; i < items2.length; i++) {
            video_u_obj_list = await checkVideoStatus(items2[i].snippet.resourceId.videoId, true, items2[i].snippet.title, video_u_obj_list);
            //mo_videoIds.push(items[i].snippet.resourceId.videoId);
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
        //video_u_obj_list = await checkVideoStatus("ZxNsc2aZ7xo", true, "TEST", video_u_obj_list); debug用
        for (var i = 0; i < items3.length; i++) {
            video_u_obj_list = await checkVideoStatus(items3[i].snippet.resourceId.videoId, true, items3[i].snippet.title, video_u_obj_list);
            //mo_videoIds.push(items[i].snippet.resourceId.videoId);
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

async function checkVideoStatus(videoId, mo, title = "ERROR", videoUObjList = []) {
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
            console.log("mol");
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
    console.log(video_l_obj_list);
    if (Object.keys(video_l_obj_list).length < 1) {
        document.getElementById("youtubeList_l").remove();
    }
    else if (video_l_obj_list[0].mo == true) { //メン限コンテンツ
        var ID = video_l_obj_list[0].videoid;
        var TN_URL = `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`;    
        var TITLE = video_l_obj_list[0].title;
        if (retCheckDev()) {
            //配信中のアイテムを表示
            if (checkLightMode()) {
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
            if (checkLightMode()) {
                //light mode
                $("#youtubeList_l_inner").append('<div class="iframe_wrapper"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="thumb" src=' + TN_URL + '><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' + TITLE + '</h2></a></div>'); /////
            } else {
                //nomal mode
                $("#youtubeList_l_inner").append('<div class="iframe_wrapper"><h2 class="sc-time">' +DATETIME_formated + '</h2><iframe src="https://www.youtube.com/embed/' + ID + '" frameborder="1" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" allowfullscreen></iframe></div>'); /////
            }
        } else {
            //nomal mode
            $("#youtubeList_l_inner").append('<div class="iframe_wrapper"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="thumb" src=' + TN_URL + '><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' + TITLE + '</h2></a></div>'); /////
        }
    }
}
//checkVideoStatus("ZxNsc2aZ7xo", true, "TEST");

async function setUCVideo(video_u_obj_list) {
    //console.log("UCV: ", video_u_obj_list);
    //const entries = Object.entries(video_u_obj_list);
    //entries.sort(
    //   (a, b) => moment(a.time).diff(b.time)
    //);

    //const video_u_obj_list_sorted = Object.fromEntries(entries);
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
            if (checkLightMode()) {
            //developer mode
            //console.log("https://www.youtube.com/watch?v=" + ID);
            await $("#youtubeList_u_inner").append('<div class="iframe_wrapper_m"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' +DATETIME_formated + '</h2><img class="thumb" src=' + TN_URL + '></a></div>'); /////
            } else {
                //nomal mode
                $("#youtubeList_u_inner").append('<div class="iframe_wrapper_m"><h2 class="sc-time">' +DATETIME_formated + '</h2><iframe src="https://www.youtube.com/embed/' + ID + '" frameborder="1" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" allowfullscreen></iframe></div>'); /////
            }
        } else {                                    //公開コンテンツ
            if (checkLightMode()) {
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
    //console.log("MOV: ", video_m_obj_list_sorted.length);
    for (let k = 0; k < video_m_obj_list_sorted.length; k++) {
        var ID = video_m_obj_list_sorted[k].videoid;
        let thumb_max = `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`;
        var TN_URL = thumb_max; // 初期値として maxresdefault サイズのサムネイルを使用

        const getYtThumbnail = async (videoId) => {
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
            if (checkLightMode()) {
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




