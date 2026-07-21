# 📜 jQuery 4.0.0 베이스 코드 ➔ 100% 정밀 소스 변경 보고서 (Ground Truth)

> **프로젝트:** SDS 2026 Renewal  
> **핵심 원칙:** 실제 디스크에 저장된 소스 파일의 **정확한 줄 번호(Line Number)** 및 100% 일치하는 수정 전/후 코드만을 기록  
> **웹 보고서 보기:** [index-report.html](file:///c:/Users/화영/Desktop/sds-2026-renewal/index-report.html)

---

## 📌 파일별 정확한 수정 위치 및 100% 정밀 대조

### 1. `module_src/js/j4/module.js` (또는 `www.samsungsds.com/module_src/js/j4/module.js`)
- **📍 L25360 ~ L25391 (`MP_history` 연도 탭 스크롤 조치)**
  - **수정 전 (L25360):** `_this.tabWrap.$btn.on('click', function() { ... parseInt(thisPanel.offset().top) - ... });`
  - **수정 후 (L25360):** `$(document).on('click', '.tab_slide_area .tab_btn', function(e) { if (e) e.preventDefault(); ... });`
- **📍 L7865, L7866, L14146, L18480, L33748, L33749, L39777, L40046, L40580, L40711 (`jQuery.fn.sort` 삭제 대응)**
  - **수정 전:** `const titH = _this.$carousel.find('.md_tit').map((i, a)=> a.scrollHeight ).sort((a, b) => b-a)[0];`
  - **수정 후:** `const titH = _this.$carousel.find('.md_tit').map((i, a)=> a.scrollHeight ).get().sort((a, b) => b-a)[0];`
- **📍 L7712 (`setSlideUpdate` Flickity 널 방어)**
  - **수정 전:** `if (flkty.slides) { ... }`
  - **수정 후:** `if (flkty && flkty.slides) { ... }`
- **📍 L1773, L2710, L24574 (Sizzle 가시성 필터 분리)**
  - **수정 전:** `find("[href]:visible")` / `find('a:visible:first')`
  - **수정 후:** `find("[href]").filter(':visible')` / `find('a').filter(':visible').first()`

---

### 2. `resource/kr/js/event_render.js` (또는 `www.samsungsds.com/resource/kr/js/event_render.js`)
- **📍 L356, L880, L887, L906, L915, L1003, L1024, L1051 (`:checkbox` 의사 선택자 표준화)**
  - **수정 전:** `$('.event_filterCheck :checkbox:checked').each(function () { ... })`  
    `$('#offering-menu :checkbox').prop('checked', true);`
  - **수정 후:** `$('.event_filterCheck input[type=checkbox]:checked').each(function () { ... })`  
    `$('#offering-menu input[type="checkbox"]').prop('checked', true);`
- **📍 L1356 (`:first` 의사 선택자 분리)**
  - **수정 전:** `$(".btn_sch_ip:first").focus();`
  - **수정 후:** `$(".btn_sch_ip").first().focus();`

---

### 3. `resource/kr/js/ion_common.js`
- **📍 L196 (`$.trim()` 삭제 대응)**
  - **수정 전:** `content = $.trim(content);`
  - **수정 후:** `content = (content || "").trim();`
- **📍 L656 (`focusTrapOn` 가시성 필터 분리)**
  - **수정 전:** `mdShareBTn.find('a:visible, button:visible').first().focus();`
  - **수정 후:** `mdShareBTn.find('a, button').filter(':visible').first().focus();`

---

### 4. `resource/kr/js/j4/extension2.js`
- **📍 L1715, L1716, L1724, L1725, L2609, L2610 (`:radio`, `:checkbox` 표준화)**
  - **수정 전:** `if ($(".select_group_1 :radio").length > 1)`
  - **수정 후:** `if ($(".select_group_1 input[type='radio']").length > 1)`
- **📍 L2286 (`:header:first` 개작)**
  - **수정 전:** `btn.parent().parent().find(':header:first').text()`
  - **수정 후:** `btn.parent().parent().find('h1, h2, h3, h4, h5, h6').first().text()`

---

### 5. `resource/kr/js/j4/owl.carousel.min.js`
- **📍 L717, L731, L733, L1254, L1257, L1432 (`.andSelf()` ➔ `.addBack()`)**
  - **수정 전:** `b.find("[data-merge]").andSelf("[data-merge]")`
  - **수정 후:** `b.find("[data-merge]").addBack("[data-merge]")`
- **📍 L231 (`:eq()` 루프 개작)**
  - **수정 전:** `this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(...)`
  - **수정 후:** `a.each(i, function (idx, val) { $ch.eq(val).addClass(actCls) });`

---

### 6. `module_src/js/j4/libs.js`
- **📍 L17 (`jQuery.cssNumber` 안전 초기화)**
  - **수정 전:** `t.cssNumber["scale"] = true`
  - **수정 후:** `if (!$j.cssNumber) $j.cssNumber = {}; s || ((t.cssNumber = t.cssNumber || {})[e] = !0)`

---

### 7. `resource/kr/js/j4/popup.js`
- **📍 L75, L107, L115, L226 (`touchmove` 이벤트 현대화)**
  - **수정 전:** `$("body").bind('touchmove', preventDefaultHandler);`
  - **수정 후:** `$("body").on('touchmove', preventDefaultHandler);`

---

### 8. `resource/kr/js/blog.js`
- **📍 L859, L862, L864, L913 (`:first` 의사 선택자 분리)**
  - **수정 전:** `first_trigger = targets.find('.ebc-tab-triggers:first').parents('li')`
  - **수정 후:** `first_trigger = targets.find('.ebc-tab-triggers').first().parents('li')`

---

### 9. `module_src/js/j4/common_module.js`
- **📍 L872, L903, L1080, L1097, L1891 (가시성 필터 분리)**
  - **수정 전:** `var $shareBoxBtn = $shareBox.find('a:visible, button:visible');`
  - **수정 후:** `var $shareBoxBtn = $shareBox.find('a, button').filter(':visible');`
- **📍 L183 (`.bind('load')` 현대화)**
  - **수정 전:** `$(window).bind('load', function(){ ... });`
  - **수정 후:** `$(window).on('load', function(){ ... });`
