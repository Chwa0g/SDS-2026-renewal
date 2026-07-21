https://ssssyyy.dothome.co.kr/insight/report.html 페이지처럼 좌측 상단 햄버거 메뉴 버튼(≡ / X) 클릭 시 GNB/RNB 전체 메뉴가 정상 동작하도록 수정한 원인 분석 및 코드 수정 내역입니다.

1. GNB 햄버거 메뉴 동작 불능 원인 분석
javascript
// 기존 module.js (2494행)
$('.btn_hamburger').click(function(e) { ... });
🔍 [원인 1] 동적 DOM 생성에 따른 이벤트 바인딩 누락
현상: 기존 코드는 $('.btn_hamburger').click(...) 형태로 페이지 초기화 시점에 존재하는 버튼 요소에 직접 이벤트를 바인딩했습니다.
문제: GNB 헤더나 햄버거 버튼 요소가 AJAX 데이터 조회 후 동적으로 생성되거나 렌더링 시점이 늦어지면, 이벤트 바인딩 당시 해당 요소를 찾지 못해 클릭 이벤트 핸들러가 연결되지 않고 누락되었습니다.
🔍 [원인 2] easeOutQuint 이징(Easing) 함수 미등록 에러
현상: GNB 펼침 애니메이션 실행 시 $nav.animate({ right: 0 }, 500, 'easeOutQuint') 구문이 구동됩니다.
문제: jQuery 4.0 및 독립 환경에서 easeOutQuint 이징 함수가 등록되지 않은 상태이면 애니메이션 실행 직전 자바스크립트 예외(Uncaught TypeError)가 터지며 메뉴가 열리지 않고 멈췄습니다.
2. 코드 수정 내역
① [module.js] 2494행 이벤트 위임(Event Delegation) 방식으로 전환
버튼이 동적으로 생성되더라도 항상 클릭 이벤트를 수신할 수 있도록 

module.js
 2494행을 $(document).on('click', ...) 형태로 변경했습니다:

javascript
// [수정 전] module.js (2494행)
$('.btn_hamburger').click(function(e) { ... });
// [수정 후] module.js (2494행)
$(document).on('click', '.btn_hamburger, .btn_menu, .btn-hamburger, .btn_all_menu', function(e) {
    if ($(this).attr('disabled')) return false;
    _this.closeMobileGsnb();
    _this.searchBoxClose();
    _this.historyMenuClose();
    _this.setHeightRightContainer();
    ...
② [common_module.js] easeOutQuint 이징 폴리필 보완


common_module.js
 호환성 레이어에 easeOutQuint 이징 방어 코드를 추가하여 애니메이션이 끊김 없이 슬라이딩되도록 처리했습니다:

javascript
// common_module.js 상단 폴리필 추가
if ($j.easing && !$j.easing.easeOutQuint) {
    $j.easing.easeOutQuint = function (x) { 
        return 1 - Math.pow(1 - x, 5); 
    };
}
3. 수정 파일 반영 위치
수정이 완료된 소스 파일은 아래 경로들에 통합 업데이트되었습니다. 해당 파일들을 서버에 반영하시면 상단 햄버거 메뉴 버튼 클릭 시 GNB/RNB 메뉴가 정상적으로 슬라이딩되며 펼쳐집니다:



…\jqueryUpgrade\제이쿼리4.0업데이트\module.js


…\jqueryUpgrade\제이쿼리4.0업데이트\common_module.js