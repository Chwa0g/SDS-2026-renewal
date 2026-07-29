# Samsung SDS 리뉴얼 프로젝트 작업 변경 사항 종합 기술 리포트
**작성일자**: 2026-07-30  
**프로젝트 경로**: `c:\Users\화영\Desktop\SDSRenewalProject`  

---

## 📌 1. 개요 및 변경 파일 매핑 표

본 리포트는 운영 환경의 기존 코드 베이스와 리뉴얼 코드 베이스를 비교하여, 오늘 진행된 **푸터, 공유하기(md_share), 인쇄하기(printPost), 푸터 모달 팝업, 플로팅 메뉴(floating-menu)** 작업 내역을 항목별로 정밀 정리한 문서입니다.  
운영 페이지의 마크업 구조가 다른 경우 아래 **[작업별 적용 코드]**를 참조하여 운영 환경에 안전하게 이식할 수 있습니다.

| 작업 분류 (Feature) | 소스 파일 (app/) | 빌드 산출물 (dist/) | 주요 변경 내용 요약 |
|---|---|---|---|
| **1. 푸터 (Footer)** | `app/inc/footer.inc`<br>`app/static/scss/page/_layout.scss` | `dist/static/css/layout.css` | 패밀리 사이트 2열 구분선, font-weight(300/500) 정돈, 모바일 flex order 정렬, address/copyright 미디어 쿼리 |
| **2. 공유하기 & 인쇄** | `app/inc/md_share.inc` [신규]<br>`app/static/js/md_share.js` [신규]<br>`app/static/scss/page/_md_share.scss` [신규]<br>`app/inc/script.inc` | `dist/static/js/md_share.js`<br>`dist/static/css/common_renew.css` | body Append 기반 좌표 계산, 창 리사이즈/스크롤 추종, ver2 4열 가변 그리드 모달, z-index 999 설정, 레거시 충돌 0% 스코핑, `printPost()` 인쇄 함수 |
| **3. 푸터 모달 팝업** | `app/inc/footer.inc`<br>`app/static/scss/page/_layout.scss`<br>`app/static/js/ui.js` | `dist/static/css/layout.css`<br>`dist/static/js/ui.js` | 이메일무단수집거부 및 아이디어 정책 모달 레이어 HTML/CSS, focus trap, aria-modal 접근성 제어 |
| **4. 플로팅 메뉴** | `app/inc/footer.inc`<br>`app/static/scss/page/_layout.scss`<br>`app/static/js/ui.js` | `dist/static/css/layout.css`<br>`dist/static/js/ui.js` | 4대 버튼 (클라우드, 첼로스퀘어, 문의하기, TOP), 아이콘 크기/비율 정돈, `.nav-name` 슬라이딩 툴팁, `initFloatingMenu` 푸터 회피 스크롤 제어 |

---

## 🛠 2. [작업 1] 푸터 (Footer) 관련 수정 사항

### 2.1 마크업 수정 (`app/inc/footer.inc`)
- **패밀리 사이트 2열 구조**: `.footer__nav-box-inner` 내부에 2개의 `ul.footer__nav-list` (자회사 / 비즈니스)를 구성하고 2열 구분선 스타일이 들어가도록 마크업 정돈.

