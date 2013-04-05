

<?php include("header.php"); ?>

<div class="div_body"><?php include("menu.php"); ?>

<div class="blank10"></div>

<div class="div_center">
<?php include("category.php"); ?>
<div class="blank15"></div>
<div class="partline"></div>


<div class="blank10"></div>

<div style="width: 987px;" class="div_center">
<div id="container" style="position: relative; height: 100%;" class="masonry">


<div class="detail_left">

<?php 

$item_id=$_GET["item_id"];

include FANWE_ROOT.'db.php';
	
$result = mysql_query("SELECT * FROM t_item where Fitem_id=".$item_id);
$item = array(); 

while($row = mysql_fetch_array($result)){
$item['item_id']=$row['Fitem_id'];
$item['title']=$row['Fitem_title'];
$item['price']=$row['Fitem_price'];
$item['num']=$row['Fitem_sell_num'];
$item['pic_url']=$row['Fitem_photo_addr'];
$item['detail_url']=$row['Fitem_source_url'];
$item['item_desc']=$row['Fitem_desc'];

include("detail/item_info.php"); 

}

?>
</div>

</div>

</div>

</div>

<!--  end detail --> 

<?php include("detail/rel_gift.php");?>


<div class="blank5"></div>

<?php

include("detail/rel_item_detail.php");

?></div>
</div>
</form>

