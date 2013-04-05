<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<body>

<form action="save_item.php" method="post">
item_url: <input type="text" name="item_url" style="width:800px" autocomplete="off">
<input type="submit" />
</form>

</body>
</html>

<?php
		define('FANWE_ROOT',dirname(__FILE__).'/../');
		include FANWE_ROOT.'db.php';

	$result = mysql_query("SELECT * FROM t_item");
	
	echo "总共有商品：<b>".mysql_num_rows($result)." </b>件";

	$result = mysql_query("SELECT * FROM t_item limit 10");
	
	while($row = mysql_fetch_array($result))
  {
 	 echo "<br>=================>>>><br>item_id=".$row['Fitem_id'].",<br>title=".$row['Fitem_title'].",<br>price=".$row['Fitem_price'].",<br>num=".$row['Fitem_sell_num'].",<br>detail_url=".$row['Fitem_source_url'].",<br>pic_url=".$row['Fitem_photo_addr'];
	 echo "<br><img src=".$row['Fitem_photo_addr']." style='height:200px;width:200px;'>";
 	 echo "<br />";
  }


  
mysql_close($con);





?>