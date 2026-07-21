var searchListMenu;

$(document).ready(function() {
    var categoryMenu = new categoryMenuBar('.categoryBar');
    searchListMenu = new categoryMenuBar('.searchListMenu', { hideArrow: true, widthForHideArrow: 1360 });
    // lazyLoad onload - start
    // if ($('.lozad').length) {
    //   var observer = window.lozad();
    //   observer.observe();
    // }
    // lazyLoad onload - end

    // Swiper onload - start
    var $doc = $(window.document);
    var fSwiper; // featured article swiper
    var bSwiper // blog card list swiper
    var wSwiper // wide card list swiper
    var tsSwiper // thumb side grayCard list swiper
    var fourSwiper // Four list swiper
    var useSwiper_1 // use cases swiper
    var useSwiper_2 // use cases swiper
    var themeSol_1 // slideCardBox one list swiper
    var themeSol_2 // slideCardBox Two list swiper
    var themeSol_3 // slideCardBox Three list swiper
    var themeSol_4 // slideCardBox list swiper has slides more than three
    var themeSol_5 // slideCardBox list swiper has slides more than three
    var themeSol_6 // slideCardBox list swiper has slides more than three
    var themeSol_7 // slideCardBox list swiper has slides more than three
    var themeSol_8 // slideCardBox list swiper has slides more than three
    var nSwiper // navigation swiper
    var fSwiperMarginProps;
    var bSwiperMarginProps;
    var fourSwiperMarginProps;
    var useSwiperMarginProps; // use cases swiper
    var themeSwiperMargin;
    var wSwiperMarginProps;
    var tsSwiperMarginProps;
    var nSwiperMarginProps;
    var wSwiperOptions;
    var tsSwiperOptions;

    if ($doc.find('.featured_slide').length) {
        var fSwiperOptions = {
            breakpoints: {
                768: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                }
            },
            slidesPerView: 3,
            slidesPerGroup: 3,
        };
        fSwiperMarginProps = 0.067 / 2;

        fSwiper = initSwiper('.featured_slide', fSwiperOptions, 768);
        fSwiper.resize = resizeHandlerWithLoop;
    }

    // 뉴스룸 > 언론보도 슬라이드
    if ($doc.find('.navigationSlide').length) {
        var nSwiperOptions = {
            slidesPerView: 1,
            slidesPerGroup: 1,
            navigation: {
                nextEl: '.navigationSlide .swiper-button-next',
                prevEl: '.navigationSlide .swiper-button-prev',
            },
            centeredSlides: true,
        };
        nSwiper = initSwiper('.navigationSlide', nSwiperOptions, 768);
    }

    if ($doc.find('.bloggerCardList_swiper').length) {
        var bSwiperOptions = {
            breakpoints: {
                1220: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                }
            },
            slidesPerView: 5,
            slidesPerGroup: 5,
        }
        bSwiperMarginProps = 0.134 / 4;
        bSwiper = initSwiper('.bloggerCardList_swiper', bSwiperOptions, 1220);
        bSwiper.resize = resizeHandlerWithLoop;
    }

    if ($doc.find('.four_swiper').length) {
        var fourSwiperOptions = {
            slidesPerView: 4,
            slidesPerGroup: 4,
            breakpoints: {
                1024: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                }
            }
        }
        //fourSwiperMarginProps = 0.134 / 4;
        $(window).resize(function() {
            if (SDS_COMMON.currentWidth() >= 1025) {
                fourSwiper.params.onlyExternal = true;
                fourSwiper.params.simulateTouch = false;
            } else {
                fourSwiper.params.onlyExternal = false;
                fourSwiper.params.simulateTouch = true;
            }
        });
        fourSwiper = initSwiper('.four_swiper', fourSwiperOptions, 1024);
        // fourSwiper.resize = resizeHandlerWithLoop;
    }

    if ($doc.find('.use_1').length) {
        var useSwiperOptions = {
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    loop: true,
                }
            },
            slidesPerView: 3,
            slidesPerGroup: 3,
            loop: false,
        }
        // useSwiperMarginProps = 0.067 / 2;
        useSwiperMarginProps = 0.134 / 4;
        useSwiper_1 = initSwiper('.use_1', useSwiperOptions, 767);
        useSwiper_1.resize = resizeHandlerWithLoop;
        useSwiper_1.resize(useSwiper_1, 767, useSwiperMarginProps);
    }
    if ($doc.find('.use_2').length) {
        var useSwiperOptions = {
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    loop: true,
                }
            },
            slidesPerView: 3,
            slidesPerGroup: 3,
            loop: false,
        }
        // useSwiperMarginProps = 0.067 / 2;
        useSwiperMarginProps = 0.134 / 4;
        useSwiper_2 = initSwiper('.use_2', useSwiperOptions, 767);
        useSwiper_2.resize = resizeHandlerWithLoop;
        useSwiper_2.resize(useSwiper_2, 767, useSwiperMarginProps);
    }

    // if ($doc.find('.slideCardBox.is_one').length) {
    if ($doc.find('.sol_1').length) {
        var themeSol_1Options = {
            loop: false,
        }
        themeSwiperMargin = 0.169 / 4;
        themeSol_1 = initSwiper('.sol_1', themeSol_1Options, 1024);
        themeSol_1.resize = resizeHandler;
    }
    // if ($doc.find('.slideCardBox.is_two').length) {
    if ($doc.find('.sol_2').length) {
        var themeSol_2Options = {
            loop: false,
        }
        themeSwiperMargin = 0.169 / 4;
        themeSol_2 = initSwiper('.sol_2', themeSol_2Options, 1024);
        themeSol_2.resize = resizeHandler;
    }
    if ($doc.find('.sol_3').length) {
        var themeSol_3Options = {
            loop: false,
        }
        themeSwiperMargin = 0.169 / 4;
        themeSol_3 = initSwiper('.sol_3', themeSol_3Options, 1024);
        themeSol_3.resize = resizeHandler;
    }

    if ($doc.find('.sol_4').length) {
        var themeSol_4Options = {
            loop: false,
        }
        themeSwiperMargin = 0.169 / 4;
        themeSol_4 = initSwiper('.sol_4', themeSol_4Options, 1024);
        themeSol_4.resize = resizeHandler;
    }

    if ($doc.find('.sol_5').length) {
        var themeSol_5Options = {
            loop: false,
        }
        themeSwiperMargin = 0.169 / 4;
        themeSol_5 = initSwiper('.sol_5', themeSol_5Options, 1024);
        themeSol_5.resize = resizeHandler;
    }
    if ($doc.find('.sol_6').length) {
        var showPagination = function(paginationContainer) {
            $(paginationContainer).show();
        }
        var themeSol_6Options = {
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            showPagination: showPagination
        }
        themeSwiperMargin = 0.169 / 4;
        themeSol_6 = initSwiper('.sol_6', themeSol_6Options, 1024);
        themeSol_6.resize = resizeHandler;
    }
    if ($doc.find('.sol_7').length) {
        // var themeSol_7Options = {
        //   loop: false,
        // }
        // themeSwiperMargin = 0.169 / 4;

        // themeSol_7 = initSwiper('.sol_7', themeSol_7Options, 1024);
        // themeSol_7.resize = resizeHandler;
        var showPagination = function(paginationContainer) {
            $(paginationContainer).show();
        }
        var themeSol_7Options = {
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            showPagination: showPagination
        }
        themeSwiperMargin = 0.169 / 4;
        themeSol_7 = initSwiper('.sol_7', themeSol_7Options, 1024);
        themeSol_7.resize = resizeHandler;
    }
    if ($doc.find('.sol_8').length) {
        var themeSol_8Options = {
            loop: false,
        }
        themeSwiperMargin = 0.169 / 4;
        themeSol_8 = initSwiper('.sol_8', themeSol_8Options, 1024);
        // themeSol_8.resize = resizeHandler;
    }

    wSwiperOptions = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        direction: 'horizontal',
        loop: true,
    };

    wSwiperMarginProps = 0.085 / 5;
    wSwiper = initMobileSwiper(wSwiper, '.wideCardList_swiper', wSwiperOptions, wSwiperMarginProps);

    tsSwiperOptions = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        direction: 'horizontal',
        loop: true,
    };

    tsSwiperMarginProps = 0.085 / 5;
    tsSwiper = initMobileSwiper(tsSwiper, '.thumbList.is_side.is_grayCard', tsSwiperOptions, tsSwiperMarginProps);

    $(window).on('resize', function() {
        fSwiper && fSwiper.resize(fSwiper, 768, fSwiperMarginProps);
        // nSwiper && nSwiper.resize(nSwiper, 768, nSwiperMarginProps);
        bSwiper && bSwiper.resize(bSwiper, 1220, bSwiperMarginProps);
        //fourSwiper && fourSwiper.resize(fourSwiper, 1024, fourSwiperMarginProps);
        useSwiper_1 && useSwiper_1.resize(useSwiper_1, 767, useSwiperMarginProps);
        useSwiper_2 && useSwiper_2.resize(useSwiper_2, 767, useSwiperMarginProps);
        themeSol_1 && themeSol_1.resize(themeSol_1, 1024, themeSwiperMargin);
        themeSol_2 && themeSol_2.resize(themeSol_2, 1024, themeSwiperMargin);
        themeSol_3 && themeSol_3.resize(themeSol_3, 1024, themeSwiperMargin);
        themeSol_4 && themeSol_4.resize(themeSol_4, 1024, themeSwiperMargin);
        themeSol_5 && themeSol_5.resize(themeSol_5, 1024, themeSwiperMargin);
        themeSol_6 && themeSol_6.resize(themeSol_6, 1024, themeSwiperMargin);
        themeSol_7 && themeSol_7.resize(themeSol_7, 1024, themeSwiperMargin);
        themeSol_8 && themeSol_8.resize(themeSol_8, 1024, themeSwiperMargin);
        wSwiper = initMobileSwiper(wSwiper, '.wideCardList_swiper', wSwiperOptions, wSwiperMarginProps);
        tsSwiper = initMobileSwiper(tsSwiper, '.thumbList.is_side.is_grayCard', tsSwiperOptions, tsSwiperMarginProps);
        categoryMenu.resize();
        searchListMenu.resize();
        digitalItemHeight();
    });
    // Swiper onload - end

    // loadMore onload - start
    // $(".is_loadMore").on("click", function(){
    //   var thumb_hide = $(this).closest(".thumbList").find(".thumb.is_hide");
    //   var thumb_hide_length = thumb_hide.length;
    //   var maxLength = 8;

    //   for (var i = 0; i < thumb_hide_length && i < maxLength; i++) {
    //     $(thumb_hide[i]).removeClass("is_hide");
    //   }

    //   if (thumb_hide_length <= maxLength) {
    //     $(this).parent().html('<a href"#" class="button is_loadMore">View all</a>');
    //   }
    // });
    // loadMore onload - end

    /* is_open - start 2022.06.15 modify */
    $('.categoryBar_dropDown').on("click", function() {
        var $categoryBar = $('.categoryBar.cate_list');
        if (!$(this).hasClass('is_open')) {
            var $body = $('body');
            var $body_height = $body.height();
            var $categoryBar_inner = $('.categoryBar_inner');
            var $win_height = $(window).height(); /* 210525 add */

            /* web/mobile 구분 */
            if ($("html").hasClass("view-w")) {
                $body.css('overflow', '');
                $categoryBar.css('height', 'auto');
                $(this).addClass('is_open');
                $(this).find("button").attr('aria-expanded', 'true');
                // if(!$(this).hasClass('is_open_w')){
                //   $(this).addClass('is_open');
                //   $(this).find("button").attr('aria-expanded','true');
                // }else {
                //   $(this).removeClass('is_open_w');
                //   $categoryBar.css('height','70px'); 
                //   $(this).find("button").attr('aria-expanded','false');
                // }
            } else {
                $(this).addClass('is_open');
                $(this).find("button").attr('aria-expanded', 'true');
                $body.css('overflow', 'hidden');
                $categoryBar_inner.css('max-height', $win_height - ($categoryBar_inner.offset().top - $window.scrollTop())); /* 210525 modify */
                $window.on('scroll.categoryBarHeight touchmove.categoryBarHeight mousewheel.categoryBarHeight', function() {
                    $categoryBar_inner.css('max-height', $win_height - ($categoryBar_inner.offset().top - $window.scrollTop())); /* 210525 modify */
                });
            }
        } else {
            $(this).removeClass('is_open');
            $(this).find("button").attr('aria-expanded', 'false');
            $('body').css('overflow', '');
            if ($("html").hasClass("view-w")) {
                $categoryBar.css('height', '70px');
            }
            $window.off('.categoryBarHeight');
        }
    });
    $('.categoryBar').on("mouseleave", function() {
        if (!$("html").hasClass("view-w")) { /* 2022.06.15 web 이외 디바이스에서만 작동 */
            $(this).find(".categoryBar_dropDown").removeClass('is_open');
            $(this).find("button:not(.category_prev, .category_next)").attr('aria-expanded', 'false'); //220330 | 접근성 | aria-expanded 속성 좌우버튼은 제외
        }
        $('body').css('overflow', 'visible');
        $window.off('.categoryBarHeight');
    });
    // 하위 아이템 클릭스 overflow 해제
    $('.categoryBar_item').on('click', function() {
        $('body').css('overflow', 'visible');
        $(this).find("button").attr('aria-expanded', 'false'); // 210409 | 접근성 | 오류 수정
    })
    $('.categoryBox_btn').on("click", function() {
        $(this).toggleClass('is_open');
    });
    $('.categoryBox').on("mouseleave", function() {
        $(this).find(".categoryBox_btn").removeClass('is_open');
    });
    // is_open - end

    // is_open - start
    /* 210409 | 접근성 | button aria-expanded 속성 추가 */
    $('.searchListMenu_dropDown').on("click", function() {
        $(this).toggleClass('is_open');
        if ($(this).hasClass('is_open')) {
            $(this).find('button').attr("aria-expanded", "true");
        } else {
            $(this).find('button').attr("aria-expanded", "false");
        }
    });
    $('.searchListMenu').on("mouseleave", function() {
        $(this).find('button').attr("aria-expanded", "false");
        $(this).find(".searchListMenu_dropDown").removeClass('is_open');
    });
    $('.searchListMenu_container .searchListMenu_item a').on("click", function() {
        $("#clickMenuCnt").attr("aria-expanded", "false");
    });
    /* //210409 | 접근성 | button aria-expanded 속성 추가 */
    // is_open - end

    /* 20220804 : 이벤트 리스트 페이지 리뉴얼 */
    var eventSelectFilter = $('.searchSort_select.event_select .select_box');

    eventSelectFilter.each(function(index, element){
        var eventSelectFilterListContainer = $(element).find('.list');
        var eventSelectFilterLisBtn = eventSelectFilterListContainer.find('li a');

        eventSelectFilterLisBtn.on('click', function(){
            var _this = $(this);
            var eventSelectFilterBtnName = $('.select_btn span');
    
            _this.closest('.searchSort_select').find(eventSelectFilterBtnName).text($(this).text());
            eventSelectFilterListContainer.slideUp("fast");
        });
    });

    /* 211230 | Add search sort select */
    $('.searchSort_select .select_btn').on("click", function() {
        $(this).parents('.select_box').toggleClass('on');
        if ($(this).parents('.select_box').hasClass('on')) {
            $(this).attr("aria-expanded", "true");
            $(this).siblings('.list').slideDown("fast");
        } else {
            $(this).attr("aria-expanded", "false");
            $(this).siblings('.list').slideUp("fast");
        }
    });

    $('.searchSort_select .select_box .list li a').on({
        click: function(e){
            $('.searchSort_select .select_box .list li a').attr("aria-selected", false);
            $('.searchSort_select .select_box').removeClass("on");
            $('.searchSort_select .select_box button').attr("aria-expanded","false");
            $('.searchSort_select .select_box .list').slideUp("fast");
        },
        focus: function(e) {
            $('.searchSort_select .select_box .list li a').attr("aria-selected", false);
            $(this).attr("aria-selected", "true");
        },
        focusout: function(e) {
            $('.searchSort_select .select_box .list li a').attr("aria-selected", false);
        }
    });
    $('.searchSort_select .select_box').on({
        mouseleave: function() {
            $(this).find('button').attr("aria-expanded", "false");
            $(this).find('.list').slideUp("fast");
            $(this).removeClass('on');
        }
    });
    $('.searchSort_select .select_box .list').on({
        keydown: function(e) {
            e.stopPropagation();
            var $target = $(e.target);
            var keycode = e.keyCode;
            switch (keycode) {
                case 9:
                    e.preventDefault();
                    $('.searchSort_select .select_box').removeClass("on");
                    $('.searchSort_select .select_box button').attr("aria-expanded", "false");
                    $('.searchSort_select .select_box .list').slideUp("fast");
                    break;
                case 38:
                    e.preventDefault();
                    if ($target.parent().index() > 0) $target.parent().prev().find("a").focus();
                    break;
                case 40:
                    e.preventDefault();
                    var len = $target.parents(".list").children().length - 1;
                    if ($target.parent().index() < len) $target.parent().next().find("a").focus();
                    break;
            }
        }
    });
    /* //211230 | Add search sort select */


    // is_open - start
    $('.scrollCategoryBox_dropDown').on("click", function() {
        $(this).toggleClass('is_open');
    });
    $('.scrollCategoryBox').on("mouseleave", function() {
        $(this).find(".scrollCategoryBox_dropDown").removeClass('is_open');
    });
    // is_open - end

    // is_open - start
    $('.btn_commentMore').on("click", function() {
        $(this).toggleClass('is_open');
    });
    // is_open - end


    /* 윤리 & 준법경영 아코디언 메뉴(연도별 아코디언 메뉴) */
    var historyContet = $('.history-accordian'),
        historyAccordianMenu = historyContet.find('.history-accordianMenu_list'),
        historyAccordianlist = historyAccordianMenu.find('li'),
        historyAccordianMenuBtn = historyAccordianlist.find('a'),
        historyContents = $('.history-accordian_content dl');

    historyAccordianMenuBtn.on('click', function(e) {
        e.preventDefault();
        $(this).closest("li").find(historyContents).slideToggle(300);
        $(this).closest("li").siblings("li").find(historyContents).slideUp(300);
        $(this).toggleClass('on').closest("li").siblings("li").find("a").removeClass('on');
        $(this).closest("li").find(historyContents).toggleClass('active').closest("li").siblings("li").find(historyContents).removeClass('active');

        var _self = this;
        setTimeout(function() {
            theOffset = $(_self).offset();
            $('body,html').animate({ scrollTop: theOffset.top - 60 });
        }, 500);
    });

    //is_focus - start
    $('.subscribeSend_input').on('keyup', function() {
        if (this.value.length >= 1) {
            $(".subscribeSend_btn").addClass('is_focus');
        } else {
            $(".subscribeSend_btn").removeClass('is_focus');
        }
    });
    //is_focus - end

    // sidSticky - start
    var sideStickyWrap = $('.sideStickyWrap');
    if (sideStickyWrap.length) {
        sideSticky();
        $('.sideStickyWrap .is_loadMore').on('click', function() {
            sideSticky();
        });
        function sideSticky() {
            $(window).on('resize', function() {
                var window_width = $(window).width();
                if (window_width >= 1300) {
                    var options = { offset_top: 100 };
                    if (0 >= $doc.find('.categoryBar_wrapper').length) {
                        options = { offset_top: 30 };
                    }
                    $("#sticky-sidebar").stick_in_parent(options);
                } else {
                    // $("#sticky-sidebar").off();
                    $("#sticky-sidebar").trigger("sticky_kit:detach");
                }
            });
        }
    }
    // sidSticky - end

    // sticky - start
    if ($('.is_sticky').length) {
        var $is_stiky = $('.is_sticky');
        var $is_stiky_height = $is_stiky.height();
        var $is_stiky_offsetTop = $('.is_sticky').offset().top;
        var $window = $(window);
        var brake_target_length = false;
        var $brake_target = $('.button.is_loadMore');

        if ($brake_target.length) {
            var brake_target_length = true;
            function brake_target() {
                var $brake_target_offset_top = $brake_target.offset().top;
                var $brake_target_offset_bottom = $brake_target_offset_top - $is_stiky_height;
                if ($brake_target_offset_bottom < $window.scrollTop()) {
                    $('.is_sticky').addClass('is_brake');
                } else {
                    $('.is_sticky').removeClass('is_brake');
                }
            }
        }

        $window.on('resize', function() {
            $is_stiky.removeClass('is_onSticky');
            $is_stiky_offsetTop = $('.is_sticky').offset().top;
            is_sticky();
            if (brake_target_length) {
                brake_target();
            }
            $window.on('scroll touchmove mousewheel', function() {
                is_sticky();
                if (brake_target_length) {
                    brake_target();
                }
            });
            /* S: 2022.06.21 Add - window resize 시 web 이외 적용 */
            if (!$("html").hasClass("view-w")) {
                $(".categoryBar.cate_list").css('height', 'auto');
                $('.categoryBar_dropDown').removeClass('is_open');
                $('.categoryBar_dropDown').find("button").attr('aria-expanded', 'false');
            } /* E: 2022.06.21 Add */
        });

        function is_sticky() {
            /* S: 2022.06.21 Add */
            var $categoryBar = $(".categoryBar.cate_list"),
                $categoryBarDropDown = $('.categoryBar_dropDown');
            /* E: 2022.06.21 Add */

            if ($window.scrollTop() >= $is_stiky_offsetTop) {
                /* S: 2022.06.15 web Add */
                if ($("html").hasClass("view-w")) {
                    $categoryBarDropDown.removeClass('is_open');
                    //$categoryBarDropDown.removeClass('is_open_w');
                    $categoryBarDropDown.find("button").attr('aria-expanded', 'false');
                    $categoryBar.css('height', '70px');
                } /* E: 2022.06.15 web Add */

                $is_stiky.addClass('is_onSticky');
                if ($(".is_sticky_box").length == 0) {
                    $is_stiky.after('<div class="is_sticky_box"></div>');
                    $('.is_sticky_box').height($is_stiky.height());
                }
            } else {
                /* S: 2022.06.15 web Add */
                if ($("html").hasClass("view-w")) {
                    $categoryBar.css('height', 'auto');
                    $categoryBarDropDown.addClass('is_open');
                    $categoryBarDropDown.find("button").attr('aria-expanded', 'true');
                } else {
                    $categoryBar.css('height', '');
                    //$categoryBarDropDown.removeClass('is_open');
                    //$categoryBarDropDown.find("button").attr('aria-expanded','false');  
                } /* E: 2022.06.15 web Add */

                $is_stiky.removeClass('is_onSticky');
                $(".is_sticky_box").remove();
            }
        };
        is_sticky();
    }
    // sticky - end

    // relatedSolutions - start
    var relatedSolutionsyWrap = $('.relatedSolutions');
    if (relatedSolutionsyWrap.length) {
        $('.relatedSolutions .btn_thumView').on('click', function() {
            $(this).parents('.relatedSolutions').toggleClass('is_active');
        });
    }
    // relatedSolutions - end

    // Checkbox -toggle - start
    $("[name=checkAll]").click(function() {
        allCheckFunc(this);
    });
    $("[name=checkOne]").each(function() {
        $(this).click(function() {
            oneCheckFunc($(this));
        });
    });
    // Checkbox -toggle - end

    // tabControlBox - start
    if ($('.tabControlBox').length) {
        var $tabControlBox = $('.tabControlBox')
        var $tabControlBox_content = $('.tabControlBox_content');
        var test_num;
        function tabControlBox() {
            if (SDS_COMMON.currentWidth() > 1299) {
                $tabControlBox_content.removeClass('is_hide');
                $('.tabControlBox .tabControlBox_item').off('click');
            } else {
                for (var i = 0; i < $('.tabControlBox .tabControlBox_item').length; i++) {
                    if ($($('.tabControlBox .tabControlBox_item')[i]).hasClass('is_open')) {
                        test_num = i;
                    }
                }
                $tabControlBox_content.addClass('is_hide');
                $tabControlBox_content.eq(test_num).removeClass('is_hide');
                $('.tabControlBox .tabControlBox_item').on('click', function() {
                    event.preventDefault();
                    $('.tabControlBox .tabControlBox_item').removeClass('is_open');
                    $(this).addClass('is_open');
                    $('.tabControlBox .tabControlBox_item').attr({ 'aria-selected': false });
                    $(this).addClass('is_open').attr({ 'aria-selected': true });
                    for (var i = 0; i < $('.tabControlBox .tabControlBox_item').length; i++) {
                        if ($($('.tabControlBox .tabControlBox_item')[i]).hasClass('is_open')) {
                            test_num = i;
                        }
                    }
                    $tabControlBox_content.addClass('is_hide');
                    $tabControlBox_content.eq(test_num).removeClass('is_hide');
                });
            }
        }
        tabControlBox();
        $(window).on('resize', function() {
            tabControlBox()
        });
    }
    var tabController0 = initTabController('.tabController.is_0', clickFunction, themeSolFunction);
    var tabController1 = initTabController('.tabController.is_1', clickFunction, themeSolFunction);
    var tabController2 = initTabController('.tabController.is_2', clickFunction, themeSolFunction);
    var tabController2_tab = initTabController('.tabController.is_2tab', clickFunction, themeSolFunction);
    var tabController3 = initTabController('.tabController.is_3', clickFunction);

    function clickFunction(_clickedIndex, _this) {
        var tabController_item_mobile_length = $('.tabController.is_3 .tabController_item').length;
        var tabController_item_pc0_length = $('.tabController.is_0 .tabController_item').length;
        var tabController_item_pc1_length = $('.tabController.is_1 .tabController_item').length;
        var tabController_item_pc2_length = $('.tabController.is_2tab .tabController_item').length;
        if (_clickedIndex >= 10 && _clickedIndex <= 10 + tabController_item_pc0_length - 1) {
            $('.tab_wrap .tab li a').eq(0).trigger('click');
            $('.tabController.is_0 .tabController_btn').eq(_clickedIndex - 10).trigger('click');
        } else if (_clickedIndex >= 10 + tabController_item_pc0_length && _clickedIndex < 10 + tabController_item_pc0_length + tabController_item_pc1_length) {
            $('.tab_wrap .tab li a').eq(1).trigger('click');
            $('.tabController.is_1 .tabController_btn').eq(_clickedIndex - 10 - tabController_item_pc0_length).trigger('click');
        } else if (_clickedIndex >= 10 + tabController_item_pc0_length + tabController_item_pc1_length - 1) {
            $('.tab_wrap .tab li a').eq(2).trigger('click');
            $('.tabController.is_2tab .tabController_btn').eq(_clickedIndex - 10 - tabController_item_pc0_length - tabController_item_pc1_length).trigger('click');
        }

        if ($(_this).parents('.tabController').hasClass('is_0')) {
            $('.tabController.is_3 .tabController_item').eq($(_this).parent('li').data('index')).trigger('click');
            if ($(_this).data('text')) {
                $('.tabController.is_3 .tabController_dropDown .txt').text($(_this).data('text'));
            } else {
                $('.tabController.is_3 .tabController_dropDown .txt').text($(_this).text());
            }
        } else if ($(_this).parents('.tabController').hasClass('is_1')) {
            $('.tabController.is_3 .tabController_item').eq($(_this).parent('li').data('index') - tabController_item_pc0_length + 1).trigger('click');
            if ($(_this).data('text')) {
                $('.tabController.is_3 .tabController_dropDown .txt').text($(_this).data('text'));
            } else {
                $('.tabController.is_3 .tabController_dropDown .txt').text($(_this).text());
            }
        } else if ($(_this).parents('.tabController').hasClass('is_2tab')) {
            $('.tabController.is_3 .tabController_item').eq($(_this).parent('li').data('index') - tabController_item_pc0_length - tabController_item_pc1_length + 1).trigger('click');
            if ($(_this).data('text')) {
                $('.tabController.is_3 .tabController_dropDown .txt').text($(_this).data('text'));
            } else {
                $('.tabController.is_3 .tabController_dropDown .txt').text($(_this).text());
            }
        }
    }

    $('.tabContent_item').each(function(index, item) {
        $(this).find('>*').attr({ 'role': 'tabpanel' });
    });
    $('.tabController_itemBox, .ebc-tabController_itemBox').each(function(index, item) {
        $(this).attr({ 'id': 'tabController_dropDown_tab' + ++index, 'role': 'tablist', 'aria-labelledby': 'tabController_dropDown_btn' + index });
    });
    $('.tabController').each(function() {
        var txt = $(this).find(".tabController_btn.is_active").text();
        $(this).find(".tabController_dropDown").text('');
        $(this).find(".tabController_dropDown").append("<span class='txt'></span>");
        $(this).find(".tabController_dropDown .txt").text(txt);
        if ($("html").attr("lang") == "ko") {
            $(this).find(".tabController_dropDown").attr({ 'title': '카테고리 선택 리스트 더 보기' });
            $(this).find(".tabController_dropDown").append("<span class='is_blind'>카테고리 선택 리스트 더 보기</span>");
        } else {
            $(this).find(".tabController_dropDown").attr({ 'title': 'View more menu' });
            $(this).find(".tabController_dropDown").append("<span class='is_blind'>View more menu</span>");
        }
    });
    $('.tabController_dropDown, .ebc-tabController_dropDown').each(function(index, item) {
        var _tabController_item = $(this).siblings('.tabController_itemBox, .ebc-tabController_itemBox').attr('id');
        $(this).attr({ 'aria-controls': _tabController_item, 'id': 'tabController_dropDown_btn' + ++index });
    });
    $('.tabController_btn, .ebc-tabController_btn').attr({ 'role': 'tab' });
    $('.office_ac').each(function(index, item) {
        $(this).attr({ 'role': 'tablist' });
    });

    function themeSolFunction() {
        themeSol_1 && themeSol_1.resize(themeSol_1, 1024, themeSwiperMargin);
        themeSol_2 && themeSol_2.resize(themeSol_2, 1024, themeSwiperMargin);
        themeSol_3 && themeSol_3.resize(themeSol_3, 1024, themeSwiperMargin);
        themeSol_4 && themeSol_4.resize(themeSol_4, 1024, themeSwiperMargin);
        themeSol_5 && themeSol_5.resize(themeSol_5, 1024, themeSwiperMargin);
        themeSol_6 && themeSol_6.resize(themeSol_6, 1024, themeSwiperMargin);
        themeSol_7 && themeSol_7.resize(themeSol_7, 1024, themeSwiperMargin);
        themeSol_8 && themeSol_8.resize(themeSol_8, 1024, themeSwiperMargin);
    }

    if ($('.tabController.is_3').length) {
        $(".tab_wrap .tab>ul>li>a").on('click', function() {
            $('.tabController.is_' + $(this).data('index') + ' .tabController_btn.is_active').trigger('click');
        });
    }

    // max_windowHeight
    function windowMaxHeight_m_resize() {
        if ($('.is_windowMaxHeight_m').length) {
            if ($(window).width() < 768) {
                $(".is_windowMaxHeight_m").css('max-height', $(window).height());
            } else {
                $(".is_windowMaxHeight_m").css('');
            }
        }
    }

    function windowMaxHeight_resize() {
        if ($('.is_windowMaxHeight').length) {
            $(".is_windowMaxHeight").css('max-height', $(window).height());
        }
    }
    windowMaxHeight_resize();
    $(window).on('scroll resize', function() {
        windowMaxHeight_resize();
    });

    // image_zoom
    function imageZoom(params) {
        $('.is_imageZoomBox').each(function(index) {
            $this = $(this);
            var image_url = $this.find('.is_imageZoom_img').attr('src');
            $this.find('.is_imageZoom').attr('href', '../common/ly_use_org.html?imgSrc=' + encodeURIComponent(image_url));
        });
    }
    imageZoom();

    //ebcSwiper
    $('.ebc-tabs-area .slideCardBox').each(function() {
        var container = $(this).find('.swiper-container'),
            slides = container.find('.swiper-slide');

        var ebcSwiper = new Swiper(container, {
            // slidesPerView: 3,
            spaceBetween: 50,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            },
            paginationBulletRender: function(swiper, index) {
                return '<a href="#" class="swiper-pagination-bullet" title="go to slide">' + (index + 1) + 'slide</a>'
            }
        });

        function slideChecks() {
            if (SDS_COMMON.currentWidth() >= 1025) {
                if (slides.length >= 4) {
                    container.find('.swiper-pagination, .swiper-button-prev, .swiper-button-next').show();
                    ebcSwiper.params.onlyExternal = false;
                    ebcSwiper.params.slidesPerView = 3;
                } else {
                    ebcSwiper.params.onlyExternal = true;
                    ebcSwiper.params.simulateTouch = false;
                    if (slides.length >= 3) {
                        ebcSwiper.params.slidesPerView = 3;
                    } else {
                        ebcSwiper.params.slidesPerView = 2;
                    }
                }
            } else {
                container.find('.swiper-button-prev, .swiper-button-next').hide();
                if (slides.length < 2) {
                    container.find('.swiper-pagination').hide();
                    ebcSwiper.params.onlyExternal = true;
                    ebcSwiper.params.simulateTouch = false;
                } else {
                    ebcSwiper.params.onlyExternal = false;
                    ebcSwiper.params.simulateTouch = true;
                }
            }
        }
        slideChecks();
        $(window).resize(function() {
            slideChecks();
        });
    });

    /* ebc-tabs-area */
    $('.ebc-tabs-area .ebc-tab-triggers').each(function() {
        var triggers = $(this),
            targets = $(this.hash),
            targets_triggers = targets.find('.ebc-tab-triggers').parents('li'),
            targets_contents = targets.find('.ebc-tab-contents'),
            first_trigger = targets.find('.ebc-tab-triggers:first').parents('li'),
            first_content = targets.find('.ebc-tab-contents:first'),
            controller = $('.ebc-tabController .ebc-tabController_dropDown .ebc-tabController_text');

        triggers.on('click', function(event) {
            var parents = $(this).parents('li');

            triggers.attr({ 'aria-selected': true });
            parents.siblings().find('.ebc-tab-triggers').attr({ 'aria-selected': false });

            targets.add(parents).addClass('active').siblings().removeClass('active');
            if ($(this).parents('ul').hasClass('ebc-key-tabs')) {
                if (!targets_triggers.hasClass('active') && !targets_contents.hasClass('active')) {
                    first_trigger.add(first_content).addClass('active').siblings().removeClass('active');
                }
                if (targets.find('.tabController_itemBox').length) {
                    controller.text(targets.find('.tabController_itemBox').find('.active > a').text());
                } else {
                    controller.text($(this).text());
                }
            } else {
                controller.text($(this).text());
            }
            event.preventDefault();
        });

        $('.ebc-tabs-area .swiper-slide').removeAttr('tabindex aria-hidden');
        if (SDS_COMMON.currentWidth() >= 1025) {
            $('.ebc-tabs-area .thumb_readMore').removeAttr('tabindex aria-hidden');
        }
    });

    /* dongtan Tab */
    if ($('.ebc-tabs-area').length && window.location.hash === "#dongtan") {
        $('.ebc-key-tabs').find('[href="#tab3"]').trigger('click');
        $('html, body').animate({
            scrollTop: $('.ebc-tabs-area').offset().top + 50
        }, 300);
    }

    /* ebc-tabController */
    $('.ebc-tabController .ebc-tabController_dropDown').on('click', function() {
        $(this).toggleClass('is_active');
        $(this).hasClass('is_active') ? $(this).attr('aria-expanded', 'true') : $(this).attr('aria-expanded', 'false');
    });
    $('.ebc-tabController .ebc-tabController_btn').each(function() {
        var triggers = $(this),
            targets = $(this.hash),
            parents = targets.parents('.ebc-tab-contents'),
            targets_triggers = parents.find('.ebc-tab-triggers');

        triggers.on('click', function(event) {
            var current_target = $("[href='" + this.hash + "']"),
                current_target_id = current_target.parents('.ebc-tab-contents').attr('id'),
                real_sds_target = $(this.hash),
                real_sds_target_id = real_sds_target.parents('.ebc-tab-contents').attr('id');

            triggers.attr({ 'aria-selected': true });
            $(this).parents('.ebc-tabController_item').siblings().find('.ebc-tabController_btn').attr({ 'aria-selected': false });
            targets.add(parents).addClass('active').siblings().removeClass('active');
            $('.ebc-tabController_text').text($(this).text());
            $('.ebc-tabController_dropDown').removeClass('is_active');
            $('.ebc-tabController_dropDown').hasClass('is_active') ? $('.ebc-tabController_dropDown').attr('aria-expanded', 'true') : $('.ebc-tabController_dropDown').attr('aria-expanded', 'false');
            current_target.parents('li').addClass('active').siblings().removeClass('active');
            if (real_sds_target) {
                $("[href='#" + real_sds_target_id + "']").parents('li').addClass('active').siblings().removeClass('active');
            } else {
                $("[href='#" + current_target_id + "']").parents('li').addClass('active').siblings().removeClass('active');
            }
            event.preventDefault();
        });
    });

    /* accordion */
    function accordion() {
        var isOneOpen = $('.irEventTab');
        if (isOneOpen.length) {
            openOneAccordion(isOneOpen);
        } else if ($('.accordion').length) {
            $('.accordion').each(function() {
                var $accordion = $(this);
                $accordion.find('.accordion_openBtn').each(function() {
                    var $accordion_openBtn = $(this);
                    $accordion_openBtn.on('click', function() {
                        var $accordion_openBtn_click = $(this);
                        // 하나만 오픈
                        // $accordion_openBtn_click.addClass('is_open').siblings().removeClass('is_open');

                        // 여러개 오픈
                        if ($accordion_openBtn_click.hasClass('is_open')) {
                            close($accordion_openBtn_click);
                        } else {
                            open($accordion_openBtn_click);
                        }
                    });
                });
            });
        }

        // 하나만 오픈
        function openOneAccordion(accordion) {
            accordion.each(function() {
                var accordionBtn = $(this).find('.accordion_openBtn');
                accordionBtn.on('click', function() {
                    var accordionOpenBtn = $(this);
                    if (accordionOpenBtn.hasClass('is_open')) {
                        close(accordionOpenBtn);
                    } else {
                        close(accordionBtn);
                        open(accordionOpenBtn);
                    }
                })
            });
        }

        function open(el) {
            el.addClass('is_open');
            el.attr('aria-expanded', 'true');
        }

        function close(el) {
            el.removeClass('is_open');
            el.attr('aria-expanded', 'false');
        }
    }
    accordion();
    /* /accordion */

    /* digitalItemHeight */
    digitalItemHeight();
    /* //digitalItemHeight */
});

