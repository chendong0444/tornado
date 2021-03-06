//xmlhttp和xmldom对象
var DedeXHTTP = null;
var DedeXDOM = null;
var DedeContainer = null;
var DedeShowError = false;
var DedeShowWait = false;
var DedeErrCon = "";
var DedeErrDisplay = "下载数据失败";
var DedeWaitDisplay = "正在下载数据...";

//获取指定ID的元素
//function $(eid){
//	return document.getElementById(eid);
//}

function $DE(id) {
	return document.getElementById(id);
}

//gcontainer 是保存下载完成的内容的容器
//mShowError 是否提示错误信息
//DedeShowWait 是否提示等待信息
//mErrCon 服务器返回什么字符串视为错误
//mErrDisplay 发生错误时显示的信息
//mWaitDisplay 等待时提示信息
//默认调用 DedeAjax('divid',false,false,'','','')

function DedeAjax(gcontainer,mShowError,mShowWait,mErrCon,mErrDisplay,mWaitDisplay){

DedeContainer = gcontainer;
DedeShowError = mShowError;
DedeShowWait = mShowWait;
if(mErrCon!="") DedeErrCon = mErrCon;
if(mErrDisplay!="") DedeErrDisplay = mErrDisplay;
if(mErrDisplay=="x") DedeErrDisplay = "";
if(mWaitDisplay!="") DedeWaitDisplay = mWaitDisplay;


//post或get发送数据的键值对
this.keys = Array();
this.values = Array();
this.keyCount = -1;

//http请求头
this.rkeys = Array();
this.rvalues = Array();
this.rkeyCount = -1;

//请求头类型
this.rtype = 'text';

//初始化xmlhttp
if(window.ActiveXObject){//IE6、IE5
   try { DedeXHTTP = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { }
   if (DedeXHTTP == null) try { DedeXHTTP = new ActiveXObject("Microsoft.XMLHTTP");} catch (e) { }
}
else{
	 DedeXHTTP = new XMLHttpRequest();
}

//增加一个POST或GET键值对
this.AddKey = function(skey,svalue){
	this.keyCount++;
	this.keys[this.keyCount] = skey;
	svalue = svalue.replace(/\+/g,'$#$');
	this.values[this.keyCount] = escape(svalue);
};

//增加一个Http请求头键值对
this.AddHead = function(skey,svalue){
	this.rkeyCount++;
	this.rkeys[this.rkeyCount] = skey;
	this.rvalues[this.rkeyCount] = svalue;
};

//清除当前对象的哈希表参数
this.ClearSet = function(){
	this.keyCount = -1;
	this.keys = Array();
	this.values = Array();
	this.rkeyCount = -1;
	this.rkeys = Array();
	this.rvalues = Array();
};


DedeXHTTP.onreadystatechange = function(){
	//在IE6中不管阻断或异步模式都会执行这个事件的
	if(DedeXHTTP.readyState == 4){
    if(DedeXHTTP.status == 200){
       if(DedeXHTTP.responseText!=DedeErrCon){
         DedeContainer.innerHTML = DedeXHTTP.responseText;
       }else{
       	 if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay;
       }
       DedeXHTTP = null;
    }else{ if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay; }
  }else{ if(DedeShowWait) DedeContainer.innerHTML = DedeWaitDisplay; }
};

//检测阻断模式的状态
this.BarrageStat = function(){
	if(DedeXHTTP==null) return;
	if(typeof(DedeXHTTP.status)!=undefined && DedeXHTTP.status == 200)
  {
     if(DedeXHTTP.responseText!=DedeErrCon){
         DedeContainer.innerHTML = DedeXHTTP.responseText;
     }else{
       	if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay;
     }
  }
};

//发送http请求头
this.SendHead = function(){
	if(this.rkeyCount!=-1){ //发送用户自行设定的请求头
  	for(;i<=this.rkeyCount;i++){
  		DedeXHTTP.setRequestHeader(this.rkeys[i],this.rvalues[i]); 
  	}
  }
　if(this.rtype=='binary'){
  	DedeXHTTP.setRequestHeader("Content-Type","multipart/form-data");
  }else{
  	DedeXHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  }
};

//用Post方式发送数据
this.SendPost = function(purl){
	var pdata = "";
	var i=0;
	this.state = 0;
	DedeXHTTP.open("POST", purl, true); 
	this.SendHead();
  if(this.keyCount!=-1){ //post数据
  	for(;i<=this.keyCount;i++){
  		if(pdata=="") pdata = this.keys[i]+'='+this.values[i];
  		else pdata += "&"+this.keys[i]+'='+this.values[i];
  	}
  }
  DedeXHTTP.send(pdata);
};

//用GET方式发送数据
this.SendGet = function(purl){
	var gkey = "";
	var i=0;
	this.state = 0;
	if(this.keyCount!=-1){ //get参数
  	for(;i<=this.keyCount;i++){
  		if(gkey=="") gkey = this.keys[i]+'='+this.values[i];
  		else gkey += "&"+this.keys[i]+'='+this.values[i];
  	}
  	if(purl.indexOf('?')==-1) purl = purl + '?' + gkey;
  	else  purl = purl + '&' + gkey;
  }
	DedeXHTTP.open("GET", purl, true); 
	this.SendHead();
  DedeXHTTP.send(null);
};

//用GET方式发送数据，阻塞模式
this.SendGet2 = function(purl){
	var gkey = "";
	var i=0;
	this.state = 0;
	if(this.keyCount!=-1){ //get参数
  	for(;i<=this.keyCount;i++){
  		if(gkey=="") gkey = this.keys[i]+'='+this.values[i];
  		else gkey += "&"+this.keys[i]+'='+this.values[i];
  	}
  	if(purl.indexOf('?')==-1) purl = purl + '?' + gkey;
  	else  purl = purl + '&' + gkey;
  }
	DedeXHTTP.open("GET", purl, false); 
	this.SendHead();
  DedeXHTTP.send(null);
  //firefox中直接检测XHTTP状态
  this.BarrageStat();
};

//用Post方式发送数据
this.SendPost2 = function(purl){
	var pdata = "";
	var i=0;
	this.state = 0;
	DedeXHTTP.open("POST", purl, false); 
	this.SendHead();
  if(this.keyCount!=-1){ //post数据
  	for(;i<=this.keyCount;i++){
  		if(pdata=="") pdata = this.keys[i]+'='+this.values[i];
  		else pdata += "&"+this.keys[i]+'='+this.values[i];
  	}
  }
  DedeXHTTP.send(pdata);
  //firefox中直接检测XHTTP状态
  this.BarrageStat();
};


} // End Class DedeAjax

//初始化xmldom
function InitXDom(){
  if(DedeXDOM!=null) return;
  var obj = null;
  if (typeof(DOMParser) != "undefined") { // Gecko、Mozilla、Firefox
    var parser = new DOMParser();
    obj = parser.parseFromString(xmlText, "text/xml");
  } else { // IE
    try { obj = new ActiveXObject("MSXML2.DOMDocument");} catch (e) { }
    if (obj == null) try { obj = new ActiveXObject("Microsoft.XMLDOM"); } catch (e) { }
  }
  DedeXDOM = obj;
};

;(function($) {
        $.extend({
            tipsBox: function(options) {
                options = $.extend({
                    obj: null,  
                    str: "♥", 
                    startSize: "12px",
                    endSize: "100px",   
                    interval: 600,  
                    color: "red",    
                    callback: function() {}
                }, options);
                $("body").append("<span class='jia1'>"+ options.str +"</span>");
                var box = $(".jia1");
                var left = options.obj.offset().left + options.obj.width() / 2;
                var top = options.obj.offset().top - options.obj.height();
                box.css({
                    "position": "absolute",
                    "left": left + "px",
                    "top": top + "px",
                    "z-index": 9999,
                    "font-size": options.startSize,
                    "line-height": options.endSize,
                    "color": options.color
                });
                box.animate({
                    "font-size": options.endSize,
                    "opacity": "0",
                    "top": top - parseInt(options.endSize) + "px"
                }, options.interval , function() {
                    box.remove();
                    options.callback();
                });
            }
        });
    })(jQuery);
	$(function() {
		$(".good").click(function() {
			$.tipsBox({
				obj: $(this),
				str: "♥",
                callback: function() {
                }
			});
		});
	});

	
;(function($) {
        $.extend({
            tipsBox: function(options) {
                options = $.extend({
                    obj: null,  
                    str: "+1", 
                    startSize: "12px",
                    endSize: "30px",   
                    interval: 600,  
                    color: "red",    
                    callback: function() {}
                }, options);
                $("body").append("<span class='jia1'>"+ options.str +"</span>");
                var box = $(".jia1");
                var left = options.obj.offset().left + options.obj.width() / 2;
                var top = options.obj.offset().top - options.obj.height();
                box.css({
                    "position": "absolute",
                    "left": left + "px",
                    "top": top + "px",
                    "z-index": 9999,
                    "font-size": options.startSize,
                    "line-height": options.endSize,
                    "color": options.color
                });
                box.animate({
                    "font-size": options.endSize,
                    "opacity": "0",
                    "top": top - parseInt(options.endSize) + "px"
                }, options.interval , function() {
                    box.remove();
                    options.callback();
                });
            }
        });
    })(jQuery);
	$(function() {
		$(".add").click(function() {
			$.tipsBox({
				obj: $(this),
				str: "+1",
                callback: function() {
                }
			});
		});
	});
	