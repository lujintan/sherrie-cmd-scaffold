<?php

class Action_Detail extends Base_Action {

    public $schema = array (
        'order_no' => array (
            'optional' => true,
            'type' => 'string',
            'limit' => null,
            ),
        'order_id' => array (
            'optional' => true,
            'type' => 'string',
            'limit' => null,
            ),
        );
    
    public function exec($req, $res) {
        $data = $this->appinfo;
        $order_id = $_GET['order_id'];
        $order_no = $_GET['order_no'];
        $uid = $req->getParam('uid');

        // get order
        if (!$order_id && $order_no) {
                $order = Light_Pay::inst()->getOrderByNo($order_no);
                $order_id = $order['id'];
        } else {
                $order = Light_Pay::inst()->getOrder($order_id);
        }
        if ($order['status'] != 1) {
            // redirect to order center
            $isOnline = $this->getRequest()->getParam('isOnline');
            $apptoken = $isOnline ? '' : $req->getParam('apptoken');
            $this->redirect('/order/center?'.$apptoken.'&'.time());
            return;
        }
        // withdraw if not
        if ($order['status'] == 1 && $order['ticket_status'] == 0) {
            Light_Pay::inst()->withdraw($uid, $order_id, '');
        }
        // qrinfo
        if($order['order_type'] == 1){
            $qrinfo = Light_Pay::inst()->qrinfo($order['uid'], $order_id);
            $this->getView()->assign('qrinfo', $qrinfo);
        }
        
                // die(json_encode($order));
        $spot = new Service_Data_Spot($req->getParam('appid'));
        $ticketId = $order['detail'][0]['item_id'];
        try {
            $ticket = $spot->getTicket($ticketId);
        } catch (Exception $e) {
            $ticket = array('description' => '');
            Bd_Log::warning("Get ticket info failed, ticketId:$ticketId, caused by:$e");
        }
        
        $this->getView()->assign('tplData', $data);
        $this->getView()->assign('apptoken', $req->getParam('apptoken'));
        $this->getView()->assign('ticket', $ticket);
        $this->getView()->assign('order', $order);
        
        // Get index setting
        $this->getView()->display('page/order/detail.tpl');
    }
}
