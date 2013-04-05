<?php 
include  FANWE_ROOT.'db.php';
$sqlstr="SELECT * FROM t_item_pos t1,t_item t2 where t1.pos_page=2 and t1.item_id=t2.Fitem_id";
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
$pos='relgift_1_';
?>
<div class="detail_right borderstyle" style="height:450px;">
<h1><img style="width: 32px; height: 29px;"
	src="images/birthday_gif.gif">相关礼物</h1>
<div class="trees_line_goods">&nbsp;</div>
<div class="goods_border">
<div class="related_gds">

<?php 
$i=1;
while($i<=4)
  {

?>
<ul>
	<li class="li_img"><a target="_blank" href="detail.php?item_id=<?php echo $arr['id_'.$pos.$i];?>"><img
		class="B_blue" style="width:80px;height:80px;"
		src="<?php echo $arr['pic_'.$pos.$i];?>"></a></li>
	<li class="li_text"><a title="hello kitty" target="_blank"
		href="detail.php?item_id=<?php echo $arr['id_'.$pos.$i];?>"><?php echo $arr['title_'.$pos.$i];?></a></li>
	<li class="li_text"><font class="f1">￥<?php echo $arr['price_'.$pos.$i];?>元</font></li>
</ul>
<div class="clean"></div>
<?php   
$i++;
} ?>


<div class="blank10"></div>
</div>
</div>

</div>


