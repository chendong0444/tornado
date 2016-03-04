function imgshow($this){
	$this.attr('src','/static/img/tujiazai.png');
}
//图集滑动
$(function() {
		$('.yuantu').attr('href',$('.swiper-wrapper li:eq(0) img').attr('src'));
		$('.swiper-wrapper li:eq(0) img').attr('src',$('.swiper-wrapper li:eq(0) img').attr('lazysrc')).removeAttr('lazysrc')

		
		$('.swiper-wrapper li:eq(0) img').removeAttr('data-baiduimageplus-ignore');
		
		var img = new Image();
		img.src = $('.swiper-wrapper li:eq(0) img').attr('src');
		$(img).load(function(){
			$('.swiper-wrapper').css('height',parseInt($('.swiper-wrapper li:eq(0) img').height())+2)
		})
		var mySwiper = $('.swiper-container').swiper({
			mode : 'horizontal',
			loop : false,
			calculateHeight:false,
			onSlideChangeStart:function(w){
				var num = $('#num').val();
				if(w.activeLoopIndex == num){
					var href = $('.dowpage').attr('href');
					window.location=href;//最后一张滑动到下一组
				};
				if($('.swiper-wrapper li:eq('+(w.activeLoopIndex+2)+') img').attr('lazysrc')){
					$('.swiper-wrapper').css('height',$('#bgtu').height()+2);
				}
				$('.swiper-wrapper li img').attr('data-baiduimageplus-ignore');
				$('.swiper-wrapper li:eq('+(w.activeLoopIndex)+') img').removeAttr('data-baiduimageplus-ignore');
			},
			onSlideChangeEnd: function(w){

				
				if($('.swiper-wrapper li:eq('+(w.activeLoopIndex+2)+') img').attr('lazysrc')){
					$('.swiper-wrapper li:eq('+(w.activeLoopIndex+2)+') img').attr('src',$('.swiper-wrapper li:eq('+(w.activeLoopIndex+2)+') img').attr('lazysrc')).removeAttr('lazysrc')
				}
				
				var img = new Image();
				img.src = $('.swiper-wrapper li:eq('+(w.activeLoopIndex)+') img').attr('src');
				$(img).load(function(){
					//alert('这是图片加载后处理的事情');
					$('.swiper-wrapper').css('height',$('.swiper-wrapper li:eq('+(w.activeLoopIndex)+') img').height()+2)
				})
				$('#thenum').text(w.activeLoopIndex+1);
				$('.yuantu').attr('href',$('.swiper-wrapper li:eq('+(w.activeLoopIndex)+') img').attr('src'));
				
				
			}
		});
	})
//分享按键
function showfx(){
		$('.waifxbox').css('display','-webkit-box');
	}
	function closefx(){
		$('.waifxbox').css('display','none');
}	
//分享链接	
function tofxURL(name){
	var shareico = {
			"tsina"		:"http://v.t.sina.com.cn/share/share.php?title={title}&url={url}&appkey=2992571369",
			"tqq"		:"http://v.t.qq.com/share/share.php?title={title}&url={url}&appkey=118cd1d635c44eab9a4840b2fbf8b0fb",
			"renren"	:"http://widget.renren.com/dialog/share?resourceUrl={url}&srcUrl={url}&title={title}",
			"cqq"		:"http://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}",
			
			"qzone"		:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}"
		};
	var shareiconame = {
			"tsina"		:"新浪微博",
			"tqq"		:"腾讯微博",
			"renren"	:"人人网",
			"cqq"		:"QQ好友",
			
			"qzone"		:"QQ空间"
		};
	var $title = encodeURI($('#fxtitle').text());
	var $url = encodeURI($('#fxurl').text());
	$href = shareico[name].replace("{title}",$title).replace("{url}",$url);  
	window.location.href=$href;
	
}	
//digg
function Digg(divId,id){
   var taget_obj = document.getElementById(divId+''+id);
   var myajax = new DedeAjax(taget_obj,false,false,"","","");
   myajax.SendGet2("/ikaimi/digg.php?action=digg&id="+id);
   DedeXHTTP = null;
}