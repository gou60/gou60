/* $Id : common.js 4865 2007-01-31 14:04:10Z paulgao $ */
LWY_GOODS_CURRENT_ACTION = '';
/**
 * 检查属性是否都已经选择
 */
function checkSelectedAttributes()
{
	if(!document.getElementById('goodsAttrListCount')) return true;
	var attr_size = document.getElementById('goodsAttrListCount').value;
	// 检查属性值是否已经全部取得
	var element = document.getElementById("goods_attr_area").getElementsByTagName("input");
	
	var spec_arr = new Array();
	var j = 0;
	
	for (i = 0; i < element.length-2; i++) {
		var prefix = element[i].name.substr(0, 5);

		if (prefix == 'spec_'
				&& (((element[i].type == 'radio' || element[i].type == 'checkbox') && element[i].checked && element[i].defaultChecked) || element[i].tagName == 'SELECT')) {
			spec_arr[j] = element[i].value;
			j++;
		}
	}
	
	return spec_arr.length < attr_size ? false : true;
}

function popUpSelectedAttributes(goodsId, parentId)
{
	var contentArr = Array();
	
	if($('#promote_price_id').html())
	{
		contentArr[0] = document.getElementById('promote_price_id');
	}
	else{
	contentArr[0] = document.getElementById('ecs_rankprice_area');//礼无忧价
	}
	//contentArr[2] = document.getElementById('style_blank');//白金会员价
	contentArr[1] = document.getElementById('goods_attr_area');
		art.dialog({
		content :contentArr,
		lock : true,
		title : "请选择属性",
		id : 'LWY_ATTR_AREA',
		button : [ {
			name : '确定',
			callback : function() {
				if($("#spec_selected").val() == '' || $("#spec_selected").val() == undefined)
				{
					// 属性没有全部选择
					this.title('还有属性没有选择，请选择礼物的属性！');
					this.shake && this.shake();// 调用抖动接口
		            return false;
				}
				else
				{
					// 必须先关闭
					this.close();
					
					if(LWY_POPUP_SOURCE == "cart"){
						// 属性全部选择完成
						if(LWY_GOODS_CURRENT_ACTION == 'addToCart')
						{
							addToCart(goodsId, parentId);
						}
						else if(LWY_GOODS_CURRENT_ACTION == 'addToDiy')
						{
							addToDiy(goodsId, parentId);
						}	
					}
					else if(LWY_POPUP_SOURCE == "fittings")
					{
						$("#btnAddFittingToCart").trigger("click");
					}
					
					return false;
				}							
			},
			focus : true
		}, {
			name : '取消'
		} ]
	});
}
/**
* 改变选中的样式
*/
function style_check(elm,is_diy)
{
	if(is_diy == 1){
		LWY_GOODS_CURRENT_ACTION = 'addToDiy';
	}else if(is_diy == -1){
		LWY_GOODS_CURRENT_ACTION = 'addToCart';
	}
	$(elm).parent().children("a").removeClass('fitting_spec_checked');
	$(elm).addClass('fitting_spec_checked');
}
/**
 * 获取属性组合的位置和信息
 */
