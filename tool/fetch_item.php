<?php

define('FANWE_ROOT',dirname(__FILE__).'/../');

include_once FANWE_ROOT.'sdks/taobao/TopClient.php';
include_once FANWE_ROOT.'sdks/taobao/sharegoods.service.php';

include FANWE_ROOT.'db.php';

$result = mysql_query("select * from t_item_source_url where Fclass_leaf_id>110000");

ignore_user_abort(); // 后台运行
set_time_limit(0); // 取消脚本运行时间的超时上限

$mycount=0;
 while($row = mysql_fetch_array($result)){
 	
	
	$itemurl=$row['Furl'];
	$Fclass_leaf_id=$row['Fclass_leaf_id'];
	
	//echo $mycount.'---url--:'.$itemurl.'<br>';
	//echo '---url--:'.$Fclass_leaf_id.'<br>';
	  try{

		 $share_module = new SharegoodsService($itemurl,$Fclass_leaf_id);

		 $share_module->fetch();

		 $mycount++;
	  }catch(Exception $e){
	  	echo 'Message: ' .$e->getMessage();
	 }

}


	echo '---done--:'.$mycount.'<br>';
?>
