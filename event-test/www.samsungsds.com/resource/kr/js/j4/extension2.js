/*******************************************************************************
 * 파 일 명 : extension2.js
 * 작 성 자 : jkh
 * 작 성 일 : 2016-10-12
 ******************************************************************************/
var SDS_COMMON = {
    mobileWidth : 767,
    tabletWidth : 1024,
    currentWidth : function(){
        return window.innerWidth >= $(document).width() ? window.innerWidth : $(document).width();
    },
    isMobile : function(){
        return this.currentWidth() <= this.mobileWidth;
    },
    isWeb : function(){
        return this.currentWidth() > this.tabletWidth;
    }
};

/* lang quarter */
/* 17.02.23 */
/* 한글 중문 영문 분기처리함수입니다. */
/* lang_quarter('한글값','중문값','영문값','라틴값') 방식으로 사용하시면 됩니다. */
function lang_quarter(ko,zh,gl,pt) {
    var result;
    if($("html").attr("lang") == "ko") {
        result = ko;
    }else if($("html").attr("lang") == "zh") {
        result = zh;
    }else if($("html").attr("lang") == "pt") {
        result = pt;
    }else {
        result = gl;
    }
    return result;
}

/* ready */
$(function(){
    /* 20220804 : 이벤트 리스트 페이지 리뉴얼 */
    var $doc = $(window.document);

    /** filter sticky */
    if($doc.find('.filterDate_container').length){
        var filterContainer = $('.filterDate_container');
        var filterHeightTop = filterContainer.offset().top;
    
        $(window).scroll(function(){
            if($(window).scrollTop() >= filterHeightTop){
                filterContainer.addClass('stick');
            }else{
                filterContainer.removeClass('stick');
            }
        })
    }

    if($doc.find('.g_carousel').length){
        var startIndex = 0;
        var currentIndex = startIndex;
        var $prevBtn = $doc.find(".arrow-prev");
        var $nextBtn = $doc.find(".arrow-next");
        var $carousel = $doc.find('.carousel');
        var $carouselItem = $doc.find('.carousel .li');
        var $pagn = $doc.find(".md_pagn");
        var $nav = $doc.find(".arrow-nav");
        var $control = {
            wrap: $doc.find(".md_play"),
            playBtn: $doc.find(".md_btn_play"),
            stopBtn: $doc.find(".md_btn_stop")
        };
        var lang = $("html").attr("lang") || "en";
        var visualArea = $carousel.find(".img .img_p, .img .img_m");
        var $txtArea = $carousel.find(".txt_cont");

        setVisualImg();
        setTxtBreak();

        if($carouselItem.length < 2){
            $carouselItem.addClass('active');
            $nav.remove();
            $pagn.remove();
            $control.wrap.remove();
            return;
        }

        $carouselItem.on({
            focusin: function(e){
                switch (deviceType) {
                    case "PC":
                        // 
                        break;
                    case "TABLET":
                    case "MOBILE":
                        var isPagnToSlide = $(e.relatedTarget).is($pagn);

                        if(!isPagnToSlide){
                            var currentIndex = $carouselItem.index(e.delegateTarget);
                        }else{
                            var currentIndex = 0;
                            $carouselItem.eq(0).find("a, button").first().focus();
                        }

                        $carousel.trigger("slideTo", [currentIndex, 0, true] );
                        break;
                    // default:
                    //     break;
                }
            },
            focusout: function(e){
                switch (deviceType) {
                    case "PC":
                        // 
                        break;
                    case "TABLET":
                    case "MOBILE":
                        var isSameSequence = $(e.delegateTarget).find(e.relatedTarget).length;
                        var isLastSequence = $(e.delegateTarget).is($carouselItem.last());
                        
                        if(!isSameSequence && isLastSequence){
                            $pagn.focus();
                        }
                        break;
                    // default:
                    //     break;
                }
            }
        });

        $control.stopBtn.on("click", function(e){
            e.preventDefault();
            sequenceControl($carousel, "STOP", true);
            return false;
        });

        $control.playBtn.on("click", function(e){
            e.preventDefault();
            sequenceControl($carousel, "PLAY", true);
            return false;
        });

        $carousel.carouFredSel({
            responsive: true,
            height: "variable",
            auto: {
                play: true,
                timeoutDuration:5000
            },
            prev: {
                button: $prevBtn
            },
            next: {
                button: $nextBtn
            },
            items: {
                start: currentIndex,
                visible: 1,
                height: "variable"
            },
            pagination:{
                container: $pagn,
            },
            swipe: {
                onMouse: true,
                onTouch: true
            },
            scroll: {
                // fx: "fade",
                duration: 500,
                items: 1,
                onAfter: function(data){
                    currentIndex = $carouselItem.index(data.items.visible);
                    $carouselItem.removeClass("active").eq(currentIndex).addClass("active");
                    // Update
                    updateControl($carousel);
                    updateCarouselAria($carousel);

                    if($control.wrap.hasClass("on")){
                        sequenceControl($carousel, "STOP", true);
                    }

                    // var currentItem = data.items.visible; //current slide
                    chkBG();
                }
            },
            onCreate: function(data){
                $carouselItem.removeClass("active").eq(currentIndex).addClass("active");

                $prevBtn.wrapInner('<em class=\"blind\">'+(langSet[lang]["slide"]["prevStr"]).toString()+'</em>');
                $nextBtn.wrapInner('<em class=\"blind\">'+(langSet[lang]["slide"]["nextStr"]).toString()+'</em>');

                var currentItem = data.items;
                // console.log("currentItem", currentItem)
                // console.log("data", data)
                // console.log("find arrow", _plugin.$nav)
                
                chkBG();

                // Update
                updateCarouselAria($carousel);
            }
        });

        /** 활성화 된 슬라이드에 .white 클래스가 있으면 .event_visualSlide_indi 와 .sns_box 에 class 부여 */
        function chkBG(){
            let currentItem = $(".g_carousel .caroufredsel_wrapper .li.active");
            if(!currentItem.hasClass('white')) {
                $(".g_carousel .arrow-nav").removeClass('indi_white');
                $(".g_carousel .navigation").removeClass('indi_white');
                $(".g_carousel .sns_box").addClass("black");
            } else {
                $(".g_carousel .arrow-nav").addClass('indi_white');
                $(".g_carousel .navigation").addClass('indi_white');
                $(".g_carousel .sns_box").removeClass("black");
            }
        }

        function updateCarouselAria(plugin){
            $carouselItem.attr("aria-hidden", true).find("a, button").attr("tabindex", -1);
            $carouselItem.eq(currentIndex).removeAttr("aria-hidden").find("a, button").removeAttr("tabindex");
        }

            // Update Control
        function updateControl(plugin){

            if(!$control.wrap.hasClass("on")){
          
                sequenceControl(plugin, "PLAY", false);
            } else {
                sequenceControl(plugin, "STOP", false);
            }
        }
    
            // Sequence Control: play, stop
        function sequenceControl(plugin, option, changeFocus){
            switch (option) {
                case "PLAY":
                    plugin.trigger("isPaused", function(){
                 
                        $control.wrap.removeClass('on');
                        plugin.trigger('play', true);
                        // pluginItem.find("video").trigger('play');
                        changeFocus && $control.stopBtn.focus();
                    })
                    break;
                case "STOP":
                    plugin.trigger("isScrolling", function(){
                        $control.wrap.addClass('on');
                        plugin.trigger('pause', true);
                        // pluginItem.find("video").trigger('pause');
                        changeFocus && $control.playBtn.focus();
                    })
                    break;
                // default:
                //     break;
            }
        }

        function setVisualImg(){
            // console.log(visualArea)
        visualArea.imgLiquid({
            fill:true,
            horizontalAlign:"center",
            verticalAlign:"center"
        });
        }
    
       function setTxtBreak(){
   
            var $title = $txtArea.find(".tit_b");
            // console.log($title)
            if (typeof $title.lettering === 'function') {
                $title.lettering('lines');
                $title.find("span").wrapInner('<i></i>');
            }
        }
    
        /**all 체크박스 */
        $("#checkedAll").change(function(){
            if(this.checked){
              $(".eventCheck").each(function(){
                    $("#checkedAll").prop('disabled', true);
                    this.checked=false;
              })              
            } else {
                $(".eventCheck").each(function(){
                    this.checked=false;
                })              
            }
        });
        
        $(".eventCheck").click(function () {
            $("#checkedAll").prop("checked", false);
            $("#checkedAll").prop('disabled', false);

            if ($(this).is(":checked")){
                var isAllChecked = 0;
                $(".eventCheck").each(function(){
                    if(!this.checked)
                    isAllChecked = 1;
                })              
                if(isAllChecked == 0){ 
                    // console.log("all")
                    // $("#checkedAll").prop("checked", true); 
                }
            } else {
                // $("#checkedAll").prop("checked", false);
                if($(".eventCheck[type='checkbox']:checked").length == 0){
                    $("#checkedAll").prop("checked", true);
                    $("#checkedAll").prop('disabled', true);
                }
            }
        });
    }
    /* //20220804 : 이벤트 리스트 페이지 리뉴얼 */

    /* image resize */
    $(".hero_vb .im_box, .box_img.b_scroll, .vs_box .im_bg, .bgcg, .bg_resize, .ben_slide, .vs_submit, .vs_txt, .bn_ul li, .box_img.type3 .inner, .keyVisual, .thumb_imgBox, .visualWrap, .navigationSlide_item, .offeringSlideImage, .abt_key_news, .awardCard").bgResize();
    $("img.resize ,img.thumb_img, img.chart_description_img").imgResize();

    /* ***** filter ***** */
    if($(".filter").length) {
        // tab
        $(".fil_tab a, .fil_con a").click(function(e){
            e.preventDefault();
            var tabIndex = $(this).parent().index();
            var conIndex = $(".fil_tab li.date").length > 0 && $(this).parents(".fil_tab").find("li").length > 0 ? $(this).parent().index()-1 : $(this).parent().index();

            if($(this).parent().hasClass("on")) {
                $(".fil_tab>li.on").removeClass("on");
                $(".fil_con>li").eq(conIndex).removeClass("on");
                $(this).attr({'aria-expanded':false})
            }else{
                var index = ($(e.target).is(".fil_con>li>a") || $(e.target).parents(".fil_con>li>a").length) && $(".fil_tab li.date").length ? tabIndex+1 : tabIndex;

                $(".fil_tab>li.on, .fil_con>li.on").removeClass("on");
                $(".fil_con>li a").attr('aria-expanded', 'false');
                $(".fil_tab>li").eq(index).addClass("on");
                $(".fil_con>li").eq(conIndex).addClass("on");
                $(this).attr({'aria-expanded':true});
            }
        });
        if(SDS_COMMON.currentWidth() < 1025) {
            $('.fil_con a').attr({'role':'button','aria-expanded':false});
            $('.fil_con a').click(function(e){
                e.preventDefault();
            })
        }
        //170224 달력 클릭시 다른 레이어 닫히게
        $(".fil_tab .date input, .fil_tab .date .btn_date").click(function(e){
            if($(this).parents('li:not(.on)')){
                $(".fil_tab>li.on, .fil_con>li.on").removeClass("on");
                $(".fil_tab>li.date").addClass("on");
            }
        })

        // all check
        $(".all_cont").allCheck();

        // show
        $(".filter .btn_filter").click(function(){
            /* 210413 | 접근성 | 필터 팝업 초점밖으로 이동하는 오류 수정 */
            var $this = $(this); /* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
            var $filterPop = $('.filter');
            var $popInner = $filterPop.find('.filter_wrap');
            var ariahidden = $("header, footer, body > div:not(#wrap), body > ul, #container > div:not(.filter), #wrap > div:not(#container)");/* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
            var $inFocuseElement = $popInner.find('a:not([style*="display: none"]), button:not([style*="display: none"]), input');
                                            
            $(".filter").addClass("on");
            /* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
            ariahidden.attr({
                tabindex: "-1",
                "aria-hidden": true
            });
            /* //210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */

            $popInner.on("keydown", function(e){
                e.stopPropagation();
                if($filterPop.hasClass('on')){
                    /* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                    //esc key close
                    if(e.keyCode === 27){
                        closeFilterPop();
                        $this.focus();
                    }
                    /* //210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                    if($popInner.is($(e.target))){
                        if(e.keyCode == 9 && e.shiftKey) $inFocuseElement.last().focus();
                    }

                    if($inFocuseElement.first().is($(e.target))){
                        if(e.keyCode == 9 && e.shiftKey) $inFocuseElement.last().focus();
                    }

                    if($inFocuseElement.last().is($(e.target))){
                        if(e.keyCode == 9 && !e.shiftKey) $popInner.focus();
                    }
                }
            });
            $("html, body").css("overflow", "hidden");
            /* 210527 | 접근성 | IOS Focus Issue settimeout추가 */
            setTimeout(function(){
                $popInner.find('.fil_tit span').attr('tabindex','0').focus();
            },300);
            /* //210527 | 접근성 | IOS Focus Issue settimeout추가 */
            /* 210413 | 접근성 | 필터 팝업 초점밖으로 이동하는 오류 수정 */
        });

        // close
        $(".filter .btn_close").click(function(){
            closeFilterPop();/* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
        });

        /* 2016.11.10 SDS 추가 영역 */
        $(".filter .btn_apply").click(function (e) {
            closeFilterPop();/* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
        });
        /* 2016.11.10 SDS 추가 영역 */
        /* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
        function closeFilterPop(){
            var headHeight = $('.M00_A > .inner').height();//210413 | 접근성 | 필터 팝업 닫을때 헤더에 가려지는 오류 수정
            var ariahidden = $("header, footer, body > div:not(#wrap), body > ul, #container > div:not(.filter), #wrap > div:not(#container)");
            $(".filter").removeClass("on");
            $("html, body").css("overflow", "");
            $(window).scrollTop($(".filter .btn_filter").offset().top - headHeight);//210413 | 접근성 | 필터 팝업 닫을때 헤더에 가려지는 오류 수정
            ariahidden.removeAttr("tabindex");
            ariahidden.removeAttr("aria-hidden");
            /* 210527 | 접근성 | IOS Focus Issue settimeout추가 */
            setTimeout(function(){
                $(".filter .btn_filter").attr("tabindex", "0").focus();
            },300);
            /* 210527 | 접근성 | IOS Focus Issue settimeout추가 */
        }
        /* //210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */

        $(window).resize(function(){
            if(SDS_COMMON.currentWidth() > SDS_COMMON.tabletWidth) {
                $(".filter").removeClass("on");
                $("body").css("overflow", "");
            }
        });

        // count
        $(".fil_con>li").each(function(i){
            var isAll =  $(this).hasClass("all_cont");
            counter();
            $(this).find("input[type=checkbox]").on("change", function(e){
                counter();
            });
            function counter(){
                var size = $(".fil_con>li").eq(i).find("input[type=checkbox]:checked").length;
                var total = isAll ? size-$(".ck_all:checked").length : size;
                total = total==0 ? "" : "(" +total+ ")";
                $(".fil_con>li").eq(i).find(".total").text(total);
                if($(".fil_tab>li.date").length){
                    $(".fil_tab>li").eq(i+1).find(".total").text(total);
                }else{
                    $(".fil_tab>li").eq(i).find(".total").text(total);
                }

            }
        });

        //clear
        $(".filter .btn_clear").click(function(){
            /* 210413 | date 필터해제 안되는 오류 수정 */
            var lang = $("html").attr("lang") || "en";
            var $dateBtn = $(".filter .fil_date .btn_date");
            /* //210413 | date 필터해제 안되는 오류 수정 */

            $(".filter input[type=checkbox]").prop("checked", false);
            /* 2016.11.10 SDS 추가 영역 */
            $(".filter input[type=radio]").prop('checked', false);
            /* 2016.11.10 SDS 추가 영역 */

            /** 20221004 필터해제 했을시 전체 체크박스는 활성화 유지 */
            if($('.filter_wrap').hasClass('event_filter')){
                $(".filter input#checkedAll[type=checkbox]").prop("checked", true);
            }
            
            $(".filter .total").text("");
            $(".filter .all_cont ul").not(".all").find("input[type=checkbox]").prop({"checked":true});
            $(".filter .all_cont .all input[type=checkbox]").prop({"checked":true});
            if($(".filter .all_cont").length>0){
                var total = $(".filter .all_cont ul").not(".all").find("input[type=checkbox]").length;
                $(".filter .fil_con li").eq(0).find(".total").text("("+total+")");
                $(".filter .fil_tab li").eq(0).find(".total").text("("+total+")");
            }

            $(".filter .fil_date input").val("");
            /* 210413 | date 필터해제 안되는 오류 수정 */
            $dateBtn.each(function(){
                var $this = $(this);

                if($this.hasClass('start')){
                    $this.text(langSet[lang]["calenderDate"]["dateStart"]);
                }else if($this.hasClass('end')){
                    $this.text(langSet[lang]["calenderDate"]["dateEnd"]);
                }
            });
            /* //210413 | date 필터해제 안되는 오류 수정 */
            startdate=null;
            enddate=null;

            // 삭제
            // if($(".filter .date.on").length  && ($(".btn_date.end").hasClass("on") || $(".btn_date.start").hasClass("on"))) {
            //     $("#datepicker").datepicker("destroy");
            //     $(".filter .date.on").removeClass("on");
            //     $(".btn_date.start, .btn_date.end").removeClass("on");
            // }
            $("#datepicker").datepicker("destroy"); // 추가
            $('.fil_tab .date').removeClass('on'); // 추가

            /* 2023-04 접근성 수정 시작 */
            let startMsg = 'CALENDER ' + langSet[lang]['calenderDate']['dateStart'];
            let endMsg = 'CALENDER ' + langSet[lang]['calenderDate']['dateEnd'];
            let evtDateResetMsg = 'event period initialization completed';

            if (lang === 'ko') {
                startMsg = langSet[lang]['calenderDate']['dateStart'] + ' 달력 열기';
                endMsg = langSet[lang]['calenderDate']['dateEnd'] + ' 달력 열기';
                evtDateResetMsg = '이벤트 기간이 초기화되었습니다.';
            }

            $('.btn_date.start').attr('title', startMsg.toLowerCase());
            $('.btn_date.end').attr('title', endMsg.toLowerCase());

            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                $('.fil_date > .lb').attr({ tabindex: 0 });
            } else {
                $('.fil_date > .emph_reset').remove();
            }

            setTimeout(function () {
                $('.fil_date').prepend('<em class="emph_reset" role="alert" aria-atomic="true">' + evtDateResetMsg + '</em>'); // 2023-04 접근성 수정

                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    $('.fil_date > .lb').focus();
                } else {
                    $('.btn_date.start').focus();
                }
            }, 1);

            // alert("이벤트 기간이 초기화되었습니다.");
            // $(".btn_date.start").focus();
            /* // 2023-04 접근성 수정 끝 */
        });

        /* 2023-04 접근성 수정 시작 */
        $('.fil_date > .lb').on('blur', function () {
            $(this).removeAttr('tabindex');
        });
        /* // 2023-04 접근성 수정 끝 */

        /* calendar */
        var startdate = null, enddate = null, $target = null;
        var prevText = null, nextText = null; //20210405 웹접근성추가
        if($("html").attr("lang") == "ko") {
            prevText = "이전 달 보기";
            nextText = "다음 달 보기";
        }else if($("html").attr("lang") == "en") {
            prevText = "Prev month";
            nextText = "Next month";
        }else if($("html").attr("lang") == "zh") {
            prevText = "前一个月";
            nextText = "下个月";
        }
        else if($("html").attr("lang") == "pt") {
            prevText = "mense priorem";
            nextText = "deinde mensis";
        }

        if($(".filter .date").length) {
            //var startdate = null, enddate = null, $target = null;
            function getDate(date){
                var dayName = getDay();
                var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                var date = new Date(date);
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                var result = monthNames[monthIndex] + " " + day + "," + year;
                if($("html").attr("lang") == "ko") {
                    result = year+"-"+ getMM(date.getMonth()+1) + "-" + getMM(date.getDate());
                }else if($("html").attr("lang") == "zh") {
                    result = year+"-"+ getMM(date.getMonth()+1) + "-" + getMM(date.getDate());
                }//170216 중문 추가
                else if($("html").attr("lang") == "pt") {
                    result = getMM(date.getDate()) +"/"+ getMM(date.getMonth()+1) + "/" + year;
                }//170411 라틴 추가
                return result;
            }

            //getDay
            function getDay() {
                var day = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" ];
                if($("html").attr("lang") == "ko") {
                    day = [ "일", "월", "화", "수", "목", "금", "토" ];
                }else if($("html").attr("lang") == "zh") {
                    day = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
                }else if($("html").attr("lang") == "pt") {
                    day = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
                }
                return day;
            };
            //getMonth
            function getMonth() {
                var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"] ;
                if($("html").attr("lang") == "ko") {
                    month = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
                }else if($("html").attr("lang") == "zh") {
                    month = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
                }else if($("html").attr("lang") == "pt") {
                    month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                }
                return month;
            }

            //getMM
            function getMM(m){
                return m.toString().length < 2 ? "0"+m : m;
            }

            /*
            $(".btn_date.start,.btn_date.end").keydown(function(e){
                if(e.keyCode == 13){
                    $target = $(e.target);

                    if($("html").attr("lang") == "ko") {
                        drawCalendar_kr(table_caption); return false;
                    }

                    drawCalendar(table_caption);
                    $(".ui-datepicker-prev").focus();
                }
            });
            $(".btn_date.start,.btn_date.end").click(function(e){
                $target = $(e.target);

                if($("html").attr("lang") == "ko") {
                    $("#datepicker").datepicker("destroy");
                    drawCalendar_kr(table_caption); return false;
                }

                drawCalendar(table_caption);
            });
            */

            /* 2023-04 접근성 수정 시작 */
            function moveDatepickerFocus({ wrapper, calendar, target }) {
                if (typeof target !== 'undefined') {
                    $(wrapper).siblings(calendar).find(target).attr('tabindex', 0).focus();
                } else {
                    $(wrapper).siblings(calendar).attr('tabindex', 0).focus();
                }
            }

            $('.btn_clear, input[type="checkbox"][name="evt_type"]').on('focusin ', function () {
                $('.fil_tab > li.date').removeClass('on');
            });

            $('.btn_date.start, .btn_date.end').on('click keydown', function (event) {
                $target = $(event.target);
                let keyCode = event.keyCode ? event.keyCode : event.which;
                function _func() {
                    /* 캘린더 국문 영문 분기 */
                    if ($('html').attr('lang') == 'ko') {
                        $('#datepicker').datepicker('destroy');

                        drawCalendar_kr(table_caption);

                        setTimeout(function () {
                            // 국문 달력 초점이동을 실행합니다.
                            moveDatepickerFocus({ wrapper: '.fil_date', calendar: '.cal_wrap', target: '.ui-datepicker-prev' });
                        }, 1);

                        return false;
                    }

                    drawCalendar(table_caption);

                    setTimeout(function () {
                        // 영문 달력 초점이동을 실행합니다.
                        moveDatepickerFocus({ wrapper: '.fil_date', calendar: '.cal_wrap', target: '.ui-datepicker-prev' });
                    }, 1);
                }

                if (keyCode === 9 && event.shiftKey && $(this).is('.start')) {
                    $('.fil_tab > li.date').removeClass('on');
                }

                if (event.type === 'click') {
                    _func();

                    return;
                }

                // keydown
                if (keyCode === 13) {
                    _func();
                }
            });

            $('.btn_date.start').on('blur', function () {
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    $('.fil_date > .lb').removeAttr('tabindex');
                }

                $('.fil_date > .emph_reset').remove();
            });
            /* // 2023-04 접근성 수정 끝 */

            var table_caption = lang_quarter('달력표','Calendar table','Calendar table','Calendar table');
            let _handlerValue = 'prev'; // 2023-04 접근성 수정


            /** 글로벌 */
            function drawCalendar(Calendar_table_caption) {
                /* 2023-04 접근성 수정 시작 */
                let date1 = null;
                let date2 = null;

                $('.btn_date').removeClass('on');
                /* // 2023-04 접근성 수정 끝 */

                $(".filter .date").addClass("on");
                if(enddate != null && $target.is(".btn_date.end")) {
                    $(".btn_date.end").addClass("on");
                }else{
                    $(".btn_date.start").addClass("on");
                }
                $("#datepicker").datepicker({
                    defaultDate : startdate,
                    inline : true,
                    prevText: prevText,
                    nextText: nextText,
                    changeYear : true,
                    //showButtonPanel : true,
                    dayNamesMin: getDay(),
                    monthNames : getMonth(),
                    onChangeMonthYear: function(year, month, inst) {
                        var activeEl = document.activeElement;
                        (function () {
                            setTimeout(function() {
                                $("#datepicker").find('.'+activeEl.classList[0]).focus();
                            }, 0 );
                        })();

                        setTimeout(function () {
                            drawCalendarA11y(); // 2023-04 접근성 수정
                        }, 1);
                    },
                    onSelect: function(dateText, inst) {
                        /* 2023-04 접근성 수정 시작 */
                        date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);
                        date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

                        if (startdate == null && enddate == null) {
                            // start
                            $('#startDate').val(getDate(dateText));
                            $('.btn_date.start').text(getDate(dateText));
                            startdate = dateText;

                            $('.btn_date').removeClass('on');
                            $('.btn_date.start').addClass('on');

                            $('#datepicker').datepicker('destroy');
                            $('.filter .date').removeClass('on');

                            /* why ? */
                            // $('.ui-datepicker a').prop('href', '#');

                            setTimeout(function () {
                                $('.btn_date.start').attr('tabindex', '0').focus();
                            }, 0);
                        } else if (startdate != null && enddate == null) {
                            // end
                            $('#endDate').val(getDate(dateText)).change();
                            $('.btn_date.end').text(getDate(dateText)).change();
                            enddate = dateText;

                            $('.btn_date').removeClass('on');
                            $('.btn_date.end').addClass('on');
                            $('#datepicker').datepicker('destroy');
                            $('.filter .date').removeClass('on');

                            /* why ? */
                            // $('.ui-datepicker a').prop('href', '#');

                            setTimeout(function () {
                                $('.btn_date.end').attr('tabindex', '0').focus();
                            }, 0);
                        } else if (startdate != null && enddate != null && $target.is('.btn_date.start')) {
                            // start
                            if (new Date(dateText).getTime() > new Date(enddate).getTime()) {
                                // start input 값이 존재하는 상태에서 날짜를 다시 선택했을 때 선택한 날짜의 시간 값이 end input의 날짜의 시간보다 높을 경우..
                                $('#startDate').val(getDate(dateText));
                                $('.btn_date.start').text(getDate(dateText));
                                startdate = dateText;

                                $('#endDate').val('');
                                $('.btn_date.end').text('');
                                enddate = null;

                                $('.btn_date').removeClass('on');
                                $('.btn_date.start').addClass('on');

                                $('#datepicker').datepicker('destroy');
                                $('.filter .date').removeClass('on');

                                /* why ? */
                                // $('.ui-datepicker a').prop('href', '#');

                                setTimeout(function () {
                                    $('.btn_date.start').attr('tabindex', '0').focus();
                                }, 0);
                            } else {
                                $('#startDate').val(getDate(dateText)).change();
                                $('.btn_date.start').text(getDate(dateText)).change();
                                startdate = dateText;

                                /* why ? */
                                // $(".btn_date.end").removeClass("on");
                                $('#datepicker').datepicker('destroy');
                                $('.filter .date').removeClass('on');

                                /* why ? */
                                // $(".ui-datepicker a").prop("href","#")

                                $target = $('.btn_date.end');

                                setTimeout(function () {
                                    $('.btn_date.end').attr('tabindex', '0').focus();
                                }, 0);
                            }
                        } else if (startdate != null && enddate != null && $target.is('.btn_date.end')) {
                            // end
                            $('#endDate').val(getDate(dateText)).change();
                            $('.btn_date.end').text(getDate(dateText)).change();
                            enddate = dateText;

                            /* why ? */
                            // $('.btn_date.end').removeClass('on');
                            $('#datepicker').datepicker('destroy');
                            $('.filter .date').removeClass('on');

                            // $('.ui-datepicker a').prop('href', '#');

                            setTimeout(function () {
                                $('.btn_date.end').attr('tabindex', '0').focus();
                            }, 0);
                        }
                        /* // 2023-04 접근성 수정 끝 */
                    },
                    beforeShow: function(){
                        $(".btn_date.start").addClass("on");
                    },
                    beforeShowDay: function(date){
                        $(".ui-datepicker a").prop("href","#")
                        var result = [true];
                        if(startdate != null && enddate == null && date.getTime() < new Date(startdate).getTime()) {
                            result = [false];
                        }else if(startdate != null && enddate != null && date.getTime() < new Date(startdate).getTime() && $target.is(".btn_date.end")){
                            result = [false];
                        }else if(startdate != null && date.getTime() == new Date(startdate).getTime()){
                            result.push("start");
                        }else if(enddate != null && date.getTime() == new Date(enddate).getTime()){
                            result.push("end");
                        }

                        /* 2023-04 접근성 수정 시작 */
                        date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, startdate ? startdate : '');
                        date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, enddate ? enddate : '');

                        if (date1 <= date && date <= date2) {
                            result.push('in-range');
                        }
                        /* // 2023-04 접근성 수정 끝 */

                        return result;
                    }
                });
                if( $(".ui-datepicker-calendar caption").length < 1 ){$("#datepicker").find(".ui-datepicker-calendar thead").before("<caption>" + Calendar_table_caption + "</caption>");}
                $(".ui-datepicker a").prop("href","#");

                /* 2023-04 접근성 수정 시작 */
                setTimeout(function () {
                    drawCalendarA11y();
                }, 1);
                /* // 2023-04 접근성 수정 끝 */
            }

            /** 국문 */
            function drawCalendar_kr() {
                $(".filter .date").addClass("on");
                $("#datepicker").datepicker({
                    // minDate: 0,
                    // numberOfMonths: [3,1],
                    defaultDate : startdate,
                    prevText: prevText,
                    nextText: nextText,
                    changeMonth: false,
                    changeYear : false,
                    dayNamesMin: getDay(),
                    monthNames : getMonth(),
                    numberOfMonths: 2,
                    showMonthAfterYear:true, //년도 먼저 나오고, 뒤에 월 표시
                    yearSuffix: "<span>년</span>",
                    inline : true,
                    beforeShowDay: function(date) {
                        var dateFormat = ($.datepicker && $.datepicker._defaults) ? $.datepicker._defaults.dateFormat : "yy.mm.dd";
                        var date1 = null, date2 = null;
                        try { if ($("#startDate").val()) date1 = $.datepicker.parseDate(dateFormat, $("#startDate").val()); } catch(e){}
                        try { if ($("#endDate").val()) date2 = $.datepicker.parseDate(dateFormat, $("#endDate").val()); } catch(e){}
                        var result = [true];
                        if(startdate != null && $("#endDate").val() == 0 && date.getTime() < new Date(startdate).getTime()) {
                            result = [false];
                        }
                        else 
                        if(startdate != null && enddate != null && date.getTime() < new Date(startdate).getTime() ){
                            result = [true];
                        }
                        if (date1 && date && (date1.getTime() == date.getTime())) {
                            result.push("start-range");
                        }

                        if (date2 && date && (date2.getTime() == date.getTime())) {
                            result.push("end-range");
                        }

                        if (date1 && date2 && date1<=date && date<=date2) {
                            result.push("in-range");
                            // result = [true, 'in-range', ''];
                        }
                        return result
                    },
                    onSelect: function(dateText, inst) {
                        var dateFormat = ($.datepicker && $.datepicker._defaults) ? $.datepicker._defaults.dateFormat : "yy.mm.dd";
                        var date1 = null, date2 = null, selectedDate = null;
                        try { if ($("#startDate").val()) date1 = $.datepicker.parseDate(dateFormat, $("#startDate").val()); } catch(e){}
                        try { if ($("#endDate").val()) date2 = $.datepicker.parseDate(dateFormat, $("#endDate").val()); } catch(e){}
                        try { if (dateText) selectedDate = $.datepicker.parseDate(dateFormat, dateText); } catch(e){}
                        
                        if (!date1 || date2) {
                            /* 2023-04 접근성 수정 시작 */
                            $('#startDate').val(dateText);
                            $('.btn_date.start').html('<span class="blind">선택한 이벤트 시작 날짜</span> ' + getDate(dateText));
                            startdate = dateText;

                            $('#endDate').val('');
                            $('.btn_date.end').text('');

                            $('#datepicker').datepicker('destroy');
                            $(this).datepicker();
                            $('.filter .date').removeClass('on');

                            setTimeout(function () {
                                $('.btn_date.start').attr('tabindex', '0').focus();
                            }, 1);
                            /* // 2023-04 접근성 수정 끝 */
                        } else {
                            /* 2023-04 접근성 수정 시작 */
                            $('#endDate').val(dateText).change();
                            $('.btn_date.end').html('<span class="blind">선택한 이벤트 종료 날짜</span> ' + getDate(dateText));
                            enddate = dateText;

                            $('#datepicker').datepicker('destroy');
                            $(this).datepicker();
                            $('.filter .date').removeClass('on');

                            setTimeout(function () {
                                $('.btn_date.end').attr('tabindex', '0').focus();
                            }, 1);
                            /* // 2023-04 접근성 수정 끝 */
                        }
                    },
                    onChangeMonthYear: function (year, month, inst) {
                        setTimeout(function () {
                            drawCalendarA11y(); // 2023-04 접근성 수정

                            $('[data-handler="' + _handlerValue + '"]').focus(); // 2023-04 접근성 수정
                        }, 1);
                    }
                });

                /* 2023-04 접근성 수정 시작 */
                setTimeout(function () {
                    drawCalendarA11y();
                }, 1);
                /* // 2023-04 접근성 수정 끝 */
            }

            /* 2023-04 접근성 수정 시작 */
            function drawCalendarA11y() {
                let lang = $('html').attr('lang');
                let $calendar = $('.ui-datepicker-calendar');

                let currentLang = lang === 'ko';
                let caption = currentLang ? '<caption>달력 테이블</caption>' : '';
                let screenOut = currentLang ? '일' : '';
                let selected = currentLang ? '일 선택됨' : 'selected';

                $calendar.prepend(caption);
                $calendar.find('.ui-state-default').parent('td').addClass('ui-datepicker-day');

                $('.ui-datepicker-calendar')
                    .find('.ui-datepicker-day')
                    .each(function (index, element) {
                        $(element).attr('data-day', $(element).find('.ui-state-default').text());
                        let _attr = {
                            href: 'javascript:;',
                            // role: 'presentation none',
                            role: 'button',
                            'aria-label': `${$(element).attr('data-day')}${screenOut}`
                        };

                        if ($(element).hasClass('ui-datepicker-today')) {
                            _attr['aria-label'] = `${$(element).attr('data-day')}${screenOut}`;
                        }

                        $(element)
                            .find('.ui-state-default')
                            .removeAttr('aria-current tabindex')
                            .attr(_attr);
                    });

                $('.ui-datepicker-calendar tbody').each(function (index, element) {
                    $(element)
                        .find('.ui-state-disabled').attr({ 'aria-hidden': true })
                        .find('.ui-state-default').removeAttr('href role');

                    let _$el = $(element).find('.start, .in-range, .end, .ui-state-active');
                    if (currentLang) {
                        _$el = $(element).find('.start-range, .in-range, .end-range, .ui-state-active');
                    }
                    _$el.find('.ui-state-default').each(function (index, el) {
                        $(el).removeAttr('aria-current');

                        $(el).attr({
                            'aria-selected': true,
                            'aria-label': `${$(el).closest('.ui-datepicker-day').attr('data-day')} ${selected}`
                        });
                    });
                });
                setTimeout(function () {
                    $('.ui-datepicker-header').find('.ui-datepicker-prev, .ui-datepicker-next').attr({
                        href: 'javascript:;',
                        // role: 'presentation none',
                        role: 'button'
                    });

                    $('.ui-datepicker-header').find('.ui-datepicker-title').attr({
                        role: 'alert',
                        'aria-live': 'assertive',
                        'aria-atomic': 'true'
                    });
                }, 1);
            }
            /* // 2023-04 접근성 수정 끝 */

            /* 2023-04 접근성 수정 시작 */
            $(document).on('click', '.ui-datepicker-prev, .ui-datepicker-next', function () {
                _handlerValue = $(this).attr('data-handler');

                $('[data-handler="' + _handlerValue + '"]').attr('tabindex', 0);
            });
            /* // 2023-04 접근성 수정 끝 */
        }
    }

    /* lang quarter */
    /* 17.02.27 */
    /* 팝업이나 새로고침 클릭해도 포커스 유지하는 스크립트입니다. */
    var reverse_focus = function (reverse_class) {
        $(reverse_class).click(function (){
            reverse_class.attr("tabindex","0");
        });
    };
    reverse_focus("btn_reload"); // 캡차 새로고침 포커스유지
    var date_search = function (focus_item) {
        $("#datepicker").on('keydown', focus_item, function (e) {
            if (e.which == 13) {
                $(this).trigger("click");
                $(focus_item).focus();
                if (focus_item == ".ui-state-default") {
                    (function () {
                        $("#datepicker").find(".ui-state-active").focus();
                    })();
                    setTimeout(function () {
                        /* 2023-04 접근성 수정 시작 */
                        if ($('.fil_date #startDate').val().length > 0 && $('.fil_date #endDate').val().length > 0) {
                            $('.filter .date').removeClass('on'); // why removeClass ?
                        }
                        /* // 2023-04 접근성 수정 끝 */
                    }, 0);
                }
            }
        });
    };
    date_search(".ui-datepicker-prev");
    date_search(".ui-datepicker-next");
    date_search(".ui-state-default");

    $(window).on('load', function(){
        /* target_blank */
        /* 17.02.23 */
        /* target_blank에 각 나라별로 새창열기 타이틀 삽입 */
        $("a[target='_blank']").attr('title',lang_quarter('새창열림','new window','new window','Abrir uma nova'));
        /* onclick=window.open 에 새창열기 타이틀 삽입 */
        var idx_onclick = [];
        for (var i = 0; i < $("button[onclick]").length; i++) {
             if ($($("button[onclick]")[i]).attr('onclick').split("(")[0] == "window.open" && $($("button[onclick]")[i]).attr('target') == "window.open") { /* 210511 | 접근성 | 새창열림 예외 추가 */
                $($("button[onclick]")[i]).attr('title',lang_quarter('새창열림','new window','new window','Abrir uma nova'));
            }
        }
        /* 닫기버튼 언어별 분기처리 */
        $(".pop_close").wrapInner('<span class=\"blind\"></span>');
        $(".pop_close span").text(lang_quarter('닫기','关闭','close','close'));
        $(".pop_close").prepend('<i></i>');
    });

    /* 2017.02.24 */
    /* .cnt_menu 동작시 포커스 이동 */
    $(".cnt_menu ul a").click(function(){
        cnt_menu_focus($(this).attr('href'),$(this).text());
        function cnt_menu_focus (input_item,menu_text) {
            $(input_item+" .h4").eq(0).html("<span>"+ menu_text +"</span>")
            $(input_item+" .h4 span").eq(0).attr("tabindex","0").focus();
        }
    });

    /* .filter 동작시 포커스 이동 */
    var $fil_tab = $(".fil_tab a");
    var $fil_con = $(".fil_con > li");

    /*
    var fn = [];
    for (var i = 0; i < $fil_tab.length; i++) {
        fn[i] = (function(idx) {
                return function() {
                    $fil_con.eq(idx).find("label:first").attr("tabindex","0").focus();
                }
        }(i));
        $fil_tab.eq(i).click(fn[i]);
    }
    */

    $.each($fil_tab, function(idx, data) {
        var i = idx;
        $(data).click(function() {
            $fil_con.eq(idx).find("input:first").focus();
        });
        $fil_con.eq(idx).find("input").on("keydown", function(e){
            if(e.which == 13) {
                $(this).trigger("click");
                $(this).focus();
            }
        });
        $fil_con.eq(idx).find("input:last").on("keydown", function(e){
            if(e.which == 9 && e.shiftKey == false) {
                $(data).trigger("click");
                $(data).focus();
            }
        });

    });

    /* search on */
    var srearchCurScroll = 0;
    SDS_COMMON.search = {
        init : function() {
            // 네비 서치
            $(".search_box .sch_box .in input").on("click", function() {
                SDS_COMMON.search.close();
                SDS_COMMON.search.open2($(this));
                $(this).focus();
            });
            $(".search_box .sch_box .in input").on("keyup", function(){
                // SDS_COMMON.search.checkValue();
                SDS_COMMON.search.open2($(this));
            });

            /**202304-01 웹접근 추가 : 키보드 접근 */
            //메인section2 서치 컨텐츠
            $(".mainSection2-search_container .main_sch_box .mainInPut .mainSection2_search").on("click", function(e) {
                SDS_COMMON.search.main_close();
                SDS_COMMON.search.open2_mainContents($(this));
                $(this).focus();
            });
            $(".mainSection2-search_container .main_sch_box .mainInPut .mainSection2_search").on("keyup", function(e) {
                SDS_COMMON.search.open2_mainContents($(this));
                $(this).focus();
            });
            //메인 검색 드랍다운 close 버튼 : focusout 이벤트
            $(".mainSection2-search_container .main_sch_box .src_closeBtn #service_close_title").on("focusout", function(e) {
                SDS_COMMON.search.main_close();
            });
            /** //202304-01 웹접근 추가 : 키보드 접근 */
                   
            /**추가 20221103 비디오 페이지(인사이트 서치도 관련있을수 있음) 서치 */
            $(".sch_box .sch_ip input").on("click", function() {
                SDS_COMMON.search.open($(this));
                $(this).focus();
            });
            $(".sch_box .sch_ip input").on("keyup", function(){
                SDS_COMMON.search.checkValue($(this));
            });
            
            $(".sch_box .sch_ip .btn_del").on("click", function(){
                SDS_COMMON.search.del($(this));
            });
            /** //추가 20221103 비디오 페이지(인사이트 서치도 관련있을수 있음) 서치 */

            $(".sch_box .btn_close").on("click", function(){
                SDS_COMMON.search.close($(this));
            });

            $(".sch_box .sch_ip .btn_sch").on("click", function(){
                if($(".sch_box").hasClass("on")) {
                    $(".sch_box").removeClass("on");
                    $(".keyVisualWrap, .navigationSlideGroup").removeClass("is_hide_m");
                }
                if(SDS_COMMON.isMobile()) {
                    $("html, body").css("overflow", "");
                }
            });

            $(".sch_box .sch_ip .btn_sch_ip").on("click", function(){
                if($(".sch_box").hasClass("on")) {
                    $(".sch_box").removeClass("on");
                    $(".keyVisualWrap, .navigationSlideGroup").removeClass("is_hide_m");
                }
                if(SDS_COMMON.isMobile()) {
                    $("html, body").css("overflow", "");
                    $(window).scrollTop(srearchCurScroll);
                }
            });

            $(".sch_quick .btn_close").on("focusout", function(){
                if($(".sch_box").hasClass("on")) {
                    // $(".sch_box").removeClass("on"); /* 202304-01 웹접근 : 삭제 */
                    $(".keyVisualWrap, .navigationSlideGroup").removeClass("is_hide_m");
                }
            });

            //통합검색 수정 : 모바일 버튼
            $(".wrp_mo_categoryBtn").on('click', function(){
                $(this).closest('.wrp_category_cont').toggleClass('on');
            });
            $('.wrp_category_cont ul li a').on('click', function(e){
                e.preventDefault();
                $(this).closest('.wrp_category_cont').removeClass('on');
            });
            
            window.onpopstate = function(event) {
                if($(".sch_box").hasClass("on")) {
                    $(".sch_box").removeClass("on");
                    $(".keyVisualWrap, .navigationSlideGroup").removeClass("is_hide_m");
                    //SDS_COMMON.search.del();
                    if(SDS_COMMON.isMobile()) {
                        $("html, body").css("overflow", "");
                    }
                }
            }
        },
        /* 20221027 GNB서치,서브페이지 겹치는 오류 수정 */
        open : function(e){
            //20230419 공지사항, 알림판에서는 열리지 않게 처리
            var catid = $("#sch_box_id").attr("data-catid");
            if(catid && (catid =='kr5_26')){
                return;
            }
            if(!$(".sch_box").hasClass("on")) {
                $(".sch_box").addClass("on");
                //통합검색 수정 : dpn remove 걸리게
                // if($('.sch_quick').hasClass('dpn') === true){
                //     $('.sch_quick').removeClass('dpn');
                // }
                $(".search_box").find(".sch_box").removeClass("on");
                
                $(".keyVisualWrap, .navigationSlideGroup").addClass("is_hide_m");
                                        
                /**20221103 비디오 페이지(인사이트 서치도 관련있을수 있음) 서치 */
                if($(".sch_box .sch_ip input").val() != ""){
                    $(".sch_box .sch_ip .btn_sch_ip").show();
                    $(".sch_box .sch_ip .btn_del").show();
                }

                if(SDS_COMMON.isMobile()) {
                    /** 20220913 검색 취소시 상단으로 이동하는 이슈 삭제 */
                    // $('html, body').animate({
                    //     scrollTop: $('body').offset().top
                    // }, 100);
                    $("html, body").css("overflow", "hidden");
                }
                // history.pushState(null, null, location.href);
            }
        },

        main_search_open : function(e){
            if(!$(".main_sch_box").hasClass("on")) {
                $(".main_sch_box").addClass("on");
                $(".main-content2").addClass("dotZindex");
                $(".keyVisualWrap, .navigationSlideGroup").addClass("is_hide_m");

                if(SDS_COMMON.isMobile()) {
                    /** 20220913 검색 취소시 상단으로 이동하는 이슈 삭제 */
                    // $('html, body').animate({
                    //     scrollTop: $('body').offset().top
                    // }, 100);
                    // $("html, body").css("overflow", "hidden"); //202304-01 웹접근 : 삭제
                }
                // history.pushState(null, null, location.href);
            }
        },

        // 모바일 서치 클릭시 팝업
        open2 : function(e){
            if(!e.closest(".sch_box").hasClass("on")) {
                e.closest(".sch_box").addClass("on");
                $(".keyVisualWrap, .navigationSlideGroup").addClass("is_hide_m");

                /** 20220913 검색 취소시 상단으로 이동하는 이슈 삭제 */
                // if(SDS_COMMON.isMobile()) {
                //     $('html, body').animate({
                //         scrollTop: $('body').offset().top
                //     }, 100);
                //     $("html, body").css("overflow", "hidden");
                // }

                // history.pushState(null, null, location.href);
            }
        },

        //202304-01 웹접근 수정 : sch_box 수정 main_sch_box
        open2_mainContents : function(e){
            if(!e.closest(".mainSection2-search_container .main_sch_box").hasClass("on")) {
                e.closest(".mainSection2-search_container .main_sch_box").addClass("on");
                $(".main-content2").addClass("dotZindex");
                $(".keyVisualWrap, .navigationSlideGroup").addClass("is_hide_m");
                if(SDS_COMMON.isMobile()) {
                    $("html, body").css("overflow", "visible");
                }
            }
        },
        del : function() {
            $(".sch_box .sch_ip .btn_del").hide();
            $(".sch_box .sch_ip input").val("").focus();

            /**추가 20221103 비디오 페이지(인사이트 서치도 관련있을수 있음) 서치 */
            if($(".sch_box .sch_ip input").val() === ""){
                $(".sch_box .sch_ip .btn_sch_ip").show();
            }
        },
        close : function(){
            if($(".sch_box").hasClass("on")) {
                $(".sch_box").removeClass("on");
                $(".keyVisualWrap, .navigationSlideGroup").removeClass("is_hide_m");
                //SDS_COMMON.search.del();
                if(SDS_COMMON.isMobile()) {
                    $("html, body").css("overflow", "");
                    /** 20220913 검색 취소시 상단으로 이동하는 이슈 삭제 */
                    // $(window).scrollTop(srearchCurScroll);
                }
                // window.history.back();
            }
            /**추가 20221103 비디오 페이지(인사이트 서치도 관련있을수 있음) 서치 */
            if($(".sch_box .sch_ip input").val() != ""){
                $(".sch_box .sch_ip .btn_sch_ip").hide();
            }else {
                $(".sch_box .sch_ip .btn_sch_ip").show();
            }
        },
        main_close : function(){
            if($(".mainSection2-search_container .main_sch_box").hasClass("on")) {
                $(".main_sch_box").removeClass("on");
                $(".main-content2").removeClass("dotZindex");
                $(".keyVisualWrap, .navigationSlideGroup").removeClass("is_hide_m");
                //SDS_COMMON.search.del();
                if(SDS_COMMON.isMobile()) {
                    $("html, body").css("overflow", "");
                    /** 20220913 검색 취소시 상단으로 이동하는 이슈 삭제 */
                    // $(window).scrollTop(srearchCurScroll);
                }
                // window.history.back();
            }
        },
        checkValue : function() {
            var elInput = $(".sch_box .sch_ip input");

            /** 통합검색 hide,show 순서 수정 */
            if(elInput.val() != ""){
                SDS_COMMON.search.open();
                $(".sch_box .sch_ip .btn_del").show();
            }else {
				$(".sch_box .sch_ip .btn_del").hide();
            }
            /** //통합검색 hide,show 순서 수정 */
        },

        main_checkValue : function() {
            var elInput = $(".main_sch_box .sch_ip input");

            if(elInput.val() != ""){
                SDS_COMMON.search.main_search_open();
                // $(".main_sch_box .sch_ip .btn_del").show(); //통합검색 hide,show 순서 수정
            }else {
                // $(".main_sch_box .sch_ip .btn_del").hide(); //통합검색 hide,show 순서 수정
            }
        }
    }
    SDS_COMMON.search.init();


    /* tab */
    $(".tab_wrap").each(function(i){
        var $this = $(this);
        if($this.find(">.tab>ul>li").length == 2) {
            $this.find(">.tab").addClass("half");
        }

        $this.find(">.con").attr({'role':'tabpanel'});
        $this.find(">.tab ul > li > a").click(function(e){
            if(!$(this).hasClass('openLink')) {
                e.preventDefault();
                if($this.find(">.tab ul > li").length <= 1) return false;
                $this.find(">.tab li").removeClass("on");
                $this.find(">.tab .tab_sel").attr('aria-expanded','false');
                var index = $(this).parent().addClass("on").index();
                $this.find(">.tab .tab_sel .txt").text($(this).text());

                if($this.find(">.con").length || $this.hasClass("type1")){
                    $this.find(">.con").hide().eq(index).show();
                    $this.find(">.tab").removeClass("on");
                }else{
                    window.open($(this).attr("href"), "_self");
                }

                if($this.find(">.tab ul > li").hasClass('on')){
                    $this.find(">.tab ul > li a").attr({'aria-selected':false});
                    $this.find(">.tab ul > li.on a").attr({'aria-selected':true});
                }
            }
        });
    });

    $(".tab_m").each(function(i){
        $(this).find("li").addClass("on").siblings().removeClass("on");
    });

    $(window).resize(function(){
        if(!SDS_COMMON.isMobile()){

            $(".office_ac").each(function(i){
                if(!$(this).find(">li.on").length){
                    $(this).find(">li").eq(0).addClass("on").find(">div").show();
                }
            });
        }

    });

    $(".tab_sel").attr({'id':'tab_sel_control','role':'button','aria-expanded':false, 'aria-controls':'tab_sel_list'});
    $(".tab_sel").siblings('ul').attr({'id':'tab_sel_list', 'role':'tablist', 'aria-labelledby':'tab_sel_control'});
    $('#tab_sel_list a').attr({'role':'tab','aria-selected':false});
    $('#tab_sel_list li.on a').attr({'role':'tab','aria-selected':true});
    if($("html").attr("lang") == "ko") {
        var txt = $(".tab_sel").text();
        $(".tab_sel, .cnt_menu .sel").attr({'title':'카테고리 선택 리스트 더 보기'});
        $(".tab_sel").text('');
        $(".tab_sel").append("<span class='txt'></span>");
        $(".tab_sel .txt").text(txt);
        $(".tab_sel, .cnt_menu .sel").append("<span class='is_blind'>카테고리 선택 리스트 더 보기</span>");
    }
    else {
        var txt = $(".tab_sel").text();
        $(".tab_sel, .cnt_menu .sel").attr({'title':'View more menu'});
        $(".tab_sel").text('');
        $(".tab_sel").append("<span class='txt'></span>");
        $(".tab_sel .txt").text(txt);
        $(".tab_sel, .cnt_menu .sel").append("<span class='is_blind'>View more menu</span>");
    }
    $(".tab_wrap .tab_sel").click(function(e){
        $(this).parent().toggleClass("on");
        if ($(this).parent().hasClass("on")){
            $(this).attr('aria-expanded','true');
        }else{
            $(this).attr('aria-expanded', 'false');
        }
    });

    $(".tab_wrap").not(".type3").each(function(i){
        var $target = $(this);
        tabFixing($target);
        $target.find(".tab>ul>li>a").click(function(){
            var top = $target.offset().top;
            if($(window).scrollTop() > top) {
                $(window).scrollTop(top);
            }
        });

        $(window).resize(function(e){
            tabFixing($target);
        });

        $(window).scroll(function(e){
            tabFixing($target);
        });

    });

    function tabFixing($target){
        var $tab = $target.find(".tab");
        var top = $target.offset().top;

        var fixed = $tab.css("position") == "fixed";
        if(SDS_COMMON.isMobile()){
            if(!fixed && $(window).scrollTop() > top){
                $tab.addClass("fixed");
                $tab.parent().addClass("fixed");
            }else if(fixed && $(window).scrollTop() > top){

            }else{
                $tab.removeClass("fixed").css("top", "");
                $tab.parent().removeClass("fixed");
            }
        }else{
            $tab.removeClass("fixed");
        }
    }


    /* 210525 | A링크 클릭시 스크롤 이벤트 추가 */
    $(function() { 
        $('.indi_scl li a[href*="#"]:not([href="#"])').click(function() {           
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) { 
                var target = $(this.hash); target = target.length ? target : $('[name=' + this.hash.slice(1) +']');        
                var replaceText = $(this).text();   
            
                if (target.length) {  
                    $('.indi_scl li a').attr('aria-selected','false');                          
                    $('.indi_scl li a').parent().removeClass('on');    
                    $(this).attr('aria-selected','true');                    
                    $(this).parent().addClass('on');
                    $('.indi').removeClass('on');
                    $('.indi_sel .txt').text(replaceText);                  

                    if($(window).innerWidth() < 768){
                        $('.indi_wrap, .indi').addClass('fixed');
                        $('html,body').animate({ scrollTop: target.offset().top - 60 }, 1000); 
                    }else{
                        $('.indi_wrap, .indi').removeClass('fixed');
                        $('html,body').animate({ scrollTop: target.offset().top }, 1000); 
                    }                     
                    return false;                
                }                 
            }
        }); 
    }); 

    $(window).on("scroll", function(){
        var currentScroll = $(document).scrollTop();
        if($(window).innerWidth() < 768 && currentScroll > 60){
            $('.indi_wrap, .indi').addClass('fixed');
  
        }else{
            $('.indi_wrap, .indi').removeClass('fixed');     
        }    
    })

    $(".indi_sel").attr({'id':'indi_sel_control','role':'button','aria-expanded':false, 'aria-controls':'indi_sel_list'});
    $(".indi_sel").siblings('ul').attr({'id':'indi_sel_list', 'role':'tablist', 'aria-labelledby':'indi_sel_control'});
    $('#indi_sel_list a').attr({'role':'tab','aria-selected':false});
    $('#indi_sel_list li.on a').attr({'role':'tab','aria-selected':true});
    if($("html").attr("lang") == "ko") {
        var txt = $(".indi_sel").text();
        $(".indi_sel, .cnt_menu .sel").attr({'title':'카테고리 선택 리스트 더 보기'});
        $(".indi_sel").text('');
        $(".indi_sel").append("<span class='txt'></span>");
        $(".indi_sel .txt").text(txt);
        $(".indi_sel, .cnt_menu .sel").append("<span class='is_blind'>카테고리 선택 리스트 더 보기</span>");
    }
    else {
        var txt = $(".indi_sel").text();
        $(".indi_sel, .cnt_menu .sel").attr({'title':'View more menu'});
        $(".indi_sel").text('');
        $(".indi_sel").append("<span class='txt'></span>");
        $(".indi_sel .txt").text(txt);
        $(".indi_sel, .cnt_menu .sel").append("<span class='is_blind'>View more menu</span>");
    }

    $(".indi_wrap .indi_sel").click(function(e){
        $(this).parent().toggleClass("on");
        if ($(this).parent().hasClass("on")){
            $(this).attr('aria-expanded','true');
        }else{
            $(this).attr('aria-expanded', 'false');
        }
    });
    
    /* //210525 | A링크 클릭시 스크롤 이벤트 추가 */


    /* selectbox */
    $(".selectbox .sel").each(function(i){
        $(this).click(function(e){
            var $sel = $(".selectbox .sel").eq(i).parent();
            $(".selectbox dt.on").not($sel).removeClass("on");
            if($sel.hasClass("on")){
                $sel.removeClass("on");
                $("html, body").css("overflow", "");
            }else{
                $sel.addClass("on");
                if(SDS_COMMON.isMobile()) {
                    $("html, body").css("overflow", "hidden");
                }
            }
        });
    });

    $(".selectbox").each(function(i){
        var $select = $(this);
        $(this).find("dd a").click(function(){
            $select.find("dd a.on").removeClass("on");
            $(this).addClass("on");
            if($(this).parents(".selectbox.type2").length) {
                $select.find("dt .sel").val($(this).text()).end().find("dt").toggleClass("on");
            }else{
                $select.find("dt .sel").html($(this).html()).end().find("dt").toggleClass("on");
            }
            $select.find(".sel").focus();
            $("html, body").css("overflow", "");
        });
    });

    $(".selectbox .btn_close").click(function(){
        $(this).parents(".selectbox").find("dt").removeClass("on");
        $(this).parents(".selectbox").find(".sel").focus();
        $("html, body").css("overflow", "");
    });
    //

    /* let's btn */
    if($("#lets .btn_btm button").length>1){
        $("#lets .btn_btm").addClass("type1");
    };

    /** share 
    shareTip.init();
    $(document).on("click", ".btn_share, .cnt_menu .btn2, .hd_etc .btn2, .btn_share2, .thumb_share, .post_share, .evecom_nav_sns_share", function(e){
        e.preventDefault();
        shareTip.click($(this));
    });
*/

    /* overseas */
    $(".office_ac").each(function(){
        var $this = $(this);

        if(SDS_COMMON.isMobile()) {
            $this.find(">li.on").removeClass("on").find(">div").hide();
            if($("html").attr("lang") == "ko"){
                if($this.parents().is('#tab1')){
                    $this.find(">li").first().addClass("on").find(">div").show();
                }

            }
        }
        $this.attr('role','tablist');
        $this.find('li>div').attr('role','tabpanel');
        $this.find('li>a').attr({'role':'tab', 'aria-selected':'false'});
        if($this.find('li').hasClass('on')){
            $this.find('li.on a').attr({'aria-selected':'true'});
        }
        $(this).find(">li>a").on("click", function(){
            if(SDS_COMMON.isMobile()) {
                if($(this).parent().hasClass("on")) {
                    $(this).next().slideUp();
                    $(this).parent().removeClass("on");
                    $(this).attr({'aria-selected':'false'});
                }else {
                    $this.find(">li.on>div").slideUp();
                    $this.find(">li.on").removeClass("on");
                    $this.find('li>a').attr({'aria-selected':'false'});
                    $(this).next().slideDown(500, function(){
                        var _pos = $(this).closest("li").offset(),
                            _top = _pos.top
                        $("html, body").stop().animate({ scrollTop: _top -50}, 300);

                    });
                    $(this).attr({'aria-selected':'true'});
                    $(this).parent().addClass("on");
                }
            }else{
                if($(this).parent().hasClass("on")) {
                }else {
                    $this.find('li>a').attr({'aria-selected':'false'});
                    $(this).attr({'aria-selected':'true'});
                }
                $this.find(">li.on").removeClass("on").find(">div").hide();
                $(this).parent().addClass("on").end().next().show();
            }
        });
    });



    /* select */
    $(".ip_select select").each(function(e){
        $(this).val(-1);
    });
    $(".ip_select select").change(function(e){
        $(this).next().is("input") ? $(this).next().val($(this).find(":selected").text()) : $(this).next().text($(this).find(":selected").text()).css("color", "black");

        if ($(".select_group_1 :radio").length > 1) {
            var radios = $(".select_group_1 :radio");
            var index = radios.index(radios.filter(':checked'));
            if (index != this.selectedIndex) {
                radios[this.selectedIndex].checked = true;
            }
        }
    });

    $(".select_group_1 :radio").change(function(e) {
        var index = $(".select_group_1 :radio").index(this);
        $(".select_group_1 select").prop('selectedIndex', index).change();
    });

    // all check
    $(".check_msg.type1").allCheck();
    $(".check_msg.type1").allCheckSync();
    $(".term_box").allCheckSync();

    // $(".check_msg li input[type='checkbox']").attr("tabindex","-1");
    // $(".check_msg li label span[class='icon']").attr({
    //  tabindex : 0,
    //  role : "checkbox"
    // }).keydown(function(e){
    //  if(e.keyCode == 13){
    //      $(this).closest("li").find("input[type='checkbox']").trigger("click");
    //  }
    // });

    // financial
    if($("#fine_wrap").length) {
        $("#fine_wrap .tab a").not(".tab_sel").click(function(){
            if($(this).parent().is(".t_cr")) {
                $("#fine_wrap > .tab").css("visibility", "hidden");
            }else{
                $("#fine_wrap > .tab").css("visibility", "visible");
            }

        });

        $("#sel_qt_year").change(function(e){
            var val = $(this).val();
            $(this).find("option").each(function(i){
                val == $(this).val() ? $("."+$(this).val()).show() : $("."+$(this).val()).hide();
            });

        });
        $("#sel_each_year").change(function(e){
            var val = $(this).val();
            $(this).find("option").each(function(i){
                val == $(this).val() ? $("."+$(this).val()).show() : $("."+$(this).val()).hide();
            });

        });

        $(".tb_fin_m").each(function(){
            var $this = $(this);
            hidecol(1);

            function hidecol(index){
                $this.find("tr").each(function(i){
                    var size = $(this).children().length;
                    for(i=0;i<size;i++){
                        if(i != 0 && i != index) {
                            $(this).children().eq(i).hide();
                        }else{
                            $(this).children().eq(i).show();
                        }
                    }
                });
            }

            //paging
            $this.find("button").click(function(e){
                var $items = $this.find(".pg_area>strong");

                if($(this).parents(".pg_area").hasClass("year")){
                    if($(this).hasClass("btn_prev")){
                        var index = $this.find(".pg_area>strong.on").index();
                        var size = $items.length;
                        size > index ? $items.removeClass("on").eq(index).addClass("on") : $items.removeClass("on").eq(0).addClass("on");
                    }else{
                        var index = $this.find(".pg_area>strong.on").index();
                        var size = $items.length;
                        $items.removeClass("on").eq(index-2).addClass("on");
                    }

                    hidecol($this.find(".pg_area>strong.on").index());

                }else{
                    if($(this).hasClass("btn_next")){
                        var index = $this.find(".pg_area>strong.on").index();
                        var size = $items.length;
                        size > index ? $items.removeClass("on").eq(index).addClass("on") : $items.removeClass("on").eq(0).addClass("on");
                    }else{
                        var index = $this.find(".pg_area>strong.on").index();
                        var size = $items.length;
                        $items.removeClass("on").eq(index-2).addClass("on");
                    }

                    hidecol($this.find(".pg_area>strong.on").index());
                }

            });
        });
    }



    //career
    if($(".abt_job_acc").length){
        var url = unescape(location.href);
        var pm  = url.split('?');
        var params   = pm[1].split('&');
        for( var i=0; i<params.length; i++ ){
            var param = params[i].split('=');

            $(".abt_job_acc li").eq(param[1]).find("a").trigger("click");
        }
    }

    //sns_icon
    if($(".sns_icon").length) {

        $(".sns_icon a").hover(function(){
            if(!SDS_COMMON.isMobile()) {
                var src = $(this).find("img").attr("src").replace(".png","_hover.png");
                $(this).find("img").attr("src", src);
            }
        }, function(){
            if(!SDS_COMMON.isMobile()) {
                var src = $(this).find("img").attr("src").replace("_hover.png",".png");
                $(this).find("img").attr("src", src);
            }
        });

    }

     /** 20221123 matchHeight 적용 */
    if($(".ev_showcase").length) {
        var eventLine_mh = $('.ev_showcase'),
        eventLine_p = eventLine_mh.find('.show_list li dl dd p:first-child'),
        eventLine_dt = eventLine_mh.find('.show_list li dl dt');
        
        eventLine_p.matchHeight();             
        eventLine_dt.matchHeight();
    }
    /** //20221123 matchHeight 적용 */
                                       
                                       

    //event layout
    $('.ev_layout .show_list:not(.custom)').each(function(){
        var num = $(this).children().length;
        if(num == 1){
            $(this).addClass('one');
        }else if(num == 2){
            $(this).addClass('two');
        }else if(num == 4){
            $(this).addClass('four')
        }else if(num == 5){
            $(this).addClass('five')
        }else if(num == 6){
            $(this).addClass('six')
        }
    })
    $('.ev_showcase .sel_tab a').click(function(e){
        var target = $(this).attr('href');
        $(this).parent().addClass('on').siblings().removeClass('on');
        $('.show_ind_con .con').removeClass('on').removeClass('swiper-slide-active');
        $(target).addClass('on').addClass('swiper-slide-active');
        return false;
    })
    $('.ev_speakers').each(function(){
        var thum_num = $(this).find('.thum_list').find('li').length;
        if(thum_num == 1){
            $(this).find('.thum_list').addClass('one')
        }else if(thum_num == 2){
            $(this).find('.thum_list').addClass('two')
        }
    })


    $('.ev_agenda').each(function(){
        $(this).find('.tab_con_wrap').attr({'role':'tablist'});
        $(this).find('.btn_expanded').attr({'role':'tab', 'aria-expanded':'false'});
        $(this).find('.scd_wrap').attr('role','tabpanel');
        $(this).find('.sort_area>ul').attr('role','tablist');
        $(this).find('.sort_area>ul li a').attr({'role':'tab', 'aria-selected':'false'});
        $(this).find('.sort_area>ul li.on a').attr('aria-selected', true);

        $(this).find('.sort_area').find('a').click(function(e){
            var target = $(this).attr('href');
            $(this).parent().addClass('on').siblings().removeClass('on');
            $('.ev_agenda .sort_area li a').attr('aria-selected',false);
            $(this).attr('aria-selected',true);
            $('.ev_agenda .scd_list').removeClass('on');
            $(target).addClass('on');
            return false;
        })
        var num = $(this).find('.sort_area').find('li').length;
        if(num == 0){
            $(this).addClass('none');
        }else if(num == 1){
            $(this).addClass('one');
        }else if(num > 1){
            $(this).addClass('more')
        }
        $('.ev_agenda .btn_expanded').click(function(){
            var idx = $(this).parent().index();
            if($(this).parent('.scd_list').hasClass('on')){
                $('.scd_list').eq(idx).find('.scd_wrap').slideUp();
                $('.scd_list').eq(idx).removeClass('on');
                $(this).attr({'aria-selected':'false','aria-expanded':'false'});
            }else{
                $('.scd_list').eq(idx).find('.scd_wrap').slideDown();
                $('.scd_list').eq(idx).addClass('on');
                $(this).attr({'aria-selected':'true','aria-expanded':'true'});
            }
            $('.ev_agenda .sort_area li').eq(idx).addClass('on').siblings().removeClass('on');
        })

        $('.ev_agenda .sort_area button').on('click', function(){
            if($(this).hasClass('on')){
                $('.scd_list').find('.scd_wrap').slideUp();
                $('.scd_list').removeClass('on');
                $(this).html(lang_quarter('전체 열기','全部打开','OPEN ALL','ABRIR TUDO'))
                $(this).removeClass('on')
            }else{
                $('.scd_list').find('.scd_wrap').slideDown();
                $('.scd_list').addClass('on');
                $(this).html(lang_quarter('전체 닫기','全部关闭','CLOSE ALL','FECHAR TUDO'))
                $(this).addClass('on')
            }
        })
        if($(this).hasClass('more')){
            if(SDS_COMMON.currentWidth() < 767){
                $('.scd_list').removeClass('on');
            }
        }
        var tabIdx = $(this).find('.sort_area').find('li').length;
        if(tabIdx == 0){
            $('.btn_expanded').hide();
        }

    })
    $('.scd_list li br').each(function(){
        $(this).parents('li').addClass('t_row')
    })
    if($('.show_ind_con .con').length > 1){
        var mySwiper = undefined;
        function initSwiper() {
            var screenWidth = $(window).width();
            if(screenWidth < 767 && mySwiper == undefined) {
                var focusableEl = 'a, select, button, textarea, input, area';
                mySwiper = new Swiper('.show_ind_con', {
                    speed : 700,
                    resistance: false,
                    loop : true,
                    slidesPerView: 'auto',
                    loopAdditionalSlides : 0 ,
                    pagination: '.show_ind_con .swiper-pagination',
                    paginationElement :'a href',
                    paginationClickable: true,
                    followFinger : false,
                    onSlideChangeEnd: function(swiper) {
                        swiper.slides[swiper.realIndex+swiper.loopedSlides].focus();
                        $('.swiper-slide').attr({'tabindex':'-1','aria-hidden':'true'});
                        $('.swiper-slide').find(focusableEl).attr({'tabindex':'-1','aria-hidden':'true'});
                        $('.swiper-slide-active').attr({'tabindex':'0','aria-hidden':'false'});
                        $('.swiper-slide-active').find(focusableEl).attr({'tabindex':'0','aria-hidden':'false'});
                        $('.swiper-slide-duplicate').attr({'tabindex':'-1','aria-hidden':'true'});
                        $('.swiper-slide-duplicate').find(focusableEl).attr({'tabindex':'-1','aria-hidden':'true'});
                        $('.swiper-slide-duplicate-active').attr({'tabindex':'-1','aria-hidden':'true'});
                        $('.swiper-slide-duplicate-active').find(focusableEl).attr({'tabindex':'-1','aria-hidden':'true'});
                    },
                    paginationBulletRender : function(swiper, index){
                        return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>'
                    }
                });
                $('.swiper-slide').attr({'tabindex':'-1','aria-hidden':'true'});
                $('.swiper-slide').find(focusableEl).attr({'tabindex':'-1','aria-hidden':'true'});
                $('.swiper-slide-active').attr({'tabindex':'0','aria-hidden':'false'});
                $('.swiper-slide-active').find(focusableEl).attr({'tabindex':'0','aria-hidden':'false'});
                $('.swiper-slide-duplicate').attr({'tabindex':'-1','aria-hidden':'true'});
                $('.swiper-slide-duplicate').find(focusableEl).attr({'tabindex':'-1','aria-hidden':'true'});
                $('.swiper-slide-duplicate-active').attr({'tabindex':'-1','aria-hidden':'true'});
                $('.swiper-slide-duplicate-active').find(focusableEl).attr({'tabindex':'-1','aria-hidden':'true'});
            } else if (screenWidth > 767 && mySwiper != undefined) {
                mySwiper.destroy();
                mySwiper = undefined;
                jQuery('.swiper-wrapper').removeAttr('style');
                jQuery('.swiper-slide').removeAttr('style');
            }
        }
        initSwiper();
        $(window).on('resize', function(){
            initSwiper();
        });
    }

    if($('.btn_go_top').length > 0){
        $('.btn_go_top a').click(function(e){
            e.preventDefault();
            var target = $(this).attr('href');
            var targetTop = $(target).offset().top - 50;
            $('html, body').animate({scrollTop : targetTop + 'px'},300)
        })
    }
    $('.m_survey_acc .acc_list  a').click(function(){
        if($(this).parent().hasClass('on')){
            $(this).parent().removeClass('on');
            $(this).siblings('.sub_con').slideUp();
        }else{
            $(this).parent().addClass('on').siblings().removeClass('on');
            $('.m_survey_acc .sub_con').slideUp();
            $(this).siblings('.sub_con').slideDown();
        }
    })
    var windowWidth = $(window).width();
    $(window).resize(function(){
        if($(window).width() != windowWidth){
            windowWidth = $(window).width();
            $('.ev_agenda').each(function(e){
                if(!SDS_COMMON.isMobile()){
                    if(!$(this).find(".scd_list.on").length || $(this).find(".scd_list.on").length > 1){
                        $(this).find('.sort_area li').first().addClass('on').siblings().removeClass('on');
                        $(this).find('.scd_list').first().addClass('on').siblings().removeClass('on');
                    }
                }else{
                    if($(this).hasClass('more')){
                        $('.scd_list').removeClass('on');
                        $('.scd_wrap').hide();
                    }
                }
                $(this).find('.btn_expanded').attr({'aria-expanded':'false'});
                $(this).find('.sort_area>ul li a').attr({'aria-selected':'false'});
                $(this).find('.sort_area>ul li.on a').attr('aria-selected', true);
            })
        }
    })

    if($(".monial_tab").length > 0){
        var $monial_tab_item = $(".monial_tab_item");
        var $monial = $(".monial");

        $monial_tab_item.click(function(e){
            var $this = $(this);
            var $this_monial = $("#"+$this.attr("data-id"));

            $monial_tab_item.removeClass("active");
            $this.addClass("active");

            $monial.hide();
            $this_monial.show();

        });

    }

    if($(".cntTab").length > 0){
        $('.cntTab').each(function(index) {
            var $cntTab_item = $(this);

            var $is_changBackground = $cntTab_item.find('.is_changBackground');
            var $cntTab_item_on = $cntTab_item.find('.on');
            var $cntTab_item_on_url = $cntTab_item_on.attr("data-url");
            var $cntTab_desc = $cntTab_item.find('.cntTab_desc');
            var $cntTab_item_btn = $cntTab_item.find('.cntTab_item');

            $is_changBackground.css('background-image', $cntTab_item_on_url);

            $cntTab_item_btn.click(function(){
                var $this = $(this);
                var $data_url = $this.attr("data-url");
                $cntTab_item_btn.removeClass('on');
                $cntTab_item.find('.cntTab_left .text').removeClass('current').attr('tabindex','');
                $this.addClass('on');

                $is_changBackground.css('background-image',$data_url);

                for (let i = 0; i < $cntTab_item_btn.length; i++) {
                    if ($cntTab_item_btn.eq(i).hasClass('on')) {
                        $cntTab_desc.eq(i).addClass('current').attr('tabindex',0).focus();
                    }
                }
            });
        });
    }

    if($(".btn_chart").length > 0){
        var $btn_chart = $(".btn_chart");
        var $btn_chart_img = $(".btn_chart img");
        var $btn_chart_img_src = $btn_chart_img.attr("src");
        var $btn_chart_img_src_base = $btn_chart_img_src.substring(0, $btn_chart_img_src.length - 5);
        var $btn_chart_button = $(".btn_chart button");

        if ($(".change").length > 0) {
            var $btn_change = $(".change");
        }

        $btn_chart_button.click(function(e){
            var this_num = e.currentTarget.id.split("btn_chart")[1];
            $btn_chart_img.attr("src",$btn_chart_img_src_base + this_num + ".jpg");
            if ($btn_change.length > 0) {
                $btn_change.hide();
                $btn_change.eq(this_num-1).show();
            }
        });
    }

    if($(".solu_dep_chart").length > 0){
        var $solu_dep_item = $("a.solu_dep_item");
        var $solu_dep_chart = $(".solu_dep_chart");

        if ($(".change").length > 0) {
            var $btn_change = $(".change");
        }

        $solu_dep_item.click(function(e){
            var $this = $(this);
            if (!$this.hasClass('active')) {
                $this.parents('.solu_dep_chart').find('.solu_dep_item.active').removeClass('active');
                $this.addClass('active');
                $this.parents('.ul_im.im_center').find('.solu_viewer .im.change').hide().filter($this.attr('href')).show();
            }
            return false;
        });
    };


    if($('.abt_bns_list .dot_txt').length > 0){
        $('.abt_bns_list').find('.text').addClass('fixed_h');
    }

    /* is_siblingsClose */
    if($('.is_siblingsClose').length) {
        $('.is_siblingsClose').each(function() {
            $(this).on('click', function () {
                $(this).parents('.forum_radio').siblings().find('input').each(function() {
                    this.checked = false;
                });
            });
        });
    }
    /* //is_siblingsClose */

    /* set tabindex = 0 */
    var focusableElement = {
        target : $('.reporting_item'),
        setTabIndexToZero : function(){
            if(this.target.attr('tabindex')!== null){
                this.target.prop('tabindex','0');
            }
            else{
                this.target.attr('tabindex','0');
            }
        }
    }
    focusableElement.setTabIndexToZero();

    /* file attachment */
    var ipFile = {
        fileBox : $('.att_file'),
        deleteBtnFocus : function(){
            this.fileBox.each(function(){
                var self = $(this);
                var attachmentBtn = self.find('#atta_file');
                $(document).on('click', '.att_file .ico_del', function() {
                    attachmentBtn.focus();
                });
            });
        },
    }
    ipFile.deleteBtnFocus();
});
function focusForm() {
    $('.ev_overview .ul_ip li').first().find('input').focus();
}