function digitalItemHeight() {
    var OddHeight, EvenHeight;
    var digitalItem = $('.capability_item');
    digitalItem.height("");
    if (SDS_COMMON.currentWidth() > 1024) {
        for (i = 0; i < digitalItem.length; i++) {
            if (i % 2 === 0) {
                OddHeight = digitalItem.eq(i).height();
                EvenHeight = digitalItem.eq(i + 1).height();
                if (OddHeight > EvenHeight) {
                    digitalItem.eq(i + 1).height(OddHeight);
                } else {
                    digitalItem.eq(i).height(EvenHeight);
                }
            }
        }
    }
}

function GetDDay(target, targetTime, progressTime) {
    if ($('.dDay').length) {
        var now = new Date();
        var then = new Date(targetTime);

        function gap_day(gap_input) {
            return gap_input = Math.max(Math.ceil((gap_input / (1000 * 60 * 60 * 24))), 0);
        }
        var gap_endDay = gap_day(then.getTime() - now.getTime());
        if (String(gap_endDay).length == 1) {
            $(".dDay_char.is_num_01").text("0");
            $(".dDay_char.is_num_02").text(gap_endDay);
        } else if (String(gap_endDay).length == 2) {
            $(".dDay_char.is_num_01").text(String(gap_endDay).split('')[0]);
            $(".dDay_char.is_num_02").text(String(gap_endDay).split('')[1]);
        }

        if (targetTime && new Date(targetTime).getTime() - now.getTime() < 0) {
            $('.dDay').hide();
        }

        if (progressTime.length) {
            var stap = [];
            $(progressTime).each(function(index, item) {
                stap[index] = gap_day(new Date(item).getTime() - now.getTime());
                if (stap[index] > 0) {
                    $(target).addClass('is_step_' + (index + 1) + '');
                    return false;
                }
                if (index == progressTime.length - 1) {
                    $(target).addClass('is_step_' + (progressTime.length + 1) + '');
                }
            })
        }
    }
}

