/**
 * Created by Administrator on 2019-04-02.
 */
//-->rem响应式
-function () {
    let desW = 640,
        screenWidth = document.documentElement.clientWidth,
        ratio = screenWidth / 640;

    let oMain = document.getElementsByClassName('main')[0];
    if (screenWidth > desW) {
        oMain.style.width = desW + 'px';
        oMain.style.margin = '0 auto';
        return;     //-->一定要加return，结束整个闭包函数，下面设置字体就不用执行了。
    }

    document.documentElement.style.fontSize = ratio * 100 + 'px';
}();

-function () {
    let mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        on: {
            slideChangeTransitionEnd: function () {
                let slideAry = [].slice.call(this.slides),
                    slideAmount = slideAry.length,
                    curSlideIndex = this.activeIndex,
                    curSlideId = 'page';

                switch (curSlideIndex) {
                    case 0:
                        curSlideId += slideAmount - 2;
                        break;
                    case slideAmount - 1:
                        curSlideId += 1;
                        break;
                    default:
                        curSlideId += curSlideIndex;

                }

                slideAry.forEach(function (item, index) {
                    if (index == curSlideIndex) {
                        item.id = curSlideId;
                        return;
                    }
                    item.id = null;
                });
            }
        }
    });
}();


/**Music
 * 1.首先播放器按钮时隐藏的，打开页面一秒后，让播放器播放音乐，然后判断音乐是否能正常播放，如果不能...
 * 2.点击音乐按钮播放后暂停
 */
~function () {
    let musicMenu = document.getElementById('musicMenu'),
        musicAudio = document.getElementById('musicAudio');

    function canPlay() {
        musicAudio.volume = .1;
        musicAudio.play();
        musicAudio.addEventListener('canplay', function () {
            musicMenu.style.display = 'block';
            musicMenu.className = 'music rotate'
        }, false)
    }

    window.setTimeout(canPlay, 1000);

    musicMenu.addEventListener('click', function () {
        if(musicAudio.paused){
            musicAudio.play();
            musicMenu.className = 'music rotate';
        }else{
            musicAudio.pause();
            musicMenu.className = 'music';
        }
    }, false)
}();