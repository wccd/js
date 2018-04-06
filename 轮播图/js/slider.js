var sliderbox = document.querySelector(".slider-box"); 
var slideral = document.querySelector(".slider-arrow-left");
var sliderar = document.querySelector(".slider-arrow-right");
var sliderbtn = document.querySelector(".slider-button");
var slider = document.querySelector(".slider");

var sliderimgsize =sliderbox.getElementsByTagName("div").length;
var slidercurrentItem =0;
var sliderimgwidth = 640;

slideral.onclick=function(){
	sliderleft();
	if(slidercurrentItem == 0){slidercurrentItem = sliderimgsize-3}
	else(slidercurrentItem -= 1)
	sliderdot(slidercurrentItem)
}
sliderar.onclick=function(){
	sliderright();
	if(slidercurrentItem == sliderimgsize-3){slidercurrentItem = 0}
	else(slidercurrentItem += 1)
	sliderdot(slidercurrentItem)
}
var getStyle = function(dom, attr){ 		//获取marginLeft值..style里面写的获取不了。内联样式可以直接获取
  return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
}
function sliderleft(){
	// 获取图片张数
	var a = parseInt(getStyle(sliderbox,"marginLeft"));
	switch(true){
		case (a==0):
			sliderbox.style.transition = "none";
			sliderbox.style.marginLeft = -((sliderimgsize-2)*sliderimgwidth)+"px"
			setTimeout(function(){
				sliderbox.style.transition = "all 0.2s ease-in";
				sliderbox.style.marginLeft = -((sliderimgsize-2)*sliderimgwidth)+sliderimgwidth + "px";
			},20)	
			break;
		case (a!=0):
			var newLeft = a+sliderimgwidth;
			sliderbox.style.transition = "all 0.2s ease-in";
			sliderbox.style.marginLeft = newLeft + "px";
			break;
	}

}
function sliderright(){
	var imgsize =sliderbox.getElementsByTagName("div").length;// 获取图片张数
	var maxsize = -((imgsize-2)*sliderimgwidth);
	var b = parseInt(getStyle(sliderbox,"marginLeft"));
	switch(true){
		case (b==maxsize):
			sliderbox.style.transition = "none";
			sliderbox.style.marginLeft = "0px"
			setTimeout(function(){
				sliderbox.style.transition = "all 0.2s ease-in";
				sliderbox.style.marginLeft = -sliderimgwidth + "px";
			},20)	
			break;
		case (b!=0):
			var newRight = b-sliderimgwidth;
			sliderbox.style.transition = "all 0.2s ease-in";
			sliderbox.style.marginLeft = newRight + "px";	
			break;
	}
	if(b==maxsize){
		sliderbox.style.marginLeft = "0px"
	}else{
		var newRight = b-sliderimgwidth;
		sliderbox.style.marginLeft = newRight + "px";	
	}

}
function sliderto(slidertag){
	var slidert = sliderimgwidth*(slidertag+1)
	sliderbox.style.marginLeft = -slidert+ "px";
}
/*圆点*/
function sliderdot(slidercurrent){
	var sliderdot = sliderbtn.getElementsByTagName("span");
	for(var i = 0;i < sliderdot.length; i++){
		sliderdot[i].className = "";
	} 
	sliderdot[slidercurrent].className = "on";
	//初始化的时候要将 第一个按钮点亮
}
function sliderdotselect(){
	var sliderdots = sliderbtn.getElementsByTagName("span");
	sliderdots[0].className = "on";
	for(let j = 0;j<sliderdots.length;j++){
		sliderdots[j].onclick = function(){
		sliderdot(j);
		sliderto(j);
		slidercurrentItem = j;
		}
	}
}
/*轮播*/
function sliderplay(){
	timer=setInterval(function(){
		sliderright();
		if(slidercurrentItem == sliderimgsize-3){slidercurrentItem = 0}
		else(slidercurrentItem += 1)
		sliderdot(slidercurrentItem)
		}
		,2000)
}
function sliderstop(){
	clearInterval(timer);
}

/*初始化*/

function init(){
	sliderdotselect();
	sliderplay();
	slider.addEventListener('mouseover',sliderstop);
    slider.addEventListener('mouseout',sliderplay);
}
init();
