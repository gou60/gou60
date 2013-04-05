/* $Id : user.js 4865 2007-01-31 14:04:10Z paulgao $ */

//定义表单验证状态图标
var ico_form_valid_sucess = "&nbsp<img src='themes/default/images/cus_suc.png' border=none />";
var ico_form_valid_false = "&nbsp<img src='themes/default/images/cus_error.png' border=none />";

/* *
 * 修改会员信息
 */
function userEdit()
{
  var frm = document.forms['formEdit'];
  var email = frm.elements['email'].value;
  var msg = '';
  var reg = null;
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0)
  {
    msg += no_select_question + '\n';
  }

  for (i = 7; i < frm.elements.length - 2; i++)	// 从第七项开始循环检查是否为必填项
  {
	needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

	if (needinput != '' && frm.elements[i].value.length == 0)
	{
	  msg += '- ' + needinput.innerHTML + msg_blank + '\n';
	}
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}
/* *
 * 修改会员信息
 */
function userUpdate()
{
  var frm = document.forms['formEdit'];
  var email = frm.elements['email'].value;
  var flag = Boolean(frm.elements['edit_flag'].value);
  var msg = '';
  var reg = null;
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0)
  {
    msg += no_select_question + '\n';
  }

  for (i = 7; i < frm.elements.length - 2; i++)	// 从第七项开始循环检查是否为必填项
  {
	needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

	if (needinput != '' && frm.elements[i].value.length == 0)
	{
	  msg += '- ' + needinput.innerHTML + msg_blank + '\n';
	}
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
	  if(flag){
		  return true;
	  }else{
		  return false;
	  }
  }
}