function get_spec_key_by_val(attr_name,spec_info_a){
	attr_name = escape(attr_name);
	attr_name = attr_name.replace(/\*/,'\\*');
	attr_name = attr_name.replace(/\+/,'\\+');
	attr_name = attr_name.replace(/\./,'\\.');
	attr_name = attr_name.replace(/\//,'\\/');
	var reg = new RegExp('('+attr_name+'$)|('+attr_name+'%u2192)');
	var n = [];
	var keys = [];
	for (var property in spec_info_a){
		var key = escape(spec_info_a[property].key);
		if(key.match(reg)!=null){
			n.push(property);
			keys.push(spec_info_a[property].key);
		}
	}
	var arr = [];
	arr.push(n,keys);
	return arr;
}
var fittings_spec_info = new Array;
function selset_fitting_spec(g_id,attr,price){
	if(art.dialog.list['Tips'] != undefined){
		art.dialog.list['Tips'].close();
	}
	g_spec_info = fittings_spec_info[g_id];
	var arr = get_spec_key_by_val(attr,g_spec_info);
	var k = arr[0];
	var keys = arr[1];
	var attr_id_val = attr.split('-',2);
	var attr_count = $('#attr_count_'+g_id).val();
	if(attr_count == 1){//如果是单选
		var attr_price = g_spec_info[k[0]]['price'];
		var attr_id = g_spec_info[k[0]]['goods_attr_id'];
		var number = g_spec_info[k[0]]['number'];
		if(number > 0){
			//有库存
			$('.fitting_attr_selected_'+g_id+'[data-attr_id="'+attr_id_val[0]+'"]').val(attr);
			add_fittings(attr_id,attr_price,g_id);
			$("#add_to_cart_button").html('<img src="themes/default/images/buy.gif">');
			$("#add_to_cart_button").removeAttr('onclick');
		}
		else{
			//无库存
			$('.fitting_attr_selected_'+g_id+'[data-attr_id="'+attr_id_val[0]+'"]').val('');
			$(".fitting_spec_selected[data-goods_id='"+g_id+"']").val('');
			$("#ul_"+g_id+" a.s_"+attr_id_val[0]).removeClass('fitting_spec_checked');
			show_message('抱歉，此款暂时缺货，请选其它款式');
			$("#add_to_cart_button").html('<img src="themes/default/images/cart_ng.gif">');
			$("#add_to_cart_button").attr('onclick',"booking_goods("+g_id+",'"+attr_id+" "+attr_id_val[1]+" 缺货')");
			return;
		}
	}
	else if(attr_count > 1){//如果是多选的话

		$('.fitting_attr_selected_'+g_id+'[data-attr_id="'+attr_id_val[0]+'"]').val(attr);
		
		var selected_attr = [];
		$('.fitting_attr_selected_'+g_id).each(function (){//已选的规格
			if($(this).val()!='' && $(this).val()!=undefined)
				selected_attr.push($(this).val());
		});
		
		//处理选择一个属性后和这个属性没有组合的属性改为不可选.
		var attrs = new Array;
		var tem_attrs = new Array;
		for(var i = 0 ; i < keys.length ; i++){
			tem_attrs = keys[i].split('→_→');
			tem_attrs.remove(tem_attrs.getIndexByValue(attr));
			attrs = attrs.concat(tem_attrs);
		}
		$("#ul_"+g_id+" a:not(.s_"+attr_id_val[0]+")").each(function(){
			var data_attr = $(this).attr('data-attr');
			if( ! attrs.in_array(data_attr)){
				$(this).hide();
			}else{
				$(this).show();
			}
		});
		//判断是完成了规格的选择.
		if(selected_attr.length == attr_count){
			//选完
			selected_attr = selected_attr.join('→_→');
			selected_attr = selected_attr.replace(/\(/,'\\(');
			selected_attr = selected_attr.replace(/\)/,'\\)');
			var i = keys.getIndexByValue(selected_attr);
			if(i !== false && i !== undefined){
				attr_id = k[i];
				var attr_price = g_spec_info[attr_id]['price'];
				var number = g_spec_info[attr_id]['number'];
				if(number > 0){
					//有库存
					add_fittings(attr_id,attr_price,g_id);
					$("#add_to_cart_button").html('<img src="themes/default/images/buy.gif">');
					$("#add_to_cart_button").removeAttr('onclick');
				}
				else{
					//无库存
					$('.fitting_attr_selected_'+g_id+'[data-attr_id="'+attr_id_val[0]+'"]').val('');
					$(".fitting_spec_selected[data-goods_id='"+g_id+"']").val('');
					$("#ul_"+g_id+" a.s_"+attr_id_val[0]).removeClass('fitting_spec_checked');
					show_message('抱歉，此款暂时缺货，请选其它款式');
					$("#add_to_cart_button").html('<img src="themes/default/images/cart_ng.gif">');
					$("#add_to_cart_button").attr('onclick',"booking_goods("+g_id+",'"+attr_id+" "+attr_id_val[1]+" 缺货')");
					return;
				}

			}else{
				//没有这种规格
				$('.fitting_attr_selected_'+g_id+'[data-attr_id="'+attr_id_val[0]+'"]').val('');
				$(".fitting_spec_selected[data-goods_id='"+g_id+"']").val('');
				$("#ul_"+g_id+" a.s_"+attr_id_val[0]).removeClass('fitting_spec_checked');
				show_message('抱歉，此款暂时缺货，请选其它款式');
				$(this).hide();
				return;
			}
			
		}else{
			$("#add_to_cart_button").html('<img src="themes/default/images/buy.gif">');
			$("#add_to_cart_button").removeAttr('onclick');
		}
		
	}
	
}
function add_fittings(goods_attr_id,price,goods_id)
{
//	$("#fitting_spec_value_"+goods_attr_id).attr('checked',true);
//	$("#new_price_"+goods_id).html(price);
	$(".fitting_spec_selected[data-goods_id='"+goods_id+"']").val(goods_attr_id);
	$("#new_price_"+goods_id).html('￥'+price+'元');
}
function del_fitting(g_id){
	$("#li_"+g_id).remove();
	return;
}
/**
 * 添加商品到购物车
 */
function addToCart(goodsId, parentId) {
	goods = new Object();
	spec_arr = new Array();
	fittings_arr = new Array();
	fittings_spec = new Array();
	fittings = new Array();
	number = 1;
	formBuy = document.forms['ECS_FORMBUY'];
	quick = 0;
	// 检查是否有商品规格 
	if (formBuy){ 

		
		if(LWY_POPUP_SOURCE != "fittings") {
			// 检查属性是否必填
			//if( !checkSelectedAttributes(formBuy) )
			if($('#goodsAttrListCount').val() > 0 &&($("#spec_selected").val() == '' || $("#spec_selected").val() == undefined))
			{
				//alert("请选择属性");
				popUpSelectedAttributes(goodsId, parentId);
				
				return;	
			}
			
			//spec_arr = getSelectedAttributes(formBuy);
			if($('#goodsAttrListCount').val() > 0 ){
				spec_arr.push($("#spec_selected").val());
				quick = 1;
			}
			if (formBuy.elements['number']) {
				number = formBuy.elements['number'].value;
			}
		}

	}

	if(LWY_POPUP_SOURCE == "fittings")
	{
		// 循环判断选中的配件
		$(".lwy_fittings_check").each(function(i){
			if($(this).attr("checked") == "checked"){
				// 压入数组
				fittings.push($(this).attr("goodsId"));
			}
		});
		$.getJSON('flow.php?step=fittings_spec&parent_id='+goodsId+'&fittings='+objToJSONString(fittings),function(data){
			
			if(data.content)
			{
				fittings = data.fittings;
				art.dialog({
					id : "asd",
					lock : true,
					title : "选择属性",
					content : data.content
					/*button : [//按钮改版，用fittings_to_cart()
					       
					       ]*/
				});
				fittings_spec_info =  eval ('('+data.fitting_spec_info+')');
			}
			else
			{
        		fittings_arr.push(fittings,"");
        		goods.fittings = fittings_arr;
        		fittings = data.fittings;
    			goods.quick = quick;
    			goods.spec = spec_arr;
    			goods.goods_id = goodsId;
    			goods.number = number;
    			goods.parent = (typeof (parentId) == "undefined") ? 0 : parseInt(parentId);
				// 关闭所有弹出的窗口
				LWY_CloseAllPopUpWIN();
	
				// 弹出窗口
				art.dialog({
					follow: document.getElementById('shipping_link'),
					content : document.getElementById("LWY_COMMON_LOADING"),
					title : " ",
					padding: "0 0",
					width: 460,
					height: 311,
					id : 'LWY_CART_RESPONSE_PRE'
				});
				jQuery.post( 'flow.php?step=add_to_cart','goods=' + BASE64.encode(objToJSONString(goods)),addToCartResponse,'JSON' );
			}
		});
	}
	else
	{
		goods.fittings = fittings;
		goods.quick = quick;
		goods.spec = spec_arr;
		goods.goods_id = goodsId;
		goods.number = number;
		goods.parent = (typeof (parentId) == "undefined") ? 0 : parseInt(parentId);
		// 关闭所有弹出的窗口
		LWY_CloseAllPopUpWIN();
	
		// 弹出窗口
		art.dialog({
			follow: document.getElementById('shipping_link'),
			content : document.getElementById("LWY_COMMON_LOADING"),
			title : " ",
			padding: "0 0",
			width: 460,
			height: 311,
			id : 'LWY_CART_RESPONSE_PRE'
		});
		jQuery.post( 'flow.php?step=add_to_cart','goods=' + BASE64.encode(objToJSONString(goods)),addToCartResponse,'JSON' );
	}
}
/**
 * 配件加到购物车
 */
function fittings_to_cart(parent_id)
{
	var pass = true;
//	$("#fittings_spec input:checked").each(
	$(".fitting_spec_selected").each(
	function(i){
//	 	var goods_id = $(this).attr('goodsId');
		var goods_id = $(this).attr('data-goods_id');
	 	var spec = $(this).val();
	 	if(spec == '' || spec == null){
			pass = false;
			return false;
	 	}
	 
	 	var tem = new Array();
	 	if(goods_id == parent_id)
		{
	 		spec_arr.push(spec);
		}
	 	else
	 	{
	 		tem.push(goods_id,spec);
	     	fittings_spec.push(tem);
	 	}
	});
	if(pass == false){
		art.dialog.list['asd'].shake && art.dialog.list['asd'].shake();// 调用抖动接口
		show_message('还有规格没有选');
		
		return;
	}
	fittings_arr.push(fittings,fittings_spec);
	goods.fittings = fittings_arr;
	goods.quick = quick;
	goods.spec = spec_arr;
	goods.goods_id = parent_id;
	goods.number = number;
	goods.parent = 0;
	// 关闭所有弹出的窗口
	LWY_CloseAllPopUpWIN();
	if(LWY_GOODS_CURRENT_ACTION != 'addToDiy')
	{
		// 弹出窗口
		art.dialog({
			follow: document.getElementById('shipping_link'),
			content : document.getElementById("LWY_COMMON_LOADING"),
			title : " ",
			padding: "0 0",
			width: 460,
			height: 311,
			id : 'LWY_CART_RESPONSE_PRE'
		});
		jQuery.post( 'flow.php?step=add_to_cart','goods=' + BASE64.encode(objToJSONString(goods)),addToCartResponse,'JSON' );
	}
	else
	{
		//如果是ＤＩＹ
		var urlStr = objToJSONString(goods);
		var encodeUrlStr = BASE64.encode(urlStr);
	
		//Ajax--.call('diy.php?act=submitData', 'goods=' + goods.toJSONString(), null , 'POST', 'JSON');
		location.href = 'diy.php?act=submitData&goods_id=' + goodsId
				+ '&goods=' + encodeUrlStr;
	}
		
}

/*
 * 向DIY写入准备数据
 */
function addToDiy(goodsId, parentId) {
	var goods = new Object();
	var spec_arr = new Array();
	var fittings_arr = new Array();
	fittings = new Array();
	var number = 1;
	var formBuy = document.forms['ECS_FORMBUY'];
	var quick = 0;
	// 检查是否有商品规格 
	if (formBuy) {
		// 检查属性是否必填
		//if( !checkSelectedAttributes(formBuy) )
		if($('#goodsAttrListCount').val() > 0 &&($("#spec_selected").val() == '' || $("#spec_selected").val() == undefined))
		{
			//alert("请选择属性");
			popUpSelectedAttributes(goodsId, parentId);
			
			return;	
		}
		
		//spec_arr = getSelectedAttributes(formBuy);
		spec_arr.push($("#spec_selected").val());

		if (formBuy.elements['number']) {
			number = formBuy.elements['number'].value;
		}

		quick = 1;
	}

	goods.fittings = fittings;
	goods.quick = quick;
	goods.spec = spec_arr;
	goods.goods_id = goodsId;
	goods.number = number;
	goods.parent = (typeof (parentId) == "undefined") ? 0 : parseInt(parentId);

	var urlStr = objToJSONString(goods);
	var encodeUrlStr = BASE64.encode(urlStr);

	//Ajax--.call('diy.php?act=submitData', 'goods=' + goods.toJSONString(), null , 'POST', 'JSON');
	location.href = 'diy.php?act=submitData&goods_id=' + goodsId
			+ '&goods=' + encodeUrlStr;
//	}
}
/**
 * 问答弹出js框
 */
function add_question_show() {
	
	// 弹出窗口
	art.dialog({
		follow: document.getElementById('shipping_link'),
		content : document.getElementById("add_question_div"),
		title : " ",
		padding: "0 0",
		id : 'add_question_dialog'
	});
}

function add_question_submit(){
	
	var question = new Object();
	if(document.getElementById("question_title").value == ''){
		alert("标题不能为空");
		return;
	}
	if(document.getElementById("question_content").value == ''){
		alert("内容不能为空");
		return;
	}
	if(document.getElementById("question_cat").value == 0){
		alert("请选择分类");
		return;
	}
	question.title = document.getElementById("question_title").value;
	question.content = document.getElementById("question_content").value;
	question.cat_id = document.getElementById("question_cat").value;
	question.no_name = document.getElementById("no_name") ? document.getElementById("no_name").value : '';
	question.ceti_code = document.getElementById("ceti_code") ? document.getElementById("ceti_code").value : '';
	jQuery.post( 'article_cat.php?act=add_question','question=' + objToJSONString(question),addQuestionReponse,'JSON' );
	
}


function addQuestionReponse(result){
	if(result['ok'] == 'ok'){
		if(result['check'] == 0){
			alert("提问成功，审核后即可发布");
		}else{
			alert("提问成功");
		}
		window.parent.location = "article_cat.php?id="+result['cat_id'];
	}else{
		alert(result);
		return;
	}
}

/**
 * 获得选定的商品属性
 */
function getSelectedAttributes(formBuy) {
	var spec_arr = new Array();
	var j = 0;

	for (i = 0; i < formBuy.elements.length; i++) {
		var prefix = formBuy.elements[i].name.substr(0, 5);

		if (prefix == 'spec_'
				&& (((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) || formBuy.elements[i].tagName == 'SELECT')) {
			spec_arr[j] = formBuy.elements[i].value;
			j++;
		}
	}

	return spec_arr;
}

/* *
 * 处理添加商品到购物车的反馈信息
 */
function addToCartResponse(result) {
	// 关闭预先弹出的窗口
	LWY_CloseAllPopUpWIN();
	var cartResponseWindow = art.dialog.list['LWY_CART_RESPONSE_PRE'];
	if(cartResponseWindow) cartResponseWindow.close();
	
	if (result.error > 0) {
		// 如果需要缺货登记，跳转
		if (result.error == 2) {
			/*
			if (confirm(result.message))
			{
			  location.href = 'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
			}
			 */
			 jQuery.post('user.php?act=add_booking&is_ajax=1&id='+ result.goods_id + '&spec=' + result.product_spec,'content=' + result.message, BookingResponse, 'JSON');
			/*
			Ajax--.call('user.php?act=add_booking&is_ajax=1&id='
					+ result.goods_id + '&spec=' + result.product_spec,
					'content=' + result.message, BookingResponse, 'POST',
					'JSON');
			*/
		}
		// 没选规格，弹出属性选择框
		//else if (result.error == 6) {
		//	openSpeDiv(result.message, result.goods_id, result.parent);
		//} 
		else if (result.error == 6){
			select_apec_div(result.content);
			fittings_spec_info = eval ('('+result.spec_info+')');
			$("#add_to_cart_button").click(function(){//绑定弹出框中购买按钮的事件
				var spec_arr = new Array();
				var spec =  $("#_spec input.fitting_spec_selected[data-goods_id='"+result.goods_id+"']").val();
				if(spec == '' || spec == undefined){
					art.dialog.list['LWY-spec'].shake && art.dialog.list['LWY-spec'].shake();// 调用抖动接口
					show_message('还有规格没有选');
					return;
				}
				spec_arr.push(spec);
				
				fittings_to_flow(result.goods_id,result.parent,result.percent,result.shopPrice,spec_arr);
			});
		}
		else {
			alert(result.message);
		}
	} else {
		//清空导航条上的小购物车
		if($("#cart_list").html()){
			$("#cart_list").html('');
		}
		var cartInfo = document.getElementById('ECS_CARTINFO');
		var cart_url = 'flow.php?step=cart';
		if (cartInfo) {
			cartInfo.innerHTML = result.content;
		}

		if (result.one_step_buy == '1') {
			location.href = cart_url;
		} else {
			switch (result.confirm_type) {
			case '1':
				// 1 提示用户，点击“确定”进购物车
				var cartResponse = result.cart_response;
			    
				art.dialog({
					follow: document.getElementById('shipping_link'),
					content : cartResponse,
					title : " ",
					padding: "0 0",
					id : 'LWY_CART_RESPONSE'
				});
				
				break;
			case '2':
				// 2 提示用户，点击“取消”进购物车
				if (confirm(result.message))
					location.href = cart_url;
				break;
			case '3':
				// 3 直接进入购物车
				location.href = cart_url;
				break;
				// 4 不提示并停留在当前页面
			default:
				break;
			}
			if(result.goods_number_empty == 1){
				$("#notice_empty").css("display","inline");
			}
		}
	}
}

/**
 * 简易购物车-添加产品数量/减少产品数量
 */
function LWY_CartGoodsNumChange(act, name, id, goods_id)
{
	var goods_num = document.getElementById(id).value;

	if(goods_id)
		goodsId = goods_id;
	else
		goodsId = 0;
	
	switch (act) {
	case "add":
		goods_num++ ;
		break;
	case "minus":
		if(goods_num == 1){
			return 0;
		}else{
			goods_num--;	
		}
		break;
		
	default:
		goods_num = 1;
		break;
	}
	jQuery.post('flow.php?step=ajax_update_cart',name+ '=' + goods_num + '&isShowCartInfo=1&goodsId='+goodsId,LWYCartGoodsNumChangeResponse,'JSON' );
	/*Ajax--.call('flow.php?step=ajax_update_cart', name+ '=' + goods_num + '&isShowCartInfo=1&goodsId='+goodsId , LWYCartGoodsNumChangeResponse, 'POST', 'JSON');*/
}

/**
 * 简易购物车-添加产品数量/减少产品数量 反馈
 * @param result
 */
function LWYCartGoodsNumChangeResponse(result)
{
    if (result.error > 0)
    {
    	art.dialog.tips(result.message);
    	var gid = result.id;
    	if(gid)
    	{
    		document.getElementById('goods_number_'+gid).value = document.getElementById('pre_goods_num_'+gid).innerHTML;
    	}
    }
    else
    {
    	// 1 提示用户，点击“确定”进购物车
		var cartResponse = result.cart_response;		
		var cartResponseWin = art.dialog.list['LWY_CART_RESPONSE'];
		
		if(cartResponseWin)
		{
			cartResponseWin.content(cartResponse);
		}
    }
}


/**
 * 简易购物车-更新产品数量
 * @param obj	
 * @param id
 * @param recId
 */
function LWY_UpdateCartGoodsNum(obj, id, name,goods_id)
{
	//隐藏更新按钮
	obj.style.display = "none";
	
	var goods_num = document.getElementById(id).value;

	if(goods_id)
		goodsId = goods_id;
	else
		goodsId = 0;
	jQuery.post('flow.php?step=ajax_update_cart',name+ '=' + goods_num + '&isShowCartInfo=1&goodsId='+goodsId,LWYCartGoodsNumChangeResponse,'JSON' );
	/*Ajax--.call('flow.php?step=ajax_update_cart', name+ '=' + goods_num + '&isShowCartInfo=1&goodsId='+goodsId , LWYCartGoodsNumChangeResponse, 'POST', 'JSON');*/
}

/**
 * 删除简易购物车里面的礼物
 * @param recId
 */
function LWY_DropCartGoods(recId,goods_id)
{
	if(!recId) return;
	
	if(goods_id)
		goodsId = goods_id;
	else
		goods_id = 0;
	jQuery.post('flow.php?step=drop_goods&id='+recId,'is_ajax=1&goodsId='+goodsId,LWYCartGoodsNumChangeResponse,'JSON' );
	/*Ajax--.call('flow.php?step=drop_goods&id='+recId, 'is_ajax=1&goodsId='+goodsId , LWYCartGoodsNumChangeResponse, 'POST', 'JSON');*/
}

/**
 * 关闭所有由artdialog打开的窗口
 */
function LWY_CloseAllPopUpWIN()
{
	var list = art.dialog.list;
	//if(list.length > 0)
	//{		
		for (var i in list) {
		    list[i].close();
		};		
	//}	    
}

/**
 * 
 * 隐藏购物车反馈窗口
 * 
 */
function hideCartResponseWin()
{
	art.dialog.list['LWY_CART_RESPONSE'].close();
}
function booking_goods(id,message){
	if(art.dialog.list['LWY-spec'] != undefined)
		art.dialog.list['LWY-spec'].close();
	if(art.dialog.list['Tips'] != undefined){
		art.dialog.list['Tips'].close();
	}
	var result = new Array();
	result.error = 0;
	result.message = '';
	result.data = new Array();
	result.data.content = '此礼物热销暂无现货，通常1-5日内会到货。您可以先进行缺货登记并留下联系方式，到货后我们<br />会优先为您预留并第一时间通知您。为感谢您的等待，届时您可以享受<font color=red>白金会员价</font>购买此商品！';
	result.data.info = new Array();
	result.data.info.id = id;
	result.data.info.email = '';
	result.data.info.consignee = '';
	result.data.info.desc = message;
	BookingResponse(result);
}
/**
 * 调用缺货登记窗口 
 * @param result
 */
function BookingResponse(result) {
	var error = result.error;
	var message = result.message;
	var data = result.data;

	//关闭之前的窗口

	if (error > 0) {
		art.dialog.alert(message);
	} else {
		var email = data.info.email;//赖2012/4/25修改，过滤email为liwuyou.com的邮件地址显示。
		var re = /liwuyou\.com/i;
		if(email.search(re) > 0){
			email = '';
		}
		//赖2012/4/25修改，精简缺货登记弹出页。
		var html = '\
			<br>\
			<table cellspacing="1" cellpadding="5" border="0" bgcolor="#dddddd" width="100%">\
		      <tbody>\
			  <tr><td bgcolor="#ffffff" colspan="3" style="line-height:25px; padding:10px 20px; "><%=content%><br /></td></tr>\
			  <tr>\
		        <td bgcolor="#ffffff" align="right" width="20%">电子邮件地址:</td>\
		        <td bgcolor="#ffffff" width="40%"><input type="text" class="inputBg" size="25"  value="'+email+'" id="bookemail" name="bookemail"></td>\
		        <td bgcolor="#ffffff" width="40%"><span id="error_msg" style="color:red;">&nbsp;*&nbsp;到货时EMAIL通知（附白金优惠券）</span></td>\
		      </tr>\
		      <tr>\
		        <td bgcolor="#ffffff" align="right">联系电话:</td>\
		        <td bgcolor="#ffffff"><input type="text" class="inputBg" size="25" value="<%=info.tel%>" id="tel" name="tel"></td>\
		        <td bgcolor="#ffffff">到货时会有短信通知</td>\
		        <input type="hidden" value="act_add_booking" id="act" name="act">\
		        <input type="hidden" value="<%=info.id%>" id="id" name="id">\
		        <input type="hidden" value="<%=info.rec_id%>" id="book_rec_id" name="book_rec_id">\
		      </tr>\
			  </tbody></table>\
		';
		
		art
				.dialog({
					id : 'BookForm',
					title : '缺货登记',
					border : false,
					content : data,
					skin : 'liwuyou',
					tmpl : html,
					yesText : '提交缺货登记',
					noText : '取消',
					yesFn : function() {
						var id = document.getElementById('id').value;
						var number = 1;
						var desc = data.info.desc != undefined ? data.info.desc : '';
						var linkman = data.info.consignee;
						var email = document.getElementById('bookemail').value;
						var tel = document.getElementById('tel').value;
						var rec_id = document.getElementById('book_rec_id').value;
						var act = document.getElementById('act').value;

						//检查email是否填写，以及填写是否正确
						var msg = '';
						if (email.length == 0) {
							msg += '* 邮件地址还没有填写\n';
						} else {
							if (!(Utils.isEmail(email))) {
								msg += '* 邮件地址格式不正确哦\n';
							}
						}

						if (msg.length > 0) {
							document.getElementById('error_msg').innerHTML = msg;
							document.getElementById('error_msg').style.display = "block";
							return false;
						} else {
							jQuery.post('user.php?is_ajax=1','id=' + id + '&number=' + number + '&desc=' + desc	+ '&linkman=' + linkman + '&email=' + email + '&tel=' + tel + '&rec_id=' + rec_id	+ '&act=' + act,AddToBookingResponse,'JSON' );
							/*Ajax--.call('user.php?is_ajax=1', 'id=' + id
									+ '&number=' + number + '&desc=' + desc
									+ '&linkman=' + linkman + '&email=' + email
									+ '&tel=' + tel + '&rec_id=' + rec_id
									+ '&act=' + act, AddToBookingResponse,
									'POST', 'JSON');*/
						}

					},
					noFn : true
				});
	}

}

/**
 * 写入缺货登记反馈
 * @param result
 */
function AddToBookingResponse(result) {
	var error = result.error;
	var message = result.message;

	if (error > 0) {
		art.dialog.alert(message);
	} else {
		art.dialog.tips('提交成功！', 1);
	}
}


/* *
 * 添加商品到收藏夹
 * @version 2012070501 修改ajax请求为不缓存
 */
function collect(goodsId) {
	//
	$.ajaxSetup({cache:false});
	jQuery.get('user.php?act=collect','id=' + goodsId,collectResponse,'JSON' );
	/*Ajax--.call('user.php?act=collect', 'id=' + goodsId, collectResponse, 'GET',
			'JSON');*/
}
function displayNotes(icons,message){
	artDialog({
        id: 'Tips',
        title: false,
        cancel: false,
        fixed: true,
        icon: icons,
        lock: false
    })
    .content(message)
    .time(1.5);
}
/* *
 * 处理收藏商品的反馈信息
 */
function collectResponse(result) 
{
	
	
	var icons = 'succeed';
	switch (result.error) {
	case 301:
		// 需要登录
		ShowLoginWindows('login');
		break;
		
	case 201:
		// 收藏夹里面已经有
		icons = 'warning';
		displayNotes(icons,result.message);
		break;
		
	case 502:
		// 数据存储失败
		icons = 'error';
		displayNotes(icons,result.message);
		break;
		
	case 400:
		// 礼物ID不正确
		icons = 'error';
		displayNotes(icons,result.message);
		break;

	default:
		displayNotes(icons,result.message);
		break;
	}
}
function show_message(message){
	artDialog({
        id: 'Tips',
        title: false,
        cancel: false,
        fixed: true,
        icon: 'warning',
        lock: false
    })
    .content(message)
    .time(3);
}
/* *
 * 处理会员登录的反馈信息
 */
function signInResponse(result) {
	toggleLoader(false);

	var done = result.substr(0, 1);
	var content = result.substr(2);

	if (done == 1) {
		document.getElementById('member-zone').innerHTML = content;
	} else {
		alert(content);
	}
}

/* *
 * 评论的翻页函数
 */
function gotoPage(page, id, type,comment_cat) {
	if(comment_cat == 1 || comment_cat == 2){
		$("#cmtlodding").show();
		$("#buycmtList").hide();
	}else{
		$("#zixunlodding").show();
		$("#comt10").hide();
	}
	jQuery.get('comment.php?act=gotopage',{page:page, id:id ,type:type, comment_cat:comment_cat, m:Math.random()},gotoPageResponse,'JSON' );
	/*Ajax--.call('comment.php?act=gotopage', 'page=' + page + '&id=' + id
			+ '&type=' + type, gotoPageResponse, 'GET', 'JSON');*/
}

function gotoPageResponse(result) {
	if(result.comment_cat == 1 || result.comment_cat == 2){
		$("#buycmtList").show();
		$("#zixunlodding").hide();
	}else{
		$("#buycmtList").show();
		$("#comt10").hide();
	}
	if(result.comment_cat == 1 || result.comment_cat == 2){
		document.getElementById("buy_comment").innerHTML = result.content;
	}else{
		document.getElementById("not_buy_comment").innerHTML = result.content;
	}
	
}

/* *
 * 商品购买记录的翻页函数
 */
function gotoBuyPage(page, id) {
	jQuery.get('goods.php?act=gotopage','page=' + page + '&id=' + id,gotoBuyPageResponse,'JSON' );
	/*Ajax--.call('goods.php?act=gotopage', 'page=' + page + '&id=' + id,
			gotoBuyPageResponse, 'GET', 'JSON');*/
}

function gotoBuyPageResponse(result) {
	document.getElementById("ECS_BOUGHT").innerHTML = result.result;
}

/* *
 * 取得格式化后的价格
 * @param : float price
 */
function getFormatedPrice(price) {
	if (currencyFormat.indexOf("%s") > -1) {
		return currencyFormat.replace('%s', advFormatNumber(price, 2));
	} else if (currencyFormat.indexOf("%d") > -1) {
		return currencyFormat.replace('%d', advFormatNumber(price, 0));
	} else {
		return price;
	}
}

/* *
 * 夺宝奇兵会员出价
 */

function bid(step) {
	var price = '';
	var msg = '';
	if (step != -1) {
		var frm = document.forms['formBid'];
		price = frm.elements['price'].value;
		id = frm.elements['snatch_id'].value;
		if (price.length == 0) {
			msg += price_not_null + '\n';
		} else {
			var reg = /^[\.0-9]+/;
			if (!reg.test(price)) {
				msg += price_not_number + '\n';
			}
		}
	} else {
		price = step;
	}

	if (msg.length > 0) {
		alert(msg);
		return;
	}
	jQuery.post('snatch.php?act=bid&id=' + id, 'price=' + price, bidResponse,'JSON' );
	/*Ajax--.call('snatch.php?act=bid&id=' + id, 'price=' + price, bidResponse,
			'POST', 'JSON')*/
}

/* *
 * 夺宝奇兵会员出价反馈
 */

function bidResponse(result) {
	if (result.error == 0) {
		document.getElementById('ECS_SNATCH').innerHTML = result.content;
		if (document.forms['formBid']) {
			document.forms['formBid'].elements['price'].focus();
		}
		newPrice(); //刷新价格列表
	} else {
		alert(result.content);
	}
}

/* *
 * 夺宝奇兵最新出价
 */

function newPrice(id) {
	jQuery.get('snatch.php?act=new_price_list&id=' + id,'',newPriceResponse,'TEXT' );
	/*Ajax--.call('snatch.php?act=new_price_list&id=' + id, '', newPriceResponse,
			'GET', 'TEXT');*/
}

/* *
 * 夺宝奇兵最新出价反馈
 */

function newPriceResponse(result) {
	document.getElementById('ECS_PRICE_LIST').innerHTML = result;
}

/* *
 *  返回属性列表
 */
function getAttr(cat_id) {
	var tbodies = document.getElementsByTagName('tbody');
	for (i = 0; i < tbodies.length; i++) {
		if (tbodies[i].id.substr(0, 10) == 'goods_type')
			tbodies[i].style.display = 'none';
	}

	var type_body = 'goods_type_' + cat_id;
	try {
		document.getElementById(type_body).style.display = '';
	} catch (e) {
	}
}

/* *
 * 截取小数位数
 */
function advFormatNumber(value, num) // 四舍五入
{
	var a_str = formatNumber(value, num);
	var a_int = parseFloat(a_str);
	if (value.toString().length > a_str.length) {
		var b_str = value.toString().substring(a_str.length, a_str.length + 1);
		var b_int = parseFloat(b_str);
		if (b_int < 5) {
			return a_str;
		} else {
			var bonus_str, bonus_int;
			if (num == 0) {
				bonus_int = 1;
			} else {
				bonus_str = "0."
				for ( var i = 1; i < num; i++)
					bonus_str += "0";
				bonus_str += "1";
				bonus_int = parseFloat(bonus_str);
			}
			a_str = formatNumber(a_int + bonus_int, num)
		}
	}
	return a_str;
}

function formatNumber(value, num) // 直接去尾
{
	var a, b, c, i;
	a = value.toString();
	b = a.indexOf('.');
	c = a.length;
	if (num == 0) {
		if (b != -1) {
			a = a.substring(0, b);
		}
	} else {
		if (b == -1) {
			a = a + ".";
			for (i = 1; i <= num; i++) {
				a = a + "0";
			}
		} else {
			a = a.substring(0, b + num + 1);
			for (i = c; i <= b + num; i++) {
				a = a + "0";
			}
		}
	}
	return a;
}

/* *
 * 根据当前shiping_id设置当前配送的的保价费用，如果保价费用为0，则隐藏保价费用
 *
 * return       void
 */
function set_insure_status() {
	// 取得保价费用，取不到默认为0
	var shippingId = getRadioValue('shipping');
	var insure_fee = 0;
	if (shippingId > 0) {
		if (document.forms['theForm'].elements['insure_' + shippingId]) {
			insure_fee = document.forms['theForm'].elements['insure_'
					+ shippingId].value;
		}
		// 每次取消保价选择
		if (document.forms['theForm'].elements['need_insure']) {
			document.forms['theForm'].elements['need_insure'].checked = false;
		}

		// 设置配送保价，为0隐藏
		if (document.getElementById("ecs_insure_cell")) {
			if (insure_fee > 0) {
				document.getElementById("ecs_insure_cell").style.display = '';
				setValue(document.getElementById("ecs_insure_fee_cell"),
						getFormatedPrice(insure_fee));
			} else {
				document.getElementById("ecs_insure_cell").style.display = "none";
				setValue(document.getElementById("ecs_insure_fee_cell"), '');
			}
		}
	}
}

/* *
 * 当支付方式改变时出发该事件
 * @param       pay_id      支付方式的id
 * return       void
 */
function changePayment(pay_id) {
	// 计算订单费用
	calculateOrderFee();
}

function getCoordinate(obj) {
	var pos = {
		"x" : 0,
		"y" : 0
	}

	pos.x = document.body.offsetLeft;
	pos.y = document.body.offsetTop;

	do {
		pos.x += obj.offsetLeft;
		pos.y += obj.offsetTop;

		obj = obj.offsetParent;
	} while (obj.tagName.toUpperCase() != 'BODY')

	return pos;
}

function showCatalog(obj) {
	var pos = getCoordinate(obj);
	var div = document.getElementById('ECS_CATALOG');

	if (div && div.style.display != 'block') {
		div.style.display = 'block';
		div.style.left = pos.x + "px";
		div.style.top = (pos.y + obj.offsetHeight - 1) + "px";
	}
}

function hideCatalog(obj) {
	var div = document.getElementById('ECS_CATALOG');

	if (div && div.style.display != 'none')
		div.style.display = "none";
}

function sendHashMail() {
	jQuery.get('user.php?act=send_hash_mail', '', sendHashMailResponse,'JSON' );
	/*Ajax--.call('user.php?act=send_hash_mail', '', sendHashMailResponse, 'GET',
			'JSON')*/
}

function sendHashMailResponse(result) {
	if(result.error == 2){
		alert('目前系统暂不支持联合登录帐号发送邮箱认证，谢谢您对我们网站的支持！');
	}else
		alert(result.message);
}

/* 订单查询 */
function orderQuery() {
	var order_sn = document.forms['ecsOrderQuery']['order_sn'].value;
	var reg = /^[\.0-9]+/;
	if (order_sn.length < 10 || !reg.test(order_sn)) {
		alert("您的输入有误！");
		return;
	}
	jQuery.get('user.php?act=order_query&order_sn=s' + order_sn, '', orderQueryResponse,'JSON' );
	/*Ajax--.call('user.php?act=order_query&order_sn=s' + order_sn, '',
			orderQueryResponse, 'GET', 'JSON');*/
}

function orderQueryResponse(result) {
	if (result.message.length > 0) {
		alert(result.message);
	}
	if (result.error == 0) {
		var div = document.getElementById('ECS_ORDER_QUERY');
		div.innerHTML = result.content;
	}
}

function display_mode(str) {
	document.getElementById('display').value = str;
	setTimeout(doSubmit, 0);
	function doSubmit() {
		document.forms['listform'].submit();
	}
}

function display_mode_wholesale(str) {
	document.getElementById('display').value = str;
	setTimeout(doSubmit, 0);
	function doSubmit() {
		document.forms['wholesale_goods'].action = "wholesale.php";
		document.forms['wholesale_goods'].submit();
	}
}

/* 修复IE6以下版本PNG图片Alpha */
function fixpng() {
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])

	if ((version >= 5.5) && (document.body.filters)) {
		for ( var i = 0; i < document.images.length; i++) {
			var img = document.images[i]
			var imgName = img.src.toUpperCase()
			if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
				var imgID = (img.id) ? "id='" + img.id + "' " : ""
				var imgClass = (img.className) ? "class='" + img.className
						+ "' " : ""
				var imgTitle = (img.title) ? "title='" + img.title + "' "
						: "title='" + img.alt + "' "
				var imgStyle = "display:inline-block;" + img.style.cssText
				if (img.align == "left")
					imgStyle = "float:left;" + imgStyle
				if (img.align == "right")
					imgStyle = "float:right;" + imgStyle
				if (img.parentElement.href)
					imgStyle = "cursor:hand;" + imgStyle
				var strNewHTML = "<span "
						+ imgID
						+ imgClass
						+ imgTitle
						+ " style=\""
						+ "width:"
						+ img.width
						+ "px; height:"
						+ img.height
						+ "px;"
						+ imgStyle
						+ ";"
						+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
						+ "(src=\'" + img.src
						+ "\', sizingMethod='scale');\"></span>"
				img.outerHTML = strNewHTML
				i = i - 1
			}
		}
	}
}