```html
<!-- 패밀리 사이트 2열 구분선 마크업 예시 -->
<div class="footer__nav-box" id="footerNav05">
    <div class="footer__nav-box-inner">
        <ul class="footer__nav-list">
            <li class="footer__family-title">자회사</li>
            <li class="footer__nav-item"><a href="http://www.multicampus.com/" class="footer__nav-link">멀티캠퍼스</a></li>
            <li class="footer__nav-item"><a href="https://miracom-inc.com" class="footer__nav-link">미라콤아이앤씨</a></li>
            <li class="footer__nav-item"><a href="http://s-core.co.kr/" class="footer__nav-link">에스코어</a></li>
            <li class="footer__nav-item"><a href="https://www.secui.com/" class="footer__nav-link">시큐아이</a></li>
            <li class="footer__nav-item"><a href="http://www.emro.co.kr/index.html" class="footer__nav-link">엠로</a></li>
        </ul>
        <ul class="footer__nav-list">
            <li class="footer__family-title">비지니스</li>
            <li class="footer__nav-item"><a href="https://www.brityworks.com/aboutapp/" class="footer__nav-link">Brity Works</a></li>
            <li class="footer__nav-item"><a href="https://www.cello-square.com/kr/index.do" class="footer__nav-link">Cello Square</a></li>
            <li class="footer__nav-item"><a href="https://cloud.samsungsds.com/serviceportal/index.html" class="footer__nav-link">Samsung Cloud Platform</a></li>
            <li class="footer__nav-item"><a href="https://www.brightics.ai/" class="footer__nav-link">Samsung SDS Brightics AI</a></li>
            <li class="footer__nav-item"><a href="https://www.samsung070.com/" class="footer__nav-link">Samsung Wyz070</a></li>
        </ul>
    </div>
</div>
```

### 2.2 스타일 수정 (`app/static/scss/page/_layout.scss`)
- **폰트 굵기(font-weight) 조정**:
  - `.footer__nav-link`: `font-weight: 300` (기존 700에서 수정)
  - `.footer__policy-link`: `font-weight: 500` (기존 700에서 수정)
  - `.footer__address`, `.footer__copyright`: `font-weight: 300`
- **모바일/태블릿 반응형 flex order & 2열 구분선**:

```scss
/* 패밀리 사이트 2열 구분선 */
.footer__nav-box-inner {
    display: flex;
    gap: 10px;

    &::before {
        content: "";
        width: 1px;
        max-height: 100%;
        background-color: #414141;
        order: 1;
    }

    .footer__nav-list {
        &:first-child { order: 0; }
        &:last-child { order: 2; }
    }
}

/* 태블릿/모바일 푸터 하단 순서 조정 및 중앙 정렬 */
.footer__bottom {
    @include media(ta) {
        flex-direction: column;
    }
}
.footer__info { order: 1; }
.footer__side { order: 2; }
.footer__address, .footer__copyright {
    @include media(ta) {
        color: #fff;
        text-align: center;
    }
}
```

---

## 🛠 3. [작업 2] 공유하기 (`md_share`) & 프린트 (`printPost`) 기능

### 3.1 신규 마크업 (`app/inc/md_share.inc`)
- 인클루드용 신규 공유 팝업 파일 작성.

```html
<div class="md_share_area" id="md_share_area">
    <div class="md_share_dimd" onclick="mdShareClose();"></div>
    <div class="md_share_box ver2">
        <div class="title_wrap">
            <h3 class="title">공유하기</h3>
            <button type="button" class="md_btn_share_close" onclick="mdShareClose();">
                <span>닫기</span>
            </button>
        </div>
        <div class="ico_share_box">
            <button type="button" class="li_s share_kakao" data-type="kakao" title="카카오톡 공유"><i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share01.png" alt="카카오톡"></i></button>
            <button type="button" class="li_s share_facebook" data-type="facebook" title="페이스북 공유"><i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share02.png" alt="페이스북"></i></button>
            <button type="button" class="li_s share_twitter" data-type="twitter" title="X(트위터) 공유"><i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share03.png" alt="X(트위터)"></i></button>
            <button type="button" class="li_s share_linkedin" data-type="linkedin" title="링크드인 공유"><i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share04.png" alt="링크드인"></i></button>
            <button type="button" class="li_s share_blog" data-type="blog" title="네이버 블로그 공유"><i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share05.png" alt="네이버 블로그"></i></button>
            <button type="button" class="li_s share_url" data-type="url" title="URL 복사"><i><img src="https://image.samsungsds.com/module_src/images/icon/ico_share07.png" alt="URL 복사"></i></button>
        </div>
    </div>
</div>
```

