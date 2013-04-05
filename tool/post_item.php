<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<body>

<form action="post_item.php" method="post">
<textarea name="mysql" cols="150" rows="30"></textarea>
<input type="submit" />
</form>

</body>
</html>

<?php
		define('FANWE_ROOT',dirname(__FILE__).'/../');
		include FANWE_ROOT.'db.php';
		
	$mysql = $_POST['mysql'];
	if($mysql==null || $mysql==''){
		
	}else{
		//$result = mysql_query($mysql);
	}
	
	$result = mysql_query("select count(1) as cc from t_item");
	if($row = mysql_fetch_array($result)){
	   echo "总共有商品：<b>".$row['cc']." </b>件";
	}

	mysql_close($con);

?>