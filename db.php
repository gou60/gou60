<?php
 		//$con = mysql_connect("hk.vrvr.cn","abshop","windowslb");
 		$con = mysql_connect("localhost","root","root");
 
        mysql_query("SET NAMES utf8",$con); 
		if (!$con)
 		 {
  		die('Could not connect: ' . mysql_error());
 		 }
		mysql_select_db("gou60", $con);
		//mysql_select_db("abshop", $con);

?>