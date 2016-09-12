$.fn.extend({

  regchecker: function (options) {

    var isSmsCodeValid = false;
    var isVCodeValid = false;
    var currentStep = 1;
    var accountType = 0;//0 unknown, 1 mobile, 2 mail
//		var regMobileOrPassport = /^(1\d{10}|(?!^\d+$)[\w\d\-_\.]{6,20})$/;
    var regMobileOrPassport = /^(1\d{10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6})$/i;
    var regPassport = /(?!^\d+$)^[\w\d\-_\.]{6,20}$/;
    var regMobile = /^1\d{10}$/;
    var regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var regRealname = /^[\u4e00-\u9fa5]{1,10}$/;

    var messages = {
      passportempty: '请输入手机号/QQ邮箱',
      passportincorrect: '请输入正确的手机号或邮箱',
      passport: '由6-20位字符（字母、数字、符号）组合而成',
      unique: '该账户已被注册',
      passwordempty: '通行证密码',
      password: '由6-32位字符组合而成',
      passsame: '密码不能和账户相同',
      repeat: '两次密码输入不一致',
      repeatempty: '确定密码',
      realname: '请输入正确姓名',
      realnameempty: '请输入真实姓名',
      idcard: '请输入正确身份证号',
      idcardempty: '请输入身份证号',
      agree: '必须同意条款',
      idcardunique: '这个身份证已经被使用',
      smscode: '短信验证码错误',
      smscodeempty: '请输入验证码',
      vcode: '验证码错误',
      vcodeempty: '请输入验证码'
    };

    var defaults = {
      passport: '#passport',
      password: '#password',
      repeat: '#repeat',
      vcode: '#vcode',
      smscode: '#smscode',
      realname: '#realname',
      idcard: '#idcard',
      agree: '#agree',
      regbtn: '#btn1',
      state: function (state, inputField, tip) { //输入域,状态(0默认,1正确,2错误),提示
        var id = inputField.attr('id');
        if (id == 'vcode_forsms')
          id = 'vcode';
        inputField.removeClass();

        switch (state) {
          case 0://default
            if (id == 'vcode' || id == 'smscode') {
              inputField.addClass('txz2 ');//20125f
              inputField.nextAll('span.yanzheng').text(tip);
              inputField.nextAll('span.yanzheng').show();

            } else if (id == 'password' || id == 'repeat') {
              inputField.addClass('txz ');
              inputField.nextAll('span.xingming').text(tip);
              inputField.nextAll('span.xingming').show();

            } else if (id == 'idcard') {
              inputField.addClass('sfz ');
              inputField.nextAll('span.zqsfz').removeClass("yanse");
              inputField.nextAll('span.zqsfz').text(tip);
              inputField.nextAll('span.zqsfz').show();

            } else {
              inputField.addClass('shj ');
              inputField.nextAll('span.xingming').text(tip);
              inputField.nextAll('span.xingming').show();

            }
            break;
          case 1://correct
            //inputField.attr('tempval','');
            //inputField.css({'color': '#8c8fc6'});
            if (id == 'vcode' || id == 'smscode') {
              inputField.addClass('txz2');
            } else if (id == 'password' || id == 'repeat') {
              inputField.addClass('txz1 beijing');
            } else if (id == 'idcard') {
              inputField.addClass('dsfz beijing');
            } else
              inputField.addClass('dui beijing');
            break;
          case 2://error
            //inputField.attr('tempval',inputField.val());
            //inputField.val('');
            //inputField.css({'color':'transparent'});
            inputField.addClass('touming');

            if (id == 'vcode' || id == 'smscode') {
              inputField.addClass('txz2 kuang');
              inputField.nextAll('span.yanzheng').text(tip);
              inputField.nextAll('span.yanzheng').show();
              inputField.nextAll('span.yanzheng').addClass('yanse');
            } else if (id == 'password' || id == 'repeat') {
              inputField.addClass('cuo beijing');
              inputField.nextAll('span.xingming').text(tip);
              inputField.nextAll('span.xingming').show();
              inputField.nextAll('span.xingming').addClass('yanse');
            } else if (id == 'idcard') {
              inputField.addClass('csfz beijing');
              inputField.nextAll('span.zqsfz').text(tip);
              inputField.nextAll('span.zqsfz').show();
              inputField.nextAll('span.zqsfz').addClass('yanse');
            } else {
              inputField.addClass('yi yanse beijing');
              inputField.nextAll('span.xingming').text(tip);
              inputField.nextAll('span.xingming').show();
              inputField.nextAll('span.xingming').addClass('yanse');
            }
            break;
        }
      }
    };

    //错误值临时保存在attr('tempval'),此时val('')，之后执行校验会按空值计算。用color: transparent;启用隐藏input text
//		$.fn.extend({
//			val:function(){
//				if($(this).val()==''){
//					if($(this).attr('tempval'))
//						return $(this).attr('tempval');				
//				}
//				return $(this).val();
//		}});

    options = $.extend(defaults, options);

    $("input[type]").filter("[type='text'],[type='password']").focus(function () {
      var inputName = $(this).attr('name');
      options.state(0, $(this), '');

      //if($(this).attr('tempval'))
      //$(this).val($(this).attr('tempval'));
      //$(this).css({'color': '#8c8fc6'});
      $(this).addClass("beijing");

      if (inputName == 'vcode' || inputName == 'smscode') {
        //$(this).nextAll('span.yanzheng').first().html('');
        $(this).nextAll('span.yanzheng').first().hide();
      } else if (inputName == 'idcard') {
        $(this).nextAll('span.zqsfz').first().hide();
      } else {

        $(this).nextAll('span.xingming').first().hide();
      }
    });

    var showSmsCode = function () {//显示“短信验证码输入框”和“获取验证码按钮”
      $('#vcode_div').show();
    };

    var hideSmsCode = function () {
      $('#vcode_div').hide();
      $('#smscode_div').hide();
    };

    var showNextStep = function () {//显示“身份证”，“真实姓名”，“图片验证码输入框”
      currentStep = 2;
      $("#reg_step_1").hide();
      $("#reg_step_2").show();
      $('#code').attr('src', '/vcode.php?' + Math.random());
      //$('#realname').focus();
      $(options.regbtn).attr("tabIndex", 206);
    };

    var showFirstStep = function () {
      currentStep = 1;
      $("#reg_step_2").hide();
      $("#reg_step_1").show();
      $(options.regbtn).attr("tabIndex", 106);
    };

    var showRegSuccess = function (giftcode) {
      $("#reg_step_1").hide();
      $("#reg_step_2").hide();

      if (accountType == 1) {
        //$(".shouji").show();
        $("input[name='giftcode']").val(giftcode);
        $("input[name='copy']").attr('data-clipboard-text', giftcode);
        window.parent.postMessage(
            JSON.stringify({id: 'shouji', giftcode: giftcode, passport: $("#passport").val()}), '*');
        $("#reg_suc").show();
      } else if (accountType == 2) {
        //$(".youxiang").show();
        window.parent.postMessage(
            JSON.stringify({id: 'youxiang', passport: $("#passport").val()}), '*');
        $("#mail_reg_suc").show();
      }
    };

    var checkPassport = function (passport) {
      accountType = 0;
      if (passport.val() == "") {

        options.state(2, passport, messages.passportempty);
        return false;
      } else if (!regMobileOrPassport.test(passport.val())) {

        options.state(2, passport, messages.passportincorrect);
        return false;
      } else {
        if (regMobile.test(passport.val())) {
          accountType = 1;

        } else {
          accountType = 2;
        }
//				options.state(1,passport);
        return true;
      }
    };

    var checkPassword = function (password, passport) {
      if (password.val() == '') {
        options.state(2, password, messages.passwordempty);
      } else if (password.val().length < 6 || password.val().length > 32) {
        options.state(2, password, messages.password);
        return false;
      } else if (password.val() == passport.val()) {
        options.state(2, password, messages.passsame);
        return false;
      } else {
        options.state(1, password);
        return true;
      }
    };

    var checkRepeat = function (repeat, password) {
      if (repeat.val() == '') {
        options.state(2, repeat, messages.repeatempty);
        return false;
      } else if (repeat.val() != password.val()) {
        options.state(2, repeat, messages.repeat);
        return false;
      } else {
        options.state(1, repeat);
        return true;
      }
    };

    var checkVCode = function (vcode) {
      if ($.trim(vcode.val()) == '') {
        options.state(2, vcode, messages.vcodeempty);
        return false;
      } else {
        return true;
      }
    };


    var checkAgree = function (agree) {
      if (agree.length > 0) {
        if (!agree.get(0).checked) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };

    var checkRealname = function (realname) {
      /*if (!regRealname.test(realname.val())) {
       2014/12/5 去除真实姓名格式检验
       */
      if (realname.val().length < 1) {
        options.state(2, realname, messages.realname);
        return false;
      } else {
        options.state(1, realname);
        return true;
      }
    };

    var checkIdcard = function (idcard) {

      if (!checkBirthday(idcard.val())) {
        options.state(2, idcard, '年龄未满十八岁');
        return false;
      }

      if (idcard.val().length == 18) {
        var sigma = 0;
        var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var w = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        for (var i = 0; i < 17; i++) {
          var ai = parseInt(idcard.val().substring(i, i + 1));
          var wi = a[i];
          sigma += ai * wi;
        }
        if (idcard.val().substring(17) != w[sigma % 11]) {
          options.state(2, idcard, messages.idcard);
          return false;
        } else {
          options.state(1, idcard);
          return true;
        }
      } else if (/^\d{15}$/.test(idcard.val())) {
        options.state(1, idcard);
        return true;
      } else {
        options.state(2, idcard, messages.idcard);
        return false;
      }
    };

    var checkBirthday = function (idcard) {
      var birthdayno, birthdaytemp;

      if (idcard.length == 18) {
        birthdayno = idcard.substring(6, 14);
      } else if (idcard.length == 15) {
        birthdaytemp = idcard.substring(6, 12);
        birthdayno = "19" + birthdaytemp;
      } else {
        return false;
      }

      var birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8);
      var birthdayObj = new Date(Date.parse(birthday));
      var datenowObj = new Date();
      birthdayObj.setYear(birthdayObj.getFullYear() + 18);
      //console.log(birthdayObj.toString()+"  "+datenowObj.toString());
      if (birthdayObj > datenowObj) {
        return false;
      } else {
        return true;
      }
    };

    return this.each(function () {
      var form = $(this);
      var passport = $(options.passport, form);
      var password = $(options.password, form);
      var repeat = $(options.repeat, form);
      var realname = $(options.realname, form);
      var idcard = $(options.idcard, form);
      var vcode = $(options.vcode, form);
      var mail = $(options.mail, form);
      var mobile = $(options.mobile, form);
      var question = $(options.question, form);
      var answer = $(options.answer, form);
      var agree = $(options.agree, form);
      var smscode = $(options.smscode, form);
      var vcode_forsms = $("#vcode_forsms");
      var button = $('#button');//获取手机验证码按钮
      var regbtn = $(options.regbtn);

      passport.blur(function () {
        //alert(passport.val());
        if (mousedownHappened) {
          mousedownHappened = false;
        } else if (passport.val() != '') {
          $(".shurutishi").hide();
          if (checkPassport(passport)) {
            options.state(1, passport);
            if (accountType == 1) { //mobile
              showSmsCode();
            } else {
              hideSmsCode();
            }
            // $.get('/checkuser.php?passport=' + passport.val(), function (data) {
            //   if (!data.result) {
            //     options.state(2, passport, messages.unique);
            //     if (accountType == 1) //mobile
            //       hideSmsCode();
            //   } else {
            //     options.state(1, passport);
            //     if (accountType == 1) { //mobile
            //       showSmsCode();
            //     } else {
            //       hideSmsCode();
            //     }
            //   }
            // }, 'json');
          } else {
            if (accountType == 1) {//mobile
              hideSmsCode()
            }
          }
        } else {
          options.state(0, passport, messages.passportempty);
        }
      });

      agree.change(function () {
        if (this.checked) {
          //Do stuff
          $('.agreement_but').removeClass('gray_register_but');
        } else {
          $('.agreement_but').addClass('gray_register_but');
        }
      });

      smscode.blur(function () {

//					if(checkMobile(mobile)){
        if (smscode.val() != '') {
          $.post('/checksmscode.php', {
                "mobile": mobile.val(),
                "code": smscode.val(),
                "cname": "mobile_regist_code"
              },
              function (data) {
                if (!data.result) {
                  //alert(data.message);
                  options.state(2, smscode, messages.smscode);
                  isSmsCodeValid = false;
                } else {
                  options.state(1, smscode);
                  isSmsCodeValid = true;
                }
              }, 'json');
        } else {
          isSmsCodeValid = false;
          options.state(0, smscode, messages.smscodeempty);
        }
      });

      password.blur(function () {
        if (password.val() != '')
          checkPassword(password, passport);
        else
          options.state(0, password, messages.passwordempty);
      });

      repeat.blur(function () {
        if (repeat.val() != '')
          checkRepeat(repeat, password);
        else
          options.state(0, repeat, messages.repeatempty);
      });

      vcode.blur(function () {
        if (checkVCode(vcode)) {
          $.get('/checkcode.php?code=' + vcode.val(), function (data) {
            if (!data.result) {
              options.state(2, vcode, messages.vcode);
              isVCodeValid = false;
            } else {
              options.state(1, vcode);
              isVCodeValid = true;
            }
          }, 'json');
        }
      });

      realname.blur(function () {
        if (realname.val() != '') {
          realname.val($.trim(realname.val()));
          checkRealname(realname);
        }
        else
          options.state(0, realname, messages.realnameempty);
      });

      idcard.blur(function () {
        if (idcard.val() != '') {
          idcard.val($.trim(idcard.val()));
          checkIdcard(idcard);
        }
        else
          options.state(0, idcard, messages.idcardempty);
        /*if (checkIdcard(idcard)) {
         $.get('checkuser.php?idcard=' + idcard.val(), function(data) {
         if (!data.result) {
         options.state(2,idcard);
         idcard.nextAll('strong').html(messages.idcardunique).show();
         }
         }, 'json');
         }*/
      });

      vcode_forsms.blur(function () {
        if (checkVCode(vcode_forsms)) {
          $.get('/checkcode.php?code=' + vcode_forsms.val(), function (data) {
            if (!data.result) {
              options.state(2, vcode_forsms, messages.vcode);
              isVCodeValid = false;
            } else {
              options.state(1, vcode);
              isVCodeValid = true;
            }
          }, 'json');
        }
      });

      agree.change(function () {
        if (this.checked) {
          //Do stuff
          $('.agreement_but').removeClass('gray_register_but');
        } else {
          $('.agreement_but').addClass('gray_register_but');
        }

      });

      $(".back").click(function () {
        showFirstStep();
      });

      regbtn.click(function () {
        if (accountType == 1) {//mobile
          if (checkPassport(passport) && checkPassword(password, passport) && checkRepeat(repeat, password)) {
            if (isSmsCodeValid) {
              if (currentStep == 1) {
                $("#vcode").parent("div").hide();
                $("#nextcode").hide();
                showNextStep();
              } else {
                if (checkPassport(passport) && checkPassword(password, passport) && checkRepeat(repeat, password) && checkIdcard(idcard)
                    && checkRealname(realname)) {	//&& isVCodeValid
                  $.post("/register.php", {
                    submit: '',
                    quick_reg: '1',
                    accountType: 'phone',
                    passport: passport.val(),
                    password: password.val(),
                    repeat: repeat.val(),
                    vcode: vcode.val(),
                    code: smscode.val(),
                    mobile: passport.val(),
                    realname: realname.val(),
                    idcard: idcard.val()
                  }, function (data) {
                    if (data.result) {
//											window.location.href = data.redirect;phone_span
                      $('.phone_span').text(passport.val());
                      regbtn.hide();
                      showRegSuccess(data.giftcode);
                    } else {
                      vcode.nextAll('img').trigger('click');
                      showError(data.message);
                      //$(".chucuo p.p1").text(data.message);
                      //$(".chucuo").show();
                      //alert(data.message);
                    }
                  }, 'json');
                }
              }
            }
            else {
              if (isVCodeValid) {
                $('#vcode_div').hide();
                $('#smscode_div').show();
              }
              //options.state(2,smscode,messages.code);
            }
          }
        }
        else if (accountType == 2) {
          if (checkPassport(passport) && checkPassword(password, passport) && checkRepeat(repeat, password)) {
            if (currentStep == 1) {
              $("#vcode").parent("div").show();
              $("#nextcode").show();
              showNextStep();
            }
            else {
              if (checkPassport(passport) && checkPassword(password, passport) && checkRepeat(repeat, password) && checkIdcard(idcard)
                  && checkRealname(realname)) {// && isVCodeValid
                $.post("/register.php", {
                  submit: '',
                  quick_reg: '1',
                  accountType: 'mail',
                  mail: passport.val(),
                  password: password.val(),
                  repeat: repeat.val(),
                  vcode: vcode.val(),
                  code: smscode.val(),
                  mobile: passport.val(),
                  realname: realname.val(),
                  idcard: idcard.val()
                }, function (data) {
                  if (data.result) {
//										window.location.href = data.redirect;
                    $('.mail_span').text(passport.val());
                    regbtn.hide();
                    showRegSuccess();
                  } else {
                    //alert(ERRORS[data.errorcode]);
                    //$(".chucuo p.p1").text(data.message);
                    vcode.nextAll('img').trigger('click');
                    //$(".chucuo").show();
                    showError(data.message);
                    //alert(data.message);
                  }
                }, 'json');
              }
            }
          }
        }
      });

//			form.submit(function() {
//				if(!agree.is(":checked"))
//					return false;
//				return false;
//			});

    });

  }

});