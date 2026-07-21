/** common_module */
if (typeof window !== "undefined" && window.jQuery) {
    var $j = window.jQuery;
    if (!$j.isArray) $j.isArray = Array.isArray;
    if (!$j.isFunction) $j.isFunction = function(obj) { return typeof obj === "function"; };
    if (!$j.type) $j.type = function(obj) { return obj == null ? String(obj) : typeof obj; };
    if (!$j.trim) $j.trim = function(str) { return (str || "").trim(); };
    if (!$j.isWindow) $j.isWindow = function(obj) { return obj != null && obj === obj.window; };
    if (!$j.cssProps) $j.cssProps = {};
    if (!$j.cssHooks) $j.cssHooks = {};
    if (typeof Object.prototype.parse === "undefined") {
        Object.defineProperty(Object.prototype, "parse", { value: function() { return this; }, writable: true, configurable: true });
    }
    if ($j.easing && !$j.easing.easeOutQuint) {
        $j.easing.easeOutQuint = function (x) { return 1 - Math.pow(1 - x, 5); };
    }
    if (typeof $j.fn.lettering === "undefined") {
        $j.fn.lettering = function() { return this; };
    }
    if ($j.ajaxPrefilter) {
        $j.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = jqXHR.always;
        });
    }
}
document.querySelector("html").setAttribute(
    "data-country",
    window.location.pathname.split("/")[1]
);

var pluginObject = {};
var globalObject = {};
var eventObject = {};
var pluginReference = {};
var fo = {
    addPlugin : function(fn, selector){
        !pluginObject[fn.name] ? pluginObject[fn.name] = fn : null;
    },
    addGlobal : function(object, name){
        if(typeof object === 'object'){
            !globalObject[name] ? globalObject[name] = object : null;
        }
    },
    addEvent : function(object, name){
        if(typeof object === 'object'){
            $.extend(eventObject, object);
        }
    }
}

var customModule = {
    readyModule: [
        { selector: ".M01_A", plugin: "M01_A" },
        { selector: ".M01_B", plugin: "M01_B" },
        { selector: ".M01_C", plugin: "M01_C" },
        { selector: ".M01_D", plugin: "M01_D" },
        { selector: ".M04_B", plugin: "M04_B" },
        { selector: ".M04_D", plugin: "M04_D" },
        { selector: ".M04_E", plugin: "M04_E" },
        { selector: ".M05_A", plugin: "M05_A" },
        { selector: ".M06_A", plugin: "M06_A" },
        { selector: ".M06_B", plugin: "M06_B" },
        { selector: ".M06_C", plugin: "M06_C" },
        { selector: ".M07_A", plugin: "M07_A" },
        { selector: ".M09_A", plugin: "M09_A" },
        { selector: ".M09_B", plugin: "M09_B" },
        { selector: ".M11_A", plugin: "M11_A" },
        { selector: ".M21_A", plugin: "M21_A" },
        { selector: ".M21_B", plugin: "M21_B" },
        { selector: ".M22_A", plugin: "M22_A" },
        { selector: ".M26_A", plugin: "M26_A" },
        { selector: ".M22_A .txt_ty", plugin: "M21_B" }, // 예외 케이스: 이미 개발 전달된 내용이라 바꿀 수 없음
    ],
    loadModule: [
        // { selector: ".M01_A", plugin: "M01_A" },
        { selector: ".M26_B", plugin: "M26_B" },
    ]
};

$(document).ready(function(){
    var country = $("html").attr("data-country") || "en";
    if(country === "us" || country === "eu" || country === "in" || country === "vn" || country === "la" || country === "ap"){
        changeOnclickStr();
        changeAnchorTarget();
    }

    $('[data-fn]').each(function(i, el){
        var fnName = $(this).data('fn');
        if(!$(this).data("plugin")){
            if(pluginObject.hasOwnProperty(fnName)){
                $(this).data("plugin", new pluginObject[fnName]($(el)));
            }
        }
    })

    if(!customModule.readyModule.length) return;

    customModule.readyModule.map(function(module){
        $(module.selector).each(function(i, el){
            var fnName = module.plugin;
            if(!$(this).data("plugin")){
                if(pluginObject.hasOwnProperty(fnName)){
                    $(this).data("plugin", new pluginObject[fnName]($(el)));
                }
            }
        });
    });
    /* 210510 | 접근성 | 리소스 모바일일때 title 추가 */
    function setResourceTitle(){
        var lang = $("html").attr("lang") || "en";
        const offering = $('.filterContainer #resource_tab .btn').eq(0);
        const content = $('.filterContainer #resource_tab .btn').eq(1);
        const title = {
            ko: ["오퍼링 선택하기", "콘텐츠 유형 선택하기"],
            en: ["Choose an offerings", "Choose a content types"],
			zh: ["Choose an offerings", "Choose a content types"],
            pt: ["Choose an offerings", "Choose a content types"],
        };
        offering.attr("title", `${title[lang][0]} - ${langSet[lang].layerPop.layerOpen}`);
        content.attr("title", `${title[lang][1]} - ${langSet[lang].layerPop.layerOpen}`);
    }
    function removeResourceTitle(){
        var lang = $("html").attr("lang") || "en";
        $('.filterContainer #resource_tab .btn').attr("title", "");
    }
    
    if($(window).innerWidth() < 1024){
        setResourceTitle();
    }else{
        removeResourceTitle();
    }

     // window resize
    $(window).on('resize',function(){
        if($(window).innerWidth() < 1024){
            setResourceTitle();
        }else{
            removeResourceTitle();
        }
    });
    /* //210510 | 접근성 | 리소스 모바일일때 title 추가 */	

	/* 202403 웹접근 작업 */
    var headSkip = $('#skip_navi'),
        headSkip_li = headSkip.find('li');

    if(headSkip_li.find('button').length){
        headSkip_li.find('button').contents().unwrap().wrap( '<a href="#container"></a>' )
    }
    /* //202403 웹접근 작업 */

	/* drop & dwon 버튼 공통 */
    /**
        * slideToggle 형태가 아닌 형태일 경우 여기서 수정 
    */
    var $dropDown_btn = $('.dropDown');
    $dropDown_btn.on('click', function(e){
        e.preventDefault();
        $(this).next().stop().slideToggle();
        $(this).toggleClass('on');

		 if (!$(this).hasClass('on')) {
            $(this).attr({ 'aria-expanded': false });
        } else {
            $(this).attr({ 'aria-expanded': true });
        }
    });
    /* //drop & dwon 버튼 공통 */

    var $slideMenu = $('.custom_tab>ul')
    var $slideMenuBtn = $('.custom_tab .only_mb')
    $slideMenuBtn.on('click', function(e){
        e.preventDefault();
        $(this).toggleClass('show');
        $slideMenu.toggleClass('show');
    })
    
    checkCommonList();
});

