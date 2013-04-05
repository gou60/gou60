<?php include("header.php"); ?>

<div class="div_body">

<?php include("menu.php"); ?>
  
  
  <div class="blank10"></div>
    <div class="div_center">
  <a href="http://www.tmall.com/"><img src="images/ad/banner.jpg" /></a>
  </div>
   <div class="blank10"></div>

<div class="div_center">

<?php include("ad.php"); ?>

<div class="blank10"></div>

<?php include("category.php"); ?>

<div class="blank15"></div>
<div class="partline"></div>
<div class="blank15"></div>
<div class="div_center">
	
<?php 
include  FANWE_ROOT.'db.php';
$sqlstr="SELECT * FROM t_item_pos t1,t_item t2 where t1.pos_page=1 and t1.item_id=t2.Fitem_id";
$result = mysql_query($sqlstr);

$arr =array();
while($row = mysql_fetch_array($result)){
	$key=$row['pos_key'];
  	$arr['id_'.$key]=$row['Fitem_id'];
  	$arr['title_'.$key]=$row['Fitem_title'];
  	$arr['pic_'.$key]=$row['Fitem_photo_addr'];
  	$arr['price_'.$key]=$row['Fitem_price'];
  	$arr['url_'.$key]=$row['Fitem_source_url'];

  }

mysql_close($con);

$pos='news_1_';
$head="new_head";
include("home/new.php"); 

echo "<span class=\"space\"></span>";

$pos='news_2_';
$head="hot_head";
include("home/new.php"); 

echo "<div class=\"blank10\"></div>";
	
$pos='birthday_1_';
$sends_title="生日礼物";
$sends_style="span_bth1";
$sends_style2="span_bth2";
include("home/item_list.php");

$pos='bus_1_';
$sends_title="商务礼物";
$sends_style="span_bsi1";
$sends_style2="span_bsi2";
include("home/item_list.php");

$pos='flowers_1_';
$sends_title="鲜花蛋糕";
$sends_style="span_flo1";
$sends_style2="span_flo2";
include("home/item_list.php");

$pos='man_1_';
$sends_title="送男友/男士";
$sends_style="span_bf1";
$sends_style2="span_bf2";
include("home/item_list.php");

	
$pos='girl_1_';
$sends_title="送女友/女士";
$sends_style="span_gf1";
$sends_style2="span_gf2";
include("home/item_list.php");

echo "</div>";

include("footer.php");

