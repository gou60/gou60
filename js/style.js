function help_show(ele,index){
	var obj=document.getElementById("help_"+index);
	
	if(obj.style.display=="none"){
		document.getElementById("help_"+index).style.display="block";
	}else{
		document.getElementById("help_"+index).style.display="none";
	}
}

function showTrees(){
	var eles=document.getElementById("cat_trees");
	var picup=document.getElementById("tree_imgup");
	var picdown=document.getElementById("tree_imgdown");
	firefoxClean(eles);
	if(eles.childNodes.length>12){
		picup.style.display="block";
		picdown.style.display="block";
		for(var i=eles.childNodes.length; i>0; i--)
		{
				if(i<11){break;}	
				eles.childNodes[i-1].style.display="none";
		}
		var imgup=document.createElement('img');
		imgup.src="themes/default/images/tree_up.gif";
		picup.appendChild(imgup);
		var imgdown=document.createElement('img');
		imgdown.src="themes/default/images/tree_down.gif";
		picdown.appendChild(imgdown);
	}
}
function firefoxClean(eles){
	for(var i=0;i<eles.childNodes.length;i++){
		if(eles.childNodes[i].nodeName=="#text"){
			eles.removeChild(eles.childNodes[i]);	
		}	
	}	
}
function showDown(){
	var eles=document.getElementById("cat_trees");
	for(var i=eles.childNodes.length; i>0; i--)
	{
		if(i>eles.childNodes.length-10){
			eles.childNodes[i-1].style.display="block";
		}else{
			eles.childNodes[i-1].style.display="none";
		}
	}
}
function showUp(){
	var eles=document.getElementById("cat_trees");
	for(var i=0;i<eles.childNodes.length;i++){
		if(i<10){
			eles.childNodes[i].style.display="block";
		}else{
			eles.childNodes[i].style.display="none";
		}
	}
}



function changeIMG(url){
	var ele=document.getElementById("pic1");
	ele.src=url;
}

function help_tree(){
	var url_str=location.href.substring(location.href.lastIndexOf('/')+1,location.href.length);
	if(document.getElementById("HelpTreeMenu")){
		var ele=document.getElementById("HelpTreeMenu").getElementsByTagName("a");
		//alert(ele[0].href);
		//alert(ele[0].parentNode.parentNode.tagName);
		
		for(var i=0; i<ele.length;i++){
			if(ele[i].href.indexOf(url_str)!=-1){
				ele[i].parentNode.parentNode.style.display="block";
				ele[i].parentNode.style.background="url(themes/default/images/help_line1.gif) 0px 0px repeat-x";
			}
		//	for(var j=1; j<ele.childNodes[i].childNodes.length;j++){
			
		//	}
		}
	}
	
}
function help_cat_tree(){
	var url_str=location.href.substring(location.href.lastIndexOf('/')+1,location.href.length);
	if(url_str.indexOf("#")!=-1){
		url_str=url_str.substring(0,url_str.indexOf("#"));
	}
	var ele=document.getElementById("cat_HelpTreeMenu").getElementsByTagName("a");
	//alert(ele[0].href);
	//alert(ele[0].parentNode.parentNode.tagName);
	
	for(var i=0; i<ele.length;i++){
		if(ele[i].href.indexOf(url_str)!=-1){
			ele[i].parentNode.style.background="#fdfde4";
		}
	//	for(var j=1; j<ele.childNodes[i].childNodes.length;j++){
		
	//	}
	}
	
}

function show_cusinfo(){
	var ele=document.getElementById("cus_info");
	if(ele.style.display=="none"){
		ele.style.display="block";	
	}else{
		ele.style.display="none";
	}
}
var Sys = {};   
var s;
var ua = navigator.userAgent.toLowerCase();
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

