<?php
class Controller_Appoint extends Ap_Controller_Abstract{

    public function doneAction() {
        $result = $_GET['result'];
        if ($result != 1) {
            throw new Exception("Appoint failed.", 1);
        }
        $order_id = $_REQUEST['order_id'];
        $apptoken = $this->getRequest()->getParam('apptoken');
        $page = new Service_Page_AppointDone();
        $ret = $page->execute(array(
            'order_id' => $order_id,
            'apptoken' => $apptoken,
            ));
        $isOnline = $this->getRequest()->getParam('isOnline');
        $apptoken = $isOnline ? '' : '&'.$apptoken;
        $this->redirect('/order/appointed?orderId='.$order_id.$apptoken);
    }
}
