1. 캐러셀 버튼 먹통 원인 정밀 분석
DevTools 콘솔에 표시된 아래 에러로 인해 슬라이더 구동 스크립트가 실행 도중 멈추면서 좌/우 화살표 클릭 이벤트가 연결되지 않았습니다.

1. Uncaught TypeError: Cannot set properties of undefined (setting 'scale') at libs.js:1:151340
2. Uncaught TypeError: $title.lettering is not a function at setTxtBreak (extension2.js:271:20)
🔍 원인 분석 메커니즘
libs.js 중간 중단: 상단 캐러셀 슬라이더는 libs.js 내의 carouFredSel 플러그인을 기반으로 좌/우 슬라이딩을 처리합니다. 그러나 libs.js 로딩 시 151340자 부근의 setting 'scale' 오류로 인해 libs.js 실행이 중간에 튕겨버렸습니다.
연쇄 오류 터짐: 이로 인해 carouFredSel 플러그인과 lettering.js 플러그인이 jQuery 객체에 등록되지 않았고, extension2.js 271행 setTxtBreak() 함수 실행 중 $title.lettering is not a function 에러가 발생하여 자바스크립트 실행이 완전히 멈췄습니다.
결과: 슬라이더 이벤트 초기화 코드(_plugin.$carousel.carouFredSel(...))까지 도달하지 못해 좌/우 화살표 버튼(<, >)에 클릭 이벤트 핸들러가 바인딩되지 못하고 먹통이 되었습니다.
2. 코드 수정 내역
① extension2.js 271행 방어 코드 추가 (오류로 인한 중단 방지)
extension2.js 

line 267~273
의 setTxtBreak() 함수에 방어 코드를 적용하여 lettering 플러그인이 없더라도 슬라이더 스크립트가 멈추지 않도록 조치했습니다:

javascript
// [수정 후] extension2.js (line 267 ~ 273)
function setTxtBreak(){
    var $title = $txtArea.find(".tit_b");
    // lettering 함수 존재 체크 방어 코드 추가
    if (typeof $title.lettering === 'function') {
        $title.lettering('lines');
        $title.find("span").wrapInner('<i></i>');
    }
}
② libs.js 호환성 폴리필 적용 (scale 에러 해결)
libs.js 최상단에 $.cssProps = {}; $.cssHooks = {}; 호환 레이어를 추가하여 libs.js가 중단 없이 로드되도록 수정했습니다. 이로 인해 carouFredSel 플러그인이 정상 등록되고 좌/우 버튼 클릭 이벤트가 살아납니다.

3. 수정 파일 배포 위치
수정 완료된 파일들은 아래 경로들에 업데이트해 두었습니다. 해당 파일들을 서버에 반영하시면 좌/우 캐러셀 버튼 클릭 시 슬라이드가 정상 전환됩니다.



…\jqueryUpgrade\제이쿼리3.7최적화\extension2.js


…\jqueryUpgrade\제이쿼리4.0업데이트\extension2.js


…\jqueryUpgrade\제이쿼리4.0업데이트\libs.js