function fun(str_id){
	if(str_id=="pc_inner"){
     	document.getElementById("pc_inner").style.display="block";
	}
	if(str_id=="pc_inner1"){
     	document.getElementById("pc_inner1").style.display="block";
		document.getElementById("pc_inner1").parentNode.style.display="block";
	}
	if(str_id=="alert_collect"){
     	document.getElementById("alert_collect").style.display="block";
	}
	if(str_id=="pc_inner2")
	{
		document.getElementById("pc_inner2").style.display="block";
	}
    var div=document.getElementById(str_id);
	  if(Sys.ie){
	  	div.style.filter = 'alpha(opacity=100)';
		hidden(document.getElementById(str_id),100,-0.5);
	  }else if(Sys.chrome){
		 div.style.opacity=1; 
		 hidden(document.getElementById(str_id),1,-0.001);
	  }
	  else{
	  	div.style.opacity=1; 
		hidden(document.getElementById(str_id),1,-0.001);
	  }
	  
}
function hidden(o,i,s){
    t=setInterval(function(){   
		i+=s;
		if(Sys.ie){
			o.style.filter = 'alpha(opacity='+ i +')';
		}else{
			o.style.opacity=i;
		}
		if(i<0){window.clearInterval(t); o.style.display="none";}
    },1);   
}
function type_check(ele,id){
	$('#type_check_'+id+' .spec_css_selected').removeClass('spec_css_selected').addClass('spec_css_unselected');
	$(ele).removeClass('spec_css_unselected');
	$(ele).addClass('spec_css_selected');
}
function type_clean(id){
	var ele=document.getElementById(id).getElementsByTagName("a");
	for(var i=0; i<ele.length; i++){
			ele.item(i).style.border="1px solid #ccc";
	}
}


function hideAddressArea(){
	if(document.getElementById("cus_address")){
		var cus_add=document.getElementById("cus_address");
		var cus_sel=document.getElementById("cus_seladdress");
		if(cus_add.style.display=="block"){
			cus_add.style.display="none";
			cus_sel.style.display="block";
			document.getElementById("flow_modify").style.display="none";
		}else{
			cus_add.style.display="block";
			cus_sel.style.display="none";
			document.getElementById("flow_modify").style.display="block";
		}
	}
}

/**
 * 显示收货地址
 */
function changeAddress(id){
	/*
	var cus_add=document.getElementById("cus_address");
	var cus_sel=document.getElementById("cus_seladdress");
	if(cus_add.style.display=="block"){
		cus_add.style.display="none";
		cus_sel.style.display="block";
		document.getElementById("flow_modify").style.display="none";
	}else{
		cus_add.style.display="block";
		cus_sel.style.display="none";
		document.getElementById("flow_modify").style.display="block";
	}
	*/
	$('#is_save_consignee').val('0');
	jQuery.post('flow.php?step=consignee_list&is_ajax=1', 'id='+id, changeAddressResponse,'JSON' );
	/*Ajax--.call('flow.php?step=consignee_list&is_ajax=1', 'id='+id , changeAddressResponse, 'POST', 'JSON');*/
}

/**
 * 显示收获地址反馈
 * @param result
 */
function changeAddressResponse(result){
	var error = result.error;
	
	if(error > 0){
		alert(result.message);
	}else{
		$("#cus_address").html(result.content);

		if(document.getElementById("flow_modify")){
			document.getElementById("flow_modify").style.display="none";
		}
	}
}

