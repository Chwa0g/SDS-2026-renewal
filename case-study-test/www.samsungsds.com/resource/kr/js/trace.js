// http request
;(function() {
	
    if( window.ianswer === undefined ) return;

    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this ||
        {};

    var http = {};

    http.location = '/app/search/transnew.jsp';
    // http.content_type = 'application/json';
    http.content_type = 'application/x-www-form-urlencoded';
    http.timeout = 3000; // 2 seconds

    http._request = function(type, url, data, success, error, always) {
        var request = {};

        // for IE 7
        if( window.XDomainRequest ) {
            XDomainRequest.timeout = this.timeout;
            request = new XDomainRequest();
            request.open(type, url, true);
            request.send(data);
        }
        else {
            var XHR = root.XMLHttpRequest || ActiveXObject;
            XHR.timeout = this.timeout;
            request = new XHR('MSXML2.XMLHTTP.3.0');
            request.open(type, url, true);
            request.setRequestHeader('Content-type', this.content_type);
            request.onreadystatechange = function() {
                if( request.readyState === 4 ) {
                    var data = {};
                    if( request.responseText.length > 0 )
                        data = JSON.parse(request.responseText);

                    if( (request.status >= 200) && (request.status < 300) ) {
                        if( success )
                            success(data);
                    } else {
                        if( error )
                            error(data);
                    }
                    if( always )
                        always(data);
                }
            };
            // 2020-10-13 주석
            // console.log(data);
			data = encodeURIComponent(data);
			//data = data.replace(/\{/g,'$S'); 
			//data = data.replace(/\}/g,'$E'); 
            request.send("log="+data);

			
        }
    };

    http.get = function(url, data, success, error, always) {
        var params = data && ('?' + this.params(data, false)) || '';
        return this._request('GET', url + params, success, error, always);
    };

    http.post = function(url, data, success, error, always) {
        var body = data && this.params(data, true) || '';
        return this._request('POST', url, body, success, error, always);
    };

    http.params = function(obj, is_post) {
        is_post = is_post && is_post || false;

        var params = '';
        if( obj && (typeof obj === 'object') ) {
            if( is_post === true ) {
                params = JSON.stringify(obj, function(k, v) { if (v === null) { return ''; } return v; });
            }
            else {
                Object.keys(obj).map(function(key) {
                    if( params !== '' ) {
                        params += '&';
                    }
                    params += (key + '=' + obj[key]);
                });
            }
        }

        return params;
    };

    window.ianswer.http = http;
})();

// weblog
;(function() {
 /*
    var tracer = function() {
    };
 */

 var tracer = {};

    tracer.execute = function() {
        if( window.ianswer === undefined ) return;
        if( window.ianswer.queue === undefined ) return;
        if( window.ianswer.timestamp === undefined ) return;

  //console.log("uuidv4 test:"+uuidv4());
  var cookievalue = getCookie('ianswer');
  //console.log("cookievalue:"+cookievalue);

  setTimeout(function(){
   if(cookievalue == "" || typeof(cookievalue) == 'undefined'){
    cookievalue = uuidv4();
    //console.log("cookievalue:"+cookievalue);
    setCookie('ianswer',cookievalue,365*2);
   }
   //cookievalue = uuidv4();
   var body = {
    //cookie: '8038975291.1541060845036.1541382260195.1542336142374.1542336142374.5a79269a45f758ba19d47dec312faf14',
    cookie: cookievalue,
    date: getTimezoneDate(),
    site: '',
    user: {},
    title: '',
    url: '',
    referer: '',
    z: 0
   }; 
    

   ianswer.queue.forEach(function(e) {
    if( e.length < 1 ) return;

    switch( e[0] ) {
    case 'create':
     body.url = window.location.href;
     body.referer = document.referrer;
     break;
    case 'set':
     if( e.length >= 2 ) {
      switch( e[1] ) {
      case 'site':
       if( e.length === 3 ) {
        body.site = e[2];
       }
       break;
      case 'user':
       if( e.length === 4 ) {
        body.user[e[2]] = e[3];
       }
       break;
      case 'title':
       if( e.length === 3 ) {
        body.title = e[2];
       }
      break;
       case 'url':
       if( e.length == 3 ) {
        body.url = e[2];
       }
       break;
      case 'referer':
       if( e.length === 3 ) {
        body.referer = e[2];
       }
       break;
      }
     }
     break;
    case 'send':
     body.z = Math.round(2147483647 * Math.random()); // for web cache
     window.ianswer.http.post(window.ianswer.http.location+'?transMode=logsave', body,
      function(data){ }, // success
      function(data){ }, // error
      function(data){ } // always
     );
     break;
    default:
     break;
    }
   });

   // init queue
   ianswer.queue = [];


  },500);
    }; //tracer.execute
    
    window.ianswer.tracer = tracer;
    tracer.execute();
})();


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
 var r = Math.random() * 16 | 0, v=c=='x' ? r : (r & 0x3 | 0x8);
 return v.toString(16);
  });
}

function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString() + ';path=/' );
  document.cookie = cookie_name + '=' + cookie_value;
}


function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

function getTimezoneDate(){
	var timezoneoffset_value = 60000;
	return new Date(Date.now() - new Date().getTimezoneOffset() * timezoneoffset_value).toISOString();
}
                                 
function outbound(url,type,title) {
	//var ob_url = url;
	//var ob_type = type;
	//alert('outbound: '+url+' type: '+type)
	ianswer('create'); //create
	ianswer('set', 'url', url); //아웃바운드 URL
	if (title) {
		ianswer('set', 'title', title); //title
	}
	ianswer('set', 'referer', window.location.href); //현재 URL
	ianswer('set','user','btn_type',type)
	ianswer('send'); //전송
	ianswer.tracer.execute();    
}
