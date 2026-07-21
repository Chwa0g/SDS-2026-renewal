/*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-89381231-7', 'auto');
  ga('require', 'GTM-5RVTMPL');

  function getQueryStringObject() {
    var params = window.location.search.substr(1).split('&');
    if (params == '') return {};
    var paramObj = {};
    for (var i = 0; i < params.length; ++i) {
               var p = params[i].split('=', 2);
               if (p.length == 1) paramObj[p[0]] = '';
               else paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }

    return paramObj;
}

  var qs = getQueryStringObject();
  var ga_referrer = qs.referrer; // URL에 있는 referrer 값

  if(ga_referrer == undefined) {ga_referrer = document.referrer} // direct로 접근시 referrer 정보 반환

  ga('set', 'referrer', ga_referrer);
  ga('set', 'location', document.URL.split('?')[0]); // URL에 있는 referrer 값 제거
  
  */
// //<!-- Eloqua Web Page Visitor Tracking Script -->
  var _elqQ = _elqQ || [];
  _elqQ.push(['elqSetSiteId', '73756918']);
  _elqQ.push(['elqUseFirstPartyCookie', 'tracking.mkt-email.samsungsds.com']);
  _elqQ.push(['elqTrackPageView']);
  _elqQ.push(['elqTrackPageView', window.location.href]); //20230515 추가

  (function () {
  function async_load() {
  var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
  s.src = '//img07.en25.com/i/elqCfg.min.js';
  var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
  }
  if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
  else if (window.attachEvent) window.attachEvent('onload', async_load); 
  })();

// //<!-- facebook sdk -->
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '590465677825056',
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
//<!-- facebook sdk -->




//<!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MQTQVFG');
 //<!--End Google Tag Manager -->

//<!-- Global site tag (gtag.js) - Google Ads: 347263598 GDN 스크립트 20210623 //-->
document.write("<script async src='https://www.googletagmanager.com/gtag/js?id=AW-347263598'></script>");
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-347263598');
//<!--// Global site tag (gtag.js) - Google Ads: 347263598 GDN 스크립트 20210623 -->

//<!-- Google Tag Manager ,20220525 added-->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MNV3JTM');
//<!-- End Google Tag Manager -->


//<!-- Google Tag Manager ,20230131 added-->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MZ477XW');
//<!-- End Google Tag Manager -->
     //<!-- Google Tag Manager 20230215 -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WZHFPVB');
  //<!-- End Google Tag Manager -->
//<!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PVPN5KJ');
//<!-- End Google Tag Manager -->

//<!-- Google Tag Manager -->//<!--20250325 캠페인셀용-->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M3VLVQVW');
//<!-- End Google Tag Manager -->


//<!-- Meta Pixel Code -->

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2280020175855929');
fbq('track', 'PageView');


//<!-- End Meta Pixel Code -->



   (function(c,l,a,r,i,t,y){
       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
   })(window, document, "clarity", "script", "h9bwg5ncb1");

  
  // var wcsscript = document.createElement('script');  
  // wcsscript.src = "//wcs.naver.net/wcslog.js";  
