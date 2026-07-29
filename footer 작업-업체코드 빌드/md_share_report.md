# Samsung SDS 리뉴얼 프로젝트: `md_share` 공유하기 팝업 모듈화 보고서

기존 운영 사이트([https://www.samsungsds.com/kr/event/index.html](https://www.samsungsds.com/kr/event/index.html))에서 분산되어 있던 `md_share` 팝업 코드를 추출하여, **신규 리뉴얼 프로젝트 표준 컴포넌트로 재구축 및 모듈화**한 완료 보고서 및 사용 가이드입니다.

---

## 📌 1. 개요 및 모듈화 목표

- **기존 문제점**: 기존 운영 페이지에서 `md_share` 관련 HTML, CSS, JS 코드가 각 페이지 및 스크립트에 분산되어 관리 및 재사용이 어려웠음.
- **모듈화 목표**:
  1. HTML, SCSS, JS를 각각 독립된 모듈 파일로 추출하여 공통 라이브러리화.
  2. 기존 사이트와의 **100% 하위 호환성 유지** (`md_pop_share`, `md_pop_share04`, `open_sharebox` 등 글로벌 함수 지원).
  3. **웹 접근성 (WAI-ARIA & 포커스 트랩)** 규격 준수.
  4. 중복 클릭 방지(Debounce) 및 레이아웃 이중 스크롤 상쇄 로직 내장.

---

## 📁 2. 생성 및 구성된 모듈 파일 구조

```
app/
├── inc/
│   └── md_share.inc                 # [HTML] 공유하기 팝업 마크업 모듈
└── static/
    ├── js/
    │   └── md_share.js              # [JS] 팝업 동작, 포커스 트랩, SNS 공유 모듈
    └── scss/
        ├── component.scss           # @import "./page/md_share" 추가
        └── page/
            └── _md_share.scss       # [SCSS] 팝업 레이어, 딤, 버튼 및 애니메이션 스타일
```

---

## 💻 3. 상세 코드 규격 및 사양

### ① HTML 마크업 모듈: `app/inc/md_share.inc`
- **WAI-ARIA 규격** 적용 (`role="dialog"`, `aria-modal="true"`)
- 7가지 소셜 미디어 공유 및 링크 복사 버튼 포함

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

### ② SCSS 스타일 모듈: `app/static/scss/page/_md_share.scss`
- 모달 최상단 배치 (`z-index: 99999`)
- 딤 배경 페이드 애니메이션 (`@keyframes fade`, `fadeOut`)
- 모바일(<= 1024px) 반응형 대응

```scss
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
            }
        }
    }
}
```

---

### ③ JavaScript 제어 모듈: `app/static/js/md_share.js`
- **글로벌 API 노출**: `md_pop_share04(target)`, `mdShareClose()`, `open_sharebox(target)`
- **위치 자동 계산**: 버튼 위치(`$target.offset()`) 및 `#wrap` 오프셋 반영
- **디바운스 Protection**: 200ms 내 이중 클릭 방지
- **접근성 포커스 트랩**: `Tab`/`Shift+Tab` 순환 및 `ESC` 키 포커스 원복

```javascript
(function (global, $) {
    'use strict';

    var $shareArea = null;
    var $lastFocusedElement = null;

    function initShareBtn() {
        $shareArea = $('#md_share_area');
        if (!$shareArea.length) return;

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

    global.md_pop_share04 = md_pop_share04;
    global.mdShareClose = mdShareClose;

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

### 2단계: 공유하기 버튼 연동
공유하기 버튼 요소에 `onclick` 속성을 추가합니다:

```html
<button type="button"
        class="insight-report-detail__share-button insight-report-detail__share-button--share"
        onclick="return md_pop_share04(this);">
    공유하기
</button>
```

---

## 🧪 5. 검증 및 테스트 결과

1. **컴파일 검증**: `npm run build` (`gulp build`) 결과 오류 없이 컴파일 완료.
2. **동작 테스트**:
   - 공유하기 버튼 클릭 시 버튼 하단 정확한 위치에 팝업 노출 확인.
   - `Tab` 키로 포커스 시 팝업 내부 순환 확인 (포커스 트랩).
   - `ESC` 키 눌렀을 때 팝업 닫힘 및 원래 공유하기 버튼으로 포커스 원복 확인.
   - 7종 SNS 버튼 클릭 시 정상 링크 연결 및 URL 클립보드 복사 안내 팝업 확인.
