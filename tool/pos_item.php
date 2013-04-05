<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<body>
<form action="pos_item.php" method="post">
&nbsp;&nbsp;页面: <select name="pos_page">
<option value="1" <?php if($_POST['pos_page']=='1')echo "selected='true'";?>>首页</option>
<option value="2" <?php if($_POST['pos_page']=='2')echo "selected='true'";?>>详情关联商品</option>
</select><br>
&nbsp;&nbsp;位置: <input type="text" name="pos_key" style="width:200px" autocomplete="off"><br>
商品id: <input type="text" name="item_id" style="width:200px" autocomplete="off"><br>
<input type="submit" />
</form>


<?php

define('FANWE_ROOT',dirname(__FILE__).'/../');

include FANWE_ROOT.'db.php';


    try{

    	$pos_page=$_POST['pos_page'];
    	$pos_key=$_POST['pos_key'];
    	$item_id=$_POST['item_id'];
    	
    	if($pos_page==null || $pos_page=='' || $pos_key=='' || $pos_key==null || $item_id==null || $item_id==''){
    	
    	}else{
    		
    	$result =mysql_query("select * from t_item_pos where pos_key='".$pos_key."'");
    	
    	if($result!=null && $result['item_pos_id']>0){
    		$sql = "update t_item_pos set pos_page=".$pos_page.",item_id=".$item_id." where pos_key='".$pos_key."'";
    	}else{
			$sql = "INSERT INTO t_item_pos (pos_page, pos_key,item_id) VALUES ($pos_page, '$pos_key',$item_id)";
    	}
    	
    	echo "sql==".$sql;
    	mysql_query($sql);
  		mysql_close($con);
  		
  		echo "操作成功";
    	}
  			
	  }catch(Exception $e){
	  	echo 'Message: ' .$e->getMessage();
	 }

?>