function hash(string, length) {
	var length = length ? length : 32;
	var start = 0;
	var i = 0;
	var result = '';
	filllen = length - string.length % length;
	for (i = 0; i < filllen; i++) {
		string += "0";
	}
	while (start < string.length) {
		result = stringxor(result, string.substr(start, length));
		start += length;
	}
	return result;
}

function stringxor(s1, s2) {
	var s = '';
	var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var max = Math.max(s1.length, s2.length);
	for ( var i = 0; i < max; i++) {
		var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
		s += hash.charAt(k % 52);
	}
	return s;
}

var evalscripts = new Array();
function evalscript(s) {
	if (s.indexOf('<script') == -1)
		return s;
	var p = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/ig;
	var arr = new Array();
	while (arr = p.exec(s))
		appendscript(arr[1], '', arr[2], arr[3]);
	return s;
}

function $$(id) {
	return document.getElementById(id);
}

function appendscript(src, text, reload, charset) {
	var id = hash(src + text);
	if (!reload && in_array(id, evalscripts))
		return;
	if (reload && $$(id)) {
		$$(id).parentNode.removeChild($$(id));
	}
	evalscripts.push(id);
	var scriptNode = document.createElement("script");
	scriptNode.type = "text/javascript";
	scriptNode.id = id;
	//scriptNode.charset = charset;
	try {
		if (src) {
			scriptNode.src = src;
		} else if (text) {
			scriptNode.text = text;
		}
		$$('append_parent').appendChild(scriptNode);
	} catch (e) {
	}
}

