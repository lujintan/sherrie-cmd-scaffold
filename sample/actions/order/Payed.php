<?php

class Action_Payed extends Base_Action {

    public function exec($req, $res) {
        $uid = $req->getParam('uid');
        // pay done
        // withdraw
        $result = $_GET['pay_result'];
        $order_id = $_GET['order_id'];
        if ($result != 1) {
            throw new Exception("User pay failed.", 1);
        }
        // tickets withdraw
        try {            
            Light_Pay::inst()->withdraw($uid, $order_id, '');
        } catch(Exception $e) {
            Bd_Log::warning("Withdraw failed, order:{$order_id}, caused by:".$e);
        }        
        // redirect to order center
        $isOnline = $this->getRequest()->getParam('isOnline');
        $apptoken = $isOnline ? '' : $this->getRequest()->getParam('apptoken');
        $this->redirect('/order/center?'.$apptoken.'&'.time());
    }
}