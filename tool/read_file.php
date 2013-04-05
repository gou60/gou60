<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<?php
define('FANWE_ROOT',dirname(__FILE__).'/../');

$file = fopen(FANWE_ROOT."class.txt", "r") or exit("Unable to open file!");



while(!feof($file)){
   $arr = explode(" ",fgets($file));

   	$node = explode(".",$arr[0]);

   		$c = count($node);

		include FANWE_ROOT.'db.php';
		
		$classId = str_replace(".","",$arr[0]);
		
		$Fclass_leaf_name=trim($arr[1]);
		
		if($c==1){
			$Fclass_leaf_id=$classId*100000;
			$Fclass_refer_id = 0;
		}
		if($c==2){
			$Fclass_leaf_id=$classId*10000;
			$Fclass_refer_id = $node[0]*100000;
		}
		if($c==3){
			$Fclass_leaf_id=$classId*1000;
			$Fclass_refer_id = ($node[0].$node[1])*10000;
		}if($c==4){
			$Fclass_leaf_id=$classId*1000;
			$Fclass_refer_id = ($node[0].$node[1].$node[2])*1000;
		}
		
		$Fclass_refer_name='';
		$Fclass_level_id=count($node);
		$Fclass_level_name='';
		
		if($Fclass_leaf_id<=0) continue;
		
		//echo '>>>'.$Fclass_leaf_id.'>>>'.$Fclass_refer_id.'<br>';
		
		$sql = "INSERT INTO t_classes (Fclass_leaf_id, Fclass_leaf_name,Fclass_refer_id,Fclass_refer_name,Fclass_level_id,Fclass_level_name) VALUES ($Fclass_leaf_id, '$Fclass_leaf_name',$Fclass_refer_id,'$Fclass_refer_name',$Fclass_level_id,'$Fclass_level_name')";
		
  		//echo "sql==".$sql.'<br>';
  		
  		try{
  		mysql_query($sql);
  		
  		
  		mysql_query("update t_classes t,(SELECT t1.Fclass_leaf_id Fclass_leaf_id,t1.Fclass_leaf_name Fclass_leaf_name FROM t_classes t1) a set t.Fclass_refer_name= a.Fclass_leaf_name where t.Fclass_refer_id=a.Fclass_leaf_id");

  		}catch(Exception $e){
 		echo 'Message: ' .$e->getMessage();
 		}
  		
  		mysql_close($con);
		
   	}

   
fclose($file);
?>