function in_array(needle, haystack) {
	if (typeof needle == 'string' || typeof needle == 'number') {
		for ( var i in haystack) {
			if (haystack[i] == needle) {
				return true;
			}
		}
	}
	return false;
}

var pmwinposition = new Array();

var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko')
		&& userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera)
		&& userAgent.substr(userAgent.indexOf('msie') + 5, 3);
function pmwin(action, param) {
	var objs = document.getElementsByTagName("OBJECT");
	if (action == 'open') {
		for (i = 0; i < objs.length; i++) {
			if (objs[i].style.visibility != 'hidden') {
				objs[i].setAttribute("oldvisibility", objs[i].style.visibility);
				objs[i].style.visibility = 'hidden';
			}
		}
		var clientWidth = document.body.clientWidth;
		var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight
				: document.body.clientHeight;
		var scrollTop = document.body.scrollTop ? document.body.scrollTop
				: document.documentElement.scrollTop;
		var pmwidth = 800;
		var pmheight = clientHeight * 0.9;
		if (!$$('pmlayer')) {
			div = document.createElement('div');
			div.id = 'pmlayer';
			div.style.width = pmwidth + 'px';
			div.style.height = pmheight + 'px';
			div.style.left = ((clientWidth - pmwidth) / 2) + 'px';
			div.style.position = 'absolute';
			div.style.zIndex = '999';
			$$('append_parent').appendChild(div);
			$$('pmlayer').innerHTML = '<div style="width: 800px; background: #666666; margin: 5px auto; text-align: left">'
					+ '<div style="width: 800px; height: '
					+ pmheight
					+ 'px; padding: 1px; background: #FFFFFF; border: 1px solid #7597B8; position: relative; left: -6px; top: -3px">'
					+ '<div onmousedown="pmwindrag(event, 1)" onmousemove="pmwindrag(event, 2)" onmouseup="pmwindrag(event, 3)" style="cursor: move; position: relative; left: 0px; top: 0px; width: 800px; height: 30px; margin-bottom: -30px;"></div>'
					+ '<a href="###" onclick="pmwin(\'close\')"><img style="position: absolute; right: 20px; top: 15px" src="images/close.gif" title="关闭" /></a>'
					+ '<iframe id="pmframe" name="pmframe" style="width:'
					+ pmwidth
					+ 'px;height:100%" allowTransparency="true" frameborder="0"></iframe></div></div>';
		}
		$$('pmlayer').style.display = '';
		$$('pmlayer').style.top = ((clientHeight - pmheight) / 2 + scrollTop)
				+ 'px';
		if (!param) {
			pmframe.location = 'pm.php';
		} else {
			pmframe.location = 'pm.php?' + param;
		}
	} else if (action == 'close') {
		for (i = 0; i < objs.length; i++) {
			if (objs[i].attributes['oldvisibility']) {
				objs[i].style.visibility = objs[i].attributes['oldvisibility'].nodeValue;
				objs[i].removeAttribute('oldvisibility');
			}
		}
		hiddenobj = new Array();
		$$('pmlayer').style.display = 'none';
	}
}