function initTabController(selector, _clickFunction, _themeSolFunction) {
    var tabController = $(selector);
    var clickFunction = _clickFunction;
    var themeSolFunction = _themeSolFunction;
    if (tabController.length) {
        var tabController_btn = tabController.find('.tabController_btn');
        var tabController_dropDown = tabController.find('.tabController_dropDown');
        var tabContent_item = tabController.siblings('.tabContent').find('.tabContent_item');

        tabController_dropDown.attr('aria-expanded', false);

        tabController_btn.on('click', function() {
            event.preventDefault();
            var clickedIndex = $(this).parent('li').data('index');
            tabController_dropDown.find('.txt').text($(this).text());
            tabController_btn.removeClass('is_active');
            tabContent_item.removeClass('is_active');
            tabController_btn.eq(clickedIndex).addClass('is_active');
            tabContent_item.eq(clickedIndex).addClass('is_active');
            if (tabController_dropDown.hasClass('is_active')) {
                tabController_dropDown.removeClass('is_active');
            }
            tabController_dropDown.attr('aria-expanded', false);
            tabController_btn.attr({ 'aria-selected': false });
            $(this).attr({ 'aria-selected': true });

            themeSolFunction && themeSolFunction();
            clickFunction && clickFunction(clickedIndex, this);
        });
        tabController_dropDown.on('click', function() {
            tabController_dropDown.toggleClass('is_active');
            if (tabController_dropDown.hasClass('is_active')) {
                tabController_dropDown.attr('aria-expanded', 'true');
            } else {
                tabController_dropDown.attr('aria-expanded', 'false');
            }
        });
        tabController.on('mouseleave', function() {
            tabController_dropDown.removeClass('is_active');
            tabController_dropDown.attr('aria-expanded', 'false');
        });
    }
}