/* 会员修改密码 */
function editPassword()
{
  var frm              = document.forms['formPassword'];
  var old_password     = frm.elements['old_password'].value;
  var new_password     = frm.elements['new_password'].value;
  var confirm_password = frm.elements['comfirm_password'].value;

  var msg = '';
  var reg = null;

  if (old_password.length == 0)
  {
    msg += old_password_empty + '\n';
  }

  if (new_password.length == 0)
  {
    msg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    msg += confirm_password_empty + '\n';
  }

  if (new_password.length > 0 && confirm_password.length > 0)
  {
    if (new_password != confirm_password)
    {
      msg += both_password_error + '\n';
    }
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对会员的留言输入作处理
 */
function submitMsg()
{
  var frm         = document.forms['formMsg'];
  var msg_title   = frm.elements['msg_title'].value;
  var msg_content = frm.elements['msg_content'].value;
  var msg = '';

  if (msg_title.length == 0)
  {
    msg += msg_title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += msg_content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += msg_title_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwdInfo()
{
  var frm = document.forms['getPassword'];
  //var user_name = frm.elements['user_name'].value;
  var email     = frm.elements['email'].value;

  var errorMsg = '';
/*
  if (user_name.length == 0)
  {
    errorMsg += user_name_empty + '\n';
  }*/

  if (email.length == 0)
  {
    errorMsg += email_address_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      errorMsg += email_address_error + '\n';
    }
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }

  return true;
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwd()
{
  var frm = document.forms['getPassword2'];
  var password = frm.elements['new_password'].value;
  var confirm_password = frm.elements['confirm_password'].value;

  var errorMsg = '';
  if (password.length == 0)
  {
    errorMsg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    errorMsg += confirm_password_empty + '\n';
  }

  if (confirm_password != password)
  {
    errorMsg += both_password_error + '\n';
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 处理会员提交的缺货登记
 */
function addBooking()
{
  var frm  = document.forms['formBooking'];
  var goods_id = frm.elements['id'].value;
  var rec_id  = frm.elements['rec_id'].value;
  var number  = frm.elements['number'].value;
  var desc  = frm.elements['desc'].value;
  var linkman  = frm.elements['linkman'].value;
  var email  = frm.elements['email'].value;
  var tel  = frm.elements['tel'].value;
  var msg = "";

  if (number.length == 0)
  {
    msg += booking_amount_empty + '\n';
  }
  else
  {
    var reg = /^[0-9]+/;
    if ( ! reg.test(number))
    {
      msg += booking_amount_error + '\n';
    }
  }

  if (desc.length == 0)
  {
    msg += describe_empty + '\n';
  }

  if (linkman.length == 0)
  {
    msg += contact_username_empty + '\n';
  }

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (tel.length == 0)
  {
    msg += contact_phone_empty + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }

  return true;
}

/* *
 * 会员登录
 */
function userLogin()
{
  var frm      = document.forms['formLogin'];
  var username = frm.elements['username'].value;
  var password = frm.elements['password'].value;
  var msg = '';

  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }

  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function chkstr(str)
{
  for (var i = 0; i < str.length; i++)
  {
    if (str.charCodeAt(i) < 127 && !str.substr(i,1).match(/^\w+$/ig))
    {
      return false;
    }
  }
  return true;
}

function check_password( password )
{
    if ( password.length < 6 )
    {
        document.getElementById('password_notice').innerHTML = ico_form_valid_false + password_shorter;
    }
    else
    {
        document.getElementById('password_notice').innerHTML = ico_form_valid_sucess;
    }
}

function check_conform_password( conform_password )
{
    password = document.getElementById('password1').value;

    if ( conform_password.length < 6 )
    {
        document.getElementById('conform_password_notice').innerHTML = ico_form_valid_false + password_shorter;
        return false;
    }
    if ( conform_password != password )
    {
        document.getElementById('conform_password_notice').innerHTML = ico_form_valid_false + confirm_password_invalid;
    }
    else
    {
        document.getElementById('conform_password_notice').innerHTML = ico_form_valid_sucess;
    }
}

function is_registered( username )
{
    var submit_disabled = false;
	var unlen = username.replace(/[^\x00-\xff]/g, "**").length;

    if ( username == '' )
    {
        document.getElementById('username_notice').innerHTML = msg_un_blank;
        var submit_disabled = true;
    }

    if ( !chkstr( username ) )
    {
        document.getElementById('username_notice').innerHTML = msg_un_format;
        var submit_disabled = true;
    }
    if ( unlen < 3 )
    {
        document.getElementById('username_notice').innerHTML = username_shorter;
        var submit_disabled = true;
    }
    if ( unlen > 14 )
    {
        document.getElementById('username_notice').innerHTML = msg_un_length;
        var submit_disabled = true;
    }
    if ( submit_disabled )
    {
        document.forms['formUser'].elements['Submit'].disabled = 'disabled';
        return false;
    }
	jQuery.ajax({ url:'user.php?act=is_registered', data:'username=' + username, success: registed_callback, dataType: 'TEXT',async:true });
    /*Ajax--.call( 'user.php?act=is_registered', 'username=' + username, registed_callback , 'GET', 'TEXT', true, true );*/
}



function registed_callback(result)
{
  if ( result == "true" )
  {
    document.getElementById('username_notice').innerHTML = msg_can_rg;
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
    document.getElementById('username_notice').innerHTML = msg_un_registered;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

function checkEmail(email)
{
  var submit_disabled = false;

  if (email == '')
  {
    document.getElementById('email_notice').innerHTML = ico_form_valid_false + msg_email_blank;
    submit_disabled = true;
  }
  else if (!Utils.isEmail(email))
  {
    document.getElementById('email_notice').innerHTML = ico_form_valid_false + msg_email_format;
    submit_disabled = true;
  }

  if( submit_disabled )
  {
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
    return false;
  }
  jQuery.ajax({ url:'user.php?act=check_email', data:'email=' + email, success: check_email_callback, dataType: 'TEXT',async:true });
  /*Ajax--.call( 'user.php?act=check_email', 'email=' + email, check_email_callback , 'GET', 'TEXT', true, true );*/
}

function check_email_callback(result)
{
  if ( result == 'ok' )
  {
    document.getElementById('email_notice').innerHTML = ico_form_valid_sucess;
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
    document.getElementById('email_notice').innerHTML = ico_form_valid_false + msg_email_registered;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}
//判断手机号码是否存在函数
function checkPhone(phone)
{
  var submit_disabled = false;

  if (phone == '')
  {
    document.getElementById('phone_notice').innerHTML = ico_form_valid_false + msg_phone_blank;
    submit_disabled = true;
  }


  //判断手机号码是否正确
  var patten = /^1[0-9]{10}$/;
  phone=phone.replace(/(^\s*)|(\s*$)/g,"");
  if(patten.test(phone) == false)
  {
 	document.getElementById('phone_notice').innerHTML = ico_form_valid_false + mobile_phone_invalid;
    submit_disabled = true;
  }
  if( submit_disabled )
  {
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
    return false;
  }
  //jQuery.get('user.php?act=check_mobilePhone', 'phone=' + phone, check_phone_callback,'TEXT' );
  jQuery.ajax({ url:'user.php?act=check_mobilePhone', data:'phone=' + phone, success: check_phone_callback, dataType: 'TEXT',async:true });
  /*Ajax--.call( 'user.php?act=check_mobilePhone', 'phone=' + phone, check_phone_callback , 'GET', 'TEXT', true, true );*/
}

function checkMobilePhone(phone)
{
  var submit_disabled = false;

  if (phone == '')
  {
    document.getElementById('phone_notice').innerHTML = ico_form_valid_false + msg_phone_blank;
    submit_disabled = true;
  }


  //判断手机号码是否正确
  var patten = /^1[0-9]{10}$/;
  phone=phone.replace(/(^\s*)|(\s*$)/g,"");
  if(patten.test(phone) == false)
  {
 	document.getElementById('phone_notice').innerHTML = ico_form_valid_false + mobile_phone_invalid;
    submit_disabled = true;
  }
  if( submit_disabled )
  {
    document.forms['formEdit'].elements['info_submit'].disabled = 'disabled';
    return false;
  }
  /*Ajax--.call( 'user.php?act=check_mobilePhone', 'phone=' + phone, check_phone_callback , 'GET', 'TEXT', true, true );*/
}

function check_phone_callback(result)
{
  if ( result == "ok" )
  {
    document.getElementById('phone_notice').innerHTML = ico_form_valid_sucess;
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else if (result == "false")
  {
    document.getElementById('phone_notice').innerHTML = ico_form_valid_false + msg_phone_registered;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  } else{
	document.getElementById('phone_notice').innerHTML = sys_error;
	document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }

}



//用户中心手机号码是否存在函数
function updatePhone(phone)
{
  var frm = document.forms['formEdit'];
  var submit_disabled = false;
  if(document.getElementById('old_phone')){
  	var old_phone = document.getElementById('old_phone').value;
  }
  if(document.getElementById('edit_flag')){
  	document.getElementById('edit_flag').value = '1';
  }
  if (phone == '')
  {
    document.getElementById('phone_notice').innerHTML = ico_form_valid_false + msg_phone_blank;
    submit_disabled = true;
  }
  
  //判断手机号码是否正确
  var patten = /^1[0-9]{10}$/;
  phone=phone.replace(/(^\s*)|(\s*$)/g,"");
  if(patten.test(phone) == false)
  {
 	document.getElementById('phone_notice').innerHTML = ico_form_valid_false + mobile_phone_invalid;
    submit_disabled = true;
  }
  
  if( submit_disabled )
  {
	  frm.elements['info_submit'].disabled = 'disabled';
	  return false;
  }
  if(phone == old_phone){
	  document.getElementById('phone_notice').innerHTML = '&nbsp;<font color=\'#939393\'>订单状态短信通知</font>';
	  frm.elements['info_submit'].disabled = '';
  } else{
	  jQuery.get('user.php?act=check_mobilePhone', 'phone=' + phone, update_phone_callback,'TEXT' );
	  /*Ajax--.call( 'user.php?act=check_mobilePhone', 'phone=' + phone, update_phone_callback, 'GET', 'TEXT', true, true );*/
  }

}

function update_phone_callback(result)
{
  var frm = document.forms['formEdit'];
  if ( result == "ok" )
  {
    document.getElementById('phone_notice').innerHTML = ico_form_valid_sucess;
    //document.getElementById('edit_flag').value = 1;
   // frm.elements['info_submit'].disabled = '';
  }
  else if (result == "false")
  {
    document.getElementById('phone_notice').innerHTML = msg_phone_registered;
    document.getElementById('edit_flag').value = '';
  } else{
	document.getElementById('phone_notice').innerHTML = sys_error;
	document.getElementById('edit_flag').value = '';
  }

}

/* *
 * 处理注册用户
 */
function register()
{
  var frm  = document.forms['formUser'];
  var username  = Utils.trim(frm.elements['username'].value);
  var email  = frm.elements['email'].value;
  var password  = Utils.trim(frm.elements['password'].value);
  var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
  var checked_agreement = frm.elements['agreement'].checked;
  var msn = frm.elements['extend_field1'] ? Utils.trim(frm.elements['extend_field1'].value) : '';
  var qq = frm.elements['extend_field2'] ? Utils.trim(frm.elements['extend_field2'].value) : '';
  var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
  var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
  var mobile_phone = frm.elements['extend_field5'] ? Utils.trim(frm.elements['extend_field5'].value) : '';
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';

  frm.elements['username'].value = frm.elements['email'].value;
  var msg = "";
  // 检查输入
  var msg = '';
//  if (username.length == 0)
//  {
//    msg += username_empty + '\n';
//  }
//  else if (username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/))
//  {
//    msg += username_invalid + '\n';
//  }
//  else if (username.length < 3)
//  {
//    //msg += username_shorter + '\n';
//  }



  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_invalid + '\n';
    }
  }
  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }
  else if (password.length < 6)
  {
    msg += password_shorter + '\n';
  }
  if (/ /.test(password) == true)
  {
	msg += passwd_balnk + '\n';
  }
  if (confirm_password != password )
  {
    msg += confirm_password_invalid + '\n';
  }
  if(checked_agreement != true)
  {
    msg += agreement + '\n';
  }


  if (msn.length > 0 && (!Utils.isEmail(msn)))
  {
    msg += msn_invalid + '\n';
  }

  if (qq.length > 0 && (!Utils.isNumber(qq)))
  {
    msg += qq_invalid + '\n';
  }

  if (office_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(office_phone))
    {
      msg += office_phone_invalid + '\n';
    }
  }
  if (home_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;

    if (!reg.test(home_phone))
    {
      msg += home_phone_invalid + '\n';
    }
  }
  if (mobile_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(mobile_phone))
    {
      msg += mobile_phone_invalid + '\n';
    }
  }
  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0)
  {
    msg += no_select_question + '\n';
  }

  for (i = 4; i < frm.elements.length - 4; i++)	// 从第五项开始循环检查是否为必填项
  {
	needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

	if (needinput != '' && frm.elements[i].value.length == 0)
	{
	  msg += '- ' + needinput.innerHTML + msg_blank + '\n';
	}
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 用户中心订单保存地址信息
 */
function saveOrderAddress(id)
{
  var frm           = document.forms['formAddress'];
  var consignee     = frm.elements['consignee'].value;
  var email         = frm.elements['email'].value;
  var address       = frm.elements['address'].value;
  var zipcode       = frm.elements['zipcode'].value;
  var tel           = frm.elements['tel'].value;
  var mobile        = frm.elements['mobile'].value;
  var sign_building = frm.elements['sign_building'].value;
  var best_time     = frm.elements['best_time'].value;

  if (id == 0)
  {
    alert(current_ss_not_unshipped);
    return false;
  }
  var msg = '';
  if (address.length == 0)
  {
    msg += address_name_not_null + "\n";
  }
  if (consignee.length == 0)
  {
    msg += consignee_not_null + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员余额申请
 */
function submitSurplus()
{
  var frm            = document.forms['formSurplus'];
  var surplus_type   = frm.elements['surplus_type'].value;
  var surplus_amount = frm.elements['amount'].value;
  var process_notic  = frm.elements['user_note'].value;
  var payment_id     = 0;
  var msg = '';

  if (surplus_amount.length == 0 )
  {
    msg += surplus_amount_empty + "\n";
  }
  else
  {
    var reg = /^[\.0-9]+/;
    if ( ! reg.test(surplus_amount))
    {
      msg += surplus_amount_error + '\n';
    }
  }

  if (process_notic.length == 0)
  {
    msg += process_desc + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }

  if (surplus_type == 0)
  {
    for (i = 0; i < frm.elements.length ; i ++)
    {
      if (frm.elements[i].name=="payment_id" && frm.elements[i].checked)
      {
        payment_id = frm.elements[i].value;
        break;
      }
    }

    if (payment_id == 0)
    {
      alert(payment_empty);
      return false;
    }
  }

  return true;
}

/* *
 *  处理用户添加一个红包
 */
function addBonus()
{
  var frm      = document.forms['addBouns'];
  var bonus_sn = frm.elements['bonus_sn'].value;

  if (bonus_sn.length == 0)
  {
    alert(bonus_sn_empty);
    return false;
  }
  else
  {
	//2011.03.25 增加自定义红包 红包判断格式为 15位数字和字母组合 或者10位数字组合
    //var reg = /^[0-9]{10}$/;
	var reg = /(^[A-Za-z0-9]{15}$)|(^[0-9]{10}$)/;
    if ( ! reg.test(bonus_sn))
    {
      alert(bonus_sn_error);
      return false;
    }
  }

  return true;
}

/* *
 *  合并订单检查
 */
function mergeOrder()
{
  if (!confirm(confirm_merge))
  {
    return false;
  }

  var frm        = document.forms['formOrder'];
  var from_order = frm.elements['from_order'].value;
  var to_order   = frm.elements['to_order'].value;
  var msg = '';

  if (from_order == 0)
  {
    msg += from_order_empty + '\n';
  }
  if (to_order == 0)
  {
    msg += to_order_empty + '\n';
  }
  else if (to_order == from_order)
  {
    msg += order_same + '\n';
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 订单中的商品返回购物车
 * @param       int     orderId     订单号
 */
function returnToCart(orderId)
{
  jQuery.post('user.php?act=return_to_cart', 'order_id=' + orderId, returnToCartResponse,'JSON' );
  /*Ajax--.call('user.php?act=return_to_cart', 'order_id=' + orderId, returnToCartResponse, 'POST', 'JSON');*/
}

function returnToCartResponse(result)
{
  alert(result.message);
}

/* *
 * 检测密码强度
 * @param       string     pwd     密码
 */
function checkIntensity(pwd)
{
  var Mcolor = "#FFF",Lcolor = "#FFF",Hcolor = "#FFF";
  var m=0;

  var Modes = 0;
  for (i=0; i<pwd.length; i++)
  {
    var charType = 0;
    var t = pwd.charCodeAt(i);
    if (t>=48 && t <=57)
    {
      charType = 1;
    }
    else if (t>=65 && t <=90)
    {
      charType = 2;
    }
    else if (t>=97 && t <=122)
      charType = 4;
    else
      charType = 4;
    Modes |= charType;
  }

  for (i=0;i<4;i++)
  {
    if (Modes & 1) m++;
      Modes>>>=1;
  }

  if (pwd.length<=4)
  {
    m = 1;
  }

  switch(m)
  {
    case 1 :
      Lcolor = "2px solid red";
      Mcolor = Hcolor = "2px solid #DADADA";
    break;
    case 2 :
      Mcolor = "2px solid #f90";
      Lcolor = Hcolor = "2px solid #DADADA";
    break;
    case 3 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    case 4 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    default :
      Hcolor = Mcolor = Lcolor = "";
    break;
  }
  if (document.getElementById("pwd_lower"))
  {
    document.getElementById("pwd_lower").style.borderBottom  = Lcolor;
    document.getElementById("pwd_middle").style.borderBottom = Mcolor;
    document.getElementById("pwd_high").style.borderBottom   = Hcolor;
  }


}

function changeType(obj)
{
  if (obj.getAttribute("min") && document.getElementById("ECS_AMOUNT"))
  {
    document.getElementById("ECS_AMOUNT").disabled = false;
    document.getElementById("ECS_AMOUNT").value = obj.getAttribute("min");
    if (document.getElementById("ECS_NOTICE") && obj.getAttribute("to") && obj.getAttribute('fee'))
    {
      var fee = parseInt(obj.getAttribute("fee"));
      var to = parseInt(obj.getAttribute("to"));
      if (fee < 0)
      {
        to = to + fee * 2;
      }
      document.getElementById("ECS_NOTICE").innerHTML = notice_result + to;
    }
  }
}

function calResult()
{
  var amount = document.getElementById("ECS_AMOUNT").value;
  var notice = document.getElementById("ECS_NOTICE");

  reg = /^\d+$/;
  if (!reg.test(amount))
  {
    notice.innerHTML = notice_not_int;
    return;
  }
  amount = parseInt(amount);
  var frm = document.forms['transform'];
  for(i=0; i < frm.elements['type'].length; i++)
  {
    if (frm.elements['type'][i].checked)
    {
      var min = parseInt(frm.elements['type'][i].getAttribute("min"));
      var to = parseInt(frm.elements['type'][i].getAttribute("to"));
      var fee = parseInt(frm.elements['type'][i].getAttribute("fee"));
      var result = 0;
      if (amount < min)
      {
        notice.innerHTML = notice_overflow + min;
        return;
      }

      if (fee > 0)
      {
        result = (amount - fee) * to / (min -fee);
      }
      else
      {
        //result = (amount + fee* min /(to+fee)) * (to + fee) / min ;
        result = amount * (to + fee) / min + fee;
      }

      notice.innerHTML = notice_result + parseInt(result + 0.5);
    }
  }
}

var show_div_exit = '关闭';
/**
 * 查询订单的快递信息
 * @param int orderId 订单号
 */
function getExpressInfo(orderId){
	if(orderId.length == 0){
		showdiv(document.getElementById('getExpressInfo'), '出错了，<br/>没有指定订单参数', 20, -20, true, false);
	}

	showdiv(document.getElementById('getExpressInfo'), '<p><img id="loadingImg" src="themes/default/images/check_loading.gif" alt="处理中..." /><br><span style="text-align:center;padding:20px;color:#999;">正在处理中，请稍等...</span></p>', 20, -20, false, false,"messagediv_user");
	jQuery.post('user.php?act=get_express_info&is_ajax=1', 'order_id=' + orderId, getExpressInfoResponse,'JSON' );
	/*Ajax--.call('user.php?act=get_express_info&is_ajax=1', 'order_id=' + orderId, getExpressInfoResponse, 'POST', 'JSON');*/
}
/**
 * 查询快递信息反馈
 * @param result
 */
function getExpressInfoResponse(result) {
    closeThis();
    var status = result.status;
    var message = result.message;
    var data = result.data;

    if (status != 200) {
        //判断是否是需要输入验证码
        if (status == 301) {
            //需要验证码 显示验证码输入界面
            art.dialog.open('../' + data, { id: 'shippingInterface', title: ' ' });
        }
        else {
            //无需验证码 直接显示
            art.dialog({
                title: " ",
                content: '<p><span style="text-align:center;padding:20px;color:#999;">' + message + '</span></p>'
            });
        }
    }
    else {
        art.dialog({
            title: " ",
            content: data,
			padding: 0
        });
    }
}

function closeThis(){
	document.getElementById("messagediv_user").style.display="none";
}

/* 获取联合登录的url */
function getApiUrl(type)
{
    if(type == 'Alipay' || type == 'Renren' || type == 'SinaWeibo' || type == 'Qzone')
    {

    	if(document.getElementById('back_act') == undefined)
    	{
    		var bakurl = document.location.href;
    	}
		else
		{
			var bakurl = document.getElementById('back_act').value;
		}

    	var act = "login";

    	var jumplink = 'user_combine.php?ulapitype=' + type + '&act=' + act + '&backurl='+ encodeURIComponent(bakurl) + '&m=' + Math.random();
		/*
        //淘宝联合登录 支付宝快捷登录 和 139联合登录
		if(type == 'Alipay')
		{
			parent.location.href =  'user_combine.php?ulapitype=' + type + '&act=' + act + '&backurl='+ encodeURIComponent(bakurl) + '&m=' + Math.random();
		}
		else
		{
        	window.open( 'user_combine.php?ulapitype=' + type + '&act=' + act + '&backurl='+ encodeURIComponent(bakurl) + '&m=' + Math.random());
        }
        */
		switch(type)
		{
			case 'Alipay' :
				var A=window.open(jumplink, "AlipayLogin","width=950,height=500,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
			break;

			case 'Renren' :
				var A=window.open(jumplink, "RenrenLogin","width=800,height=600,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
			break;

			case 'SinaWeibo' :
				var A=window.open(jumplink, "SinaWeiboLogin","width=640,height=360,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
			break;

			case 'Qzone' :
				var A=window.open(jumplink, "TencentLogin","width=618,height=474,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
			break;

			default :
				alert("非法请求");
			break;
		}
    }
    else
    {
        return false;
    }

}