/* share */
/**
var shareTip = {
    $cizion :    '<div id="lv-widget" data-id="samsung_sds" data-uid="MTIxNC8yNzg2NC80NDQy">' +
        '<script type="text/javascript">' +
        "window.livereWidgetOptions = {" +
        "list: ["+lang_quarter('"facebook"','"weibo_sina"','"facebook"','"facebook"')+", "+lang_quarter('"linkedIn"','"linkedIn"','"linkedIn"','"linkedIn"')+", "+lang_quarter('"twitter"','"renren"','"twitter"','"twitter"')+", "+lang_quarter('"kakaotalk"','""','""','""')+"]" +
        ",customCss: 'https://cdn-city.livere.com/consumers/sds/sds.css'" +
        ",kakaoAppKey: 'cbee93b45350bab6359a13c3ad1be5eb'" +
        ",lazy: true" +
        ",lang: '"+lang_quarter('ko','zh_cn','en','la')+"'" +
        ",height: '115px'" +
        "};" +
        "(function(d, s) {var j, e = d.getElementsByTagName(s)[0];if (typeof Toybox === 'function') { return; }j = d.createElement(s);j.src = 'https://cdn-city.livere.com/js/toybox.dist.js';j.async = true;e.parentNode.insertBefore(j, e);})(document, 'script');" +
        '</script>' +
        '<noscript>라이브리 댓글 작성을 위해 JavaScript를 활성화 해주세요.</noscript>' +
        '</div>',

    el :   '<div class="share_wrap" id="popShare" style="display:none"><span class="arr"></span>' +
        '<div class="widget" data-id="samsung_sds" data-uid="MTIxNC8yNzg2NC80NDQy"></div>' +
        '<button class="btn_close" type="button">'+lang_quarter('닫기','关闭','close','close') +'</button></div>',

    active : false,
    mobileStyle : "position:fixed;left:0;bottom:0",
    $share : null,
    $dim : null,
    currentTarget : null,
    preWidth : 0,
    init : function() {
        $(".btn_share, .cnt_menu .btn2, .hd_etc .btn2, .btn_share2, .thumb_share, .post_share, .evecom_nav_sns_share").attr("href", "#popShare").hide();
        this.preWidth = SDS_COMMON.currentWidth();
        // dim
        this.$dim = $("<div class='share_dim'></div>");
        this.$share =  $(".share_wrap").length > 0 ? $(".share_wrap") : $(this.el);
        $("body").append(this.$dim);
        $("body").append(this.$cizion);
        $("body").append(this.$share);
        this.$dim.click(function(e){
            e.preventDefault();
            shareTip.close();
        });

        var $close = this.$share.find(".btn_close");
        $close.click(function(e){
            shareTip.close();
        });

        //var clipboard = new Clipboard('#btn_copy_share');

        // 20200319 공유하기 기능 오류로 인한 공유버튼 임시 숨김 처리
        var hideShareBtn = $(".btn_share, .cnt_menu .btn2, .hd_etc .btn2, .btn_share2, .thumb_share, .post_share");
        hideShareBtn.siblings().each(function(){
            var mark = $(this);
            mark.text()=='|' && mark.hide();
        });
    },
    click : function(target){
        this.currentTarget = target;
        if($(this.currentTarget).hasClass("on")) {
            this.close();
        }else {
            this.open();
        }
    },
    open : function() {
        this.active = true;
        $(".btn_share.on, .cnt_menu .btn2.on, .hd_etc .btn2.on, .btn_share2.on, .thumb_share.on, .post_share.on,  .evecom_nav_sns_share.on").removeClass("on");
        this.currentTarget.addClass("on");

        $("body").on('touchmove', function(e){e.preventDefault(); e.stopPropagation();});

        var btn = this.currentTarget;
        var $share = this.$share;
        var pageWidth = $("header").width();
        if(btn.hasClass('btn_share')
            && btn.siblings('a').length == 1
            && btn.siblings('a').attr('href') != undefined
            && btn.siblings('a').attr('href') != ''){
            var url = btn.siblings('a').attr('href');
            if(url =='#' && btn.siblings('a').hasClass('btn_vod'))  //for youtube
            {
                url = btn.siblings('a').attr('data-src');
            }
            if(url.indexOf("https://") == -1){
                url = 'https://www.samsungsds.com' + url;
            }
            if(url.indexOf(".pdf") != -1)   //for pdf file
            {
                url = url.replace("https","http");
            }
            $share.find('.widget').attr('data-url', url);
            $share.find('.widget').attr('data-title',btn.parent().parent().find(':header:first').text());
            $share.find('.widget').attr('data-desc','');

            var imgUrl = btn.parent().parent().parent().find('.thumb_imgBox').css('background-image')
            if(imgUrl){
                $share.find('.widget').attr('data-image', imgUrl.replace('url(','').replace(')','').replace(/\"/gi, ""));
            }else if(btn.closest("div").prev().find("img").attr("src") != undefined){
                $share.find('.widget').attr('data-image', btn.closest("div").prev().find("img").attr("src"));
            } else {
                var num = parseInt(Math.floor((Math.random()*5) + 1))
                $share.find('.widget').attr('data-image', 'https://image.samsungsds.com/global/en/images/comp_image_'+ num +'.jpg?queryString=20190325060631');
            }
        }else if(btn.hasClass('btn_share') || btn.hasClass('btn_share2')){//for mobile kakaotalk
            $share.find('.widget').attr('data-url',location.href);
            $share.find('.widget').attr('data-title',$('meta[name=title]').attr("content"));
            $share.find('.widget').attr('data-desc',$('meta[name=description]').attr("content"));
            $share.find('.widget').attr('data-image',$('meta[property="og:image"]').attr('content'));
        }
        else{
            $share.find('.widget').removeAttr('data-title');
            $share.find('.widget').removeAttr('data-image');
            $share.find('.widget').removeAttr('data-desc');
            $share.find('.widget').attr('data-url',location.href);
        }
        Toybox.reloadTo('.widget');

        if(SDS_COMMON.isMobile()) {
            if(!$share.is(":animated")){
                this.$dim.show();
                var h = $share.height();
                $share.attr("style", this.mobileStyle).show().css({"bottom":"-"+h+"px"});
                $share.show().animate({ "bottom": "0" }, 500);
            }
        }else{
            var offset = this.getOffset();
            var winWidth = $(document).width();
            var top = 0;
            var left = 0;

            if(btn.parents(".cnt_menu").length > 0) {    //fixed share
                var left = offset.left +btn.outerWidth() - $share.outerWidth();
                var top = offset.top + 86;
                var arrLeft = $share.width() - (btn.width()/2);
                $share.find(".arr").css("left", arrLeft+"px");
                $share.show().attr("style", "").css({"top":top+"px", "left":left+"px"});
            }else if(btn.parents(".hd_etc").length > 0){
                var left = btn.position().left +btn.outerWidth() -$share.outerWidth();
                var top = offset.top + 84;
                var arrLeft =  $share.width() - (btn.width()/2);
                $share.find(".arr").css("left", arrLeft+"px");
                $share.show().attr("style", "").css({"top":top+"px", "left":left+"px"});
            }else if(btn.parents(".btm_btns").length > 0){
                var left = offset.left +btn.outerWidth() -$share.outerWidth();
                var top = offset.top + 58;
                var arrLeft =  $share.width() - (btn.width()/2);
                $share.find(".arr").css("left", arrLeft+"px");
                $share.show().attr("style", "").css({"top":top+"px", "left":left+"px"});
            }else if(btn.parents(".post_btnBox").length > 0){
                var left = offset.left +btn.outerWidth() -$share.outerWidth() - (winWidth - pageWidth)/2;
                var top = offset.top + 55;
                var arrLeft =  $share.width() - (btn.width()/2);
                $share.find(".arr").css("left", arrLeft+"px");
                $share.show().attr("style", "").css({"top":top+"px", "left":left+"px"});
            }else{
                if(winWidth-offset.left < $share.outerWidth()) {
                    left = winWidth - $share.outerWidth();
                    top = offset.top +30;
                    var arrLeft =  offset.left - left + 10;
                    $share.find(".arr").css("left",arrLeft+"px");
                }else{
                    top = offset.top +30;
                    left =  offset.left - (winWidth-pageWidth)/2 - 20;
                    $share.find(".arr").css("left","");
                }
                $share.show().attr("style", "").css({"top":top+"px", "left":left+"px"});
            }
        }

        // $share.find('.widget').attr('tabindex','0').show().focus();
        $share.find('.widget').on('keydown', function(e) {
            if ($share.find('.widget').is(':focus') && e.shiftKey) {
                e.preventDefault();
            }
        });
        $share.find('.btn_close').on('keydown', function(e) {
            var keyCode = e.keyCode || e.which;

            if (!e.shiftKey && keyCode == 9) {
                e.preventDefault();
            }
        });

        var list = this.$share.find("li");
        var idx = 0;

        for (var i = 0; i < list.length; i++) {
            if ($(list[i]).css("display") != "none") {
                idx = i;
                break;
            }
        }
        this.$share.find("a").eq(idx).focus();

    },
    close : function(){
        if(this.active && SDS_COMMON.isMobile()) {
            var share = this;
            setTimeout(function(){
                share.$share.hide();
                share.active = false;
                share.currentTarget.removeClass("on");
                share.currentTarget.focus();
                $("html, body").off('touchmove');
                share.$dim.hide();
            }, 300);

        }else if(this.active){
            this.$share.hide();
            this.active = false;
            this.currentTarget.removeClass("on");
            this.currentTarget.focus();
            $("html, body").off('touchmove');
            this.$dim.hide();
        }

    },
    scrollclose : function(){
        if(this.active && SDS_COMMON.isMobile()) {
            var share = this;
            setTimeout(function(){
                share.$share.hide();
                share.active = false;
                share.currentTarget.removeClass("on");
                $("html, body").off('touchmove');
                share.$dim.hide();
            }, 300);

        }else if(this.active){
            this.$share.hide();
            this.active = false;
            this.currentTarget.removeClass("on");
            $("html, body").off('touchmove');
            this.$dim.hide();
        }

    },
    getOffset : function() {
        var result = {
            top : this.currentTarget.offset().top,
            left : this.currentTarget.offset().left
        };
        return result;
    }
};
*/