var initMobileSwiper = function(swiper, target, options, marginProps) {
    var $doc = $(window.document);
    if ($doc.find(target).length) {
        if (!swiper && SDS_COMMON.currentWidth() < 768) {
            marginProps = marginProps && marginProps || 0;
            swiper = initSwiper(target, options, 768);

            var displayOptions = {
                display: '-webkit-box',
                display: '-moz-box',
                display: '-ms-flexbox',
                display: '-webkit-flex',
                display: 'flex',
            }
            $('.wideCardList_swiper .swiper-wrapper').css(displayOptions);
            $('.thumbList.is_side.is_grayCard .swiper-wrapper').css(displayOptions);
            return swiper;
        } else if (SDS_COMMON.currentWidth() >= 768) {
            swiper && swiper.destroy();
            swiper = undefined;
            $('.wideCardList_swiper .swiper-wrapper').removeAttr('style');
            $('.wideCardList_swiper .swiper-slide').removeAttr('style');
            $('.wideCardList_swiper .swiper-wrapper').css('display', 'block');
            $('.thumbList.is_side.is_grayCard .swiper-wrapper').removeAttr('style');
            $('.thumbList.is_side.is_grayCard .swiper-slide').removeAttr('style');
            $('.thumbList.is_side.is_grayCard .swiper-wrapper').css('display', 'block');
            return swiper;
        }
    }
    return swiper;
}