var pmwindragstart = new Array();
function pmwindrag(e, op) {
	if (op == 1) {
		pmwindragstart = is_ie ? [ event.clientX, event.clientY ] : [
				e.clientX, e.clientY ];
		pmwindragstart[2] = parseInt($$('pmlayer').style.left);
		pmwindragstart[3] = parseInt($$('pmlayer').style.top);
		doane(e);
	} else if (op == 2 && pmwindragstart[0]) {
		var pmwindragnow = is_ie ? [ event.clientX, event.clientY ] : [
				e.clientX, e.clientY ];
		$$('pmlayer').style.left = (pmwindragstart[2] + pmwindragnow[0] - pmwindragstart[0])
				+ 'px';
		$$('pmlayer').style.top = (pmwindragstart[3] + pmwindragnow[1] - pmwindragstart[1])
				+ 'px';
		doane(e);
	} else if (op == 3) {
		pmwindragstart = [];
		doane(e);
	}
}

function doane(event) {
	e = event ? event : window.event;
	if (is_ie) {
		e.returnValue = false;
		e.cancelBubble = true;
	} else if (e) {
		e.stopPropagation();
		e.preventDefault();
	}
}

/* *
 * 添加礼包到购物车
 */
function addPackageToCart(packageId) {
	var package_info = new Object();
	var number = 1;

	package_info.package_id = packageId
	package_info.number = number;
	jQuery.post('flow.php?step=add_package_to_cart', 'package_info=' + objToJSONString(package_info), addPackageToCartResponse,'JSON' );
	/*Ajax--.call('flow.php?step=add_package_to_cart', 'package_info='
			+ package_info.toJSONString(), addPackageToCartResponse, 'POST',
			'JSON');*/
}

