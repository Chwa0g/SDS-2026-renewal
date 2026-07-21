//20220411 KR,EN 웹접근성 비디오 새창열림 관련 분기
/*******************************************************************************
 * 파 일 명 : extension.js
 * 작 성 자 : ohy
 * 작 성 일 : 2016-09-02
 * 기    능 : interaction script
 ******************************************************************************/
var fileForm = {};

function UtilStr() {}

/**
 * set text ellipsis
 * @param el { jQuery } target jQuery element
 * @param ellipsisLimit { number } maximum length
 * @param ellipsisDot { string } dot text
 */

// ellipsisLimit start
UtilStr.prototype.setTextEllipsis = function(el, ellipsisLimit, ellipsisDot) {
    if (el === undefined || el === null || el.length === 0) { return; }
    var dot = ellipsisDot || '...';
    $.each(el, function(i, d) {
        var targetEl = $(d);
        var t = targetEl.html().trim();
        var l = t.length;
        var limit = ellipsisLimit || l;
        var res = t;
        if (l > 0 && l > limit) {
            var ellipsisVal = t.slice(0, limit);
            if (ellipsisVal[limit - 1] === ' ') { // last blank
                res = ellipsisVal.trim() + dot;
            } else {
                var slicedVal = t.slice(limit, l);
                if (slicedVal[0] === ' ') { // next blank
                    res = ellipsisVal + dot;
                } else { // doesn't have blank.
                    var arrWords = ellipsisVal.split(' ');
                    arrWords.pop();
                    res = arrWords.join(' ').trim() + dot;
                }
            }
        }

        if (targetEl.find("a").length) {
            targetEl.find("a").html(res);
        } else {
            targetEl.html(res);
        }
    })
};
// ellipsisLimit end


