var kaice_code = "";//开测通码
(function($) {

	$.fn.extend({

		jCheck : function(settings) {

			var regPassport = /^[\w\.\-@]{1,40}$/;
			var regMobile = /^1(3|4|5|8)\d{9}$/;
			var regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

			var defaults = {
				'tagName' : 'p',
				'className' : 'incompletely',
				'elements' : [],
				'specials' : [ 'passport', 'password', 'repeat', 'mobile', 'mail' ],
				'messages' : {
					'empty_passport' : '请填写账户名',
					'empty_password' : '请输入密码',
					'empty_repeat' : '请重复输入密码',
					'empty_mail' : '请输入邮箱',
					'empty_mobile' : '请输入手机号',
					'passport' : '由6-10位字符（字母、数字、符号）组合而成',
					'password' : '由6-32位字符组合而成',
					'repeat' : '密码重复错误',
					'eq' : '密码不能和账户相同',
					'mobile' : '请输入正确的手机号',
					'mail' : '请输入正确的邮箱'
				}
			};

			settings = $.extend(defaults, settings);

			var showError = function(element, error) {
				element.addClass(settings.className);
				element.next(settings.tagName).html(error).show();
			};

			var hideError = function(element) {
				element.removeClass(settings.className);
				element.next(settings.tagName).hide();
			};

			var check = function(element) {
				if (element.length > 0) {
					if ($.trim(element.val()) == '') {
						showError(element, settings.messages['empty_' + element.attr('id')]);
						return false;
					} else {
						hideError(element);

						switch (element.attr('id')) {
						case 'passport':
							return checkPassport(element);
						case 'password':
							return checkPassword(element, $('#passport'));
						case 'repeat':
							return checkRepeat(element, $('#password'));
						case 'mobile':
							return checkMobile(element);
						case 'mail':
							return checkMail(element);
						}

					}
				}
				return true;
			};

			var checkPassport = function(element) {
				if (element.length > 0) {
					if (!regPassport.test(element.val())) {
						showError(element, settings.messages['passport']);
						return false;
					} else {
						hideError(element);
					}
				}
				return true;
			};

			var checkPassword = function(element, passport) {
				if (element.length > 0) {
					if (element.val().length < 6) {
						showError(element, settings.messages['password']);
						return false;
					} else if (passport.length > 0 && element.val() == passport.val()) {
						showError(element, settings.messages['eq']);
						return false;
					} else {
						hideError(element);
					}
				}
				return true;
			};

			var checkRepeat = function(element, password) {
				if (element.length > 0 && password.length > 0) {
					if (element.val() != password.val()) {
						showError(element, settings.messages['repeat']);
						return false;
					} else {
						hideError(element);
					}
				}
				return true;
			};

			var checkMobile = function(element) {
				if (element.length > 0) {
					if (!regMobile.test(element.val())) {
						showError(element, settings.messages['mobile']);
						return false;
					} else {
						hideError(element);
					}
				}
				return true;
			};

			var checkMail = function(element) {
				if (element.length > 0) {
					if (!regMail.test(element.val())) {
						showError(element, settings.messages['mail']);
						return false;
					} else {
						hideError(element);
					}
				}
				return true;
			};

			return this.each(function() {
				var form = $(this);

				$.each(settings.elements, function(index, element) {
					var obj = $('#' + element, form);

					obj.blur(function() {
						check(obj);
					});

				});

				form.submit(function() {
					var checked = true;
					var postData = {};
					for (index in settings.elements) {
						var obj = $('#' + settings.elements[index]);
						if (obj.is(':visible')) {
							if (!check(obj)) {
								obj.focus();
								checked = false;
								break;
							}
							postData[settings.elements[index]] = obj.val();
						}
					}					
					if (checked) {
						$.post(form.attr('action'), postData, function(data) {														
							if (data.result){
                                $('.inform_box').hide();
                                $('.open_win p').html(data.message);
                                kaice_code = data.message;
                                $('.open_win').show();                                
                            }else{
								$(".img_box").html(data.message);
								$(".error_box").show();
                            }
							
							if (typeof (data.redirect) != 'undefined') {
								window.location.href = data.redirect;
							}
						}, 'json');
					}

					return false;
				});
			});

		}

	});

})(jQuery);