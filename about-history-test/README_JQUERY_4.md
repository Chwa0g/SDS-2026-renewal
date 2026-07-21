# 📜 jQuery 4.0.0 베이스 코드 ➔ 결과물 상세 변경 보고서

> **프로젝트:** SDS 2026 Renewal (`about-history-test` 연혁 페이지)  
> **핵심 기능:** 왼쪽 네비게이션으로 각 파일별 수정 위치 즉시 이동, 라인 번호(Line Number) 기준 수정 전(Before) / 수정 후(After) 코드 명확히 대조  
> **웹 보고서:** 브라우저에서 보시려면 [`index-report.html`](file:///c:/Users/화영/Desktop/sds-2026-renewal/about-history-test/index-report.html) 또는 [`kr/company/history/index-report.html`](file:///c:/Users/화영/Desktop/sds-2026-renewal/about-history-test/kr/company/history/index-report.html)을 실행하세요.

---

## 📌 파일별 정확한 수정 위치 및 코드 대조 (Line-by-Line Audit)

### 1. `module_src/js/j4/module.js`
- **📍 L25360 ~ L25390 (`MP_history` 연도 탭 스크롤 조치):**
  - **사유:** 탭 버튼 클릭 시 `e.preventDefault()` 누락으로 인한 `#` 앵커 상단 튕김 차단, Swiper 11 전역 위임 이벤트 변경, 헤더/탭바 높이 계산 오프셋 스크롤 구현.
  ```javascript
  // [수정 전 L25360]
  _this.tabWrap.$btn.on('click', function() {
      var thisIdx = $(this).closest('li').index();
      var thisPanel = _this.$tabPanel.eq(thisIdx);
      var thisPanelTop = parseInt(thisPanel.offset().top);
      $('html, body').stop().animate({ scrollTop: thisPanelTop - ($hdHeight + tabHeight + btnPadding) });
  });

  // [수정 후 L25360]
  $(document).on('click', '.tab_slide_area .tab_btn', function(e) {
      if (e) e.preventDefault(); // 앵커 기본 해시(#) 이동 차단
      var $this = $(this);
      var thisIdx = $this.closest('li').index();
      var thisPanel = _this.$tabPanel.eq(thisIdx); // 해당 섹션 패널 (#tab1 ~ #tab4)
      if (!thisPanel.length) return;

      var curHdHeight = ($hd && $hd.find('.inner').length) ? $hd.find('.inner').height() : ($hd.height() || 80);
      var curTabHeight = (_this.tabWrap.$area && _this.tabWrap.$area.length) ? _this.tabWrap.$area.innerHeight() : 60;
      var btnPadding = (checkDeviceType() === 'PC') ? 50 : 100;

      $('.tab_slide_area .tab_btn').removeClass('active');
      $this.addClass('active');

      var targetScroll = parseInt(thisPanel.offset().top) - (curHdHeight + curTabHeight + btnPadding);
      $('html, body').stop().animate({ scrollTop: targetScroll }, 500);
  });
  ```

- **📍 L7865, L7866, L18480, L33747, L33748 (`jQuery.fn.sort` 별칭 삭제 대처):**
  - **사유:** jQuery 4.0.0에서 삭제된 `.sort()` 직접 호출 대신 `.get().sort()`로 전환하여 `TypeError` 예외 조치.
  ```javascript
  // [수정 전 L7865]
  const titH = _this.$carousel.find('.md_tit').map((i, a)=> a.scrollHeight ).sort((a, b) => b-a)[0];

  // [수정 후 L7865]
  const titH = _this.$carousel.find('.md_tit').map((i, a)=> a.scrollHeight ).get().sort((a, b) => b-a)[0];
  ```

- **📍 L7712 (`setSlideUpdate` Flickity 널 방어):**
  - **사유:** `flkty` 객체 undefined 시 `TypeError: Cannot read properties of undefined` 예외 방어.
  ```javascript
  // [수정 전 L7712]
  if (flkty.slides) { ... }

  // [수정 후 L7712]
  if (flkty && flkty.slides) { ... }
  ```

---

### 2. `module_src/js/j4/common_module.js`
- **📍 L872, L903 (`focusTrapOn` & `shareBox` 가시성 필터 분리):**
  - **사유:** Sizzle 비표준 `:visible` 선택자가 `querySelectorAll`과 혼용 시 발생하는 `DOMException` 방지.
  ```javascript
  // [수정 전 L872]
  var $shareBoxBtn = $shareBox.find('a:visible, button:visible');

  // [수정 후 L872]
  var $shareBoxBtn = $shareBox.find('a, button').filter(':visible');
  ```

---

### 3. `resource/kr/js/j4/extension2.js`
- **📍 L1856, L2140, L3410 (폼 선택자 개작):**
  - **사유:** `:radio`, `:checkbox`, `:header:first` 구문을 CSS 표준 및 pure jQuery 메서드로 치환.
  ```javascript
  // [수정 전 L1856]
  $(".select_group_1 :radio")
  headEl.find(':header:first')

  // [수정 후 L1856]
  $(".select_group_1 input[type='radio']")
  headEl.find('h1, h2, h3, h4, h5, h6').first()
  ```

---

### 4. `resource/kr/js/ion_common.js`
- **📍 L196 (`$.trim()` 유틸리티 제거 대응):**
  - **사유:** jQuery 4.0.0에서 삭제된 `$.trim()`을 Native `String.prototype.trim()`으로 변경.
  ```javascript
  // [수정 전 L196]
  content = $.trim(content);

  // [수정 후 L196]
  content = (content || "").trim();
  ```

---

### 5. `module_src/js/j4/libs.js`
- **📍 L10 & `jquery.transit` 내부 `d(e, s)` 함수:**
  - **사유:** jQuery 4.0.0에서 삭제된 `jQuery.cssNumber` 객체 안전 초기화.
  ```javascript
  // [수정 전 L10]
  t.cssNumber["scale"] = true // TypeError 발생!

  // [수정 후 L10]
  if (!$j.cssNumber) $j.cssNumber = {};
  s || ((t.cssNumber = t.cssNumber || {})[e] = !0)
  ```
