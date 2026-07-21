/*******************************************************************************
 * 파 일 명 : popup.js
 * 작 성 자 : 오해영
 * 작 성 일 : 2016-10-10
 * 기 능    : 레이어팝업
 ******************************************************************************/
 var SDS_COMMON = {
    mobileWidth: 767,
    tabletWidth: 1024,
    currentWidth: function() {
        return window.innerWidth >= $(document).width() ? window.innerWidth : $(document).width();
    },
    isMobile: function() {
        return this.currentWidth() <= this.mobileWidth;
    },
    isWeb: function() {
        return this.currentWidth() > this.tabletWidth;
    }
};

$(function() {
    $('body').on('click', '.btn_vod', function(e) {
        e.preventDefault();
        var src = $(this).attr('data-src');
        var title = $(this).attr('data-title');
        if (title == undefined) {
            title = "vod"
        }
        if ($("html").attr("lang") == "zh") {
            var regExp = /^.*((youku.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = src.match(regExp);
            if (match && match[7].length > 0) {
                var player = new YKU.Player('youkuplayer', {
                    styleid: '0',
                    client_id: '2db2c373613e62cd',
                    vid: match[7], //video ID
                    newPlayer: true
                });

            }
        }
        $('.layer_inner.video').find('.layer_cnt').html('<iframe class="youtube" width="100%" frameborder="0" allowfullscreen src="' + src + '" title="' + title + '"></iframe>');
    })
    $('body').on('click', '.layer_inner.video .pop_close', function(e) {
        e.preventDefault();
        $('.layer_inner.video').find('.layer_cnt').html('<iframe class="youtube" width="100%" frameborder="0" allowfullscreen ></iframe>');
        window.history.go(-1);
    });
    $('body').on('click', '.layer_inner.video2 .pop_close', function(e) {
        e.preventDefault();
        $('.layer_inner.video2').find('#youkuplayer').empty();
        window.history.go(-1);
    });
    $('body').on('click', "[onclick^='layerpop.showLayerPop']", function(e) {
        SDS_COMMON.layerPopup = $(this);
    });
});

(function($) {

    layerpop = {
        showLayerPop: function(layerId) {
            var $windowScrollTop = $(window).scrollTop();

            var $layerId = $("#" + layerId);
            var $layerW = $layerId.width(),
                $layerH = $layerId.height();

            $layerId.css({
                marginLeft: -($layerW / 2),
                marginTop: -($layerH / 2)
            });

            if (!$layerId.hasClass('m_full')) {
                $("body").on('touchmove', function(e) { e.preventDefault() });
            } else if (SDS_COMMON.currentWidth() < 767) {
                $("html, body").addClass("oh");
            }

            if ($layerId.find("video").length) {
                var vid = $layerId.find("video").get(0);
                vid.currentTime = 0;
                vid.play();
            };

            $(window).on("resize", function() {
                var $layerW = $layerId.width(),
                    $layerH = $layerId.height();
                $layerId.css({
                    marginLeft: -($layerW / 2),
                    marginTop: -($layerH / 2)
                });

                $cnt = $layerId.find(".layer_cnt");
                $cnt.css({ top: "0", marginTop: "" });
            });

            $("body").append('<div id="dim"></div>');

            if ($layerId.hasClass("l_use")) {
                $("#dim").addClass("type2");
                history.pushState(null, null, location.href);
                window.onpopstate = function(event) {
                    if ($layerId.hasClass("l_use")) {
                        $layerId.hide();
                        $("#dim").remove();
                        $("body").off('touchmove');
                    }
                }
            } else if ($layerId.hasClass("full")) {
                history.pushState(null, null, location.href);
                window.onpopstate = function(event) {
                    if ($layerId.hasClass("full")) {
                        $layerId.hide();
                        $("#dim").remove().off("touchmove");
                        $("html").removeClass("oh");
                        $('.layer_inner.video').find('.layer_cnt').html('<iframe class="youtube" width="100%" frameborder="0" allowfullscreen ></iframe>');
                        $("body").off('touchmove');
                        //$("body").removeAttr("style").unbind('touchmove');
                        if ($layerId.find("video").length) {
                            var vid = $layerId.find("video").get(0);
                            vid.currentTime = 0;
                            vid.pause();
                        };

                        // youtube stop
                        if ($layerId.find(".youtube").length) {
                            $layerId.find(".youtube")[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                        }
                    }
                }
            } else {
                $("#dim").removeClass("type2");
            }

            (function() {
                /* 20220331 웹접근 작업 : 삭제 */

                    // var inFocusEl = $layerId.find('a, button, input');
                    // var getFocusEl = $layerId.find('a, button, input, iframe, .layer_tit, .tit, .descriptions');
                    // var getFirstFocusEl = inFocusEl.first() || $layerId;

                    // 팝업 진입 포커스 설정
                    // function setFocusElement() {
                    //     if (getFocusEl.length) {
                    //         getFocusEl.each(function() {
                    //             var thisEl = $(this);

                    //             if (thisEl.is(':visible')) {
                    //                 if (thisEl.is('iframe')) {
                    //                     getFirstFocusEl = $layerId;
                    //                     return false;
                    //                 } else if (thisEl.is('.descriptions')) {
                    //                     getFirstFocusEl = thisEl.children().first();
                    //                     return false;
                    //                 } else {
                    //                     getFirstFocusEl = thisEl;
                    //                     return false;
                    //                 }
                    //             }
                    //         });
                    //     }
                    // }

                /* //20220331 웹접근 작업 : 삭제 */

                // 팝업 진입 포커스 요소로 초점 이동
                function setFocus() {

                    /* 20220331 웹접근 작업 : 수정 */
                    //$layerId.attr("tabindex", 0).focus(); //20220331 웹접근 작업 : 삭제
                    $layerId.focus(); //20220331 웹접근 작업 : 수정
                    // getFocusEl.attr('tabindex', '0'); //20220331 웹접근 작업 : 삭제


                    /* ------------------------------------------------------------------------------------------------------------------------------------- */
                    var thisPop = SDS_COMMON.layerPopup;
                    var popContents = $layerId.find(".layer_inner");
                    var popCloseBtn = popContents.find(".layer-pop__close");
                    var popTabFocus = popContents.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
                    var popTabFirst = popTabFocus && popTabFocus.first();
                    var popTabLast = popTabFocus && popTabFocus.last();
                    var tabDisable;

                    function popClosefocus() {
                        $layerId.hide();
                        if (tabDisable === true) lpObj.attr("tabindex", "-1");
                        thisPop.focus();
                        $(".pop_close, .cookiePopup_close, .close, .cancel").off('click', onClose);
                    }

                    popTabFocus.length ? popTabFirst.focus().on("keydown", function(event) {
                        // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
                        if (event.shiftKey && (event.keyCode || event.which) === 9) {
                            // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
                            event.preventDefault();
                            popTabLast.focus();
                        }
                    }) : lpObj.attr("tabindex", "0").focus().on("keydown", function(event) {
                        tabDisable = true;
                        if ((event.keyCode || event.which) === 9) event.preventDefault();
                        // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
                    });

                    popTabLast.on("keydown", function(event) {
                        if (!event.shiftKey && (event.keyCode || event.which) === 9) {
                            // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
                            event.preventDefault();
                            popTabFirst.focus();
                        }
                    });

                    popCloseBtn.on("click", popClosefocus); // 닫기 버튼 클릭 시 레이어 닫기
                    /* ------------------------------------------------------------------------------------------------------------------------------------- */
                    /* //20220331 웹접근 작업 : 수정 */

                }

                $layerId.attr({ 'role': 'alertdialog' }).show().attr('tabindex', '0').focus();

                //setFocusElement(); //20220331 웹접근 작업 : 삭제

                setTimeout(setFocus, 300); // 210527 | 접근성 | IOS Focus Issue 시간 100 -> 300 늘림
                // $layerId.find('span.blind').length && $layerId.find('span.blind').attr({"tabindex": "-1"}).focus();
                // $layerId.find('.ytp-title-link').length && $layerId.find('.ytp-title-link').focus();
                $(".pop_cont > div").off('touchmove');
                
                /* 20220331 웹접근 작업 : 삭제 */

                    // 팝업 포커스 아웃 막기
                    // $layerId.on("keydown", function(e) {
                    //     e.stopPropagation();

                    //     if ($layerId.is($(e.target))) {
                    //         if (e.keyCode == 9 && e.shiftKey) getFocusEl.first().focus();
                    //     }

                    //     if (getFocusEl.first().is($(e.target))) {
                    //         if (e.keyCode == 9 && e.shiftKey) getFocusEl.last().focus();
                    //     }

                    //     if (getFocusEl.last().is($(e.target))) {
                    //         if (e.keyCode == 9 && !e.shiftKey) getFocusEl.first().focus();
                    //     }
                    //     /* 210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                    //     //esc key close
                    //     if (e.keyCode === 27) {
                    //         closeDiv();
                    //     }
                    //     /* //210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                    // })

                
                    /* 210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
                    // var ariahidden = $('#skip_navi, header, footer > div:not(.layer_wrap), #container');
                    // ariahidden.attr({
                    //     "aria-hidden": true,
                    //     tabindex: -1
                    // });
                    /* //210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */

                /* //20220331 웹접근 작업 : 삭제 */

            })();

            function onClose() {
                if ((this.innerHTML == '동의' || this.innerHTML == 'Agree' || this.innerHTML == 'CONFIRM') && this.parentElement.parentElement.parentElement.parentElement.id == "term_all") {
                    var elMandChecked = $(".term_box .mand");
                    if (elMandChecked.length) {
                        var allChecked = true;
                        elMandChecked.each(function(index, item) {
                            if (!$(item).is(":checked")) {
                                allChecked = false;
                                return false;
                            }
                        })
                        if (allChecked) {
                            closeDiv();
                        }
                    } else {
                        if ($("#ck_all").is(":checked") || ($("#checkbox1_1").is(":checked") && $("#checkbox2_1").is(":checked") && $("#checkbox3_1").is(":checked") && $("#checkbox4_1").is(":checked"))) {
                            closeDiv();
                        }
                    }
                } else if (this.innerHTML == 'close' || this.innerHTML == 'CONFIRM') {
                    closeDiv();
                } else if ($("#term_all .error_msg").html()) {
                    $("#term_all .error_msg").show();
                    closeDiv();
                } else {
                    closeDiv();
                }
            }

            function closeDiv() {
                $layerId.hide();
                $("#dim").remove().off("touchmove");
                $("html,body").removeClass("oh");

                $("body").off('touchmove');
                closeLayerPop($layerId);

                $(".pop_close, .cookiePopup_close, .close, .cancel").off('click', onClose);
            }
            $(".pop_close, .cookiePopup_close, .close, .cancel").on("click", onClose);
        },
        close: function(layerId) {
            var $layerId = $("#" + layerId);
            $layerId.hide();
            $("#dim").remove();
            closeLayerPop($layerId);
            // 20200317 제보하기 제출 성공 팝업 오류
            // SDS_COMMON.layerPopup.attr('tabindex', '0').focus();

        }
    };

    function closeLayerPop(layerId) {
        /* 210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
        var ariahidden = $('#skip_navi, header, footer > div:not(.layer_wrap), #container');
        ariahidden.removeAttr("tabindex");
        ariahidden.removeAttr("aria-hidden");
        /* //210511 | 접근성 | 팝업 밑에 텍스트 초점안가게 */
        if (layerId.find("video").length) {
            var vid = layerId.find("video").get(0);
            vid.currentTime = 0;
            vid.pause();
        };
        // youtube stop
        if (layerId.find(".youtube").length) {
            layerId.find(".youtube")[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        }
        if (SDS_COMMON.layerPopup != null) {
            if (SDS_COMMON.layerPopup.hasClass('btn_owl')) {
                var parentEl = SDS_COMMON.layerPopup.closest('.owl-item');
                var targetEl = parentEl.hasClass('center') ?
                    parentEl.find('.im > .btn_owl') :
                    parentEl.siblings('.center').find('.im > .btn_owl');
                targetEl.focus();
            }
            if (SDS_COMMON.layerPopup.hasClass('ip_btn') && SDS_COMMON.layerPopup.children().length) {
                
                // SDS_COMMON.layerPopup.children(':first').attr('tabindex', '0').focus(); //20220331 웹접근 작업 : list에 a링크에 tabindex가 붙어서 두번 탭이 됬었던 이슈 삭제
                SDS_COMMON.layerPopup.focus(); //20220331 웹접근 작업 : 수정
                
            } else {
                /* 210527 | 접근성 | IOS Focus Issue settimeout추가 */
                setTimeout(function() {
                    SDS_COMMON.layerPopup.attr('tabindex', '0').focus();
                }, 300);
                /* //210527 | 접근성 | IOS Focus Issue settimeout추가 */
            }
        }
    }
})(jQuery);
