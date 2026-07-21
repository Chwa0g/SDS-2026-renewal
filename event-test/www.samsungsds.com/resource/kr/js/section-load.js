//헤더 gnb 삽입       
$.get('/kr/gnb/gkr01/menu.html?queryString=20260720100048', function(data) {
			$('#mega-menu').empty();
            $('#mega-menu').append(data);
        });


//우측 플로팅 삽입       
$.get('/kr/layout/floating-action-v2.html?queryString=20260720100048', function(data) {
            $('#floating-menu').append(data);
        });


// 푸터 삽입 시작
   // $("#footer").load("/kr/layout/footer.html?queryString=20260720100048", footerInit);
 $.get('/kr/layout/footer.html?queryString=20260720100048', function(data) {
            $('#footer').append(data);
        });

    function footerInit() {
        if($('#footer').find('.common-bottom-menu-bx').length) {
            console.log("신규footer에서만 : footer.html 불러오고 이벤트 실행", $('#footer').find('.common-bottom-menu-bx').length);
            createFooter();
        } else {
            console.log("기존 footer.html 에서의 footerInit 기능");
            /** 플로팅배너 탑으로 이동 임시 추가 */
            let samllNavTopBtn = $(".common-samll--top-btn");
            samllNavTopBtn.on('click', function(){
                $('html, body').animate({scrollTop: '0'}, 300);
            });


            if ($("html").attr("lang") == "ko" || $("html").attr("lang") == "en" || $("html").attr("lang") == "pt" || $("html").attr("lang") == "zh") {
                //if ($("html").attr("lang") == "ko" || $("html").attr("lang") == "en" && $("html#global").length != 0 || $("html").attr("lang") == "pt" || $("html").attr("lang") == "zh") {
                if (SDS_COMMON.currentWidth() < 1025) {
                    $("#footer .ftm a").attr({ 'role': 'button', 'aria-expanded': false });
                }
                $("#footer .ftm").on("click", function() {
                    if (SDS_COMMON.currentWidth() < 1025) {
                        $(this).toggleClass("on").next().slideToggle();
                        $(this).parent().siblings().find(".ftm").removeClass("on").next().slideUp();
                        $(this).parent().siblings().find(".ftm").children('a').attr('aria-expanded', 'false');
                        $(this).parent().parent().siblings().find(".ftm").removeClass("on").next().slideUp();
                        $(this).siblings(".fadeTom").removeClass("on").next("ul").slideUp();
                        if ($(this).hasClass('on')) {
                            $(this).children('a').attr({ 'aria-expanded': true })
                        } else {
                            $(this).children('a').attr({ 'aria-expanded': false })
                        }
                        return false;
                    };
                });
    
                /* 210623 : toggle CASE 추가 */
    
                $(".etc_lang, .etc_toggle").on("click", function() {
                    var _this = $(this);
                    $(this).toggleClass('on');
    
                    if ($(this).hasClass('etc_toggle')) {
                        $('.etc_menu').toggleClass("on");
                    }
    
                    /* 220325 | 접근성 | 언어 분기처리 후 컨트롤러 삽입 */
                    if ($(this).hasClass("on")) {
                        if ($("html").attr("lang") == "ko") {
                            $(this).find("> a").attr("title", "메뉴닫기");
                        } else {
                            $(this).find("> a").attr("title", "close");
                        }
                    } else {
                        if ($("html").attr("lang") == "ko") {
                            $(this).find("> a").attr("title", "메뉴열기");
                        } else {
                            $(this).find("> a").attr("title", "open");
                        }
                    }
                    /* //220325 | 접근성 | 언어 분기처리 후 컨트롤러 삽입 */
    
    
                    $(this).find(".sub_menu").toggle();
                    $(this).find(".sub_menu .btn_pop_close").on("click", function() {
                        setTimeout(function() {
                            _this.find("> a").attr("tabindex", 0).focus();
                            return;
                        }, 300);
                    });
                    /*
                    (SDS_COMMON.currentWidth() >= 1025) ? $(this).find(".sub_menu").toggle() : '';
                    (SDS_COMMON.currentWidth() < 1025) ? $("#header .hd_top .sub_menu").show() : '';
                    $(".sub_menu .em_sub_hd span").focus();
                    */
                    /* 210527 | 접근성 | IOS Focus Issue settimeout추가 */
                    setTimeout(function() {
                        (SDS_COMMON.currentWidth() < 1025) ? _this.find(".sub_menu .mb_inner .tit_s").attr("tabindex", 0).focus(): '';
                    }, 300);
                    /* //210527 | 접근성 | IOS Focus Issue settimeout추가 */
                    /* 210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                    if (SDS_COMMON.currentWidth() < 1025) {
                        var ariahidden = $('#skip_navi, header, #container, footer .inner > div:not(.f_etc), footer .f_etc > div:not(.f_etc_left), footer .f_etc_left > div:not(.on), footer .etc_lang > a, footer .etc_lang > a, footer .etc_toggle > a, footer .etc_menu .mark, footer .etc_menu > a, footer .f_etc_left > p');
    
                        if ($(this).hasClass("on")) {
                            $(this).find(".sub_menu").on("focusout", function(e) {
                                var $focusEl = $(e.delegateTarget).find("a,button,input,label,[tabindex=0]");
    
                                if (!$(e.delegateTarget).find(e.relatedTarget).length) {
                                    if ($(e.target).is($focusEl.first())) {
                                        $focusEl.last().focus();
                                    }
    
                                    if ($(e.target).is($focusEl.last())) {
                                        $focusEl.first().focus();
                                    }
                                }
                            })
                            ariahidden.attr({
                                "aria-hidden": true,
                                tabindex: -1
                            });
    
                        } else if (!$(this).hasClass("on")) {
                            ariahidden.removeAttr("tabindex");
                            ariahidden.removeAttr("aria-hidden");
                            /* 210527 | 접근성 | IOS Focus Issue settimeout추가 */
                            setTimeout(function() {
                                _this.find("> a").attr("tabindex", 0).focus();
                            }, 300);
                            /* //210527 | 접근성 | IOS Focus Issue settimeout추가 */
                        }
                    }
                    /* //210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
    
                });
    
                $(".etc_lang, .etc_toggle").on("mouseleave", function() {
                    $(this).removeClass('on');
                    (SDS_COMMON.currentWidth() >= 1025) ? $(this).find(".sub_menu").hide(): '';
                    /* 220325 | 접근성 | 언어 분기처리 후 컨트롤러 삽입 */
                    if ($("html").attr("lang") == "ko") {
                        $(this).find("> a").attr("title", "메뉴열기");
                    } else {
                        $(this).find("> a").attr("title", "open");
                    }
                    /* //220325 | 접근성 | 언어 분기처리 후 컨트롤러 삽입 */
                });
    
                $(".etc_lang, .etc_toggle").on("focusout", "a,button", function(e) {
                    var _this = $(this);
    
                    if ($(this).find(e.relatedTarget).length) return;
                    $(this).removeClass('on');
                    (SDS_COMMON.currentWidth() >= 1025) ? $(this).find(".sub_menu").hide(): $(this).find(".sub_menu .mb_inner").attr("tabindex", 0).focus();
                    /* 210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                    if (SDS_COMMON.currentWidth() < 1025 && $(this).hasClass("on")) {
                        var ariahidden = $('#skip_navi, header, #container, footer .inner > div:not(.f_etc), footer .f_etc > div:not(.f_etc_left), footer .f_etc_left > div:not(.on), footer .etc_lang > a, footer .etc_lang > a, footer .etc_toggle > a, footer .etc_menu .mark, footer .etc_menu > a, footer .f_etc_left > p');
    
                        ariahidden.removeAttr("tabindex");
                        ariahidden.removeAttr("aria-hidden");
                        /* 210527 | 접근성 | IOS Focus Issue settimeout추가 */
                        setTimeout(function() {
                            _this.find("> a").attr("tabindex", 0).focus();
                        }, 300);
                        /* //210527 | 접근성 | IOS Focus Issue settimeout추가 */
                    }
                    /* //210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
    
                    /* 220325 | 접근성 | 언어 분기처리 후 컨트롤러 삽입 */
                    if ($("html").attr("lang") == "ko") {
                        $(this).find("> a").attr("title", "메뉴열기");
                    } else {
                        $(this).find("> a").attr("title", "open");
                    }
                    /* //220325 | 접근성 | 언어 분기처리 후 컨트롤러 삽입 */
                });
    
                /* //210623 : toggle CASE 추가 */
                $(".etc_drop").on("click", function() {
                    $(this).toggleClass('on');
                    (SDS_COMMON.currentWidth() >= 1025) ? $(".etc_drop .in").toggle(): '';
                    /* 220325 | 접근성 | 속성변경 */
                    if ($(this).hasClass('on')) {
                        $(this).find('.ftm a').attr({ 'aria-expanded': true })
                    } else {
                        $(this).find('.ftm a').attr({ 'aria-expanded': false })
                    }
                    /* //220325 | 접근성 | 속성변경 */
                    $(".in .em_sub_hd span").focus();
                });
    
                $(".etc_drop").on("mouseleave", function() {
                    $(this).removeClass('on');
                    /*(SDS_COMMON.currentWidth() >= 1025) ? $(".etc_drop .in").hide() : ''; */
                    if (SDS_COMMON.currentWidth() >= 1025) {
                        $(".etc_drop .in").hide();
                        $(".etc_drop .ftm a").attr('aria-expanded', false);
                    };
                });
    
                $(".etc_drop").on("focusout", "a,button", function(e) {
                    if ($(".etc_drop").find(e.relatedTarget).length) return;
                    $(this).removeClass('on');
                    /*(SDS_COMMON.currentWidth() >= 1025) ? $(".etc_drop .in").hide() : '';*/
                    if (SDS_COMMON.currentWidth() >= 1025) {
                        $(".etc_drop .in").hide();
                        $(".etc_drop .ftm a").attr('aria-expanded', false);
                    }
                });
    
                //quick top
                $(".etc_top a").on("click", function() {
                    // $(window).scrollTop(0);
                    // $('#header .logo a').focus();
                    $('html, body').scrollTop(0);
                });
            } else {
                /* foot */
                if (SDS_COMMON.currentWidth() < 1025) {
                    $("#footer .ftm a").attr({ 'role': 'button', 'aria-expanded': false });
                }
                $("#footer .ftm").on("click", function() {
                    if (SDS_COMMON.currentWidth() < 1025) {
                        $(this).toggleClass("on").next().slideToggle();
                        $(this).parent().siblings().find(".ftm").removeClass("on").next().slideUp();
                        $(this).siblings(".fadeTom").removeClass("on").next("ul").slideUp();
                        if ($(this).hasClass('on')) {
                            $(this).children('a').attr({ 'aria-expanded': true })
                        } else {
                            $(this).children('a').attr({ 'aria-expanded': false })
                        }
                    };
                });
    
                $(".f_etc .etc2 a").on("click", function() {
                    (SDS_COMMON.currentWidth() >= 1025) ? $(".f_etc .etc2 .sub_menu").toggle(): '';
                    (SDS_COMMON.currentWidth() < 1025) ? $("#header .hd_top .sub_menu").show(): '';
                    $(".sub_menu .em_sub_hd span").focus();
                });
    
    
                $(".f_etc .etc2").on("mouseleave", function() {
                    $(".f_etc .etc2 .sub_menu").hide();
                });
    
                //quick top
                $(".quick_top .btn").on("click", function() {
                    $(window).scrollTop(0);
                    $('#header .logo a').focus();
                });
            }
        }
    }
