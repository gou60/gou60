<div class="borderstyle" id="goodsInfo" style="height:450px;">

<div class="blank"></div>
<div class="cont_head">
<h1><strong><?php echo $item['title'];?> </strong></h1>
</div>
<div class="left_pic">

<div class="clearfix"><a rel="gal1" class="jqzoom"
	href="<?php echo $item['pic_url'];?>"
	style="outline-style: none; text-decoration: none;" title="">
<div class="zoomPad"><img width="350" height="350" class="pic1" id="pic1" src="<?php echo $item['pic_url'];?>" title="" style="opacity: 1;">

<div class="zoomPup"
	style="display: none; top: -1px; left: -1px; width: 196px; height: 196px; position: absolute; border-width: 1px;"></div>
<div class="zoomWindow"
	style="position: absolute; z-index: 5001; left: 360px; top: 0px; display: none;">
<div class="zoomWrapper" style="width: 420px;">
<div class="zoomWrapperTitle"
	style="width: 100%; position: absolute; display: block;">undefined</div>
<div class="zoomWrapperImage" style="width: 100%; height: 420px;"><img
	style="position: absolute; border: 0px none; display: block; left: 0px; top: 0px;"
	src="<?php echo $item['pic_url'];?>"></div>
</div>
</div>
<div class="zoomPreload"
	style="visibility: hidden; top: 153.5px; left: 130px; position: absolute;">加载中…</div>
</div>
</a></div>
<div class="blank"></div>
 
</div>



<div class="left_content">
<hr
	style="height: 1px; border: none; border-top: 1px solid #f0f0f0; margin: 0 0 0 25px; *margin: 0 0 -14px 25px; float: none; *float: left; display: block; clear: both;">
<div class="blank"></div>
<form id="ECS_FORMBUY" name="ECS_FORMBUY" method="post"
	action="javascript:addToCart(554)">
<ul id="goods_details_arear" class="goods_inf1">
	<li></li>
	
	<li></li>
	<li class="lwy_price">
	<div id="ecs_rankprice_area">您的价格：<font size="3" color="#ed145b" class="shop">
	<strong><span discount="100" unformate_price="99.00"
		id="ECS_RANKPRICE_LIWUYOU">￥<?php echo $item['price'];?>元</span>
		</strong></font></div>
	</li>
</ul>
<div class="blank"></div>
<hr
	style="height: 1px; border: none; border-top: 1px solid #f0f0f0; margin: 0 0 0 25px; *margin: 0 0 -14px 25px; float: none; *float: left; display: block; clear: both;">
<div class="blank"></div>

<div class="clean" id="style_blank"></div>

<div
	style="background-color: rgb(249, 249, 249); border-color: rgb(237, 237, 237);"
	class="handle">


<div id="goods_attr_area"><input type="hidden" id="spec_selected"
	name="spec_list" class="spec_selected" value=""></div>

<div class="blank5"></div>
<div class="cont_buttom">
<a class="favlink" href="javascript:showFavWin();"><img src="images/fav.gif" id="fav_link"></a> 
<a target="_blank" href="<?php echo $item['detail_url'];?>" class="cartlink" id="addToCartLink"><img src="images/buy.gif" id="addToCartImg"></a>

<div class="clear"></div>

</div>