/** 
$(window).on("resize", function(e){
    if(shareTip.active && !SDS_COMMON.isMobile()) { // not mobile
        shareTip.preWidth = SDS_COMMON.currentWidth();
        shareTip.close();
    }
    if(SDS_COMMON.currentWidth() > 767){
        $('.sel_tab li').first().addClass('on').siblings().removeClass('on');
        $('.swiper-wrapper #ind1').addClass('on');
    }
});

$(window).on("scroll", function(e){
    if(shareTip.active && shareTip.currentTarget.parents(".cnt_menu").length > 0) {
        var scrollTop = $(this).scrollTop();
        var menuTop = $(".cnt_menu").offset().top;
        var menuHeight =  $(".cnt_menu").height() + 16;
        if(scrollTop > menuTop) {
            shareTip.$share.css({"position":"fixed", "top": menuHeight+"px"});
        }else{
            shareTip.$share.css({"position":"absolute", "top": (menuTop+menuHeight)+"px"});
        }
    }
    if($(SDS_COMMON.currentWidth() < 767)){
        if($(".ev_overview").length > 0){
            var scrollTop = $(this).scrollTop();
            var target = $('.ev_overview')
            var top = target.offset().top;
            var targetH = target.height();
            var bottom = top + targetH
            if(scrollTop > bottom){
                $('.ev_layout .fixed_btn').css('position','fixed')
            }else{
                $('.ev_layout .fixed_btn').css('position','relative')
            }
        }
    }
});
*/

