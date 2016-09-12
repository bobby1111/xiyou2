var ERRORS_FIELDS = {1:'#passport',2:'#password',4:'#realname',6:'#passport',7:'#vcode',8:'#idcard',9:'#smscode'};

var ERRORS = {
	100 : [ERRORS_FIELDS[1],'账户名不能为空'],
	101 : [ERRORS_FIELDS[1],'账户名格式错误'],
	102 : [ERRORS_FIELDS[1],'该账户已存在'],
	200 : [ERRORS_FIELDS[2],'密码不能为空'],
	201 : [ERRORS_FIELDS[2],'密码格式错误'],
	202 : [ERRORS_FIELDS[2],'密码输入错误'],
	203 : [ERRORS_FIELDS[2],'密码不能与账户名相同'],
	204 : [ERRORS_FIELDS[2],'两次密码输入不一致'],
	400 : [ERRORS_FIELDS[4],'请输入真实姓名'],
	401 : [ERRORS_FIELDS[4],'请输入有效真实姓名'],
	600 : [ERRORS_FIELDS[6],'手机号为空'],
	601 : [ERRORS_FIELDS[6],'手机号格式错误'],
	602 : [ERRORS_FIELDS[9],'手机验证码错误'],
	603 : [ERRORS_FIELDS[9],'请稍后再发送验证码'],
	604 : [ERRORS_FIELDS[6],'该号码与绑定的手机号不匹配'],
	607 : [ERRORS_FIELDS[6],'您的手机已经开通开测通知，不可以重复开通'],
	608 : [ERRORS_FIELDS[9],'您输入的手机验证码有误，请重新输入。'],
	609 : [ERRORS_FIELDS[9],'您输入的验证码有误，请重新输入。'],
	610 : [ERRORS_FIELDS[9],'您输入的手机号有误，请重新输入。'],
	611 : [ERRORS_FIELDS[6],'该手机已经被使用'],
	700 : [ERRORS_FIELDS[7],'验证码不能为空'],
	701 : [ERRORS_FIELDS[7],'验证码错误'],
	800 : [ERRORS_FIELDS[8],'身份证为空'],
	801 : [ERRORS_FIELDS[8],'身份证格式错误'],
	802 : [ERRORS_FIELDS[8],'这个身份证已经被使用'],
	803 : [ERRORS_FIELDS[8],'身份证与注册人姓名不一致']
};



//alert(ERRORS[100][0]);
