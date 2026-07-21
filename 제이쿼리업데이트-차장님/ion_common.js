if (location.protocol !== 'https:' && location.hostname === 'www.samsungsds.com') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

/*** ion_js ***/
var $bThumbs, $sThumbs, $btnMore, $catAdmin, $allFeature; // DOM
var bThumbTemp, sThumbTemp, catAdminTemp; // temp data
var bThumbIdx, sThumbIdx; // data curr index
var bEnd, sEnd; // end check
var $tempTit;
//페이지 갯수
var moreCnt = 0;
var moreCategory = '';
let backTypeId = '';
let resArtId ='';


$(window).on('load', function() {
    
        //url 체크 후 대문자 혼용url은 소문자 url로 이동.
    redirectTolowercase();
    
});
/* Global Variables*/
   var baseURI = window.location.href;
   var domain = baseURI.indexOf('70.225.30.31:8001') >= 0 ? '70.225.30.31' : '.samsungsds.com';
   var corp = baseURI.split('/')[3];

/* Function */

function init () {
    if ($('#typeId').val() == 'insight' || $('#typeId').val() == 'media' || $('#typeId').val() == 'story' || $('#typeId').val() == 'issue' ) {
        $bThumbs = $('#bThumbs');
        $sThumbs = $('#sThumbs');
        $btnMore = $('#btnLoadMore');
        $catAdmin = $('#catAdmin');
        $allFeature = $('#allFeature');
        bThumbTemp = bThumbList ? bThumbList : null;
        sThumbTemp = sThumbList ? sThumbList : null;
        bThumbIdx = 0;
        sThumbIdx = 0;
        bEnd = false;
        sEnd = false;
        $btnMore.css('visibility', 'visible');
        $tempTit = $('#subTitTemp')
        $tempTit.hide();
        $tempTit.siblings('.sub_title').show();
        backTypeId = $('#backTypeId').val();
        moreCategory = $('#moreCategory').val();
    }
}

function moreFunc(lang,loadType,frameType){ // lang[en/ko] loadType[single/both], frameType[default/inthenews/issue]
    if($(window.event.target).attr('id')){
        moreCnt++;
    }

    frameType = frameType ? frameType : 'default';
    if (loadType == 'both') { // both
        if (!bEnd) {
            $bThumbs.append(makeHtml(lang,bThumbTemp,bThumbIdx,10,frameType));
        }
        if (!sEnd) {
            $sThumbs.append(makeHtml(lang,sThumbTemp,sThumbIdx,15,frameType));
        }
        if (bEnd && sEnd) $btnMore.css('visibility', 'hidden')
    } else if (loadType == 'single') { // single
        if (frameType=='issue') {
            $bThumbs.append(makeHtml(lang,bThumbTemp,bThumbIdx,10,frameType));
        } else {
            $btnMore.parents('.button_wrap').before(makeHtml(lang,bThumbTemp,bThumbIdx,10,frameType));
        }
        if (bEnd) $btnMore.css('visibility', 'hidden')
    }
}