// document.head.appendChild(wcsscript);
$.getScript("//wcs.naver.net/wcslog.js",function(){
  var _nasa={};
  if(window.location.href.indexOf("#utm_source=scp_event") != -1){
      if(window.wcs) _nasa["cnv"] = window.wcs.cnv("1","10"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고
  }else if(window.location.href.indexOf("/kr/etc/complete/thank/thankyou.html")!= -1){
      
      // 2026.01.28 수정 전  
      //if (window.wcs)  _nasa["cnv"] = window.wcs.cnv("4","0"); 

      // 2026.01.28 수정 후 
      if (window.wcs){
        _nasa["cnv"] = window.wcs.cnv("4","0"); 
        
        if(!wcs_add) var wcs_add = {};
        window.wcs_add = {wa:'s_2e8562c63416'};
        var _conv = {};
          _conv.type = 'lead';
        wcs.trans(_conv);
    
      }
      

      
  }

 if( window.wcs_add) window.wcs_add = {wa:"s_2e8562c63416"};
  //(수정전)2026.01.28 
  /*
  if (!_nasa) var _nasa={};
  if(window.wcs){
      window.wcs.inflow("samsungsds.com");
      wcs_do(_nasa);
  }
  */

  //(수정후)2026.01.28 네이버 GFA스크립트 설치 추가 
  if (!wcs_add) var wcs_add={};
    wcs_add["wa"] = "s_2e8562c63416";

  if (!_nasa) var _nasa={};
  if(window.wcs){
    //wcs.inflow("samsungsds.com");
wcs.inflow("samsungsds.com/kr/");
    wcs_do(_nasa);
  }
 
})





var linkVwo = document.createElement("link" );
linkVwo.setAttribute("rel","preconnect");
linkVwo.setAttribute("href","https://dev.visualwebsiteoptimizer.com");

var scriptVwoCode = document.createElement("script");
scriptVwoCode.setAttribute("id","vwoCode");
var vwoCodejs = document.createTextNode(`window._vwo_code ||(function () {var w=window,d=document;var account_id=1209213,version=2.2,settings_tolerance=2000,hide_element='body',hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important';var f=0, v;if(f=!1,v=d.querySelector('#vwoCode'),cc={},-1<d.URL.indexOf('__vwo_disable__')||w._vwo_code)return;try{var e=JSON.parse(localStorage.getItem('_vwo_'+account_id+'_config'));cc=e&&'object'==typeof e?e:{}}catch(e){}function r(t){try{return decodeURIComponent(t)}catch(e){return t}}var s=function(){var e={combination:[],combinationChoose:[],split:[],exclude:[],uuid:null,consent:null,optOut:null},t=d.cookie||'';if(!t)return e;for(var n,i,o=/(?:^|;\s*)(?:(_vis_opt_exp_(\d+)_combi=([^;]*))|(_vis_opt_exp_(\d+)_combi_choose=([^;]*))|(_vis_opt_exp_(\d+)_split=([^:;]*))|(_vis_opt_exp_(\d+)_exclude=[^;]*)|(_vis_opt_out=([^;]*))|(_vwo_global_opt_out=[^;]*)|(_vwo_uuid=([^;]*))|(_vwo_consent=([^;]*)))/g;null!==(n=o.exec(t));)try{n[1]?e.combination.push({id:n[2],value:r(n[3])}):n[4]?e.combinationChoose.push({id:n[5],value:r(n[6])}):n[7]?e.split.push({id:n[8],value:r(n[9])}):n[10]?e.exclude.push({id:n[11]}):n[12]?e.optOut=r(n[13]):n[14]?e.optOut=!0:n[15]?e.uuid=r(n[16]):n[17]&&(i=r(n[18]),e.consent=i&&3<=i.length?i.substring(0,3):null)}catch(e){}return e}();function i(){var e=function(){if(w.VWO&&Array.isArray(w.VWO))for(var e=0;e<w.VWO.length;e++){var t=w.VWO[e];if(Array.isArray(t)&&('setVisitorId'===t[0]||'setSessionId'===t[0]))return!0}return!1}(),t='a='+account_id+'&u='+encodeURIComponent(w._vis_opt_url||d.URL)+'&vn='+version+'&ph=1'+('undefined'!=typeof platform?'&p='+platform:'')+'&st='+w.performance.now();e||((n=function(){var e,t=[],n={},i=w.VWO&&w.VWO.appliedCampaigns||{};for(e in i){var o=i[e]&&i[e].v;o&&(t.push(e+'-'+o+'-1'),n[e]=!0)}if(s&&s.combination)for(var r=0;r<s.combination.length;r++){var a=s.combination[r];n[a.id]||t.push(a.id+'-'+a.value)}return t.join('|')}())&&(t+='&c='+n),(n=function(){var e=[],t={};if(s&&s.combinationChoose)for(var n=0;n<s.combinationChoose.length;n++){var i=s.combinationChoose[n];e.push(i.id+'-'+i.value),t[i.id]=!0}if(s&&s.split)for(var o=0;o<s.split.length;o++)t[(i=s.split[o]).id]||e.push(i.id+'-'+i.value);return e.join('|')}())&&(t+='&cc='+n),(n=function(){var e={},t=[];if(w.VWO&&Array.isArray(w.VWO))for(var n=0;n<w.VWO.length;n++){var i=w.VWO[n];if(Array.isArray(i)&&'setVariation'===i[0]&&i[1]&&Array.isArray(i[1]))for(var o=0;o<i[1].length;o++){var r,a=i[1][o];a&&'object'==typeof a&&(r=a.e,a=a.v,r&&a&&(e[r]=a))}}for(r in e)t.push(r+'-'+e[r]);return t.join('|')}())&&(t+='&sv='+n)),s&&s.optOut&&(t+='&o='+s.optOut);var n=function(){var e=[],t={};if(s&&s.exclude)for(var n=0;n<s.exclude.length;n++){var i=s.exclude[n];t[i.id]||(e.push(i.id),t[i.id]=!0)}return e.join('|')}();return n&&(t+='&e='+n),s&&s.uuid&&(t+='&id='+s.uuid),s&&s.consent&&(t+='&consent='+s.consent),w.name&&-1<w.name.indexOf('_vis_preview')&&(t+='&pM=true'),w.VWO&&w.VWO.ed&&(t+='&ed='+w.VWO.ed),t}code={nonce:v&&v.nonce,library_tolerance:function(){return'undefined'!=typeof library_tolerance?library_tolerance:void 0},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return'{'+(cc.hES||hide_element_style)+'}'},hide_element:function(){return performance.getEntriesByName('first-contentful-paint')[0]?'':'string'==typeof cc.hE?cc.hE:hide_element},getVersion:function(){return version},finish:function(e){var t;f||(f=!0,(t=d.getElementById('_vis_opt_path_hides'))&&t.parentNode.removeChild(t),e&&((new Image).src='https://dev.visualwebsiteoptimizer.com/ee.gif?a='+account_id+e))},finished:function(){return f},addScript:function(e){var t=d.createElement('script');t.type='text/javascript',e.src?t.src=e.src:t.text=e.text,v&&t.setAttribute('nonce',v.nonce),d.getElementsByTagName('head')[0].appendChild(t)},load:function(e,t){t=t||{};var n=new XMLHttpRequest;n.open('GET',e,!0),n.withCredentials=!t.dSC,n.responseType=t.responseType||'text',n.onload=function(){if(t.onloadCb)return t.onloadCb(n,e);200===n.status?_vwo_code.addScript({text:n.responseText}):_vwo_code.finish('&e=loading_failure:'+e)},n.onerror=function(){if(t.onerrorCb)return t.onerrorCb(e);_vwo_code.finish('&e=loading_failure:'+e)},n.send()},init:function(){var e,t=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){_vwo_code.finish()},t),'body'!==this.hide_element()?(n=d.createElement('style'),e=(t=this.hide_element())?t+this.hide_element_style():'',t=d.getElementsByTagName('head')[0],n.setAttribute('id','_vis_opt_path_hides'),v&&n.setAttribute('nonce',v.nonce),n.setAttribute('type','text/css'),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(d.createTextNode(e)),t.appendChild(n)):(n=d.getElementsByTagName('head')[0],(e=d.createElement('div')).style.cssText='z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;',e.setAttribute('id','_vis_opt_path_hides'),e.classList.add('_vis_hide_layer'),n.parentNode.insertBefore(e,n.nextSibling));var n='https://dev.visualwebsiteoptimizer.com/j.php?'+i();-1!==w.location.search.indexOf('_vwo_xhr')?this.addScript({src:n}):this.load(n+'&x=true',{l:1})}};w._vwo_code=code;code.init();})();
`)
scriptVwoCode.appendChild(vwoCodejs);

document.head.appendChild(linkVwo);
document.head.appendChild(scriptVwoCode);

//<!-- 20250218 linkedin script start-->
_linkedin_partner_id = "6966740";

window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);

(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
//<!-- linkedin script end-->


//20260209 ahrefs script added
var ahrefsScript = document.createElement('script');
ahrefsScript.setAttribute('src','https://analytics.ahrefs.com/analytics.js');
ahrefsScript.setAttribute('data-key','USlPQ1kjrorORAE4D7vP/w');
ahrefsScript.async = true;
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(ahrefsScript, s);