function saveAddress(address_id){
	
	var province  =  document.getElementById('selProvinces_').value;
	var city 	  =  document.getElementById('selCities_').value;
	if(document.getElementById('selDistricts_')){
		var district  =  document.getElementById('selDistricts_').value;
	}
	
	$('#district_err').html(' * ');
	var address   =  $.trim(document.getElementById('address').value.replace(/(.*?)(<|>)(.*?)/g,"$1$3"));
	var tel       =  $.trim(document.getElementById('tel').value.replace(/(.*?)(<|>)(.*?)/g,"$1$3"));
	var consignee =  $.trim(document.getElementById('consignee').value.replace(/(.*?)(<|>)(.*?)/g,"$1$3"));
	
	var best_time =  document.getElementById('best_time_ajax').value.replace(/(.*?)(<|>)(.*?)/g,"$1$3");
	var can_early =  document.getElementById('can_early_ajax').checked;
	$("#best_time").val(best_time);
	
	var error_msg =  '';
	var error     =  0 ;
	
	if(can_early){
		best_time += '|允许提前收到';
		$("#can_early").attr('checked',true);
	}else
		$("#can_early").attr('checked',false);

	//检验数据
	if(consignee.length == 0){
		error = 1;
		$('#consignee').val('');
		$('#consignee_err').html(' * 请填写收货人姓名');
	}
	
	if(province == 0 ){
		error = 1;
		error_msg  += ' 省份 ';
	}
	
	if( city == 0){
		error = 1;
		error_msg  += ' 城市 ';
	}
	
	if(document.getElementById('selDistricts_')){
		if (document.getElementById('selDistricts_').value == 0 && document.getElementById('selDistricts_').style.display != 'none'){
			error = 1;
			error_msg  += ' 区镇 ';
		}		
	}
	if(error_msg.length > 0){
		$('#district_err').html(' * 请填写所在的'+error_msg);
	}
		
	if (address.length == 0){
		error = 1;
		$('#address').val('');
		$('#address_err').html(' * 请填写详细地址');
	}
	
	
	if(tel.length == 0 ){
		error = 1;
		$('#tel').val('');
		$('#tel_err').html(' * 请填写手机或者固定电话');
	}
	
	if(error == 1 ){
		$('#is_save_consignee').val('0');
		
		
	}else{
		/* 提交信息 */
		jQuery.post('flow.php?step=save_consignee&is_ajax=1','address_id=' + address_id + '&province=' + province + '&city=' + city + '&district=' + district + '&address=' + address +'&tel=' + tel + '&consignee=' + consignee + '&best_time=' + best_time, saveAddressResponse,'JSON' );
		/*Ajax--.call('flow.php?step=save_consignee&is_ajax=1', 
				'address_id=' + address_id + '&province=' + province + '&city=' + city + '&district=' + district + 
				'&address=' + address +'&tel=' + tel + '&consignee=' + consignee + '&best_time=' + best_time
				, saveAddressResponse, 'POST', 'JSON');*/
	}

}


function saveAddressResponse(result){
	var error = result.error;
	
	if(error>0){
		art.dialog({
		    content: error_msg,
		    icon:'error'
		});
	}else{
//		window.location.reload();
		var consignee = result.content;
		var html = '\
					<table width="99%" align="center" border="0" cellpadding="5" cellspacing="1" bgcolor="#ffffff" style="color:#666666">\
			        <tr>\
			          <td bgcolor="#ffffff" width="20%" align="right">收货人姓名:</td>\
			          <td bgcolor="#ffffff" width="79%" align="left">'+consignee.consignee+'</td>\
			        </tr>\
			        <tr>\
			          <td bgcolor="#ffffff" align="right">详细地址:</td>\
			          <td bgcolor="#ffffff" align="left">'+consignee.address_2+consignee.address+'</td>\
			        </tr>\
			        <tr>\
			          <td bgcolor="#ffffff" align="right">手机/电话:</td>\
			          <td bgcolor="#ffffff" align="left">'+consignee.tel+'</td>\
			        </tr>\
			        <tr>\
			          <td bgcolor="#ffffff" align="right"><span id="cus_suc"></span>最佳收礼日期:</td>\
			          <td bgcolor="#ffffff" align="left">\
			          <input onchange=change_best_time("'+consignee.address_id+'") class="info_input" type="text" size="20" value="'+consignee.best_time+'" onclick="WdatePicker()" id="best_time">\
			          <input onclick=change_best_time("'+consignee.address_id+'") id="can_early" type="checkbox" name="can_early" '+(consignee.can_early?'checked="true"':'')+'>\
					  <span style="line-height:27px;">允许提前收到礼物</span>\
			          </td>\
			        </tr>\
			      </table>';
		$('#cus_address').html(html).show();//确认后的地址
		$('#flow_modify').show();
		$('#is_save_consignee').val('1');
		
		$('#shippingTable').html(result.shipping_list);//更新配送方式
		$('#payment_message').hide();
		$('#paymentTable').show();//显示支付列表
		$('#ECS_ORDERTOTAL').show();//显不最后的价格
		$('#shippingTable input:checked').click();//更新支付列表
	}
}