$(window).on("click touchstart", function(e){
    var $target = $(e.target);
    // if(shareTip.active && !$target.hasClass("share_wrap") && !$target.is(".cnt_menu .btn2") && !$target.is(".hd_etc .btn2") && !$target.hasClass("btn_share") && !$target.hasClass("btn_share2") && !$target.hasClass("thumb_share")  && !$target.hasClass("evecom_nav_sns_share") && !$target.hasClass("post_share") && $target.parents(".share_wrap").length<=0){
    //     shareTip.scrollclose();
    // }

    /* 네비,메인서치 구분 */
    /** 20230116 !$target.is('button') 추가 */
    if($(".search_box .sch_box").hasClass("on") && !$target.parents(".search_box .sch_box").length && !$target.is(".search_box .sch_box") && !$target.is("button")) {
        // console.log("navi search close")
        SDS_COMMON.search.close();
    }
    //202304-01 웹접근 추가 : 메인 검색 슬라이드 dots 클릭 조건 추가
    if( $(".mainSection2-search_container .main_sch_box").hasClass("on") && !$target.parents(".mainSection2-search_container .main_sch_box").length && !$target.is(".mainSection2-search_container .main_sch_box") && !$target.is(".main-content2 .custom_paging li a")) {
        // console.log("메인index section2 서치 밖앝 터치")
        SDS_COMMON.search.main_close();
    }
    /* //네비,메인서치 구분 */

    /**통합검색 수정 : 서치 리마스터 MP_promotion_video 서치부분에도 영향이 있다 */
    /** 20230116 !$target.is('button') 추가 */
    if($(".sch_box").hasClass("on") && !$target.parents(".sch_box").length && !$target.is(".sch_box") && !$target.is('button') ) {
        // console.log("공통 서치 밖앝 터치")
        SDS_COMMON.search.close();
    }

    //통합검색 수정 : 서치페이지 모바일 카테고리 드랍다운 
    if($(".wrp_category_cont").hasClass("on") && !$target.parents(".wrp_category").length && !$target.is(".wrp_category")) {
        $('.wrp_category_cont').removeClass('on');
    }

    if($(".selectbox dt.on").length && !$target.parents(".selectbox").length) {
        $(".selectbox dt").removeClass("on");
    }
    
    if($(".fil_tab>li.on").length && !$target.parents(".filter_wrap, .ui-datepicker-header").length){
        $(".fil_tab>li.on").removeClass("on");
        $(".fil_con>li.on").removeClass("on");
    }

    /** 20231103 gnb : 밖앝 클릭시 close */
    if($(".gnb .hd-cnt .menu > li").hasClass('on') && !$target.parents(".gnb .hd-cnt .menu > li").length){
        $(".gnb .hd-cnt .menu > li").removeClass("on");
        $('body').removeClass('hid_s')
    }
});