function makeHtml(lang,data,idx,step,frameType){
    frameType = frameType ? frameType : 'default';
    var res = "";
    var langMoreBtn = '';
    var langShareBtn = '';
    var langSeries = '';
    //웹접근성 레이어팝업 열기 title 추가 Start 210430
    var langLayerOpen = '';
    if(lang == 'ko'){langLayerOpen = '레이어팝업 열기'}else{langLayerOpen = 'Open Layerpopup'};
    //웹접근성 레이어팝업 열기 title 추가 End 210430

    var catid = $('#sch_box_id').attr('data-catid'); //2022.07.25

    //카테고리
    if(lang == 'en') { langMoreBtn='Read more'; langShareBtn='Share'; langSeries='Series'}
    else if(lang == 'ko') { langMoreBtn='자세히 보기'; langShareBtn='공유하기'; langSeries='시리즈'}
    else if (lang=='pt') { langMoreBtn='Saiba mais'; langShareBtn='Compartilhar'; langSeries='Series'}
    else if (lang=='zh') { langMoreBtn='了解更多'; langShareBtn='分享'; langSeries='Series'}
    if(data.length <= 0){
        if (step == 10) {
            bEnd = true;
        }
        if (step == 15) {
            sEnd = true;
        }
        return res = "";
    }
    // single, both
    if (step == 10) {
        if (data.length < 1) { bEnd = false; return;}
        // in the news frameType
        else if (frameType == 'inthenews') {
            for (var i=0; i<step; i++) {
                var target = data[idx+i];
                res += "<div id='art_"+target.id+"' class='thumb'>";
                res += "<div class='thumb_textBox'>";
                res += "<div class='thumb_eyebrow'>";
                res += "<span class='thumb_company'>"+target.contact+"</span><span class='thumb_category'>"+target.eyebrowCopy+"</span><span class='thumb_date'>"+target.releaseDate+"</span>";
                res += "</div>";
                res += "<strong class='thumb_title'><a href='"+target.detailLink+"' onclick=\"saveParams();\">"+target.title+"</a></strong>";
                res += "<p class='thumb_description'><a href='"+target.detailLink+"' onclick=\"saveParams();\">"+target.content+"</a></p>";
                res += "<div class='thumb_btn'><a class='thumb_readMore' href='"+target.detailLink+"' onclick=\"saveParams();\">"+langMoreBtn+"</a><span class='thumb_mark'>|</span><a href='#' onclick=\"md_pop_share_info(this,'"+ target.detailLink +"','"+target.id+"')\" class='thumb_readMore add_share' title='"+langLayerOpen+"'>"+langShareBtn+"</a></div>";
                res += "</div>";
                res += "</div>";
                if ((idx+i) >= data.length-1) {
                    bEnd = true;
                    step = 0;
                    break;
                }
            }
            bThumbIdx += step;
        }
        // issue & fact frameType
        else if (frameType == 'issue') {
            for (var i=0; i<step; i++) {
                var target = data[idx+i];
                res += "<div id='art_"+target.id+"' class='newsList_item'>"
                res += "<div class='newsList_date'>"
                if (lang=='en' || lang=='pt') {
                    res += "<em class='newsList_date_month'>"+target.releaseDateM+"</em>"
                    res += "<strong class='newsList_date_day'>"+target.releaseDateD+"</strong>"
                    res += "<span class='newsList_date_year'>"+target.releaseDateY+"</span>"
                } else if (lang=='ko') {
                    res += "<span class='newsList_date_monthYear'>"+target.releaseDateY+"/"+target.releaseDateM+"</span>"
                    res += "<strong class='newsList_date_day'>"+target.releaseDateD+"</strong>"
                }
                res += "</div>"
                res += "<a href='"+target.detailLink+"'>"
                res += "<div class='newsList_txt'>"
                res += "<strong class='newsList_txt_title'  role='text'>"+target.title+"</strong>"
                res += "<p class='newsList_txt_desc'>"+target.content+"</p>"
                res += "</div>"
                // res += "<div class='newsList_comment'>"
                // res += "<span class='newsList_comment_icon'><img src='https://image.samsungsds.com/resource/en/images/icon/ico_comment_3.png?queryString=20260422050415' alt='comment icon'></span><span id='commCnt'>"+getCommentCnt(target)+"</span>"
                // res += "</div>"
                res += "</a>"
                res += "</div>"
                if ((idx+i) >= data.length-1) {
                    bEnd = true;
                    step = 0;
                    break;
                }
            }
            bThumbIdx += step;
        }
        // DEFAULT
        else {
            for (var i=0; i<step; i++) {
                var target = data[idx+i];
                var title = "";
                var content = "";
                //highlight setting 20211207
                title= target.title;
                content = target.content;

                if (!_.isNil(target.highlight)) {
                    if(!_.isNil(target.highlight["title.highlight"]))
                        title = target.highlight["title.highlight"];
                    else if(!_.isNil(target.highlight["title.kobrick"]))
                        title = target.highlight["title.kobrick"];
                    else if(!_.isNil(target.highlight["title.standard"]))
                        title = target.highlight["title.standard"];

                    if (target.highlight["contents.kobrick"]) {
                        content = target.highlight["contents.kobrick"];
                    }else if (target.highlight["contents.highlight"]) {
                        content = target.highlight["contents.highlight"];
                    }else if (target.highlight["contents.standard"]) {
                        content = target.highlight["contents.standard"];
                    }else if (target.highlight["summary.kobrick"]) {
                        content = target.highlight["summary.kobrick"];
                    }else if(target.highlight["summary"]) {
                        content = target.highlight["summary"];
                    }
                } 

                if (content == null || content == "null") {
                    content = "";
                }
                content = (content || "").trim();
                title = title.toString();



                if (target.thum_img.indexOf('no_thumb.png') > -1) {
                    target.thum_img = 'https://image.samsungsds.com/resource/en/images/comp_image_'+parseInt(Math.floor((Math.random()*5) + 1))+'.jpg?queryString=20260422050415';
                }
                if(target.thum_f_w !== undefined) {
                    if (target.thum_f_w.indexOf('no_thumb.png') > -1) {
                        target.thum_f_w = target.thum_img;
                    }
                }
                if(target.thum_f_m !== undefined) {
                    if (target.thum_f_m.indexOf('no_thumb.png') > -1) {
                        target.thum_f_m = target.thum_img;
                    }
                }
                res += "<div id='art_"+target.id+"' class='thumb'>";
                if(target.thum_img !== ''){
                    res += "<a class='thumb_imgBox' role='button' <a href='"+target.detailLink+"' onclick=\"saveParams();\" style=background-image:url('"+target.thum_img+"')>"+title.replace(/('|<[^>]+>)/gi,"")+"</a>";
                }
                res += "<div class='thumb_textBox'>";
                res += "<div class='thumb_eyebrow'>";


if(catid=='vn4_2'){ //2022.07.25 베트남 스토리인 경우 eyebrow 제거  
    res += "<span class='thumb_date'>"+target.releaseDate+"</span>";
}else{
    res += "<span class='thumb_category'>"+target.eyebrowCopy+"</span><span class='thumb_date'>"+target.releaseDate+"</span>";
}

                
                if (target.series) res += "<div class='navigationSlide_seriesWrap'><span class='navigationSlide_series'>"+langSeries+"</span></div>";
                res += "</div>"
                res += "<strong class='thumb_title'><a href='"+target.detailLink+"' onclick=\"saveParams();\">"+title+"</a></strong>";
                res += "<p class='thumb_description'><a href='"+target.detailLink+"' onclick=\"saveParams();\">"+content+"</a></p>";
                
                res += "<div class='thumb_btn'><a class='thumb_readMore' href='"+target.detailLink+"' onclick=\"saveParams();\">"+langMoreBtn+"</a><span class='thumb_mark'>|</span><a href='#' onclick=\"md_pop_share_info(this,'"+ target.detailLink +"','"+target.id+"')\" class='thumb_readMore add_share' title='"+langLayerOpen+"'>"+langShareBtn+"</a></div>";
                res += "</div>";
                res += "</div>";
                if ((idx+i) >= data.length-1) {
                    bEnd = true;
                    step = 0;
                    break;
                }
            }
            bThumbIdx += step;
        }
    }
    // both
    else if (step == 15) {
        for (var i=0; i<step; i++) {
            var target = data[idx+i];

            //언론보도부분 검색시 highlight 처리

            var title;
            title = target.title;
            if (!_.isNil(target.highlight)) {
                if(!_.isNil(target.highlight["title.highlight"]))
                    title = target.highlight["title.highlight"];
                else if(!_.isNil(target.highlight["title.kobrick"]))
                    title = target.highlight["title.kobrick"];
                else if(!_.isNil(target.highlight["title.standard"]))
                    title = target.highlight["title.standard"];
            }

            res += "<div id='art_"+target.id+"' class='thumb'>";
            res += "<div class='thumb_textBox'>";
            res += "<div class='thumb_eyebrow'>";
            res += "<span class='thumb_company'>"+target.contact+"</span><span class='thumb_category'>"+target.eyebrowCopy+"</span><span class='thumb_date'>"+target.releaseDate+"</span>";
            res += "</div>";
            res += "<strong class='thumb_title'>";
            res += "<a href='"+target.detailLink+"' onclick=\"saveParams();\">"+title+"</a>";
            res += "</strong>";
            res += "</div>";
            res += "</div>";
            if ((idx+i) >= data.length-1) {
                sEnd = true;
                step = 0;
                break;
            }
        }
        sThumbIdx += step;
    }
    return res;
}

function makeUrl(detailLink,target) {
    event.preventDefault();
    var param = '';
    param = '?moreCnt='+moreCnt+'&backTypeId='+backTypeId+'&category='+moreCategory;
    console.log('param: ',param);
    console.log('target: ',target);
    if (target == 'Y') {
        window.open(detailLink);
    } else {
        window.location = detailLink + param;
    }

}

function saveParams(){
    var params ='?moreCnt='+moreCnt+'&backTypeId='+backTypeId+'&category='+moreCategory;
    sessionStorage.setItem("isParam",params);
}

function cateFunc(frameType, cateNm, keyArt) { // frameType[insight,media,press,inthenews], cateNm, keyArt
    $('#searchbox').val('')
    if($(window.event.target.parentElement).attr('id')){
        $('#moreCategory').val($(window.event.target.parentElement).attr('id'));
        if(moreCategory != $(window.event.target.parentElement).attr('id')){
            drawCategory (frameType, cateNm, keyArt)
        }
    } else if($(window.event.target).html() === '전체' || $(window.event.target).html() === 'ALL' || $(window.event.target).html() === '所有') {
        $('#moreCategory').val('all');
        if(moreCategory !== 'all'){
            drawCategory (frameType, cateNm, keyArt);
        }
    } else {
        dataReset();
        cateNm=='all' ? cateTrans(frameType,'all',cateNm) : cateTrans(frameType,'cate',cateNm);
        catDataTrans(frameType,cateNm,keyArt);
        catAdminTrans(frameType,keyArt);
        $(window).scrollTop(0);
        if(moreCnt > 1){
            let loopCnt = moreCnt;
            for(var i=0; i<loopCnt; i++){
                $btnMore.click();
            }
            movewArticle();
        } else {
            $btnMore.click();
            moreCnt++;
            movewArticle();
        }
    }
}

function drawCategory (frameType, cateNm, keyArt) {
    moreCnt = 0;
    dataReset();
    cateNm=='all' ? cateTrans(frameType,'all',cateNm) : cateTrans(frameType,'cate',cateNm);
    catDataTrans(frameType,cateNm,keyArt);
    catAdminTrans(frameType,keyArt);
    $(window).scrollTop(0);
    $btnMore.click();
    moreCnt++;
}

function drawAllCategory(){
    if(moreCnt > 1){
        let loopCnt = moreCnt;
        for(var i=1; i<loopCnt; i++){
            $btnMore.click();
        }
        movewArticle();
    }
}

function cateViewAll(_this,frameType){
    if (frameType=='media') {
        var moveCatId = $(_this).parent().attr('id');
        var tempPressLink = $('#w_press_view').attr('href');
        var tempNewsLink = $('#w_news_view').attr('href');
        if(tempPressLink !== undefined){
            if(tempPressLink.indexOf('?category=') > -1) {
                tempPressLink = tempPressLink.slice(0,-21);
                tempNewsLink = tempNewsLink.slice(0,-21);
            }
        }
        $('#w_press_view').attr('href', tempPressLink+'?category='+moveCatId);
        $('#m_press_view').attr('href', tempPressLink+'?category='+moveCatId);
        $('#w_news_view').attr('href', tempNewsLink+'?category='+moveCatId);
        $('#m_news_view').attr('href', tempNewsLink+'?category='+moveCatId);
    }
}

function catTrigger (rtnval) {
    if(rtnval === 'all'){return}
    var targetCat = $('#'+rtnval);
    var moveW = $(window).width() - targetCat.offset().left;
    var turn = parseInt(targetCat.offset().left/$(window).width())+2;
    targetCat.find('a').click();
    if (moveW < 0) {
        for(var i=0; i<turn; i++){
            $('.category_next.is_active').click();
        }
    }
}

function dataReset () {
    $bThumbs.find('.thumb').remove();
    $sThumbs.find('.thumb').remove();
}
function cateTrans (frameType,cateType,cateNm) { // frameType[insight,media], cateType[all/cate]
    if (frameType=='insight' || frameType=='story') {
        if (cateType=='all') {
            $('.breadCrumb').hide();
            $('.breadCrumb_now').text(cateNm);
            $('.thumbList.is_side').show();
            $bThumbs.parents('.inWrap').removeClass('is_1140');
            $bThumbs.addClass('is_flow');
            $bThumbs.find('.sub_title').show();
            $allFeature.show();
            $catAdmin.hide();
            $('.bloggerCardList').show();
        } else if (cateType=='cate') {
            $('.breadCrumb').show();
            $('.breadCrumb_now').text(cateNm);
            $('.thumbList.is_side').hide();
            
            $bThumbs.parents('.inWrap').addClass('is_1140');
            $bThumbs.removeClass('is_flow');
            $bThumbs.find('.sub_title').hide();
            
        //    if(lang == 'ko'){ //insight 개편작업  2022.06.22
        //        $bThumbs.find('.sub_title').show();
        //         $('.thumbList.is_side').show();//insight 내 eyebrow값 선택시 우측 is_side 부분 국문인경우 출력.  2022.06.22
        //         $bThumbs.addClass('is_flow'); 
        //         $bThumbs.parents('.inWrap').removeClass('is_1140');
        //    }
            $allFeature.hide();
            $catAdmin.show();
            $('.bloggerCardList').hide();
        }
    } else if (frameType=='media') {
        // 미디어리포트 영역
        $bThumbs.parent().attr('class','is_flow');
        $bThumbs.parent('.inWrap').removeClass('is_1140')
        if (cateType=='all') {
            init();
            $bThumbs.parent().show();
            $sThumbs.parent().show();
            $('.breadCrumb').hide();
            $allFeature.show();
            $catAdmin.hide();
            $('.sideStickyWrap').show();
        } else if (cateType=='cate') {
            $('.breadCrumb').show();
            $('.breadCrumb_inner').find('span').last().text(cateNm);
            $allFeature.hide();
            $catAdmin.show();
        }
    } else if (frameType=='press' || frameType=='inthenews') {
        if (cateType=='all') {
            init();
            $('#breadDep1').show();
            $('#breadDep2').hide();
        } else if (cateType=='cate') {
            $('#breadDep1').hide();
            $('#breadDep2').show();
            $('#breadDep2').find('.breadCrumb_now').text(cateNm);
        }
    }
}
function movewArticle() {
    if(resArtId != '' && $('#art_' + resArtId).offset()){
        var scmove = $('#art_' + resArtId).offset().top;
        setTimeout(function(){$('html, body').animate( { scrollTop : scmove - 60 }, 400 );}, 500);
    }
}
function getCommentCnt(data) {
    var refer = data.detailLink
    var url = ' http://dev.livere.co.kr/API_Livere?command=getCount&calltype=refer&consumer_seq=134&livere_seq=20&refer=' + refer
    /* * $.ajax({
          type: 'GET',
          url: url,
          dataType: 'JSON',
          success: function (data) {
              console.log('success',data)
          }
      });
*/
    return 2;
}
function catDataTrans (frameType,catNm,keyArt) { // frameType[insight,media], cateType[all/cate], keyArt
    if (catNm=='all') {
        init();
        if (frameType=='media') {
            $bThumbs.parent().show();
            $sThumbs.parent().show();
            $bThumbs.parent().attr('class','is_flow');
            $sThumbs.parent().attr('class', 'is_reverse');
            $sThumbs.addClass('is_side');
            $('.tabControlBox').show();
            $bThumbs.removeAttr('style');
            $sThumbs.removeAttr('style');
        }
    //    if (lang=='ko' && frameType=='insight') { //insight 개편작업  2022.06.22
    //        $bThumbs.find('#print_art_cnt').html('전체'+'<span class="num_box round">총&nbsp;<span class="num">'+allData.length  +'</span>건</span>' );
    //    }
    } else {
        init();
        bThumbTemp = [];
        sThumbTemp = [];
        if (frameType=='media') {
            $bThumbs.parent().show();
            $sThumbs.parent().show();
            $bThumbs.parent().attr('class','is_flow');
            $sThumbs.parent().attr('class', 'is_reverse');
            $sThumbs.addClass('is_side');
            $('.tabControlBox').show();
            $bThumbs.removeAttr('style');
            $sThumbs.removeAttr('style');
        }
        if (frameType=='insight' || frameType=='story') {
            for (var i=0; i<allData.length; i++) {
                if (allData[i].eyebrowCopy == catNm) bThumbTemp.push(allData[i]);
            }
        //    if(lang=='ko'){ //insight 개편작업  2022.06.22
        //        $bThumbs.find('#print_art_cnt').html(catNm+'<span class="num_box round">총&nbsp;<span class="num">'+bThumbTemp.length  +'</span>건</span>' );
        //    }
            
            if (keyArt.length == 0) { // 대표아티클 없을 경우
                catAdminTemp = bThumbTemp[0];
            } else {
                for(var i=0; i<allData.length; i++) { // 대표아티클 있을 경우
                    if (allData[i].id == keyArt) {
                        catAdminTemp = allData[i];
                        break;
                    }
                }
            }
            // if (bThumbTemp.indexOf(catAdminTemp) > -1) bThumbTemp.splice(bThumbTemp.indexOf(catAdminTemp),1);

        }

        if (frameType=='media') {
            var catAllArt = [];
            $bThumbs.removeAttr('style');
            $sThumbs.removeAttr('style');
            $('.sideStickyWrap').removeAttr('style');
            $('.tabControlBox').removeAttr('style');
            for (var i=0; i<allData.length; i++) {
                if (allData[i].eyebrowCopy == catNm) catAllArt.push(allData[i]);
            }
            for (var i=0; i<catAllArt.length; i++) {
                if (catAllArt[i].category == 'Press Release' || catAllArt[i].category == '보도자료') {
                    // if (catAllArt[i] == catAdminTemp) continue;
                    if (catAllArt[i].thum_img.indexOf('no_thumb.png') > -1) {
                        catAllArt[i].thum_img = 'https://image.samsungsds.com/resource/en/images/comp_image_'+parseInt(Math.floor((Math.random()*5) + 1))+'.jpg?queryString=20260422050415';
                    }
                    if(catAllArt[i].thum_f_w !== undefined) {
                        if (catAllArt[i].thum_f_w.indexOf('no_thumb.png') > -1) {
                            catAllArt[i].thum_f_w = catAllArt[i].thum_img;
                        }
                    }
                    if(catAllArt[i].thum_f_m !== undefined) {
                        if (catAllArt[i].thum_f_m.indexOf('no_thumb.png') > -1) {
                            catAllArt[i].thum_f_w = catAllArt[i].thum_img;
                        }
                    }
                    bThumbTemp.push(catAllArt[i]);
                }
                else if (catAllArt[i].category == 'In the News' || catAllArt[i].category == '언론이 본 삼성SDS') {
                    if (catAllArt[i] == catAdminTemp) continue;
                    sThumbTemp.push(catAllArt[i]);
                }
            }

            if (keyArt.length == 0) { // 대표아티클 없을 경우
                if (sThumbTemp.length==0) {
                    catAdminTemp = catAllArt[0]
                } else {
                    catAdminTemp = bThumbTemp[0];
                }
            } else {
                for(var i=0; i<allData.length; i++) { // 대표아티클 있을 경우
                    if (allData[i].id == keyArt) {
                        catAdminTemp = allData[i];
                        break;
                    }
                }
            }
            // if (bThumbTemp.indexOf(catAdminTemp) > -1) bThumbTemp.splice(bThumbTemp.indexOf(catAdminTemp),1);
            // if (sThumbTemp.indexOf(catAdminTemp) > -1) sThumbTemp.splice(sThumbTemp.indexOf(catAdminTemp),1);
            $sThumbs.parent().show();
            if (bThumbTemp.length == 0 && sThumbTemp.length > 0) { // in the news 만 있는 경우
                $bThumbs.parent().hide();
                $sThumbs.parent().attr('class', 'inWrap is_1140');
                $sThumbs.removeClass('is_side');
                document.getElementById('sThumbs').style='display: block !important';
                $('.tabControlBox').hide();
            } else if (sThumbTemp.length == 0 && bThumbTemp.length > 0) { // press release 만 있는 경우
                $sThumbs.parent().hide();
                $bThumbs.parent().attr('class', 'inWrap is_1140');
                document.getElementById('bThumbs').style='display: block !important';
                $('.tabControlBox').hide();
            } else if (bThumbTemp.length == 0 && sThumbTemp.length == 0) { // 모두 없는 경우
                $('.sideStickyWrap').hide();
                $('.tabControlBox').hide();
            }
        }
        if (frameType=='press') {
            for (var i=0; i<allData.length; i++) {
                if ((allData[i].category == 'Press Release' || allData[i].category == '보도자료') && allData[i].eyebrowCopy == catNm) {
                    bThumbTemp.push(allData[i]);
                }
            }
        }
        if (frameType=='inthenews') {
            for (var i=0; i<allData.length; i++) {
                if ((allData[i].category == 'In the News' || allData[i].category == '언론이 본 삼성SDS') && allData[i].eyebrowCopy == catNm) {
                    bThumbTemp.push(allData[i]);
                }
            }
        }
    }
}
function catAdminTrans (frameType) {
    //if (!catAdminTemp) { $catAdmin.hide(); return;}

    var catid = $('#sch_box_id').attr('data-catid'); //2022.07.25

    if (frameType=='insight' || frameType=='story') {
        $catAdmin.find('.navigationSlide_item').css('backgroundImage','url('+catAdminTemp.thum_f_w+')');
        
        if(catid && catid!='vn4_2')//2022.07.25 베트남 스토리 아이브로우 제외
            $catAdmin.find('.navigationSlide_category').text(catAdminTemp.eyebrowCopy);
        
        (catAdminTemp.series) ? $catAdmin.find('.navigationSlide_seriesWrap').show() : $catAdmin.find('.navigationSlide_seriesWrap').hide();
        $catAdmin.find('a').attr('href',catAdminTemp.detailLink);
        $catAdmin.find('.navigationSlide_title > a').html(catAdminTemp.title);
        $catAdmin.find('.navigationSlide_desc > a').text(catAdminTemp.content);
    } else if (frameType=='media') {
        if(catAdminTemp){
            $catAdmin.find('.inWrap').show();
            if (catAdminTemp.category=='In the News' || catAdminTemp.category == '언론이 본 삼성SDS') {
                $('#catAdmin').find('.navigationSlide_img').attr('class','navigationSlide_img_none');
            } else if (catAdminTemp.category == 'Press Release' || catAdminTemp.category == '보도자료') {
                $('#catAdmin').find('.navigationSlide_img_none').attr('class','navigationSlide_img');
                $('#catAdmin').find('.navigationSlide_img a').css('background-image','url('+catAdminTemp.thum_f_w+')');
                $('#catAdmin').find('.navigationSlide_wrap').attr('style','background-image:url('+catAdminTemp.thum_img+')');
            }
            $catAdmin.find('a').attr('href',catAdminTemp.detailLink);
            $catAdmin.find('.navigationSlide_category').text(catAdminTemp.eyebrowCopy);
            $catAdmin.find('.navigationSlide_date').text(catAdminTemp.releaseDate);
            $catAdmin.find('.navigationSlide_title > a').html(catAdminTemp.title);
            $catAdmin.find('.navigationSlide_img > a').html(catAdminTemp.title);
            $catAdmin.find('.navigationSlide_desc > a').text(catAdminTemp.content);
        } else {
            $catAdmin.find('.inWrap').hide();
        }
    }
}
function mediaTabs () {
    $('#m_news_view').hide();
    $('#tab_press').on('click', function(){
        $('#m_press_view').show();
        $('#m_news_view').hide();
    })
    $('#tab_news').on('click', function(){
        $('#m_press_view').hide();
        $('#m_news_view').show();
    })
}

function focusTrapOn(mdShareBTn) {
    mdShareBTn.find('a:visible, button:visible').first().focus();
}

var lastActivatedButton_ion = null;

function md_pop_share_info(obj, url, itemArtId) {
    if($(obj).hasClass('on')){
        $(obj).removeClass('on');
        $('.md_share_area').removeClass('on').removeClass('off');
        $('.thumb_readMore.add_share').removeClass('on');
    }else{
        var offsetPosition = $(obj).offset();
        var w = ($(window).width() - $('#wrap').width()) * 0.5;
        var x = offsetPosition.left + 30 - w;
        var y = offsetPosition.top - 2;
        $('#md_share_area').addClass('on');
        $('#md_share_area').css('left', x).css('top', y);
        $('.md_share_box a').attr('href', url);
        $('.md_share_box button').attr('data-url', url);
        shareArtId = itemArtId; // 전역 값 세팅
        shareTypeId = $('#typeId').val(); // 전역 값 세팅

        $('.thumb_readMore.add_share').removeClass('on');
        $(obj).addClass('on');

        /* 202503 웹접근성 : 추가 */
        lastActivatedButton_ion = $(obj);

		// 포커스 트랩 활성화
        focusTrapOn($('.md_share_area'));
    }
    return false;
}

function loadIonCommon(){
    if($('#typeId').val() == 'insight' || $('#typeId').val() == 'media' || $('#typeId').val() == 'story'){
        init();
        $btnMore.click();
        moreCnt++;
        mediaTabs();
    }
}

function eventBannerCheck(){

	var startdate = $('#ev_banner > .inner').attr("data-startdate"); 
	var enddate = $('#ev_banner > .inner').attr("data-enddate");
	today =  getToday();

	if(isEventbannerDisplay(today, startdate, enddate)){
		$('#ev_banner').removeClass("none");
//		$('#ev_banner').css("display","block");
	}else{
//		$('#ev_banner').css("display","none");
	}

}

function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
	
	date = new Date( year+"/"+ month + "/" + day + " 00:00:00");
    return date;
}

function isEventbannerDisplay(today, startdate, enddate){
	var ret;
	if(_isExpired(today, enddate)){
		ret =  false;
	}else{
		if(_isStarted(today, startdate)){
			ret = true;	
		}else{
			ret =  false;
		}
	}
	return ret;
}

function _isStarted(today, startdate){
	var ret = false;
	

	if(startdate!==undefined && startdate!==null && startdate!==""){
		var sDate = startdate +" 00:00:00";
		sDate = new Date(sDate);
		
		if(sDate > today){
			ret = false;
		}else{
			ret = true;
		}

	}else{
		ret = false;
	}

	return ret;
}


function _isExpired(today, enddate){
	var ret;
    if(enddate !==undefined && enddate!==null&&enddate!==""){
        var eDate = enddate +" 00:00:00";
        eDate = new Date(eDate);
        if(eDate < today ){
            ret = true;
        }else{
            ret = false;
        }  
    }else{
		ret = false;
	}
	return ret;
}

function redirectTolowercase(){
    var nowUrl = window.location.href;
    var newUrl;
    var hostname = window.location.host;
    if(hostname=="www.samsungsds.com" || hostname=="samsungsds.com" || hostname =="70.225.30.31:8001"  ){
        if(nowUrl.indexOf('.html')>0){
            newUrl = nowUrl.split('.html', 1)+'.html';
            let upperCaseRegex = /[A-Z]/g;
            if(upperCaseRegex.test(newUrl)){
                console.log("now url: "+ newUrl);
                newUrl = newUrl.toLowerCase();
                var urlArr = nowUrl.split('.html');
                if(urlArr.length>1){
                    newUrl = newUrl+urlArr[1];
                
                }

                window.location.href=newUrl;
            } 
        
        }
}
    
}
// 서비스목록 부분 버튼
function trialbtnHideOnMobile(){
    
    var $btn_art = $("ul.service_list .service_box .service_item .btn_area");
    $btn_art.find("a").each(function (){
        var onclick= $(this).attr("onclick").toString();
        if(onclick.indexOf("chargeRequest")>-1){
            $btn_art.addClass("hide_mo");
            
        }
    });

    $btn_art = $('h1.tit_b').closest('div').find('div.md_btn');
    $btn_art.find("button").each(function (){
        var onclick= $(this).attr("onclick");
        if(onclick!=undefined && onclick!="" && onclick.indexOf("chargeRequest")>-1){
            $(this).css("display","none");
            $btn_art.css("margin","0px");
            $btn_art.css("height","0px");
        }
    });

}

//오퍼링에서 문의하기 호출 스크립트. solutionN 및 오퍼링명 넘기기
function goToSolutionContactPage(solutionN, offeringName){
    localStorage.removeItem("offeringName");
    localStorage.setItem("offeringName",offeringName);
    window.location.href="/kr/etc/contact/solution-contactus-page.html?solutionN="+solutionN;
}
/* load */
$(document).ready(function(){
    var hostname = window.location.host;
    if(hostname=="www.samsungsds.com" || hostname =="70.225.30.31:8001"  || hostname=="samsungsds.com"  ){
        //var urlLangType = getPathUrl(window.location.pathname);
        var dataUrl = getDataUrl(corp);

        //if(urlLangType != 0){
                    $.getJSON(dataUrl,function(data) {
            var parseData = data;
            var asisUrl ="";
            var tobeUrl ="";
            var pathName = window.location.pathname;
            var isUrl = false;
        
            for (var i = 0; i < parseData.data.length; i++){
                asisUrl = parseData.data[i].asisurl;
                if (asisUrl == pathName) {
                    isUrl = true;
                    tobeUrl = parseData.data[i].tobeurl;
                    break;
                }
            }
        
            if (isUrl) {
                redirect(tobeUrl);
            } else {
                return 0;
            }
          });
        
        function getUrlParameter(name) {
            name = name.replace(/[\[]/,'\\[').replace(/[\]]/,'\\]');
            var regex = new RegExp('[\\?&]' + name+ '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g,' '));
        }
        
        function redirect(url) {
            
            //var logtrk_goURL = "https://www.samsungsds.com" + url; //이동할 페이지
            var hostname = window.location.host;
            if(hostname.indexOf("samsungsds")>0) hostname= "https://"+hostname;
            else hostname= "http://"+hostname;
            var logtrk_goURL = hostname + url; //이동할 페이지 -20260303
            
            var ga_utm_source = getUrlParameter('utm_source') == '' ? '' : getUrlParameter('utm_source');
            var ga_utm_medium = getUrlParameter('utm_medium') == '' ? '' :getUrlParameter('utm_medium');
            var ga_utm_content = getUrlParameter('utm_content') == '' ? '' :getUrlParameter('utm_content');
            var ga_utm_campaign = getUrlParameter('utm_campaign') == '' ? '' :getUrlParameter('utm_campaign');
            var ga_utm_term = getUrlParameter('utm_term') == '' ? '' : getUrlParameter('utm_term');
            var ga_gclid = getUrlParameter('gclid') == '' ? '' : getUrlParameter('gclid');
            var ga_referrer = document.referrer;
            var result_url = '';
        
            // if(document.location.search !=''&&document.location.search[0]=='?') result_url = '&';
            // else result_url = '?';
            if(ga_referrer !== '') result_url += '&referrer='+ga_referrer;
            if(ga_utm_source !== '' && ga_referrer !== '') result_url += '&utm_source='+ga_utm_source;
            else if(ga_utm_source !== '' && ga_referrer === '') result_url += '&utm_source='+ga_utm_source;
            if(ga_utm_medium !== '') result_url += '&utm_medium='+ga_utm_medium;
            if(ga_utm_campaign !== '') result_url += '&utm_campaign='+ga_utm_campaign;
            if(ga_utm_content !== '') result_url += '&utm_content='+ga_utm_content;
            if(ga_utm_term !== '') result_url += '&utm_term='+ga_utm_term;
            if(ga_gclid !== '') result_url += '&gclid='+ga_gclid;
            if (result_url) result_url = '?' + result_url.substr(1);
        
            window.location = logtrk_goURL + result_url;
        }
        //}
    }
//20220901 M110모듈 탭이동 
	var hashTab = "";
    if(hostname.indexOf('.html#')>0){
        hashTab = hostname.split('.html#')[1];
    }
    if(hashTab != undefined && hashTab!=""){
        //$(".M110_B_cont").find(".tab_panel.active").toggleClass("active");
        $(".M110_B_cont").find('"#'+hashTab+'"').toggleClass("active");
        $(".M110_B_cont").find$('"#'+hashTab+'"').scrollTop();
    }

    function getPathUrl(url){
        var langType = '';

        if(url.indexOf('kr/') > 0){
            langType = 'kr';
        } else if(url.indexOf('en/') > 0){
            langType = 'en';
        } else {
            langType = 0;
        }

        return langType;
    }

    function getDataUrl(corp){
        var url = '';
        if(corp === 'kr'){
            url = '/kr/redirect/tobe/data.txt';
        } else if(corp ==='en'){
            url = '/en/redirect/tobe/data.txt';
        } else if(corp === 'us'){
            url = '/us/redirect/tobe/data.txt';
        } else if(corp === 'in'){
            url = '/in/redirect/tobe/data.txt';
        } else if(corp === 'eu'){
            url = '/eu/redirect/tobe/data.txt';
        } else if(corp === 'cn'){
            url = '/cn/redirect/tobe/data.txt';
        } else if(corp === 'la'){
            url = '/la/redirect/tobe/data.txt';
        }
        return url;
    }

    // $('.md_btn_share_close').click(function(){
    //     // 202503 웹접근성 : 추가
    //     console.log("ssssss", lastActivatedButton_ion)
    //         lastActivatedButton_ion.focus();

    //     if($('.add_share').hasClass('on')){
    //         $('.add_share').removeClass('on')
    //     }
    // });

    if ($('#typeId').val() == 'issue' ) {
        init();
        $btnMore.click();
        moreCnt++;
        mediaTabs();
    }

        //_lang쿠키 저장

   //var domain = '.samsungsds.com';
   if(corp != 'eu'){
        document.cookie = '_lang=' + (baseURI.split('/')[3]==='kr'?'ko':'en') + '; domain=' + domain + '; path=/;';
        document.cookie = 'lang=' + (baseURI.split('/')[3]==='kr'?'ko':'en') + '; domain=' + domain + '; path=/;';
   }else{
    if(Number($.cookie('cookie_policy_level'))!=NaN && Number($.cookie('cookie_policy_level')>1)){
        document.cookie = '_lang=' + (baseURI.split('/')[3]==='kr'?'ko':'en') + '; domain=' + domain + '; path=/;';
        document.cookie = 'lang=' + (baseURI.split('/')[3]==='kr'?'ko':'en') + '; domain=' + domain + '; path=/;';
    }

   }
   


    
    //이벤트 배너 삽입  20210930
    /*
   
    if(corp == 'kr'){
         if(baseURI.split('/')[4]=='index.html' || baseURI.split('/')[4]=='' ){
        $.ajax({
            url: '/'+corp+'/main2024/ev_banner/ev_banner.html??queryString=20260422050415',
            method: "get",
            data: null,
            dataType: "html",
            async: false,
            success: function(data) {
                $('#ev_banner').html( data );
                eventBannerCheck();           
            },
            error: function(){
                console.log('main Banner Ajax error :::::::::::::::::::' , arguments);
				$('#ev_banner').css("display","none");
            }
        });
        }
    }

    //모바일접속시 서비스리스트 내 버튼 hide
    if (SDS_COMMON.isMobile()){
        trialbtnHideOnMobile(); 
    }
*/
});
