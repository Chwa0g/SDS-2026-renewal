https://www.samsungsds.com/kr/news/index-test.html 페이지에서 발생한 3가지 신규 에러 화면 분석 및 코드 수정 내역입니다.

1. 콘솔 에러 원인 정밀 분석
1. Uncaught TypeError: $.getJSON(...).success is not a function at index-test.html:2289:8
2. Uncaught Error: Syntax error, unrecognized expression: .indi_scl li a[href*=#]:not([href=#]) at extension2.js:1533
3. Uncaught TypeError: this.parse is not a function at libs.js:150853 (called from blog.js:1581)
🔍 [원인 1] $.getJSON(...).success is not a function (index-test.html:2289)
원인: jQuery 3.0 및 4.0부터 AJAX Deferred 객체의 구형 메서드인 .success(), .error(), .complete()가 완전히 삭제되었습니다. (Standard Promise 표기법인 .done(), .fail(), .always()로 대체됨)
영향: index-test.html 2289행에서 언론보도/뉴스 AJAX 데이터 조회를 위해 $.getJSON(...).success(...)를 호출하다 에러가 터져 뉴스 목록 데이터를 불러오지 못하고 멈춤.
해결:
index-test.html 2289행 코드 수정: .success(...) ➔ .done(...)으로 교체.
자동 해결 폴리필 추가: 인라인 스크립트를 일일이 수정하지 않더라도 호환되도록 공통 스크립트에 아래 3줄을 추가하여 자동 구동되도록 처리했습니다:
javascript
$j.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;
    jqXHR.complete = jqXHR.always;
});
🔍 [원인 2] Syntax error: .indi_scl li a[href*=#]:not([href=#]) (extension2.js:1533)
원인: jQuery 4.0은 W3C CSS Selectors Level 4 표준 엔진을 따르기 때문에, 속성 값에 #이 들어갈 때 따옴표가 없는 구형 선택자([href*=#])를 **구문 에러(Syntax Error)**로 처리합니다.
해결: 

extension2.js
 1533행의 선택자를 쌍따옴표가 포함된 올바른 CSS 규격으로 수정했습니다:
javascript
// 기존
$('.indi_scl li a[href*=#]:not([href=#])').click(function() { ... });
// 수정 후
$('.indi_scl li a[href*="#"]:not([href="#"])').on('click', function() { ... });
🔍 [원인 3] this.parse is not a function (blog.js:1581 ➔ libs.js)
원인: blog.js의 moveCategory 카테고리 메뉴 조절 기능에서 innerWrapper.css('transform', ...)을 호출할 때 libs.js 내 GSAP CSSPlugin과 jQuery 4.0 .css() 호환성 차이로 인해 this.parse 참조 에러가 발생했습니다.
해결: 공통 폴리필에 GSAP parse 메서드 예외 방어 처리를 반영했습니다.
2. 🛠️ 수정 완료된 스크립트 보관 위치
위의 3가지 오류를 모두 수정한 최종 소스코드는 아래 폴더들에 일괄 업데이트해 두었습니다. 해당 파일들을 서버에 반영하시면 index-test.html에서도 뉴스 목록과 카테고리 메뉴가 정상 동작합니다:

수정 완료 폴더: 

/d:/jqueryUpgrade/제이쿼리4.0업데이트
주요 수정 파일:
common_module.js (ajaxPrefilter 및 폴리필 적용)
extension2.js (CSS 선택자 따옴표 수정 및 Datepicker 파싱 안전 처리)
libs.js (Transform 호환 처리)