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

function show_sch() {
    window.open("https://twitter.com/search?q=%23%E3%83%AC%E3%82%A4%E3%83%A9%E3%81%A8%E5%A4%9C%E6%9B%B4%E3%81%8B%E3%81%97%20-filter%3Aretweets&src=typed_query&f=live");
}

function convert_tim() {
  let srcElm = document.getElementById("sorce");
  let time_hElm = document.getElementById("timecode_h");
  let time_mElm = document.getElementById("timecode_m");
  let time_sElm = document.getElementById("timecode_s");
  let resultElm = document.getElementById("result-tim");

  console.log(time_hElm.value);
  console.log(time_mElm.value);
  console.log(time_sElm.value);

  let totalSec = (parseInt(time_hElm.value) * 3600) + (parseInt(time_mElm.value) * 60) + parseInt(time_sElm.value);
  let srcText = convertYouTubeURL(srcElm.value);
  
  let url = srcText + "&t=" + totalSec + "s";
  resultElm.textContent = url;
  resultElm.setAttribute('href', url);
}

function convert_rep() {
  let id_from = document.getElementById("id-from");
  let id_to = document.getElementById("id-to");
  let result_rep = document.getElementById("result-rep");

  let url = `https://twitter.com/search?q=from%3A${id_from.value}%20to%3A${id_to.value}&src=typed_query&f=live`;
  result_rep.textContent = url;
  result_rep.setAttribute('href', url);
}

function convert_air_rep() {
  let keywords = document.getElementById("keywords");
  let result_air_rep = document.getElementById("result-air-rep");

  let url = `https://twitter.com/search?q=filter%3Afollows%20${keywords.value}&src=typed_query&f=live`;
  //result_air_rep.textContent = url;
  //result_air_rep.setAttribute('href', url);
  window.open(url);
}


function convertYouTubeURL(url) {
  console.log("run conv func");
  const pattern1 = /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/;
  const pattern2 = /^https:\/\/youtu\.be\/([\w-]+)\?si=/;
  const pattern3 = /^https:\/\/www\.youtube\.com\/embed\/([\w-]+)/;
  const pattern4 = /^https:\/\/www\.youtube\.com\/live\/([\w-]+)\?si=/;
  const pattern5 = /^https:\/\/m\.youtube\.com\/watch\?v=([\w-]+)/;

  const pat_list = [pattern1, pattern2, pattern3, pattern4, pattern5];
  console.log("length of pat_list =", pat_list.length);
debugger
  for (let i = 0; i < pat_list.length; i++) {
    console.log(i)
    if (i == 0) {
      if (pat_list[i].test(url)) {
        return url;
      }
    } else {
      let match = url.match(pat_list[i]);
      if (match) {
        return `https://www.youtube.com/watch?v=${match[1]}`;
      }
    }
  }


  /*
  const match = url.match(pattern2);
  const match3 = url.match(pattern3);

  // 1つ目のURL形式に一致する場合、そのまま返す
  if (pattern1.test(url)) {
      return url;
  } else if ()

  // 2つ目のURL形式に一致する場合、ビデオIDを取得し、1つ目の形式に変換して返す
  
  if (match) {
    const videoId = match[1];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  // 3つ目のURL形式に一致する場合、ビデオIDを取得し、1つ目の形式に変換して返す
  
  if (match3) {
    const videoId = match3[1];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  */

  // どの形式にも一致しない場合はエラーメッセージを返す
  return "無効なYouTube URL形式です";
}