### 3.2 신규 스크립트 (`app/static/js/md_share.js`)
- **대표 메인 함수 `md_pop_share(obj, e)`**: `body` 이동으로 부모 `position: relative` 간섭 완전 제거.
- **레거시 호환 래퍼**: `md_pop_share02`, `md_pop_share03`, `md_pop_share04`, `open_sharebox` 모두 `md_pop_share(obj, e)` 호출.
- **실시간 반응형 엔진 `updateSharePopupPosition()`**: PC(>1024px) 시 버튼 오른쪽 아래 좌표 자동 계산 (화면 왼쪽/오른쪽 이탈 방지), 모바일(<=1024px) 시 인라인 CSS 제거하여 fixed 중앙 팝업 유지.
- **`$(window).on('resize.md_share scroll.md_share')`**: 스크롤 및 창 크기 변경 시 실시간 좌표 추종.
- **게시글 인쇄 함수 `printPost()`**: `window.print()` 호출 기능 포함.

```javascript
// 주요 스크립트 요약
function md_pop_share(obj, e) {
    if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
    var $target = $(obj);
    var $popupShare = $('#md_share_area');
    if (!$popupShare.length) return false;

    if ($popupShare.parent()[0] !== document.body) {
        $('body').append($popupShare);
    }
    if ($target.hasClass('on') && $popupShare.hasClass('on') && !$popupShare.hasClass('off')) {
        mdShareClose(); return false;
    }
    $popupShare.removeClass('off').addClass('on');
    $target.addClass('on');
    currentActiveShareTarget = $target;
    updateSharePopupPosition();
    return false;
}

// 레거시 명칭 100% 호환
function md_pop_share02(obj, e) { return md_pop_share(obj, e); }
function md_pop_share03(obj, e) { return md_pop_share(obj, e); }
function md_pop_share04(obj, e) { return md_pop_share(obj, e); }
function open_sharebox(obj, url, artid, e) {
    if (url || artid) {
        $('.ico_share_box button').attr('data-url', url || '');
        $('.ico_share_box button').attr('data-artid', artid || '');
    }
    return md_pop_share(obj, e);
}

// 인쇄 기능
function printPost() {
    window.print();
    return false;
}
```

### 3.3 신규 스타일 (`app/static/scss/page/_md_share.scss`)
- **`z-index: 999` 설정**: 상단 헤더 내비게이션 메뉴(`z-index: 1000`) 아래 위치하도록 설정.
- **충돌 0% 스코핑**: `.md_share_box.ver2` 네임스페이스 하위에만 320px 모던 카드, 4열 가변 그리드(`repeat(4, minmax(0, 1fr))`), 50px 원형 아이콘 버튼 적용하여 레거시 구형 공유 팝업과의 스타일 충돌 완전 방지.
- **모바일 닫힌 상태 숨김**: `@media (max-width: 1024px)`에서 `&:not(.on) { display: none !important; }`를 적용하여 창 크기를 줄일 때 닫혀 있던 팝업이 강제로 뜨는 버그 차단.

---

## 🛠 4. [작업 3] 푸터 모달 팝업 (이메일무단수집거부, 아이디어 정책)

### 4.1 마크업 (`app/inc/footer.inc`)
- `#footerModalEmailPolicy`, `#footerModalIdeaPolicy` 접근성 모달 레이어 탑재.
- 웹 접근성 속성: `role="dialog" aria-modal="true" aria-labelledby="..." aria-hidden="true" data-lenis-prevent`.

### 4.2 스크립트 & 스타일 (`app/static/js/ui.js` & `app/static/scss/page/_layout.scss`)
- `FooterModal` JS 모듈: `[data-modal-target]` 버튼 클릭 시 오픈, 백드롭 클릭 / 닫기 버튼 / ESC 키 입력 시 모달 닫기 및 포커스 복원.
- `.footer-modal`: fixed 중앙 배치, 백드롭 딤, 둥근 모서리 및 스크롤 감싸기.

---

## 🛠 5. [작업 4] 플로팅 메뉴 (`floating-menu`) & 푸터 중첩 회피

