<?php
class Controller_Order extends Ap_Controller_Abstract {

    public function init() {
        $req = $this->getRequest();
        $this->appid = $req->getParam('appid');
        $this->uid = $req->getParam('uid');
        $this->req = $req;
    }

    public function submitAction() {
        $ticketId = $_REQUEST['ticketId'];
        $tourists = $_REQUEST['tourists'];
        $customer = $_REQUEST['customer'];
        $tourtime = $_REQUEST['tourtime'];
        $amount = intval($_REQUEST['amount']);

        //channel
        $channel = $_REQUEST['channel'];

        // fortest
        // $customer = array(
        //     'tel' => '18612673023',
        //     );
        // $tourists[] = $customer;
        // $tourists[] = $customer;
        // $tourists[] = $customer;
        // $amount = count($tourists);
        // $amount = 1;

        // verify phone
        if (HS_PHONE_VERIFY) {
            $info = Utils_PhoneVerify::info($this->uid, $customer['tel']);
            if ($info['verifed'] !== true) {
                throw new Exception("Phone is not verfied, tel:".$customer['tel'], 1);
            }
        }

        // get spot and ticket id
        $spot = new Service_Data_Spot($this->appid);
        // get secret by appid 
        $apptoken = $this->req->getParam('apptoken');
        $order = $spot->toLightOrder($ticketId, $amount, $customer, $tourists, $apptoken, $tourtime, $channel);
        // die(json_encode($order));
        echo json_encode(Light_Pay::inst()->submit($order));
    }

    public function payedAction() {
        $order_id = $_GET['order_id'];
        $payResult = $_GET['pay_result'];
        if ($payResult != 1) {
            throw new Exception("User pay failed.", 1);
        }
        // tickets withdraw
        $result = Light_Pay::inst()->withdraw(null, $order_id, '');
        Bd_Log::addNotice('serviceMsg', 'Pay result done, order_id:'.$order_id);
        echo json_encode(array('result' => 0));
    }

    public function refundAction() {
        $order_id = $_REQUEST['order_id'];
        $num = $_REQUEST['num'];
        $qr_id = $_REQUEST['qr_id'];
        $ecode = $_REQUEST['ecode'];
        $reason = $_REQUEST['reason'];
        if (isset($num) && isset($qr_id)) {
            $result = Light_Pay::inst()->refundApply($this->uid, $order_id, null, $reason, $qr_id, $num);
        } else {
            $result = Light_Pay::inst()->refundApply($this->uid, $order_id, $ecode, $reason);
        }
        echo json_encode($result);
    }


}