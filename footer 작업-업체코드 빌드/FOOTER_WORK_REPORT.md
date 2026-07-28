# 📄 푸터 리뉴얼 작업 전체 코드 변경점 (HTML / SCSS / Plain CSS / JS)

> **프로젝트**: Samsung SDS Renewal  
> **용도**: 운영/개발 웹사이트 실시간 코드 적용 참조 문서  
> **특징**: SCSS 프리프로세서 코드와 함께 **빌드 완료된 순수 CSS(Plain CSS)** 도 함께 수록하여 직접 CSS를 수정하는 환경에서도 바로 복사하여 사용할 수 있습니다.

---

## 📌 목차
1. [HTML 변경 코드 (`app/inc/footer.inc`)](#1-html-변경-코드-appincfooterinc)
   - [1-1. 패밀리사이트 모바일 아코디언 `.footer__nav-box-inner` 래퍼 추가](#1-1-패밀리사이트-모바일-아코디언-footernav-box-inner-래퍼-추가)
   - [1-2. 개인정보방침 정책 링크 버튼 (`button`) 및 트리거 추가](#1-2-개인정보방침-정책-링크-버튼-button-및-트리거-추가)
   - [1-3. 푸터 하단 레이어 모달 팝업 2종 마크업 전체 추가](#1-3-푸터-하단-레이어-모달-팝업-2종-마크업-전체-추가)
2. [SCSS 및 빌드된 CSS 변경 코드 (`_layout.scss` & `layout.css`)](#2-scss-및-빌드된-css-변경-코드-_layoutscss--layoutcss)
   - [2-1. 모바일 아코디언 멀티 리스트 래퍼 스타일](#2-1-모바일-아코디언-멀티-리스트-래퍼-스타일)
   - [2-2. PC/모바일 반응형 타이틀 포커스 및 마우스 커서 스타일](#2-2-pc모바일-반응형-타이틀-포커스-및-마우스-커서-스타일)
   - [2-3. 주요 푸터 버튼 Hover Opacity & 아이콘 트랜지션](#2-3-주요-푸터-버튼-hover-opacity--아이콘-트랜지션)
   - [2-4. 푸터 모달 팝업 (`.footer-modal`) 라이트 테마 & 폰트 선명도 스타일 전체](#2-4-푸터-모달-팝업-footer-modal-라이트-테마--폰트-선명도-스타일-전체)
3. [JavaScript 변경 코드 (`app/static/js/ui.js`)](#3-javascript-변경-코드-appstaticjsuijs)
   - [3-1. PC 패밀리사이트 Focusout 자동 닫힘 스크립트](#3-1-pc-패밀리사이트-focusout-자동-닫힘-스크립트)
   - [3-2. PC/모바일 반응형 타이틀 `tabindex` 동적 제어](#3-2-pc모바일-반응형-타이틀-tabindex-동적-제어)
   - [3-3. `FooterModal` 레이어 팝업 컨트롤러 IIFE 모듈 전체](#3-3-footermodal-레이어-팝업-컨트롤러-iife-모듈-전체)

---

## 1. HTML 변경 코드 (`app/inc/footer.inc`)

### 1-1. 패밀리사이트 모바일 아코디언 `.footer__nav-box-inner` 래퍼 추가
> **수정 위치**: `app/inc/footer.inc` (약 97라인 ~ 135라인)

```html
<div class="footer__nav-box" id="footerNav05">
    <div class="footer__nav-box-inner">
        <ul class="footer__nav-list">
            <li class="footer__nav-item"><a href="https://www.samsungsds.com/kr/index.html" class="footer__nav-link" target="_blank" title="새창열림">삼성SDS 공식 홈페이지</a></li>
            <li class="footer__nav-item"><a href="https://www.samsungsds.com/kr/em-sol/em-sol.html" class="footer__nav-link" target="_blank" title="새창열림">Executive Briefing Center</a></li>
            <li class="footer__nav-item"><a href="https://www.cheil.com/kr" class="footer__nav-link" target="_blank" title="새창열림">Cheil Worldwide</a></li>
            <li class="footer__nav-item"><a href="https://www.samsungcard.com/home/main/MAIBHO0101M0.jsp" class="footer__nav-link" target="_blank" title="새창열림">Samsung Card</a></li>
            <li class="footer__nav-item"><a href="https://www.samsungfire.com/" class="footer__nav-link" target="_blank" title="새창열림">Samsung Fire &amp; Marine Insurance</a></li>
            <li class="footer__nav-item"><a href="https://www.samsunglife.com/" class="footer__nav-link" target="_blank" title="새창열림">Samsung Life Insurance</a></li>
            <li class="footer__nav-item"><a href="https://www.samsungpop.com/" class="footer__nav-link" target="_blank" title="새창열림">Samsung Securities</a></li>
        </ul>
        <ul class="footer__nav-list">
            <li class="footer__nav-item"><a href="https://www.brityworks.com/" class="footer__nav-link" target="_blank" title="새창열림">Brity Works</a></li>
            <li class="footer__nav-item"><a href="https://www.cello-square.com/kr/index.do" class="footer__nav-link" target="_blank" title="새창열림">Cello Square</a></li>
            <li class="footer__nav-item"><a href="https://cloud.samsungsds.com/serviceportal/index.html" class="footer__nav-link" target="_blank" title="새창열림">Samsung Cloud Platform</a></li>
            <li class="footer__nav-item"><a href="https://www.brightics.ai/" class="footer__nav-link" target="_blank" title="새창열림">Brightics AI</a></li>
        </ul>
    </div>
</div>
```

---

### 1-2. 개인정보방침 정책 링크 버튼 (`button`) 및 트리거 추가
> **수정 위치**: `app/inc/footer.inc` (약 265라인 ~ 285라인)

```html
<li class="footer__policy-item">
    <button type="button" class="footer__policy-link js-footer-modal-trigger" data-modal-target="#footerModalEmailPolicy" aria-haspopup="dialog">이메일무단수집거부</button>
</li>
<li class="footer__policy-item">
    <button type="button" class="footer__policy-link js-footer-modal-trigger" data-modal-target="#footerModalIdeaPolicy" aria-haspopup="dialog">아이디어 정책</button>
</li>
```

---

### 1-3. 푸터 하단 레이어 모달 팝업 2종 마크업 전체 추가
> **수정 위치**: `app/inc/footer.inc` 맨 아래 (약 295라인 ~ 363라인)

```html
<!-- 이메일무단수집거부 모달 레이어 팝업 -->
<div id="footerModalEmailPolicy" class="footer-modal" role="dialog" aria-modal="true" aria-labelledby="footerModalEmailTitle" aria-hidden="true" data-lenis-prevent>
    <div class="footer-modal__backdrop js-footer-modal-close"></div>
    <div class="footer-modal__dialog" tabindex="-1">
        <div class="footer-modal__header">
            <h2 id="footerModalEmailTitle" class="footer-modal__title">이메일주소 무단수집거부</h2>
        </div>
        <div class="footer-modal__body">
            <div class="footer-modal__content">
                <p class="footer-modal__desc">
                    본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 <strong>정보통신망법에 의해 형사 처벌</strong>됨을 유념하시기 바랍니다.
                </p>
                <div class="footer-modal__notice">
                    <p class="footer-modal__notice-title">관련 법률 : 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제50조의 2 (전자우편주소의 무단 수집행위 등 금지)</p>
                    <ul class="footer-modal__notice-list">
                        <li>누구든지 인터넷 홈페이지 운영자 또는 관리자의 사전 동의 없이 자동으로 전자우편주소를 수집하는 프로그램이나 그 밖의 기술적 장치를 이용하여 전자우편주소를 수집하여서는 아니 된다.</li>
                        <li>누구든지 제1항의 규정을 위반하여 수집된 전자우편주소를 판매·유통하여서는 아니 된다.</li>
                        <li>누구든지 제1항 및 제2항의 규정에 의하여 수집·판매 및 유통이 금지된 전자우편주소임을 알고 이를 정보 전송에 이용하여서는 아니 된다.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-modal__footer">
            <button type="button" class="footer-modal__btn footer-modal__btn--confirm js-footer-modal-close">확인</button>
            <button type="button" class="footer-modal__btn footer-modal__btn--close js-footer-modal-close">닫기</button>
        </div>
    </div>
</div>

<!-- 아이디어 정책 모달 레이어 팝업 -->
<div id="footerModalIdeaPolicy" class="footer-modal" role="dialog" aria-modal="true" aria-labelledby="footerModalIdeaTitle" aria-hidden="true" data-lenis-prevent>
    <div class="footer-modal__backdrop js-footer-modal-close"></div>
    <div class="footer-modal__dialog" tabindex="-1">
        <div class="footer-modal__header">
            <h2 id="footerModalIdeaTitle" class="footer-modal__title">아이디어 제안에 대한 정책</h2>
        </div>
        <div class="footer-modal__body">
            <div class="footer-modal__content">
                <p class="footer-modal__desc">
                    삼성SDS 및 삼성SDS 임직원은 당사가 공식적으로 요청하지 않았음에도 불구하고 여러분께서 일방적으로 당사에 제출하는 아이디어나 제안 등을 수령하거나 검토하지 않습니다.
                    <br>
                    이는 제출하신 내용이 당사 내부적으로 개발한 제품, 기술, 서비스와 유사할 경우 발생할 수 있는 오해와 분쟁을 방지하고 나아가 여러분의 창의적인 아이디어를 적극 보호하기 위함입니다.
                    <br>
                    이러한 취지를 이해하여 주시고 구체화되지 않은 아이디어나 콘셉트(Concept) 단계의 제안이 당사에 제출되지 않도록 하여 주시기 바랍니다.
                </p>
            </div>
        </div>
        <div class="footer-modal__footer">
            <button type="button" class="footer-modal__btn footer-modal__btn--close js-footer-modal-close">닫기</button>
        </div>
    </div>
</div>
```

---

## 2. SCSS 및 빌드된 CSS 변경 코드 (`_layout.scss` & `layout.css`)

### 2-1. 모바일 아코디언 멀티 리스트 래퍼 스타일

#### [SCSS 코드 - `app/static/scss/page/_layout.scss`]
```scss
.footer__nav-group:not(.footer__nav-group--quick) {
    .footer__nav-box-inner,
    .footer__nav-box > .footer__nav-list {
        min-height: 0;
        overflow: hidden;
        visibility: hidden;
    }

    .footer__nav-link {
        padding: rem(5) 0;
    }

    &.is-open {
        .footer__nav-box-inner,
        .footer__nav-box > .footer__nav-list {
            padding-bottom: rem(10);
            visibility: visible;
        }
    }
}
```

#### [빌드 완료 CSS 코드 - `dist/static/css/layout.css`]
```css
@media (max-width: 1023px) {
  .footer__nav-group:not(.footer__nav-group--quick) .footer__nav-box-inner,
  .footer__nav-group:not(.footer__nav-group--quick) .footer__nav-box > .footer__nav-list {
    min-height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .footer__nav-group:not(.footer__nav-group--quick) .footer__nav-link {
    padding: 0.5rem 0;
  }
  .footer__nav-group:not(.footer__nav-group--quick).is-open .footer__nav-box-inner,
  .footer__nav-group:not(.footer__nav-group--quick).is-open .footer__nav-box > .footer__nav-list {
    padding-bottom: 1rem;
    visibility: visible;
  }
}
```

---

### 2-2. PC/모바일 반응형 타이틀 포커스 및 마우스 커서 스타일

#### [SCSS 코드 - `app/static/scss/page/_layout.scss`]
```scss
.footer__nav-title {
    display: flex;
    align-items: center;
    gap: f-clamp(4, 8);
    margin-bottom: f-clamp(8, 10);
    width: 100%;
    font-size: f-clamp(14, 16);
    font-weight: 700;
    color: #fff;
    cursor: default;

    &:not(.footer__family-button) {
        @include media-min(ta) {
            cursor: default;
            pointer-events: none;

            &:focus,
            &:focus-visible {
                outline: none;
            }
        }
    }

    i {
        display: none;
        transition: transform 0.3s;
    }

    @include media(ta) {
        margin-bottom: 0;
        padding: rem(10) 0;
        justify-content: space-between;
        cursor: pointer;
        pointer-events: auto;

        i {
            display: block;
        }
    }
}

.footer__family-button {
    cursor: pointer;
    pointer-events: auto;
    transition: opacity 0.2s;

    i {
        display: block;
    }

    &:hover {
        opacity: 0.5;
    }

    @include media(ta) {
        padding: rem(10) 0;
        width: 100%;
        justify-content: space-between;
    }
}
```

#### [빌드 완료 CSS 코드 - `dist/static/css/layout.css`]
```css
.footer__nav-title {
  display: flex;
  align-items: center;
  gap: clamp(0.4rem, 0.4166666667vw, 0.8rem);
  margin-bottom: clamp(0.8rem, 0.5208333333vw, 1rem);
  width: 100%;
  font-size: clamp(1.4rem, 0.8333333333vw, 1.6rem);
  font-weight: 700;
  color: #fff;
  cursor: default;
}
@media (min-width: 1024px) {
  .footer__nav-title:not(.footer__family-button) {
    cursor: default;
    pointer-events: none;
  }
  .footer__nav-title:not(.footer__family-button):focus,
  .footer__nav-title:not(.footer__family-button):focus-visible {
    outline: none;
  }
}
.footer__nav-title i {
  display: none;
  transition: transform 0.3s;
}
@media (max-width: 1023px) {
  .footer__nav-title {
    margin-bottom: 0;
    padding: 1rem 0;
    justify-content: space-between;
    cursor: pointer;
    pointer-events: auto;
  }
  .footer__nav-title i {
    display: block;
  }
}

.footer__family-button {
  cursor: pointer;
  pointer-events: auto;
  transition: opacity 0.2s;
}
.footer__family-button i {
  display: block;
}
.footer__family-button:hover {
  opacity: 0.5;
}
```

---

### 2-3. 주요 푸터 버튼 Hover Opacity & 아이콘 트랜지션

#### [SCSS 코드 - `app/static/scss/page/_layout.scss`]
```scss
.footer__language-button {
    display: inline-flex;
    align-items: center;
    gap: f-clamp(4, 8);
    color: #fff;
    font-size: f-clamp(14, 16);
    font-weight: 800;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.5;
    }
}

.footer__top-button {
    margin-left: auto;
    display: flex;
    align-items: center;
    padding: 0;
    gap: rem(4);
    color: #fff;
    font-size: f-clamp(13, 14);
    font-weight: 800;
    order: 1;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.5;
    }

    i {
        width: f-clamp(10, 14);
        height: f-clamp(10, 14);
        transform: scaleY(-1);
    }
}
```

#### [빌드 완료 CSS 코드 - `dist/static/css/layout.css`]
```css
.footer__language-button {
  display: inline-flex;
  align-items: center;
  gap: clamp(0.4rem, 0.4166666667vw, 0.8rem);
  color: #fff;
  font-size: clamp(1.4rem, 0.8333333333vw, 1.6rem);
  font-weight: 800;
  cursor: pointer;
  transition: opacity 0.2s;
}
.footer__language-button:hover {
  opacity: 0.5;
}

.footer__top-button {
  margin-left: auto;
  display: flex;
  align-items: center;
  padding: 0;
  gap: 0.4rem;
  color: #fff;
  font-size: clamp(1.3rem, 0.7291666667vw, 1.4rem);
  font-weight: 800;
  order: 1;
  cursor: pointer;
  transition: opacity 0.2s;
}
.footer__top-button:hover {
  opacity: 0.5;
}
```

---

### 2-4. 푸터 모달 팝업 (`.footer-modal`) 라이트 테마 & 폰트 선명도 스타일 전체

#### [SCSS 코드 - `app/static/scss/page/_layout.scss`]
```scss
/* =========================
   Footer Modal Layer Popup (Light Theme)
========================= */
.footer-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: rem(20);
    visibility: hidden;
    transition: visibility 0.4s ease;

    &.is-active {
        visibility: visible;

        .footer-modal__backdrop {
            opacity: 1;
        }

        .footer-modal__dialog {
            transform: translateY(0);
            opacity: 1;
        }
    }

    &__backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    }

    &__dialog {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: rem(540);
        max-height: calc(100vh - 40px);
        background: #ffffff;
        color: #222222;
        border-radius: rem(16);
        box-shadow: 0 rem(15) rem(45) rgba(0, 0, 0, 0.22);
        border: rem(1) solid rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        transform: translateY(12px);
        opacity: 0;
        transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.3s ease;
        overflow: hidden;

        /* 레이어 완전 독립 분리 (배경 블러 + 선명한 텍스트 동시 구현) */
        isolation: isolate;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        &:focus {
            outline: none;
        }
    }

    &__header {
        display: flex;
        align-items: center;
        padding: rem(24) rem(28) rem(18);
        border-bottom: rem(1) solid #eeeeee;
    }

    &__title {
        font-size: f-clamp(18, 20);
        font-weight: 700;
        color: #111111;
        margin: 0;
        line-height: 1.3;
    }

    &__body {
        padding: rem(22) rem(28);
        overflow-y: auto;
        flex: 1;
        max-height: rem(400);
        font-size: f-clamp(14, 15);
        line-height: 1.65;
        color: #444444;

        /* Scrollbar styling */
        &::-webkit-scrollbar {
            width: rem(6);
        }

        &::-webkit-scrollbar-thumb {
            background: #cccccc;
            border-radius: rem(3);
        }
    }

    &__desc {
        margin-bottom: rem(16);
        color: #333333;

        strong {
            color: #0055ff;
            font-weight: 700;
        }
    }

    &__notice {
        background: #f8f9fa;
        border-radius: rem(10);
        padding: rem(16) rem(20);
        border: rem(1) solid #e9ecef;

        &-title {
            font-weight: 700;
            color: #111111;
            margin-bottom: rem(10);
            font-size: rem(13.5);
        }

        &-list {
            padding-left: rem(18);
            margin: 0;

            li {
                list-style-type: decimal;
                font-size: rem(13);
                color: #666666;
                margin-bottom: rem(6);

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        &-text {
            font-size: rem(13.5);
            color: #555555;
            margin-bottom: rem(10);

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: rem(10);
        padding: rem(16) rem(28) rem(20);
        border-top: rem(1) solid #eeeeee;
        background: #fafafa;
    }

    &__btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: rem(84);
        padding: rem(10) rem(22);
        font-size: rem(14);
        font-weight: 600;
        border-radius: rem(8);
        cursor: pointer;
        transition: all 0.2s ease;

        &:focus-visible {
            outline: rem(2) solid #0055ff;
            outline-offset: rem(2);
        }

        &--confirm {
            background-color: #0055ff;
            color: #ffffff;
            border: rem(1) solid #0055ff;

            &:hover {
                background-color: #0044cc;
                border-color: #0044cc;
            }
        }

        &--close {
            background-color: #ffffff;
            color: #444444;
            border: rem(1) solid #cccccc;

            &:hover {
                background-color: #f1f3f5;
                color: #111111;
                border-color: #bbbbbb;
            }
        }
    }
}
```

#### [빌드 완료 CSS 코드 - `dist/static/css/layout.css`]
```css
/* =========================
   Footer Modal Layer Popup (Light Theme)
========================= */
.footer-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  visibility: hidden;
  transition: visibility 0.4s ease;
}
.footer-modal.is-active {
  visibility: visible;
}
.footer-modal.is-active .footer-modal__backdrop {
  opacity: 1;
}
.footer-modal.is-active .footer-modal__dialog {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.footer-modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}
.footer-modal__dialog {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 54rem;
  max-height: calc(100vh - 40px);
  background: #ffffff;
  color: #222222;
  border-radius: 1.6rem;
  box-shadow: 0 1.5rem 4.5rem rgba(0, 0, 0, 0.22);
  border: 0.1rem solid rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transform: translateY(12px);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.3s ease;
  overflow: hidden;
  isolation: isolate;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.footer-modal__dialog:focus {
  outline: none;
}
.footer-modal__header {
  display: flex;
  align-items: center;
  padding: 2.4rem 2.8rem 1.8rem;
  border-bottom: 0.1rem solid #eeeeee;
}
.footer-modal__title {
  font-size: clamp(1.8rem, 1.0416666667vw, 2rem);
  font-weight: 700;
  color: #111111;
  margin: 0;
  line-height: 1.3;
}
.footer-modal__body {
  padding: 2.2rem 2.8rem;
  overflow-y: auto;
  flex: 1;
  max-height: 40rem;
  font-size: clamp(1.4rem, 0.78125vw, 1.5rem);
  line-height: 1.65;
  color: #444444;
}
.footer-modal__body::-webkit-scrollbar {
  width: 0.6rem;
}
.footer-modal__body::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 0.3rem;
}
.footer-modal__desc {
  margin-bottom: 1.6rem;
  color: #333333;
}
.footer-modal__desc strong {
  color: #0055ff;
  font-weight: 700;
}
.footer-modal__notice {
  background: #f8f9fa;
  border-radius: 1rem;
  padding: 1.6rem 2rem;
  border: 0.1rem solid #e9ecef;
}
.footer-modal__notice-title {
  font-weight: 700;
  color: #111111;
  margin-bottom: 1rem;
  font-size: 1.35rem;
}
.footer-modal__notice-list {
  padding-left: 1.8rem;
  margin: 0;
}
.footer-modal__notice-list li {
  list-style-type: decimal;
  font-size: 1.3rem;
  color: #666666;
  margin-bottom: 0.6rem;
}
.footer-modal__notice-list li:last-child {
  margin-bottom: 0;
}
.footer-modal__notice-text {
  font-size: 1.35rem;
  color: #555555;
  margin-bottom: 1rem;
}
.footer-modal__notice-text:last-child {
  margin-bottom: 0;
}
.footer-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.6rem 2.8rem 2rem;
  border-top: 0.1rem solid #eeeeee;
  background: #fafafa;
}
.footer-modal__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 8.4rem;
  padding: 1rem 2.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.footer-modal__btn:focus-visible {
  outline: 0.2rem solid #0055ff;
  outline-offset: 0.2rem;
}
.footer-modal__btn--confirm {
  background-color: #0055ff;
  color: #ffffff;
  border: 0.1rem solid #0055ff;
}
.footer-modal__btn--confirm:hover {
  background-color: #0044cc;
  border-color: #0044cc;
}
.footer-modal__btn--close {
  background-color: #ffffff;
  color: #444444;
  border: 0.1rem solid #cccccc;
}
.footer-modal__btn--close:hover {
  background-color: #f1f3f5;
  color: #111111;
  border-color: #bbbbbb;
}
```

---

## 3. JavaScript 변경 코드 (`app/static/js/ui.js`)

### 3-1. PC 패밀리사이트 Focusout 자동 닫힘 스크립트
> **수정 위치**: `app/static/js/ui.js` (약 1785라인 ~ 1800라인 & 1835라인 ~ 1855라인)

```javascript
function bindPcFamilyLastFocusClose() {
    const $lastItem = $familyBox.find("a, button").last();

    $lastItem.off(`keydown${EVENT_NAMESPACE}FamilyLast`).on(`keydown${EVENT_NAMESPACE}FamilyLast`, function (e) {
        if (e.key === "Tab" && !e.shiftKey) {
            closePcFamily();
        }
    });
}

function enablePcFamily() {
    $familyButton
        .off(`click${EVENT_NAMESPACE}Family`)
        .on(`click${EVENT_NAMESPACE}Family`, function (e) {
            e.stopPropagation();
            const isOpen = $familyBox.hasClass(ACTIVE_CLASS);

            closePopup();

            if (!isOpen) {
                $familyBox.addClass(ACTIVE_CLASS);
                $familyButton.attr("aria-expanded", "true");

                bindPcFamilyOutsideClick();
                bindPcFamilyLastFocusClose();
            }
        });
}

function disablePcFamily() {
    $familyButton.off(`click${EVENT_NAMESPACE}Family`);

    const $lastItem = $familyBox.find("a, button").last();
    $lastItem.off(`keydown${EVENT_NAMESPACE}FamilyLast`);

    closePcFamily();
}
```

---

### 3-2. PC/모바일 반응형 타이틀 `tabindex` 동적 제어
> **수정 위치**: `app/static/js/ui.js` (약 1893라인 ~ 1906라인)

```javascript
function enableMobile() {
    disablePcFamily();
    enableMobileNav();

    $navTitle.not($familyTitle).removeAttr("tabindex");
}

function enablePc() {
    disableMobileNav();
    enablePcFamily();

    $navTitle.not($familyTitle).attr("tabindex", "-1").removeAttr("aria-expanded");
    $familyTitle.removeAttr("tabindex");
}
```

---

### 3-3. `FooterModal` 레이어 팝업 컨트롤러 IIFE 모듈 전체
> **수정 위치**: `app/static/js/ui.js` 맨 아래 (약 2920라인 ~ 3070라인)

```javascript
const FooterModal = (function () {
    const ACTIVE_CLASS = "is-active";
    const EVENT_NAMESPACE = ".footerModal";

    let lastFocusedElement = null;
    let $currentModal = null;

    function getFocusableElements($container) {
        return $container
            .find(["a[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[tabindex]:not([tabindex="-1"])'].join(","))
            .filter(":visible");
    }

    function openModal($modal, triggerElement) {
        if (!$modal || !$modal.length) return;

        if ($currentModal && $currentModal.length) {
            closeModal($currentModal, false);
        }

        lastFocusedElement = triggerElement || document.activeElement;
        $currentModal = $modal;

        $modal.addClass(ACTIVE_CLASS).attr("aria-hidden", "false");

        setTimeout(function () {
            const $focusable = getFocusableElements($modal.find(".footer-modal__dialog"));
            if ($focusable.length) {
                $focusable.first().focus();
            } else {
                $modal.find(".footer-modal__dialog").attr("tabindex", "-1").focus();
            }
        }, 50);

        bindEvents($modal);
    }

    function closeModal($modal, restoreFocus = true) {
        const $targetModal = $modal || $currentModal;
        if (!$targetModal || !$targetModal.length) return;

        $targetModal.removeClass(ACTIVE_CLASS).attr("aria-hidden", "true");

        unbindEvents();

        if (restoreFocus && lastFocusedElement) {
            try {
                lastFocusedElement.focus();
            } catch (e) {}
        }

        $currentModal = null;
    }

    function bindEvents($modal) {
        unbindEvents();

        $modal.on(`click${EVENT_NAMESPACE}`, ".js-footer-modal-close", function (e) {
            e.preventDefault();
            closeModal($modal);
        });

        $(document).on(`keydown${EVENT_NAMESPACE}`, function (e) {
            if (e.key === "Escape" || e.keyCode === 27) {
                closeModal($modal);
            }
        });

        $modal.on(`keydown${EVENT_NAMESPACE}`, function (e) {
            if (e.key !== "Tab" && e.keyCode !== 9) return;

            const $dialog = $modal.find(".footer-modal__dialog");
            const $focusable = getFocusableElements($dialog);
            if (!$focusable.length) return;

            const $first = $focusable.first();
            const $last = $focusable.last();

            if (e.shiftKey) {
                if (document.activeElement === $first[0] || document.activeElement === $dialog[0]) {
                    e.preventDefault();
                    $last.focus();
                }
            } else {
                if (document.activeElement === $last[0]) {
                    e.preventDefault();
                    $first.focus();
                }
            }
        });
    }

    function unbindEvents() {
        if ($currentModal) {
            $currentModal.off(EVENT_NAMESPACE);
        }
        $(document).off(EVENT_NAMESPACE);
    }

    function init() {
        $(document).on("click", ".js-footer-modal-trigger", function (e) {
            e.preventDefault();
            const targetSelector = $(this).attr("data-modal-target");
            if (targetSelector) {
                openModal($(targetSelector), this);
            }
        });
    }

    return {
        init: init,
        open: openModal,
        close: closeModal,
    };
})();

$(function () {
    FooterModal.init();
});
```