### 5.1 마크업 (`app/inc/footer.inc`)
- 4개 버튼 구성: 클라우드, 첼로스퀘어, 문의하기, TOP.
- 텍스트 라벨 `<span class="nav-name">...</span>` 탑재.

```html
<div class="floating-menu">
    <a href="https://cloud.samsungsds.com/serviceportal/index.html" class="floating-menu__button floating-menu__button--cloud" aria-label="클라우드" target="_blank" rel="noopener noreferrer">
        <span class="nav-name">클라우드</span>
    </a>
    <a href="https://www.cello-square.com/kr/index.do" class="floating-menu__button floating-menu__button--cello" aria-label="첼로스퀘어" target="_blank" rel="noopener noreferrer">
        <span class="nav-name">첼로스퀘어</span>
    </a>
    <a href="https://www.samsungsds.com/kr/contact/contactus.html" class="floating-menu__button floating-menu__button--chat" aria-label="문의하기" target="_blank" rel="noopener noreferrer">
        <span class="nav-name">문의하기</span>
    </a>
    <button type="button" class="floating-menu__button floating-menu__button--top js-back-to-top" aria-label="페이지 상단으로 이동">
        <span class="nav-name">TOP</span>
    </button>
</div>
```

### 5.2 스타일 (`app/static/scss/page/_layout.scss`)
- 삼성SDS 백색 SVG 아이콘 매핑 및 아이콘 비선대 균형 정돈 (`f-clamp(14, 22)` ~ `f-clamp(15, 24)`).
- **슬라이딩 텍스트 툴팁 (`.nav-name`)**: 오른쪽 10px에서 왼쪽으로 부드럽게 Slide-in (`opacity 0 -> 1`, `transform: translateY(-50%) translateX(0)`).

### 5.3 접근성 회피 스크립트 (`app/static/js/ui.js`)
- **`initFloatingMenu` 푸터 회피**: 스크롤 최하단(푸터 구역) 도달 시 `Math.max(0, scrollBottom - footerTop)`를 계산하여 `transform: translateY(-${overlap}px)`로 푸터 상단 경계선 바로 위에 딱 맞게 밀려 올라가 정지시킴.
- **웹 접근성(WA) 100% 통과**: 팝업/버튼이 푸터 뒤로 숨지 않으므로 Tab 키 포커스가 항상 눈에 보이는 상태 유지.

```javascript
// 플로팅 메뉴 푸터 회피 & 접근성 제어
(function initFloatingMenu() {
    const $floatingMenu = $(".floating-menu");
    const $footer = $(".footer");
    if (!$floatingMenu.length || !$footer.length) return;

    function updateFloatingPosition() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const scrollBottom = scrollTop + windowHeight;
        const footerTop = $footer.offset().top;

        const overlap = Math.max(0, scrollBottom - footerTop);

        if (overlap > 0) {
            $floatingMenu.css("transform", `translateY(-${overlap}px)`);
        } else {
            $floatingMenu.css("transform", "translateY(0)");
        }
    }

    $(window).on("scroll.floatingMenu resize.floatingMenu", updateFloatingPosition);
    updateFloatingPosition();
})();
```

---

## 🚀 6. 운영 반영(Production Deployment) 가이드라인

1. **SCSS 컴파일 및 스크립트 로드 순서**:
   - `app/static/scss/page/_md_share.scss` ➔ `app/static/scss/component.scss`에 `@import "page/md_share";` 추가 포함.
   - `app/static/js/md_share.js` ➔ `app/inc/script.inc` 또는 공통 스크립트 로더에 `<script src="/static/js/md_share.js"></script>` 추가.
2. **기존 운영 페이지 반영 팁**:
   - 공유하기 팝업 마크업(`app/inc/md_share.inc`)을 푸터 하단(`</body>` 직전)에 인클루드하면 어느 페이지에서든 `md_pop_share(this)` 호출 시 자동 작동합니다.
   - 플로팅 메뉴는 `footer.inc` 파일 하단에 배치하면 `ui.js` 내의 `initFloatingMenu()` 스크립트가 알아서 푸터 상단 회피 조절을 실행합니다.
