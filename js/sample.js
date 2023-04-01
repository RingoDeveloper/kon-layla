/*function convert() {
    let srcElm = document.getElementById("sorce");
    let time_hElm = document.getElementById("timecode_h");
    let time_mElm = document.getElementById("timecode_m");
    let time_sElm = document.getElementById("timecode_s");
    let resultElm = document.getElementById("result");

    console.log(time_hElm.value);
    console.log(time_mElm.value);
    console.log(time_sElm.value);

    let totalSec = (parseInt(time_hElm.value) * 3600) + (parseInt(time_mElm.value) * 60) + parseInt(time_sElm.value);
    let url = srcElm.value + "?t=" + totalSec;
    resultElm.textContent = url;
    resultElm.setAttribute('href', url);
}



function check_localStorage() {
    let result = localStorage.getItem('showed-result');
    //console.log(result);
    if (result == 'true') {
        setpage_2();
    }
}

function setpage_2() {
    let itemList = document.getElementsByClassName("nov");
    for (let i = 0; i < itemList.length; i++) {
        itemList.item(i).style.visibility = "visible";
    }
    
    //target.style.border = "solid 5px red"
    let ribbon_poty = document.getElementById("ribbon-poty");
    let ribbon_nomal = document.getElementById("ribbon-nomal");
    ribbon_nomal.parentNode.removeChild(ribbon_nomal);
    ribbon_poty.style.visibility = "visible";
    var target = document.getElementById("poty");
    target.style.backgroundColor = 'rgba(255, 215, 0, 0.5)';
}

window.onload = check_localStorage(); 

function show_result() {
    let itemList = document.getElementsByClassName("nov");
    for (let i = 0; i < itemList.length; i++) {
        itemList.item(i).style.visibility = "visible";
    }
    let result = localStorage.getItem('showed-result');
    if (!(result == 'true')) {
        let ribbon_nomal = document.getElementById("ribbon-nomal");
        ribbon_nomal.parentNode.removeChild(ribbon_nomal);
        let ribbon_poty = document.getElementById("ribbon-poty");
        ribbon_poty.style.visibility = "visible";
    }
    //target.style.border = "solid 5px red"
    var target = document.getElementById("poty");
    target.style.backgroundColor = 'rgba(255, 215, 0, 0.5)';
    target.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    localStorage.setItem('showed-result', 'true');
}*/

function getRandomInt() {
    return Math.floor(Math.random() * max);
}

function checkDevMode() {
    let result = localStorage.getItem('dev_mode');

    if (result == "true") { /* devmode */
        base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=id&maxResults=20&order=date&type=video&key=' + Y_API_KEY_D1;
        console.log("developer");
    } else {
        /* 本番環境 */
        let ringo = document.getElementById("ringo");
        ringo.style.display = "none";
        let keyindex = getRandomInt();
        base_youtube_url = 'https://www.googleapis.com/youtube/v3/search?part=id&maxResults=20&order=date&type=video&key=' + K_LIST[keyindex];
        console.log("user");
        //console.log(keyindex);
        //console.log(base_youtube_url);
    }
}
let base_youtube_url;
checkDevMode();
let cnt = 0;

function secBtn() {
    cnt++;
    console.log(cnt);
    if (cnt >= 10) {
        enable_dev_mode();
        window.location.reload();
    }
}

function ringoBtn() {
    disable_dev_mode();
    window.location.reload();
}

function show_sch() {
    window.open("https://www.youtube.com/@LaylaMagnolia/community");
}

function enable_dev_mode() {
    pass_key = config.dev_key;
    input_pass = window.prompt("Developerモードを有効にします。\nパスキーを入力してください", "");
    if (input_pass == pass_key) {
        localStorage.setItem('dev_mode', 'true');
    } else {
        window.alert('パスキーが間違っています。')
    }
}

function disable_dev_mode() {
    localStorage.setItem('dev_mode', 'false');
}
