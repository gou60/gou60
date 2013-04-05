
<?php
$itemurl=$_POST["item_url"];

if($itemurl==''){
   $itemurl =$url;
}

echo  '-------------'.$itemurl;

if($itemurl!=''){

//add_item
define('FANWE_ROOT',dirname(__FILE__).'/../');
include_once FANWE_ROOT.'sdks/taobao/TopClient.php';
include_once FANWE_ROOT.'sdks/taobao/sharegoods.service.php';

echo  '-------------';

$share_module = new SharegoodsService($itemurl,10000000);

$share_module->fetch();



}
?>

<script>
 //location.href="add_item.php";
</script>