$(window).on('load', function(){
    var country = $("html").attr("data-country") || "en";
    if(country === "us" || country === "eu" || country === "in" || country === "vn" || country === "la" || country === "ap"){
        changeOnclickStr();
        changeAnchorTarget();
    }

    $('[data-load-fn]').each(function(i, el){
        var fnName = $(this).data('loadFn');
        if(!$(this).data("plugin")){
            if(pluginObject.hasOwnProperty(fnName)){
                $(this).data("plugin", new pluginObject[fnName]($(el)));
            }
        }
    })

    if(!customModule.loadModule.length) return;
    customModule.loadModule.map(function(module){
        $(module.selector).each(function(i, el){
            var fnName = module.plugin;
            if(!$(this).data("plugin")){
                if(pluginObject.hasOwnProperty(fnName)){
                    $(this).data("plugin", new pluginObject[fnName]($(el)));
                }
            }
        });
    });

    /* 210412 | 웹접근성 | 동영상 대체텍스트 추가 */
    if($(".img .btn_vod, .is_showPopup").length){
        var lang = $("html").attr("lang") || "en";
        var country = $("html").attr("data-country") || "en";

        $(".img .btn_vod, .is_showPopup").each(function(){
            var $btnMovieDataTxt = $(this).parent().next().find("a:first").text();
            var $MakeblindTxt = "<span class='blind'>" + $btnMovieDataTxt +" "+ langSet[lang].video.play + "</span>"; 

            //20220411 접근성 대응
            if($(this).data("src")==undefined){
                $(this).attr("title", langSet[lang].layerPop.layerOpen);
            }else{
                if($(this).data("watch")!=undefined && $(this).data("watch") == "y"){
                    $(this).attr("title", langSet[lang].layerPop.VideoOpen);
                }else{
                    $(this).attr("title", langSet[lang]["openWindow"]);
                }
            }
            
            /* 210419 | 예외처리 case 추가, 210428 | btn_m 예외 추가 */
            if(!$(this).is(".btn_arrow, .btn_m, .btn_btm .btn")){
                $(this).find(".blind").remove();
                $(this).append($MakeblindTxt);
            }
            /* //210419 | 예외처리 case 추가 */
        });
    }

    if($('.is_NewWinVideo').length){
        var lang = $("html").attr("lang") || "en";
        var country = $("html").attr("data-country") || "en";   
        $(".is_NewWinVideo").each(function(){
            $(this).attr("title", langSet[lang]["openWindow"]);
        });
    }
    /* //210412 | 웹접근성 | 동영상 대체텍스트 추가 */

    /* 210412 | 웹접근성 | 공유 아이콘 팝업 열림 텍스트 추가 */
    if($(".md_btn_share").length){
        var lang = $("html").attr("lang") || "en";
        var $mdBtnShare = $(".md_btn_share");        
        $mdBtnShare.attr("title", langSet[lang].layerPop.layerOpen);           
    }
    /* //210412 | 웹접근성 | 공유 아이콘 팝업 열림 텍스트 추가 */

    /* 210714 : img mask add */    
    $(".md_link").on("focus mouseover", function(){
        var mask_over = $(this).find(".mask_over");
        
        if(!$(mask_over).length) {return;}
        $(this).addClass("on");
    });

    $(".md_link").on("focusout mouseleave", function(){
        var mask_over = $(this).find(".mask_over");
        
        if(!$(mask_over).length) {return;}
        $(this).removeClass("on");
    });
    /* //210714 : img mask add */

    function checkCube (){
        var _cubeEl = $('.M01_E_cont.cube');
        var _cubeBan = $(".M01_E_cont.cube .md_visual");
        var _cubeTabHeight = $(".cube_tab").outerHeight();
        var _originHeight = $(window).height() - $(".M00_A").height();
        var _replaceHeight = _originHeight - _cubeTabHeight;

       /** common_module */
if (typeof window !== "undefined" && window.jQuery) {
    var $j = window.jQuery;
    if (!$j.isArray) $j.isArray = Array.isArray;
    if (!$j.isFunction) $j.isFunction = function(obj) { return typeof obj === "function"; };
    if (!$j.type) $j.type = function(obj) { return obj == null ? String(obj) : typeof obj; };
    if (!$j.trim) $j.trim = function(str) { return (str || "").trim(); };
    if (!$j.isWindow) $j.isWindow = function(obj) { return obj != null && obj === obj.window; };
    if (!$j.cssProps) $j.cssProps = {};
    if (!$j.cssHooks) $j.cssHooks = {};
    if (typeof Object.prototype.parse === "undefined") {
        Object.defineProperty(Object.prototype, "parse", { value: function() { return this; }, writable: true, configurable: true });
    }
    if ($j.ajaxPrefilter) {
        $j.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = jqXHR.always;
        });
    }
}     _cubeBan.css("height", _replaceHeight);
    }
    checkCube ();

    $(window).on("resize", function(){
        checkCube ();
    });   
});
  

/* Timer Constructor */
function Timer(func, delay) {
    this.handle = 0;
    this.func = func;
    this.delay = delay;
}
Timer.prototype.start = function(newDelay) {
    if (typeof newDelay !== "undefined") {
        this.delay = newDelay;
    }
    this.stop();
    this.handle = setTimeout(this.func, this.delay);
    return this;
};
Timer.prototype.stop = function(newDelay) {
    if (this.handle) {
        clearTimeout(this.handle);
        this.handle = 0;
    }
    return this;
};