/* *
 * 处理添加礼包到购物车的反馈信息
 */
function addPackageToCartResponse(result) {
	if (result.error > 0) {
		if (result.error == 2) {
			/*
			if (confirm(result.message))
			{
			  location.href = 'user.php?act=add_booking&id=' + result.goods_id;
			}
			 */
			jQuery.post('user.php?act=add_booking&is_ajax=1&package_id=' + result.package_id + "&spec=''", 'content=' + result.message, BookingResponse,'JSON' );
			/*Ajax--.call('user.php?act=add_booking&is_ajax=1&package_id='
					+ result.package_id + "&spec=''", 'content='
					+ result.message, BookingResponse, 'POST', 'JSON');*/
		} else {
			art.dialog.alert(message);
		}
	} else {
		var cartInfo = document.getElementById('ECS_CARTINFO');
		var cart_url = 'flow.php?step=cart';
		if (cartInfo) {
			cartInfo.innerHTML = result.content;
		}

		if (result.one_step_buy == '1') {
			location.href = cart_url;
		} else {
			switch (result.confirm_type) {
			case '1':
				if (confirm(result.message))
					location.href = cart_url;
				break;
			case '2':
				if (!confirm(result.message))
					location.href = cart_url;
				break;
			case '3':
				location.href = cart_url;
				break;
			default:
				break;
			}
		}
	}
}

function setSuitShow(suitId) {
	var suit = document.getElementById('suit_' + suitId);

	if (suit == null) {
		return;
	}
	if (suit.style.display == 'none') {
		suit.style.display = '';
	} else {
		suit.style.display = 'none';
	}
}

/* 以下四个函数为属性选择弹出框的功能函数部分 */
//检测层是否已经存在
function docEle() {
	return document.getElementById(arguments[0]) || false;
}

function select_apec_div(content)
{
	art.dialog({
		id : "LWY-jing",
		lock : true,
		title : "请选择属性！",
		content : content
	});
}
//生成属性选择层
function openSpeDiv(message, goods_id, parent, percent, shopPrice) {
	var _id = "speDiv";
	var m = "mask";
	if (docEle(_id))
		document.removeChild(docEle(_id));
	if (docEle(m))
		document.removeChild(docEle(m));
	//计算上卷元素值
	var scrollPos;
	if (typeof window.pageYOffset != 'undefined') {
		scrollPos = window.pageYOffset;
	} else if (typeof document.compatMode != 'undefined'
			&& document.compatMode != 'BackCompat') {
		scrollPos = document.documentElement.scrollTop;
	} else if (typeof document.body != 'undefined') {
		scrollPos = document.body.scrollTop;
	}

	var i = 0;
	var sel_obj = document.getElementsByTagName('select');
	while (sel_obj[i]) {
		sel_obj[i].style.visibility = "hidden";
		i++;
	}

	// 新激活图层
	var newDiv = document.createElement("div");
	newDiv.id = _id;
	newDiv.style.position = "absolute";
	newDiv.style.zIndex = "10000";
	newDiv.style.width = "300px";
	newDiv.style.height = "260px";
	newDiv.style.top = (parseInt(scrollPos + 200)) + "px";
	newDiv.style.left = (parseInt(document.body.offsetWidth) - 200) / 2 + "px"; // 屏幕居中
	newDiv.style.overflow = "auto";
	newDiv.style.background = "#FFF";
	newDiv.style.border = "3px solid #59B0FF";
	newDiv.style.padding = "5px";

	//生成层内内容
	newDiv.innerHTML = '<h4 style="font-size:14; margin:15 0 0 15;">'
			+ select_spe + "</h4>";

	for ( var spec = 0; spec < message.length; spec++) {
		newDiv.innerHTML += '<hr style="color: #EBEBED; height:1px;"><h6 style="text-align:left; background:#ffffff; margin-left:15px;">'
				+ message[spec]['name'] + '</h6>';

		if (message[spec]['attr_type'] == 1) {
			for ( var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++) {
				if (val_arr == 0) {
					newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_"
							+ message[spec]['attr_id']
							+ "' onclick='is_diy_chang("
							+ '"' + message[spec]['values'][val_arr]['label'] + '"'
							+ ")' value='"
							+ message[spec]['values'][val_arr]['id']
							+ "' id='spec_value_"
							+ message[spec]['values'][val_arr]['id']
							+ "' checked /><font color=#555555>"
							+ message[spec]['values'][val_arr]['label']
							+ '</font> ['
							+ message[spec]['values'][val_arr]['format_price']
							+ ']</font><br />';
					is_diy_chang('"'+ message[spec]['values'][val_arr]['label'] + '"');
				} else {
					newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_"
							+ message[spec]['attr_id']
							+ "' onclick='is_diy_chang("
							+ '"' + message[spec]['values'][val_arr]['label'] + '"'
							+ ")' value='"
							+ message[spec]['values'][val_arr]['id']
							+ "' id='spec_value_"
							+ message[spec]['values'][val_arr]['id']
							+ "' /><font color=#555555>"
							+ message[spec]['values'][val_arr]['label']
							+ '</font> ['
							+ message[spec]['values'][val_arr]['format_price']
							+ ']</font><br />';
				}
			}
			newDiv.innerHTML += "<input type='hidden' name='spec_list' value='"
					+ val_arr + "' />";
		} else {
			for ( var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++) {
				newDiv.innerHTML += "<input style='margin-left:15px;' type='checkbox' name='spec_"
						+ message[spec]['attr_id']
						+ "' value='"
						+ message[spec]['values'][val_arr]['id']
						+ "' id='spec_value_"
						+ message[spec]['values'][val_arr]['id']
						+ "' /><font color=#555555>"
						+ message[spec]['values'][val_arr]['label']
						+ ' ['
						+ message[spec]['values'][val_arr]['format_price']
						+ ']</font><br />';
			}
			newDiv.innerHTML += "<input type='hidden' name='spec_list' value='"
					+ val_arr + "' />";
		}
	}
	newDiv.innerHTML += "<br /><center>[<a href='javascript:submit_div("
			+ goods_id
			+ ","
			+ parent
			+ ","
			+ percent
			+ ","
			+ shopPrice
			+ ")' class='f6' >"
			+ btn_buy
			+ "</a>]&nbsp;&nbsp;[<a href='javascript:cancel_div()' class='f6' >"
			+ is_cancel + "</a>]</center>";
	document.body.appendChild(newDiv);

	// mask图层
	var newMask = document.createElement("div");
	newMask.id = m;
	newMask.style.position = "absolute";
	newMask.style.zIndex = "9999";
	newMask.style.width = document.body.scrollWidth + "px";
	newMask.style.height = document.body.scrollHeight + "px";
	newMask.style.top = "0px";
	newMask.style.left = "0px";
	newMask.style.background = "#FFF";
	newMask.style.filter = "alpha(opacity=30)";
	newMask.style.opacity = "0.40";
	document.body.appendChild(newMask);
}
function is_diy_chang(sttr)
{
	if(sttr.match("定制"))
	{
		LWY_GOODS_CURRENT_ACTION = 'addToDiy';
	}
	else
	{
		LWY_GOODS_CURRENT_ACTION = 'addToCart';
	}
}
//获取选择属性后，再次提交到购物车
function submit_div(goods_id, parentId, percent, shopPrice) {
	var goods = new Object();
	var spec_arr = new Array();
	var fittings_arr = new Array();
	var number = 1;
	var input_arr = document.getElementsByTagName('input');
	var quick = 1;

	var spec_arr = new Array();
	var j = 0;

	for (i = 0; i < input_arr.length; i++) {
		var prefix = input_arr[i].name.substr(0, 5);

		if (prefix == 'spec_'
				&& (((input_arr[i].type == 'radio' || input_arr[i].type == 'checkbox') && input_arr[i].checked))) {
			spec_arr[j] = input_arr[i].value;
			j++;
		}
	}
	goods.fittings = fittings_arr;
	goods.quick = quick;
	goods.spec = spec_arr;
	goods.goods_id = goods_id;
	goods.number = number;
	goods.percent = percent;
	
	goods.shop_price = shopPrice;
	goods.parent = (typeof (parentId) == "undefined") ? 0 : parseInt(parentId);
	if(LWY_GOODS_CURRENT_ACTION == 'addToDiy' && !goods.parent)
	{
		location.href = 'diy.php?act=submitData&goods_id=' + goods_id
		+ '&goods=' + BASE64.encode(objToJSONString(goods));
	}
	else
	{
		jQuery.post('flow.php?step=add_to_cart', 'goods=' + BASE64.encode(objToJSONString(goods)), addToCartResponse,'JSON' );
		/*Ajax--.call('flow.php?step=add_to_cart', 'goods=' + goods.toJSONString(),
				addToCartResponse, 'POST', 'JSON');*/
	
		document.body.removeChild(docEle('speDiv'));
		document.body.removeChild(docEle('mask'));
	
		var i = 0;
		var sel_obj = document.getElementsByTagName('select');
		while (sel_obj[i]) {
			sel_obj[i].style.visibility = "";
			i++;
		}
	}
}