/**
 * 删除收货人地址
 * @param id 地址序号
 */
function deleteConsignee(id){
	if(id.length == 0){
		art.dialog.alert("系统错误，收货人地址参数不能为空");
	}
	else
	{
		art.dialog({
		    content: '你确定要删除该收获地址吗？<br/>删除后无法恢复!',
		    icon:'confirm',
		    yesFn: function(){
		    	/* 提交信息 */
		    	
		    	$('#addr_new').click();
				jQuery.post('flow.php?step=delete_consignee&is_ajax=1','address_id=' + id, deleteConsigneeResponse,'JSON' );
				/*Ajax--.call('flow.php?step=delete_consignee&is_ajax=1', 
						'address_id=' + id , deleteConsigneeResponse, 'POST', 'JSON');*/
				return true;
		        //return false; //如果返回false将阻止关闭
		    },
		    noFn: true //为true等价于function(){}
		});
	}
}

/**
 * 删除收获地址反馈
 * @param result
 */
function deleteConsigneeResponse(result){
	var error = result.error;
	var error_msg = result.message;
	var id = result.id;
	
	if(error>0)
	{
		if(error == 2)
		{
			$('#consignee_'+id).remove();
		}
		else 
		{
			
			art.dialog({
			    content: error_msg,
			    icon:'error'
			});			
		}
	}
	else
	{
		var consignee = document.getElementById('consignee_'+id);   
		consignee.parentNode.removeChild(consignee);   //删除
	}	
}

function show_submit(){
	closePriceList();
	document.getElementById("more-price-warpper").style.display="block";
}
function close_submit(){
	document.getElementById("more-price-warpper").style.display="none";
}

function submit_now(minVar,maxVar,catID,pager_sort){
	var url="category.php?category="+catID+"&display=grid&brand=0&price_min="+minVar+"&price_max="+maxVar+"&filter_attr=0&page=1&sort="+pager_sort+"&order=DESC#goods_list";
	window.location.href=url;
}
function submit_this(eleMin,eleMax,catID,pager_sort){
	submit_now(document.getElementById(eleMin).value,document.getElementById(eleMax).value,catID,pager_sort);
}
function showPriceList(){
	close_submit();
	document.getElementById("more-price-list").style.display="block";
}
function closePriceList(){
	document.getElementById("more-price-list").style.display="none";
}

function changeBind(index){
	if(index==1){
		document.getElementById("combin_opt1").style.display="block";
		document.getElementById("combin_opt2").style.display="none";
		document.getElementById("combin_band1").checked="checked";
	}else if(index==2){
		document.getElementById("combin_opt2").style.display="block";
		document.getElementById("combin_opt1").style.display="none";
		document.getElementById("combin_band2").checked="checked";
	}
}

function shurufa(ele){
	if (arguments.length == 2){
		
		var count=arguments[1];
		if(ele.innerHTML.indexOf("启用")){
			for(var i=0; i<count; i++){
				document.getElementById("address"+i).innerHTML="启用“搜狗云输入法”";
			}
		}else{
			for(var i=0; i<count; i++){
				document.getElementById("address"+i).innerHTML="关闭“搜狗云输入法”";
			}
		}
		
		
	}else{
		var ele1,ele2,ele3;
		if(document.getElementById("shurufa1")!=null){
			ele1=document.getElementById("shurufa1");
		}
		if(document.getElementById("shurufa2")!=null){
			ele2=document.getElementById("shurufa2");
		}
		if(document.getElementById("shurufa3")!=null){
			ele3=document.getElementById("shurufa3");
		}
		if(ele.innerHTML.indexOf("启用")){
			ele1.innerHTML="启用“搜狗云输入法”";
			ele2.innerHTML="启用“搜狗云输入法”";
			ele3.innerHTML="启用“搜狗云输入法”";
		}else{
			ele1.innerHTML="关闭“搜狗云输入法”";
			ele2.innerHTML="关闭“搜狗云输入法”";
			ele3.innerHTML="关闭“搜狗云输入法”";
		}
	}
}