$(window).on("resize", function(e){
    if(!SDS_COMMON.isMobile()){
        $("html, body").css("overflow", "");
    }
});

/* checkSelect */
function checkSelect (input) {
    var term_checked = document.getElementById("checkbox1_"+input);
    document.getElementById("checkbox"+input).checked=true;

    var term_checked_val = term_checked.getAttribute("checked");
}

/* plugin */
(function($) {
    /* allcheck */
    $.fn.allCheck = function(opts) {
        var defaults = {
            all : ".ck_all",
            child : ".ck_child",
            disabledClass : "disabled"
        };
        var options = $.extend({}, defaults, opts);
        $(this).each(function(index) {
            var $this = $(this);
            var size = $(this).find($(options.child)).length;
            $(this).find($(options.all)).on("change", function(e){

                if($(this).prop("checked")) {
                    $this.find($(options.child)).prop({"checked":true});
                }else{
                    $this.find($(options.child)).prop({"checked":false});
                }
            });

            $this.find(options.child).on("change", function(e){
                setting();
            });

            function setting() {
                var checkCount = $this.find($(options.child+":checked")).length;
                var $all = $this.find($(options.all));
                if(checkCount == 0){
                    $all.prop({"checked":false});
                }else if(checkCount >= size) {
                    $all.prop({"checked":true});
                    $this.find($(options.child)).prop({"checked":true});
                }else{
                    $all.prop({"checked":false});
                }
            }
        });
    }

    /*20180202 무료체험동의양식 팝업 체크 기능 추가*/
    $.fn.allCheckSync = function(opts) {
        var defaults = {
            all : ".select_all .ck_all",
            child : ".select_child .ck_child",
            disabledClass : "disabled"
        };
        var options = $.extend({}, defaults, opts);
        $(this).each(function(index) {
            var $this = $(this);
            var size = $(this).find($(options.child)).length;

            $(this).find($(options.all)).on("change", function(e){
                var all = $.find(options.all);
                if($(this).prop("checked")) {
                    $('.check_msg.type1.sync').find($(options.all)).prop({"checked":true});
                    $('.term_box').find($(options.all)).prop({"checked":true});
                    $('.check_msg.type1.sync').find($(options.child)).prop({"checked":true});
                    $('.term_box').find($(options.child)).prop({"checked":true});
                }else{
                    $('.check_msg.type1.sync').find($(options.all)).prop({"checked":false});
                    $('.term_box').find($(options.all)).prop({"checked":false});
                    $('.check_msg.type1.sync').find($(options.child)).prop({"checked":false});
                    $('.term_box').find($(options.child)).prop({"checked":false});

                    $('.check_msg.type1.sync').find($("input:checkbox")).prop({"checked":false});
                    $('.term_box').find($("input:checkbox")).prop({"checked":false});


                }
                checkErrorMsg();
                //Tech Forum Error
            });

            $this.find(options.child).on("change", function(e){
                var index = $(this).parent().index();
                setting(index-1, this.checked);
                checkErrorMsg();
                //Tech Forum Error
            });

            function setting(index, value) {
                var checkCount = $this.find($(options.child+":checked")).length;
                var $term_box = $('.term_box').find($(options.all));
                var $check_msg = $('.check_msg.type1.sync').find($(options.all));
                $('.term_box').find($(options.child))[index].checked = value;
                $('.check_msg.type1.sync').find($(options.child))[index].checked = value;
                if(checkCount == 0){
                    $term_box.prop({"checked":false});
                    $check_msg.prop({"checked":false});
                }else if(checkCount >= size) {
                    $term_box.prop({"checked":true});
                    $check_msg.prop({"checked":true});
                    $('.term_box').find($(options.child)).prop({"checked":true});
                    $('.check_msg.type1.sync').find($(options.child)).prop({"checked":true});
                }else{
                    $term_box.prop({"checked":false});
                    $check_msg.prop({"checked":false});
                }
            }

            // Tech Forum Error
            function checkErrorMsg() {
                var elMandChecked = $(".check_msg.type1 .ck_child.mand");
                var allChecked = true;
                if (elMandChecked.length) {
                    elMandChecked.each(function (index, item) {
                        if (!$(item).is(":checked")) {
                            allChecked = false;
                            return false;
                        }
                    });
                    if (!allChecked) {
                        $(".check_msg.type1 .error_msg").show();
                        $(".l_term.type2.select_popup .term_box").addClass("is_error")
                    } else {
                        $(".check_msg.type1 .error_msg").hide();
                        $(".l_term.type2.select_popup .term_box").removeClass("is_error")
                    }
                }

                var elLayerMandChecked = $(".term_box .mand");
                var allLayerChecked = true;
                if (elLayerMandChecked.length) {
                    elLayerMandChecked.each(function (index, item) {
                        if (!$(item).is(":checked")) {
                            allLayerChecked = false;
                            return false;
                        }
                    });

                    if (!allLayerChecked) {
                        $(".layer_wrap .error_msg").show();
                        $(".l_term.type2.select_popup .term_box").addClass("is_error")
                    } else {
                        $(".layer_wrap .error_msg").hide();
                        $(".l_term.type2.select_popup .term_box").removeClass("is_error")
                    }
                }
            }
        });
    }

    /* image resize */
    $.fn.bgResize = function(opts) {
        var preViewType = SDS_COMMON.currentWidth() > SDS_COMMON.mobileWidth ? "web" : "mobile";

        $(this).each(function(){
            preViewType == "web" ? '' : $(this).css("background-image", ($(this).css("background-image").replace("_w.","_m.") || $(this).css("background-image").replace("_w_","_m_")));
        });

        var $this = $(this);
        $(window).on("resize", function(e){
            var curWidth = SDS_COMMON.currentWidth() > SDS_COMMON.mobileWidth ? "web" : "mobile";
            $this.each(function(i){
                var image = $(this).css("background-image");
                if(preViewType != curWidth){
                    curWidth=="web" ? $(this).css("background-image", $(this).css("background-image").replace("_m.","_w.")) : $(this).css("background-image", $(this).css("background-image").replace("_w.","_m."));
                    curWidth=="web" ? $(this).css("background-image", $(this).css("background-image").replace("_m_","_w_")) : $(this).css("background-image", $(this).css("background-image").replace("_w_","_m_"));
                }
            });
            preViewType = curWidth;
        });
    }

    $.fn.imgResize = function(opts) {
        var preViewType = SDS_COMMON.currentWidth() > SDS_COMMON.mobileWidth ? "web" : "mobile";

        $(this).each(function(){
            preViewType == "web" ? '' : $(this).attr("src", ($(this).attr("src").replace("_w.","_m.") || $(this).attr("src").replace("_w_","_m_")));
        });

        var $this = $(this);
        $(window).on("resize", function(e){
            var curWidth = SDS_COMMON.currentWidth() > SDS_COMMON.mobileWidth ? "web" : "mobile";
            $this.each(function(i){
                var image = $(this).attr("src");
                if(preViewType != curWidth){
                    curWidth=="web" ? $(this).attr("src", $(this).attr("src").replace("_m.","_w.")) : $(this).attr("src", $(this).attr("src").replace("_w.","_m."));
                    curWidth=="web" ? $(this).attr("src", $(this).attr("src").replace("_m_","_w_")) : $(this).attr("src", $(this).attr("src").replace("_w_","_m_"));
                }
            });
            preViewType = curWidth;
        });
    }

    $(function(){
        var imgs = $('.atc_detail .im img');
        imgs.each(function(){
            var img = $(this);
            var width = img.width();
            var height = img.height();
            if(width < height){
                img.addClass('portrait');
            }else{
                img.addClass('landscape');
            }
        })
    });
})(jQuery);