var resizeHandlerWithLoop = function(swiper, breakPoint, marginProps) {
    if (SDS_COMMON.currentWidth() <= breakPoint) {
        swiperLoopOn(swiper);
    } else if (SDS_COMMON.currentWidth() > breakPoint) {
        swiperLoopOff(swiper, marginProps);
    }
}
var resizeHandler = function(swiper, breakPoint, marginProps) {
    swiper.update(true);
    if (SDS_COMMON.currentWidth() <= breakPoint) {
        marginProps = 0;
    } else if (SDS_COMMON.currentWidth() > breakPoint) {
        marginProps = marginProps && marginProps || 0;
    }
    swiper.params.spaceBetween = swiper.width * marginProps;
    swiper.update(true);
}
var swiper_curPosition_txt = window.location.href.split('/')[3]=="kr"?"현재 위치":"Current slide";
var initSwiper = function(target, options, breakPoint) {
    if (!canInitialize()) {
        return;
    } else {
        var nextButton = $(target).find('.swiper-button-next');
        var prevButton = $(target).find('.swiper-button-prev');
        nextButton.show();
        prevButton.show();
    }
    if (isAutoPlay()) {
        onAutoPlay();
    }
    var perViewOtions = getPerView(breakPoint);
    var focusableEl = 'a, select, button, textarea, input, area';
    var swiperOptions = {
        pagination: {
			el: target + ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			renderBullet: function(index, className) {
				return '<a href="#" class="swiper-pagination-bullet" title="go to slide"><span class="text">' + (index + 1) + 'slide</span></a>';
			}
		},
        loop: true,
        mousewheelReleaseOnEdges: true,
        touchReleaseOnEdges: true,
        paginationElement: 'a href',
        on: {
            init : function () {
                // console.log("onInit")
            },
            slideChangeTransitionEnd: function(){      
                // console.log("change",  $(target).find('a.swiper-pagination-bullet-active'))
                var owlSlide_activeDot = $(target).find('a.swiper-pagination-bullet-active');
                $(owlSlide_activeDot).attr("aria-selected", true).siblings().removeAttr("aria-selected")
                $(target + ' .swiper-slide').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                $(target + ' .swiper-slide').find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                $(target + ' .swiper-slide-active').attr({ 'tabindex': '-1', 'aria-hidden': 'false' });
                $(target + ' .swiper-slide-active').find(focusableEl).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                $(target + ' .swiper-slide-duplicate').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                $(target + ' .swiper-slide-duplicate').find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                $(target + ' .swiper-slide-duplicate-active').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                $(target + ' .swiper-slide-duplicate-active').find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
            },
        },
    };
    // merge customOptions to baseOptions
    Object.keys(options).forEach(function(key) {
        swiperOptions[key] = options[key];
    });
    Object.keys(perViewOtions).forEach(function(key) {
        swiperOptions[key] = perViewOtions[key];
    });
    var mySwiper = new Swiper(target + ' .swiper-container', swiperOptions);
    // set focusing setting for accessibilities
    // $('.swiper-slide .cnt').attr({'tabindex':'-1','aria-hidden':'true'});
    $(target + ' .swiper-slide').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
    $(target + ' .swiper-slide').find(focusableEl).attr('tabindex', '-1')
    $(target + ' .swiper-slide-active').attr({ 'tabindex': '-1', 'aria-hidden': 'false' });
    $(target + ' .swiper-slide-active').find(focusableEl).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
    $(target + ' .swiper-slide-duplicate').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
    $(target + ' .swiper-slide-duplicate').find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
    $(target + ' .swiper-slide-duplicate-active').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
    $(target + ' .swiper-slide-duplicate-active').find(focusableEl).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });

    function canInitialize() {
        var slidesLength = $(target).find('.swiper-slide').length;
        if (slidesLength === 1) {
            return false;
        } else {
            return true;
        }
    };

    function isAutoPlay() {
        var hasAutoClass = $(target).hasClass('is_auto');
        if (hasAutoClass) {
            return true;
        } else {
            return false;
        }
    }

    function getPerView(breakPoint) {
        var perViewOptions = {
            breakpoints: {},
        };
        // [breakPoint]: {
        //   slidesPerView: 1,
        //   slidesPerGroup: 1,
        // },
        perViewOptions.breakpoints[breakPoint] = {
            slidesPerView: 1,
            slidesPerGroup: 1,
        }
        var classList = $(target).attr('class').split(' ');
        var slidesLength = $(target).find('.swiper-slide').length;
        if (classList) {
            for (var i = 0; i < classList.length; i++) {
                if (classList[i].indexOf('pc-column-') !== -1) {
                    var slidesPerView = classList[i].replace('pc-column-', '');
                    perViewOptions.slidesPerView = slidesPerView;
                    if (slidesLength > slidesPerView) {
                        perViewOptions.slidesPerGroup = parseInt(slidesPerView);
                    } else {
                        perViewOptions.slidesPerGroup = parseInt(slidesPerView);
                    }
                }
                if (classList[i].indexOf('mobile-column-') !== -1) {
                    var slidesPerView = classList[i].replace('mobile-column-', '');
                    perViewOptions.breakpoints[breakPoint] = {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                    }
                    // perViewOptions.breakpoint[breakPoint] = {
                    //   slidesPerView: slidesPerView,
                    //   slidesPerGroup: slidesPerView,
                    // };
                }
            }
        }
        return perViewOptions;
    }

    function setPaginateHeight(paginationContainer) {
        var targetHeight = 'auto';
        if (SDS_COMMON.currentWidth() > breakPoint) {
            targetHeight = 'auto';
            $(paginationContainer).hide();
        } else {
            $(paginationContainer).show();
        }
        $(paginationContainer).height(targetHeight);
    }

    function onAutoPlay() {
        var paginationEl = $(target).find('.swiper-pagination');
        var playPauseButton = '<button class="playButton pause">pause</button>';
        options.autoplay = {
            delay: 4000,
            disableOnInteraction: false,
        };
        options.onInit = function() {
            // pagination 클릭시 오토플레이 멈춤
            var bullets = $(target).find('.swiper-pagination a');
            if (bullets) {
                $(bullets).on('click', function() {
                    changeButtonState(false);
                });
            }

            // prev, next 버튼 클릭시 오토플레이 멈춤
            var prevButton = $(target).find('.swiper-button-prev');
            var nextButton = $(target).find('.swiper-button-next');
            if (prevButton) {
                $(prevButton).on('click', function() {
                    changeButtonState(false);
                });
            }
            if (nextButton) {
                $(nextButton).on('click', function() {
                    changeButtonState(false);
                });
            }
        };
        options.onSliderMove = function(swiper, event) {
            // 슬라이드 드래그시 오토클레이 멈춤
            changeButtonState(false);
        };

        $(playPauseButton).insertAfter(paginationEl);
        changeButtonState(true);
        $(target).find('.playButton').on('click', function() {
            // play, pause 버튼 클릭시 autoplay 키고 끔
            if (mySwiper.autoplay.running) {
                // console.log("stop")
                mySwiper.autoplay.stop();
                changeButtonState(false);
            } else {
                // console.log("play")
                mySwiper.autoplay.start();
                changeButtonState(true);
            }
        });
    }

    function changeButtonState(isAutoplay) {
        var playButton = $(target).find('.playButton');
        if (!playButton) {
            return;
        }
        if (isAutoplay) {
            if (!playButton.hasClass('pause')) {
                playButton.addClass('pause');
            }
            if (playButton.hasClass('play')) {
                playButton.removeClass('play');
            }
            playButton.text('pause');
        } else {
            if (playButton.hasClass('pause')) {
                playButton.removeClass('pause');
            }
            if (!playButton.hasClass('play')) {
                playButton.addClass('play');
            }
            playButton.text('play');
        }
    }
    return mySwiper;
}

