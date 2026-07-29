/**
 * md_share.js - 삼성SDS 공유하기 팝업 모듈 (Samsung SDS Event Share Popup Module)
 * 
 * 기존 운영 사이트(https://www.samsungsds.com/kr/event/index.html)에서
 * 여러 파일에 분산되어 있던 md_share 팝업 관련 기능을 하나의 독자적 모듈로 통합 정리함.
 */

(function (global, $) {
    'use strict';

    // 다국어 텍스트 기본값 (langSet 미정의 시 픽스 fallback)
    if (typeof global.langSet === 'undefined') {
        global.langSet = {
            ko: {
                openWindow: "새창열림",
                share: {
                    shareOpen: "공유하기 팝업 열림",
                    shareClose: "공유하기 팝업 닫힘"
                },
                layerPop: {
                    layerOpen: "레이어 팝업 열림"
                }
            },
            en: {
                openWindow: "Open in new window",
                share: {
                    shareOpen: "Share popup open",
                    shareClose: "Share popup close"
                },
                layerPop: {
                    layerOpen: "Layer popup open"
                }
            }
        };
    }

    let lastActivatedButton = null; // 마지막으로 활성화된 버튼 저장

    /**
     * 포커스 트랩 활성화 (웹 접근성)
     */
    function focusTrapOn($mdShareBtn) {
        if ($mdShareBtn && $mdShareBtn.length) {
            $mdShareBtn.find('a:visible, button:visible').first().focus();
        }
    }

    /**
     * 포커스 트랩 해제 및 포커스 복원 (웹 접근성)
     */
    function focusTrapOff() {
        if (lastActivatedButton) {
            lastActivatedButton.focus();
        }
    }

    /**
     * 공유하기 팝업 열기 (기본 오프셋 계산 타입 1)
     */
    function md_pop_share(obj) {
        var $target = $(obj);
        if ($target.hasClass('on')) {
            $target.removeClass('on');
            $('.md_share_area').removeClass('on').removeClass('off');
            $('.md_btn_share').removeClass('on');
        } else {
            var offsetPosition = $target.offset();
            var $wrap = $('#wrap');
            var wrapWidth = $wrap.length ? $wrap.width() : $(window).width();
            var w = ($(window).width() - wrapWidth) * 0.5;
            var x = offsetPosition.left + 30 - w;
            var y = offsetPosition.top - 2;
            var $mdShareBtn = $('.md_share_area');

            $('#md_share_area').addClass('on');
            $('#md_share_area').css({ 'left': x, 'top': y });
            $('.md_btn_share').removeClass('on');
            $target.addClass('on');

            lastActivatedButton = $target;
            focusTrapOn($mdShareBtn);
        }
        return false;
    }

    /**
     * 공유하기 팝업 열기 (우측 오프셋 계산 타입 2)
     */
    function md_pop_share02(obj) {
        var $target = $(obj);
        if ($target.hasClass('on')) {
            $target.removeClass('on');
            $('.md_share_area').removeClass('on').removeClass('off');
            $('.btn_md_share').removeClass('on');
        } else {
            var offsetPosition = $target.offset();
            var $wrap = $('#wrap');
            var wrapWidth = $wrap.length ? $wrap.width() : $(window).width();
            var w = ($(window).width() - wrapWidth) * 0.5;
            var x = $(window).width() - offsetPosition.left + 10 - w;
            var y = offsetPosition.top - 23;
            var $mdShareBtn = $('.md_share_area');

            $('#md_share_area').addClass('on');
            $('#md_share_area').css({ 'right': x, 'top': y });
            $('.btn_md_share').removeClass('on');
            $target.addClass('on');

            lastActivatedButton = $target;
            focusTrapOn($mdShareBtn);
        }
        return false;
    }

    /**
     * 공유하기 팝업 열기 (타입 3)
     */
    function md_pop_share03(obj) {
        var $target = $(obj);
        if ($target.hasClass('on')) {
            $target.removeClass('on');
            $('.md_share_area').removeClass('on').removeClass('off');
            $('.btn_md_share').removeClass('on');
        } else {
            var offsetPosition = $target.offset();
            var x = offsetPosition.left + 160;
            var y = offsetPosition.top - 0;
            var $mdShareBtn = $('.md_share_area');

            $('#md_share_area').addClass('on');
            $('#md_share_area').css({ 'left': x, 'top': y });
            $('.btn_md_share').removeClass('on');
            $target.addClass('on');

            lastActivatedButton = $target;
            focusTrapOn($mdShareBtn);
        }
        return false;
    }

    /**
     * 공유하기 팝업 열기 (타입 4 - 버튼 하단 자동 배치)
     */
    function md_pop_share04(obj, e) {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }
        var $target = $(obj);

        // 동일 클릭 이벤트에서 중복 호출(inline onclick + jQuery event) 방지
        var now = new Date().getTime();
        var lastTime = $target.data('last_share_click') || 0;
        if (now - lastTime < 200) {
            return false;
        }
        $target.data('last_share_click', now);

        if ($target.hasClass('on')) {
            $target.removeClass('on');
            $('.md_share_area').removeClass('on').removeClass('off');
        } else {
            var $popupShare = $('#md_share_area');
            if (!$popupShare.length) {
                console.warn("[md_share] #md_share_area 요소를 찾을 수 없습니다.");
                return false;
            }

            $popupShare.removeClass('off').addClass('on');

            var offsetPosition = $target.offset();
            var btnWidth = $target.outerWidth() || 0;
            var btnHeight = $target.outerHeight() || 0;
            var popupWidth = $popupShare.find('.md_share_box').outerWidth() || $popupShare.outerWidth() || 290;

            var $wrap = $('#wrap');
            var wrapOffset = $wrap.length ? $wrap.offset() : { left: 0, top: 0 };

            var x = offsetPosition.left + btnWidth - popupWidth - wrapOffset.left;
            var y = offsetPosition.top + btnHeight + 10 - wrapOffset.top;

            if (x < 10) {
                x = Math.max(10, offsetPosition.left - wrapOffset.left);
            }

            $popupShare.css({
                'position': 'absolute',
                'left': x + 'px',
                'top': y + 'px',
                'z-index': 99999
            });

            $('.md_btn_share, .btn_md_share, .insight-report-detail__share-button--share').removeClass('on');
            $target.addClass('on');

            lastActivatedButton = $target;
            focusTrapOn($popupShare);
        }
        return false;
    }

    /**
     * 이벤트 카드 동적 렌더링용 공유 팝업 열기 (open_sharebox)
     */
    function open_sharebox(obj, url, artid) {
        var $target = $(obj);
        if ($target.hasClass('on')) {
            $target.removeClass('on');
            $('.md_share_area').removeClass('on').removeClass('off');
            $('.btn_normal.add_share').removeClass('on');
        } else {
            var offsetPosition = $target.offset();
            var $wrap = $('#wrap');
            var wrapWidth = $wrap.length ? $wrap.width() : $(window).width();
            var wrapOffset = $wrap.length ? $wrap.offset() : { left: 0, top: 0 };
            var w = ($(window).width() - wrapWidth) * 0.5;
            var x = offsetPosition.left + 30 - w - wrapOffset.left;
            var y = offsetPosition.top - 100 - wrapOffset.top;

            var $popupShare = $('#md_share_area');
            $popupShare.removeClass('off').addClass('on');
            $popupShare.css({ 'left': x + 'px', 'top': y + 'px', 'z-index': 99999 });

            $('.ico_share_box').focus();
            $('.ico_share_box button').attr('data-url', url || '');
            $('.ico_share_box button').attr('data-artid', artid || '');
            $('.btn_normal.add_share').removeClass('on');
            $target.addClass('on');

            lastActivatedButton = $target;
            focusTrapOn($popupShare);
        }
        return false;
    }

    /**
     * 공유 팝업 닫기
     */
    function mdShareClose() {
        var lang = $("html").attr("lang") || "ko";
        var $shareArea = $('.md_share_area');
        if (!$shareArea.hasClass("on") || $shareArea.hasClass("off")) return;

        $shareArea.addClass('off');
        if (global.langSet && global.langSet[lang] && global.langSet[lang].share) {
            $(".md_btn_share").find(".blind").text(global.langSet[lang].share.shareOpen);
        }

        setTimeout(function () {
            $('.md_btn_share.on, .btn_md_share.on, .share_btn.on, .add_share.on, .post_share.on, .insight-report-detail__share-button--share.on').removeClass('on');
        }, 0);

        setTimeout(function () {
            $shareArea.removeClass('on').removeClass('off');
        }, 250);

        focusTrapOff();
    }

    /**
     * 공유 카운트 API 콜백 (옵션)
     */
    function setShareCnt(snsTypeId, shareArtId, shareTypeId) {
        if (!shareArtId) return;
        $.ajax({
            type: 'GET',
            url: '/app/setShareCnt?artId=' + shareArtId + '&typeId=' + (shareTypeId || '') + '&snsTypeId=' + snsTypeId,
            dataType: 'JSON',
            success: function (data) {
                // success handler
            },
            error: function () {
                // quiet failover
            }
        });
    }

    /**
     * 공유 버튼 이벤트 리스너 자동 바인딩
     */
    function initShareBtn() {
        $(document).on("click", ".md_btn_share, .btn_md_share, .insight-report-detail__share-button--share", function (e) {
            var onclickAttr = $(this).attr("onclick");
            // inline onclick이 이미 md_pop_share를 호출하는 경우 중복 호출 방지
            if (onclickAttr && onclickAttr.indexOf("md_pop_share") !== -1) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            md_pop_share04(this, e);
        });
    }

    // DOM Ready 핸들러
    $(function () {
        var lang = $("html").attr("lang") || "ko";
        var $shareBox = $(".md_share_box");
        var $shareDim = $(".md_share_dimd");
        var $shareCloseBtn = $(".md_btn_share_close");

        // 웹 접근성 속성 설정
        if (global.langSet && global.langSet[lang]) {
            $shareBox.find("button, a").not($shareCloseBtn).attr("title", global.langSet[lang].openWindow || "새창열림");
            $shareCloseBtn.find("span").text((global.langSet[lang].share && global.langSet[lang].share.shareClose) || "공유하기 닫기");
        }

        // 딤 클릭 시 닫기
        $shareDim.on("click", function () {
            mdShareClose();
            return false;
        });

        // 닫기 버튼 클릭 시 닫기
        $shareCloseBtn.on("click", function () {
            mdShareClose();
            return false;
        });

        // ESC 키 및 키보드 Tab Focus Trap
        $shareBox.on("keydown", function (e) {
            if (e.keyCode === 27) { // ESC Key
                mdShareClose();
                return;
            }

            var $shareBoxBtn = $shareBox.find('a:visible, button:visible');
            var $shareFirstBtn = $shareBoxBtn.first();
            var $shareLastBtn = $shareBoxBtn.last();

            if (e.keyCode === 9) { // Tab Key
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === $shareFirstBtn[0]) {
                        e.preventDefault();
                        $shareLastBtn.focus();
                    }
                } else { // Tab
                    if (document.activeElement === $shareLastBtn[0]) {
                        e.preventDefault();
                        $shareFirstBtn.focus();
                    }
                }
            }
        });

        // ----------------------------------------------------
        // SNS 공유 기능 구현
        // ----------------------------------------------------
        var $shareKakaotalk = $('#share_kakaotalk');
        var $shareFacebook = $('#share_facebook');
        var $shareTwitter = $('#share_twitter');
        var $shareLinkedin = $('#share_linkedin');
        var $shareInstagram = $('#share_instargram');
        var $shareNaver = $('#share_naver');
        var $shareLink = $('#share_link');

        function getTargetUrl($btn) {
            var url = $btn.attr('data-url');
            if (!url) {
                return location.href;
            }
            if (url.indexOf('http') === 0) {
                return url;
            }
            return location.origin + url;
        }

        // KakaoTalk
        $shareKakaotalk.on('click', function (e) {
            e.preventDefault();
            var artId = $(this).attr('data-artid') || $('#artId').val();
            var typeId = $('#typeId').val();
            setShareCnt('kt', artId, typeId);

            var url = getTargetUrl($(this));

            if (typeof global.Kakao !== 'undefined') {
                if (!global.Kakao.isInitialized()) {
                    global.Kakao.init('cbee93b45350bab6359a13c3ad1be5eb'); // Samsung SDS Kakao App Key
                }
                var shareArtData = (typeof global.bThumbList !== 'undefined')
                    ? global.bThumbList.find(function (item) { return item.id === artId; })
                    : null;

                global.Kakao.Link.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: shareArtData ? shareArtData.title : document.title,
                        description: '',
                        imageUrl: shareArtData ? shareArtData.thum_img : '',
                        link: { webUrl: url, mobileWebUrl: url }
                    },
                    buttons: [{ title: '자세히 보기', link: { mobileWebUrl: url, webUrl: url } }]
                });
            } else {
                window.open('https://story.kakao.com/share?url=' + encodeURIComponent(url), '_blank', 'width=800,height=600');
            }
        });

        // Facebook
        $shareFacebook.on('click', function (e) {
            e.preventDefault();
            var artId = $(this).attr('data-artid') || $('#artId').val();
            var typeId = $('#typeId').val();
            setShareCnt('fb', artId, typeId);
            var url = getTargetUrl($(this));
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank", "width=800,height=600");
        });

        // Twitter / X
        $shareTwitter.on('click', function (e) {
            e.preventDefault();
            var url = getTargetUrl($(this));
            window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(url), "_blank", "width=800,height=600");
        });

        // LinkedIn
        $shareLinkedin.on('click', function (e) {
            e.preventDefault();
            var artId = $(this).attr('data-artid') || $('#artId').val();
            var typeId = $('#typeId').val();
            setShareCnt('li', artId, typeId);
            var url = getTargetUrl($(this));
            window.open("https://www.linkedin.com/shareArticle/?mini=true&url=" + encodeURIComponent(url), "_blank", "width=800,height=600");
        });

        // Instagram
        $shareInstagram.on('click', function (e) {
            e.preventDefault();
            var artId = $(this).attr('data-artid') || $('#artId').val();
            var typeId = $('#typeId').val();
            setShareCnt('insta', artId, typeId);
            window.open("https://www.instagram.com", "_blank", "width=800,height=600");
        });

        // Naver Blog
        $shareNaver.on('click', function (e) {
            e.preventDefault();
            var artId = $(this).attr('data-artid') || $('#artId').val();
            var typeId = $('#typeId').val();
            setShareCnt('naver', artId, typeId);
            var url = getTargetUrl($(this));
            window.open("https://blog.naver.com/openapi/share?url=" + encodeURIComponent(url), "_blank", "width=500,height=600");
        });

        // Copy Link
        $shareLink.on('click', function (e) {
            e.preventDefault();
            var artId = $(this).attr('data-artid') || $('#artId').val();
            var typeId = $('#typeId').val();
            setShareCnt('url', artId, typeId);
            var url = getTargetUrl($(this));

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    alert("링크 주소가 복사되었습니다.");
                }).catch(function () {
                    prompt("해당 페이지의 링크 주소입니다. \"CTRL + C\"를 눌러 복사하세요.", url);
                });
            } else if (global.clipboardData) {
                global.clipboardData.setData("Text", url);
                alert("해당 페이지의 링크 주소입니다. \n \"CTRL + V\"를 눌러 붙여넣기 하세요.");
            } else {
                prompt("해당 페이지의 링크 주소입니다. \"CTRL + C\"를 눌러 복사하세요.", url);
            }
        });

        // 자동 초기화 실행
        initShareBtn();
    });

    // 글로벌 네임스페이스 노출 (기존 코드 100% 호환)
    global.md_pop_share = md_pop_share;
    global.md_pop_share02 = md_pop_share02;
    global.md_pop_share03 = md_pop_share03;
    global.md_pop_share04 = md_pop_share04;
    global.open_sharebox = open_sharebox;
    global.mdShareClose = mdShareClose;
    global.focusTrapOn = focusTrapOn;
    global.focusTrapOff = focusTrapOff;

})(typeof window !== 'undefined' ? window : this, typeof jQuery !== 'undefined' ? jQuery : null);