jQuery(document).ready(function($){
    /* aes 추가 */                           
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js";
    script.defer = true;
    document.body.appendChild(script);                               
                               
    var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
    if (isiPhone)
    {
        $(".video_wrap").remove();
    }

    /* PDF Download open with New tab */
    $("a.pdf_download").attr('target','_blank');

    /* Security File Attach Layer Keyboard Accessibility */
    $(".file_add").focus(function(){
        $(".file_wrap .label").addClass("on");

    }).blur(function(){
        $(".file_wrap .label").removeClass("on");
    })

    /* if mobile add anchor tag on the "strong.s_tit" for accessibiity*/
    if(SDS_COMMON.currentWidth()  < 1025){
        $("strong.s_tit").wrapInner("<a href='#'>");
    }else{
    }
});

$(document).on('click', '#service_close_title', function() {
    SDS_COMMON.search.close();
    SDS_COMMON.search.main_close(); //202304-01 웹접근 추가
    
    /**20221103 비디오 페이지(인사이트 서치도 관련있을수 있음) 서치 */
    if($(".sch_box .sch_ip input").val() != ""){
        $(".sch_box .sch_ip .btn_sch_ip").hide();
    }else {
        $(".sch_box .sch_ip .btn_sch_ip").show();
    }
});
//document.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>');
