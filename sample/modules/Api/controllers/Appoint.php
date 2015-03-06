<?php
class Controller_Appoint extends Base_Controller {


    public function submitAction() {
        $ticketId = $_GET['ticketId'];

        $channel = $_REQUEST['channel'];

        // get spot and ticket id
        $spot = new Service_Data_Spot($this->appid);
        // get secret by appid 
        $appoint = $spot->toLightAppoint($ticketId, $this->apptoken, $channel);
        // die(json_encode($appoint));
        $result = Light_Pay::inst()->submitAppoint($appoint);
        $result['url'] .= '&tpl_id=1';
        echo json_encode($result);
    }

    public function doneAction() {
        $result = $_GET['result'];
        if ($result != 1) {
            throw new Exception("Appoint failed.", 1);
        }
        // get order with order id 
        $order_id = $_REQUEST['order_id'];
        $page = new Service_Page_AppointDone();
        $ret = $page->execute(array(
            'order_id' => $order_id,
            'send_sms' => true,
            'apptoken' => $this->apptoken,
            ));
        $ret = array('result' => 0);
        echo json_encode($ret);
    }
}