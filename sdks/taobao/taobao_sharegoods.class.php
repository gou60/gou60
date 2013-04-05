<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
define('FANWE_ROOT',dirname(__FILE__).'/');

include_once FANWE_ROOT.'sdks/taobao/TopClient.php';
include_once FANWE_ROOT.'sdks/taobao/request/ItemGetRequest.php';
include_once FANWE_ROOT.'sdks/taobao/request/ShopGetRequest.php';
include_once FANWE_ROOT.'sdks/taobao/request/TaobaokeItemsDetailGetRequest.php';
include_once FANWE_ROOT.'sdks/taobao/sharegoods.php';


class taobao_sharegoods implements interface_sharegoods
{
	public function fetch($url,$Fclass_leaf_id)
	{
        global $_FANWE;

		$id = $this->getID($url);
		
		if($id == 0)
			return false;

		$key = 'taobao_'.$id;

		//echo '--id---'.$id;

		$client = new TopClient;
		$client->appkey = '21364979';
		$client->secretKey = 'f13ff7b5bb86ba8b6431a6ecd9e47da1';

//		 echo '<br />-id--'.$id;
//		 echo '<br />-appkey--'.$client->appkey;
//		 echo '<br />-secretKey--'.$client->secretKey;
//		 
		$req = new ItemGetRequest;
		$req->setFields("detail_url,num_iid,title,nick,type,cid,seller_cids,props,input_pids,input_str,desc,pic_url,num,valid_thru,list_time,delist_time,stuff_status,location,price,post_fee,express_fee,ems_fee,has_discount,freight_payer,has_invoice,has_warranty,has_showcase,modified,increment,approve_status,postage_id,product_id,auction_point,property_alias,item_img,prop_img,sku,video,outer_id,is_virtual");

		$req->setNumIid($id);

		$resp = $client->execute($req);


		if(!isset($resp->item))
			return false;

		$result = array();
		$goods = (array)$resp->item;

		if(empty($goods['detail_url']) || empty($goods['pic_url']))
			return false;
 
			
		//echo '<br /><br /><br />';
		
//        $tao_ke_pid = 'mm_14143771_0_0';
// 
//        $shop_click_url = '';
//        if(!empty($tao_ke_pid))
//        {
//            $req = new TaobaokeItemsDetailGetRequest;
//            $req->setFields("click_url,shop_click_url");
//            $req->setNumIids($id);
//            $req->setPid($tao_ke_pid);
//            
////            echo '<br />id>>>'.$id;
////            echo '<br />tao_ke_pid>>>'.$tao_ke_pid;
//            
//            $resp = $client->execute($req);
//
////             echo '<br />resp>>>'.$resp;
//             
//            if(isset($resp->taobaoke_item_details))
//			{
//                $taoke = (array)$resp->taobaoke_item_details->taobaoke_item_detail;
//                if(!empty($taoke['click_url']))
//                      echo '<br />click_url:'.$taoke['click_url'];
//
//                if(!empty($taoke['shop_click_url']))
//                    echo '<br />shop_click_url:'.$taoke['shop_click_url'];
//            }
//        }

        $itemId=$id;
    
         
        $title=$goods['title'];
        $price=$goods['price'];
        $num=$goods['num'];
        $detail_url=$goods['detail_url'];
        $pic_url=$goods['pic_url'];
        $desc=$goods['desc'];
        $click_url=$goods['click_url'];
        $last_modify=date("Y-m-d H:i",time());
        
       	$desc= substr($desc, 0,8000-1);
        
//        echo '<br><br><br>itemId>>'.$itemId;
          //echo '<br>title>>'.$title;
       // echo '<br>price>>'.$price;
//        echo '<br>num>>'.$num;
//        echo '<br>detail_url>>'.$detail_url;
//        echo '<br>pic_url>>'.$pic_url;
//        echo '<br>click_url>>'.$click_url;
          //echo '<br>>>click_url '.$goods['$has_discount'];

  		//include FANWE_ROOT.'db.php';
  		$con = mysql_connect("hk.vrvr.cn","abshop","windowslb");
 		//$con = mysql_connect("localhost","root","root");
 
        mysql_query("SET NAMES utf8",$con); 
		if (!$con)
 		 {
  		die('Could not connect: ' . mysql_error());
 		 }
		//mysql_select_db("gou60", $con);
		mysql_select_db("abshop", $con);
		
		if($title!=null && $title!=''){
			$sql = "INSERT INTO t_item_class (Fitem_id,Fclass_leaf_id) VALUES ($itemId,$Fclass_leaf_id)";
			mysql_query($sql);
		}
  		
  		$sql = "INSERT INTO t_item (Fitem_id, Fitem_title,Fclass_leaf_id,Fitem_photo_addr,Fitem_price,Fitem_desc,Fitem_sell_num,Fitem_source_id,Fitem_source_url) VALUES ($itemId, '$title',$Fclass_leaf_id, '$pic_url',$price,'$desc',$num,1,'$detail_url')";
		
  		mysql_query($sql);
  		
		if(mysql_affected_rows() > 0) {
			echo "<br>成功:>>>>".$itemId."<br>"; 
		}else{
			echo "<br>失败:>>>>".$itemId."----".$detail_url."<br>"; 
		}

		mysql_close($con);
 
		return $result;
	}

	public function getID($url)
	{
		$id = 0;
		$parse = parse_url($url);
		if(isset($parse['query']))
		{
            parse_str($parse['query'],$params);
			if(isset($params['id']))
				$id = $params['id'];
            elseif(isset($params['item_id']))
                $id = $params['item_id'];
			elseif(isset($params['default_item_id']))
                $id = $params['default_item_id'];
        }

		return $id;
	}

	public function getKey($url)
	{
		$id = $this->getID($url);
		return 'taobao_'.$id;
	}
}
?>