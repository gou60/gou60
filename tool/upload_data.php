<?php

define('FANWE_ROOT',dirname(__FILE__).'/../');

include_once FANWE_ROOT.'sdks/taobao/TopClient.php';
include_once FANWE_ROOT.'sdks/taobao/sharegoods.service.php';

include FANWE_ROOT.'db.php';

$result = mysql_query("select * from t_item_source_url where Fclass_leaf_id>110000");

ignore_user_abort(); // 后台运行
set_time_limit(0); // 取消脚本运行时间的超时上限

$filename =$_GET['filename'];
$file = FANWE_ROOT."data/".$filename;

echo $file;

 $sql = file_get_contents($file);


	echo '---done--:'.$sql.'<br>';
?>