var swiperLoopOn = function(swiper) {
    swiper.update(true);
    if (swiper && !swiper.params.loop) {
        swiper.createLoop();
        swiper.params.loop = true;
        swiper.updateSlidesSize();
        swiper.slideTo(0 + swiper.loopedSlides, 0, false);
    }
    swiper.params.spaceBetween = 0;
    swiper.update(true);
}

var swiperLoopOff = function(swiper, marginProps) {
    swiper.update(true);
    marginProps = marginProps && marginProps || 0;
    if (swiper && swiper.params.loop) {
        swiper.destroyLoop();
        swiper.params.loop = false;
    }
    swiper.params.spaceBetween = swiper.width * marginProps;
    swiper.update(true);
}

var lazyloadCatch = function() {
    $("img.lazyload_1").lazyload();
}
// Swiper function - end

// Checkbox -toggle - start
/* 체크박스 체크 전체선택시 하위 체크박스 체크 */
function allCheckFunc(obj) {
    $("[name=checkOne]").prop("checked", $(obj).prop("checked"));
}
/* 체크박스 체크시 전체선택 체크 여부 */
function oneCheckFunc(obj) {
    var allObj = $("[name=checkAll]");
    var objName = $(obj).attr("name");
    if ($(obj).prop("checked")) {
        checkBoxLength = $("[name=" + objName + "]").length;
        checkedLength = $("[name=" + objName + "]:checked").length;
        if (checkBoxLength == checkedLength) {
            allObj.prop("checked", true);
        } else {
            allObj.prop("checked", false);
        }
    } else {
        allObj.prop("checked", false);
    }
}
// Checkbox -toggle - end

