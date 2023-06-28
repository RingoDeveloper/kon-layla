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

function removeDataSizeAttribute() {
    const tweetLinks = document.getElementsByClassName('twitter-hashtag-button');
    
    for (let i = 0; i < tweetLinks.length; i++) {
      const tweetLink = tweetLinks[i];
      
      if (window.innerWidth < 1080) {
        tweetLink.removeAttribute('data-size');
      }
    }
}
  
removeDataSizeAttribute(); // 初回の実行
  
window.addEventListener('resize', removeDataSizeAttribute); // ウィンドウのリサイズ時に実行