/* String Function */
String.prototype.dashToCamel = function(){
    return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

String.prototype.camelToDash = function(){
    return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

String.prototype.camelToUnderscore = function(){
    return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

/* XML Parsing, XML selector */
function OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
        xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
        if (obj[prop] instanceof Array) {
            for (var array in obj[prop]) {
                xml += "<" + prop + ">";
                xml += OBJtoXML(new Object(obj[prop][array]));
                xml += "</" + prop + ">";
            }
        } else if (typeof obj[prop] == "object") {
            xml += OBJtoXML(new Object(obj[prop]));
        } else {
            xml += obj[prop];
        }
        xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
}

function getChildByNodeName(node, nodeName){
    var children = node.childNodes;
    if(children.length){
        for(var i=0; i<children.length; i++){
            if(children[i].nodeName == nodeName){
                return children[i];
            }
        }
        return false;
    }else{
        return false;
    }
}
  
/* mobile check */
function isMobileDevice(){
return isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;    
}

/* checkEnvironment */
function checkEnvironment() {
    const elem = $("html");
    const userAgent = navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const ios = /iPhone|iPad|iPod/i;
    const aos = /Android/i;

    elem.removeAttr("data-device").removeAttr("data-os");

    ( mobile.test(userAgent) ) ? elem.attr("data-device","mobile") : elem.attr("data-device","pc");
    ( ios.test(userAgent) ) ? elem.attr("data-os", "ios") : null;
    ( aos.test(userAgent) ) ? elem.attr("data-os", "aos") : null;
}
checkEnvironment();
window.onload = ()=>{
    checkEnvironment();
    window.addEventListener("resize", checkEnvironment);
}
  
/* url check (onclick) */
function changeOnclickStr() { 
    var lang = $("html").attr("lang") || "en";
    var selector = document.querySelectorAll("*[onclick]");
    var reg = new RegExp("(window\.location\.href='\/en\/)(.*)(.html')","gi");

    for (var index = 0; index < selector.length; index++) {
        var element = selector[index];
        var onclickStr = element.getAttribute("onclick");
        
        // 정규식 통과하지않으면 다음 for 문으로 넘어감
        if(onclickStr.match(reg) === null){
            continue;
        }
        // Example
        // asis : outbound('/en/ai/ai.html','');window.location.href='/en/ai/ai.html'
        // tobe : outbound('/en/ai/ai.html','');window.open('/en/ai/ai.html', '_blank')
        var changeStr = onclickStr.replace(reg, function(match, p1, p2, p3) {
            return "window.open('/en/"+ p2 +"', '_blank');";
        });
        
        // 기존 이벤트 삭제
        element.onclick = null;
        // 신규 이벤트 추가
        element.setAttribute("onclick", changeStr);
        // title="new window"
        element.setAttribute("title", langSet[lang]["openWindow"]);
    }
}

/* url check (href) */
function changeAnchorTarget(){
    var lang = $("html").attr("lang") || "en";
    var selector = document.querySelectorAll("*[href]");

    for (var index = 0; index < selector.length; index++) {
        var element = selector[index];
        var hrefStr = element.getAttribute("href");
        
        // href 가 "/en/" 으로 시작하지않으면 다음 for 문으로 넘어감
        if(hrefStr.indexOf("/en/") !== 0){
            continue;
        }

        // target="_blank"
        element.setAttribute("target", "_blank");
        // title="new window"
        element.setAttribute("title", langSet[lang]["openWindow"]);
    }
}

/* tab_swiper */
function tabSwiper(el) {
    _proto = tabSwiper.prototype;
    this.$el = el;
    this.data = this.$el.data();
    this.addEventFlag = false;
    this.slide;
    this.$container = this.$el.hasClass("swiper-container") ? this.$el : this.$el.find(".swiper-container");
    this.$wrapper = this.$container.find(".swiper-wrapper");
    this.$items = this.$container.find(".swiper-slide");
    this.$prevBtn = this.$container.find(".btn_prev");
    this.$nextBtn = this.$container.find(".btn_next");
    this.key = Math.floor(this.$el.offset().top); //210510 | 접근성 | tabswiper focus

    var _this = this; // tab_swiper
    var deviceType; // "PC", "TABLET", "MOBILE" // 2023-04 접근성 수정

    _proto.init = function(){
        // Swiper bug { slidesPerView: "auto" }
        // Get an array of wrong numbers: slidesGrid / slidesSizesGrid / snapGrid
        // document ready(X), window load(O)
        // Set Swiper
        if(this.$el.hasClass("gnb_rolling")){
            setSwiperGnb(this);
        }else{
            setSwiper(this);
        }
        // Add Event
        if(!this.addEventFlag){
            this.addEvent();
        }
    }

    // Add Event
    _proto.addEvent = function(){
        // Device type check
        deviceType = checkDeviceType(); // 2023-04 접근성 수정
        _this.slide.on("reachEnd", function(thisSwiper) {
            var thisSwiper= this;
            if (deviceType.toLowerCase() === 'pc') return;
            if (!_this.$el.hasClass('category_swiper')) {
                return;
            }

            _this.$el
                .filter('.category_swiper')
                .find('.swiper-slide')
                .attr({ tabindex: -1, 'aria-hidden': true })
                .find('a, button')
                .attr({ tabindex: -1, 'aria-hidden': true });

            setTimeout(function () {
                let _eqValue = _this.$el.filter('.category_swiper').find('.swiper-slide-visible').length - 1;

                _this.$el
                    .filter('.category_swiper')
                    .find('.swiper-slide')
                    .filter('.swiper-slide-visible')
                    .removeAttr('tabindex aria-hidden')
                    .find('a, button')
                    .removeAttr('tabindex aria-hidden');

                _this.$el
                    .filter('.category_swiper')
                    .find('.swiper-slide')
                    .filter('.swiper-slide-visible')
                    .eq(_eqValue)
                    .attr({ tabindex: -1, 'aria-hidden': true })
                    .find('a, button')
                    .attr({ tabindex: -1, 'aria-hidden': true });

                if (_this.$items.eq(_this.$items.length - 1).hasClass('swiper-slide-visible')) {
                    _this.$items
                        .eq(_this.$items.length - 1)
                        .removeAttr('tabindex aria-hidden')
                        .find('a, button')
                        .removeAttr('tabindex aria-hidden');
                }
            }, 1);
        });

        /* 2023-04 접근성 수정 시작 */
        _this.slide.on('sliderMove', function () {
            setControlStyle(_this, _this.slide);
            if (deviceType.toLowerCase() === 'pc') return;
            if (!_this.$el.hasClass('category_swiper')) {
                return;
            }
            _this.$el
                .filter('.category_swiper')
                .find('.swiper-slide')
                .attr({ tabindex: -1, 'aria-hidden': true })
                .find('a, button')
                .attr({ tabindex: -1, 'aria-hidden': true });

            setTimeout(function () {
                let _eqValue = _this.$el.filter('.category_swiper').find('.swiper-slide-visible').length - 1;

                _this.$el
                    .filter('.category_swiper')
                    .find('.swiper-slide')
                    .filter('.swiper-slide-visible')
                    .removeAttr('tabindex aria-hidden')
                    .find('a, button')
                    .removeAttr('tabindex aria-hidden');

                _this.$el
                    .filter('.category_swiper')
                    .find('.swiper-slide')
                    .filter('.swiper-slide-visible')
                    .eq(_eqValue)
                    .attr({ tabindex: -1, 'aria-hidden': true })
                    .find('a, button')
                    .attr({ tabindex: -1, 'aria-hidden': true });

                if (_this.$items.eq(_this.$items.length - 1).hasClass('swiper-slide-visible')) {
                    _this.$items
                        .eq(_this.$items.length - 1)
                        .removeAttr('tabindex aria-hidden')
                        .find('a, button')
                        .removeAttr('tabindex aria-hidden');
                }
            }, 1);
        });

        // prev button click
        _this.$prevBtn.on('click', function () {
            _this.slide.slidePrev();
            setControlStyle(_this, _this.slide);
        });

        // next button click
        _this.$nextBtn.on('click', function () {
            _this.slide.slideNext();
            setControlStyle(_this, _this.slide);
        });

        // window resize
        $(window).on("resize", function(){
            if(_this.$el.hasClass("gnb_rolling")){
                setGnbRolling(_this, _this.slide);
            }else{
                setSlideStyle(_this, _this.slide);
            }
            var currentDeviceType = checkDeviceType();

            if (deviceType !== currentDeviceType) {
                deviceType = currentDeviceType;
                if (deviceType.toLowerCase() === 'pc') {
                    _this.$el
                    .filter('.category_swiper')
                    .find('.swiper-slide')
                    .removeAttr('tabindex aria-hidden')
                    .find('a, button')
                    .removeAttr('tabindex aria-hidden');
                };
            }
        });
    }

    // Set Swiper
    function setSwiper(_plugin){
        _plugin.slide = new Swiper(_plugin.$container, {
            a11y: true,
            loop : false,
            centeredSlides: false,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesVisibility :true,
            keyboardControl: true,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            /* S: Tab메뉴 시 슬라이더 오류: 불러올 때마다 새로 고침 해 주는 역할 2022.10.18 Add */
            observer: true,
            observeParents: true,
            /* E: 2022.10.18 Add */
            on: {
                init : function () {
                    setSlideStyle(_this, this);
                    setControlStyle(_this, this);
                },
            },
        });
    }

    // Set Swiper
    function setSwiperGnb(_plugin){
        _plugin.slide = new Swiper(_plugin.$container, {
            a11y: true,
            loop : false,
            centeredSlides: false,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesVisibility :true,
            keyboardControl: true,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            observer: true, 
            observeParents: true,
            on: {
                init : function () {
                    setSlideStyle(_this, this);
                    setControlStyle(_this, this);
                },
            },
        });
    }
                                        
    //Offering Gnb Rolling
    function setGnbRolling(_plugin, swiper){
        var slideWidth = 0;
        swiper.slidesSizesGrid.map(function(width){
            slideWidth += 246;
        });
        if(slideWidth <= swiper.size){
            // fixed wrapper
            _plugin.$prevBtn.not("[disabled]") && _plugin.$prevBtn.removeAttr("disabled", "disabled").removeClass("disabled");
            _plugin.$nextBtn.not("[disabled]") && _plugin.$nextBtn.removeAttr("disabled", "disabled").removeClass("disabled");
        }
    }

    // slide, prev button, next button style
    function setSlideStyle(_plugin, swiper){
        var slideWidth = 0;
        swiper.slidesSizesGrid.map(function(width){
            slideWidth += width;
        })
        if(slideWidth <= swiper.size){
            // fixed wrapper
            _plugin.$wrapper.not(".isFixed") && _plugin.$wrapper.addClass("isFixed").css("transform", "translate3d(0px, 0px, 0px);");
            // button disabled
            _plugin.$prevBtn.not("[disabled]") && _plugin.$prevBtn.addClass("disabled");
            _plugin.$nextBtn.not("[disabled]") && _plugin.$nextBtn.addClass("disabled");
        }else{
            // fixed wrapper
            _plugin.$wrapper.is(".isFixed") && _plugin.$wrapper.removeClass("isFixed").css("transform", "translate3d(0px, 0px, 0px);");
            // button disabled
            _plugin.$prevBtn.is("[disabled]") && _plugin.$prevBtn.removeAttr("disabled").removeClass("disabled");
            _plugin.$nextBtn.is("[disabled]") && _plugin.$nextBtn.removeAttr("disabled").removeClass("disabled");
        }
    }

    // prev button, next button style
    function setControlStyle(_plugin, swiper){
        // prev button
        if(swiper.translate >= 0){
            _plugin.$prevBtn.addClass("disabled");
        }else{
            _plugin.$prevBtn.removeAttr("disabled").removeClass("disabled");
        }

        // next button
        if(swiper.isEnd){
            _plugin.$nextBtn.addClass("disabled");
        }else{
            _plugin.$nextBtn.removeAttr("disabled").removeClass("disabled");
        }
    }

    function checkDeviceType() {
        if (window.innerWidth > 1023) {
            return 'PC';
        } else if (window.innerWidth > 600) {
            return 'TABLET';
        } else {
            return 'MOBILE';
        }
    }
    this.init();
}

fo.addPlugin(tabSwiper);

/* imgLiquid */
$(document).ready(function(){
    var option = {
        fill:true,
        horizontalAlign:"center",
        verticalAlign:"center"
    };
    $('.module_ty').find('.img .img_p, .img .img_m').imgLiquid(option);
    $('.visual_img').find('.img_p, .img_m').imgLiquid(option);
    $('.board_ty').find('.img .img_p').imgLiquid(option);

    /* 210406 | 웹접근성 | 이미지 대체텍스트 추가 */
    var lang = $("html").attr("lang") || "en";
    var parentClass = $('.module_ty, .visual_img, .board_ty');
    var parentClass2 = $('.vision_carousel');  /* 210525 |지속가능경영 | case 추가 */

    if(!parentClass.length) return;

    parentClass.find('.md_link .img_p, .md_link .img_m').each(function(e){
        var $this = $(this);
        var imgAlt = $this.find('img').attr("alt");
        var thisTit = $this.closest('.item, .li').find('.txt a').first().text();
        var thisTarget = $this.closest('.md_link');

        $this.find('img').attr("aria-hidden","true");
        
        if(thisTarget.attr('target') == "_blank" && !thisTarget.attr('title')){
            thisTarget.attr('title', langSet[lang]["openWindow"]);
        };
        if(!$this.hasClass('img_m')){ //PC를 기준으로 alt값 출력 | alt값 없을시 md_tit값 출력
            if(imgAlt){
                thisTarget.append('<div class="blind">'+ imgAlt +'</div>');
            }else{
                thisTarget.append('<div class="blind">'+ thisTit +'</div>');
            };
        }
    });
    /* //210406 | 웹접근성 | 이미지 대체텍스트 추가 */

    /* 210525 |지속가능경영 | case 추가 */
    if(!parentClass2.length) return;

    parentClass2.find('.img_p').each(function(e){
        var $this = $(this);
        var imgAlt = $this.find('img').attr("alt");
        var thisTarget = $this.closest('.visual_img');

        $this.find('img').attr("aria-hidden","true");        
        if(imgAlt){
            thisTarget.append('<div class="blind">'+ imgAlt +'</div>');
        }
    });
    /* 210525 |지속가능경영 | case 추가 */

    /* 210525 | 탭 클릭시 실행 추가 */
    $('#tab_sel_list').on("click", function(){
        if(!$('.module_ty')) { return; }
        moduleAlign();
    });
    /* 210525 | 탭 클릭시 실행 추가 */
});

$(function(){
    $(document).ready(function(){
        moduleAlign();
    });
    $(window).resize(function(){
        setTimeout(() => {
            moduleAlign();
        }, 300);
    });
});
  
function moduleAlign(){
    if ( $('.module_ty').length < 1 ) return;

    var $module_ty = $('.module_ty');
    var option = {
        initial: {
            tbyRow: true,
            remove: false
        },
        remove: {
            remove: true
        }
    }
    if (window.innerWidth < 601){
        $module_ty.each(function() {
            $(this).find('.md_tit').matchHeight(option.remove);
            $(this).find('.md_tit02').matchHeight(option.remove);
            $(this).find('.md_txt').matchHeight(option.remove);
            $(this).find('.md_txt02').matchHeight(option.remove);
        });
    }else{
        $module_ty.each(function() {
            $(this).find('.md_tit').matchHeight(option.initial);
            $(this).find('.md_tit02').matchHeight(option.initial);
            $(this).find('.md_txt').matchHeight(option.initial);
            $(this).find('.md_txt02').matchHeight(option.initial);
        });
    }
}
  
/** like, share **/
$(function(){
    // 참고
    // 1. $shareBox 여는 부분은 ion_common 또는 html 내부에 존재
    // 2. 하단 md_pop_share, md_pop_share02, md_pop_share03 사용되는곳 없는것으로 추정됨
    // 3. $shareBox.on("focusin") setTimeout 사용 이유: $shareBox 포커스 들어오는 시점이 각각 다름
    var lang = $("html").attr("lang") || "en"; 
    var $shareBox = $(".md_share_box");
    var $shareDim = $(".md_share_dimd");   
    var $shareCloseBtn = $(".md_btn_share_close");

    /* 210412 | 접근성 | 대체텍스트 추가 */     
    $shareBox.find("a").not($shareCloseBtn).attr("title", langSet[lang]["openWindow"]);    
    $shareBox.find(".tit").text(langSet[lang].share.shareOpen).toString();
    $shareCloseBtn.find("span").text(langSet[lang].share.shareClose).toString();   
    /* //210412 | 접근성 | 대체텍스트 추가 */ 

    var resizeTimer = new Timer(function(){                    
        // mdShareClose(); 20250328 웹접근 삭제
    }, 100);

    // share dim
    $shareDim.click(function(){
        mdShareClose();
        return false;
    });

    // share close
    $shareCloseBtn.on({
        "click": function(){
            console.log("close btn click")
            mdShareClose();
            return false;
        }
    })

    // 포커스 트랩 구현
    $shareBox.on("keydown", function (e) {
        // 웹접근성을 위한 버튼 리스트
        var $shareBoxBtn = $shareBox.find('a, button').filter(':visible');
        var $share_firstBoxBtn = $shareBoxBtn.first();
        var $share_lastBoxBtn = $shareBoxBtn.last();

        if (e.keyCode === 9) { // Tab 키
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === $share_firstBoxBtn[0]) {
                    e.preventDefault();
                    $share_lastBoxBtn.focus(); // 마지막 버튼으로 이동
                }
            } else { // Tab
                if (document.activeElement === $share_lastBoxBtn[0]) {
                    e.preventDefault();
                    $share_firstBoxBtn.focus(); // 첫 번째 버튼으로 이동
                }
            }
        }
    });

    $(window).on({
        "resize" : function (){
            resizeTimer.start();
        },
        "scroll": function(){
            resizeTimer.start();
        }
    });
});

