$(function () {
    var btnLangSet = {
        ko: {
            allBtn: "전체",
            moreBtn: "자세히 보기",
            downBtn: "다운로드",
            playBtn: "동영상 보기",
            playBtn2: "동영상 보기",
            pastEvent: "지난 이벤트보기",
            videoTxt: "동영상",
            errMsgTitle: "죄송합니다.",
            errMsgTxt: "일치하는 항목이 없습니다. 다시 시도하여 주시기 바랍니다.",
        },
        en: {
            allBtn: "All",
            moreBtn: "Read more",
            downBtn: "Download",
            playBtn: "Play video",
            playBtn2: "Download now",
            pastEvent: "See past event",
            videoTxt: "VIDEO",
            errMsgTitle: "Sorry",
            errMsgTxt: "No results found matching your filter selection. Please try again."
        },
        la: {
            allBtn: "All",
            moreBtn: "Read more",
            downBtn: "Download",
            playBtn: "Play video",
            playBtn2: "Download now",
            pastEvent: "See past event",
            videoTxt: "VIDEO",
            errMsgTitle: "Sorry",
            errMsgTxt: "No results found matching your filter selection. Please try again."
        },
        pt: {
            allBtn: "All",
            moreBtn: "Saiba mais",
            downBtn: "Fazer download",
            playBtn: "Assistir ao vídeo",
            playBtn2: "Download now",
            pastEvent: "Veja evento anterior",
            videoTxt: "VÍDEO",
            errMsgTitle: "Desculpe",
            errMsgTxt: "Nenhum resultado encontrado para seus  filtros de seleção."
        },
        zh: {
            allBtn: "所有",
            moreBtn: "读取更多",
            downBtn: "下载",
            playBtn: "播放视频",
            playBtn2: "Download now",
            pastEvent: "查看往期活动",
            videoTxt: "演示视频",
            errMsgTitle: "抱歉",
            errMsgTxt: "没有与搜索条件匹配的项，请重试"
        }
    }

    /*******************************************************************************
   * 파 일 명 : sidemenu.js
   * 작 성 자 : sangkey
   * 작 성 일 : 2020-08-03
   * 기    능 : 리소스 페이지 > 오퍼링 필터 메뉴 JS
   ******************************************************************************/
    var lang = $('html').attr('lang');
    var menu = new Array();
    var currentMenu = new Array();
    var menuUrl = $('#menuUrl').val();
    var offeringType = $('#offeringType').val();

    if (lang.indexOf('-') > -1) {
        lang = lang.slice(0, lang.indexOf('-'));
    }
    /*
    if(menuUrl !== undefined){
      $.getJSON(menuUrl,function(result) {
        menu = result;
        filterMenu(menu.data, offeringType);
        sideMenuRender(currentMenu,offeringType);
      })
        .fail(function(jqXHR, textStatus, errorThrown) { console.log('Network Error occurred'); })
    }*/

    function filterMenu(menuData, type) {
        if (type === 'all') { currentMenu = menuData; }
        else { currentMenu = _.find(menuData, { id: type }); }
    }

    var filterHTML = {
        all: function (type) {
            var item = _.find(menu.data, { id: type });
            var html = '';
            return '<li class="li chk_tree_all"><div><input type="checkbox" name="check_off_all" class="chk_all" id="check_off_all" onclick="chkAll(this);" value="all"><label for="check_off_all"><span class="icon"></span><strong>' + btnLangSet[lang].allBtn + '</strong></label></div></li>';
            /*
            if(type === 'all'){
                return '<li class="li chk_tree_all"><div><input type="checkbox" name="check_off_all" class="chk_all" id="check_off_all" onclick="chkAll(this);" value="all"><label for="check_off_all"><span class="icon"></span><strong>'+btnLangSet[lang].allBtn+'</strong></label></div></li>';
            } else{
                html += '<li class="li chk_tree_all"><div><input type="checkbox" name="check_off_all" class="chk_all" id="check_off_all" onclick="chkAll(this);" value="all"><label for="check_off_all"><span class="icon"></span><strong>'+btnLangSet[lang].allBtn+'</strong></label></div></li>';
                html += '<li class="li"><div><input type="checkbox" name="check_off" class="chk_li" id="check_off_cat" value="'+type+'"><label for="check_off_cat"><span class="icon"></span>'+item.catName+' ('+item.count+')</label></div></li>';
                return html;
            }*/
        },
        liDepth1: function (data, dep1Idx) {
            var title = '';
            if (data.count === 0) { title = data.catName; }
            else { title = data.catName + ' (' + data.count + ')'; }
            return '  <div>' +
                '      <input type="checkbox" name="check_off" class="chk_li" id="check_off_' + dep1Idx + '" value="' + data.id + '">' +
                '      <label for="check_off_' + dep1Idx + '"><span class="icon"></span>' + title + '</label>' +
                '  </div>'
        },
        liDepth2: function (data, dep1Idx, dep2Idx) {
            var title = '';
            if (data.count === 0) { title = data.catName; }
            else { title = data.catName + ' (' + data.count + ')'; }
            return '  <div>' +
                '      <input type="checkbox" name="check_off" class="chk_li" id="check_off_' + dep1Idx + '_' + dep2Idx + '" value="' + data.id + '">' +
                '      <label for="check_off_' + dep1Idx + '_' + dep2Idx + '"><span class="icon"></span>' + title + '</label>' +
                '  </div>'
        },
        liDepth3: function (data, dep1Idx, dep2Idx, dep3Idx) {
            return '  <div>' +
                '      <input type="checkbox" name="check_off" class="chk_li" id="check_off_' + dep1Idx + '_' + dep2Idx + '_' + dep3Idx + '" value="' + data.id + '">' +
                '      <label for="check_off_' + dep1Idx + '_' + dep2Idx + '_' + dep3Idx + '"><span class="icon"></span>' + data.catName + ' (' + data.count + ')</label>' +
                '  </div>'
        },
        result: function (data, type) {
            var offeringHtml = '';
            var dep1Idx = 0;
            var dep2Idx = 0;
            var dep3Idx = 0;

            offeringHtml += this.all(type);

            _.filter(data, function (el, idx) {
                var isEmpty2Depth = _.isEmpty(_.filter(el.depth, function (el) { return el.count !== 0 }));
                dep1Idx = idx + 1;

                if (isEmpty2Depth && el.count !== 0) {
                    offeringHtml += '  <li class="li">'
                    offeringHtml += filterHTML.liDepth1(el, dep1Idx);
                    offeringHtml += '  </li>'
                } else if (!isEmpty2Depth) {
                    offeringHtml += '  <li class="li">'
                    offeringHtml += filterHTML.liDepth1(el, dep1Idx);
                    offeringHtml += '  <ul class="dep">'

                    _.filter(el.depth, function (el, idx) {
                        var isEmpty3Depth = _.isEmpty(_.filter(el.depth, function (el) { return el.count !== 0 }));
                        dep2Idx = idx + 1;

                        if (isEmpty3Depth && el.count !== 0) {
                            offeringHtml += '  <li>';
                            offeringHtml += filterHTML.liDepth2(el, dep1Idx, dep2Idx);
                            offeringHtml += '  </li>';
                        } else if (!isEmpty3Depth) {
                            offeringHtml += '  <li>';
                            offeringHtml += filterHTML.liDepth2(el, dep1Idx, dep2Idx);
                            offeringHtml += '  <ul class="dep">'

                            _.filter(el.depth, function (el, idx) {
                                dep3Idx = idx + 1;
                                if (el.count !== 0) {
                                    offeringHtml += '  <li>';
                                    offeringHtml += filterHTML.liDepth3(el, dep1Idx, dep2Idx, dep3Idx);
                                    offeringHtml += '  </li>';
                                }
                            })
                            offeringHtml += '  </ul>'
                            offeringHtml += '</li>'
                        }
                    })
                    offeringHtml += '  </ul>'
                    offeringHtml += '</li>'
                }
            })
            $("#offering-menu").html(offeringHtml);
        }
    }

    function sideMenuRender(menu, type) {
        // console.log(menu, type);
        if (type === 'all') {
            filterHTML.result(menu, type);
        } else {
            menu = Array.isArray(menu) ? menu[0] : menu
            var makeArr = [];
            makeArr.push(menu);
            menu = makeArr;

            //filterHTML.result(menu,type);
            // console.log(menu);
            filterHTML.result(menu, type);
        }

        //20230127 체크박스체크
        var storage = window.sessionStorage;
        var solid = storage.getItem("prevSolId");
        if (solid) {
            setTimeout(function () {

                $("input[name=check_off][value=" + solid + "]").trigger("click");

            }, 500);
        }



    }

    // 변수 선언
    // var lang = $('html').attr('lang');
    var $postType = $('#postType').val();
    var $offeringType = $('#offeringType').val();
    var $logistics = $('#logistics').val();
    var totalData = new Array();                     // 가져온 토탈 데이터
    var currentData = new Array();                   // 현재 데이터 저장;
    var cpage = 0;                                   // 현재 페이지
    var addValue = 9;                                 // 더보기 노출시킬 개수 event : 6
    var dataUrl = $('#dataUrl').val();
    var scroll = 0;
    var initYn = false;
    var qs = getQueryStringObject();                 // query string 추출 함수
    var today = $.datepicker.formatDate('yy/mm/dd', new Date());
    today = new Date(today + " 00:00:00");
    if ($('#corpCountry').val() == 'kr' && ($postType === 'event' || $postType === 'webinar')) {
        setFeaturedEventTag();
    }

    // //주영 리스트 출력 개수
    // if($postType === 'event'){
    //     addValue = 6;

    //     // console.log("list", addValue);
    //     setFeaturedEventTag();

    // } else if($postType === 'resource'){
    //     addValue = 10;
    // }
    if (menuUrl !== undefined) {
        $.getJSON(menuUrl, function (result) {
            menu = result;
            filterMenu(menu.data, offeringType);
            sideMenuRender(currentMenu, offeringType);
        }).done(function () {
            getDataJson();
        })
            .fail(function (jqXHR, textStatus, errorThrown) { console.log('Network Error occurred'); })


    } else {
        getDataJson();

    }



    function getDataJson() {

        $.getJSON(dataUrl, function (result) {
            filterData(result.data);
            // isQsParmeter(qs)
            isLocationHash();
            contentRender(currentData, cpage);
            initShareBtn();
            if (scroll > 0) {
                $('html,body').animate({ scrollTop: scroll }, 100);
                scroll = 0;
            }
            loading_stop();
        })
            .fail(function (jqXHR, textStatus, errorThrown) { console.log('getJSON ERR :: Network Error occurred'); })

    }
    function getQueryStringObject() {
        var a = window.location.search.substr(1).split('&');
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    }

    function isQsParmeter(qs) {

    }

    function setFeaturedEventTag() {
        var $featuredList;
        $featuredCnameAList = $("div.md_btn >a");
        //console.log("$featuredCnameAList.length:::"+$featuredCnameAList.length)

        if ($featuredCnameAList.length !== 0) {
            $featuredCnameAList.each(function () {
                //          console.log("featured item enddate :::::"+$(this).attr("data-enddate"));
                if ($(this).attr("data-enddate") && isExpired($(this).attr("data-enddate"))) {
                    $(this).attr("href", "/kr/etc/complete/end/event-end.html");
                }
            });
        }



    }

    function isExpired(enddate) {
        if (enddate !== null && enddate !== "") {
            // var today = $.datepicker.formatDate('yy/mm/dd', new Date())


            // today = new Date(today+" 00:00:00");
            //   console.log("Today::::"+today);
            var eDate = enddate.substring(0, 4) + "/" + enddate.substring(4, 6) + "/" + enddate.substring(6, 8) + " 00:00:00";
            eDate = new Date(eDate);
            if (eDate - today < 0) {
                ret = true;
            } else {
                ret = false;
            }
            return ret;
        }
    }

    function isLocationHash() {
        if (window.location.hash) {
            if (location.hash === '#p') {
                var facet = JSON.parse(sessionStorage.getItem('facet'));
                if (facet !== null) {
                    if (!_.isNull(facet['loc']) && !_.isUndefined(facet['loc'])) {
                        scroll = facet['loc'];
                    }
                    if (!_.isNull(facet['cpage']) && !_.isUndefined(facet['cpage'])) {
                        cpage = facet['cpage'];
                    }
                    setFacet(facet);
                    eventFilter.result();
                    initYn = true
                }
            }
        }
    }

    function getFacet() {
        var param = new Object;


        param = { eventTypeCode: [] }

        /* 주영 : fil_tab = event_filterCheck 로 수정*/
        $('.event_filterCheck input[type=checkbox]:checked').each(function () {
            console.log("getFacet - checkbox value " + $(this).val());
            param.eventTypeCode.push($(this).val());


        });

        var startDate = $('ul.fil_tab #startDate').val();
        if (!_.isEmpty(startDate)) {
            param['startDate'] = startDate;
        }
        var endDate = $('ul.fil_tab #endDate').val();
        if (!_.isEmpty(endDate)) {
            param['endDate'] = endDate;
        }




        return param;
    }

    // 세션에 값이 있으면 선택했었던 필터에 같은값 등록
    function setFacet(facet) {

        if (!_.isEmpty(facet['eventTypeCode'])) {
            setFilterCondition(facet['eventTypeCode'], 'eventTypeCode');
        }

        if (!_.isEmpty(facet['startDate'])) {
            $('ul.fil_tab #startDate').val(facet['startDate']);
        }

        if (!_.isEmpty(facet['endDate'])) {
            $('ul.fil_tab #endDate').val(facet['endDate']);
        }



    }

    function setFilterCondition(obj, kind) {
        var strArray = obj;
        var leng = strArray.length - 1;


        for (var i = 0; i < strArray.length; i++) {

            /* 주영 : fil_tab = event_filterCheck 로 수정*/
            console.log("2")
            $('.event_filterCheck input[value="' + strArray[i] + '"]').prop('checked', true);

        }


    }

    // ajax 통신 response 데이터 조건에 맞게 필터링 해주는 함수

    function filterData(data) {
        totalData = data;

        if ($logistics === 'Y') {
            totalData = eventFilter.isLogisticsData(totalData);
            currentData = totalData;

        } else {
            currentData = totalData;
        }

    }



    // sta 이벤트 필터 전체

    // event filter function
    var eventFilter = {
        // data 4개씩 필터링
        data: function (data) { return _.chain(data).chunk(addValue).nth(cpage).value(); },
        isLogisticsData: function (data) { return _.filter(data, (function (el) { return el.isLogistics === true })) },
        // 날짜 표시 포맷 변환 - view
        date: function (date) {
            var resultDate = [date.substring(4, 6), date.substring(6)]
            return _.map(resultDate, function (el) { return _.head(el) === '0' ? el.substring(1) : el });
        },
        // 이벤트 끝남 유무 여부 - view
        isEnd: function (date) {
            var today_ = $.datepicker.formatDate('yymmdd', new Date());
            if (date.endDate === "") {
                return date.startDate - today_ < 0 ? 'Y' : 'N';
            } else {
                return date.endDate - today_ < 0 ? 'Y' : 'N';
            }
        },



        // 이벤트 현재 상태 가져오기 20210823
        getEventState: function (date) {


            // console.log("getEventState 함수 date 처음 출력된 개수만 나옴 ", date)

            var ret = 0; // 0 : 예정, 1: 진행중, 2:종료

            if (date.endDate === "") {
                var sDate = date.startDate.substring(0, 4) + "/" + date.startDate.substring(4, 6) + "/" + date.startDate.substring(6, 8) + " 00:00:00";
                sDate = new Date(sDate);
                var oneDayEventState = sDate - today;
                if (oneDayEventState < 0) { //시작일이 오늘보다 이전
                    ret = 2; //종료
                } else if (oneDayEventState == 0) { //시작일과 오늘이 같다
                    ret = 1; //진행중
                } else {
                    ret = 0; //예정
                }

            } else {

                var sDate = date.startDate.substring(0, 4) + "/" + date.startDate.substring(4, 6) + "/" + date.startDate.substring(6, 8) + " 00:00:00";
                sDate = new Date(sDate);
                var eDate = date.endDate.substring(0, 4) + "/" + date.endDate.substring(4, 6) + "/" + date.endDate.substring(6, 8) + " 00:00:00";
                eDate = new Date(eDate);
                if (sDate - today > 0) {
                    ret = 0; //예정
                } else {
                    if (eDate - today < 0) {
                        ret = 2; //종료
                    } else {
                        ret = 1; //진행중
                    }

                }
            }
            return ret;

        },

        monthConvert: function (month) {
            var chageMonth;
            switch (month[0]) {
                case '1':
                    chageMonth = 'JAN'
                    break;
                case '2':
                    chageMonth = 'FEB'
                    break;
                case '3':
                    chageMonth = 'MAR'
                    break;
                case '4':
                    chageMonth = 'APR'
                    break;
                case '5':
                    chageMonth = 'MAY'
                    break;
                case '6':
                    chageMonth = 'JUN'
                    break;
                case '7':
                    chageMonth = 'JUL'
                    break;
                case '8':
                    chageMonth = 'AUG'
                    break;
                case '9':
                    chageMonth = 'SEPT'
                    break;
                case '10':
                    chageMonth = 'OCT'
                    break;
                case '11':
                    chageMonth = 'NOV'
                    break;
                case '12':
                    chageMonth = 'DEC'
                    break;
                default:
                    console.log('month not data')
            }

            return chageMonth;
        },




        // 콘텐츠 데이터 html 렌더링 - view
        content: function (postlist) {
            var bodyHtml = ''
            // console.log("postlist", postlist)

            for (var i = 0; i < postlist.length; i++) {
                var result = postlist[i];
                var startDate = this.date(result.startDate)
                var endDate = this.date(result.endDate)
                var eventEndYn = this.isEnd(result)
                var ctaName = eventEndYn === 'Y' ? (result.ctaName == btnLangSet[lang].playBtn2 ? result.ctaName : btnLangSet[lang].pastEvent) : result.ctaName;
                var eventStateTag = "";
                var eventState = this.getEventState(result);
                var noLink = false;

                // console.log("eventState 예정, 진행중, 종료 구분", eventState) //예정, 진행중, 종료


                /* 이벤트 기간 날짜 추출 */
                var eventStartDate = result.startDate.substring(0, 4) + "." + result.startDate.substring(4, 6) + "." + result.startDate.substring(6, 8);
                var eventEndDate = result.endDate.substring(0, 4) + "." + result.endDate.substring(4, 6) + "." + result.endDate.substring(6, 8);
                var eventEndperiod = (result.endDate) ? eventStartDate + " ~ " + eventEndDate : eventStartDate;



                if (lang === 'ko') {
                    switch (eventState) {
                        case 0: eventStateTag = '<i class="flag_name">예정</i>'; break; //예정
                        case 1: eventStateTag = '<i class="flag_ing">진행중</i>'; break;//진행중
                        case 2: eventStateTag = '<i class="flag_end">종료</i>'; break;//종료
                    }
                }


                /* 이벤트 종류 flag */
                var eventTypeCodeTag;
                switch (result.eventTypeCode) {
                    case "전시/행사": eventTypeCodeTag = '<i class="flag_exh">전시/행사</i>'; break; //전시/행사
                    case "캠페인": eventTypeCodeTag = '<i class="flag_campaign">캠페인</i>'; break;//캠페인
                    case "웨비나": eventTypeCodeTag = '<i class="flag_webinar">웨비나</i>'; break;//웨비나
                }

                // console.log("eventTypeCodeTag", eventTypeCodeTag)


                // 웨비나 && 다시 보기 링크없음 && 종료 인 경우 a tag제거 (20240124)
                if ($postType == "event") {
                    if (eventState == 2 && (result.eventTypeCode == "웨비나" && result.replayUrl == "" || result.target == "Y")) {
                        noLink = true;
                    }
                } else {
                    if (eventState == 2 && result.replayUrl == "") {
                        noLink = true;
                    }
                }




                var aHtml = `<a href="` + result.detailLink + `"` + (result.target == `N` ? `` : `target="_blank" title="새창 열림" `) + ` class="md_link" >` +
                    `<span class="img_p"><img src="` + result.thumbImg + `" alt="` + result.thumbAlt + `"></span>` +
                    `</a>` +
                    `<button class="md_btn_share" data-url="` + result.detailLink + `" data-artid="` + result.id + `" title="레이어 팝업 열림"><span class="blind">공유하기</span></button>`;

                var strongHtml = '<strong class="list_title"><a href="' + result.detailLink + '" target="' + (result.target == 'N' ? '' : '_blank') + '" class="md_link md_tit">' + result.title + '</a></strong>';

                if (noLink) {//이벤트 종료 안내페이지로 redirect

                    aHtml = '<a href="/kr/etc/complete/end/event-end.html" class="md_link"><span class="blind">' + result.title + '</span>' +
                        '<span class="img_p"><img src="' + result.thumbImg + '" alt="' + result.thumbAlt + '"></span></a>';
                    strongHtml = '<strong class="list_title">' + result.title + '</strong>'

                    if (result.id == "1284609") { //real summit 2024 예외
                        aHtml = `<a href="` + result.detailLink + (result.target == `N` ? `` : ` target="_blank" title="새창 열림" `) + `" class="md_link" >` +
                            `<span class="blind">` + result.title + `</span>` +
                            `<span class="img_p"><img src="` + result.thumbImg + `" alt="` + result.thumbAlt + `"></span>` +
                            `</a>` +
                            `<button class="md_btn_share" data-url="` + result.detailLink + `" data-artid="` + result.id + `" title="레이어 팝업 열림"><span class="blind">공유하기</span></button>`;
                        strongHtml = '<strong class="list_title"><a href="' + result.detailLink + (result.target == 'N' ? '' : ' target="_blank" title="새창 열림"') + '" class="md_link md_tit">' + result.title + '</a></strong>';
                    }
                }



                if ($postType == "event") {

                    bodyHtml += '<li id="movePoint' + (cpage + 1) + i + '">' +
                        '<div class="event_listCont">' +
                        '<div class="item">' +
                        '<div class="img">' + aHtml +
                        '</div>' +

                        '<div class="event_list_txt">' +

                        '<aside>' + eventTypeCodeTag + eventStateTag + '<span class="date">' + eventEndperiod + '</span></aside>' + strongHtml;

                    bodyHtml += '<p class="list_sText md_txt">' + result.content + '</p>' + '<p class="list_btn">';
                    if (result.replayUrl !== "") {
                        bodyHtml += `<a href="` + result.replayUrl + `" class="btn_arrow"><span>다시 보기</span></a>`;
                    }
                    bodyHtml += '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                } else if ($postType == "webinar") {
                    bodyHtml += `<li><div class="webinar_listCont"><div class="item"><div class="img">`
                    bodyHtml += aHtml + `</div>`
                    bodyHtml += `<div class="webinar_list_txt"><aside>` + eventStateTag + `<span class="date">` + eventEndperiod + `</span></aside>` + strongHtml;
                    bodyHtml += `<p class="list_sText md_txt">` + result.content + `</p><p class="list_btn">`;
                    if (result.replayUrl !== "") {
                        bodyHtml += `<a href="` + result.replayUrl + `" class="btn_arrow"><span>다시 보기</span></a>`;
                    }
                    bodyHtml += `</p></div></div></div></li>`;
                }

            }


            return bodyHtml;
        },




        // 날짜 필터링 값 - data
        dateFilter: function (data, param) {
            return _.filter(data, function (el) {
                var result;
                if (el.endDate === "") {
                    result = param.startDate <= el.startDate ? (el.startDate <= param.endDate ? true : false) : false;
                } else if (param.startDate <= el.endDate && el.endDate <= param.endDate) {
                    result = true
                } else if (el.startDate <= param.startDate && param.endDate <= el.endDate) {
                    result = true
                } else if (param.startDate <= el.startDate && param.endDate <= el.endDate && el.startDate <= param.endDate) {
                    result = true
                }
                return result;
            })
        },

        //주영 소팅 개수 처리
        eventType: function (param, data) {
            var result = new Array();
            for (var i = 0; i < param.length; i++) {
                var eventTypeData = _.filter(data, { eventTypeCode: param[i] });
                result = _.uniq(_.concat(result, eventTypeData));

                // console.log("--- 소팅 총 개수", result.length)
            }
            return result;
        },
        locationType: function (param, data) {
            var result = new Array();
            for (var i = 0; i < param.length; i++) {
                var locationData = _.filter(data, { location: param[i] });
                result = _.uniq(_.concat(result, locationData))
            }
            return result;
        },
        // 타입 필터링 값 - data
        typeFilter: function (param) {
            var result = new Array();
            if (!_.isEmpty(param.eventTypeCode) && !_.isEmpty(param.locations)) {
                result = this.eventType(param.eventTypeCode, totalData);
                result = this.locationType(param.locations, result);
            } else if (!_.isEmpty(param.eventTypeCode) && _.isEmpty(param.locations)) {
                result = this.eventType(param.eventTypeCode, totalData);
            } else if (_.isEmpty(param.eventTypeCode) && !_.isEmpty(param.locations)) {
                result = this.locationType(param.locations, totalData);
            }

            return result;
        },
        // 필터링 선택한(날짜 또는 타입) 총 결과 값 - data
        result: function () {
            var resultData = new Object();
            var param = getFilterCondition();

            if ((!_.isEmpty(param.eventTypeCode) || !_.isEmpty(param.locations)) && _.isEmpty(param.endDate)) {
                resultData = this.typeFilter(param)
            } else if ((_.isEmpty(param.eventTypeCode) && _.isEmpty(param.locations)) && !_.isEmpty(param.endDate)) {
                resultData = this.dateFilter(totalData, param)
            } else if ((!_.isEmpty(param.eventTypeCode) || !_.isEmpty(param.locations)) && !_.isEmpty(param.endDate)) {
                resultData = this.typeFilter(param)
                resultData = this.dateFilter(this.typeFilter(param), param)
            } else {
                resultData = totalData
            }
            return currentData = _.orderBy(resultData, ['startDate'], ['desc']);
        }
    }
    // end 주영 이벤트 필터 전체
    // ********************************************** content render function **********************************************
    //콘텐츠 내용 렌더링
    function contentRender(data, cpage) {
        mdShareClose();
        var bodyHtml = '';
        var postlist = new Array();
        var filter = eventFilter;


        if (initYn) {
            postlist = _
                .chain(data)
                .chunk(addValue)
                .slice(0, cpage + 1)
                .flatten()
                .value()
            initYn = false;
        } else {
            postlist = filter.data(data)
        }

        if (_.isEmpty(data)) {
            if (lang == 'ko') {
                bodyHtml = `<div class="sch_no_result" id="searchList_error"><i class="icon"></i><p class="md_tit tit_b" id="txtMsg_010">`;
                if ($postType === 'event') {
                    bodyHtml += "이벤트가 없습니다.</p></div>";
                } else if ($postType === 'webinar') {
                    bodyHtml += "웨비나가 없습니다.</p></div>";
                } else {

                    bodyHtml += `<b>'` + $('#notice_keyword').val() + `'</b> 검색 결과가 없습니다.</p><ul class="list" id="txtMsg_011" style="font-size:16px"><li style="border:none;padding:0 0 0 15px">검색어의 철자가 정확한지 확인해 주세요.</li><li style="border:none;padding:0 0 0 15px">한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 주세요.</li><li style="border:none;padding:0 0 0 15px">검색어의 단어수를 줄이거나, 보다 일반적인 단어로 다시 검색해 주세요.</li><li style="border:none;padding:0 0 0 15px">두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 주세요.</li></ul></div>`;
                }

            } else if (lang == 'en') {
                bodyHtml = '<div class="sch_no_result" id="searchList_error"><i class="icon"></i><p class="md_tit tit_b" id="txtMsg_010">We\'re sorry, your search<br><b>\'';
                bodyHtml += $('#notice_keyword').val();
                bodyHtml += '\'</b> didn\'t return any results.</p><ul class="list" id="txtMsg_011" style="font-size:16px"><li style="border:none;padding:0 0 0 15px">Check the spelling and try your search again.</li></ul></div>';

            } else if (lang == 'pt') {
                bodyHtml = '<div class="sch_no_result" id="searchList_error"><i class="icon"></i><p class="md_tit tit_b" id="txtMsg_010">Desculpe, sua pesquisa<br><b>\'';
                bodyHtml += $('#notice_keyword').val();
                bodyHtml += '\'</b> não retornou nenhum resultado.</p><ul class="list" id="txtMsg_011" style="font-size:16px"><li style="border:none;padding:0 0 0 15px">Verifique a ortografia e tente sua pesquisa novamente.</li></ul></div>';
            } else if (lang == 'zh') {
                bodyHtml = '<div class="sch_no_result" id="searchList_error"><i class="icon"></i><p class="md_tit tit_b" id="txtMsg_010">抱歉，你的搜查<br>而<b>\'';
                bodyHtml += $('#notice_keyword').val();
                bodyHtml += '\'</b> 并没有给出任何结果。</p><ul class="list" id="txtMsg_011" ><li style="border:none;padding:0 0 0 15px">检查拼写并再次进行搜索。</li></ul></div>';

            } else {
                bodyHtml += '<div class="msg_box type1">' +
                    '<span class="im"><img src="https://image.samsungsds.com/resource/kr/images/icon/ico_search.png" alt=""></span>' +
                    '<p class="h2">' + btnLangSet[lang].errMsgTitle + '</p>' +
                    '<p class="txt">' + btnLangSet[lang].errMsgTxt + '</p>' +
                    '</div>';

            }

        } else if (!(data === undefined)) {
            //컨텐츠 내용 뷰

            /* 컨텐츠가 있으면  bodyHtml = 마크업 만들어진거*/
            bodyHtml = filter.content(postlist)
        }

        // console.log("총 데이터 개수", data.length)
        // console.log("filter.content(postlist)", bodyHtml)


        //이벤트 총 개수 필터링
        var select_CountNum = '총 <span>' + data.length + '</span>건';
        $('.selectBox_listNum').html(select_CountNum);
        //$('.webinar_selectBox_listNum').html(select_CountNum);

        // console.log("첫번째 노출 cpage", cpage);
        if (cpage === 0) {
            // console.log("cpage 0이면 html");
            $('#loadContent').html(bodyHtml)
        } else {
            // console.log("cpage 0이 아니면 하나씩 append");
            $('#loadContent').append(bodyHtml);
        }

        if (cpage + 1 === Math.ceil(data.length / addValue) || data.length === 0) {
            $('#loadMoreBtn').hide()
        } else {
            $('#loadMoreBtn').show()
        }

        /* 리스트가 append 된후 텍스트 높이값 스크립트 처리 */
        var $module_ty = $('.module_ty');
        var option = {
            initial: {
                tbyRow: true,
                remove: false
            },
            remove: {
                remove: true
            }
        }

        if (window.innerWidth < 601) {
            $module_ty.each(function () {
                $(this).find('.list_title').matchHeight(option.remove);
                $(this).find('.md_tit02').matchHeight(option.remove);
                $(this).find('.md_txt').matchHeight(option.remove);
                $(this).find('.md_txt02').matchHeight(option.remove);
            });
        } else {
            $module_ty.each(function () {
                $(this).find('.list_title').matchHeight(option.initial);
                $(this).find('.md_tit02').matchHeight(option.initial);
                $(this).find('.md_txt').matchHeight(option.initial);
                $(this).find('.md_txt02').matchHeight(option.initial);
            });
        }

        $('.module_ty').find('.img .img_p, .img .img_m').imgLiquid({
            fill: true,
            horizontalAlign: "center",
            verticalAlign: "center"
        });
    }
    // ********************************************** // content render function **********************************************

    function getFormatDate(date) {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    }

    // 필터 선택한 값 추출 함수
    function getFilterCondition() {
        var param = new Object();
        var startDate = $('ul.fil_tab #startDate').val();
        var endDate = $('ul.fil_tab #endDate').val();
        //var eventSelectFilter = $('.searchSort_select.event_select .select_box');

        if ($postType === 'event' || $postType === 'webinar') {
            param = { eventTypeCode: [], locations: [] }
            /* 주영 : fil_tab = event_filterCheck 로 수정*/
            $('.event_filterCheck input[type=checkbox]:checked').each(function () {
                console.log("checkbox value " + $(this).val());
                if ($(this).val() !== "") {
                    param.eventTypeCode.push($(this).val());
                }
            });

            $('.fil_tb[name=locations] input[type=checkbox]:checked').each(function () {
                param.locations.push($(this).val());
            });

            if (!_.isEmpty(startDate) && !_.isEmpty(endDate)) {
                param['startDate'] = getFormatDate(new Date(startDate.replace('.', ',')));
                param['endDate'] = getFormatDate(new Date(endDate.replace('.', ',')));
            }
        }


        return param;
    }


    // ********************************************** click event function **********************************************
    // 오퍼링 필터 전체 선택
    function offCheckAll(el) {
        if (el.is(":checked")) {
            $('#offering-menu :checkbox').prop('checked', true);
        } else {
            $('#offering-menu :checkbox').prop('checked', false);
        }
    }

    // 콘텐츠 필터 전체 선택
    function conCheckAll(el) {
        if (el.is(":checked")) {
            $('#content-menu :checkbox').prop('checked', true);
        } else {
            $('#content-menu :checkbox').prop('checked', false);
        }
    }

    function eventInit() {
        initYn = true;
        getFilterCondition();
        $("#selectSortDropBtn > span").text($("#all_evt").text());
        currentData = _.sortBy(totalData, 'startDate').reverse();
        contentRender(currentData, 0);
        initShareBtn();

        scrollUp();

    }

    $(window).on('scroll', function (e) {
        setFixScroll()
    });

    function scrollUp() {
        var $hdHeight = $(".M00_A").innerHeight();

        if (!$(".empty_box").length) return;

        var emptyTop = $(".empty_box").length ? $(".empty_box").offset().top : 0;
        // $('html, body').stop().animate({
        //     scrollTop: scrTop - $hdHeight
        // }, 250);
        $('html, body').animate({
            scrollTop: emptyTop - $hdHeight
        }, 250);
        return false;
    }


    // 링크 클릭시 필터 및 스크롤 값 세션 저장 버튼
    $(document).on('click', '#loadContent a', function () {
        if ($(this).attr('target') == '_blank') {
            return;
        }

        var url = "";
        location.hash = "#p";

        if (this.hash == "#vodPopup1") {
            url = $(this).attr('href');
        } else {
            url = $(this).attr('href') + "#p";
        }

        var filter = getFacet();
        filter['loc'] = $(document).scrollTop();
        filter['cpage'] = cpage;

        sessionStorage.setItem('facet', JSON.stringify(filter));
        $(this).attr('href', url);
    });

    // 이벤트 - 필터해제 버튼
    $(document).on('click', '.btn_clear', function () {
        console.log("btn_clear click");
        eventInit()
    });



    // 공통 - 더보기 버튼
    $(document).on('click', '#loadMoreBtn a, .btn_btm #loadMoreBtn', function () {
        var scrollTop = $(window).scrollTop();
        cpage++;
        contentRender(currentData, cpage);

        var offset = $("#movePoint" + (cpage + 1) + '0').offset();
        $('html,body').scrollTop(scrollTop)
        setTimeout(function () {
            //offset = $("#movePoint" + (cpage + 1) + '0').offset();
            //$('html,body').animate({scrollTop:offset.top - 51}, 800);
        }, 0);

        var addData = eventFilter.data(currentData);
        initShareBtn(addData);

    })

    // 리소스 - 오퍼링 필터 선택
    $(document).on('change', '#offering-menu :checkbox', function () {
        var param = getFilterCondition();
        var selectData = resFilter.offeringFilter(totalData, param);

        if ($(this).val() == 'all') {
            offCheckAll($(this));
            param = getFilterCondition();
            selectData = resFilter.offeringFilter(totalData, param);
        }

        if (_.isEmpty(param.offerings)) {
            resFilter.contentTypeMenu(totalData);
        } else {
            resFilter.contentTypeMenu(selectData);
        }
        resFilter.result();
        contentRender(currentData, cpage = 0);

    })

    // 리소스 - 콘텐츠 유형 선택
    $(document).on('change', '#content-menu :checkbox', function () {
        if ($(this).val() == 'all') {
            conCheckAll($(this));
        }
        resFilter.result();
        contentRender(currentData, cpage = 0);
    })

    $(document).on('click', 'input[name=evt_type][id=checkedAll]', function () {
        console.log("checkedAll click");
        $('.btn_clear').click();
    });

    // 이벤트 - 이벤트 타입(체크박스) 버튼
    $(document).on('change', 'input[type=checkbox][name=evt_type][id!=checkedAll]', function () {


        // console.log("check!!! eventFilter.result 값", eventFilter.result().length);
        eventFilter.result();
        contentRender(currentData, cpage = 0);
        initShareBtn();
        scrollUp();


    })

    // 이벤트 - location 선택 버튼 (US)
    $(document).on('change', '.fil_tb[name=locations] :checkbox', function () {
        eventFilter.result();
        contentRender(currentData, cpage = 0);
        scrollUp();
    })

    // 이벤트 - 종료일 버튼
    $(document).on('change', '#endDate', function () {
        eventFilter.result()
        contentRender(currentData, cpage = 0);
        initShareBtn();
        scrollUp();
    });

    // 이벤트 - 전체 이벤트 버튼
    $("#all_evt").on('click', function () {
        // getFilterCondition();
        // initYn = true;
        // currentData = totalData;

        // contentRender(currentData,cpage = 0);
        // $('.selectBox_listNum > span').text(currentData.length);
        $('.btn_clear').click();
    });

    // 이벤트 - 예정된 이벤트 버튼
    $("#upcoming_evt").on('click', function () {
        getFilterCondition();
        initYn = true;
        currentData = _.filter(totalData, function (el) {
            return eventFilter.getEventState(el) == 0;
        });

        contentRender(currentData, cpage = 0);
        $('.selectBox_listNum > span').text(currentData.length);

        scrollUp();

    });


    // 이벤트 - 진행중 이벤트 버튼
    $("#ongoing_evt").on('click', function () {
        getFilterCondition();
        initYn = true;
        currentData = _.filter(totalData, function (el) {
            return eventFilter.getEventState(el) == 1;
        });

        contentRender(currentData, cpage = 0);
        $('.selectBox_listNum > span').text(currentData.length);

        scrollUp();

    });

    // 이벤트 - 종료된 이벤트 버튼
    $("#ended_evt").on('click', function () {
        initYn = true;
        getFilterCondition();

        currentData = _.filter(totalData, function (el) {
            return eventFilter.getEventState(el) == 2;
        });

        contentRender(currentData, cpage = 0);

        // if($postType==="event")
        //     $('.selectBox_listNum > span').text(currentData.length);
        // else if($postType==="webinar")
        //     $('.webinar_selectBox_listNum > span').text(currentData.length);
        $('.selectBox_listNum > span').text(currentData.length);

        scrollUp();

    });

    // 이벤트 - 최신순
    $("#option_eventNew").on('click', function () {
        // initYn = true;
        getFilterCondition();


        // currentData = _.sortBy(totalData,'startDate').reverse();
        currentData = _.sortBy(currentData, 'startDate').reverse();

        contentRender(currentData, cpage = 0);

        // if($postType==="event")
        //     $('.selectBox_listNum > span').text(currentData.length);
        // else if($postType==="webinar")
        //     $('.webinar_selectBox_listNum > span').text(currentData.length);
        $('.selectBox_listNum > span').text(currentData.length);

        initShareBtn();

        scrollUp();

    });

    // 이벤트 - 마감순
    $("#option_eventEnd").on('click', function () {
        // initYn = true;
        getFilterCondition();

        $.each(totalData, function (el) {
            if (el.endDate == "") {
                el.endDate = el.startDate;
            }
        });

        // currentData = _.sortBy(totalData,'endDate').reverse();
        currentData = _.sortBy(currentData, 'endDate').reverse();
        contentRender(currentData, cpage = 0);

        // if($postType==="event")
        //     $('.selectBox_listNum > span').text(currentData.length);
        // else if($postType==="webinar")
        //     $('.webinar_selectBox_listNum > span').text(currentData.length);
        $('.selectBox_listNum > span').text(currentData.length);

        initShareBtn();
        scrollUp();

    });

    function setFixScroll() {
        var $hd = $(".M00_A");
        var $filterBox = $(".filterDate_container");
        //if($postType == "webinar") $filterBox = $(".filterDate_container");
        var headerHeight = $hd.height() - (-1 * parseInt($hd.css("top")));
        var thisTop = parseInt($filterBox.offset().top);

        if ($(window).scrollTop() >= thisTop - headerHeight) {
            if (!$filterBox.hasClass("fixed")) {

                if ($(".empty_box").length == 0) {
                    $filterBox.before('<div class="empty_box"></div>');
                    $(".empty_box").height($filterBox.innerHeight());
                }
                $filterBox.addClass("fixed");
            };
        } else {
            /* console.log("false");
            $(".empty_box").remove();
            _plugin.$searchBox.wrap.removeClass("fixed");
            _plugin.$searchBox.wrap.css('top' , 0); */
        }

        if ($(".empty_box").length > 0 && $(window).scrollTop() <= $(".empty_box").offset().top - ($hd.innerHeight() / 2)) {
            // console.log($(".empty_box").innerHeight());
            $(".empty_box").height($filterBox.innerHeight());
            $(".empty_box").remove();
            $filterBox.removeClass("fixed");


        }

    }

    function open_sharebox(obj, url, artid) {
        if ($(obj).hasClass('on')) {
            $(obj).removeClass('on');
            $('.md_share_area').removeClass('on').removeClass('off');
            $('.btn_normal.add_share').removeClass('on');
        } else {
            var offsetPosition = $(obj).offset();
            var w = ($(window).width() - $('#wrap').width()) * 0.5;
            var x = offsetPosition.left + 30 - w;
            var y = offsetPosition.top - 100;
            $('#md_share_area').addClass('on');
            $('#md_share_area').css('left', x).css('top', y);
            //$('.ico_share_box').attr('tabindex', 0);
            $('.ico_share_box').focus();
            //$('.ico_share_box a').attr('href', url);
            $('.ico_share_box button').attr('data-url', url);
            $('.ico_share_box button').attr('data-artid', artid);
            $('.btn_normal.add_share').removeClass('on');
            $(obj).addClass('on');
            lastActivatedButton = $(obj);

            focusTrapOn($('.md_share_area'));
        }
        return false;
    }

    function initShareBtn(data) {

        if (data) {
            for (var i = 0; i < data.length; i++) {
                $(document).find("button[data-artid='" + data[i].id + "']").on("click", (e) => {
                    e.preventDefault();
                    const target = $(e.currentTarget);
                    const dataurl = target.attr("data-url");
                    const artid = target.attr("data-artid");
                    if (target.hasClass("md_btn_share")) {
                        e.stopPropagation();
                        open_sharebox(target, dataurl, artid);
                    }
                });

            }


        } else {
            $(document).find("button").on("click", (e) => {
                e.preventDefault();
                const target = $(e.currentTarget);
                const dataurl = target.attr("data-url");
                const artid = target.attr("data-artid");
                if (target.hasClass("md_btn_share")) {
                    e.stopPropagation();
                    open_sharebox(target, dataurl, artid);
                }
            })
        }

    }
    var transPage = '/app/search/transnew.jsp'; // search jsp
    var searchCatId = $('#sch_box_id').data('catid'); // 카테고리 아이디
    var searchCategory = $('#sch_box_id').data('category'); // 검색 카테고리
    var searchLang = $('#sch_box_id').data('lang'); // 언어
    var searchPageSize = $('#sch_box_id').data('page-size'); // 페이지 사이즈
    var searchArticleList = []; // 검색 결과 아티클 목록
    var searchOrderby;
    var solId;






    var searchTitSet = {
        kr: {
            popTit: "인기검색어",
            autoTit: "자동완성",
            closeTit: "닫기",
            errTit1: "검색어는 최소 2글자 이상입니다."
        },
        en: {
            popTit: "Popular keyword",
            autoTit: "Suggested Result",
            closeTit: "Close",
            errTit1: "Your search term must be at least two characters long."
        },
        us: {
            popTit: "Popular keyword",
            autoTit: "Suggested Result",
            closeTit: "Close",
            errTit1: "Your search term must be at least two characters long."
        },
        eu: {
            popTit: "Popular keyword",
            autoTit: "Suggested Result",
            closeTit: "Close",
            errTit1: "Your search term must be at least two characters long."
        },
        in: {
            popTit: "Popular keyword",
            autoTit: "Suggested Result",
            closeTit: "Close",
            errTit1: "Your search term must be at least two characters long."
        },
        la: {
            popTit: "Popular keyword",
            autoTit: "Suggested Result",
            closeTit: "Close",
            errTit1: "Your search term must be at least two characters long."
        },
        cn: {
            popTit: "Popular keyword",
            autoTit: "荐的搜索结果",
            closeTit: "关",
            errTit1: ""
        },
        vn: {
            popTit: "Popular keyword",
            autoTit: "Suggested Result",
            closeTit: "Close",
            errTit1: "Your search term must be at least two characters long."
        }
    }


    // 검색창 focus 이벤트
    $(document).on('focus', '#notice_keyword', function (e) {
        e.preventDefault();
        SDS_COMMON.search.open();
        var keyword = $(this).val();
        popularKeyword(keyword, e);

    });

    // 인기검색어, 자동완성 닫기 버튼 클릭
    $(document).on('click', '.btn_close', function () {
        SDS_COMMON.search.close();
        if ($("#resource_tab").length) { //리소스 페이지 포커스
            $("#resource_tab li:first-child > a").attr("tabindex", "0");
            $("#resource_tab li:first-child > a").focus();
        }
        // else if($("#typeId").val()=="insight"){ //인사이트 페이지
        //   $(".toggle_btn").focus();
        // }

        else {
            $(".btn_sch_ip:first").focus();
        }

        /**if($("#typeId").val()=="medialibrary"){ //미디어갤러리 페이지
          $(".tab_list li:first-child > a").attr("tabindex","0");
          $(".tab_list li:first-child > a").focus();
        }
    
        if($("#typeId").val()=="insight"){ //인사이트 페이지
          $("#sch_box_id > .sch_ip >button.toggle_btn").focus();
        }**/


    });

    // 퀵링크 검색어 클릭
    $(document).on('click', '#searchResult > li > a', function () {
        var keyword = $(this).data('keyword');
        $("#notice_keyword").val(keyword)
        searchStart(keyword, searchCallBack);
        SDS_COMMON.search.close();
    });

    // 검색창 키입력 이벤트
    $(document).on('keyup', '#notice_keyword', function (e) {
        e.preventDefault();
        var keyword = $(this).val();
        if (e.key === 'Enter') { // 엔터키 => 검색 시작
            searchStart(keyword, searchCallBack);
            SDS_COMMON.search.close();
        }
        else {

            if (keyword.length > 0) {
                autoComplete(keyword);
            } else {
                popularKeyword(keyword, e);
            }
        }
    });

    // 검색 버튼 클릭 이벤트
    $(document).on('click', '.btn_sch_ip', function () {
        $(".sch_box .sch_ip .btn_del").hide();
        var keyword = $("#notice_keyword").val();
        searchStart(keyword, searchCallBack);
    });

    // 검색 시작
    function searchStart(keyword, callback) {
        location.hash = ''; // hash 초기화
        if (keyword && (keyword.length >= 2 || searchLang === 'cn')) { // 두글자 이상 (cn 제외)
            searchRequest(keyword, callback);
            $('.sort_posts').css('display', 'block');
        } else {
            $('.result').html('<p class="error">' + searchTitSet[searchLang].errTit1 + '</p>')
        }
    }

    //최신순,추천순 box 클릭
    $("#selBoxSchOrderby > li").click(function () {
        searchOrderby = $(this).find("a").attr("id");
        $("#optSort").attr("data-option", searchOrderby);
        $("#selectSortDropBtn > span").text($(this).find("a").text());

        var keyword = $("#notice_keyword").val() || $(".sch_ip input").val() || $("input[name='keyword']").val() || "";
        keyword = keyword.trim();

        if (keyword.length >= 2 || searchLang === 'cn') {
            searchStart(keyword, searchCallBack);
        } else {
            searchRequest("", searchCallBack);
        }
    });

    // 검색 요청 폼
    function getSearchFormData(keyword) {
        if (!searchCatId) {
            searchCatId = $('#sch_box_id').data('catid'); // 카테고리 아이디
        }
        // vn, ap, in, la 리소스일 경우 en 리소스 검색 20250723
        var searchForm = {
            "size": searchPageSize,
            "from": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match_phrase": {
                                "sitetypecode": (searchCatId === 'ap3_1' || searchCatId === 'vn3_1' || searchCatId === 'in3_1' || searchCatId === 'la3_1') ? 'en' : searchLang
                            }
                        },
                        {
                            "query_string": {
                                "query": keyword,
                                "fields": [
                                    "synonyms^10",
                                    "title.standard^3000",
                                    "title.kobrick^3000",
                                    "title.highlight^3000",
                                    "summary^50",
                                    "summary.standard",
                                    "summary.kobrick^2.0",
                                    "contents.standard",
                                    "contents.kobrick^2.0",
                                    "contents.highlight^100",
                                    "eyebrow.standard^100",
                                    "eyebrow",
                                    "attach",
                                    "attach.kobrick^2.0",
                                    "text1"
                                ],
                                "default_operator": "OR"
                            }
                        }

                    ]
                }
            },
            "_source": ["title", "summary", "contents", "eyebrow"],
            "highlight": {
                "number_of_fragments": 1,
                "fragment_size": 300,
                "pre_tags": [
                    "<mark>"
                ],
                "post_tags": [
                    "</mark>"
                ],
                "fields": {
                    "title.kobrick": {
                        "number_of_fragments": 1
                    },
                    "title.standard": {
                        "number_of_fragments": 1
                    },
                    "title.highlight": {
                        "number_of_fragments": 1
                    },
                    "summary.kobrick": {
                        "number_of_fragments": 1
                    }
                    ,
                    "summary.standard": {
                        "number_of_fragments": 1
                    },
                    "summary.highlight": {
                        "number_of_fragments": 1
                    },
                    "contents.kobrick": {
                        "number_of_fragments": 1,
                        "fragment_size": 300
                    },
                    "contents.standard": {
                        "number_of_fragments": 1,
                        "fragment_size": 300
                    },
                    "contents.highlight": {
                        "number_of_fragments": 1,
                        "fragment_size": 300
                    },
                    "summary": {
                        "number_of_fragments": 1,
                        "fragment_size": 300
                    },
                    "attach": {
                        "number_of_fragments": 1,
                        "fragment_size": 300
                    },
                    "text1": {
                        "number_of_fragments": 1,
                        "fragment_size": 100
                    }
                }
            },
            "sort": ["_score", { "regdate": { "order": "desc" } }, { "_id": { "order": "desc" } }]
        };

        if(typeof solId !== "undefined" && solId != undefined){
            searchForm.query.bool.must.push(
                {
                    "query_string": {
                        "query": solId,
                        "fields": [
                            "text3"
                        ],
                        "default_operator": "OR"
                    }
                }
            )

        }
        // 오름 내림차순 추가부분 2023-07-04 
        if (searchOrderby == "option_recent") {
            searchForm.sort = [
                {
                    "regdate": {
                        "order": "desc"
                    }
                },
                {
                    "_id": {
                        "order": "desc"
                    }
                },
                "_score"
            ];

        } else {
            searchForm.sort = [
                "_score",
                {
                    "regdate": {
                        "order": "desc"
                    }
                },
                {
                    "_id": {
                        "order": "desc"
                    }
                }
            ];
        }
        if (searchCatId) { // catid 검색옵션 추가
            // us, eu 리소스일 경우 en 리소스 검색
            // vn, ap, in, la 리소스일 경우 en 리소스 검색 20250723
            searchForm.query.bool.must.push({
                "match": {
                    "catid": (searchCatId === 'vn3_1' || searchCatId === 'ap3_1' || searchCatId === 'in3_1' || searchCatId === 'la3_1') ? 'en3_1' : searchCatId
                }
            });
        }

        if (searchCatId === 'kr3_4') {//동영상인 경우 source에 solid추가
            searchForm._source.push("solid");
        }
        if (searchCategory) { // 카테고리 검색옵션 추가
            searchForm.query.bool.must.push({ "match": { "category": searchCategory } });
        }

        if (searchCatId == 'kr4_1') { //국문 언론보도인 경우 
            searchForm.highlight.fields["contents.kobrick"] = { "number_of_fragments": 1, "fragment_size": 200 };
            searchForm.highlight.fields["contents.standard"] = { "number_of_fragments": 1, "fragment_size": 200 };
            searchForm.highlight.fields["contents.highlight"] = { "number_of_fragments": 1, "fragment_size": 200 };
            searchForm._source = ["title", "summary", "eyebrow"];
            //20260611 언론보도 최신순 추가
            searchForm.sort = [
                {
                    "regdate": {
                        "order": "desc"
                    }
                },
                {
                    "_id": {
                        "order": "desc"
                    }
                },
                "_score"
            ];
        }

        if (searchCatId == 'kr3_2' || searchCatId == 'en3_2' || searchCatId == 'in3_2' || searchCatId == 'eu3_2' || searchCatId == 'kr3_4') { //인사이트리포트, 동영상


            //멀티 아이브로우 검색 (카테고리하단 페이지 인 경우 제외)
            if((typeof solId === "undefined" || !solId) && (selectedEyebrows && selectedEyebrows.length>0)){
                searchForm.query.bool.filter = [{ "terms": { "eyebrow.keyword": selectedEyebrows } }];

            }
        }

        return searchForm;
    }

    // 검색 시작
    function searchRequest(keyword, callback) {
        loading_start(); // 로딩 표시
        var requestBody = getSearchFormData(keyword);

        // 검색 호출
        $.ajax({
            type: 'POST',
            url: transPage,
            dataType: 'json',
            data: 'transMode=search&index=ibricks_search_with_img&keyword=' + keyword + '&lang=' + searchLang + '&queryData=' + encodeURIComponent(encryptQueryData(JSON.stringify(requestBody))),
            error: function (request, status, error) {
                console.log('search error', error);
                loading_stop();
            },
            success: function (searchResult) {
                if (!searchResult.error) {
                    // 검색 결과에서 _id 기준으로 articleId 저장
                    searchArticleList = searchResult.hits.hits.map(function (data) {
                        var id_highlight;

                        if (!_.isNil(data.highlight)) {
                            id_highlight = {
                                "id": data._id.substring(5),
                                "highlight": data.highlight
                            };

                        } else {
                            id_highlight = { "id": data._id.substring(5) };
                        }

                        return id_highlight;

                    })
                    callback(searchArticleList, keyword);
                    // if (searchCatId == 'kr3_2'){ //인사이트리포트               
                    //     $(".searchSort_select").removeClass('vbh');
                    //     $(".searchSort_select").addClass('vbv');
                    // }

                } else {
                    $('.result').html('<p class="error">잘못된 검색어 입니다.</p>')
                    loading_stop();
                }
                $('.error').hide();
            }
        });
    }

    // 자동완성
    function autoComplete(keyword) {
        var keywordLength = keyword.length;
        if (keywordLength > 0) {
            keyword = keyword.replace(/\!|\@|\#|\$|\%|\^|\&|\*|\[|\]|\?|\(|\)|\<|\>|\+|\-|\:|\;|\[|\]|\\/gi, " ").trim(); // replace
            $.ajax({
                type: "POST",
                url: transPage,
                data: {
                    keyword: '' + keyword,
                    SITETYPECODE: searchLang,
                    transMode: 'autocomplete'
                },
                error: function (xhr, status, error) { console.log('auto complete error', error); },
                success: function (result) {
                    if (result.length > 0) {
                        // 자동완성 화면 표시

                        $("#sch_quick").attr("class", "sch_quick on");
                        $("#sch_quick").html(autoCompleteTemplete(result, keywordLength)).removeClass('dpn');;

                        //20230407 접근성
                        $("#sch_quick .btn_close").keydown(function (event) {
                            var v_keyCode = event.keyCode || event.which;
                            if (v_keyCode == 9) {
                                if (!event.shiftKey) { //tab+shift가 아닌 경우 (tab event만 처리)
                                    $("#sch_box_id").removeClass('on');
                                }
                            }
                        });
                    }
                }
            });
        }
    }

    // 인기검색어
    function popularKeyword(keyword, e) {
        // var requestBody = {
        //     "size": 1,
        //     "query": {
        //         "bool": {
        //             "must": [
        //                 {"match": {"type": "popword"}},
        //                 {"match": {"popword.service": searchLang.toUpperCase()}},
        //                 {"match": {"popword.useyn": "y"}}
        //             ]
        //         }
        //     },
        //     "sort": [{"popword.timestamp": {"order": "desc"}}, "_id"]
        // };
        if (!searchLang) {
            searchLang = $('#sch_box_id').data('lang'); // 언어
        }


        $.ajax({
            type: 'POST',
            url: transPage,
            dataType: 'json',
            data: {
                SITETYPECODE: '' + searchLang,
                transMode: 'popkeyword'
            },
            error: function (xhr, status, error) { console.log('popular keyword error', error) },
            success: function (data) {
                if (data.length > 0) {
                    var popwords = data;
                    $("#sch_quick").html(popwordTemplate(popwords)).removeClass("dpn");
                    //20230407 접근성
                    $("#sch_quick .btn_close").keydown(function (event) {
                        var v_keyCode = event.keyCode || event.which;
                        if (v_keyCode == 9) {
                            if (!event.shiftKey) { //tab+shift가 아닌 경우 (tab event만 처리)
                                $("#sch_box_id").removeClass('on');
                            }
                        }
                    });

                }
            }
        });
    }

    function autoCompleteTemplete(data, len) {
        var html = '';
        var autoCompIdx = data.length > 7 ? 7 : data.length; // 7개 까지만 표시

        html += '<p class="tit" id="service_title">' + searchTitSet[searchLang].autoTit + '</p>' +
            '   <ul id="searchResult" class="sr_list">';

        for (var i = 0; i < autoCompIdx; i++) {
            html += '<li id="item_' + i + '">' +
                '   <a href="#" data-keyword="' + data[i] + '">' +
                '       <span class="point">' + data[i].substring(0, len) + '</span>' + data[i].substr(len) +
                '   </a>' +
                '</li>';
        }

        html += '   </ul>' +
            '<button type="button" class="btn_close" id="service_close_title">' + searchTitSet[searchLang].closeTit + '</button>';

        return html;
    }

    function popwordTemplate(data) {
        var html = '';
        var popwordDpCnt = data.length > 7 ? 7 : data.length; // 7개 까지만 표시

        html += '<p class="tit" id="service_title">' + searchTitSet[searchLang].popTit + '</p>' +
            '   <ul id="searchResult" class="sr_list">';

        for (var i = 0; i < popwordDpCnt; i++) {
            // 결과에서 원래 검색어 찾기(공백 두칸 기준)
            var originWord = data[i].query.indexOf('  ') > 0 ? data[i].query.split('  ')[1] : data[i].query.split(' ')[0]
            html += '<li id="item_' + i + '">' +
                '   <a href="#" data-keyword="' + originWord + '">' + originWord + '</a>' +
                '</li>';
        }

        html += '   </ul>' +
            '<button type="button" class="btn_close" id="service_close_title">' + searchTitSet[searchLang].closeTit + '</button>';

        return html;
    }

    // 로딩 표시
    function loading_start() {
        $(".loading_bg").removeClass('dpn');
    }

    // 로딩 표시 종료
    function loading_stop() {
        setTimeout(function () {
            $(".loading_bg").addClass('dpn');
        }, 1000);
    }

    // 검색 결과 순서에 맞게 searchData filter
    function searchDataFilter(searchResult, articleData) {
        var filterData = [];
        if (searchResult) {
            for (var i = 0; i < searchResult.length; i++) {
                var data = _.find(articleData, function (article) { return article.id === searchResult[i].id; });
                if (data) {
                    data.score = i; // 검색 순서 지정을 위해 score 저장
                    if (!_.isNil(searchResult[i].highlight)) {
                        data.highlight = searchResult[i].highlight;
                        filterData.push(data);
                    }


                }
            }
        }
        return filterData;
    }

    function searchResultMessage(keyword, count) {
        if (searchLang === 'kr') {
            $('.result').html('<p class="copy"><span class="length"><em class="num">' + count + '</em>개</span>의 검색결과가 있습니다.</p>')
        } else if (searchLang === 'cn') {
            $('.result').html('<p class="copy">关于<span class="keyword">' + keyword + '</span>, 共有<strong class="length"><em class="num">' + count + '</em></strong>条搜索结果</p>')
        } else {
            $('.result').html('<p class="copy">Showing <strong class="length"><em class="num">' + count + '</em></strong> results for <span class="keyword">' + keyword + '</span></p>')
        }
    }

    function encryptQueryData(queryData) {
        var passPhrase = "81109e268d0a2495485ae5c97abd1e68d995322a00304de200277c6c36b43541999ca6055d7210399f5b2515e88a7438a112c4cea9444997e8439fb969c4483c";
        var encryptData = CryptoJS.AES.encrypt(queryData, passPhrase);
        return encryptData;
    }

    function searchCallBack(articleList, keyword) {
        // console.log('search call back', articleList);
        // 아티클 데이터 가져오기
        $.getJSON(dataUrl, function (articleResult) {
            // 가져온 데이터를 검색결과에 존재하는 articleId로 필터
            var searchData = searchDataFilter(articleList, articleResult.data);
            // 데이터 필터 우선 실행, 이후 currentData 사용
            filterData(searchData);
            // console.log(searchData, currentData);
            // 카테고리 맵 카운트
            var categoryList = _.countBy(_.flatMap(_.filter(searchData, function (article) { return article.category.length > 0; }), function (article) { return article.category; }), 'id');
            // 오퍼링 맵 카운트
            var offeringList = _.countBy(_.flatMap(_.filter(searchData, function (article) { return article.offerings.length > 0; }), function (article) { return article.offerings; }), 'id');
            // console.log(articleList, searchData, categoryList, offeringList);
            // 메뉴 데이터 가져오기
            $.getJSON(menuUrl, function (menuResult) {
                // console.log('menu result', categoryList, offeringList, menuResult);
                // menu re-render
                filterMenu(menuResult.data, offeringType);
                // 메뉴 JSON 재작성
                var updateMenuData = updateMenu(currentMenu, categoryList, offeringList);
                menu.data = updateMenuData; // menu 다시 셋팅
                sideMenuRender(updateMenuData, offeringType);
                // content re-render
                searchContentRender(keyword);

                loading_stop();
            }).error(function () {
                console.log('get menu error');
                loading_stop();
            });
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log('Network Error occurred');
            loading_stop();
        })
    }

    // 메뉴 JSON 각 항목 카운트 업데이트
    function updateMenu(menuData, catCntList, offCntList) {
        menuData = Array.isArray(menuData) ? menuData : [menuData];
        for (var catIdx = 0; catIdx < menuData.length; catIdx++) {
            // 카테고리 항목 카운트 업데이트
            if (catCntList[menuData[catIdx].id]) {
                menuData[catIdx].count = catCntList[menuData[catIdx].id];
            } else {
                menuData[catIdx].count = 0;
            }
            // 오퍼링 항목 카운트 업데이트
            if (menuData[catIdx].depth) {
                var secondDepthMenuData = menuData[catIdx].depth;
                for (var offIdx = 0; offIdx < secondDepthMenuData.length; offIdx++) {
                    if (offCntList[secondDepthMenuData[offIdx].id]) {
                        secondDepthMenuData[offIdx].count = offCntList[secondDepthMenuData[offIdx].id];
                    } else {
                        secondDepthMenuData[offIdx].count = 0;
                    }
                }
            }
        }
        return menuData;
    }

    function searchContentRender(keyword) {
        cpage = 0;
        isQsParmeter(qs)
        isLocationHash();
        contentRender(currentData, cpage);
        searchResultMessage(keyword, currentData.length); // 검색 결과 정보 출력
        if (scroll > 0) {
            $('html,body').animate({ scrollTop: scroll }, 100);
            scroll = 0;
        }
    }

});
