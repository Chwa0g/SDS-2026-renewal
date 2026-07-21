# 📦 jQuery 4.0.0 통합 공통 스크립트 모음 (`4.0-버전업`) 및 종합 비교 리포트

> **작성 목적:** 차장님 업데이트 폴더(`제이쿼리업데이트-차장님`)와 테스트 폴더(`case-study-test`, `event-test`)의 자바스크립트 수정을 상호 검토/보완하여, **jQuery 4.0.0 완벽 호환 공통 스크립트 11종**을 `4.0-버전업` 폴더에 최종 집약하고 상세 작업 리포트를 제공합니다.

---

## 📋 목차
- [1. 두 작업 간 상호 비교 및 보완점 분석](#1-두-작업-간-상호-비교-및-보완점-분석)
- [2. `4.0-버전업` 폴더 내 최종 공통 스크립트 11종 현황](#2-40-버전업-폴더-내-최종-공통-스크립트-11종-현황)
- [3. 파일별 세부 수정 내역 (Before & After)](#3-파일별-세부-수정-내역-before--after)
  - [1. module.js](#1-modulejs)
  - [2. common_module.js](#2-common_modulejs)
  - [3. extension2.js & extension_ko.js](#3-extension2js--extension_kojs)
  - [4. ion_common.js](#4-ion_commonjs)
  - [5. owl.carousel.min.js](#5-owlcarouselminjs)
  - [6. libs.js](#6-libsjs)
  - [7. popup.js](#7-popupjs)
  - [8. jquery.cookie.min.js](#8-jquerycookieminjs)
  - [9. blog.js](#9-blogjs)
  - [10. event_render.js](#10-event_renderjs)
- [4. 최종 검증 결과](#4-최종-검증-결과)

---

## 1. 두 작업 간 상호 비교 및 보완점 분석

### 🔍 작업1: `제이쿼리업데이트-차장님` 작업 특징
- **강점 (API 현대화):**
  - jQuery 4.0.0에서 삭제된 구형 이벤트 바인딩 메서드(`.bind()`, `.unbind()`)를 모던 웹 표준 `.on()`, `.off()`로 전면 수용.
  - `$(window).load(...)` 구문을 `$(window).on('load', ...)`로 현대화.
  - `$.trim(str)` 구형 유틸리티를 JavaScript 네이티브 `(str || "").trim()`으로 교체.
  - `jquery.cookie.min.js`의 `$.isFunction()`을 `typeof fn === 'function'`으로 개작.
  - `owl.carousel.min.js`의 삭제된 `.andSelf()`를 `.addBack()`으로 변환.
- **누락/미반영 사항:**
  - Sizzle 엔진 제거에 따른 비표준 의사 선택자(`:first`, `:last`, `:eq()`, `:visible`, `:hidden`, `:radio`, `:checkbox`, `:header`)가 셀렉터 문자열 내에 잔재하여, 브라우저 실행 시 `DOMException: Failed to execute 'querySelectorAll'` 발생.
  - `jQuery.cssNumber` 제거 및 `jQuery.fn.sort` 별칭 제거로 인한 `TypeError` 미대처.

---

### 🔍 작업2: `-test` (case-study / event-test) 작업 특징
- **강점 (Sizzle 제거 & 런타임 오류 방어):**
  - jQuery 4.0.0 네이티브 `querySelectorAll` 구문 예외(DOMException)를 유발하는 탐색 문자열 내 비표준 선택자를 100% 제거하고 Pure API 메서드(`.first()`, `.last()`, `.eq()`, `.filter(':visible')`) 및 CSS 표준 속성 선택자로 개작.
  - `jQuery.cssNumber` 삭제 대처 (`libs.js` 객체 안전 초기화).
  - `jQuery.fn.sort` 삭제 대처 (`module.js` 내 `.map().get().sort()` 5곳 전환).
  - DOM 미완료 및 Flickity 미초기화 시 널 참참조 방어 (`if (flkty && flkty.slides)`, `scrollUp` null guard).

---

### 🤝 상호 보완을 통한 최종 완성 (`4.0-버전업`)
> **`4.0-버전업` 폴더에는 차장님의 "API 현대화(Modernization)" 작업과 본 작업의 "Sizzle 제거 & 런타임 오류 방어(querySelectorAll & TypeError Defense)" 작업을 100% 결합하여, 단 하나의 구문 에러나 경고 없이 동작하는 최종 공통 스크립트 11종을 통합 수록하였습니다.**

---

## 2. `4.0-버전업` 폴더 내 최종 공통 스크립트 11종 현황

| 파일명 | 파일 설명 | 통합 적용 내용 |
| :--- | :--- | :--- |
| **`module.js`** | SDS 핵심 통합 모듈 (GNB/RNB/슬라이더) | `.bind` $\rightarrow$ `.on`, `:visible`/`:first`/`:last` 분리, Flickity null guard, `.map().get().sort()` 적용 |
| **`common_module.js`** | 레이어 팝업 및 공통 모듈 | `.bind` $\rightarrow$ `.on`, 공유 레이어 포커스 트랩 & 띠배너 가시성 `:visible` 분리 |
| **`extension2.js`** | 확장 모듈 & 대화형 폼 UI | `.bind` $\rightarrow$ `.on`, `:radio`, `:checkbox`, `:header:first`, `:first`/`:last` 분리 |
| **`extension_ko.js`** | 국문 확장 스크립트 | `.bind` $\rightarrow$ `.on`, `.unbind` $\rightarrow$ `.off`, `$(window).on('load')` 현대화 |
| **`ion_common.js`** | ION 공통 프레임워크 | `.bind` $\rightarrow$ `.on`, `focusTrapOn` 내 `:visible` 분리, `$.trim` $\rightarrow$ native `.trim()` |
| **`owl.carousel.min.js`** | 메인 슬라이더 라이브러리 | `.andSelf()` $\rightarrow$ `.addBack()`, `:eq(...)` 동적 선택자 결합 $\rightarrow$ `.eq(idx)` 루프 전환 |
| **`libs.js`** | 서드파티 라이브러리 번들 | `$j.cssNumber` 대처 유틸리티 및 `jquery.transit` internal `d` 함수 방어 코드 추가 |
| **`popup.js`** | 레이어 팝업 & 스크롤 락 | Lenis & 모바일 터치 스크롤 락 `touchmove` `.bind()`/`.unbind()` $\rightarrow$ `.on()`/`.off()` 변환 |
| **`jquery.cookie.min.js`** | 쿠키 제어 라이브러리 | `$.isFunction()` $\rightarrow$ `typeof fn === 'function'` 안전 체킹 변환 |
| **`blog.js`** | 블로그 / EBC 모듈 | EBC 탭 컨트롤러 탐색 내 `:first` $\rightarrow$ `.first()` 분리 |
| **`event_render.js`** | 이벤트 동적 렌더링 | 오퍼링/콘텐츠/위치 필터 내 `:checkbox` $\rightarrow$ `input[type="checkbox"]` 및 `:first` 분리 |

---

## 3. 파일별 세부 수정 내역 (Before & After)

### 1. `module.js`
- **Flickity 슬라이더 널 참조 방어:**
  ```diff
  - if (flkty.slides) {
  + if (flkty && flkty.slides) {
  ```
- **jQuery 4.0 `jQuery.fn.sort` 삭제 대처 (L7865~7866, L18480, L33747~33748):**
  ```diff
  - const titH = _this.$carousel.find('.md_tit').map((i, a)=> a.scrollHeight ).sort((a, b) => b-a)[0];
  + const titH = _this.$carousel.find('.md_tit').map((i, a)=> a.scrollHeight ).get().sort((a, b) => b-a)[0];
  ```
- **Sizzle 비표준 선택자 제거 (L1773, L2604, L2710, L14764, L24574):**
  ```diff
  - $nav_search_boxWrap.find("... [href]:visible ...")
  + $nav_search_boxWrap.find("... [href] ...").filter(':visible')
  ```

### 2. `common_module.js`
- **공유 레이어 포커스 트랩 가시성 필터 (L872, L903):**
  ```diff
  - var $shareBoxBtn = $shareBox.find('a:visible, button:visible');
  + var $shareBoxBtn = $shareBox.find('a, button').filter(':visible');
  ```

### 3. `extension2.js` & `extension_ko.js`
- **라디오/체크박스/헤더 선택자 표준화:**
  ```diff
  - $(".select_group_1 :radio")
  + $(".select_group_1 input[type='radio']")
  - find(':header:first')
  + find('h1, h2, h3, h4, h5, h6').first()
  ```

### 4. `ion_common.js`
- **유틸리티 & 포커스 트랩:**
  ```diff
  - content = $.trim(content);
  + content = (content || "").trim();
  - mdShareBTn.find('a:visible, button:visible').first().focus();
  + mdShareBTn.find('a, button').filter(':visible').first().focus();
  ```

### 5. `owl.carousel.min.js`
- **`.andSelf()` 및 `:eq()` 이중 보완:**
  ```diff
  - this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(...)
  + var $ch = this.$stage.children(), actCls = this.settings.activeClass;
  + a.each(i, function (idx, val) { $ch.eq(val).addClass(actCls) });
  ```

---

## 4. 최종 검증 결과

1. **에러 0건 수렴:** 브라우저 콘솔에서 `DOMException (querySelectorAll)`, `TypeError (cssNumber)`, `TypeError (map().sort is not a function)`, `TypeError (flkty.slides)` 등 모든 에러가 소멸했습니다.
2. **이벤트 정상 구동:** GNB/RNB 대화형 포커스 이동, OwlCarousel/Flickity 슬라이드 애니메이션, 팝업 스크롤 락, 동적 필터 조작이 신규 jQuery 4.0.0 상에서 매끄럽게 구동됩니다.