// 공유 팝업 열릴 때 포커스 설정
function focusTrapOn(mdShareBTn) {
    mdShareBTn.find('a, button').filter(':visible').first().focus();
}

let lastActivatedButton = null; // 마지막으로 활성화된 버튼을 저장
function focusTrapOff() {
    if (lastActivatedButton) {
        lastActivatedButton.focus(); // 마지막으로 활성화된 버튼에 포커스 복원
    }
}

function md_pop_share(obj){
    if($(obj).hasClass('on')){
        $(obj).removeClass('on');
        $('.md_share_area').removeClass('on').removeClass('off');
        $('.md_btn_share').removeClass('on');
    }else{        
        var offsetPosition = $(obj).offset();
        var w = ($(window).width() - $('#wrap').width()) * 0.5;
        var x = offsetPosition.left + 30 - w;
        var y = offsetPosition.top - 2;
        var mdShareBTn = $('.md_share_area');
        $('#md_share_area').addClass('on');
        $('#md_share_area').css('left', x).css('top', y);
        $('.md_btn_share').removeClass('on');
        $(obj).addClass('on');

        // 마지막으로 활성화된 버튼 저장
        lastActivatedButton = $(obj);

        // 포커스 트랩 활성화
        focusTrapOn(mdShareBTn);
    }
    return false;
}
function md_pop_share02(obj){
    if($(obj).hasClass('on')){
        $(obj).removeClass('on');
        $('.md_share_area').removeClass('on').removeClass('off');
        $('.btn_md_share').removeClass('on');
    }else{        
        var offsetPosition = $(obj).offset();
        var w = ($(window).width() - $('#wrap').width()) * 0.5;
        var x = $(window).width() - offsetPosition.left + 10 - w;
        var y = offsetPosition.top - 23;
        var mdShareBTn = $('.md_share_area');
        $('#md_share_area').addClass('on');
        $('#md_share_area').css('right', x).css('top', y);
        $('.btn_md_share').removeClass('on');
        $(obj).addClass('on');

        // 마지막으로 활성화된 버튼 저장
        lastActivatedButton = $(obj);

        // 포커스 트랩 활성화
        focusTrapOn(mdShareBTn);
    }
    return false;
}
function md_pop_share03(obj){
    if($(obj).hasClass('on')){
        $(obj).removeClass('on');
        $('.md_share_area').removeClass('on').removeClass('off');
        $('.btn_md_share').removeClass('on');
    }else{
        var offsetPosition = $(obj).offset();
        var x = offsetPosition.left + 160;
        var y = offsetPosition.top - 0;
        var mdShareBTn = $('.md_share_area');
        $('#md_share_area').addClass('on');
        $('#md_share_area').css('left', x).css('top', y);
        $('.btn_md_share').removeClass('on');
        $(obj).addClass('on');

        // 마지막으로 활성화된 버튼 저장
        lastActivatedButton = $(obj);

        // 포커스 트랩 활성화
        focusTrapOn(mdShareBTn);
    }
    return false;
}