$(function() {
    var $extension_container = $('#container');
    // jquery start
    // ellipsisLimit start
    {
        var utilStr = new UtilStr();
        utilStr.setTextEllipsis($('.box_img.type1 .txt'), 250, '...');
        utilStr.setTextEllipsis($('.box_img.type3 .txt'), 310, '...');
        utilStr.setTextEllipsis($('.ul_im2 li .txt a'), 292, '...');
        utilStr.setTextEllipsis($('.ul_im3 li .txt a'), 292, '...');
        utilStr.setTextEllipsis($('.vod_box .vod_txt .txt'), 292, '...');
        utilStr.setTextEllipsis($('.use .item .txt a'), 200, '...');
        utilStr.setTextEllipsis($('.event_list .txt, .ul_atc .sum'), 216, '...');
        utilStr.setTextEllipsis($('.key_atc .sum'), 200, '...');
        utilStr.setTextEllipsis($('.ul_atc .sum_k'), 215, '...');
        utilStr.setTextEllipsis($('.ul_atc .sum_g'), 236, '...');
        utilStr.setTextEllipsis($('.ul_atc .sum_ev'), 380, '...');
        utilStr.setTextEllipsis($('.ul_atc .sum_ev_k'), 280, '...');
        utilStr.setTextEllipsis($('.ul_atc .sum_ev_c'), 190, '...');
        utilStr.setTextEllipsis($('.ul_atc .sum3'), 90, '...');
        utilStr.setTextEllipsis($('.thank.type1 .list .ul_insi li .text .h6'), 165, '...');
    }
    // ellipsisLimit end


    /* lang quarter */
    /* 17.02.23 */
    /* 한글 중문 영문 분기처리함수입니다. */
    /* lang_quarter('한글값','중문값','영문값') 방식으로 사용하시면 됩니다. */
    function lang_quarter(ko, zh, gl) {
        var result;
        if ($("html").attr("lang") == "ko") {
            result = ko;
        } else if ($("html").attr("lang") == "zh") {
            result = zh;
        } else {
            result = gl;
        }
        return result;
    }

    var _timeoutUse = false;
    var _timeoutUseSwiper = false;

    function _getOuterHeight(el) {
        return el !== undefined && el.length > 0 ? el.outerHeight(true) : 0
    }

    function _setUseCaseHeightMaximum() {
        var el = $('.use');

        el.each(function() {
            var elText = $(this).find('.text');
            var maxHeight = -9999;

            elText.each(function() {
                var elInner = $(this);
                elInner.find('.btn_btm').addClass('pos');
                var h1 = _getOuterHeight(elInner.find('.h6'));
                var h2 = _getOuterHeight(elInner.find('.txt'));
                var btn_1 = _getOuterHeight(elInner.find('.btn_btm').eq(0));
                var btn_2 = _getOuterHeight(elInner.find('.btn_btm').eq(1));
                var h = h1 + h2 + btn_1 + btn_2;
                if (maxHeight < h) {
                    maxHeight = h;
                }
            });

            elText.css('height', maxHeight);
        });

    }

    function doUseCaseHeightMaximum() {
        _timeoutUse && clearTimeout(_timeoutUse);
        _timeoutUse = setTimeout(_setUseCaseHeightMaximum, 0);
    }

    function _setUseSwiperCaseHeightMaximum() {
        var el = $('.use_swiper');

        el.each(function() {
            var elText = $(this).find('.text');
            var maxHeight = -9999;

            elText.each(function() {
                var elInner = $(this);
                elInner.find('.btn_btm').addClass('pos');
                var h1 = _getOuterHeight(elInner.find('.h6'));
                var h2 = _getOuterHeight(elInner.find('.txt'));
                var btn_1 = _getOuterHeight(elInner.find('.btn_btm').eq(0));
                var btn_2 = _getOuterHeight(elInner.find('.btn_btm').eq(1));
                var h = h1 + h2 + btn_1 + btn_2;
                if (maxHeight < h) {
                    maxHeight = h;
                }
            });

            elText.css('height', maxHeight);
        });

    }

    function doUseSwiperCaseHeightMaximum() {
        _timeoutUseSwiper && clearTimeout(_timeoutUseSwiper);
        _timeoutUseSwiper = setTimeout(_setUseSwiperCaseHeightMaximum, 0);
    }
    //
    function adjustStyle(width) {
        if (SDS_COMMON.currentWidth() > 1024) {
            $("html").addClass("view-w").removeClass("view-m").removeClass("view-t");
        } else if (SDS_COMMON.currentWidth() >= 768) {
            $("html").attr("class", "view-t");
        } else if (SDS_COMMON.currentWidth() < 768) {
            $("html").attr("class", "view-m");
        }
    }
    //1120 추가
    function closeSearch() {
        $("#header").removeClass("fixed");
        $(".form_key, .sch_ipt").hide();
        $(".btn.sch").removeClass("on");
        $(".right > .btn.sch").text(lang_quarter('찾기', 'search', 'search'));
    }

    function closeMylist() {
        $(".mylist, .mylist_trigger").removeClass("on");
    }

    $(window).on("load", function() { adjustStyle($(this).width()); }).resize(function() { adjustStyle($(this).width()); });


    /* ***** 헤더 삽입 시작 ***** */
    /*TO-BE*/
    var host= "";
    if(window.location.hostname.includes("70.225.30.31")) host = "http://70.225.30.31:8001";


    $.get(host+"/kr/layout/header.html?queryString=20241016010700", function(data) {
        $('#header .M00_A').html(data);
        //header 로드후 GNB 기능 생성
        window.GNB = new M00_A($('#header .M00_A'));
        var root = window.location.pathname.split('/')[1];
        if (root == 'kr' || root == 'en') {
            //initOfferingPage();
        }

    });


    // Conatct 모듈 url, floating btn contact url merge
    function getContactUrl() {
        var $url = $('.M10_A .md_btn button').attr('onClick');
        var target = 'window.location.href=';
        var $result = $('.float-section a.b1').attr('href');

        if ($url !== undefined) {
            $result = $url.slice($url.indexOf(target) + target.length);
            $result = $result.slice(1, $result.length - 1);
        }

        return $('.float-section a.b1').attr('href', $result);
    }





    //플로팅 버튼 삽입 시작
    if($("html").attr("lang") == "ko"){
        $.get(host+'/kr/layout/floating-action.html', function(data) {
            $('#container').append(data);
           // createSamllNav();
        });
    } else {
        $.get(host+'/kr/layout/floating-action.html', function(data) {
            // test 페이지 에서만..
            // if (window.location.pathname.indexOf("/test2") > -1) {
            //     return;
            // }
            $('#wrap').append(data); //풀페이지 용, 수정
            // $('#container').append(data);
    
            $(".floating-default").remove(); //리뉴얼 전 플로팅배너 container영역..정상 확인후 삭제해도 됨
    
            $('.floating_action').addClass('on');
            setTimeout(function() {
                $('.floating_action').removeClass('on');
            }, 5000);
    
            $('.floating_action ul li a').on("mouseover focusin", function() {
                $('.floating_action').addClass('on');
            });
            $('.floating_action ul li a').on('mouseleave focusout', function() {
                $('.floating_action').removeClass('on');
            });
    
            /* Floating Action Button : 20.12.30 소스취합 extenstion_ko.js 로 이동 */
            $(window).scroll(function() {
                scrollEvent();
            });
    
            $(window).resize(function() {
                scrollEvent();
            });
    
            function scrollEvent() {
                var scrollEnd = ($(document).height() - $(window).height()) - $('footer').innerHeight();
    
                if ($(window).scrollTop() >= scrollEnd) {
                    $(".float-section.renew").addClass("act");
                } else {
                    $(".float-section.renew").removeClass("act");
                }
            }
        });
    }

    // 우측 floating nav
    function createSamllNav() {
        if($extension_container.next('.footer_v1').length === 0) return;
        console.log("footer_v1 클래스 여부")
        let smallNav = $extension_container.find(".small-nav");
        // console.log("loation", $extension_container.find('.small-nav'));
        // let target = mainBx.find(".common-banner-bx");
        let target =  $extension_container.next('#footer').find(".common-bottom-menu-bx");
        let w = $(window);

        function scrollListener($e) {
            const rect = target[0].getBoundingClientRect();
            const tt = w.height() - rect.top - rect.height;

            smallNav.css("position", tt > 0 ? "relative" : "fixed");
        }

        window.addEventListener("scroll", scrollListener);
        scrollListener(null);
    }

    // footer
    function createFooter() {
        /** top 버튼 #링크로 수정(gsap 기능 삭제 기능 삭제) */
        let footer = $(".common-footer");
        let footerTopBtn = footer.find(".footer-btn--top").find("button");
        let samllNavTopBtn = $(".common-samll--top-btn");
        function btnTopClick() {
            $('html, body').animate({scrollTop: '0'}, 300);
        }

        footerTopBtn.on("click", btnTopClick);
        samllNavTopBtn.on("click", btnTopClick);

        let isShowInfo = false;
        function footerInfoBtnClick() {
            isShowInfo = !isShowInfo;
        
            if (isShowInfo) {
                $(".footer-info--menu-bx").css("display", "block");
            } else {
                $(".footer-info--menu-bx").css("display", "none");
            }
        }
        
        function footerInfoBtnLeave() {
            isShowInfo = false;
            $(".footer-info--menu-bx").css("display", "none");
            $(".footer-info-btn")[0].blur();
        }
        
        $(".footer-info-btn").on("click", footerInfoBtnClick);
        $(".footer-info-btn--bx").on("mouseleave", footerInfoBtnLeave);
        
        let isShowFamily = false;
        
        function footerFamilyBtnClick() {
            isShowFamily = !isShowFamily;
        
            if (isShowFamily) {
                $(".family-menus-bx").css("display", "block");
            } else {
                $(".family-menus-bx").css("display", "none");
            }
        }

        function footerFamilyBtnLeave() {
            isShowFamily = false;
            $(".family-menus-bx").css("display", "none");
            $(".bottom-menu__right-family--btn")[0].blur();
        }
        
        // console.log("푸터버튼", $(".bottom-menu__right-family--btn"));

        $(".bottom-menu__right-family--btn").on("click", footerFamilyBtnClick);
        $(".bottom-menu__right-family").on("mouseleave", footerFamilyBtnLeave);


        let isLanguage = false;

        function languageClick() {
            isLanguage = !isLanguage;

            if (isLanguage) {
                $(".language-menus").css("display", "block");
            } else {
                $(".language-menus").css("display", "none");
            }
        }

        function languageLevel() {
            isLanguage = false;

            $(".language-menus").css("display", "none");
            $(".language-bx--btn")[0].blur();
        }

        $(".language-bx--btn").on("click", languageClick);
        $(".language-bx").on("mouseleave", languageLevel);
    }
    //플로팅 버튼 삽입 끝



    //헤더 삽입 시작
    /*AS-IS*/
    // 푸터 삽입 시작
    $.get(host+"/kr/layout/footer.html?queryString=20241016010700", function(data) {
        $("#footer").html(data);
        footerInit();
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
            /** //플로팅배너 탑으로 이동 임시 추가 */

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



    /* ***** 헤더 삽입 시작 ***** */
    // $('#header2').load("../layout/header2.html", function() {
    //
    // });

    // 푸터 삽입 시작
    // $("#footer2").load("../layout/footer2.html", function() {
    //
    // });

    /* top sch */
    $(window).on("click", function(e) {
        var $target = $(e.target);
        if (!$target.closest(".sch_ipt").length && !$target.is(".btn.sch") && !$target.parents(".mylist").hasClass("mylist") && SDS_COMMON.currentWidth() > 1024) {
            $(".form_key, .sch_ipt").hide();
            $(".btn.sch").removeClass("on");
            $(".right > .btn.sch").text(lang_quarter('찾기', 'search', 'search'));

            // 1120 추가
            if ($(".mylist").hasClass("on")) {
                var $mylist = $(".mylist");
                $mylist.removeClass("on");
            }


        }
        if ($(".fix_m").length && !$target.is(".sel")) {
            $(".cnt_menu .left ul").removeClass("dpt");
            $(".cnt_menu .left .sel").removeClass("on");
        }
    });

    /* hero visual */
    $(".hero").each(function() {
        var self = this;
        var num = $(".hero .item").length; /* num = item 갯수 */
        var owl = $(".hero"); /* 카루셀 영역 */

        if (num > 1) { /* 아이템 2개이상 (컨트롤러 노출) */

            var isTranslate = false;


            owl.owlCarousel({ /* 플러그인 재생규칙 선언 */
                nav: false,
                items: 1
            });

            /* 언어 분기처리 후 컨트롤러 삽입 */
            if ($("html").attr("lang") == "ko") {
                $(this).parents('.hero_vb').append('<div class="controls"><button class="play">재생</button><button class="stop">멈춤</button></div>')
            } else {
                $(this).parents('.hero_vb').append('<div class="controls"><button class="play">play</button><button class="stop">stop</button></div>')
            }
            /* 컨트롤러 위치 조정 */
            $(this).siblings('.controls').css('margin-left', (num * 10 + 7))

            /* 카루셀 동작 스크립트 */
            var target = 0; /* 첫 페이지 */
            var current = 0; /* 현재 페이지 */

            $(self).find('.owl-item.active').attr('aria-hidden', 'false').find('a,button').attr('tabindex', '0');
            $(self).find('.owl-item.active').siblings().attr('aria-hidden', 'true').find('a,button').attr('tabindex', '-1');

            owl_outoplay(); /* 스크립트 시작과 함께 실행 */
            function owl_outoplay(argument) {
                setTimeout(function() {
                    if (!owl.hasClass('stop')) {
                        if (current < num - 1) { /* 끝에 도달하기 전까지 페이지 1씩 추가 */
                            current++;
                        } else { /* 끝에 도달하면 첫 페이지 이동 */
                            current = 0;
                        }
                        owl.trigger('to.owl.carousel', current); /* 해당 페이지로 이동 */
                    }
                    owl_outoplay(); /* 재귀함수로 반복 */
                }, 11000);
            }

            owl.on('changed.owl.carousel', function(e) { /* 카루셀 동작시 내부 스크립트 구동 */
                current = e.item.index; /* 현재 번호 선언 후 삽입 */
                isTranslate = false;
            });

            owl.on('translate.owl.carousel', function(e) {
                isTranslate = true;
            });

            owl.on('translated.owl.carousel', function(e) {
                isTranslate = false;
                $(e.target).find('.owl-item.active').attr('aria-hidden', 'false').find('a,button').attr('tabindex', '0');
                $(e.target).find('.owl-item.active').siblings().attr('aria-hidden', 'true').find('a,button').attr('tabindex', '-1');
            });

            /* 재생,멈춤 버튼 통제 */
            $('.stop').on('click', function(e) {
                owl.addClass('stop');
                $(self).siblings('.controls').children('.play').focus();
            })
            $('.play').on('click', function(e) {
                owl.removeClass('stop');
                $(self).siblings('.controls').children('.stop').focus();
            })
            $(this).siblings('.controls').children('.stop').on('click', function(e) {
                $(this).hide().siblings().show();
                $(self).siblings('.controls').children('.play').focus();
            })
            $(this).siblings('.controls').children('.play').on('click', function() {
                $(this).hide().siblings().show();
                $(self).siblings('.controls').children('.stop').focus();
            })

            $('.hero .owl-dot .ind').on('click', function(e) {
                owl.addClass('stop');
                $(self).siblings('.controls').children('.stop').hide().siblings().show();
            })
            $('.hero .owl-dot .ind').on('click', function(e) {
                owl.addClass('stop');
                $(self).siblings('.controls').children('.stop').hide().siblings().show();
            })

            var currOwlIdx = 0;

        } else if (num == 1) { /* 아이템 1개일때는 (컨트롤러 숨김) */
            owl.trigger('destroy.owl.carousel').addClass("none");
        }
    });



    $(".ul_txt2").each(function() {
        var num = $(this).find("li").length;
        if (num >= 4) {
            $(this).addClass("even");
        }
    });

    $(".ul_txt4").each(function() {
        var num = $(this).children("li").length;

        if (num == 2) {
            $(this).addClass("two");
        } else if (num >= 3) {
            $(this).addClass("dozen");
        }
    });

    //쿠키 팝업 닫기
    $('.wrap_cookie .btn_close').click(function() {
        $('.wrap_cookie').animate({ 'height': '0' }, 300);
        if ($("html").hasClass("view-w")) {
            $(".mylist").animate({ 'top': '85' }, 300, function() { $(".mylist").css('top', '') });
        }
        $(".mylist").removeClass('hasCookie');
    })

    // 공지 닫기
    $('.layer_notice .btn_close').click(function() {
        $('.layer_notice').hide();
    })


    /* ***** common ***** */
    $(document).on("click", "a[href='#'], a[href='#none']", function(e) { e.preventDefault(); });

    $(".bn_ul").each(function() {
        var num = $(this).find("li").length;

        if (num == 3) { $(this).addClass("three"); }

    });

    $(".part_ul").each(function() {
        var num = $(this).find(".item").length,
            $owl = $(this);

        if (SDS_COMMON.currentWidth() < 768) {
            $(this).owlCarousel({
                margin: 0,
                loop: true,
                nav: true,
                items: 1
            });
        }
    });


    /* use case */
    $(".use").each(function(e, use) {
        var num = $(this).find(".item").length,
            $owl = $(this);

        if (SDS_COMMON.currentWidth() < 768) {
            if (num >= 4) {
                $(this).addClass("roll");
            } else if (1 == num) {
                $(this).addClass("one");
            } else if (2 == num) {
                $(this).addClass("two");
            } else if (3 == num) {
                $(this).addClass("none");
            }

            $(".use.two, .use.none, .use.roll").owlCarousel({
                margin: 0,
                loop: true,
                nav: true,
                center: true,
                autoplay: false,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2, stagePadding: 100 },
                    1500: { items: 2, stagePadding: 200 },
                    1840: { items: 2, stagePadding: 280 }
                }
            });
            // mobile Accessibility
            $('.owl-item.cloned').attr('aria-hidden', true);
        } else if (SDS_COMMON.currentWidth() >= 768) {
            if (num >= 4) {
                $(this).addClass("roll");
            } else if (1 == num) {
                $(this).addClass("one");
            } else if (2 == num) {
                $(this).addClass("two");
            } else if (3 == num) {
                $(this).addClass("none");
            }

            var use_carousel = $(".use.roll").owlCarousel({
                margin: 0,
                loop: true,
                nav: true,
                center: true,
                autoplay: false,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2, stagePadding: 100 },
                    1500: { items: 2, stagePadding: 200 },
                    1840: { items: 2, stagePadding: 280 }
                }
            });

            /* carousel */
            $owl.find(".active.center").addClass("on").find(".text .btn_owl").css("opacity", 1);

            /* Acessiblity show when focused
            $owl.find(".owl-item").focusin(function(){
        $(this).find('.text').css("opacity",1);
    })
    $owl.find(".owl-item").focusout(function(){
        if($(this).hasClass('active center')){
            $(this).addClass("on").find(".text").css("opacity",1)
        }else{
            $(this).find('.text').css("opacity",0);
        }
    })
    */

            use_carousel.on('translate.owl.carousel', function(event) {
                $owl.find(".owl-item").removeClass("on");
            });

            use_carousel.on('translated.owl.carousel', function(event) {

                if ($owl.find(".cloned.active.center").length) {
                    var src = $(".ul_owl").find(".cloned.active.center img").attr("src");
                    $owl.find(".owl-item").each(function() {
                        var isrc = $(this).find("img").attr("src");
                        if (src == isrc) {
                            $owl.find(".owl-item .text .btn_owl").css("opacity", "");
                            $(this).addClass("on").find(".text .btn_owl").animate({ 'opacity': 1 }, 200)
                        }
                    });
                } else {
                    $owl.find(".owl-item .text .btn_owl").css("opacity", "");
                    $owl.find(".active.center").addClass("on").find(".text .btn_owl").animate({ 'opacity': 1 }, 200);
                }

            });

            use_carousel.on('refresh.owl.carousel', function(event) {
                $owl.find(".active.center").addClass("on");
            });

            use_carousel.on('resized.owl.carousel', function(event) {
                $owl.find(".owl-item").removeClass("on");
                $owl.find(".active.center").addClass("on");
            });

            $owl.on("click", ".owl-item", function() {
                if ($(this).next().hasClass("center")) {
                    $owl.find(".owl-prev").trigger("click");

                } else if ($(this).prev().hasClass("center")) {
                    $owl.find(".owl-next").trigger("click");
                }
            });
        }
    });
    $(".cnt_menu .sel").attr({ 'id': 'cnt_menu_control', 'role': 'button', 'aria-expanded': false, 'aria-controls': 'cnt_menu_list' });
    $(".cnt_menu .sel").siblings('ul').attr({ 'id': 'cnt_menu_list', 'role': 'menu', 'aria-labelledby': 'cnt_menu_control' });
    $('#cnt_menu_list a').attr({ 'role': 'menuitem' });
    $(".cnt_menu a ").on("click", function() {
        if (SDS_COMMON.currentWidth() <= 1024) {
            $(this).parent().removeClass("on");
            $(".cnt_menu .sel").toggleClass("on");
            $(".cnt_menu ul").toggleClass("dpt");
            if ($(this).hasClass('on')) {
                $(".cnt_menu .sel").attr({ 'aria-expanded': true })
            } else {
                $(".cnt_menu .sel").attr({ 'aria-expanded': false })
            }
        }
    });

    $(".certi").addClass("ptn");

    $(".slideDown .btn_btm.show .btn").on("click", function() {
        if ($(this).parent().hasClass("on")) {
            $(this).parents(".slideDown").find(".inner").slideUp();
            $(this).parent().removeClass("on");
            $(this).parents(".slideDown").next(".certi").addClass("ptn");
        } else {
            $(this).parents(".slideDown").find(".inner").slideDown();
            $(this).parent().addClass("on").parent().attr('tabindex', 0).focus();
            $(this).parents(".slideDown").next(".certi").removeClass("ptn");
        }
    });

    $(".slideDown .btn_btm.more .btn").on("click", function() {
        if ($(this).parent().hasClass("on")) {
            $(this).parents(".slideDown").find(".feat_more").slideUp();
            $(this).parent().removeClass("on");
            $(this).parents(".slideDown").next(".certi").addClass("ptn");
        } else {
            $(this).parents(".slideDown").find(".feat_more").slideDown();
            $(this).parent().addClass("on");
            $(this).parents(".slideDown").next(".certi").removeClass("ptn");
        }
    });

    (function() {
        showMoreList($('.irEventList.ul_list'));
    })();

    /* showMoreList */
    function showMoreList(list, getNum) {
        var showList = list || $('.showMoreList');
        var num = typeof(getNum) == 'number' ? getNum : 4;

        if (showList.length) {
            showList.each(function() {
                var _this = $(this);
                var li = _this.find('.showMoreList_item');
                var len = li.length;
                var btn = _this.parent().find('.show_btn');
                var wrapper = btn.parent();

                hideList();
                btn.on('click', function() {
                    if (wrapper.hasClass('on')) {
                        hideList();
                        wrapper.removeClass('on');
                    } else {
                        li.show();
                        wrapper.addClass('on');
                        li.eq(num).attr('tabindex', 0).focus();
                    }
                });

                function hideList() {
                    btn.hide();
                    if (len > num) {
                        btn.show();
                        for (var i = num; i < len; i++) {
                            li.eq(i).hide();
                        }
                    }
                }
            });
        }
    }

    /* box scroll fix */
    $(".b_scroll .scroll").each(function(e) {
        var _fixm = $(".b_scroll .scroll"),
            _fixmOffset = _fixm.position(),
            _fixmHeight = $(".b_scroll .scroll").outerHeight(),
            _fixId,
            _aItems = _fixm.parent().find("a"),
            _scrollItems = _aItems.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            }),
            _item = $("b_scroll li").length;

        $(".b_scroll .dots:first-child").addClass("on");

        _aItems.on("click", function() {
            var val = $(this).attr("href");
            $(this).addClass("on").siblings().removeClass("on");
            $(".b_scroll .scroll").animate({ scrollTop: ($(val).position().top) });
            return false;
        });

        $(".b_scroll .scroll").on("scroll", function() {
            var _fixTop = $(this).scrollTop() + _fixmHeight,
                _fixmn = _scrollItems.map(function() {
                    if ($(this).position().top < _fixTop)
                        return this;
                });
            _fixmn = _fixmn[_fixmn.length - 1];
            var id = _fixmn && _fixmn.length ? _fixmn[0].id : "";
            if (_fixId !== id) {
                //_aItems.siblings().removeClass("on").end().filter("[href='#"+id+"']").addClass("on");
                $("[href='#" + id + "']").addClass("on").siblings().removeClass("on");
            }
        });

        $(".b_scroll .scroll").on("mouseenter", function() {
            var _fixm = $(".b_scroll"),
                _fixmOffset = _fixm.position().top;
            co

            var forceWindowScrollY = -1;

            if (forceWindowScrollY == -1) {
                forceWindowScrollY = $(window).scrollTop();
            }
        }, function() {
            forceWindowScrollY = -1;
        }).on("mouseleave", function() { forceWindowScrollY = -1; });

    });

    //cer start
    $(".ul_txt2_2").each(function() {
        var num = $(this).find("li").length;
        (num > 3) ? $(this).addClass("four"): '';

    });
    //cer end

    //monia start
    $(".monial").each(function() {
        var num = $(this).find(".item").length;
        if (num > 1) {
            $(".monial").owlCarousel({
                margin: 0,
                loop: true,
                nav: true,
                dots: true,
                items: 1
            });
        } else {
            $(this).removeClass("monial");
        }
    });
    //monia end


    // offeringSlide start
    if ($(".offeringSlide").length) {
        $(".offeringSlide").each(function(index) {
            var focusableEl = 'a, select, button, textarea, input, area';
            var isLoop = $(this).hasClass('loop');
            var isResistance = !$(this).hasClass('smooth_control');
            var $this = $(this);
            $this.addClass("instance-" + index);
            var offeringSlide_title = [];
            var textView = false;
            var nowIndex = 0;

            if (SDS_COMMON.currentWidth() >= 768) {
                var nowViewSize = true;
            } else {
                var nowViewSize = false;
            }

            $this.find('.swiper-slide').each(function(index) {
                var $this_slide = $(this);
                if ($this_slide.attr('data-title')) {
                    offeringSlide_title.push($this_slide.attr('data-title'));
                    textView = true;
                } else {
                    offeringSlide_title.push(index);
                }
            });

            function newSwiper(input_direction, _nowIndex) { // swiper생성
                $this.mySwiper = new Swiper('.offeringSlide.instance-' + index + ' .swiper-container', {
                    pagination: '.swiper-pagination',
                    direction: input_direction, //'vertical', 'horizontal'
                    initialSlide: _nowIndex,
                    slidesPerView: 1,
                    paginationClickable: true,
                    resistance: isResistance,
                    mousewheelControl: true,
                    mousewheelReleaseOnEdges: true,
                    touchReleaseOnEdges: true,
                    paginationElement: 'a href',
                    onInit: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            if ($(swiper.slides).eq(i).hasClass('swiper-slide-active')) {
                                $(swiper.slides).eq(i).attr({ 'aria-hidden': 'false' }).find(focusableEl).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                            } else {
                                $(swiper.slides).eq(i).attr({ 'aria-hidden': 'true' }).find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                            }
                        }
                    },
                    paginationBulletRender: function(swiper, index) {
                        return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>'
                    },
                    onSlideChangeStart: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            if ($(swiper.slides).eq(i).hasClass('swiper-slide-active')) {
                                $(swiper.slides).eq(i).attr({ 'aria-hidden': 'false' }).find(focusableEl).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                            } else {
                                $(swiper.slides).eq(i).attr({ 'aria-hidden': 'true' }).find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                            }
                        }
                    }
                });
                if (textView) {
                    $this.find('.swiper-pagination-bullets').addClass('is_viewText');
                }
                if ($this.find('.swiper-pagination-bullet').length <= 1) {
                    $this.addClass('nonePagination');
                }
            };
            if (SDS_COMMON.currentWidth() >= 768) {
                newSwiper('vertical', nowIndex);
            } else {
                newSwiper('horizontal', nowIndex);
            }

            function destroySwiper() { // swiper제거
                $this.mySwiper.destroy(true, true);
            };

            $(window).on("resize", function() {
                if (SDS_COMMON.currentWidth() >= 768) {
                    if (nowViewSize == false) {
                        destroySwiper();
                        newSwiper('vertical', $this.mySwiper.activeIndex);
                        nowViewSize = true;
                    }
                } else {
                    if (nowViewSize == true) {
                        destroySwiper();
                        newSwiper('horizontal', $this.mySwiper.activeIndex);
                        nowViewSize = false;
                    }
                }
            });

        });
    }
    // offeringSlide end


    // offeringSlideImage start
    if ($(".offeringSlideImage").length) {
        $(".offeringSlideImage").each(function(index) {
            var focusableEl = 'a, select, button, textarea, input, area';
            var isLoop = $(this).hasClass('loop');
            var isResistance = !$(this).hasClass('smooth_control');
            var $this = $(this);
            $this.addClass("instance-" + index);
            var offeringSlideImage_title = [];
            var textView = false;
            var nowIndex = 0;

            if (SDS_COMMON.currentWidth() >= 768) {
                var nowViewSize = true;
            } else {
                var nowViewSize = false;
            }

            $this.find('.swiper-slide').each(function(index) {
                var $this_slide = $(this);
                if ($this_slide.attr('data-title')) {
                    offeringSlideImage_title.push($this_slide.attr('data-title'));
                    textView = true;
                } else {
                    offeringSlideImage_title.push(index);
                }
            });

            function newSwiper(input_direction, _nowIndex) { // swiper생성
                $this.mySwiper = new Swiper('.offeringSlideImage.instance-' + index + ' .swiper-container', {
                    pagination: '.swiper-pagination',
                    direction: input_direction, //'vertical', 'horizontal'
                    initialSlide: _nowIndex,
                    slidesPerView: 1,
                    paginationClickable: true,
                    resistance: isResistance,
                    mousewheelControl: true,
                    mousewheelReleaseOnEdges: true,
                    touchReleaseOnEdges: true,
                    paginationElement: 'a href',
                    onInit: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            if ($(swiper.slides).eq(i).hasClass('swiper-slide-active')) {
                                $(swiper.slides).eq(i).attr({ 'aria-hidden': 'false' }).find(focusableEl).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                            } else {
                                $(swiper.slides).eq(i).attr({ 'aria-hidden': 'true' }).find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                            }
                        }
                    },
                    paginationBulletRender: function(swiper, index) {
                        return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + offeringSlideImage_title[index] + '</a>'
                    },
                    onSlideChangeStart: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            if ($(swiper.slides).eq(i).hasClass('swiper-slide-active')) {
                                $(swiper.slides).eq(i).attr({ 'aria-hidden': 'false' }).find(focusableEl).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                            } else {
                                $(swiper.slides).eq(i).attr({ 'aria-hidden': 'true' }).find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                            }
                        }
                    }
                });
                if (textView) {
                    $this.find('.swiper-pagination-bullets').addClass('is_viewText');
                }
                if ($this.find('.swiper-pagination-bullet').length <= 1) {
                    $this.addClass('nonePagination');
                }
                $this.find('.swiper-slide').each(function(index) {
                    var $this_slide = $(this);
                    if ($this_slide.attr('data-imgurl')) {
                        if (SDS_COMMON.currentWidth() >= 768) {
                            $this_slide.css('background-image', 'url(' + $this_slide.attr('data-imgurl') + ')');
                        } else {
                            if ($this_slide.attr('data-imgurl').split('_w.').length > 1) {
                                $this_slide.css('background-image', 'url(' + $this_slide.attr('data-imgurl').split('_w.')[0] + '_m.' + $this_slide.attr('data-imgurl').split('_w.')[1] + ')');
                            }
                        }
                    }
                });
            };
            if (SDS_COMMON.currentWidth() >= 768) {
                newSwiper('vertical', nowIndex);
            } else {
                newSwiper('horizontal', nowIndex);
            }

            function destroySwiper() { // swiper제거
                $this.mySwiper.destroy(true, true);
            };

            $(window).on("resize", function() {
                if (SDS_COMMON.currentWidth() >= 768) {
                    if (nowViewSize == false) {
                        destroySwiper();
                        newSwiper('vertical', $this.mySwiper.activeIndex);
                        nowViewSize = true;
                    }
                } else {
                    if (nowViewSize == true) {
                        destroySwiper();
                        newSwiper('horizontal', $this.mySwiper.activeIndex);
                        nowViewSize = false;
                    }
                }
            });

        });
    }
    // offeringSlideImage end


    // Benefits slide
    $(".ben_slide").each(function(index) {
        var focusableEl = 'a, select, button, textarea, input, area';
        if ($(this).length) {
            var isLoop = $(this).hasClass('loop');
            var isResistance = !$(this).hasClass('smooth_control');
            var $this = $(this);
            $this.addClass("instance-" + index);

            function setAccessibility() {
                var swiperSlide = $('.ben_slide.instance-' + index + ' .swiper-container').find('.swiper-slide, .swiper-slide-duplicate, .swiper-slide-active, .swiper-slide-duplicate-active');
                swiperSlide.each(function() {
                    var slide = $(this);
                    if (slide.is('.swiper-slide-active, .swiper-slide-duplicate-active')) {
                        slide.attr('aria-hidden', 'false');
                    } else {
                        slide.attr('aria-hidden', 'true');
                    }
                });
            }
            var mySwiper = new Swiper('.ben_slide.instance-' + index + ' .swiper-container', {
                pagination: '.swiper-pagination',
                direction: 'vertical',
                slidesPerView: 1,
                paginationClickable: true,
                loop: isLoop,
                resistance: isResistance,
                mousewheelControl: true,
                mousewheelReleaseOnEdges: true,
                touchReleaseOnEdges: true,
                paginationElement: 'a href',
                onSlideChangeStart: function(swiper) {
                    setAccessibility();
                },
                onResize: function() {
                    setPaginateHeight('.swiper-pagination');
                },
                onPaginationRendered: function(swiper, paginationContainer, index) {
                    setPaginateHeight(paginationContainer);
                },
                paginationBulletRender: function(swiper, index) {
                    return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>'
                }
            })

            function setPaginateHeight(paginationContainer) {
                var targetHeight = SDS_COMMON.currentWidth() > 767 ?
                    'auto' :
                    $('.ben_slide .swiper-container').height();
                $(paginationContainer).height(targetHeight);
            }
            setAccessibility();
        }
    });

    // Benefits slide
    $(".ben_slide_horizon").each(function(index) {
        var focusableEl = 'a, select, button, textarea, input, area';
        if ($(this).length) {
            var $this = $(this);
            $this.addClass("instance-" + index);
            var isLoop = $(this).hasClass('loop');
            var isResistance = !$(this).hasClass('smooth_control');

            var mySwiper = new Swiper('.ben_slide_horizon.instance-' + index + ' .swiper-container', {
                pagination: '.swiper-pagination',
                loop: isLoop,
                resistance: isResistance,
                direction: 'horizontal',
                slidesPerView: 1,
                paginationClickable: true,
                // mousewheelControl: true,
                mousewheelReleaseOnEdges: true,
                touchReleaseOnEdges: true,
                paginationElement: 'a href',
                onInit: function(swiper) {
                    for (var i = 0; i < swiper.slides.length; i++) {
                        if ($(swiper.slides).eq(i).hasClass('swiper-slide-active')) {
                            $(swiper.slides).eq(i).attr({ 'aria-hidden': 'false' }).find(focusableEl).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                        } else {
                            $(swiper.slides).eq(i).attr({ 'aria-hidden': 'true' }).find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                        }
                    }
                },
                onSlideChangeStart: function(swiper) {
                    for (var i = 0; i < swiper.slides.length; i++) {
                        if ($(swiper.slides).eq(i).hasClass('swiper-slide-active')) {
                            $(swiper.slides).eq(i).attr({ 'aria-hidden': 'false' }).find(focusableEl).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                        } else {
                            $(swiper.slides).eq(i).attr({ 'aria-hidden': 'true' }).find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                        }
                    }
                },
                onResize: function() {
                    setPaginateHeight('.swiper-pagination');
                },
                onPaginationRendered: function(swiper, paginationContainer, index) {
                    setPaginateHeight(paginationContainer);
                },
                paginationBulletRender: function(swiper, index) {
                    return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>'
                }
            })

            function setPaginateHeight(paginationContainer) {
                var targetHeight = SDS_COMMON.currentWidth() > 767 ?
                    'auto' :
                    $('.ben_slide_horizon .swiper-container').height();
            }
        }
    });

    // swiper-pagination-bullet
    $(document).on('click', '.swiper-pagination .swiper-pagination-bullet', function(event) {
        event.preventDefault();
    });


    var waitEvent = function() {
        var b = {};
        return function(c, d, a) {
            a || (a = "sdsa");
            b[a] && clearTimeout(b[a]);
            b[a] = setTimeout(c, d)
        }
    }();
    var fullDateString = new Date();

    num_owl();

    function num_owl() {
        $(".owl-controls").each(function() {
            bullet($(this).children(".owl-dots").find("a"));
        })
        /* pagination */
        function bullet(dot) {
            for (var i = 1; i <= dot.length; i++) {
                dot.eq(i - 1).text(i)
            }
        }
    }
    $(window).on('load', function() {

        $(".owl-item.cloned a, .owl-item.cloned button").attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
        $(".scr_term").attr({ 'tabindex': '0', 'aria-hidden': 'false' });

        var nowViewSize;
        //$(window).on("resize", function () {
        $(window).on("resize.trigger", function() { //20.07. RN 수정 - JH

            var $window_height = $(window).height();

            if ($("html").hasClass("view-m") || $("html").hasClass("view-t")) {
                if (nowViewSize != "view-mt") {
                    nowViewSize = "view-mt";
                    closeSearch();
                    closeMylist();
                    $(".mylist").css('top', '');
                }
            } else if ($("html").hasClass("view-w")) {
                if (nowViewSize != "view-w") {
                    nowViewSize = "view-w";
                    closeSearch();
                    closeMylist();
                    if (!$(".wrap_cookie").height) {
                        $(".mylist").css('top', '155px');
                    }
                }
            }

            waitEvent(function() {
                $(".ul_im li .text").css({ "height": "" });

                $(".ul_im").each(function() {
                    if ($(this).hasClass("many") && SDS_COMMON.currentWidth() > 767) {
                        var li_height = 0;
                        $(this).find("li").each(function(index, item) {
                            if ($(this).find('.text').height() > li_height) {
                                li_height = $(this).find('.text').height();
                            }
                            $(this).find('.text').css({ "height": li_height });
                        });
                    } else if (!$(this).hasClass("one") && SDS_COMMON.currentWidth() > 767) {
                        var ah = $(this).height(),
                            ih = $(this).find(".im").height(),
                            h = ah - ih;
                        $(this).find('li .text').css({ "height": h });
                    } else {
                        $(this).find('li .text').css({ "height": "" });
                    };
                });
            }, 100, fullDateString.getTime());

            // fix_m start
            $(".fix_m").each(function() {
                var _fixm = $(".fix_m"),
                    _menu = $(".cnt_menu"),
                    _this = $(this),
                    _fixmOffset = _menu.position(),
                    _fixId,
                    _fixmHeight = _menu.outerHeight(),
                    _fixItems = _fixm.find("a"),
                    _scrollItems = _fixItems.map(function() {
                        var item = $($(this).attr("href"));
                        if (item.length) { return item; }
                    });

                _fixItems.on("click", function(e) {
                    e.preventDefault();
                    var val = $(this).attr("href");
                    if (val == "#none") {
                        // none을 지정 안해서 애러생기는 부분 보정
                    } else if (val == "#feat") {
                        if ($("html").hasClass("view-w")) {
                            $("html, body").stop().animate({ scrollTop: $(val).offset().top - _fixm.height() - 100 }, 300);
                        } else if ($("html").hasClass("view-t")) {
                            $("html, body").stop().animate({ scrollTop: $(val).offset().top - _fixm.height() - 39 }, 300);
                        } else if ($("html").hasClass("view-m")) {
                            $("html, body").stop().animate({ scrollTop: $(val).offset().top - _fixm.height() - 50 }, 300);
                        };
                    } else if (val == "#feat2") {
                        if ($("html").hasClass("view-w")) {
                            $("html, body").stop().animate({ scrollTop: $(val).offset().top - _fixm.height() - 100 }, 300);
                        } else if ($("html").hasClass("view-t")) {
                            $("html, body").stop().animate({ scrollTop: $(val).offset().top - _fixm.height() - 39 }, 300);
                        } else if ($("html").hasClass("view-m")) {
                            $("html, body").stop().animate({ scrollTop: $(val).offset().top - _fixm.height() - 50 }, 300);
                        };
                    } else {
                        $("html, body").stop().animate({ scrollTop: $(val).offset().top - _fixm.height() + 1 }, 300);
                    }

                });
                var standard_ScrollTop = 0; // 스크롤 업/다운 기준값
                $(window).on("scroll", function() {
                    if ($("html").hasClass("view-w")) {
                        ($(this).scrollTop() > _fixmOffset.top - $(".cnt_menu").outerHeight() + 70 + $('.wrap_cookie').height()) ? _fixm.addClass("fixed"): _fixm.removeClass("fixed");
                    } else if (!$("html").hasClass("view-w")) {
                        ($(this).scrollTop() > _fixmOffset.top - $(".cnt_menu").outerHeight() + 50 + $('.wrap_cookie').height()) ? _fixm.addClass("fixed"): _fixm.removeClass("fixed");
                    };
                    if ($(".wrap_cookie").length) {
                        var wrap_cookie_height = $(".wrap_cookie").height();
                    } else {
                        var wrap_cookie_height = 0;
                    }
                    var $box_size = $(".cnt_visual").height() + $(".cnt_menu").height() + wrap_cookie_height // 상단 박스의 사이즈를 확인해둠
                    var $window_height = $(window).height();
                    var $scrollTop = $(window).scrollTop();
                    var $scrollBot = $scrollTop + $window_height;
                    var st = $scrollTop;
                    if (st > standard_ScrollTop) { // 스크롤 다운 중에
                        if ($(".sel").hasClass("on")) { // 메뉴바가 오픈되어있고
                            if ($scrollBot > $box_size + $window_height) { // 해당조건이면 메뉴바 닫음
                                $(".cnt_menu .left ul").removeClass("dpt");
                                $(".cnt_menu .left .sel").removeClass("on");
                            }
                        }
                    } else { // 스크롤 업 중에
                        if ($(".sel").hasClass("on")) { // 메뉴바가 오픈되어있으면 메뉴바 닫음
                            $(".cnt_menu .left ul").removeClass("dpt");
                            $(".cnt_menu .left .sel").removeClass("on");
                        }
                    }
                    standard_ScrollTop = st;

                    var _fixTop = $(this).scrollTop() + _fixmHeight,
                        _fixmn = _scrollItems.map(function() {
                            if ($(this).attr("id") == "feat") {
                                if ($("html").hasClass("view-w")) {
                                    if ($(this).offset().top - 152 < _fixTop) {
                                        return this;
                                    };
                                } else if ($("html").hasClass("view-t")) {
                                    if ($(this).offset().top - 70 < _fixTop) {
                                        return this;
                                    };
                                } else if ($("html").hasClass("view-m")) {
                                    if ($(this).offset().top - 55 < _fixTop) {
                                        return this;
                                    };
                                };

                            } else if ($(this).attr("id") == "case") {
                                if ($(this).offset().top - 100 < _fixTop) {
                                    return this;
                                };
                            } else {
                                if ($(this).offset().top < _fixTop) {
                                    return this;
                                };
                            }
                        });



                    if (!$(".fix_m").hasClass("fixed") && SDS_COMMON.currentWidth() < 1025) {
                        var name = $(".fix_m .left ul li:first-child a").text();
                        $(".cnt_menu .left .txt").text(name);
                    }


                    _fixmn = _fixmn[_fixmn.length - 1];
                    var id = _fixmn && _fixmn.length ? _fixmn[0].id : "";
                    if (_fixId !== id) {
                        var name = _fixItems.filter("[href='#" + id + "']").parent().text();
                        _fixItems.parent().removeClass("on").end().filter("[href='#" + id + "']").parent().addClass("on");

                        if (SDS_COMMON.currentWidth() < 1025) {
                            $(".fix_m.fixed").find(".left .sel .txt").text(name);
                        }
                    }
                });
            });




            /* edu_owl */
            $(".edu_owl").each(function(e, use) {
                var $owl = $(this);

                if (SDS_COMMON.currentWidth() < 768) {
                    $owl.owlCarousel({
                        margin: 0,
                        loop: true,
                        nav: false,
                        dots: true,
                        items: 1
                    });
                } else if (SDS_COMMON.currentWidth() > 769 && $owl.hasClass("owl-loaded")) {
                    $owl.data('owlCarousel').destroy();
                    $owl.trigger('destroy.owl.carousel');
                    $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
                }
            });


            //footer start
            if (SDS_COMMON.currentWidth() > 1025) {
                $("#footer .f_menu .in, #footer .f_menu ul").removeAttr("style");
                $("#footer .ftm").removeClass("on");
            }
            //footer start

            //Supplier over
            $(".abt_care_over").each(function() {
                var h = $(this).height(),
                    th = $(this).find(".text").outerHeight();
                $(this).find(".bg").css("padding-bottom", th);
                //$(this).find(".in").css("margin-bottom",th);
            });




            //layer use start
            $('.btn_owl').on("click", function() {
                var name = $(this).attr("name"),
                    totalItems = $("#" + name).find('.item').length,
                    target = $("#" + name).find('.item');

                if (!$("#" + name).find(".zmb").length) {
                    $("#" + name + " .in img").wrap('<div class="zmb">');
                    $("#" + name + " .in").each(function(key, value) {
                        var $this = $(this);
                        var getURL = $this.find('img').attr('src');
                        $this.find(".zmb").append('<a href="/en/etc/view/ly_use_org.html?imgSrc=' + encodeURIComponent(getURL) + '" class="btn_zoom" target="_blank">View original</a>');
                    })
                }

                if (totalItems > 1) {
                    $("#" + name).find(".ly_use_owl").owlCarousel({
                        margin: 0,
                        nav: true,
                        dots: false,
                        items: 1
                    });

                    var currentIndex = $("#" + name).find("div.active").index() + 1;
                    $("#" + name).find('.num').html('<span class="cur">' + currentIndex + '<span>/<span class="tot">' + totalItems + '</span>');

                    $("#" + name).on('changed.owl.carousel', function(e) {
                        var current = e.item.index + 1;
                        var itm = $("#" + name).find(".owl-item").length,
                            itm2 = $("#" + name).find(".owl-item.cloned").length,
                            num = itm - itm2;
                        $("#" + name).find('.num').html('<span class="cur">' + current + '<span>/<span class="tot">' + num + '</span>');
                    });

                }

            })
            //layer use end

            /* home business */
            $(".sol_list").each(function() {
                var num = $(this).find("li").length;

                if (SDS_COMMON.currentWidth() < 1025) {
                    (num > 3) ? $(this).addClass("four"): '';
                }
            });


            // use start
            $(".use.owl-carousel").each(function() {
                var num = $(this).find(".item").length,
                    $owl = $(this);

                if (SDS_COMMON.currentWidth() < 768) {

                    if (!$(this).hasClass("one")) {
                        $owl.owlCarousel({
                            margin: 0,
                            loop: true,
                            nav: true,
                            items: 1
                        });
                    }
                } else if (SDS_COMMON.currentWidth() >= 768) {
                    if ($(this).hasClass("one")) {
                        if ($owl.hasClass("owl-loaded")) {
                            $owl.data('owlCarousel').destroy();
                            $owl.trigger('destroy.owl.carousel');
                            $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
                        }
                    } else if ($(this).hasClass("two")) {
                        if ($owl.hasClass("owl-loaded")) {
                            $owl.data('owlCarousel').destroy();
                            $owl.trigger('destroy.owl.carousel');
                            $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
                        }
                    } else if ($(this).hasClass("none")) {
                        $(this).addClass("none");
                        if ($owl.hasClass("owl-loaded")) {
                            $owl.data('owlCarousel').destroy();
                            $owl.trigger('destroy.owl.carousel');
                            $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
                        }
                    } else if ($(this).hasClass("roll")) {
                        $owl.owlCarousel({
                            margin: 0,
                            loop: true,
                            center: true,
                            nav: true,
                            responsive: {
                                0: { items: 1 },
                                768: { items: 2 },
                            }
                        });
                    }
                }
            });
            // use end

            // use resize start
            $(".use").each(function() {
                var _this = $(this);
                if (SDS_COMMON.currentWidth() > 767) {
                    if (_this.hasClass("two") || _this.hasClass("none")) {
                        doUseCaseHeightMaximum();
                        _this.on('resized.owl.carousel', function(e) {
                            doUseCaseHeightMaximum();
                        });
                    } else if (_this.hasClass("roll")) {
                        doUseCaseHeightMaximum();
                        _this.on('resized.owl.carousel', function(e) {
                            doUseCaseHeightMaximum();
                        });
                    }
                } else if (SDS_COMMON.currentWidth() < 768) {
                    if (!_this.hasClass("one")) {
                        doUseCaseHeightMaximum();
                        _this.on('resized.owl.carousel', function(e) {
                            doUseCaseHeightMaximum();
                        });
                    }
                }
            });
            //use resize end

            // use_swiper resize startSwiper
            $(".use_swiper").each(function() {
                var _this = $(this);
                doUseSwiperCaseHeightMaximum();
                _this.on('resized.owl.carousel', function(e) {
                    doUseSwiperCaseHeightMaximum();
                });
            });
            //use_swiper resize end

            // gnb start
            if (SDS_COMMON.currentWidth() > 1024) {
                $("#header .hd_top .gnb_sub, #header .hd_top .sm_menu").removeAttr("style");
            };
            // gnb end
            num_owl();

            //}).trigger("resize");
        }).trigger("resize.trigger"); //20.07. RN 수정 - JH

    });
    //

    $(window).on("resize", function() {
        //*** resize start
        // gnb
        $("#header .hd_top .gnb .mm").each(function() {
            $(this).removeClass("on");
        });

        if (SDS_COMMON.currentWidth() > 1024) {
            if (!$(".mylist").hasClass("on")) {
                $("#header").removeClass("fixed");
            }
            $("#header .hd_top .gnb").removeClass("dpb");
            $(".btn.all").removeClass("on");
            $("html, body").removeClass("oh");
        }

        if (SDS_COMMON.currentWidth() <= 1024) {
            if ($(".mylist").hasClass("on")) {
                $("#header").addClass("fixed");
            }
        }

        /* gnb sch */
        // if($("#header .btn.sch").hasClass("on") && SDS_COMMON.currentWidth()  < 1025){
        //  $("#header").addClass("fixed");
        //  $("html, body").addClass("oh");
        // }else{
        //  $("#header").removeClass("fixed");
        //  $("html, body").removeClass("oh");
        // }

        // part_ul start
        $(".part_ul").each(function() {
            if (SDS_COMMON.currentWidth() < 768) {
                if (!$(this).hasClass("owl-loaded")) {
                    $(".part_ul").owlCarousel({
                        margin: 0,
                        loop: false,
                        nav: true,
                        items: 1
                    });
                }
            } else if (SDS_COMMON.currentWidth() >= 768) {
                if ($(".part_ul").hasClass("owl-loaded")) {
                    $(".part_ul").data('owlCarousel').destroy();
                    $(".part_ul").html($(".part_ul").find('.owl-stage-outer').html()).removeClass('owl-loaded');
                }
            }
        });
        // part_ul end

        //gnb start
        if (SDS_COMMON.currentWidth() > 1024) {
            $("#header .hd_top .sub_menu").hide();
        }

    });



    /* ****** global ****** */
    /* about */
    $(".acco").each(function() {
        ($(this).hasClass("open")) ? $(".acco li:first-child").find(".tit").addClass("on").next().show(): '';
        if ($(this).find("li.select").length) {
            $(this).find(".text").hide().end().find("li .tit.on").removeClass("on").end().find("li.select").find(".tit").addClass("on").next().show();
        }

    });

    $(".acco li .tit").on("click", function() {
        var _this = $(this).parent();


        if ($(this).closest(".acco").hasClass("active") && !$(this).hasClass("on")) {
            $(this).attr('aria-expanded', 'true');

            $(this).parent().siblings().children(".tit").removeClass("on");
            $(this).parent().siblings().children(".text").slideUp();
            $(this).parent().siblings().children(".tit").attr('aria-expanded', 'false');

            $(this).toggleClass("on").next().slideToggle(500, function() {
                var _pos = $(this).closest("li").position(),
                    _top = _pos.top,
                    _num = $(this).next(".text").height(),
                    _scTop = $(window).scrollTop();
                $("html, body").stop().animate({ scrollTop: _top }, 300);

            });

        } else if (!$(this).hasClass("on")) {
            $(this).parent().siblings().children(".tit").removeClass("on");
            $(this).parent().siblings().children(".text").slideUp();
            $(this).parent().siblings().children(".tit").attr('aria-expanded', 'false');
            $(this).closest(".acco").siblings().find(".tit").removeClass("on");
            $(this).closest(".acco").siblings().find(".text").slideUp();

            $(this).toggleClass("on").next().slideToggle(500, function() {
                var _pos = $(this).closest("li").position(),
                    _top = _pos.top,
                    _num = $(this).next(".text").height(),
                    _scTop = $(window).scrollTop();

                if (($(this).parents(".gcoc").length || $(this).parents(".acco_gove").length) && ($(".tab_wrap").offset().top < _top) && SDS_COMMON.isMobile()) {
                    $("html, body").stop().animate({ scrollTop: _top - 50 }, 300);
                } else {
                    $("html, body").stop().animate({ scrollTop: _top }, 300);
                }
            });
        } else {
            $(this).attr('aria-expanded', 'false');
            $(this).toggleClass("on").next().slideToggle(500, function() {
                var _pos = $(this).closest("li").position(),
                    _top = _pos.top,
                    _num = $(this).next(".text").height(),
                    _scTop = $(window).scrollTop();
                if (($(this).parents(".gcoc").length || $(this).parents(".acco_gove").length) && ($(".tab_wrap").offset().top < _top) && SDS_COMMON.isMobile()) {
                    $("html, body").stop().animate({ scrollTop: _top - 50 }, 300);
                } else {
                    $("html, body").stop().animate({ scrollTop: _top }, 300);
                }


            });
        }

    });


    //220228 | legal acc add
    $(".legal_cont .list_wrap .acc_btn").on("click", function() {
        var _this = $(this);

        _this.toggleClass("active");
        _this.closest("li").find(".acc_panel").slideToggle();

        if (!_this.hasClass("active")) {
            _this.attr("aria-expanded", false);
        } else {
            _this.attr("aria-expanded", true);
        }
    });

    $(".legal_cont .list_wrap .list_dep2 li").each(function() {
        var _this = $(this);

        if (_this.find(".acc_panel li").length) return;
        _this.find(".acc_btn").hide();
    });




    // attach start
    $(".att_file").each(function() {
        var fileTarget = $(this).find('.file_add');

        fileTarget.on('change', function() {
            if (window.FileReader) {
                var fileNames = new Array();
                for (var i = 0; i < ($(this)[0].files.length <= 5 ? $(this)[0].files.length : 5); i++) {

                    var contains = false;

                    fileNames[i] = $(this)[0].files.item(i).name;

                    var length = 0;
                    $.each(fileForm, function(key, value) {
                        if (fileNames[i] == key) {
                            contains = true;
                        }
                        length++;
                    });


                    if (length < 5) {
                        fileForm[$(this)[0].files.item(i).name] = $(this)[0].files[i];
                        if (!contains) {
                            $(".file_name").append("<div><span class='txt'>" + fileNames[i] + "</span><button type='button' class='ico_del'>delete attached file</button></div>");
                        }
                    }

                    if (!checkFileSize()) {
                        if ($("#locale").val() == 'ko') {
                            $(".att_file .error_msg").text("파일은 최대 9MB 까지 첨부 가능합니다.");
                        } else {
                            $(".att_file .error_msg").text("You can upload files up to 9MB.");
                        }
                    } else {
                        $(".att_file .error_msg").text("");
                    }
                }
            } else {
                var filename = $(this).val().split('/').pop().split('\\').pop();
            }
        });
        $(document).on("click", ".ico_del", function() {
            var index = $(".ico_del").index(this);
            var fileName = $($(".file_name .txt")[index]).html();
            delete fileForm[fileName];
            $(this).parent().remove();

            if (!checkFileSize()) {
                if ($("#locale").val() == 'ko') {
                    $(".att_file .error_msg").text("파일은 최대 9MB 까지 첨부 가능합니다.");
                } else {
                    $(".att_file .error_msg").text("You can upload files up to 9MB.");
                }
            } else {
                $(".att_file .error_msg").text("");
            }

        });
    });

    function checkFileSize() {
        var filesSize = 0;

        $.each(fileForm, function(key, value) {
            filesSize += fileForm[key].size;
            length++;
        });
        if (filesSize > 9 * 1024 * 1024) {
            return false;
        } else {
            return true;
        }
    }

    atta_ok = {
        show: function(e) {
            var att_val = $("#file_atta").html();
            if (att_val !== "") {
                $("#atta_result").html(att_val);
            }
            $(".file_box .ico_del").on("click", function() {
                $("#atta_result").html("");
            });
        }
    }
    // attach end


    $(".any_chk").change(function() {
        if ($(this).is(":checked")) {
            if ($("#locale").val() === 'kr') {
                $("div.inner div.form p.tit").eq(4).addClass("dpn");
                $("div.inner div.form p.tit").eq(5).addClass("dpn");
                $("div.inner div.form p.tit").eq(6).addClass("dpn");
                $("div.inner div.form p.tit").eq(7).addClass("dpn");
                $("div.inner div.form div.agree").addClass("dpn");
            } else {
                $("div.inner div.form p.tit").eq(4).addClass("dpn");
                $("div.inner div.form p.tit").eq(6).addClass("dpn");
                $("div.inner div.form div.agree div.scr_box").addClass("dpn");
                $("div.inner div.form div.agree p.txt").addClass("dpn");
                $("div.inner div.form div.agree p.error_msg").addClass("dpn");
            }
            $(".ul_ip .ri_chk").addClass("dpn");
        } else {
            if ($("#locale").val() === 'kr') {
                $("div.inner div.form p.tit").eq(4).removeClass("dpn");
                $("div.inner div.form p.tit").eq(5).removeClass("dpn");
                $("div.inner div.form p.tit").eq(6).removeClass("dpn");
                $("div.inner div.form p.tit").eq(7).removeClass("dpn");
                $("div.inner div.form div.agree").removeClass("dpn");
            } else {
                $("div.inner div.form p.tit").eq(4).removeClass("dpn");
                $("div.inner div.form p.tit").eq(6).removeClass("dpn");
                $("div.inner div.form div.agree div.scr_box").removeClass("dpn");
                $("div.inner div.form div.agree p.txt").removeClass("dpn");
                $("div.inner div.form div.agree p.error_msg").removeClass("dpn");
            }
            $(".ul_ip .ri_chk").removeClass("dpn");
        }
    });

    $(".any_chk1").change(function() {
        if ($(this).is(":checked")) {
            if ($("#locale").val() === 'kr') {
                $("div.inner div.form p.tit").eq(4).addClass("dpn");
                $("div.inner div.form p.tit").eq(5).addClass("dpn");
                $("div.inner div.form p.tit").eq(6).addClass("dpn");
                $("div.inner div.form p.tit").eq(7).addClass("dpn");
                $("div.inner div.form p.tit").eq(8).addClass("dpn");
                $("div.inner div.form div.agree").addClass("dpn");
            } else {
                $("div.inner div.form p.tit").eq(4).addClass("dpn");
                $("div.inner div.form p.tit").eq(6).addClass("dpn");
                $("div.inner div.form p.tit").eq(7).addClass("dpn");

                $("div.inner div.form div.agree div.scr_box").addClass("dpn");
                $("div.inner div.form div.agree p.txt").addClass("dpn");
                $("div.inner div.form div.agree p.error_msg").addClass("dpn");
            }
            $(".ul_ip .ri_chk").addClass("dpn");
        } else {
            if ($("#locale").val() === 'kr') {
                $("div.inner div.form p.tit").eq(4).removeClass("dpn");
                $("div.inner div.form p.tit").eq(5).removeClass("dpn");
                $("div.inner div.form p.tit").eq(6).removeClass("dpn");
                $("div.inner div.form p.tit").eq(7).removeClass("dpn");
                $("div.inner div.form p.tit").eq(8).removeClass("dpn");

                $("div.inner div.form div.agree").removeClass("dpn");
            } else {
                $("div.inner div.form p.tit").eq(4).removeClass("dpn");
                $("div.inner div.form p.tit").eq(6).removeClass("dpn");
                $("div.inner div.form p.tit").eq(7).removeClass("dpn");

                $("div.inner div.form div.agree div.scr_box").removeClass("dpn");
                $("div.inner div.form div.agree p.txt").removeClass("dpn");
                $("div.inner div.form div.agree p.error_msg").removeClass("dpn");
            }
            $(".ul_ip .ri_chk").removeClass("dpn");
        }
    });

    // iframe src 변경
    function iframeSrc() {
        $('#dcinfo').attr('src', 'https://www.samsungsds.com/kr/investor/disc/about_disc_info.html')
    }
    $(window).on("load", function() { iframeSrc(); }).resize(function() { iframeSrc(); });

    //팝업 슬라이드 관련
    function popSlide() {
        if (SDS_COMMON.currentWidth() < 768) {
            $('.layer_wrap').each(function() {
                var totalItems = $(this).find('.item').length;
                var itemWidth = SDS_COMMON.currentWidth() - 20
                if ($(this).hasClass('vertical')) {
                    var itemHeight = $(window).height() - 50;
                    $(this).find(".ly_use_owl").css('width', itemWidth);
                    $(this).find('.item').css('width', itemWidth);
                    $(this).find('.owl-item').css('width', itemWidth);
                } else {
                    $(this).find(".ly_use_owl").css('width', itemWidth * totalItems);
                    $(this).find('.item').css('width', itemWidth);
                    $(this).find('.owl-item').css('width', itemWidth);
                }
            })
        } else {
            if ($('.layer_wrap').hasClass('vertical')) {
                $(".ly_use_owl").each(function() {
                    var wrapHeight = $(this).parents('.layer_wrap').height() - 60;
                    var wrapWidth = $(this).parents('.layer_wrap').width() - 30;
                    $(this).css({ 'height': wrapHeight, 'width': wrapWidth });
                    $(this).find('.item').css('width', wrapWidth);
                    // $(this).find('.owl-item').css('width', wrapWidth);
                })
            } else {
                $(".ly_use_owl").each(function() {
                    var wrapWidth = $(this).parents('.layer_wrap').width() - 30;
                    $(this).css('width', wrapWidth);
                    $(this).find('.item').css('width', wrapWidth);
                })
            }

        }
    }

    // box_img - type3
    $('.box_img.type3 .cnt').attr('tabindex', 0).on('mouseover focus', function() {
        $(this).addClass('active').siblings('.cnt').removeClass('active');
    }).find('a, select, button, textarea, input, area').on('focus', function() {
        $(this).parents('.cnt').addClass('active').siblings('.cnt').removeClass('active');
    });

    $(".office_ac map > area").attr("alt", "");

    /* worldMap */
    if ($('.worldMap').length) {
        $('.worldMap .worldMap_point').on('focusout', function(e) {
            if ($(e.currentTarget)[0] != $(e.relatedTarget).parents('.worldMap_point')[0]) {
                $('.worldMap .worldMap_point').removeClass('is_open');
            }
        });
        $('.worldMap .worldMap_point').on('focusin', function() {
            $(this).addClass('is_open');
        });
    }
    /* //worldMap */

    /* defaultSwiper */
    var defaultSwiper = {
        init: function($target, underLength, overLength) {
            defaultSwiper.start($target, underLength, overLength);

            if ($target.hasClass('is_resizeReload')) {
                var prev_device_m = SDS_COMMON.isMobile();
                $(window).on('resize', function(e) {
                    if (prev_device_m != SDS_COMMON.isMobile()) {
                        prev_device_m = SDS_COMMON.isMobile();
                        defaultSwiper.close($target);
                        setTimeout(function() {
                            defaultSwiper.start($target, underLength, overLength);
                        }, 0);
                    }
                });
            }

        },
        start: function($target, underLength, overLength) {
            $target.each(function(index) {
                var $this = $(this);
                var $slide = $this.find('.swiper-slide');

                if (underLength != undefined && $slide.length <= underLength) {
                    $this.addClass('is_length' + $this.find('.swiper-slide').length);
                    $this.addClass('is_under');
                    if (SDS_COMMON.isMobile()) {
                        if ($target.under_option_m) {
                            option = $target.under_option_m;
                        } else {
                            option = $target.under_option;
                        }
                    } else {
                        option = $target.under_option;
                    }
                } else if (overLength != undefined && $slide.length >= overLength) {
                    $this.addClass('is_breakOver');
                    if (SDS_COMMON.isMobile()) {
                        if ($target.over_option_m) {
                            option = $target.over_option_m;
                        } else {
                            option = $target.over_option;
                        }
                    } else {
                        option = $target.over_option;
                    }
                } else {
                    $this.addClass('is_over');
                    if (SDS_COMMON.isMobile()) {
                        if ($target.option_m) {
                            option = $target.option_m;
                        } else {
                            option = $target.option;
                        }
                    } else {
                        option = $target.option;
                    }
                }
                if (option.on) {
                    option.on.slideChangeTransitionEnd = function() {
                        $(this.el).find('.swiper-slide-active').attr({ 'aria-hidden': 'false' }).siblings().attr({ 'aria-hidden': 'true' });
                        $(this.el).find('.swiper-slide-active').find('button, a').attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                        $(this.el).find('.swiper-slide-active').siblings().find('button, a').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                    }
                } else {
                    option.on = {
                        slideChangeTransitionEnd: function() {
                            $(this.el).find('.swiper-slide-active').attr({ 'aria-hidden': 'false' }).siblings().attr({ 'aria-hidden': 'true' });
                            $(this.el).find('.swiper-slide-active').find('button, a').attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                            $(this.el).find('.swiper-slide-active').siblings().find('button, a').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                        }
                    }
                }

                if ($slide.length > 1) {
                    $this.mySwiper = new Swiper($this.find('.swiper-container'), option);
                    $this.mySwiper.slideToLoop($target[index].realIndex, 0);

                    $($this.mySwiper.slides).on('click', function(e) {
                        if ($this.mySwiper.clickedIndex != undefined) {
                            $this.mySwiper.slideTo($this.mySwiper.clickedIndex);
                        }
                    });

                    $($this.mySwiper.el).parent().find('.swiper-button-prev').on('click', function(e) {
                        $this.mySwiper.slidePrev();
                    });

                    $($this.mySwiper.el).parent().find('.swiper-button-next').on('click', function(e) {
                        $this.mySwiper.slideNext();
                    });

                    $this.addClass('is_onSwiper');

                    $this.find('.swiper-slide-duplicate').find('a, select, button, textarea, input, area').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });

                    $target[index].destroy = function() {
                        $target[index].realIndex = $this.mySwiper.realIndex;
                        $($this.mySwiper.slides).off('click');
                        $($this.mySwiper.el).parent().find('.swiper-button-prev').off('click');
                        $($this.mySwiper.el).parent().find('.swiper-button-next').off('click');
                        $this.removeClass('is_length' + $this.find('.swiper-slide').length);
                        $this.removeClass('is_under');
                        $this.removeClass('is_over');
                        $this.mySwiper.destroy(true, true);
                    }
                } else {
                    $($this).find('.swiper-button-prev, .swiper-button-next').hide();
                    return;
                }
            });
        },
        close: function($target) {
            $target.each(function(index) {
                var $this = $(this);
                if ($target[index].destroy != undefined) {
                    $target[index].destroy();
                }
            });
        }
    }
    /* //defaultSwiper */

    /* initSwiper */

    /* horizontalMonial Swiper 옵션 설정 및 init */
    var $horizontalMonial = $('.horizontalMonial:not(.is_five)');
    $horizontalMonial.defaultOptions = {
        keyboard: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function(index, className) {
                return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>';
            }
        },

    }

    $horizontalMonial.option = $.extend(true, {}, $horizontalMonial.defaultOptions);

    defaultSwiper.init($horizontalMonial);

    /* horizontalThumbnailList Swiper 옵션 설정 및 init */
    var $horizontalThumbnailList = $('.horizontalThumbnailList:not(.is_five)');
    $horizontalThumbnailList.defaultOptions = {
        keyboard: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function(index, className) {
                return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>';
            }
        }
    }

    // 4개 이상 동일
    $horizontalThumbnailList.option = $.extend(true, {}, $horizontalThumbnailList.defaultOptions);
    $horizontalThumbnailList.option.loop = true;
    $horizontalThumbnailList.option.centeredSlides = true;
    $horizontalThumbnailList.option.slidesPerView = 3;
    $horizontalThumbnailList.option.on = {
        transitionEnd: function() {
            if (popup_click_history != undefined && $(popup_click_history).attr('class') != undefined) {
                popup_click_history = $(this.slides).filter('.swiper-slide-active').find('.' + $(popup_click_history).attr('class').split(' ')[0]);
            }

            $(this.slides).filter('.swiper-slide-active').removeClass('is_hidden').siblings('.swiper-slide').addClass('is_hidden');
            if ($(this.slides).filter('.swiper-slide-active').hasClass('swiper-slide-duplicate')) { // 클론 클릭시 위치 재조정
                this.slideToLoop(this.realIndex, 0);
            }
        }
    }
    $horizontalThumbnailList.option_m = $.extend(true, {}, $horizontalThumbnailList.defaultOptions);
    $horizontalThumbnailList.option_m.loop = true;
    $horizontalThumbnailList.option_m.centeredSlides = false;
    $horizontalThumbnailList.option_m.slidesPerView = 1;
    $horizontalThumbnailList.option_m.on = {
        init: function() {
            $(this.slides).removeClass('is_hidden');
        }
    }

    // 3개 이하
    $horizontalThumbnailList.under_option = $.extend(true, {}, $horizontalThumbnailList.defaultOptions);
    $horizontalThumbnailList.under_option.loop = false;
    $horizontalThumbnailList.under_option.centeredSlides = false;
    $horizontalThumbnailList.under_option.slidesPerView = 3;
    $horizontalThumbnailList.under_option.simulateTouch = false;
    $horizontalThumbnailList.under_option_m = $.extend(true, {}, $horizontalThumbnailList.defaultOptions);
    $horizontalThumbnailList.under_option_m.loop = true;
    $horizontalThumbnailList.under_option_m.centeredSlides = false;
    $horizontalThumbnailList.under_option_m.slidesPerView = 1;
    $horizontalThumbnailList.under_option_m.simulateTouch = true;

    defaultSwiper.init($horizontalThumbnailList, 3);

    /* horizontalThumbnailList is_five Swiper 옵션 설정 및 init */
    var $horizontalThumbnailList_five = $('.horizontalThumbnailList.is_five');

    // 4개 이상 동일
    $horizontalThumbnailList_five.option = $.extend(true, {}, $horizontalThumbnailList.option);

    // 5개 이상
    $horizontalThumbnailList_five.over_option = $.extend(true, {}, $horizontalThumbnailList.defaultOptions);
    $horizontalThumbnailList_five.over_option.loop = true;
    $horizontalThumbnailList_five.over_option.centeredSlides = true;
    $horizontalThumbnailList_five.over_option.slidesPerView = 3;
    $horizontalThumbnailList_five.over_option.on = {
        transitionEnd: function() {
            if (popup_click_history != undefined && $(popup_click_history).attr('class') != undefined) {
                popup_click_history = $(this.slides).filter('.swiper-slide-active').find('.' + $(popup_click_history).attr('class').split(' ')[0]);
            }

            $(this.slides).filter('.swiper-slide-active').removeClass('is_hidden').siblings('.swiper-slide').addClass('is_hidden');
            if ($(this.slides).filter('.swiper-slide-active').hasClass('swiper-slide-duplicate')) { // 클론 클릭시 위치 재조정
                this.slideToLoop(this.realIndex, 0);
            }
        }
    }
    $horizontalThumbnailList_five.over_option.breakpointsInverse = true,
        $horizontalThumbnailList_five.over_option.breakpoints = {
            1280: {
                slidesPerView: 5
            }
        }
    $horizontalThumbnailList_five.over_option_m = $.extend(true, {}, $horizontalThumbnailList.defaultOptions);
    $horizontalThumbnailList_five.over_option_m.loop = true;
    $horizontalThumbnailList_five.over_option_m.centeredSlides = false;
    $horizontalThumbnailList_five.over_option_m.slidesPerView = 1;
    $horizontalThumbnailList_five.over_option_m.on = {
        init: function() {
            $(this.slides).removeClass('is_hidden');
        }
    }

    // 3개 이하
    $horizontalThumbnailList_five.under_option = $.extend(true, {}, $horizontalThumbnailList.under_option);


    defaultSwiper.init($horizontalThumbnailList_five, 3, 5);


    /* backgroundHorizontalThumbnailList Swiper 옵션 설정 및 init */
    var $backgroundHorizontalThumbnailList = $('.backgroundHorizontalThumbnailList');
    $backgroundHorizontalThumbnailList.defaultOptions = {
        loop: true,
        keyboard: true,
        pagination: {
            el: '.swiper-pagination.is_out',
            type: 'bullets',
            clickable: true,
            renderBullet: function(index, className) {
                return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>'
            },
        },
    }

    $backgroundHorizontalThumbnailList.option = $.extend(true, {}, $backgroundHorizontalThumbnailList.defaultOptions);
    $backgroundHorizontalThumbnailList.option.centeredSlides = true;
    $backgroundHorizontalThumbnailList.option.slidesPerView = 3;
    $backgroundHorizontalThumbnailList.option.on = {
        transitionStart: function() {
            $(this.slides).filter('.swiper-slide-active').addClass('is_active_start').siblings().removeClass('is_active_start');
            $(this.slides).filter('.swiper-slide:not(.swiper-slide-duplicate)').eq(this.realIndex).addClass('is_active_start');
            $(this.slides).removeClass('is_active');
        },
        touchStart: function() {
            $(this.slides).removeClass('is_active');
        },
        transitionEnd: function() {
            if (popup_click_history != undefined && $(popup_click_history).attr('class') != undefined) {
                popup_click_history = $(this.slides).filter('.swiper-slide-active').find('.' + $(popup_click_history).attr('class').split(' ')[0]);
            }

            $(this.slides).filter('.swiper-slide-active').addClass('is_active');
            if ($(this.slides).filter('.swiper-slide-active').hasClass('swiper-slide-duplicate')) { // 클론 클릭시 위치 재조정
                $(this.slides).filter('.swiper-slide:not(.swiper-slide-duplicate)').eq(this.realIndex).addClass('is_active');
                this.slideToLoop(this.realIndex, 0, false);
            }
        },
        touchEnd: function() {
            $(this.slides).filter('.swiper-slide-active').addClass('is_active');
        }
    }
    $backgroundHorizontalThumbnailList.option_m = $.extend(true, {}, $backgroundHorizontalThumbnailList.option);
    $backgroundHorizontalThumbnailList.option_m.centeredSlides = false;
    $backgroundHorizontalThumbnailList.option_m.slidesPerView = 1;

    defaultSwiper.init($backgroundHorizontalThumbnailList);

    function horizontalThumbnail_textBox_resize() {
        $('.horizontalThumbnailList').each(function(index) {
            $this = $(this);
            var max_button_wrap_height = 0;
            for (var i = 0; i < $this.find('.horizontalThumbnail .horizontalThumbnail_btn').length; i++) {
                if ($this.find('.horizontalThumbnail .horizontalThumbnail_btn').height() > max_button_wrap_height) {
                    max_button_wrap_height = $this.find('.horizontalThumbnail .horizontalThumbnail_btn').height();
                }
            }
            $this.find('.horizontalThumbnail_textBox').css('padding-bottom', max_button_wrap_height);
        });
    }
    horizontalThumbnail_textBox_resize();
    $(window).on("resize", function() {
        horizontalThumbnail_textBox_resize();
    });

    /* //initSwiper */

    //  팝업 연동
    /* popup */
    var popup_click_history = "";
    popup = {
        //20220408 비디오새창열기
        videoNewWindowOpen: function(target) {
            var $this = $(target);

            if ($this.data('src') != undefined) {
                var src = $this.data('src');
                if (src.indexOf("youtube.com") > 0) {
                    var index_embed = src.indexOf("/embed/");
                    if (index_embed > 0) {
                        var youtubeid = src.substring(index_embed + 7);
                        window.open("https://www.youtube.com/watch?v=" + youtubeid, "");
                    } else {
                        window.open(src, "");
                    }
                } else {
                    window.open(src, "");
                }
                return;
            }
        },

        open: function(target) {


            var $this = $(target);
            var $winHeight = $(window).height();
            popup_click_history = $this;



            if (!$this.hasClass('is_openPopup')) {
                $this.addClass('is_openPopup');
                var $targetPopupId = $this.attr('href');
                var $targetPopup = $($targetPopupId);
                var $targetHeight = $targetPopup.height();

                if ($winHeight < $targetHeight + 100) {
                    $targetPopup.addClass('is_scroll');
                }

                $targetPopup.find(".swiper-slide iframe").attr("tabindex", 0);

                $targetPopup.prev('.popupDim').show();
                $targetPopup.show().addClass('is_open');

                if ($this.data('src') != undefined) {
                    var src = $this.data('src');
                    var title = $this.data('title');
                    if (title == undefined) {
                        title = "vod";
                    }
                    $targetPopup.find('.youtube').attr({
                        'src': src,
                        'title': title
                    });
                }

                // 팝업 Swiper 옵션 추가
                $targetPopup.defaultOptions = {
                    keyboard: true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'custom',
                        clickable: true,
                        renderFraction: function(currentClass, totalClass) {
                            return '<span class="' + currentClass + '"></span>' +
                                ' / ' +
                                '<span class="' + totalClass + '"></span>';
                        },
                        /* JH */
                        renderCustom: function(swiper, current, total) {
                            function numberAppend(d) {
                                return (d < 10) ? '0' + d.toString() : d.toString();
                            }
                            return '<span class="current">' + numberAppend(current) + '</span>' +
                                '<span class="total">' + numberAppend(total) + '</span>';
                        },
                        /* JH */
                        renderBullet: function(index, className) {
                            return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>'
                        },
                    },
                    on: {
                        /* JH */
                        slideChange: function() {
                            var a = this.activeIndex + 1;
                            var b = this.slides.length;
                            var c = (100 / b) * (a) + '%';
                            $targetPopup.find('.s_bar i').css('width', c);
                            /* JH */
                        },
                        init: function() {
                            // $targetPopup.find('.pop_pagn')/
                            $targetPopup.find('.s_bar').remove()
                            $targetPopup.find('.swiper-container').append('<p class="s_bar"><i></i></p>')
                            //return '<p class="s_bar"><i></i></p>';
                            /* JH */
                            var a = this.activeIndex + 1;
                            var b = this.slides.length;
                            var c = (100 / b) * (a) + '%';
                            $targetPopup.find('.s_bar i').css('width', c);
                            /* JH */

                            var self = this;
                            if ($targetPopup.find('.pdfDownload, .imageBox').length) {
                                var $targetPopup_maxWidth = 0;
                                for (var i = 0; i < $targetPopup.find('.pdfDownload_inner, .imageBox_inner').length; i++) {
                                    if ($targetPopup.find('.pdfDownload_inner, .imageBox_inner')[i].clientWidth > $targetPopup_maxWidth) {
                                        $targetPopup_maxWidth = $targetPopup.find('.pdfDownload_inner, .imageBox_inner')[i].clientWidth;
                                    }
                                }
                                $targetPopup.css("width", $targetPopup.width() - $targetPopup.find('.swiper-wrapper').width() + $targetPopup_maxWidth);
                                $(self.slides).css("width", $targetPopup.find('.swiper-wrapper').width());
                                self.update();
                                $(window).on('resize', function(e) {
                                    $targetPopup.css("width", "");
                                    $(this.slides).css("width", "100%");
                                    self.update();
                                    var $targetPopup_maxWidth = 0;
                                    for (var i = 0; i < $targetPopup.find('.pdfDownload_inner, .imageBox_inner').length; i++) {
                                        if ($targetPopup.find('.pdfDownload_inner, .imageBox_inner')[i].clientWidth > $targetPopup_maxWidth) {
                                            $targetPopup_maxWidth = $targetPopup.find('.pdfDownload_inner, .imageBox_inner')[i].clientWidth;
                                        }
                                    }
                                    $targetPopup.css("width", $targetPopup.width() - $targetPopup.find('.swiper-wrapper').width() + $targetPopup_maxWidth);
                                    $(this.slides).css("width", $targetPopup.find('.swiper-wrapper').width());
                                });
                            }
                        }
                    }
                }
                $targetPopup.option = $.extend(true, {}, $targetPopup.defaultOptions);

                // 팝업 Swiper init
                defaultSwiper.init($targetPopup);

                $targetPopup.find('.imageBox').each(function(index) {
                    $this = $(this);
                    var image_url = $this.find('.imageBox_img').attr('src');
                    $this.find('.imageBox_zoom').attr('href', '/en/etc/view/ly_use_org.html?imgSrc=' + encodeURIComponent(image_url));
                });

                // 팝업 포커스 아웃 막기
                var $inFocuseElement = $targetPopup.find('a:not([style*="display: none"]), button:not([style*="display: none"]), input, .swiper-slide [tabindex]');

                /* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                var ariahidden = $('#skip_navi, header, footer, #container');
                ariahidden.attr({
                    "aria-hidden": true,
                    tabindex: -1
                });
                /* //210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */

                $targetPopup.on("keydown", function(e) {
                    e.stopPropagation();

                    if ($targetPopup.is($(e.target))) {
                        if (e.keyCode == 9 && e.shiftKey) $inFocuseElement.last().focus();
                    }

                    if ($inFocuseElement.first().is($(e.target))) {
                        if (e.keyCode == 9 && e.shiftKey) $inFocuseElement.last().focus();
                    }

                    if ($inFocuseElement.last().is($(e.target))) {
                        if (e.keyCode == 9 && !e.shiftKey) $targetPopup.focus();
                    }

                    /* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                    //esc key close
                    if (e.keyCode === 27) {
                        popup.close();
                    }
                    /* //210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                });

                // 팝업 포커스 설정
                getFocusEl().attr('tabindex', '0').focus();
                // getFocusEl().on("keydown", function(e){
                //     if(e.keyCode == 9 && e.shiftKey == true){
                //         return false;
                //     }
                // });
                function getFocusEl() {
                    var inFocuseElLen = $inFocuseElement.length;
                    for (i = 0; i < inFocuseElLen - 1; i++) {
                        var $thisFocusEl = $inFocuseElement.eq(i);
                        if (!$thisFocusEl.is(':hidden') && !$thisFocusEl.parents().hasClass('swiper-container')) {
                            return $thisFocusEl;
                        }
                    }
                    var $targetPopupType = $targetPopup.find('.defaultTextBox, .pdfDownload, .dualBox_leftBox, .imageBox_inner');
                    return $targetPopupType.length ? $targetPopupType.children().first() : $targetPopup;
                };
            }
        },
        /* 20220914 myTrial mobile popup */
        open_myTrialMobile: function(target) {


            var $this = $(target);
            var $winHeight = $(window).height();
            popup_click_history = $this;



            if (!$this.hasClass('is_openPopup')) {
                $this.addClass('is_openPopup');
                var $targetPopupId = $this.attr('href');
                var $targetPopup = $($targetPopupId);
                var $targetHeight = $targetPopup.height();

                // if ($winHeight < $targetHeight + 100) {
                //     $targetPopup.addClass('is_scroll');
                // }

                $targetPopup.find(".swiper-slide iframe").attr("tabindex", 0);


                if ($this.hasClass('mytrial_is_showPopup')) {
                    $targetPopup.prev('.mytrial_mobile_popDim').show();
                } else {
                    $targetPopup.prev('.popupDim').show();
                }

                $targetPopup.show().addClass('is_open');


            }
        },
        /* //20220914 myTrial mobile popup */
        close: function() {
            $('.is_showPopup').removeClass('is_openPopup');
            var $targetId = popup_click_history.attr('href');
            var $target = $($targetId);
            var ariahidden = $('#skip_navi, header, footer, #container'); /* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
            $target.find('.youtube').attr({
                'src': '',
                'title': ''
            });
            if ($target.hasClass('is_scroll')) {
                $target.removeClass('is_scroll');
            }
            $target.prev('.popupDim').hide();
            $target.hide().removeClass('is_open');
            defaultSwiper.close($target);
            popup_click_history.focus();
            $target.off("keydown");
            var $inFocuseElement = $target.find('a, button, input');
            $inFocuseElement.off("keydown");
            /* 210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
            ariahidden.removeAttr("tabindex");
            ariahidden.removeAttr("aria-hidden");
            /* //210507 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
        },
        onResize: function() {
            if ($(".slidePopup").hasClass('is_open')) {
                var $targetId = popup_click_history.attr('href');
                var $target = $($targetId);
                var $winHeight = $(window).height();
                $target.removeClass('is_scroll');
                if (!$target.hasClass('is_scroll')) {
                    var $targetHeight = $target.height();
                    if ($winHeight < $targetHeight + 100) {
                        console.log("test", $target, $winHeight, $targetHeight + 100);
                        $target.addClass('is_scroll');
                    }
                } else {}
            }
        }
    }


    /* 20220914 myTrial mobile popup */
    if (SDS_COMMON.isMobile()) {
        $('.mytrial_is_showPopup').addClass('btn_anchor')
    } else {
        $('.mytrial_is_showPopup').removeClass('btn_anchor')
    }
    /* //20220914 myTrial mobile popup */

    /** owlCarousel cloned 이슈 : module.js에서 마지막으로 html을 복사가 되서 클릭 이벤트가 안됐었던 오류 전역 이벤트로 수정 */
    $(document).on('click','.is_showPopup', function(e) {

        //오퍼링에서 레이어팝업과 새창 분리할 경우 start
        if ($(this).data('src') == undefined) {
            //레이어팝업

            /* 20220914 myTrial mobile popup */
            if ($(this).hasClass('mytrial_is_showPopup')) {
                if (SDS_COMMON.isMobile()) {
                    popup.open_myTrialMobile(this);
                }
            } else {
                popup.open(this);
            }
            /* //20220914 myTrial mobile popup */

        } else {
            if ($(this).data('watch') != undefined && $(this).data('watch') == 'y') {
                //레이어팝업
                popup.open(this);
            } else {
                //새창열림
                popup.videoNewWindowOpen(this);
            }
        }
        //오퍼링에서 레이어팝업과 새창 분리할 경우 end

        //오퍼링에서 레이어팝업만 사용할 경우 start
        //            popup.open(this);
        //오퍼링에서 레이어팝업만 사용할 경우 end

        return false;
    });
    $(document).on('click','.is_closePopup', function(e) {
        popup.close();
        return false;
    });
    /** //owlCarousel cloned 이슈 : module.js에서 마지막으로 html을 복사가 되서 클릭 이벤트가 안됐었던 오류 전역 이벤트로 수정 */

    $(window).resize(function() {
        popup.onResize(this);
    });

    //새창으로 비디오열림 class추가
    $('.is_NewWinVideo').on('click', function(e) {
        popup.videoNewWindowOpen(this);
        return false;
    });

    /* //popup */

    /* execution functions - start */
    thumbListType();
    /* execution functions - end */

    // jquery end
});

// thumbList
function thumbListType() {
    if ($('.ul_im').length) {
        $('.ul_im').each(function() {
            children = $(this).children('li').length;

            if (children) {
                if (children == 1) {
                    if (!$(this).hasClass('one')) {
                        $(this).addClass('one');
                    }
                } else if (children == 2) {
                    if (!$(this).hasClass('two')) {
                        $(this).addClass('two');
                    }
                } else if (children == 3) {
                    if (!$(this).hasClass('three')) {
                        $(this).addClass('three');
                    }
                } else {
                    $(this).addClass('three many');
                }
            }
        });
    }
}
