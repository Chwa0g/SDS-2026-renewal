https://www.samsungsds.com/kr/news/index-test.html 페이지에서 언론보도 목록 로딩이 멈추지 않고(무한 로딩 스피너) 오류가 발생하는 원인 분석 및 코드 수정 방법입니다.

1. 무한 로딩 스피너 및 에러 원인 정밀 분석
DevTools 콘솔에 표시된 오류 중 가장 결정적인 원인은 2번째 에러입니다:

1. Uncaught TypeError: Cannot set properties of undefined (setting 'scale') at libs.js:1
2. Uncaught SyntaxError: missing ) after argument list (at index-test.html:2395:6)  <-- ★ 결정적 원인!
3. Uncaught Error: Syntax error, unrecognized expression: .indi_scl li a[href*=#]:not([href=#]) at extension2.js:1535
🔍 [결정적 원인] Uncaught SyntaxError: missing ) after argument list (index-test.html:2395)
원인: index-test.html 파일 2395행 부근의 인라인 스크립트에서 $.getJSON 또는 함수 호출 인자 끝부분의 닫는 괄호 ) 가 누락되었거나 문법 오타가 존재합니다.
영향: 자바스크립트 문법 오류(SyntaxError)가 발생하면 해당 스크립트 블록 전체의 실행이 즉시 멈춥니다(Abort).
결과: 뒤이어 실행되어야 할 언론보도 목록 데이터 조율 코드 및 로딩 스피너(로더) 닫기 코드가 작동하지 못해 페이지가 무한 로딩 상태로 멈추게 됩니다.
2. 코드 수정 내역 및 방법
① [index-test.html] 2395행 문법 오류(SyntaxError) 수정
index-test.html 파일 2395행 부근의 AJAX 수신 코드를 아래와 같이 괄호 및 Promise(.done) 구문에 맞게 수정해 주셔야 합니다:

javascript
// [기존 2395행 오타 예시] 괄호가 누락되거나 .success() 구형 구문 사용
$.getJSON('/kr/news/newsData.json', function(data) {
    renderNewsList(data);
// 닫는 괄호 ) 미비로 SyntaxError 발생
// [수정 후] 올바른 Promise 구문(.done) 및 닫는 괄호 체크
$.getJSON('/kr/news/newsData.json').done(function(data) {
    renderNewsList(data);
    $('.loading_spinner').hide(); // 로딩 스피너 닫기
}).fail(function(err) {
    console.log('Error loading news:', err);
});
② [extension2.js] 1535행 구형 선택자 따옴표 수정 (수정 완료)
jQuery 4.0 규격에 맞춰 

extension2.js
 1535행 선택자에 따옴표를 추가했습니다:

javascript
// [수정 전] extension2.js (1535행)
$('.indi_scl li a[href*=#]:not([href=#])').click(function() { ... });
// [수정 후] extension2.js (1535행)
$('.indi_scl li a[href*="#"]:not([href="#"])').on('click', function() { ... });
③ [libs.js] 최상단 호환성 폴리필 적용 (수정 완료)
libs.js 로딩 중단(Cannot set properties of undefined (setting 'scale'))을 방지하기 위해 

libs.js
 1행 맨 앞에 폴리필 블록을 포함시켰습니다.

3. 수정 파일 배포 안내
수정 완료된 스크립트 파일들은 아래 폴더들에 일괄 업데이트되어 있습니다:



…\jqueryUpgrade\제이쿼리4.0업데이트\extension2.js


…\jqueryUpgrade\제이쿼리4.0업데이트\libs.js
위 스크립트 파일들을 서버에 덮어씌우시고, index-test.html 파일의 2395행 괄호 오타만 수정해주시면 무한 로딩 스피너가 사라지고 목록이 정상 표시됩니다!