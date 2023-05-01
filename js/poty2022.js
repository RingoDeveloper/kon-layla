function convert() {
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
    console.log(result);
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
}

function show_list() {
    window.open("https://ringodeveloper.github.io/kon-layla/");
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