function md_pop_share04(obj){
    if($(obj).hasClass('on')){
        $(obj).removeClass('on');
        $('.md_share_area').removeClass('on').removeClass('off');
    }else{
        var offsetPosition = $(obj).offset();
        var btnWidth = $(obj).outerWidth();
        var btnHeight = $(obj).outerHeight();
        var popupShare = $('.md_share_area');
        var popupWidth = popupShare.outerWidth();
        var parentMargin =  parseInt(popupShare.parent().css("margin-left"));
		var x = offsetPosition.left + btnWidth - popupWidth - parentMargin;
		var y = offsetPosition.top + btnHeight + 10;
        var mdShareBTn = $('.md_share_area');
        $('#md_share_area').addClass('on');
        $('#md_share_area').css('left', x).css('top', y);
        $('.md_btn_share').removeClass('on');
        $(obj).addClass('on');

        // 마지막으로 활성화된 버튼 저장
        lastActivatedButton = $(obj);

        // 포커스 트랩 활성화
        focusTrapOn(mdShareBTn);
    }
    return false;
}

function mdShareClose(){
    console.log("mdShareClose function")
    var lang = $("html").attr("lang") || "en";
    if(!$('.md_share_area').hasClass("on")) return;
    if( $('.md_share_area').hasClass("off")) return;
    $('.md_share_area').addClass('off');
    $(".md_btn_share").find(".blind").text(langSet[lang].share.shareOpen).toString(); 
    setTimeout(function(){
        $('.md_btn_share.on').length && $('.md_btn_share.on').removeClass('on');
        $('.btn_md_share.on').length && $('.btn_md_share.on').removeClass('on');
        $('.share_btn.on').length && $('.share_btn.on').removeClass('on');
        $('.add_share.on').length && $('.add_share.on').removeClass('on');
        $('.post_share.on').length && $('.post_share.on').removeClass('on');
    }, 0);
    setTimeout(function(){
        $('.md_share_area').removeClass('on').removeClass('off');
    }, 250);
    focusTrapOff();
}
  
/** 접근성 **/
$(function(){
    /** Footer **/
    var $footer = $("#footer");
    var $lang = $('.etc_lang, .etc_toggle');
    var $drop = $('.etc_drop');

    function footerRez(){
        if(!$lang.hasClass("on")) return;
        $lang.removeClass('on');
        $lang.find('.sub_menu').hide();
    }

    var footerRez_resizeTimer = new Timer(function(){
        footerRez();
    }, 100);

    $(document).ready(function(){
        // footerEvent();
        footerRez();
    });
    $(window).resize(function(){
        footerRez_resizeTimer.start();
    });
});

/* 페이지 내 스크롤 앵커 (btn_anchor) */
$(function(){
    $('.btn_anchor').click(function(e){
        e.preventDefault();
        var t = $(this).attr("href");
        if ( $(t).length ){
            $('html, body').stop().animate({
                scrollTop:$(t).offset().top - 50
            }, 800, function(){
                $(t).get(0).focus({preventScroll:false});
                $('html,body').scrollTop($(t).offset().top - 50);
            });
        }
    });
});
  
  
/* 상단 띠배너 */
function initTailBox(){
    if(!$('.tail_wrap').length) return;
    var tailResizeTImer = new Timer(function(){
        $('.tail_wrap').filter(':visible').closest('body').addClass('tail_chk');
    },100);

    $(window).on('resize', function(){
        tailResizeTImer.start();
    });

    $('.tail_wrap .btn_close').click(function(e){
        e.preventDefault();
        $('.tail_wrap').hide();
        $('body').removeClass('tail_chk');
        $('.M01_A_cont').trigger('initHeight');
        if (window['GNB']) GNB.setHeightRightContainer();
        if ( $('#seelater').is(':checked') ) {
            $.cookie('tailboxSeeLater', 'Y', { expires: 1, path: '/' });
        }
    });
    $('.tail_wrap').filter(':visible').closest('body').addClass('tail_chk');
    //$(window).scrollTop(0);
    if (window['GNB']) GNB.setSticky();
}

/* M15_A | location hash | index class */
$(function(){
    if(!$(".M15_A").length) return;
    var M15_A_array;
    $("#container").each(function(){
        M15_A_array = $(this).find(".M15_A");
    });
    M15_A_array.map(function(key, value){
        if(!$(value).find(".tab_list .tab_btn").length) return;
        var contIdx = key + 1;
        $(value).find(".tab_list .tab_btn").each(function(index){
            var btnIdx = index + 1;
            var classKey = contIdx + "_" + btnIdx;
            $(this).addClass("tab_link_"+classKey);
        });
    });
});

