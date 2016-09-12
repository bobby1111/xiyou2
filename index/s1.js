// JavaScript Document


$(function(){
	var oBtn = $('.lianxi ul li.qq1');
	var oContent = $('.active');

	oBtn.hover(function(){
		if(oContent.is(':visible')){
			oContent.slideUp();
			$(".qq").removeClass("qqjg");
		}else{
			oContent.slideDown();
			$(".qq").addClass("qqjg");
		}
        $(".weixin").next().removeClass("active1");
		$(".weixin").removeClass("current");
		
	});
	$(".qq").click(function(){
		$(".qq").addClass("qqjg");
		$(".weixin").removeClass("active1");
		$(".weixin").next().removeClass("active");
		$(".weixin").removeClass("current");
		$(".qq").addClass("qqjg");
		oContent.slideDown();
	});
	/*$(".qq").mouseover(function(){
		$(".qq").addClass("qqjg");
		
		 $(".weixin").next().removeClass("active1");
		$(".weixin").removeClass("current");
		oContent.css("display","block");
	})
	$(".qq").mouseout(function(){
		$(".qq").removeClass("qqjg");
		oContent.css("display","none");
	})*/
	
	$(".weixin").mouseover(function(){
		$(".weixin").next().addClass("active1");
		$(".weixin").addClass("current");
		oContent.slideUp();
	})
	$(".weixin").mouseout(function(){
		$(".weixin").next().removeClass("active");
		$(".weixin").next().addClass("active1");
		$(".weixin").addClass("current");
	});
	
		$("#tounch").mouseover(function(){
		$("#kaice").removeClass("kaice1").addClass("kaice");
		
	})
	
	 $("#kclose").click(function(){
  $("#kaice").removeClass("kaice").addClass("kaice1");
	
  });
  
  
  
 var flag=1;
$('.close').click(function(){
	if(flag==1){
		$(".transparent").animate({left: '-265px'},300);
		$(this).animate({left: '-80px'},300);
		$(".kaiqi").css("display","block");
		$(".kaiqi").animate({left: '10px'},300);
		/* $(".kaiqi").fadeIn();*/
		
	}
});
$('.kaiqi').click(function(){
	if(flag==1){
		$(".transparent").animate({left: '0px'},300);
		$(".close").animate({left: '260px'},300);
		 $(".kaiqi").animate({left: '-383px'},300);
		
	}
});


  /*$(".close").click(function(){
  $(".transparent").fadeOut();
   $(".close").css("display","none");
   $(".kaiqi").css("display","block");
  });
  $(".kaiqi").click(function(){
  $(".transparent").css("display","block");
   $(".close").css("display","block");
    $(".kaiqi").css("display","none");
  });*/
	$("#kaice").click(function(){
    $("#kc").slideDown("slow");
	$(".phone_box").slideDown("slow");
  });
  
   $(".tzclose").click(function(){
    $("#kc").slideUp("slow");
	$(".phone_box").slideUp("slow");
  });
  
   $("#but").click(function(){
    $("#box").slideDown("slow");
	$("#shu").slideDown("slow");
	$(".logo").animate({left:'50%'},300);
  });

   $("#closes").click(function(){
	
    $("#box").slideUp("slow");
	$("#shu").slideUp("slow");
	$(".logo").animate({left:'640px'},300);
	
  });
  $("#box").click(function(){
	 
    $("#box").slideUp("slow");
	$("#shu").slideUp("slow");
	$(".logo").animate({left:'640px'},300);
  });
   $(".szuo").click(function(){
    $("#box").slideUp("slow");
	$("#shu").slideUp("slow");
	
  });
   $(".syou").click(function(){
    $("#box").slideUp("slow");
	$("#shu").slideUp("slow");
	
  });
});
