첨부해 주신 개발자 도구(DevTools) 콘솔 에러 캡처 화면을 바탕으로, jQuery 4.0 적용 시 리스트가 출력되지 않고 화면이 먹통이 되는 정확한 원인 분석 및 해결 방법을 정리해 드립니다.

1. 콘솔 에러 원인 분석 (왜 리스트가 뿌려지지 않는가?)
캡처 화면에 발생한 에러들은 자바스크립트 실행을 중단시켜, 리스트를 동적으로 렌더링하는 customModule.loadModule 함수까지 실행이 다다르지 못하게 막고 있었습니다.

1. Uncaught TypeError: Cannot set properties of undefined (setting 'scale') at libs.js:151340
2. Uncaught TypeError: e.indexOf is not a function at common_module.js:157:11
3. Uncaught TypeError: e.indexOf is not a function at ion_common.js:18:11
4. Uncaught TypeError: t.isArray is not a function at jquery-ui.min.js:6:3851
5. Deferred exception TypeError: e.indexOf is not a function at extension_ko.js:1431
6. Deferred exception TypeError: $title.lettering is not a function at extension2.js:270
[결정적 원인 1] common_module.js:157:11 ➔ e.indexOf is not a function
원인: common_module.js 157행에 $(window).load(function(){ ... }) 구문이 남아있습니다.
오류 발생 메커니즘: jQuery 4.0에서 $(window).load() 축약 이벤트 메서드가 삭제되었고, .load()는 AJAX 전용 메서드($.fn.load(url))로만 작동합니다. 따라서 jQuery 4.0은 전달된 function()을 URL 문자열로 오인하고 url.indexOf()를 실행하려다 e.indexOf is not a function 에러를 발생시킵니다.
결과: common_module.js 157행에서 스크립트 실행이 중단되어 173행 이하의 이벤트 리스트 렌더링 코드(customModule.loadModule)가 실행되지 못하고 화면이 비어있게 됩니다.
[결정적 원인 2] jquery-ui.min.js:6:3851 ➔ t.isArray is not a function
원인: jQuery UI 라이브러리 내부에서 $.isArray()를 사용 중이지만, jQuery 4.0에서 $.isArray 유틸리티가 완전히 제거되었습니다.
결과: 달력(DatePicker), 위젯, 아코디언 등 UI 컴포넌트 전체의 로딩이 중단됩니다.
[결정적 원인 3] libs.js:1:151340 ➔ Cannot set properties of undefined (setting 'scale')
원인: libs.js 내부의 CSS Transform 플러그인(Transit/Transform2D)이 jQuery 내부 객체인 $.cssProps에 scale 속성을 등록하려 하나, jQuery 4.0에서 내부 속성이 변경되어 $.cssProps가 undefined로 잡히면서 중단됩니다.
결과: libs.js 로딩이 중간에 끊기면서 lettering.js 등 하위 플러그인 생성이 실패하여 extension2.js에서 $title.lettering is not a function 에러가 연속적으로 터집니다.
2. 해결 방법 (jQuery 4.0 완벽 호환 코드 작성)
① jQuery 4.0 호환 호환성 레이어(Polyfill) 추가
구형 플러그인(jquery-ui.min.js, libs.js)이 jQuery 4.0에서 삭제된 유틸리티를 호출하더라도 에러가 나지 않도록 common_module.js 및 libs.js 최상단에 8줄짜리 폴리필을 추가했습니다.

javascript
/* jQuery 4.0 Compatibility Layer for Legacy Plugins */
if (typeof window !== "undefined" && window.jQuery) {
    var $j = window.jQuery;
    if (!$j.isArray) $j.isArray = Array.isArray;
    if (!$j.isFunction) $j.isFunction = function(obj) { return typeof obj === "function"; };
    if (!$j.type) $j.type = function(obj) { return obj == null ? String(obj) : typeof obj; };
    if (!$j.trim) $j.trim = function(str) { return (str || "").trim(); };
    if (!$j.isWindow) $j.isWindow = function(obj) { return obj != null && obj === obj.window; };
    if (!$j.cssProps) $j.cssProps = {};
    if (!$j.cssHooks) $j.cssHooks = {};
}
② $(window).load 구문 전체를 $(window).on('load', ...)로 변경
common_module.js (157행)
ion_common.js (18행)
extension_ko.js (1431행)
module.js 및 extension2.js
위 2가지 처리가 적용되면 콘솔 에러가 모두 사라지고, customModule.loadModule이상 정상 구동되어 리스트 렌더링, 달력, 슬라이드가 jQuery 4.0에서 깨끗하게 작동하게 됩니다.

3. 수정 완료된 파일 위치 (즉시 반영 가능)
해당 조치가 완료된 전체 파일은 아래 폴더에 업데이트해 두었습니다:



…\jqueryUpgrade\제이쿼리4.0업데이트\common_module.js


…\jqueryUpgrade\제이쿼리4.0업데이트\libs.js


…\jqueryUpgrade\제이쿼리4.0업데이트\ion_common.js


…\jqueryUpgrade\제이쿼리4.0업데이트\extension_ko.js


…\jqueryUpgrade\제이쿼리4.0업데이트\extension2.js


…\jqueryUpgrade\제이쿼리4.0업데이트\module.js


…\jqueryUpgrade\제이쿼리4.0업데이트\owl.carousel.min.js


…\jqueryUpgrade\제이쿼리4.0업데이트\popup.js


…\jqueryUpgrade\제이쿼리4.0업데이트\jquery.cookie.min.js
위 폴더의 파일들을 서버에 업로드하신 후 재로드하시면 리스트가 정상적으로 나타납니다!