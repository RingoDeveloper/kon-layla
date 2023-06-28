function getRandomInt() {
    return Math.floor(Math.random() * max);
}

function show_sch() {
    window.open("https://www.youtube.com/@LaylaMagnolia/community?view=desktop");
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


////* debug tools *////
/* debug variable */
const owner = "ringo";
const DEBUG_MODE = false;
let base_youtube_url;
let base_youtube_url_live;
let cnt = 0;

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

/* run debug functions */
checkDevMode();
checkBlkAPI();
//console.log(excryption('AIzaSyDcwk2MtvrO63sLn1WwGq1ahlYG30BcnA4', owner.length));
//console.log(decryption(, owner.length));

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
            base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + num_cv + '&order=date&type=video&key=' + decryption(Y_API_KEY_D1, owner.length);//decryption(Y_API_KEY_D2, owner.length);
            base_youtube_url_live = 'https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&maxResults=' + num_cv + '&key=' + decryption(Y_API_KEY_D1, owner.length) + '&id=';
            console.log("///USING DEBUG KEY NOW///\n");
        } else {
            base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + num_cv + '&order=date&type=video&key=' + decryption(K_LIST[0], owner.length);//decryption(Y_API_KEY_D2, owner.length);
            base_youtube_url_live = 'https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&maxResults=' + num_cv + '&key=' + decryption(K_LIST[0], owner.length) + '&id=';
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
        base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + num_cv + '&order=date&type=video&key=' + decryption(K_LIST[0], owner.length);
        base_youtube_url_live = 'https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&maxResults=' + num_cv + '&key=' +decryption(K_LIST[0], owner.length) + '&id=';
        console.log("user");
        
        //console.log(keyindex);
        //console.log(base_youtube_url);
    }
}

function retCheckDev() {
    let result = localStorage.getItem('dev_mode');
    console.log("run retCheckDev()");
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


function push_mo_ul(video_u_obj_list) {
    
    console.log("runnnnn");
    // チャンネルIDとAPIキーを設定
    var channelId = 'UCm-nZofnh3_1s_l2Gq3G1KQ';
    var KEY = decryption(Y_API_KEY_D1, owner.length);
    var apiKey = KEY;
    var mo_videoIds = [];

    // メンバー限定動画の再生リストを取得するリクエスト
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        type: 'GET',
        dataType: 'json',
        data: {
        part: 'snippet',
        maxResults: 50, // 取得する動画の最大数（50まで）
        playlistId: "PLCUfW5KwcvZFZi5ytVenKhtKIJP42ZQZx",
        key: apiKey
        }
    }).done(function(data) {
        // メンバー限定動画を列挙
        var items = data.items;
        var videoId;
        var videoTitle;
        
        for (var i = 0; i < items.length; i++) {
            videoId = items[i].snippet.resourceId.videoId;
            mo_videoIds.push(videoId);
            videoTitle = items[i].snippet.title;
            console.log(videoTitle);
        }
    }).fail(function(data) {
        // エラーハンドリング
        console.log('Error: Failed to retrieve member-exclusive videos.');
    });

    for (let j = 0; j < mo_videoIds.length; j++) {
        console.log("Ajax2");
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/videos',
            type: 'GET',
            dataType: 'json',
            data: {
                part: 'liveStreamingDetails',
                id: mo_videoIds[j],
                key: apiKey
            },
            success: function(data) {
                // 応答データの処理
                var liveStreamingDetails = data.items[0].liveStreamingDetails;
                console.log(data.items[0]);
                if (liveStreamingDetails && liveStreamingDetails.actualStartTime) {
                    var startTime = new Date(liveStreamingDetails.actualStartTime);
                    console.log('配信開始時間:', startTime);
                    // 動画の情報を表示するなどの処理を行う
                    console.log("Video ID:", videoId);
                    //console.log("Video Title:", videoTitle);
                    video_u_obj_list.push({videoid: videoId, time: startTime});
                    //サムネを追加する処理
                    console.log(mo_videoIds);
                    var ID = mo_videoIds[j];
                    var TN_URL = `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`;
                    console.log(TN_URL);
                    var DATETIME = startTime;
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
                    if (checkLightMode()) {
                        //developer mode
                        //console.log("https://www.youtube.com/watch?v=" + ID);
                        $("#youtubeList_u_inner").append('<div class="iframe_wrapper"><a href=' + 'https://www.youtube.com/watch?v=' + ID + ' target="_blank" rel="noopener noreferrer"><img class="inner-logo" src="./src/logo/youtube_social_icon_red.png"><h2 class="sc-time" style="color:black">' +DATETIME_formated + '</h2><img class="thumb" src=' + TN_URL + '></a></div>'); /////
                    } else {
                        //nomal mode
                        $("#youtubeList_u_inner").append('<div class="iframe_wrapper"><h2 class="sc-time">' +DATETIME_formated + '</h2><iframe src="https://www.youtube.com/embed/' + ID + '" frameborder="1" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" allowfullscreen></iframe></div>'); /////
                    }
                    
                } else {
                    console.log('配信情報がありません');
                }
            },
            error: function(error) {
                // エラーの処理
                console.log('エラー:', error);
            }
        });
    }
        
}