// categoryMenuBar - start
function categoryMenuBar(container, _options) {
    var containerEl = $(container);
    var itemWrapper = $(container + ' ' + container + '_wrapper');
    var innerWrapper = $(container + ' ' + container + '_inner');
    var itemEls = containerEl.find(container + '_item');
    var rightBtn = containerEl.find('.category_next')[0];
    var leftBtn = containerEl.find('.category_prev')[0];
    var totalWidth = 0;
    var translateX = 0;
    var options = {
        hideArrow: false,
        widthForHideArrow: 0,
    }
    if (_options !== undefined) {
        Object.keys(_options).forEach(function(key) {
            options[key] = _options[key];
        });
    }

    this.getItemsTotalWidth = function() {
        var tempTotalWidth = 0;
        for (var i = 0; i < itemEls.length; i++) {
            var el = $(itemEls)[i];
            var style = el.currentStyle || window.getComputedStyle(el);
            var width = $(itemEls)[i].getBoundingClientRect().width;
            width = Math.ceil(width * 100) / 100;
            var margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            margin = Math.ceil(margin * 100) / 100;
            tempTotalWidth += width + margin;
        };

        // if( options.hideArrow && options.widthForHideArrow - 82 > Math.ceil(tempTotalWidth) ) {
        //   $(rightBtn).hide();
        //   $(leftBtn).hide();
        // } else {
        //   $(rightBtn).show();
        //   $(leftBtn).show();
        // }
        totalWidth = Math.ceil(tempTotalWidth * 100) / 100;
        innerWrapper.css('width', totalWidth);
    }
    this.getItemsTotalWidth();

    $(rightBtn).click(function() {
        var prevTanslateX = translateX;
        translateX = getNextTranslateX(parseInt(-prevTanslateX));
        moveCategory(translateX);
        checkButtonsState(translateX);
    });

    $(leftBtn).click(function() {
        var prevTanslateX = translateX;
        translateX = getPrevTranslateX(parseInt(-prevTanslateX));
        moveCategory(translateX);
        checkButtonsState(translateX);
    });

    function checkButtonsState(currentTranslateX) {
        if (isReachLastCategory(-currentTranslateX)) {
            disableButton(rightBtn);
        } else {
            enableButton(rightBtn);
        }
        if (isReachFirstCategory(-currentTranslateX)) {
            disableButton(leftBtn);
        } else {
            enableButton(leftBtn);
        }
    }

    function getNextTranslateX(currentTranslateX) {
        var items = itemEls.filter(function(index, item) {
            var leftPosition = parseInt($(item).position().left);
            var wrapperWidth = itemWrapper.outerWidth();
            var itemWidth = $(item).outerWidth(true);
            var calcRightPosition = parseInt($(item).position().left) + currentTranslateX + itemWidth;
            var calcLeftPosition = parseInt($(item).position().left) + currentTranslateX;
            return (calcRightPosition > wrapperWidth && calcLeftPosition < wrapperWidth) ||
                (calcRightPosition > wrapperWidth);
        });
        var item = items.length ? items[0] : null;
        if (!!item) {
            translateX = $(item).position().left;
            if (parseInt(translateX + itemWrapper.outerWidth()) > totalWidth) {
                translateX = (totalWidth - itemWrapper.outerWidth());
            }
        }
        return Math.ceil(translateX);
    }

    //  왼쪽 이동 버튼 클릭시, 현재 뷰에서 가장 왼쪽 아이템 선택
    function getPrevTranslateX(currentTranslateX) {
        var items = itemEls.filter(function(index, item) {
            var leftPosition = parseInt($(item).position().left);
            var itemWidth = $(item).outerWidth(true);
            var calcLeftPosition = leftPosition + currentTranslateX;
            var calcRightPosition = leftPosition + currentTranslateX + itemWidth;
            return (calcLeftPosition < 0 && calcRightPosition > 0) ||
                Math.abs(calcRightPosition) <= 1;
        });

        var item = items.length ? items[0] : null;
        if (!!item) {
            var itemLeftOffset = $(item).position().left;
            var wrapperWidth = itemWrapper.outerWidth();
            var width = $(item).outerWidth(true);
            translateX = parseInt(itemLeftOffset - wrapperWidth + width) > 0 ? parseInt(itemLeftOffset - wrapperWidth + width) : 0;
        }
        return Math.ceil(translateX);
    }

    // 카테고리가 끝에 도달 했는지 체크
    function isReachLastCategory(currentTranslateX) {
        var items = itemEls.filter(function(index, item) {
            var leftPosition = parseInt($(item).position().left);
            var wrapperWidth = itemWrapper.outerWidth();
            var itemWidth = $(item).outerWidth(true);
            var calcRightPosition = parseInt($(item).position().left) + currentTranslateX + itemWidth;
            var calcLeftPosition = parseInt($(item).position().left) + currentTranslateX;
            return (calcRightPosition > wrapperWidth && calcLeftPosition < wrapperWidth) || (calcRightPosition > wrapperWidth);
        });
        var item = items.length ? items[0] : null;
        if (!!item) {
            return false;
        }
        return true;
    }

    // 카테고리가 처음에 도달 했는지 체크
    function isReachFirstCategory(currentTranslateX) {
        var items = itemEls.filter(function(index, item) {
            var leftPosition = parseInt($(item).position().left);
            var itemWidth = $(item).outerWidth(true);
            var calcLeftPosition = leftPosition + currentTranslateX;
            var calcRightPosition = leftPosition + currentTranslateX + itemWidth;
            return (calcLeftPosition < 0 && calcRightPosition > 0) || Math.abs(calcRightPosition) <= 1;
        });
        var item = items.length ? items[0] : null;
        if (!!item) {
            return false;
        }
        return true;
    }

    function enableButton(btnEl) {
        !$(btnEl).hasClass('is_active') && $(btnEl).addClass('is_active');
    }

    function disableButton(btnEl) {
        $(btnEl).hasClass('is_active') && $(btnEl).removeClass('is_active');
    }

    this.resize = function() {
        if (SDS_COMMON.currentWidth() < 1024) {
            moveCategory(0);
            checkButtonsState(0);
        } else {
            var wrapperWidth = itemWrapper.outerWidth();
            var resizedTranslateX = wrapperWidth + translateX;
            if (resizedTranslateX > totalWidth) {
                translateX = totalWidth - wrapperWidth;
                moveCategory(translateX);
                checkButtonsState(translateX);
            } else {
                checkButtonsState(translateX);
            }
        }
    }

    function moveCategory(transX) {
        innerWrapper.css('transform', 'translate(' + '-' + transX + 'px, 0)');
    }
}
// categoryMenuBar - end