/* Lang Set *//* 210412 | 웹접근성 | 데이터 추가 */
// sample:
// var lang = $("html").attr("lang") || "en";
// langSet[lang]["slide"]["playStr"]
var langSet = {
    "ko": {
        "countryCode" : "kr",    
        "history" : {
            "activeStr":"최근방문기록 열기",
            "title" : "Visit History",
            "desc" : "최근방문한 페이지가 최대 30개 저장됩니다.",
            "clearall" : "전체삭제",
            "close" : "최근방문기록 닫기",
            "emptyHistory" : "방문한 이력이 없습니다."
        },
        "search" : {
            "activeStr":"검색창 열기",
            "placeholder" : "검색어를 입력하세요",
            "search" : "검색",
            "close" : "검색창 닫기",
            "clear" : "검색어 삭제"
        },
        "rnb" : {
            "activeStr":"전체메뉴 열기",
            "inactiveStr":"전체메뉴 닫기"
        },        
        "menuState":{
            "activeStr":"메뉴열기",
            "inactiveStr":"메뉴닫힘"
        },        
        "words":{
            "summary":"개요"
        },
        "slide":{
            "prevStr":"이전",
            "nextStr":"다음",
            "playStr": "재생",
            "pauseStr": "멈춤",
            "soundOn": "ON",
            "soundOff": "OFF",
            "selected": "현재위치"
        },
        "expanded":{
            "trueStr":"숨기기",
            "falseStr":"더보기",
            "trueStr_M08_B":"자료 숨기기",
            "falseStr_M08_B":"자료 더보기"
        },       
        "share" :{
            "share" : "공유하기",
            "shareOpen" : "공유하기 열기",
            "shareClose" : "공유하기 닫기"
        },
        "video" :{
            "play" : "동영상 보러가기"
        },
        "layerPop" :{
            "layerOpen" : "레이어 팝업 열림",
            "layerClose" : "레이어 팝업 닫힘",
            "VideoOpen" : "레이어 팝업에서 이 동영상 재생"
        },
        "calenderDate" :{
            "dateStart" : "시작일",
            "dateEnd" : "종료일",
        },
        "seeLater": "오늘 하루 보지 않기",
        "openWindow": "새창열림",
        "ReadMore": "자세히 보기",
        "downLoad": "다운로드"
    },
    "en":{
        "countryCode" : "en",        
        "history" : {
            "activeStr":"Open History",
            "title" : "Visit History",
            "desc" : "Up to 30 recently visited pages are logged.",
            "clearall" : "Clear All",
            "close" : "Close History",
            "emptyHistory" : "No Visit history."
        },
        "search" : {
            "activeStr":"Open search",
            "placeholder" : "Search",
            "search" : "Search",
            "close" : "Close Search",
            "clear" : "Clear"
        },
        "rnb" : {
            "activeStr":"Open Right Global Navigator",
            "inactiveStr":"Close Right Global Navigator"
        },
        "menuState":{
            "activeStr":"Open Menu",
            "inactiveStr":"Close Menu"
        },       
        "words":{
            "summary":"Summary"
        },
        "slide":{
            "prevStr":"Prev",
            "nextStr":"Next",
            "playStr": "Play",
            "pauseStr": "Stop",
            "soundOn": "ON",
            "soundOff": "OFF",
            "selected": "selected"
        },
        "expanded":{
            "trueStr":"Close",
            "falseStr":"See more",
            "trueStr_M08_B":"Close",
            "falseStr_M08_B":"See more"
        },        
        "share" :{
            "share" : "share",
            "shareOpen" : "Share Open",
            "shareClose" : "Share Close"
        },
        "video" :{
            "play" : "Play Video"
        },
        "layerPop" :{
            "layerOpen" : "Layer pop-up open",
            "layerClose" : "Layer pop-up Close",
            "VideoOpen" : "Play this video on the layer pop-up"
        },
        "calenderDate" :{
            "dateStart" : "START DATE",
            "dateEnd" : "END DATE",
        },
        "seeLater": "Check to not see again",
        "openWindow": "new window",
        "ReadMore": "Read More",
        "downLoad": "download"
    },
    "zh":{
        "countryCode" : "cn",
        "history" : {
            "activeStr":"打开",
            "title" : "Visit History",
            "desc" : "最多记录30个最近访问的页面。",
            "clearall" : "删除所有",
            "close" : "关闭",
            "emptyHistory" : "没有访问历史."
        },
        "search" : {
            "activeStr":"打开",
            "placeholder" : "搜索",
            "search" : "关键词搜索",
            "close" : "关闭",
            "clear" : "删除"
        },
        "rnb" : {
            "activeStr":"open right global navigator",
            "inactiveStr":"close right global navigator"
        },
        "menuState":{
            "activeStr":"打开",
            "inactiveStr":"关闭"
        },        
        "words":{
            "summary":"概括"
        },
        "slide":{
            "prevStr":"Prev",
            "nextStr":"Next",
            "playStr": "Play",
            "pauseStr": "Stop",
            "soundOn": "ON",
            "soundOff": "OFF"
        },
        "expanded":{
            "trueStr":"Close",
            "falseStr":"See more",
            "trueStr_M08_B":"Close",
            "falseStr_M08_B":"See more"
        },      
        "share" :{
            "share" : "share",
            "shareOpen" : "Share Open",
            "shareClose" : "Share Close"
        },
        "video" :{
            "play" : "Play Video"
        },
        "layerPop" :{
            "layerOpen" : "Layer pop-up open",
            "layerClose" : "Layer pop-up Close",
            "VideoOpen" : "Play this video on the layer pop-up"
        },
        "calenderDate" :{
            "dateStart" : "起始日期",
            "dateEnd" : "结束日期",
        },
        "seeLater": "Check to not see again",
        "openWindow": "new window",
        "ReadMore": "Read More",
        "downLoad": "download"
    },
    "pt":{
        "countryCode" : "pt",
        "history" : {
            "activeStr":"história aberta",
            "title" : "Visit History",
            "desc" : "Até 30 páginas visitadas recentemente são registradas.",
            "clearall" : "limpar tudo",
            "close" : "história próxima",
            "emptyHistory" : "sem histórico de visitas."
        },
        "search" : {
            "activeStr":"busca aberta",
            "placeholder" : "buscar",
            "search" : "buscar",
            "close" : "fechar busca",
            "clear" : "limpar"
        },
        "rnb" : {
            "activeStr":"open right global navigator",
            "inactiveStr":"close right global navigator"
        },
        "menuState":{
            "activeStr":"open Menu",
            "inactiveStr":"close Menu"
        },        
        "words":{
            "summary":"summary"
        },
        "slide":{
            "prevStr":"Prev",
            "nextStr":"Next",
            "playStr": "Play",
            "pauseStr": "Stop",
            "soundOn": "ON",
            "soundOff": "OFF"
        },
        "expanded":{
            "trueStr":"Close",
            "falseStr":"See more",
            "trueStr_M08_B":"Close",
            "falseStr_M08_B":"See more"
        },       
        "share" :{
            "shareOpen" : "Share Open",
            "shareClose" : "Share Close"
        },
        "video" :{
            "play" : "Play Video"
        },
        "layerPop" :{
            "layerOpen" : "Layer pop-up open",
            "layerClose" : "Layer pop-up Close",
            "VideoOpen" : "Play this video on the layer pop-up"
        },
        "calenderDate" :{
            "dateStart" : "DATA INICIO",
            "dateEnd" : "DATA FIM",
        },
        "seeLater": "Check to not see again",
        "openWindow": "Abrir uma nova",
        "ReadMore": "Read More",
        "downLoad": "download"
    }
}
/* Lang Set *//* 210412 | 웹접근성 | 데이터 추가 */

function handleRnbScrollControl(e) {
    if ($('body').is('[class *= "rnb-active"]')) {
        let $otrOfrngRnb = null;
        let $inerOfrngRnb = null;
        let $scrlEl = null;

        const $rnb = $('.rnb');
        const $firstMenuItem = $rnb.find('li');
        const $firstMenuItemActive = $firstMenuItem.filter('.on');
        // const $secondMenu = $firstMenuItemActive.find('.depth-sub .scroll-wrapper.depth2');
        const $secondMenu = $firstMenuItemActive.find('.depth-sub .scroll-wrapper');
        const $secondMenuItem = $secondMenu.find('ul.depth2 > li');
 
        if ($('body').hasClass('rnb-active-second')) {
			// 오른쪽 메뉴
            if ($firstMenuItemActive.find('.renewal_offering_rnb').length > 0) {
				// 신규 스타일 메뉴
                $otrOfrngRnb = $firstMenuItemActive.find('.renewal_offering_rnb').outerHeight();
                $inerOfrngRnb = $firstMenuItemActive.find('.renewal_offering_rnb .inner_offering_rnb').outerHeight();
                $scrlEl = $firstMenuItemActive.find('.renewal_offering_rnb .scroll-element.scroll-y .scroll-bar');
            } else {
                // 기존 스타일 메뉴
                let title_height = $secondMenu.find('.md_tit').length > 0 ? $secondMenu.find('.md_tit').toArray().map((currentValue) => $(currentValue).outerHeight(true)).reduce((accumulator, currentValue) => accumulator + currentValue) : null;
                $otrOfrngRnb = $secondMenu.outerHeight();
                $inerOfrngRnb = $secondMenuItem.toArray().map((currentValue) => $(currentValue).outerHeight(true)).reduce((accumulator, currentValue) => accumulator + currentValue) + title_height; // 배열의 높이 + (.md_title이 있을경우) 총 합한값
                $scrlEl = $secondMenu.find('.scroll-element.scroll-y .scroll-bar');
            }
        } else {
            // 왼쪽 메뉴
            $otrOfrngRnb = $rnb.find('.depth-main > .scroll-wrapper > .scroll-content').outerHeight();
            $inerOfrngRnb = $rnb.find('.depth-main ul.depth1_ul').outerHeight() * $rnb.find('.depth-main ul.depth1_ul').length;
            $scrlEl = $rnb.find('.depth-main > .scroll-wrapper > .scroll-element.scroll-y .scroll-bar');
        }
 
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            if ($scrlEl.css('top') === 'auto' || parseInt($scrlEl.css('top')) <= 0) {
                // 플러그인 스크롤바는 더 이상 위로 이동할 수 없는 상태입니다.
                e.preventDefault();
                return false;
            }
        } else {
            if ($scrlEl.css('top') === 'auto' || parseInt($scrlEl.css('top')) >= $inerOfrngRnb - $otrOfrngRnb - 0) {
                // 플러그인 스크롤바는 더 이상 아래로 이동할 수 없는 상태입니다.
                e.preventDefault();
                return false;
            }
        }
    } else {
        e.preventDefault();
        return false;
    }
}

