(function($) {

	$.fn.extend({
		jSendMobileCode : function(settings) {
			var wait = 60;
			var interval = null;
			var defaults = {
				'mobile' : 'mobile',
				'button' : 'button',
				'msgid' : null,
				'codeflag' : null,
				'codename' : null,
				'ready' : '重新发送验证码',
				'wait' : '等待 sec 秒再次发送',
				'codeaddr' : '/sendmobilemsg.php',/*执行下行短信地址*/
				'prompt' : function(msg){
							 alert(msg);
							 },
				'runtime' :function(waitstr){button.val(waitstr);},
				'finish' :function(){},
				'before' :function(){return true;},
				'code' : function(){return '';}
			};

			settings = $.extend(defaults, settings);
			var button = $('#' + settings.button);
			/**
			 * 按钮倒计时显示，时间同步session。
			 */
			var cooldown = function() {
				if (wait == 0) {
					clearInterval(interval);
					button.removeAttr('disabled');
					button.val(settings.ready);
					settings.finish();
				} else {
					wait--;
					$.ajax({
						async: false,
						data: {time:wait}, // 这里是传参 给你的handler
						url: "/timeout.php", // 路径
						type: "post",
						success: function (data) {
						}
					});
					settings.runtime(settings.wait.replace('sec', wait));
				}
			};

			//取出上次执行后等待的时间，如与当前时间差低于60秒继续执行。
			$.ajax({async: false,
				data: {id:'getwaittime'}, // 这里是传参 给你的handler
				url: "/timeout.php", // 路径
				type: "post",
				success: function(data){
					if(data>0){
						wait=data;
						button.attr('disabled', 'disabled');
						interval = setInterval(cooldown, 1000);
					}
				}
				});
			

			return this.each(function() {
				button.click(function() {
					if(settings.before()){					
						$.ajax({
							async: false,
							data: {time:60}, // 这里是传参 给你的handler
							url: "/timeout.php", // 路径
							type: "post",
							success: function (data) {
							}
						});
						wait=60;
						interval = setInterval(cooldown, 1000);
						button.attr('disabled', 'disabled');
						
						$.post(settings.codeaddr, {
							'mobile' : $('#' + settings.mobile).val(),
							'id' : settings.msgid,
							'cf' : settings.codeflag,
							'cname' : settings.codename,
							'code' : settings.code()
						}, function(data) {
							/*点击按钮进入倒计时*/					
							if (data.result) {
								/*短信发送成功,按钮禁用*/
	//							button.attr('disabled', 'disabled');	
	//							$.ajax({
	//								async: false,
	//								data: {time:60}, // 这里是传参 给你的handler
	//								url: "/timeout.php", // 路径
	//								type: "post",
	//								success: function (data) {
	//								}
	//							});
	//							wait=60;
	//							interval = setInterval(cooldown, 1000);
							} else {
								/*短信发送失败倒计时结束。*/
								$.ajax({
									async: false,
									data: {time:0}, // 这里是传参 给你的handler
									url: "/timeout.php", // 路径
									type: "post",
									success: function (data) {
									}
								});
								wait=0;
								if(settings.prompt){
									settings.prompt(data.message);
								}
							}
						}, 'json');
					}
				});
			});
		}
	});

})(jQuery);
