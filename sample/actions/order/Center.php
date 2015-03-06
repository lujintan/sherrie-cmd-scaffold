<?php

class Action_Center extends Base_Action {
    public function exec($req, $res) {
        // Get index setting
        $data = $this->appinfo;
        $uid = $req->getParam('uid');
        try {
        // get orders
            $orders = Light_Pay::inst()->getOrders($uid, $order_id);
        // die(json_encode($orders));
        } catch (Exception $e) {
            Bd_Log::warning($e);
            $orders = null;
            if (!HS_RETRY || HS_DEBUG) {
                throw $e;
            }
        }

        $payConf = Bd_Conf::getAppConf('lightpay');
        $this->getView()->assign('payrul', $payConf['app']['payurl']);
        $this->getView()->assign('tplData', $data);
        $this->getView()->assign('apptoken', $req->getParam('apptoken'));
        $this->getView()->assign('orders', $orders);
        // get secret
        $this->getView()->display('page/order/center.tpl');
    }
}
