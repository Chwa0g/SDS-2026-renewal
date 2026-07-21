# 🚀 jQuery 4.0.0 마이그레이션 & 호환성 보고서 (Event Test)

> **프로젝트:** SDS 2026 Renewal (`event-test` 및 관련 모듈)  
> **목적:** jQuery 4.0.0 업데이트 시 발생할 수 있는 Sizzle 제거(DOMException), `jQuery.cssNumber` 삭제, `jQuery.fn.sort` 삭제, 런타임 Null/Undefined 에러 해결 가이드  
> **웹 보고서:** 브라우저에서 보시려면 최상단의 `index-report.html` 파일이나 `kr/event/index-report.html` 파일을 더블 클릭하여 실행하세요.

---

## 📋 목차
- [1. 마이그레이션 배경 및 핵심 변경점](#1-마이그레이션-배경-및-핵심-변경점)
- [2. 수정 대상 파일 및 현황 요약](#2-수정-대상-파일-및-현황-요약)
- [3. 파일별 상세 수정 내역 (Before & After)](#3-파일별-상세-수정-내역-before--after)
  - [event_render.js](#1-event_renderjs)
  - [libs.js](#2-libsjs)
  - [module.js](#3-modulejs)
  - [common_module.js](#4-common_modulejs)
  - [ion_common.js](#5-ion_commonjs)
  - [extension2.js](#6-extension2js)
  - [owl.carousel.min.js](#7-owlcarouselminjs)
  - [blog.js](#8-blogjs)

---

## 1. 마이그레이션 배경 및 핵심 변경점

1. **Sizzle 선택자 엔진 제거 (Native `querySelectorAll` 전환)**
   - jQuery 4.0.0은 비표준 의사 선택자(`:first`, `:last`, `:eq()`, `:visible`, `:hidden`, `:radio`, `:checkbox`, `:header`)를 탐색 구문 내에서 직접 처리하던 Sizzle 엔진을 완전히 제거했습니다.
   - `$()`, `.find()`, `.children()`, `on('change', ...)` 등에 전달되는 셀렉터 문자열 내 비표준 선택자는 브라우저 `querySelectorAll` 구문 에러(`DOMException`)를 유발하므로 표준 CSS 선택자(`input[type="checkbox"]`, `input[type="radio"]`)나 pure jQuery 메서드(`.first()`, `.last()`, `.filter()`)로 분리해야 합니다.

2. **`jQuery.cssNumber` 삭제 대처**
   - jQuery 4.0.0 Core에서 `jQuery.cssNumber` 객체가 삭제되었습니다.
   - `libs.js`에서 `$j.cssNumber = {}` 안전 초기화 코드가 적용되어 런타임 에러를 방지합니다.

3. **`jQuery.fn.sort` 별칭 삭제 대처 (Array `.get().sort()` 전환)**
   - jQuery 4.0.0에서 `jQuery.fn.sort` 별칭 메서드가 삭제되었습니다.
   - `.map()` 호출 결과를 정렬할 때 `.map(...).sort(...)`를 직접 실행하면 `TypeError: ...map(...).sort is not a function`이 발생하므로 `.map(...).get().sort(...)`와 같이 순수 JS Array로 변환 후 정렬하도록 개작했습니다.

4. **DOM / 플러그인 초기화 지연 방어**
   - Flickity `flkty` 객체 미생성 시 `flkty.slides` 참조 에러에 대한 널 방어 체킹(`if (flkty && flkty.slides)`)을 추가했습니다.

---

## 2. 수정 대상 파일 및 현황 요약

| 파일 경로 | 수정 구문 수 | 주요 수정 내용 |
| :--- | :---: | :--- |
| `www.samsungsds.com/resource/kr/js/event_render.js` | 6건 | `:checkbox` $\rightarrow$ `input[type='checkbox']` 교체, `:first` $\rightarrow$ `.first()` 변환 |
| `www.samsungsds.com/module_src/js/j4/libs.js` | 1건 | `$j.cssNumber = {}` 초기화로 `jQuery.cssNumber` 삭제 대처 |
| `www.samsungsds.com/module_src/js/j4/module.js` | 12건 | `[href]:visible`, `:first`, `:visible`, `:last` 분리, `flkty` 체킹, `.map().get().sort()` 5곳 수정 |
| `www.samsungsds.com/module_src/js/j4/common_module.js` | 4건 | `:visible` 필터 분리 |
| `www.samsungsds.com/resource/kr/js/ion_common.js` | 1건 | `find()` 내 `:visible` 필터 분리 |
| `www.samsungsds.com/resource/kr/js/j4/extension2.js` | 8건 | `:first`, `:last`, `:radio`, `:checkbox`, `:header` 변환 |
| `www.samsungsds.com/resource/kr/js/j4/owl.carousel.min.js` | 1건 | `:eq(...)` 문자열 결합 구조를 `.eq()` 루프로 개작 |
| `www.samsungsds.com/resource/kr/js/blog.js` | 2건 | `find()` 내 `:first` 구문 분리 |

---

## 3. 파일별 상세 수정 내역 (Before & After)

### 1. `event_render.js`
- **위치 1 (L906, L908):** 오퍼링 필터 전체 선택
  ```diff
  - $('#offering-menu :checkbox').prop('checked', true);
  + $('#offering-menu input[type="checkbox"]').prop('checked', true);
  ```
- **위치 2 (L915, L917):** 콘텐츠 필터 전체 선택
  ```diff
  - $('#content-menu :checkbox').prop('checked', true);
  + $('#content-menu input[type="checkbox"]').prop('checked', true);
  ```
- **위치 3 (L1003):** 오퍼링 필터 변경 이벤트
  ```diff
  - $(document).on('change', '#offering-menu :checkbox', function () {
  + $(document).on('change', '#offering-menu input[type="checkbox"]', function () {
  ```
- **위치 4 (L1024):** 콘텐츠 필터 변경 이벤트
  ```diff
  - $(document).on('change', '#content-menu :checkbox', function () {
  + $(document).on('change', '#content-menu input[type="checkbox"]', function () {
  ```
- **위치 5 (L1051):** Location 필터 변경 이벤트
  ```diff
  - $(document).on('change', '.fil_tb[name=locations] :checkbox', function () {
  + $(document).on('change', '.fil_tb[name=locations] input[type="checkbox"]', function () {
  ```
- **위치 6 (L1356):** 검색버튼 포커스
  ```diff
  - $(".btn_sch_ip:first").focus();
  + $(".btn_sch_ip").first().focus();
  ```

### 2. `libs.js`
- **위치 (L10):**
  ```diff
  + if (!$j.cssNumber) $j.cssNumber = {};
  ```

### 3. `module.js`
- **위치 1 (L1773):** 검색 박스 대화형 요소 추출
  ```diff
  - $nav_search_boxWrap.find("... [href]:visible ...")
  + $nav_search_boxWrap.find("... [href] ...").filter(':visible')
  ```
- **위치 2 (L7712):** Flickity 슬라이더 안전 업데이트
  ```diff
  - if (flkty.slides) {
  + if (flkty && flkty.slides) {
  ```
- **위치 3 (L7865~7866, L18480, L33747~33748):** `.map().get().sort()` 변환
  ```diff
  - const titH = _this.$carousel.find('.md_tit').map((i, a)=> a.scrollHeight ).sort((a, b) => b-a)[0];
  + const titH = _this.$carousel.find('.md_tit').map((i, a)=> a.scrollHeight ).get().sort((a, b) => b-a)[0];
  ```

### 4. `common_module.js`
- **위치 1 (L872, L903):** 공유 레이어 포커스 트랩
  ```diff
  - $shareBox.find('a:visible, button:visible')
  + $shareBox.find('a, button').filter(':visible')
  ```

### 5. `ion_common.js`
- **위치 (L656):** `focusTrapOn`
  ```diff
  - mdShareBTn.find('a:visible, button:visible').first().focus();
  + mdShareBTn.find('a, button').filter(':visible').first().focus();
  ```

### 6. `extension2.js`
- **위치 1 (L1715~1725):** 라디오 연동
  ```diff
  - $(".select_group_1 :radio")
  + $(".select_group_1 input[type='radio']")
  ```

### 7. `owl.carousel.min.js`
- **위치 (L229~230):** Active 클래스 토글
  ```diff
  - this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass)
  + var $ch = this.$stage.children(), actCls = this.settings.activeClass;
  + a.each(i, function (idx, val) { $ch.eq(val).addClass(actCls) });
  ```

### 8. `blog.js`
- **위치 (L864, L865):** EBC 탭 컨트롤러
  ```diff
  - first_trigger = targets.find('.ebc-tab-triggers:first').parents('li'),
  + first_trigger = targets.find('.ebc-tab-triggers').first().parents('li'),
  ```
