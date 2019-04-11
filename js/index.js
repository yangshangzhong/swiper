/**
 * Created by Administrator on 2019-02-13.
 */
//--> 初始化swiper. 注意：如果外面要用window.onload方法，那么这个方法最好写在JS的最前面，因为执行完此方法后，其后面的代码将不再执行。
window.onload = function () {
    let mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        on: {
            slideChangeTransitionEnd: function () {
                /**
                 * 1.首先获取当前swiper的所有滑动页面，结果是一个“类数组”。
                 * 2.因为，我们给他们的id名是通过 page+‘对应页面’的方式：如果有三个页面，那么前后各加一张，总数为5页，用n代表总页数。当索引为0时，页面为第n-2=3页，索引为1时为第一页，索引为2时为第二页，索引为3时为第三页，索引为4时-也就是n-1时为第一页。以上分析目的是为了给每一页计算出所对应的id名，然后通过循环所有页面，给当前活动页面添加对应ID名，其余页面删除对应ID名
                 * 3.为了给每页计算对应的ID名，我们需要获取所有页面元素、以及其个数、以及当前活动页面的索引。然后每当页面滑动后，通过判断当前活动页的索引，给出不同的ID名。
                 */


                let slideAry = this.slides,
                    total = slideAry.length,
                    curIndex = this.activeIndex;
                let curId = 'page';

                switch (curIndex) {   //判断当前滑动页面的索引，计算出当前活动页的id值
                    case 0:
                        curId += total - 2;
                        break;
                    case total - 1:
                        curId += 1;
                        break;
                    default:
                        curId += curIndex;
                }

                //循环所有页面，给当前活动页面添加对应ID名，其余页面移除ID名。
                [].forEach.call(slideAry, function (item, index) {
                    if (index == curIndex) {
                        item.id = curId;
                        return;
                    }
                    item.id = null;
                });


            }
        }
    });
};

//-->rem响应式初始化
-function () {
    let desW = 640,
        screenW = document.documentElement.clientWidth,
        ratio = screenW / desW;
    if (screenW > desW) {
        let oMain = document.getElementsByClassName('main')[0];
        oMain.style.margin = '0 auto';
        oMain.style.width = desW + 'px';
        return; //别忘记加return；
    }
    document.documentElement.style.fontSize = ratio * 100 + 'px';
}();


//-->music module
    //首先获取音乐按钮和音乐播放器
    let musicMenu = document.getElementById('musicMenu'),
        musicAudio = document.getElementById('musicAudio');

    //一秒后先让音乐播放，然后判断音乐是否能播放，如果能播放，再显示出播放按钮，并让按钮实现旋转效果-给按钮加上样式类名；如果播放失败的话就不会显示音乐按钮了。
    function canPlay() {
        musicAudio.volume = .1;
        musicAudio.play();
        musicAudio.addEventListener('canplay',function () {
            musicMenu.style.display = 'block';
            musicMenu.className = 'music rotate';
        },false)
    }
    window.setTimeout(canPlay, 1000);

    //给音乐按钮添加单击事件，如果音乐暂停，那么就让其播放，并让播放按钮旋转；否则，暂停，并让按钮动画停止旋转。
    musicMenu.addEventListener('click',function () {
        if(musicAudio.paused){
            musicAudio.play();
            musicMenu.className = 'music rotate';
            return;
        }
        musicAudio.pause();
        musicMenu.className = 'music';
    })


/*
 //练习
 -function () {
 let desW = 640,
 screenW = document.documentElement.clientWidth,
 ratio = desW / screenW;
 if (screenW > desW) {
 let oMain = document.getElementsByClassName('main')[0];
 oMain.style.margin = '0 auto';
 oMain.style.width = desW + 'px';
 return;
 }
 document.documentElement.style.fontSize = 100/ratio + 'px';
 }();

 let mySwiper = new Swiper('.swiper-container', {
 direction: 'vertical',
 loop: true,
 on: {
 slideChangeTransitionEnd: function () {
 let slideAry = this.slides,
 n = slideAry.length,
 curIndex = this.activeIndex;
 let curId = 'page';
 switch (curIndex) {
 case 0:
 curId += n - 2;
 break;
 case n - 1:
 curId += 1;
 break;
 default:
 curId += curIndex;
 }

 Array.prototype.forEach.call(slideAry,function (item, index) {
 if(index == curIndex){
 item.id = curId;
 }else{
 item.id = null;
 }
 });
 }
 }
 });*/
