<?php
define('FANWE_ROOT',dirname(__FILE__).'/../');

include_once FANWE_ROOT.'sdks/taobao/TopClient.php';
include_once FANWE_ROOT.'sdks/taobao/request/ItemGetRequest.php';
include_once FANWE_ROOT.'sdks/taobao/request/ShopGetRequest.php';
include_once FANWE_ROOT.'sdks/taobao/request/TaobaokeItemsDetailGetRequest.php';


 			$id=16865624923;
 			$tao_ke_pid=14143771;
 			
 			$client = new TopClient;
			$client->appkey = '21035808';
			$client->secretKey = '67810e87a476c327eb63f5f0d1972fae';
		
            $req = new TaobaokeItemsDetailGetRequest;
            $req->setFields("click_url,shop_click_url");
            $req->setNumIids($id);
            $req->setPid($tao_ke_pid);
            $req->setNick("taofriends");
            
            $resp = $client->execute($req);
            
 			echo '<br>Pid---'.$req->getPid();
 			echo '<br>NumIids---'.$req->getNumIids();
 			echo '<br>Fields---'.$req->getFields();
 	
 			
 			echo '<br><br>resp---'.$resp;
            
            if(isset($resp->taobaoke_item_details))
			{
                $taoke = (array)$resp->taobaoke_item_details->taobaoke_item_detail;
                
                
                echo '<br>taoke---'.$taoke;
                if(!empty($taoke['click_url']))
                    $result['item']['taoke_url'] = $taoke['click_url'];

                if(!empty($taoke['shop_click_url']))
                    $shop_click_url = $taoke['shop_click_url'];
            }
        
            echo '<br>click_url'.$click_url;
            echo '<br>shop_click_url'.$shop_click_url;
            

 ?>