// 关闭mask和新图层
function cancel_div() {
	document.body.removeChild(docEle('speDiv'));
	document.body.removeChild(docEle('mask'));

	var i = 0;
	var sel_obj = document.getElementsByTagName('select');
	while (sel_obj[i]) {
		sel_obj[i].style.visibility = "";
		i++;
	}
}
/* *
 * 将对象转换成json格式allen add start
 * 从ecshop原版transport移植过来
 */
if ( ! Object.prototype.toJSONString) {
/*    Array.prototype.toJSONString = function () {
        var a = ['['], // The array holding the text fragments.
            b,         // A boolean indicating that a comma is required.
            i,         // Loop counter.
            l = this.length,
            v;         // The value to be stringified.

        function p(s) {

            // p accumulates text fragments in an array. It inserts a comma before all
            // except the first fragment.

            if (b) {
              a.push(',');
            }
            a.push(s);
            b = true;
        }

        // For each value in this array...

        for (i = 0; i < l; i ++) {
            v = this[i];
            switch (typeof v) {

            // Values without a JSON representation are ignored.

            case 'undefined':
            case 'function':
            case 'unknown':
                break;

            // Serialize a JavaScript object value. Ignore objects thats lack the
            // toJSONString method. Due to a specification error in ECMAScript,
            // typeof null is 'object', so watch out for that case.

            case 'object':
                if (v) {
                    if (typeof v.toJSONString === 'function') {
                        p(v.toJSONString());
                    }
                } else {
                    p("null");
                }
                break;

            // Otherwise, serialize the value.

            default:
                p(v.toJSONString());
            }
        }

        // Join all of the fragments together and return.

        a.push(']');
        return a.join('');
    };

    Boolean.prototype.toJSONString = function () {
        return String(this);
    };

    Date.prototype.toJSONString = function () {

        // Ultimately, this method will be equivalent to the date.toISOString method.

        function f(n) {

            // Format integers to have at least two digits.

            return n < 10 ? '0' + n : n;
        }

        return '"' + this.getFullYear() + '-' +
                f(this.getMonth() + 1) + '-' +
                f(this.getDate()) + 'T' +
                f(this.getHours()) + ':' +
                f(this.getMinutes()) + ':' +
                f(this.getSeconds()) + '"';
    };

    Number.prototype.toJSONString = function () {

        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(this) ? String(this) : "null";
    };

    Object.prototype.toJSONString = function () {
        var a = ['{'],  // The array holding the text fragments.
            b,          // A boolean indicating that a comma is required.
            k,          // The current key.
            v;          // The current value.

        function p(s) {

            // p accumulates text fragment pairs in an array. It inserts a comma before all
            // except the first fragment pair.

            if (b) {
                a.push(',');
            }
            a.push(k.toJSONString(), ':', s);
            b = true;
        }

        // Iterate through all of the keys in the object, ignoring the proto chain.

        for (k in this) {
            if (this.hasOwnProperty(k)) {
                v = this[k];
                switch (typeof v) {

                // Values without a JSON representation are ignored.

                case 'undefined':
                case 'function':
                case 'unknown':
                    break;

                // Serialize a JavaScript object value. Ignore objects that lack the
                // toJSONString method. Due to a specification error in ECMAScript,
                // typeof null is 'object', so watch out for that case.

                case 'object':
                    if (this !== window)
                    {
                      if (v) {
                          if (typeof v.toJSONString === 'function') {

                              p(v.toJSONString());
                          }
                      } else {
                          p("null");
                      }
                    }
                    break;
                default:
                    p(v.toJSONString());
                }
            }
        }

          // Join all of the fragments together and return.

        a.push('}');
        return a.join('');
    };

    (function (s) {

        // Augment String.prototype. We do this in an immediate anonymous function to
        // avoid defining global variables.

        // m is a table of character substitutions.

        var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };

        s.parseJSON = function (filter) {

            // Parsing happens in three stages. In the first stage, we run the text against
            // a regular expression which looks for non-JSON characters. We are especially
            // concerned with '()' and 'new' because they can cause invocation, and '='
            // because it can cause mutation. But just to be safe, we will reject all
            // unexpected characters.

            try {
                if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.
                        test(this)) {

                    // In the second stage we use the eval function to compile the text into a
                    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                    // in JavaScript: it can begin a block or an object literal. We wrap the text
                    // in parens to eliminate the ambiguity.

                    var j = eval('(' + this + ')');

                    // In the optional third stage, we recursively walk the new structure, passing
                    // each name/value pair to a filter function for possible transformation.

                    if (typeof filter === 'function') {

                        function walk(k, v) {
                            if (v && typeof v === 'object') {
                                for (var i in v) {
                                    if (v.hasOwnProperty(i)) {
                                        v[i] = walk(i, v[i]);
                                    }
                                }
                            }
                            return filter(k, v);
                        }

                        j = walk('', j);
                    }
                    return j;
                }
            } catch (e) {

            // Fall through if the regexp test fails.

            }
            throw new SyntaxError("parseJSON");
        };

        s.toJSONString = function () {

          // If the string contains no control characters, no quote characters, and no
          // backslash characters, then we can simply slap some quotes around it.
          // Otherwise we must also replace the offending characters with safe
          // sequences.

          // add by weberliu @ 2007-4-2
          var _self = this.replace("&", "%26");

          if (/["\\\x00-\x1f]/.test(this)) {
              return '"' + _self.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                  var c = m[b];
                  if (c) {
                      return c;
                  }
                  c = b.charCodeAt();
                  return '\\u00' +
                      Math.floor(c / 16).toString(16) +
                      (c % 16).toString(16);
              }) + '"';
          }
          return '"' + _self + '"';
        };
    })(String.prototype);*/
	function objToJSONString(obj, filter){
		return JSON.stringify(obj, filter);   
	}   
	   
	function parseObjectToJSON(object, filter){   
		return JSON.parse(object, filter);   
	}  
}
//将对象转换成json格式end

/* *
 * 地区选择代码allen add start
 * 从ecshop原版region.js移植过来
 */
var region = new Object();

region.isAdmin = false;
region.loadRegions = function(parent, type, target)
{
  //Ajax--.call(region.getFileName(), 'type=' + type + '&target=' + target + "&parent=" + parent , region.response, "GET", "JSON");
  jQuery.get( region.getFileName(),'type=' + type+ '&target=' + target + "&parent=" + parent,region.response,'JSON' );
}

/* *
 * 载入指定的国家下所有的省份
 *
 * @country integer     国家的编号
 * @selName string      列表框的名称
 */
region.loadProvinces = function(country, selName)
{
  var objName = (typeof selName == "undefined") ? "selProvinces" : selName;

  region.loadRegions(country, 1, objName);
}

/* *
 * 载入指定的省份下所有的城市
 *
 * @province    integer 省份的编号
 * @selName     string  列表框的名称
 */
region.loadCities = function(province, selName)
{
  var objName = (typeof selName == "undefined") ? "selCities" : selName;

  region.loadRegions(province, 2, objName);
}

/* *
 * 载入指定的城市下的区 / 县
 *
 * @city    integer     城市的编号
 * @selName string      列表框的名称
 */
region.loadDistricts = function(city, selName)
{
  var objName = (typeof selName == "undefined") ? "selDistricts" : selName;
  
  region.loadRegions(city, 3, objName);
}

/* *
 * 处理下拉列表改变的函数
 *
 * @obj     object  下拉列表
 * @type    integer 类型
 * @selName string  目标列表框的名称
 */
region.changed = function(obj, type, selName)
{
	var parent = obj.options[obj.selectedIndex].value;
	region.addAdress(obj,type);
	region.loadRegions(parent, type, selName);
}

region.response = function(result, text_result)
{
  var sel = document.getElementById(result.target);

  sel.length = 1;
  sel.selectedIndex = 0;
  sel.style.display = (result.regions.length == 0 && ! region.isAdmin && result.type + 0 == 3) ? "none" : '';

  if (document.all)
  {
    sel.fireEvent("onchange");
  }
  else
  {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent('change', true, true);
    sel.dispatchEvent(evt);
  }

  if (result.regions)
  {
    for (i = 0; i < result.regions.length; i ++ )
    {
      var opt = document.createElement("OPTION");
      opt.value = result.regions[i].region_id;
      opt.text  = result.regions[i].region_name;

      sel.options.add(opt);
    }
  }
}

region.getFileName = function()
{
  if (region.isAdmin)
  {
    return "../region.php";
  }
  else
  {
    return "region.php";
  }
}
/*region.addAdress=function(obj,sn,type)
{
	if(document.getElementById("address_"+sn))
	{
		if(obj.options[obj.selectedIndex].value!=0&&type!=1){
			if(document.getElementById("address_"+sn).value.split("-").length>type-1){
				var arr=document.getElementById("address_"+sn).value.split("-");
				var add_str="";
				for(var i=0; i<type-2; i++){
					add_str+=arr[i]+"-";
				}
				add_str+=obj.options[obj.selectedIndex].text+"-";
				document.getElementById("address_"+sn).value=add_str;
			}else{
				document.getElementById("address_"+sn).value+=obj.options[obj.selectedIndex].text+"-";
			}
		}
	}
	else if(document.getElementById("address"))
	{
		if(obj.options[obj.selectedIndex].value!=0&&type!=1){
			if(document.getElementById("address").value.split("-").length>type-1){
				var arr=document.getElementById("address").value.split("-");
				var add_str="";
				for(var i=0; i<type-2; i++){
					add_str+=arr[i]+"-";
				}
				add_str+=obj.options[obj.selectedIndex].text+"-";
				document.getElementById("address").value=add_str;
			}else{
				document.getElementById("address").value+=obj.options[obj.selectedIndex].text+"-";
			}
		}
	}
}*/
region.addAdress=function(obj,type)
{
	if(obj.options[obj.selectedIndex].value!=0&&type!=1&&document.getElementById("add_a")){
		if(type==2){
			document.getElementById("add_a").innerHTML=obj.options[obj.selectedIndex].text;
			document.getElementById("add_b").innerHTML="";
			document.getElementById("add_c").innerHTML="";
		}
		if(type==3){
			document.getElementById("add_b").innerHTML=obj.options[obj.selectedIndex].text;
			document.getElementById("add_c").innerHTML="";
		}
		if(type==4){
			document.getElementById("add_c").innerHTML=obj.options[obj.selectedIndex].text;
		}
	}

}
//地区选择代码end
/**
 * 添加配件到购物车
 */
