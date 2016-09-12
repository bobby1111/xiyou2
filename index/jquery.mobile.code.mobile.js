(function($) {

	$.fn.extend({

		jSendMobileCode : function(settings) {

			var defaults = {
				'mobile' : 'mobile',
				'button' : 'button',
				'code' : 'code',
                'vcode' : 'vcode',
				'ready' : '重新发送验证码',
				'wait' : '等待 sec 秒再次发送'
			};

			settings = $.extend(defaults, settings);

			return this.each(function() {
				var form = $(this);
				var button = $('#' + settings.button);

				button.click(function() {
					var interval = null;
					var wait = 60;
					var obj = $(this);
					var cooldown = function() {
						if (wait == 0) {
							clearInterval(interval);
							obj.removeAttr('disabled');
							obj.val(settings.ready);
						} else {
							wait--;
							obj.val(settings.wait.replace('sec', wait));
						}
					};

					$.post(form.attr('action'), {
						'mobile' : $('#' + settings.mobile).val()
					}, function(data) {
						if (data.result) {
							obj.attr('disabled', 'disabled');
							interval = setInterval(cooldown, 1000);
						} else {
							$(".img_box").html(data.message);
							$(".error_box").show();
						}
					}, 'json');
				});
			});

		}

	});

})(jQuery);
$(function(){
    var oldValue = '';

    $("#mobile").focus(function(){

        oldValue = $(this).val();

        if(oldValue == this.defaultValue)  $(this).val("");

    }).blur(function(){
        oldValue = $(this).val();

        if(oldValue == "") $(this).val(this.defaultValue);

    });
     $("#code").focus(function(){

        oldValue = $(this).val();

        if(oldValue == this.defaultValue)  $(this).val("");

    }).blur(function(){
        oldValue = $(this).val();

        if(oldValue == "") $(this).val(this.defaultValue);

    });

    $("#vcode").focus(function(){

        oldValue = $(this).val();

        if(oldValue == this.defaultValue)  $(this).val("");

    }).blur(function(){
        oldValue = $(this).val();

        if(oldValue == "") $(this).val(this.defaultValue);

    });

})