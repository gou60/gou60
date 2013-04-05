
<?php include("header.php"); ?>

<div class="div_body"><?php include("menu.php"); ?>

<div class="blank10"></div>

<div class="div_center">

<div class="blank10"></div>

<?php include("category.php"); ?>

<div class="blank15"></div>
<div class="partline"></div>
<div class="blank15"></div>



<div class="blank10"></div>

<form onsubmit="return compareGoods(this);" id="compareForm" name="compareForm" method="post" action="compare.php">
<div class="blank"></div>
<div style="width: 987px;" class="div_center">
<div id="container" style="position: relative; height: 2000px;" class="masonry">


<?php
include  FANWE_ROOT.'db.php';

$Fclass_leaf_id=$_GET["id"];
$sqlstr="SELECT * FROM t_item where Fclass_leaf_id=".$Fclass_leaf_id;

$result = mysql_query($sqlstr);

	$myArr =array();
$i=0;
$top=0;
while($row = mysql_fetch_array($result)){
	
  	$arr =array();
  	$arr['item_id']=$row['Fitem_id'];
  	$arr['title']=$row['Fitem_title'];
  	$arr['price']=$row['Fitem_price'];
  	$arr['num']=$row['Fitem_sell_num'];
  	$arr['pic_url']=$row['Fitem_photo_addr'];
  	
  	$myArr[$i]=$arr;
  	$i=$i+1;
  	
  	if($i%4==0){
  		
  		include("scene/category_item_list.php");
  		$i=0;
  		$top=$top+290;
  	}
  	
  }

mysql_close($con);


?>



</div>
</div>
</form>

<?php include("footer.php"); ?>