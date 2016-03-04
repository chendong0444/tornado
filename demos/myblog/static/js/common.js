$(function(){	
	//返回顶部
	$(window).scroll(function() {		
		if($(window).scrollTop() >= 50){
			$('#back-to-top').fadeIn(300); 
		}else{    
			$('#back-to-top').fadeOut(300);    
		}  
	});
	$('.stop').click(function(){
	$('html,body').animate({scrollTop: '0px'}, 300);});	
	//左侧导航
    var clientH = document.body.clientHeight-2048;
    var liW = document.body.clientWidth-70;
    var dot= $('#dot');
    var bar = $('#menu-bar');

    dot.on('click', function(){
      $('.full').css({'display':'block'}).show();
      bar.animate({'left':'0%'})
    });

    $('.navbtn').bind('click',function(){
      $('.full').css({'display':'block'}).show();
      $('.side').css({'display':'block'}).show();
      $('.side').animate({'right':"70%"},function(){
        $('body').bind('touchmove',stopScroll);
      });
    });
    $('.full').bind('click',hideUser);
    function hideUser(){
      $('.side').animate({'right':"100%"},function(){
        $('body').unbind('touchmove',stopScroll);
        $('.full').hide();
      });
      bar.animate({'left':'-100%'},function(){
        $('body').unbind('touchmove',stopScroll);
        $('.full').hide();
      }); 
    }
    function stopScroll(e){
      e.preventDefault();
    }
	//字体自适应
		function e() {
			var e = document.documentElement.clientWidth;	
			var font_size = e * .04 + "px";
			var font_size_small = e * .03 + "px";
			var font_size_big = e * .05 + "px";
			$('.autosize').css('font-size',font_size);
			$('.autosize2').css('font-size',font_size_small);
			$('.autosize3').css('font-size',font_size_big);
		}
		e();
		$(window).on("orientationchange, resize",
		function() {
			e();
		})
  })