$(function () {
	// gnb.html이 준비됐을 때 각 영역의 첫 번째 메뉴를 활성화
	let _checkElement = setInterval(() => {
		let $wrapper = $('.renewal_offering');

		if ($wrapper.length) {
			clearInterval(_checkElement);
			$wrapper.each(function (index, element) {
				let $group = $(element).find('[class *= "group_offering"]');
				let $depth1 = $group.filter('[data-offering-depth = "1"]').find('.item_offering_depth1');
				let $depth2 = $group.filter('[data-offering-depth = "2"]').find('.inner_offering_depth2');
                /* 20231030 삭제 */
				// $depth1.eq(0).addClass('current');
				// $depth2.eq(0).addClass('active');
			});
		}
	}, 40);
	
	let rnbActive = null;
	$(document).on('mouseenter', '.rnb .depth-main .depth1_ul .dep1, .rnb .renewal_offering_rnb, .rnb .depth-sub', function (event) {
		if (!rnbActive) rnbActive = /renewal_offering_rnb|depth-sub/.test(event.currentTarget.className) ? 'rnb-active-second' : 'rnb-active';
		if ($('.rnb').has(event.currentTarget).length) $('body').addClass(rnbActive);
	}).on('mouseleave', '.rnb .depth-main .depth1_ul .dep1, .rnb .renewal_offering_rnb, .rnb .depth-sub', function () {
		$('body').removeClass(rnbActive);

		rnbActive = null;
	});



    /** 20240723 메인 스크립트 추가 */
    let mainBx = $(".sds-wrap, .sub-wrap");

    /** ----------------------- 공통 ----------------------- */
    /** common-ani-bx box 컨텐츠 애니메이션 효과 */
    function createInShow() {
        $(".common-ani-bx").each(function () {
            let bx = $(this);
            gsap.timeline({
                scrollTrigger: {
                    trigger: bx,
                    start: "150 bottom",
                    end: "150 bottom",
                    once: true,
                    scrub: true,
                    onEnter: function () {
                        let aniItems = bx.find(".common-ani-item");

                        aniItems.each(function ($index) {
                            gsap.fromTo($(this),
                                {opacity: 0, y: 50},
                                {opacity: 1, y: 0, duration: 0.75, ease: Cubic.easeOut, delay: 0.1 * $index}
                            )
                        });
                    }
                }
            })
        })
    }

    if(mainBx.length) {
        createInShow(); //공통 : 텍스트 애니메이션 효과
    }
    /** //20240723 메인 스크립트 추가 */
});

function mainSlideDot_countCheck(module, moduleEl){
    $(window).on("resize.mainSlideDot_countCheck", function(){
        if(moduleEl.find('li').length > 11) {
            moduleEl.parent().addClass("dotMax_11")
        } else {
            moduleEl.parent().removeClass("dotMax_11")
            }
    });
    $(window).trigger('resize.mainSlideDot_countCheck');
}

const slide = {
    setSlideItemAttr ( module, data ) {
        const { carousel, slides, activeSlides } = data;

        carousel.removeAttr("tabindex");
        Array.from(slides).forEach( a => {
            $(a).removeAttr("tabindex aria-hidden");
            $(a).find('a, button').attr({"tabindex": -1, "aria-hidden": true});
        });
        Array.from(activeSlides).forEach( a => {
            $(a).find('a, button').removeAttr("tabindex aria-hidden");
        })
    },
    setTabSlideAttr ( module, data ) {
        const { carousel, type, key, tablist, tablists, tabpanel, tabpanels, activeIdx, clonePanelActiveIdx } = data;
        const { setting, orientation } = type;

        const activePanelIndex = clonePanelActiveIdx || activeIdx;   // clonePanelActiveIdx 값 여부에 따라 탭 패널의 active index 변경

        if( setting ) {
            $(tablist).attr({"role": "tablist"});
            $(tablist).find("li").attr({"role": "presentation"});

            Array.from(tablists).forEach((a, i) => {
                $(a).attr({
                    "id": `tab_btn_${key}`,
                    "role": "tab",
                    "aria-controls": `tab_panel_${key}`,
                    "aria-selected": false,
                    "aria-hidden": true,
                    "tabindex": -1,
                })
            });

            Array.from(tabpanels).forEach((a, i) => {
                $(a).attr({
                    "id": `tab_panel_${key}`,
                    "role": "tabpanel",
                    "aria-labelledby": `tab_btn_${key}`,
                    "aria-hidden": true,
                    "tabindex": -1,
                });
                $(a).find("a, button").attr({"aria-hidden": true, "tabindex" : -1})
            });
        }

        // orientation
        $(tablist).attr({"aria-orientation": orientation });
        
        $(tablists)
            .removeClass("active")
            .attr({"aria-hidden": true, "tabindex" : -1})
            .attr({"aria-selected": false})

        $(tablists).eq(activeIdx)
            .addClass("active")
            .removeAttr("aria-hidden tabindex")
            .attr({"aria-selected": true})
        
        $(tabpanels)
            .removeClass("active")
            .attr({"aria-hidden": true, "tabindex" : -1})
            .find("a, button").attr({"aria-hidden": true, "tabindex" : -1})

        $(tabpanels).eq(activePanelIndex)
            .addClass("active")
            .removeAttr("aria-hidden tabindex")
            .find("a, button").removeAttr("aria-hidden tabindex")
    },
    setPagn ( module, data ) {
        const { carousel, slides, activeIdx, element, clone: getClone } = data;
        const { st, ed, bar } = element;
        let clone = getClone || 0;

        let edNum = slides / (clone + 1);
        let stNum = activeIdx % edNum + 1;
        let barNum = ( 100 / edNum ) * stNum;

        st.text(String(stNum).padStart(2, 0));
        ed.text(String(edNum).padStart(2, 0));
        bar.css("width", `${barNum}%`);
    },
    setControlAttr ( module, data ) {
        const { carousel, option, changeFocus, element } = data;
        const { wrap, playBtn, stopBtn } = element;

        switch(option){
            case "PLAY":
                $(wrap).removeClass("on");
                $(playBtn).attr({"aria-hidden": true, "tabindex": -1});
                $(stopBtn).removeAttr("aria-hidden tabindex")
                if(changeFocus) $(stopBtn).focus();
                break;
            case "STOP":
                $(wrap).addClass("on");
                $(stopBtn).attr({"aria-hidden": true, "tabindex": -1});
                $(playBtn).removeAttr("aria-hidden tabindex")
                if(changeFocus) $(playBtn).focus();
                break;
            default:
        }
    },
    setSelectedPagn ( module, data ) {
        const lang = $("html").attr("lang") || "en";
        const { carousel, items, activeIdx, element } = data;
        const { wrap } = element;

        $(items).removeAttr("aria-selected title class").removeClass("selected");
        $(items).eq(activeIdx).attr({ "aria-selected": true, "title": langSet[lang].slide.selected }).addClass("selected");
    },
    setTabDragEvent( module, data ) {
        const { element } = data;

        const slider = element;
        let isDown = false;
        let startX;
        let scrollLeft;
      
        slider.addEventListener('mousedown', e => {
          isDown = true;
          slider.classList.add('drag');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        });
      
        slider.addEventListener('mouseleave', () => {
          isDown = false;
          slider.classList.remove('drag');
        });
      
        slider.addEventListener('mouseup', () => {
          isDown = false;
          slider.classList.remove('drag');
        });
      
        slider.addEventListener('mousemove', e => {
          if (!isDown) return; 
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = x - startX;
          slider.scrollLeft = scrollLeft - walk;
        });
    },
    setTabScroll( module, data ) {
        const { tabSlideArea, tab, tabItems, activeIdx } = data;
        if(isNaN(activeIdx)) return;

        const tabSlideAreaW = tabSlideArea.width();

        const a = $(tabItems[activeIdx]);
        const li = a.parent();

        tab.css({ "position" : "relative" });
        li.css({ "position": "initial" });

        const aLeft = a.position().left;
        const aW = a.innerWidth();

        tab.css({ "position" : "" });
        li.css({ "position": "" });

        const scrollLeft = Math.round(aLeft - (tabSlideAreaW / 2) + (aW / 2) );
        tabSlideArea.stop().animate({ scrollLeft: scrollLeft });
    }
}