function fittings_to_flow(goodsId, parentId, percent, shopPrice, spec_arr)
{
	var goods        	= new Object();
	var number       	= 1;
	if(spec_arr == "")
		spec_arr = new Array(); 
	goods.spec     = spec_arr;
	goods.goods_id = goodsId;
	goods.number   = number;
	goods.parent   = parentId;
	goods.percent  = percent;
	goods.shop_price = shopPrice;
	if(LWY_GOODS_CURRENT_ACTION != 'addToDiy'){
	 jQuery.post('flow.php?step=add_to_cart', 'goods=' + BASE64.encode(objToJSONString(goods)), fittings_to_flow_response,'JSON' );
	 /*Ajax--.call('flow.php?step=add_to_cart', 'goods=' + goods.toJSONString(), fittings_to_flow_response, 'POST', 'JSON');*/
	}
	else
	{
		var urlStr = objToJSONString(goods);
		var encodeUrlStr = BASE64.encode(urlStr);
		location.href = 'diy.php?act=submitData&goods_id=' + goodsId
				+ '&goods=' + encodeUrlStr;
	}
}
function fittings_to_flow_response(result)
{
  if (result.error > 0)
  {
    // 如果需要缺货登记，跳转
    if (result.error == 2)
    {
      if (confirm(result.message))
      {
        location.href = 'user.php?act=add_booking&id=' + result.goods_id;
      }
    }
   // else if (result.error == 6)
    //{
    //  openSpeDiv(result.message, result.goods_id, result.parent, result.percent, result.shopPrice);
    //}
    else if (result.error == 6){
    	fittings_spec_info = eval ('('+result.spec_info+')');
		art.dialog({
			id : "LWY-spec",
			width:"300px",
			lock : true,
			title : "请选择属性！",
			content : result.content
		});
		$("#add_to_cart_button").click(function(){//绑定弹出框中购买按钮的事件
			var spec_arr = new Array();
			var spec =  $("#_spec input.fitting_spec_selected[data-goods_id='"+result.goods_id+"']").val()
			if(spec == '' || spec == undefined){
				art.dialog.list['LWY-spec'].shake && art.dialog.list['LWY-spec'].shake();// 调用抖动接口
				show_message('还有规格没有选');
				return;
			}
			spec_arr.push(spec);
			fittings_to_flow(result.goods_id,result.parent,result.percent,result.shopPrice,spec_arr);
		});
	}
    else
    {
      alert(result.message);
    }
  }
  else
  {
    location.href = 'flow.php';
  }
}
//删除数组元素.
Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}
//在数组中获取指定值的元素索引
Array.prototype.getIndexByValue= function(value)
{
    var index = -1;
    for (var i = 0; i < this.length; i++)
    {
        if (this[i] == value)
        {
            index = i;
            break;
        }
    }
    return index;
}
//查看一个值是否存在于数组中
Array.prototype.S=String.fromCharCode(2);
Array.prototype.in_array=function(e)
{
    var r=new RegExp(this.S+e+this.S);
    return (r.test(this.S+this.join(this.S)+this.S));
}
//把一个对象的所有键重新组成一个数组
function getObjectKeys(object) 
{
    var keys = [];
    for (var property in object)
      keys.push(property);
    return keys;
}
//把一个对像的值重新组成一个数组
function getObjectValues(object) 
{
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
}
//去除数组中重复的值
Array.prototype.del = function() { 
	var a = {}, c = [], l = this.length; 
	for (var i = 0; i < l; i++) { 
		var b = this[i]; 
		var d = (typeof b) + b; 
		if (a[d] === undefined) { 
			c.push(b); 
			a[d] = 1; 
		} 
	}
	return c; 
} 
/**
 * 分类面和搜索页弹出我喜欢窗口
 */
function pop_ilike(id,em){
	$("#showfav").remove();
	var innerHtml = '<span class="redup"></span><a class="closeThis"><img src="themes/default/images/ilikex.gif" style="width:25px; height:24px;" /></a><div class="love_gift">';
	innerHtml += '<span class="span1" id="re_msg"></span>';
	innerHtml += '<span class="span2">我喜欢它用来：<input type="radio"  name="for_who" checked="checked" value="1">送自己</input><input type="radio"  name="for_who" value="0" >送别人</input></span>';
	innerHtml += '<div class="span3">喜爱程度：<div class="span4" id="stars-fav-tips"></div></div>';
	innerHtml += '<ul class="rating-level" id="starsFav">';
	innerHtml += '<li><a class="one-star" star:value="1" href="javascript:void(0)">1</a></li>';
	innerHtml += '<li><a class="two-stars" star:value="2" href="javascript:void(0)">2</a></li>';
	innerHtml += '<li><a class="three-stars" star:value="3" href="javascript:void(0)">3</a></li>';
	innerHtml += '<li><a class="four-stars" star:value="4" href="javascript:void(0)">4</a></li>';
	innerHtml += '<li><a class="five-stars" star:value="5" href="javascript:void(0)">5</a></li>';
	innerHtml += '<li><a class="six-stars" star:value="6" href="javascript:void(0)">6</a></li>';
	innerHtml += '<li><a class="seven-stars" star:value="7" href="javascript:void(0)">7</a></li>';
	innerHtml += '<li><a class="eight-stars" star:value="8" href="javascript:void(0)">8</a></li>';
	innerHtml += '<li><a class="night-stars" star:value="9" href="javascript:void(0)">9</a></li>';
	innerHtml += '<li><a class="ten-stars" star:value="10" href="javascript:void(0)">10</a></li></ul>';
	innerHtml += '<span></span>';
	innerHtml += '<input type="hidden" id="fav_rank" name="fav_rank" value="5" /><input type="hidden" id="goods_id" value="'+id+'" />';
	innerHtml += '<div class="clear"></div></div>';
	innerHtml += '<div class="blank15"></div>';
	var offset = $(em).offset();
	var div = $('<div id="showfav"></div>').css({top:(offset.top+30)+'px',left:offset.left+'px',position:'absolute', height:'auto', width:'327px', display:'none','z-index':'1000'});
	div.html(innerHtml);
	$(div).appendTo('body');
	div.fadeIn("fast");
	$(".closeThis").click(function(){
		$("#showfav").remove();
	});
//showdiv(document.getElementById('fav_link'), innerHtml, 0, 0, false, true);
var StarsILikeIt = new Stars("starsFav",{Input:"fav_rank", Tips:"stars-fav-tips",  nowClass:"current-rating",tipsTxt:["一般般","一般般","还行吧","还行吧","喜欢它","喜欢它","很喜欢","很喜欢","想立刻得到它","想立刻得到它"],  isFav:true});	
}
/*
 * 喜欢程度评分
 */
function FavSeclect(){
	var fav_rank = document.getElementById("fav_rank").value;
	//取得选择的值
	var for_who = GetRadioValue("for_who");
	var goods_id = $('#showfav #goods_id').val();
	var goods_id =  goods_id != undefined ? goods_id :goodsId;
	jQuery.post('user.php?act=insert_fav_rank', 'is_ajax=1&fav_rank=' + fav_rank + '&for_who=' + for_who + '&goods_id=' + goods_id, checkLoginResponse,'JSON' );
	/*Ajax--.call('user.php?act=insert_fav_rank', 'is_ajax=1&fav_rank=' + fav_rank + '&for_who=' + for_who + '&goods_id=' + {$goods.goods_id}, checkLoginResponse, 'POST', 'JSON');*/
}

/*
 * 检查是否登录反馈
 */
 function checkLoginResponse(result){
	var error = parseInt(result.error);
	var fav_rank = result.fav_rank;
	
	switch (error) {
	case 0:
		//评价成功
		//if(document.getElementById("pc_inner1"))
		//fun("pc_inner1");
		$("#showfav").html('<div id="pc_inner1" style="position:absolute; display:none; color:#ffc7a2; font-size:14px; font-weight:700; left:30px; top:10px; height:30px; line-height:30px; width:140px; text-align:center; z-index:999; background:url(themes/default/images/popupcredit_bg1.png)">评价成功</div>');
		$("#pc_inner1").fadeIn("fast").delay(3000).fadeOut('fast');
		
		break;
		
	case 1:
		$("#showfav").remove();
		ShowLoginWindows('login');//弹出登陆框
		break;	

	default:
		$("#re_msg").show();
		$("#re_msg").html(result.message).css("color","#f5617b");
		break;
	}
}

/**
 * 取得radio选中的值
 */
function GetRadioValue(RadioName){
    var obj;    
    obj=document.getElementsByName(RadioName);
    if(obj!=null){
        var i;
        for(i=0;i<obj.length;i++){
            if(obj[i].checked){
                return obj[i].value;            
            }
        }
    }
    return null;
}