startlHeaderList=function() {
	if(document.getElementById("header1")!=null){
		var eleRoot = document.getElementById("header1");
		for (i=0; i<eleRoot.childNodes.length; i++){
				node=eleRoot.childNodes[i];
				node.onmouseover = function(){
					if(this.className!="clicks")
					this.style.backgroundPosition="0px -35px";
				}
				node.onmouseout = function(){
					if(this.className!="clicks")
					this.style.backgroundPosition="-97px -35px";
				}				
			}
	 }else{alert("document.getElementById('header1')为空！");}
}

startGoodsList=function() {
	var eleRoot = $("#header_list li");
	eleRoot.each(function(){
		$(this).mouseover(function(){
			$(this).addClass("hd_over");
		}).mouseout(function(){
			$(this).removeClass("hd_over");
		}); 
		$(this).bind("click",function(){
			$("div[id^='detail']").hide();
			if(this.id==2){
				$(".jshidethis").hide();
				$("#buy_comment").show();
				$("#not_buy_comment").hide();
			}else if(this.id==5){
				$(".jshidethis").hide();
				$("#buy_comment").hide();
				$("#not_buy_comment").show();
			}else if(this.id==1||this.id==3){
				$("#buy_comment").hide();
				$("#not_buy_comment").hide();
				$(".jshidethis").hide();
				$("#detail"+this.id).show();
			}else{
				$("#buy_comment").show();
				$("#not_buy_comment").show();
				$(".jshidethis").show();
				$("#detail"+this.id).show();
			}
			$("#header_list li").removeClass("hd_focus");
			$(this).addClass("hd_focus");
		});
	});
}

startGoodsSubmit=function() {
	$("#more-price-list li").mouseenter(function(){
		$("#more-price-list").show();
		this.className="list_over";
	}).mouseleave(function(){
		$("#more-price-list").hide();
		this.className="";
	});
}
function showClose(ele){
	ele.style.display="block";
}
function closeClose(ele){
	ele.style.display="none";
}
function closeKefu(ele_show,ele_close){
	ele_show.style.display="none";
	ele_close.style.display="block";
}
function openKefu(ele_show,ele_close){
	ele_show.style.display="block";
	ele_close.style.display="none";
}

/*商务首页js效果*/
function showFocus(eleId){
	var ele=document.getElementById(eleId);
	for(var i=0; i<ele.childNodes.length; i++){
		var node=ele.childNodes[i]
		if (node.nodeName=="LI"){
			node.onmouseover=function(){
				cleanFocus(ele);
				for(var j=0;j<this.childNodes.length;j++){
					if(this.childNodes[j].className!=null&&this.childNodes[j].className.indexOf("focus")!=-1){
						this.childNodes[j].style.display="block";
					}
					if(this.childNodes[j].className!=null&&this.childNodes[j].className.indexOf("blurs")!=-1){
					this.childNodes[j].className="blurs focuing";
				}
				}
			}
		}
	}
}
function cleanFocus(ele){
	for(var i=0; i<ele.childNodes.length; i++){
		var node=ele.childNodes[i]
		if (node.nodeName=="LI"){
			for(var j=0;j<node.childNodes.length;j++){
				if(node.childNodes[j].className!=null&&node.childNodes[j].className.indexOf("focus")!=-1){
					node.childNodes[j].style.display="none";
				}
				if(node.childNodes[j].className!=null&&node.childNodes[j].className.indexOf("focuing")!=-1){
					node.childNodes[j].className="blurs";
				}
			}
		}
	}
}
function btmkeydown(e)
{
	var e=window.event?window.event:e;
	if(e.keyCode==13)
	{ 
		document.getElementById('js_login').click();
		e.returnValue=false;
	}
}