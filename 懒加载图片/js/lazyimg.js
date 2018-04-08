var lazyImg = document.getElementsByTagName("img");
var lazyImgLen = lazyImg.length;
var winowBroswerHeight = document.documentElement.clientHeight;
// 初始第一屏图片
loadImg();
// 滚动时执行加载图片的方法
window.onscroll = loadImg;
// 按需加载图片
function loadImg() {
for (var i = 0; i < lazyImgLen; i++) {
var getTD = getTopDistance(lazyImg[i]);

if (!lazyImg[i].loaded && getTD <winowBroswerHeight ){
lazyImg[i].src = lazyImg[i].getAttribute("_src");
lazyImg[i].classList.add("fade");
lazyImg[i].loaded = true; // 标记为已加载
}
}
}
// 获取目录对象离 document 文档顶部的距离
function getTopDistance(obj) {
/*var TopDistance = 0;
while (obj) {
TopDistance += obj.offsetTop;
obj = obj.offsetParent;
}
return TopDistance;*/
var Y =obj.getBoundingClientRect().top;
return Y;
}
/*// 获取滚动条的滚动距离
function getScrollTop() {
return document.documentElement.scrollTop || document.body.scrollTop;
}*/
