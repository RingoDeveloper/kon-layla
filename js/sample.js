function getRandomInt() {
    return Math.floor(Math.random() * max);
}

function show_sch() {
    window.open("https://www.youtube.com/@LaylaMagnolia/community");
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

/* run debug functions */
checkDevMode();
checkBlkAPI();

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

    if (result == "true") { /* devmode */
        base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=date&type=video&key=' + 'AIzaSyCm5MKJ1LlIWdXF0evc-ygOpKptvNf8AX4';//decryption(Y_API_KEY_D1, owner.length);
        base_youtube_url_live = 'https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&maxResults=20&key=' + 'AIzaSyCm5MKJ1LlIWdXF0evc-ygOpKptvNf8AX4' + '&id=';

        console.log("developer");
        //デベロッパーモードで表示
        ringo.style.display = "flex";
        blk_api_switch.style.display = "flex";
    } else {
        /* 本番環境 */
        //ユーザモードで消す要素
        //ringo.style.display = "none";
        //blk_api_switch.style.display = "none";

        let keyindex = getRandomInt();
        base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=id&maxResults=20&order=date&type=video&key=' + decryption(K_LIST[keyindex], owner.length);
        console.log("user");
        //console.log(keyindex);
        //console.log(base_youtube_url);
    }
}

function checkBlkAPI() {
    let result = localStorage.getItem('blk_api');

    if (result == "true") {
        checkbox.checked = true;
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
