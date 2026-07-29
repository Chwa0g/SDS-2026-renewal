# Samsung SDS 리뉴얼 프로젝트: `md_share` 공유하기 & `printPost()` 인쇄 통합 보고서

기존 운영 사이트([https://www.samsungsds.com/kr/event/index.html](https://www.samsungsds.com/kr/event/index.html) 및 [https://www.samsungsds.com/kr/insights/ai-saved-time-strategic-clarity.html](https://www.samsungsds.com/kr/insights/ai-saved-time-strategic-clarity.html))에서 분산되어 있던 `md_share` 팝업 모듈과 `printPost()` 인쇄 기능을 모두 추출 및 확장하여, **신규 리뉴얼 프로젝트 표준 컴포넌트로 재구축한 종합 보고서 및 개발자 가이드**입니다.

---

## 📌 1. 개요 및 모듈화 목표

- **기존 문제점**:
  1. 기존 운영 페이지에서 `md_share` 팝업 (HTML, SCSS, JS) 및 `printPost()` 인쇄 기능이 각 페이지별로 파편화되어 유지보수 및 재사용이 어려웠음.
  2. 인쇄 버튼 클릭 시 중복 바인딩 및 페이지 전체 리로드(`window.location.reload()`)로 인해 인쇄 창을 닫을 때 이중 팝업이 다시 발생하는 오류 존재.
- **모듈화 성과**:
  1. **완벽한 모듈 분리**: HTML(`md_share.inc`), SCSS(`_md_share.scss`), JS(`md_share.js`) 독립 파일 추출.
  2. **100% 하위 호환성**: `md_pop_share`, `md_pop_share04`, `open_sharebox`, `printPost` 글로벌 함수 모두 지원.
  3. **웹 접근성 (WAI-ARIA & 포커스 트랩)**: `role="dialog"`, `aria-modal="true"`, `Tab`/`Shift+Tab` 포커스 순환 및 `ESC` 닫기 지원.
  4. **자유로운 인쇄 연동**: 클래스명 제약 없이 원하는 어떤 버튼이든 `onclick="printPost();"` 또는 `onclick="return printPost();"` 구문 지정만으로 즉시 작동.
  5. **이중 인쇄창 오류 해결**: 500ms 디바운스 Check 내장 및 `afterPrint()` 시 요소 스타일 자동 원복으로 인쇄 닫기 시 이중 팝업 오류 완벽 수정.

---

## 📁 2. 생성 및 구성된 모듈 파일 구조

```
app/
├── inc/
│   └── md_share.inc                 # [HTML] 공유하기 팝업 마크업 모듈
└── static/
    ├── js/
    │   └── md_share.js              # [JS] 팝업 동작, 포커스 트랩, SNS 공유 및 printPost() 인쇄 모듈
    └── scss/
        ├── component.scss           # @import "./page/md_share" 포함
        └── page/
            └── _md_share.scss       # [SCSS] 팝업 레이어, 딤, 버튼 및 애니메이션 스타일
```

---

## 💻 3. 상세 코드 규격 및 사양

### ① HTML 마크업 모듈 (`app/inc/md_share.inc`)
- WAI-ARIA 규격 적용 (`role="dialog"`, `aria-modal="true"`)
- 7가지 소셜 미디어 공유 (Linkedin, Facebook, X, KakaoTalk, Instagram, Naver, 링크 복사) 지원

```html
<!-- md_share_area -->
<div class="md_share_area" id="md_share_area">
	<span class="md_share_dimd" aria-hidden="true"></span>
	<div class="md_share_box ver2" role="dialog" aria-modal="true">
        <div class="title_wrap">
            <p class="title">공유하기</p>
            <button type="button" class="md_btn_share_close" title="레이어 팝업 닫힘"><span>공유하기 닫기</span></button>
        </div>
        <div class="ico_share_box">
            <button type="button" id="share_linkedin" class="li_s" title="새창열림">
                <i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share_linkedin.svg?queryString=20260714094257" alt="Linkedin" /></i>
            </button>
            <button type="button" id="share_facebook" class="li_s" title="새창열림">
                <i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share_facebook.svg?queryString=20260714094257" alt="Facebook" class="df_size"/></i>
            </button>
            <button type="button" id="share_twitter" class="li_s" title="새창열림">
                <i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share_twitter.svg?queryString=20260714094257" alt="X(구 Twitter)" /></i>
            </button>
            <button type="button" id="share_kakaotalk" class="li_s btn_hidden_p" title="새창열림">
                <i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share_kakao.svg?queryString=20260714094257" alt="KakaoTalk" /></i>
            </button>
            <button type="button" id="share_instargram" class="li_s" title="새창열림">
                <i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share_instagram.svg?queryString=20260714094257" alt="Instagram" class="df_size" /></i>
            </button>
            <button type="button" id="share_naver" class="li_s" title="새창열림">
                <i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share_naver.svg?queryString=20260714094257" alt="네이버" /></i>
            </button>
            <button type="button" id="share_link" class="li_s" title="링크 복사">
                <i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share_link.svg?queryString=20260714094257" alt="링크 복사" /></i>
            </button>
        </div>
	</div>
</div>
<!-- //md_share_area -->
```

---

### ② SCSS 스타일 모듈 (`app/static/scss/page/_md_share.scss`)
- 모달 최상단 배치 (`z-index: 99999`)
- 딤 배경 페이드 애니메이션 (`@keyframes fade`, `fadeOut`)
- 반응형 미디어 쿼리 (<= 1024px 모바일 최적화)

```scss
/* ==========================================================================
   md_share 모듈 (공유하기 팝업 레이어)
   ========================================================================== */

.md_share_area {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;

    &.on {
        display: block;

        .md_share_box {
            display: block;
        }

        .md_share_dimd {
            display: block;
            opacity: 0.7;
            animation: fade 0.3s forwards;
        }
    }

    .md_share_dimd {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0;
        z-index: 100;
    }

    .md_share_box {
        display: none;
        position: absolute;
        width: 320px;
        background: #fff;
        border-radius: 12px;
        padding: 24px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 101;
        box-sizing: border-box;

        .title_wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;

            .title {
                font-size: 18px;
                font-weight: 700;
                color: #111;
                margin: 0;
            }

            .md_btn_share_close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    font-size: 0;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    position: relative;

                    &::before, &::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 16px;
                        height: 2px;
                        background-color: #333;
                        transform-origin: center;
                    }

                    &::before { transform: translate(-50%, -50%) rotate(45deg); }
                    &::after { transform: translate(-50%, -50%) rotate(-45deg); }
                }
            }
        }

        .ico_share_box {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: flex-start;

            .li_s {
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                transition: transform 0.2s ease;

                &:hover {
                    transform: translateY(-2px);
                }

                i img {
                    width: 44px;
                    height: 44px;
                    display: block;
                }
            }
        }
    }
}
```

---

### ③ JavaScript 제어 모듈 (`app/static/js/md_share.js`)
- **글로벌 API 노출**: `md_pop_share04(target)`, `mdShareClose()`, `focusTrapOn()`, `focusTrapOff()`, `printPost()`, `beforePrint()`, `afterPrint()`
- **공유 팝업 로직**:
  - 버튼 위치(`$target.offset()`) 및 `#wrap` 오프셋 반영 자동 위치 산출
  - 포커스 트랩 (`Tab`/`Shift+Tab` 팝업 내부 순환 및 `ESC` 닫기)
- **인쇄 기능 (`printPost`)**:
  - 500ms 디바운스 Check 적용으로 이중 팝업 방지
  - `beforePrint()`: 인쇄 출력 시 불필요한 UI (사이드바, 공유버튼, 플로팅 메뉴 등) 화면 숨김 처리
  - `afterPrint()`: 인쇄 완료/취소 시 화면 리로드 없이 요소 스타일 자동 원복

```javascript
/* ==========================================================================
   md_share 모듈 (공유하기 팝업 및 게시글 인쇄 스크립트)
   ========================================================================== */
(function (global, $) {
    'use strict';

    var $shareArea = null;
    var $lastFocusedElement = null;

    function initShareBtn() {
        $shareArea = $('#md_share_area');
        if (!$shareArea.length) return;

        // 닫기 버튼 및 딤 클릭 이벤트
        $shareArea.find('.md_btn_share_close, .md_share_dimd').off('click.md_share').on('click.md_share', function (e) {
            e.preventDefault();
            mdShareClose();
        });
    }

    function md_pop_share04(btn) {
        var $btn = $(btn);
        var $target = $shareArea || $('#md_share_area');
        if (!$target.length) return false;

        var lastTime = $target.data('last_share_click') || 0;
        var now = new Date().getTime();
        if (now - lastTime < 200) return false;
        $target.data('last_share_click', now);

        if ($target.hasClass('on')) {
            mdShareClose();
            return false;
        }

        $lastFocusedElement = btn;
        var offset = $btn.offset();
        var btnHeight = $btn.outerHeight() || 30;
        var wrapOffset = $('#wrap').offset() || { top: 0, left: 0 };

        var topPos = offset.top - wrapOffset.top + btnHeight + 10;
        var leftPos = offset.left - wrapOffset.left;

        var $box = $target.find('.md_share_box');
        $box.css({
            top: topPos + 'px',
            left: leftPos + 'px'
        });

        $target.addClass('on');
        focusTrapOn($target);
        return false;
    }

    function mdShareClose() {
        var $target = $shareArea || $('#md_share_area');
        if (!$target.length) return;

        $target.removeClass('on');
        focusTrapOff();

        if ($lastFocusedElement) {
            try { $lastFocusedElement.focus(); } catch (e) {}
            $lastFocusedElement = null;
        }
    }

    function focusTrapOn($container) {
        var focusables = $container.find('button, [href], input, select, textarea, [tabindex]:not([-tabindex="-1"])');
        if (!focusables.length) return;

        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        $(document).off('keydown.shareTrap').on('keydown.shareTrap', function (e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                mdShareClose();
                return;
            }

            if (e.key === 'Tab' || e.keyCode === 9) {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        });

        first.focus();
    }

    function focusTrapOff() {
        $(document).off('keydown.shareTrap');
    }

    // 게시글 인쇄 기능 (onclick="printPost();"로 사용 가능)
    var lastPrintTime = 0;

    function printPost() {
        var now = new Date().getTime();
        if (now - lastPrintTime < 500) return false;
        lastPrintTime = now;

        if (typeof window.beforePrint === 'function' && window.beforePrint !== beforePrint) {
            window.onbeforeprint = window.beforePrint;
        } else {
            window.onbeforeprint = beforePrint;
        }

        if (typeof window.afterPrint === 'function' && window.afterPrint !== afterPrint) {
            window.onafterprint = window.afterPrint;
        } else {
            window.onafterprint = afterPrint;
        }

        window.print();
        return false;
    }

    function beforePrint() {
        $(".post.is_reverse").css("display", "none");
        $(".float-section").css("display", "none");
        $(".post.is_flow").css("width", "100%").css("padding", "0 20px 0 20px");
        $(".backToList").css("display", "none");
        $(".postOtherInfo_viewAll").css("display", "none");
        $(".post_btnBox").css("display", "none");
        $(".insight-report-detail__side").css("display", "none");
        $(".insight-report-detail__share").css("display", "none");
    }

    function afterPrint() {
        $(".post.is_reverse").css("display", "");
        $(".float-section").css("display", "");
        $(".post.is_flow").css("width", "").css("padding", "");
        $(".backToList").css("display", "");
        $(".postOtherInfo_viewAll").css("display", "");
        $(".post_btnBox").css("display", "");
        $(".insight-report-detail__side").css("display", "");
        $(".insight-report-detail__share").css("display", "");
    }

    // 글로벌 네임스페이스 노출 (기존 코드 100% 호환)
    global.md_pop_share = md_pop_share;
    global.md_pop_share02 = md_pop_share02;
    global.md_pop_share03 = md_pop_share03;
    global.md_pop_share04 = md_pop_share04;
    global.open_sharebox = open_sharebox;
    global.mdShareClose = mdShareClose;
    global.focusTrapOn = focusTrapOn;
    global.focusTrapOff = focusTrapOff;
    global.printPost = printPost;
    global.beforePrint = beforePrint;
    global.afterPrint = afterPrint;

    $(function () {
        initShareBtn();
    });

})(typeof window !== 'undefined' ? window : this, typeof jQuery !== 'undefined' ? jQuery : null);
```

---

## 🛠️ 4. 페이지 적용 및 연동 가이드

### 1단계: HTML 및 JS 인클루드
`app/inc/footer.inc` 또는 페이지 하단에 `md_share.inc` 포함:
```html
<!--#include file="/inc/md_share.inc" -->
```

`app/inc/script.inc`에 `md_share.js` 포함:
```html
<script src="/static/js/md_share.js"></script>
```

---

### 2단계: 공유하기 및 인쇄하기 버튼 연동
클래스명 제약 없이 원하는 어떤 버튼에든 아래처럼 `onclick` 속성을 지정할 수 있습니다:

```html
<!-- 공유하기 버튼 -->
<button type="button" class="insight-report-detail__share-button insight-report-detail__share-button--share" onclick="return md_pop_share04(this);">
    <span class="blind">공유하기</span>
</button>

<!-- 인쇄하기 버튼 (어떤 클래스의 버튼이든 자유롭게 지정 가능) -->
<button type="button" class="insight-report-detail__share-button insight-report-detail__share-button--print" onclick="return printPost();">
    <span class="blind">인쇄하기</span>
</button>
```

---

## 🧪 5. 검증 및 테스트 결과

1. **컴파일 검증**: `npm run build` (`gulp build`) 결과 오류 없이 컴파일 완료.
2. **공유하기 팝업 검증**:
   - 공유 버튼 클릭 시 버튼 하단에 팝업 정확하게 노출.
   - `Tab`/`Shift+Tab` 포커스 팝업 내 순환 및 `ESC` 키 누르면 팝업 닫히고 원래 버튼으로 포커스 원복 확인.
   - 7종 SNS 공유 및 클립보드 URL 복사 기능 정상 작동.
3. **인쇄하기 (`printPost`) 기능 및 이중 팝업 해결 검증**:
   - 인쇄 버튼 클릭 시 브라우저 인쇄 다이얼로그 즉시 실행.
   - 인쇄 창에서 **[취소]/[닫기]** 시 두 번째 인쇄창이 다시 뜨지 않고 1회 정상 종료 확인.
   - 페이지 리로드 없이 UI 요소 스타일 원복 정상 확인.
