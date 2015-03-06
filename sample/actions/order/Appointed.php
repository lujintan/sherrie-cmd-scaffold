<?php

class Action_Appointed extends Base_Action {
    public function exec($req, $res) {
    	$data = $this->appinfo;

    	$order_id = $_GET['orderId'];

    	$order = Light_Pay::inst()->getOrder($order_id);

        $this->getView()->assign('timestamp', time());
    	$this->getView()->assign('order', $order);
    	$this->getView()->assign('tplData', $data);
        $this->getView()->assign('apptoken', $req->getParam('apptoken'));
        // Get index setting
        $this->getView()->display('page/order/appointed.tpl');
    }
}