<div class="head_top">
    <div class="head_left"><a href="/"><img alt="购乐园" src="images/gou60.png"></a></div>
    <div class="head_center">
      <div class="top1_sel">
        <form id="searchForm" name="searchForm" method="get" action="index.php" >

          <input name="keywords" type="text" title="可输入礼物名称、礼物货号或者品牌等进行搜索" id="search" value="" class="search" />
          <input name="imageField" type="submit" value="" id="sel_button" class="sel_button" />
        </form>
      </div>
      <div class="hot_sel fontstyle10">热门搜索：<a href="index.php">生日礼物</a></div>
    </div>
    <div class="head_right"><a href="/biz/"><img src="images/tolipin.png" /></a></div>
  </div>
  
   
   <div id="nav">
    <div id="categorys" class="">
      <div class="mt">全部分类</div>
      
    </div>
    <ul id="navitems">
    
    <?php 
    	include FANWE_ROOT.'db.php';
    	try{
    	$result = mysql_query("select * from t_classes where Fclass_level_id=1");
    	
    	while($row = mysql_fetch_array($result)){
 
    	if($row['Fclass_leaf_id']==100000){
    	?>
    		 <li id="nav-home" class="fore1 curr"><a title="<?php echo $row['Fclass_leaf_name']?>" hidefocus="true" href="index.php"><?php echo $row['Fclass_leaf_name'] ?></a></li>
		<?php 
    	}else{
		?>
    	   <li id="nav-home" class="fore1 curr"><a title="<?php echo $row['Fclass_leaf_name']?>" hidefocus="true" href="nav.php?id=<?php echo $row['Fclass_leaf_id']?>"><?php echo $row['Fclass_leaf_name'] ?></a></li>
    	
    	   <?php 
    	}
    }
  		mysql_close($con);

  		}catch(Exception $e){
 			echo 'Message: ' .$e->getMessage();
 		}
    ?>
    

    </ul>
    
    <div id="buycart">
  
    </div>
  </div>
  
  
  