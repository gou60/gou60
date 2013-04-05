<?php
define('FANWE_ROOT',dirname(__FILE__).'/');

/**
 * 该Service主要用于分熟采集
 * 通过采集URL构造对象， fetch获取采集内容
 * 采集结果结构参考 class/sharegoods/sharegoods.php interface_sharegoods接口规范
 *
 * 例：
 * $share = new SharegoodsService($url);
 * $share->fetch();
 *
 *
 * @author fzmatthew
 *
 */
class SharegoodsService{
	private $share_module;
	private $url;
	private $Fclass_leaf_id;
	//通过URL构造获取相应的采集解析模型
	public function __construct($url,$Fclass_leaf_id)
	{
		global $_FANWE;
//		FanweService::instance()->cache->loadCache('business');
//		$rs = preg_match("/^(http:\/\/|https:\/\/)/",$url,$match);
//		if(intval($rs)==0)
//		{
//			$url = "http://".$url;
//		}
//		$rs= parse_url($url);

//		$scheme = isset($rs['scheme'])?$rs['scheme']."://":"http://";
//		$host = isset($rs['host'])?$rs['host']:"none";
//        $host = explode('.',$host);
//        $host = array_slice($host,-2,2);
//        $domain = implode('.',$host);
//		$class = FDB::fetchFirst("select `class` from ".FDB::table('sharegoods_module')." where domain like '%".$domain."%' and status = 1  limit 1");

		$class = 'taobao';
		
		$file = FANWE_ROOT."sdks/taobao/".$class."_sharegoods.class.php";
		
		 
			require_once $file;
			$class_name = $class."_sharegoods";
			 
			 
			 $this->share_module = new taobao_sharegoods();
				
				
			 
		 
		$this->url = $url;
		$this->Fclass_leaf_id = $Fclass_leaf_id;
		//echo '<br />';
	}

	/**
	 * 返回结果为false时采集失败
	 */
	public function fetch()
	{
		if($this->share_module)
		{
			return $this->share_module->fetch($this->url,$this->Fclass_leaf_id);
		}
		else
			return false;
	}

	/**
	 * 获取该商品的标识，用于检测是否已经采集
	 */
	public function getKey()
	{
		if($this->share_module)
		{
			return $this->share_module->getKey($this->url);
		}
		else
			return '';
	}

	/**
	 * 检测是否已经采集过商品
	 */
	public function getExists($goods)
	{
		$key = $this->getKey();
		if(isset($goods[$key]))
			return true;
		else
			return false;
	}
}
?>