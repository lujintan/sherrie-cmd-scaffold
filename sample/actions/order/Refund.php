<?php

class Action_Refund extends Base_Action {
    public function exec($req, $res) {
        $data = $this->appinfo;
        $order_id = $_GET['order_id'];
        $uid = $req->getParam('uid');
        // qrinfo
        $qrinfo = Light_Pay::inst()->qrinfo($uid, $order_id);
        // get order
        $order = Light_Pay::inst()->getOrder($order_id);
        // die(json_encode($order));
        
        $this->getView()->assign('tplData', $data);
        $this->getView()->assign('apptoken', $req->getParam('apptoken'));
        $this->getView()->assign('order', $order);
        $this->getView()->assign('qrinfo', $qrinfo);
        // Get index setting
        $this->getView()->display('page/order/refund.tpl');
    }
}
