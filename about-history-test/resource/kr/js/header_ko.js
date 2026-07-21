/**
 * header_ko.js
 */
 var self = this;

var PRE_LIST_NUM = 7;


 /*최근검색어 기능추가 */
 function recentSearchModule(){
     this.loc = window.location.href;
     this.lang = $("html").attr("lang") || "en";
     this.country = this.loc.split('/')[3];
     this.recentSearchMaxCount = 15;
     this.recentSearchStorageKey = 'recentSearch_' + this.lang + '_' + this.country;
     this.storage = sessionStorage;
    
 
     this.addRecentSearchTerms = function(term){

         var searchTermsArray = this.storage.getItem(this.recentSearchStorageKey);
        if(searchTermsArray && searchTermsArray.length>0){
            searchTermsArray = JSON.parse( this.storage.getItem(this.recentSearchStorageKey) );
        }else{
            searchTermsArray = [];
        }
          // 중복 검색
          term = term.trim();
          var isDuplicated = false;
          if (searchTermsArray.length > 0){
             for(var i=0;i<searchTermsArray.length;i++){
                 if(searchTermsArray[i] == term) isDuplicated = true;
             }
          }
         if (isDuplicated) return; //추가 안함
     
         if (searchTermsArray.length > this.recentSearchMaxCount - 1){
             searchTermsArray.pop();
         }
     
         // add 
         if (searchTermsArray.length == 0){
             searchTermsArray.push(term);
         } else {
             searchTermsArray.splice(0, 0, term);
         }
         
         // set data
         this.storage.setItem( this.recentSearchStorageKey, JSON.stringify( searchTermsArray ) );
     
     }

     this.deleteTerm = function (term, targetId, obj){
        $(obj).parent("li").remove();
        var searchTermsArray = JSON.parse( this.storage.getItem(this.recentSearchStorageKey) );
        if (searchTermsArray.length > 0){
            for(var i=0;i<searchTermsArray.length;i++){
                if(searchTermsArray[i] == term) searchTermsArray.splice(i,1);
            }
         }
          // set data
          console.log(searchTermsArray);
          this.storage.setItem( this.recentSearchStorageKey, JSON.stringify( searchTermsArray ) );
          this.renderRecentWords(targetId);
          
     }

     this.deleteAll =  function (targetId){
        
        this.storage.removeItem(this.recentSearchStorageKey)
        this.renderRecentWords(targetId);
     }

     this.renderRecentWords = function (targetId){
        var searchTermsArray = this.storage.getItem(this.recentSearchStorageKey);
        if( searchTermsArray && searchTermsArray.length>0){
            searchTermsArray = JSON.parse( this.storage.getItem(this.recentSearchStorageKey) );
        }else{
            searchTermsArray = [];
        } 

        var html = '<p class="tit">최근검색어</p><ul class="sr_list">';
            var length = searchTermsArray.length > PRE_LIST_NUM? PRE_LIST_NUM : searchTermsArray.length;
            for(var i=0;i<length;i++){
                html += `<li><a href="#" onclick="javascript:totalSearchStart('`+searchTermsArray[i]+`')">`+searchTermsArray[i]+`</a><button type="button" onclick="javascript:searchModule.deleteTerm('`+searchTermsArray[i]+`','`+targetId+`', this)"><span class="blind">검색어 삭제</span></button></li>`;
            }
            html += '   </ul>' ;
            $(targetId).html(html);
            $(targetId).removeClass("dpn");
            $(".recentSchAllDelBtn").removeClass("dpn");
        
        
     }
 
 }

 var searchModule = new recentSearchModule();
 
 function getMenuData(callback) {
 
    // JSONP callback function(Essential!!)
     self.menuCallback = function(result) {
         for(var i in result) {
             fnMenuView(result[i].id, result[i].name, result[i].depth, result[i].uppid, result[i].childYn, result[i].threeYn, result[i].url, result[i].ico, result[i].target,result[i].filterSubCopy,result[i].columnIndex,result[i].mouseOverYn);
         }
         for(var i = 0;i <= result.length-1 ; i++) {
             fnMenuView2(result[i].id, result[i].name, result[i].depth, result[i].uppid, result[i].childYn, result[i].threeYn, result[i].url, result[i].ico, result[i].target,result[i].filterSubCopy,result[i].columnIndex,result[i].mouseOverYn);
         }
 
         if(callback != undefined) {
             callback();
         }
     }
 }
 
 function fnMenuView(id, name, depth, uppid, childYn, threeYn, url, ico, target,filterSubCopy,columnIndex,mouseOverYn) {
     //alert('/js/header_ko.js:: fnMenuView();');
     if (depth == 1) {
 
         var $mm_li = $("<li></li>");
 
         $mm_li.attr("class", "mm");
         $mm_li.attr("id", "mm_" + id);
         $mm_li.append($("<a></a>")
             .attr("href", "#")
             .html(name)
         );
 
         $("#menuView").append($mm_li);
 
         var $gnb_sub_div = $("<div></div>");
         $gnb_sub_div.attr("class", "gnb_sub");
         $gnb_sub_div.attr("id", "sub_" + id);
 
         $($mm_li).append($gnb_sub_div);
 
         if (threeYn == "Y") {
 
             var $mnt_div = $("<div></div>");
             if(id == "m_gk_5"){
                 $mnt_div.attr("class", "mnt mnt1");
             }else{
                 $mnt_div.attr("class", "mnt mnt1 dep");
             }
             $mnt_div.attr("id", "mnt_" + id);
 
             $($gnb_sub_div).append($mnt_div);
 
             var $s_menu_ul = $("<ul></ul>");
             $s_menu_ul.attr("class", "s_menu");
             $s_menu_ul.attr("id", "s_menu_" + id);
 
             var $s_card_div = $("<div></div>");
             $s_card_div.attr("class", "s_card");
             $s_card_div.attr("id", "s_card_" + id);
 
             $($mnt_div).append($s_menu_ul);
             $($mnt_div).append($s_card_div);
 
             if(mouseOverYn == "Y"){
                 var $s_menu_ul_solution = $("<ul></ul>");
                 $s_menu_ul_solution.attr("class", "s_menu");
                 $s_menu_ul_solution.attr("id", "solution_menu_" + id);
                 $($mnt_div).append($s_menu_ul_solution);
             }
         }else{
             var $mnt_div = $("<div></div>");
             $mnt_div.attr("class", "mnt mnt2");
             $mnt_div.attr("id", "mnt_" + id);
 
             $($gnb_sub_div).append($mnt_div);
 
             var $s_menu_ul = $("<ul></ul>");
             $s_menu_ul.attr("class", "s_menu");
             $s_menu_ul.attr("id", "s_menu_" + id);
 
             var $s_card_div = $("<div></div>");
             $s_card_div.attr("class", "s_card");
             $s_card_div.attr("id", "s_card_" + id);
 
             $($mnt_div).append($s_menu_ul);
             $($mnt_div).append($s_card_div);
 
             var $smm_li = $("<li></li>");
             $smm_li.attr("class", "smm");
             $smm_li.attr("id", "smm_" + id);
 
             $($s_menu_ul).append($smm_li);
 
             var $sm_menu_ul = $("<ul></ul>");
             $sm_menu_ul.attr("class", "sm_menu");
             $sm_menu_ul.attr("id", "sm_menu_" + id);
 
             $($smm_li).append($sm_menu_ul);
         }
 
         fnAddCard(id, name, threeYn);
 
     }  else if (depth == 2) {
         var $smm_li = $("<li></li>");
         if (threeYn == "Y") {
 
             if(mouseOverYn == "Y"){
                 $smm_li.attr("class", "smm sao");
             }else{
                 $smm_li.attr("class", "smm");
                 if(url.split("/").length > 1){
                     $smm_li.append($("<strong></strong>")
                         .attr("class", "s_tit")
                         .append($("<a></a>")
                             .attr("href", url)
                             .attr("class", "s_tit_link")
                             .html(name)
                             .append('<span class="ico"></span>')
                         )
                     );
                 }else{
                     $smm_li.append($("<strong></strong>")
                         .attr("class", "s_tit")
                         .html(name)
                     );
                 }
             }
             $smm_li.attr("id", "smm_" + id);
 
 
             $("#s_menu_" + uppid + "").append($smm_li);
 
             $($smm_li).append($("<ul></ul>")
                 .attr("class", "sm_menu")
                 .attr("id", "sm_menu_" + id)
             );
 
             if (ico == "Y") {
                 $($smm_li).append($("<ul></ul>")
                     .attr("class", "sm_menu2")
                     .attr("id", "sm_menu2_" + id)
                 );
             }
         }else{
 
             var $two_depth_a = $("<a></a>");
             $two_depth_a.attr("href", url);
             $two_depth_a.html(name);
 
             if (target == "Y") {
                 $two_depth_a.attr("target", "_blank").attr("title", "새창열림");
                 $two_depth_a.append('<span class="ico new_win"></span>');
             }
 
             $("#sm_menu_" + uppid + "").append(
                 $("<li></li>").append($two_depth_a)
             );
         }
 
         if(mouseOverYn == "Y"){
 
             $smm_li.attr("class", "smm solution_more");
             $smm_li.attr("id", "smm_" + id);
             $smm_li.append($("<button></button>")
                 .attr("class", "see_all_off")
                 .html(name)
             );
 
             $("#solution_menu_" + uppid + "").append($smm_li);
 
             $($smm_li).append($("<div></div>")
                 .attr("class", "sm_menu_3depth")
                 .attr("id", "sm_menu_depth" + id)
             );
         }
 
     }else if (depth == 3) {
         if(!name == ""){
             var $sm_menu_a = $("<a></a>");
             if(!filterSubCopy==""){
                 $(filterSubCopy.sup()).attr("class","sup_r");
                 $sm_menu_a.attr("href",url).html(name+filterSubCopy.sup().replace('<sup>','<sup class="sup_std">'));
             }else {
                 if(id == "m_gk_148"&& name == "더보기"){
                     $sm_menu_a.attr("href",url);
 
                     var $sm_menu_b = $("<b></b>");
                     $sm_menu_b.html(name+"+");
                     $sm_menu_a.append($sm_menu_b);
                 }else{
                     $sm_menu_a.attr("href",url).html(name);
                 }
 
             }
             var $sm_menu_li=$("<li></li>");
 
             if (target == "Y") {
                 $sm_menu_a.attr("target", "_blank").attr("title", "새창열림");
                 $sm_menu_a.append('<span class="ico new_win"></span>');
             }
 
             if (ico == "Y") {
 
                 $sm_menu_a.append('<span class="ico"></span>');
 
                 $("#sm_menu2_" + uppid + "").append(
                     $sm_menu_li.append($sm_menu_a)
                 );
             } else {
                 $("#sm_menu_" + uppid + "").append(
                     $sm_menu_li.append($sm_menu_a)
                 );
             }
 
             if(mouseOverYn == "Y"){
 
                 $sm_menu_li.attr("class","solution_more");
 
                 var $div_mm=$("<div ></div>");
                 $div_mm.attr("class","sm_menu_3depth");
                 $sm_menu_a.after($div_mm);
 
                 var $ul_1 =$("<ul></ul>");
                 $ul_1.attr("id","ul_"+id+"_1")
                 $ul_1.attr("class","3dep_1");
 
 
                 var $ul_2 =$("<ul></ul>");
                 $ul_2.attr("id","ul_"+id+"_2")
                 $ul_2.attr("class","3dep_2");
 
                 var $ul_3 =$("<ul></ul>");
                 $ul_3.attr("id","ul_"+id+"_3")
                 $ul_3.attr("class","3dep_3");
 
                 var $ul_4 =$("<ul></ul>");
                 $ul_4.attr("id","ul_"+id+"_4")
                 $ul_4.attr("class","3dep_4");
 
 
                 $div_mm.append($ul_1);
                 $div_mm.append($ul_2);
                 $div_mm.append($ul_3);
                 $div_mm.append($ul_4);
             }
         }else{
             var $sm_menu_ul = $("<ul></ul>");
             $sm_menu_ul.attr("class", "3dep_"+(id.replace(uppid,""))).attr("id","sm_menu_3depth_ul_"+id);
             $("#sm_menu_depth"+uppid).append($sm_menu_ul);
 
         }
 
     }else if(depth == 4){
         if(mouseOverYn == "Y"){
             var $li = $("<li></li>");
             if(url == "HaveClassMr"){
                 $li.attr("class","mr");
             }
             $("#sm_menu_3depth_ul_"+uppid).append($li);
 
             var $ul = $("<ul></ul>");
             $ul.attr("id","sm_menu_3depth_ul_li_ul_"+id);
             $li.append($ul);
 
             var $ul_li = $("<li></li>");
             $ul_li.attr("class","s_tit").html(name);
             $ul.append($ul_li);
 
 
 
             var $li_4depth=$("<li></li>");
             $li_4depth.attr("id",id+"_"+columnIndex);
             $li_4depth.attr("class","smmm");
             $li_4depth.attr("columnIndex",columnIndex);
 
             var $a_4depth = $("<a></a>");
             $a_4depth.attr("aria-expanded", "true");
             $a_4depth.attr("href", url).html(name);
             $li_4depth.append($a_4depth);
 
             var $ul_4depth = $("<ul></ul>");
             $ul_4depth.attr("class","smm_menu").attr("id","sm_menu_3depth_li_ul_"+id);
             $li_4depth.append($ul_4depth);
 
             $("#sm_menu_"+uppid.substring(0,(uppid.length-1))).append($li_4depth);
 
 
         }else{
             var $li_4depth=$("<li></li>");
             $li_4depth.attr("id",id+"_"+columnIndex);
             $li_4depth.attr("class","s_tit");
             $li_4depth.attr("columnIndex",columnIndex);
             $li_4depth.html(name);
             $("#ul_"+uppid+"_"+columnIndex).append($li_4depth);
 
         }
 
 
 
     }
 }
 function fnMenuView2(id, name, depth, uppid, childYn, threeYn, url, ico, target,filterSubCopy,columnIndex,mouseOverYn){
     alert('/js/header_ko.js:: fnMenuView2();');
     if(depth == 5){
         if(mouseOverYn == "Y"){
 
             var $li = $("<li></li>");
             var $a = $("<a></a>");
 
             if( !filterSubCopy==""){
                 $(filterSubCopy.sup()).attr("class","sup_r");
                 $a.attr("href",url).html(name+filterSubCopy.sup().replace('<sup>','<sup class="sup_std">'));
             }else {
                 $a.attr("href",url).html(name);
             }
             $li.append($a);
             $("#sm_menu_3depth_ul_li_ul_"+uppid+ "").append($li);
 
             var $li_5depth = $("<li></li>");
             var $a_5depth = $("<a></a>");
             $a_5depth.attr("href",url).html(name);
             $li_5depth.append($a_5depth);
             $("#sm_menu_3depth_li_ul_"+uppid+ "").append($li_5depth);
         }else{
             var $li_5depth = $("<li></li>");
             $li_5depth.attr("id",id);
             $li_5depth.attr("columnIndex",columnIndex);
             if(filterSubCopy=="®"){
                 $(filterSubCopy.sup()).attr("class","sup_r");
                 $li_5depth.append($("<a></a>")
                     .attr("href", url)
                     .attr("id","a_sup_"+id)
                     .html(name+filterSubCopy.sup().replace('<sup>','<sup class="sup_std">')));
             }else{
                 $li_5depth.append($("<a></a>")
                     .attr("href", url)
                     .attr("id","a_sup_"+id)
                     .html(name+filterSubCopy.sup().replace('<sup>','<sup class="sup_std">')));
             }
             $("#"+uppid+"_"+columnIndex).after($li_5depth);
 
         }
     }
 
 }
 function fnAddCard(id, name, threeYn) {
     alert('/js/header_ko.js:: fnAddCard();');
     if (threeYn == "Y") {
         if (id == "m_gk_1") {
             $("#s_card_" + id + "").load("/global/ko/gnb/solutions/SOLUTIONS.html");
         } else if (id == "m_gk_5") {
             $("#s_card_" + id + "").load("/global/ko/gnb/about/ABOUT.html");
         }
     } else {
         if (id == "m_gk_2") {
             $("#s_card_" + id + "").load("/global/ko/gnb/services/SERVICES.html");
         } else if (id == "m_gk_4") {
             $("#s_card_" + id + "").load("/global/ko/gnb/support/SUPPORT.html");
         }
     }
 }
 
 
 function fnSelectHeaderResult(value) {
     // alert('/js/header_ko.js:: fnSelectHeaderResult();');
     $("#keyword").val(value);
     fnSearchForm1();
 }
 
 function fnSearchForm1() {
     //alert('/js/header_ko.js:: fnSearchForm1();');
     //var inputStr = $.trim($(".container input[name='keyword']").val() + "");
     var $obj = $(".container input[name='keyword']");
     commonSearchAction($obj);
     
 }
 
 
 function fnSearchForm2() { //신규 메인페이지 내 검색폼에서 호출 2022.07.20
     //alert('/js/header_ko.js:: fnSearchForm1();');
     //var inputStr = $.trim($("#total_keyword2").val() + "");
     var $obj = $("#total_keyword2");
     commonSearchAction($obj);
 }
 
 function commonSearchAction($obj){
     var keyword = $obj.val().trim();
     if (keyword == "") {
         return;
     } else {
         keyword = keyword.replace(/\!|\@|\#|\$|\%|\^|\&|\*|\[|\]|\?|\(|\)/gi, "");
         keyword = keyword.replace(/\<|\>/gi, "");
         keyword = keyword.replace(/\+|\-/gi, "");
         keyword = keyword.replace(/\:|\;/gi, "");
         keyword = keyword.replace(/\[|\]/gi, "");
         keyword = keyword.replace(/\\/gi, "");
         $obj.val(keyword);
         if (keyword == "") {
             
             alert("올바르지 않은 검색어 입니다.");
             return;
         }else{
             
             totalSearchStart(keyword);
         }
     }
 }
 
 function fnSearchKeyword(keyword){
     // alert('/js/header_ko.js:: fnSearchKeyword();');
     if(keyword == ""){
         return;
     }else{
         $('#keyword').val(keyword);
         //$('#searchForm1').attr('target','_blank');
         //document.searchForm1.submit();
         totalSearchStart(keyword);
         //$('#searchForm1').removeAttr('target');
         $('#keyword').val('');
     }
 }
 
 
 function fnClose() {
     // alert('/js/header_ko.js:: fnClose();');
     $("#keyword").val("");
     $("#headerResult").html("");
 }
 
 /*
 EUROPE_EN -> en
 GLOBAL_EN -> en
 AMERICA -> en
 LATIN_PT -> pt
 CHINA_ZH -> zh
 GLOBAL_KO -> ko
 */
 function fnQuickLink_ibricks() {
     // alert('/js/header_ko.js:: fnQuickLink_ibricks();');
     var transPage = "/app/search/trans.jsp";
    
     var SITETYPECODE = "GLOBAL_KO";
 
     $.ajax({
         url : transPage,
         type : "POST",
         data : {
             transMode : 'quicklink',
             SITETYPECODE : SITETYPECODE
         },
         error : function(xhr, status, error) {
             console.log(status);
             console.log(xhr);
             console.log(error);
             //alert(ajaxErrorMsg);
         },
         success : function(data){
             if(typeof(data) != 'object'){
                 data = JSON.parse(data); //text를 javascript 객체로 변환
             }
             var html = "<strong class='tit'>Quick Links</strong><ul class='list' id='headerResult'>";
             for(var i = 0; i < data.length; i++){
                 html += "<li><a href='/global/ko/" + data[i].link + "'>" + data[i].title + "</a></li>";
             }
             html += "</ul>";
 
             $(".form_key .scroll").html(html);
         }
     });
 }
 
 
 // function fnClickHeaderBar() {
 //     //alert('/js/header_ko.js:: fnClickHeaderBar();');
 //     if ($("#keyword").val() == "") {
 //         fnQuickLink();
 //     }
 // }
 
 var transPage = '/app/search/transnew.jsp'; // search jsp
 
 // 검색창 focus 이벤트
 $(document).on('focus', '#total_keyword', function(e) {
     e.preventDefault();
     SDS_COMMON.search.open2($(this));
     var keyword = $(this).val();
     totalPopularKeyword(keyword, '#sch_quick_total');
     searchModule.renderRecentWords("#sch_recent_area"); //최근 검색어 render
 });
 
 $(document).on('keyup', '#total_keyword', function(e) {
    e.preventDefault();
    var keyword = $(this).val();
     
    keyword = keyword.replace(/\!|\@|\#|\$|\%|\^|\&|\*|\[|\]|\?|\(|\)/gi, "");
    keyword = keyword.replace(/\<|\>/gi, "");
    keyword = keyword.replace(/\+|\-/gi, "");
    keyword = keyword.replace(/\:|\;/gi, "");
    keyword = keyword.replace(/\[|\]/gi, "");
    keyword = keyword.replace(/\\/gi, "");
    $(this).val(keyword);

     if (e.key === 'Enter') { // 엔터키 => 검색 시작
         // searchStart(keyword, searchCallBack);
         // SDS_COMMON.search.close();
     }
     else {
         if (keyword.length > 0) {
             totalAutoComplete(keyword,'#sch_autocomplete');
             //$("#sch_recent_area,#sch_quick_total ").css("display","none");
             $("#sch_recent_area,#sch_quick_total ").addClass("dpn");
             //$("#sch_autocomplete").css("display","block");
             $("#sch_autocomplete").removeClass("dpn");
             $(".recentSchAllDelBtn").addClass("dpn"); //최근검색어전체삭제버튼 가리기


         } else {
             totalPopularKeyword(keyword,'#sch_quick_total');
             searchModule.renderRecentWords("#sch_recent_area"); //최근 검색어 render
             //$("#sch_recent_area,#sch_quick_total").css("display","block");
             $("#sch_recent_area,#sch_quick_total").removeClass("dpn")
             //$("#sch_autocomplete").css("display","none");
             $("#sch_autocomplete").addClass("dpn");
         }
     }
 });
 
 $(document).on('keyup', '#total_keyword2', function(e) {
     e.preventDefault();
     var keyword = $(this).val();
     keyword = keyword.replace(/\!|\@|\#|\$|\%|\^|\&|\*|\[|\]|\?|\(|\)/gi, "");
     keyword = keyword.replace(/\<|\>/gi, "");
     keyword = keyword.replace(/\+|\-/gi, "");
     keyword = keyword.replace(/\:|\;/gi, "");
     keyword = keyword.replace(/\[|\]/gi, "");
     keyword = keyword.replace(/\\/gi, "");
     $(this).val(keyword);
     
     if (e.key === 'Enter') { // 엔터키 => 검색 시작
         // searchStart(keyword, searchCallBack);
         // SDS_COMMON.search.close();
     }
     else {
         if (keyword.length > 0) {
            totalAutoComplete(keyword,'#sch_autocomplete2');
            $("#sch_quick_total2").css("display","none");
            $("#sch_recent_area2").css("display","none");
            $("#sch_autocomplete2").css("display","block");
         } else {
             totalPopularKeyword(keyword,'#sch_quick_total2');
             searchModule.renderRecentWords("#sch_recent_area2"); //최근 검색어 render
             $("#sch_autocomplete2").css("display","none");
             $("#sch_quick_total2").css("display","block");
             $("#sch_recent_area2").css("display","block");
             
         }
     }
 });
 
 
 //20230407 접근성
 $("#service_close_title").keydown(function(event){
    var v_keyCode = event.keyCode || event.which;
    if(v_keyCode == 9){
        if(!event.shiftKey){ //tab+shift가 아닌 경우 (tab event만 처리)
            $(this).closest(".form .sch_box").removeClass('on'); 
        }
    }
});

 $(document).on('focus click', '#total_keyword2', function(e) {
     e.preventDefault();
     totalPopularKeyword($(this).val(), '#sch_quick_total2');
     searchModule.renderRecentWords("#sch_recent_area2"); //최근 검색어 render
 });
 
 
 function totalPopularKeyword(keyword, objId) {
    //  var requestBody = {
    //      "size": 1,
    //      "query": {
    //          "bool": {
    //              "must": [
    //                  {"match": {"type": "popword"}},
    //                  {"match": {"popword.service": "KR"}},
    //                  {"match": {"popword.useyn": "y"}}
    //              ]
    //          }
    //      },
    //      "sort": [{"popword.timestamp": {"order": "desc"}}, "_id"]
    //  };
 
    //  var passPhrase = "81109e268d0a2495485ae5c97abd1e68d995322a00304de200277c6c36b43541999ca6055d7210399f5b2515e88a7438a112c4cea9444997e8439fb969c4483c";
    //  var encryptData = CryptoJS.AES.encrypt(JSON.stringify(requestBody), passPhrase);
 
     $.ajax({
         type : 'POST',
         url : transPage,
         dataType: 'json',
         data: 
		 {
                SITETYPECODE: 'kr',
                 transMode : 'popkeyword'
         },
         error : function(xhr, status, error) { console.log('popular keyword error', error) },
         success : function(data){
            //  if (data.hits.total > 0) {
            //      if (data.hits.hits[0]._source.popword.popwords && data.hits.hits[0]._source.popword.popwords.length > 0) {
            //          var popwords = JSON.parse(data.hits.hits[0]._source.popword.popwords);
            //          if(objId){
            //              $(objId).html(totalPopwordTemplate(popwords));
            //          }else{
            //              $("#sch_quick_total").html(totalPopwordTemplate(popwords));
            //          }
                     
            //      }
            //  }
            if(data && data.length>0){
                var popwords = data;
                if(objId){
                    $(objId).html(totalPopwordTemplate(popwords));
                }else{
                    $("#sch_quick_total").html(totalPopwordTemplate(popwords));
                }
            }
         }
     });
 }
 
 /*
 function totalPopwordTemplate(data){
     var html = '';
     var popwordDpCnt = data.length > 7 ? 7 : data.length; // 7개 까지만 표시
 
     html += '<p class="tit" id="service_title">인기검색어</p>' +
         '   <ul id="searchResult" class="sr_list">';
 
     for (var i=0; i<popwordDpCnt; i++) {
         // 결과에서 원래 검색어 찾기(공백 두칸 기준)
         var originWord = data[i].query.indexOf('  ') > 0 ? data[i].query.split('  ')[1] : data[i].query.split(' ')[0]
         html += '<li id="item_' + i + '">' +
             '   <a href="javascript:totalSearchStart(\'' + originWord + '\')" data-keyword="' + originWord + '">' + originWord + '</a>' +
             '</li>';
     }
 
     html += '   </ul>' +
         '<button type="button" class="btn_close" id="service_close_title">닫기</button>';
 
     return html;
 }
 */
//20230106 검색레이어개편용
 function totalPopwordTemplate(data){
    var html = '';
    var popwordDpCnt = data.length > PRE_LIST_NUM ? PRE_LIST_NUM : data.length; // PRE_LIST_NUM개 까지만 표시

    html += '<p class="tit" id="service_title">인기검색어</p>' +
        '   <ul id="searchResult" class="sr_list">';

    for (var i=0; i<popwordDpCnt; i++) {
        // 결과에서 원래 검색어 찾기(공백 두칸 기준)
        var originWord = data[i].query.indexOf('  ') > 0 ? data[i].query.split('  ')[1] : data[i].query.split(' ')[0]
        html += '<li id="item_' + i + '">' +
            '   <a href="javascript:totalSearchStart(\'' + originWord + '\')" data-keyword="' + originWord + '">' + originWord + '</a>' +
            '</li>';
    }
    html += '   </ul>' ;

    return html;
}
 // 자동완성
 function totalAutoComplete(keyword, objId) {
     var keywordLength = keyword.length;
     if (keywordLength > 0) {
        
        // var passPhrase = "81109e268d0a2495485ae5c97abd1e68d995322a00304de200277c6c36b43541999ca6055d7210399f5b2515e88a7438a112c4cea9444997e8439fb969c4483c";
        // var encryptData = CryptoJS.AES.encrypt(keyword, passPhrase);
        
        if(objId){
            $(objId).removeClass("dpn");
        }else{
            $("#sch_autocomplete").removeClass("dpn");
        }

        $(".recentSchAllDelBtn").addClass("dpn");
         $.ajax({
             type : "POST",
             url : transPage,
             data : {
                keyword : '' + keyword,
                 SITETYPECODE: 'kr',
                 transMode : 'autocomplete'
             },
             error : function(xhr, status, error) { console.log('auto complete error', error); },
             
             success : function(result) {
                if(result && result.length>0){
                    var autowords = result;
                    if(objId){
                        $(objId).html(totalAutoCompleteTemplete(autowords, keywordLength));
                    }else{
                        $("#sch_autocomplete").html(totalAutoCompleteTemplete(autowords, keywordLength));
                    }
                }
             }
         });
     }
 }
 
 function totalAutoCompleteTemplete(data, len){
     var html = '';
     var autoCompIdx = data.length > PRE_LIST_NUM ? PRE_LIST_NUM : data.length; // PRE_LIST_NUM개 까지만 표시
 
     html += '<p class="tit" id="service_title">자동완성</p>' +
         '   <ul id="searchResult" class="sr_list">';
 
     for (var i=0; i<autoCompIdx; i++) {
         html += '<li id="item_' + i + '">' +
             '   <a href="javascript:totalSearchStart(\'' + data[i] + '\')" data-keyword="' + data[i] + '">' +
             '       <span class="point">' + data[i].substring(0, len) + '</span>' + data[i].substr(len) +
             '   </a>' +
             '</li>';
     }
      html += '   </ul>';
 
     return html;
 }
 
 function totalSearchStart(keyword) {
    
     if (keyword) {
         searchModule.addRecentSearchTerms(keyword);
         window.location.href='/kr/search/search.html?queryData='+encodeURIComponent(keyword);
     }
 }
 
