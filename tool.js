function debounce(fn, wait) {
    var timer = null;
    return function () {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, wait)
    }
}
function throttle(fn, gapTime) {
    let _lastTime = null;
    return function () {
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn();
            _lastTime = _nowTime
        }
    }
}

function checkRepeatName(name, list){
    let exit = 0,
        exitExpand = 0,     
        exitFlag = true,
        numList = [];
    let p = new RegExp("(?=[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%])",'g'),  
        ruleone = new RegExp( "\^"+name.replace(p,'\\')+ "\\\(\\\d+\\\)$"),                                  
        ruletwo = new RegExp( "\^"+name.replace(p,'\\')+ "\\\((\\\d*)");                                     

    for(let v of list){
        if(exitFlag && v.name == name){
            exit = 1;
            exitFlag = false;
        }
        if(ruleone.test(v.name)){
            let tempNum = ~~v.name.match(ruletwo)[1];
            if(tempNum > 0){
                numList.push(tempNum);
                exitExpand = 1;
            }
        }
    }

    if(exit == 0){
        return name
    }else{
        if(exitExpand != 1){
            return `${name}(1)`
        }else{
            numList = numList.sort((a, b)=>{return a-b})
            var k
            for(var i = 0,len = numList.length; i < len; i++) {
                if(i+1 != numList[i]){
                    k = i+1
                    break
                }else {
                    k = numList[len-1] + 1
                }
            }
            return `${name}(${k})`
        }
    }
}
function toTop(){
    let targetDom = document.querySelector('.app');
    targetDom.scroll = (e) => {
        e.preventDefault()
    }
    const scrollToTop = () => {
        const scrollTop = targetDom.scrollTop;
        if (scrollTop > 0) {
            window['scrollTopID'] = window.requestAnimationFrame(scrollToTop);
            targetDom.scrollTo(0, scrollTop - scrollTop / 8);
        }else {
            window.cancelAnimationFrame(window['scrollTopID']);
            window['scrollTopID'] = null;
            targetDom.scroll = null;
        }
    }
    window['scrollTopID'] = window.requestAnimationFrame(scrollToTop);
}

class Expander {
    dom
    expandCallBack
    clickCallBack
    closeCallBack

    constructor(dom: HTMLElement, expandCallBack: object, clickCallBack: object, closeCallBack: object){
        this.dom = dom;
        this.expandCallBack = expandCallBack;
        this.clickCallBack = clickCallBack;
        this.closeCallBack = closeCallBack;
    }
    expand(){
        this.expandCallBack && this.expandCallBack();
        window.addEventListener("click", this.close);
    }
    select(args){
        this.clickCallBack && this.clickCallBack(args);
        window.removeEventListener("click", this.close);
    }
    close = (e) => {
        let objTarget = this.dom;
        if (objTarget != e.target && !objTarget.contains(e.target)) {
            this.closeCallBack && this.closeCallBack();
            window.removeEventListener("click", this.close);
        }
    }
    // etc
    // xxxFunc(type, args){
    //     if(!this.tempExpander){
    //         let dom = this.$refs.dom;
    //         let expand = () => {
    //             this.showFlag= true;
    //         }
    //         let select = (args) => {
    //             let { index } = args;
    //             this.showFlag = false;
    //         }
    //         let close = () => {
    //             this.showFlag = false;
    //         }
    //         this.tempExpander = new Expander(dom, expand, select, close);
    //     }
    //     if(type == 'expand'){
    //         this.tempExpander.expand()
    //     }else if(type == 'select'){
    //         this.tempExpander.select(args)
    //     }
    // }
}
