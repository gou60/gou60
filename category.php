<div class="div_center"">
	<div class="hot_select"">
	<div class="hot_header"></div>
	<div class="hot_body"  style="height:240px;">
	<ul>
	
	 <?php 
    	include FANWE_ROOT.'db.php';
    	try{
    	$result = mysql_query("select * from t_classes where Fclass_level_id=1");
    	
    	while($row = mysql_fetch_array($result)){
    		if($row['Fclass_leaf_id']==100000){
					continue;
			}
		echo "<li><span>".$row['Fclass_leaf_name']."</span>";

			$sub = mysql_query("select * from t_classes where Fclass_refer_id=".$row['Fclass_leaf_id']);
			while($subrow = mysql_fetch_array($sub)){
				
				echo '<a href="nav.php?id='.$subrow['Fclass_leaf_id'].'" class="hots first"">'.$subrow['Fclass_leaf_name'].'</a>';
			}
		
			echo "</li>";
     
    		}
    	mysql_close($con);

  		}catch(Exception $e){
 			echo 'Message: ' .$e->getMessage();
 		}
	?>
</ul>
	</div>
	</div>
<!--	<div class="gift_package"><a target="_blank" href="http://item.taobao.com/item.htm?id=21308684910"><img src="images/ad/new_ad.jpg" /></a></div>-->
</div>
<div class="clear"></div>



<br><br><br><br><br><br>