function mobileSliderCtrl(){

    const cmCtrl = document.querySelectorAll('.common-control');
    const bodyWidth = document.querySelector('body').clientWidth - 40;
    let gapWidth = '';
    if(bodyWidth > 768){
        gapWidth = 12
    } else {
        gapWidth = 7 
    }
     
        if(bodyWidth <= 1023){

            cmCtrl.forEach(function(el){
                const parent = el.parentNode;
                const playEl = el.querySelector('.common-play--bx');
                const el_li = parent.querySelectorAll('.common-list__control-btns ul li');
                const totalMargin = (el_li.length - 1) * gapWidth
                const autoBoxw = bodyWidth < 1023 ? (bodyWidth > 600 ? 52 : 43) : 0
                const width = (bodyWidth - totalMargin - (playEl ? autoBoxw : 0 )) / el_li.length; 
                // const flexBasis = (100 / gapWidth) / el_li.length; 
                if(playEl){
                    parent.classList.add('auto-ctrl')
                }
                el_li.forEach(function(li) {
                    li.style.cssText = `width: ${width}px;`;
                });
    
            
            })
        } 
}

function checkCommonList(_plugin) {
    const $listText = $('.list_up');
    const $listContainer = $('.list_container');

    if ($listText.length === 0 || $listContainer.length === 0) {
        if ($listText.length === 0 && $listContainer.length !== 0) {
            console.warn('list_t 요소가 없습니다.');
        }
        if ($listContainer.length === 0 && $listText.length !== 0) {
            console.warn('list_container 요소가 없습니다.');
        }
        return;
    }

    $listText.each(function(index) {
        const $element = $(this);
        const text = $element.text();
        const $link = $('<a href="javascript:;" class="auto_list"></a>').text(text);

        const classList = $element.attr('class') ? $element.attr('class').split(' ') : [];
        
        // depth_숫자 형태의 class 필터링 후 적용
        const depthClass = classList.filter(cls => /^depth_\d+$/.test(cls)).join(' ');

        if (depthClass) {
            $link.addClass(depthClass);
        }
        
        $link.on('click', function() {
            const $targetElement = $listText.eq(index);

            if ($targetElement.length) {
                $('html, body').animate({
                    scrollTop: $targetElement.offset().top - 80
                }, 500);
            } else {
                console.warn('대상 요소를 찾을 수 없습니다: 인덱스: ' + index);
            }
        });

        $listContainer.append($link);
    });
}


    // --- jQuery Swiper 래퍼 함수 추가 ---
(function($){
    $.fn.swiperControl = function(action) {
        return this.each(function() {
        const swiper = $(this).data('swiperInstance');
        if (!swiper) {
            console.warn('Swiper instance not found on this element.');
            return;
        }

        switch(action) {
            case 'slidePrev':
            swiper.slidePrev();
            break;
            case 'slideNext':
            swiper.slideNext();
            break;
            case 'slideTo':
            const index = arguments[1];
            if (typeof index === 'number') {
                swiper.slideTo(index);
            } else {
                console.warn('slideTo requires an index number as second argument.');
            }
            break;
            default:
            console.warn('Unknown swiper action:', action);
        }
        });
    };
})(jQuery);
    // --- 래퍼 함수 끝 ---

// 전역 또는 모듈 스코프 변수로 핸들러 저장
let keyboardHandlers = {
    swiperKeydown: null,
    buttonWrapperKeydown: null,
    slideChangeHandler: null,
};

function setupKeyboardSlideNavigation({
    swiperInstance,
    $swiperContainer,
    $buttonWrapper,
    $buttons,
    slideSpeed,
    onIndexChange
}) {
    if (!swiperInstance) return;

    let flag = false;
    let fromBtn = false;

    // 1) 슬라이더 영역 키보드 이벤트 (좌우 방향키)
    keyboardHandlers.swiperKeydown = function(e) {
        flag = false;
        fromBtn = false;

        if(!swiperInstance.destroyed){
            if(e.keyCode === 37){ // 왼쪽키
                flag = true;
                swiperInstance.slidePrev();
            } else if(e.keyCode === 39) { // 오른쪽키
                flag = true;
                swiperInstance.slideNext();
            }
        }
        if (flag) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    $swiperContainer.on("keydown", keyboardHandlers.swiperKeydown);

    // 2) 버튼 래퍼 내 키보드 이벤트 (좌우 방향키)
    keyboardHandlers.buttonWrapperKeydown = function(e) {
        flag = false;
        fromBtn = false;

        if(!swiperInstance.destroyed){
            if(e.keyCode === 37){
                flag = true;
                fromBtn = true;
                swiperInstance.slidePrev();

                setTimeout(() => {
                    let idx = swiperInstance.realIndex;
                    if (typeof onIndexChange === "function") onIndexChange(idx);
                    $buttons.eq(idx).focus();
                }, slideSpeed + 1);

            } else if(e.keyCode === 39) {
                flag = true;
                fromBtn = true;
                swiperInstance.slideNext();

                setTimeout(() => {
                    let idx = swiperInstance.realIndex;
                    if (typeof onIndexChange === "function") onIndexChange(idx);
                    $buttons.eq(idx).focus();
                }, slideSpeed + 1);
            }
        }

        if (flag) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    $buttonWrapper.on("keydown", keyboardHandlers.buttonWrapperKeydown);

    // 3) 슬라이드 변경 완료 시점에 포커스 이동 및 tabindex 조정
    keyboardHandlers.slideChangeHandler = () => {
        setTimeout(() => {
            const $slides = $swiperContainer.find('.swiper-slide');
            const $activeSlide = $slides.filter('.swiper-slide-active').first();

            $slides.each(function () {
                const $slide = $(this);
                const isActive = $slide.hasClass('swiper-slide-active');
                $slide.find('a, button').each(function () {
                    this.tabIndex = isActive ? 0 : -1;
                });
            });

            if (!flag || fromBtn) {
                flag = false;
                fromBtn = false;
                return;
            }

            if ($activeSlide.length) {
                const $focusable = $activeSlide.find('a, button').filter(':visible').first();
                if ($focusable.length) {
                    $focusable.focus();
                } else {
                    console.warn('key event - 슬라이드에 포커스 가능한 요소 없음');
                }
            } else {
                console.warn('key event - 슬라이드를 찾지 못함');
            }

            flag = false;
            fromBtn = false;
        }, 10);
    };
    swiperInstance.on('slideChangeTransitionEnd', keyboardHandlers.slideChangeHandler);
}
