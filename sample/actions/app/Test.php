<?php

class Action_Test extends Base_Action {
    public function exec($req, $res) {
        // http get demo
        // $ret = Utils_Http::get('lightservice', '/lightservice/etickets', array(
        //     'event' => 'spinfo',
        //     'sid' => 1202969,
        //     ));
        // echo $ret;

        // light_service demo
        // $service = new Light_Service(1202969);
        // echo $service->getSpinfo();

        // light pay demo
        // $pay = new Light_Pay(array('sp_no'=>1012, 'sp_sk'=>'LINUYSjlQy7kuhKVrDDskzS4zswnvtOd'));
        // echo json_encode( $pay->listOrder());

        // Model Order demo
        // $order = new Service_Page_OrderCenter();
        // echo json_encode($order->execute(null));

        // $key = 'hotspot:order';
        // $data = Utils_Redis::inst()->request('set', array(
        //     'key' => $key,
        //     'value' => 'xxxxxxxxxxxx',
        //     ));
        // echo json_encode($data);
        // $data = Utils_Redis::inst()->request('get', array(
        //     'key' => 'hotspot:order',
        //     ));
        // echo json_encode($data);

        // light_service demo
        // $appid = $this->getRequest()->getParam('appid');
        // $service = new Light_Service($appid);
        // echo json_encode($service->getSecret());
        // echo $service->getSpot();

        // $orders = Light_Pay::inst()->listOrder();
        // echo json_encode($orders);

        $data = Bd_Passport::getInfoByuid(Utils_Test::$uid, array(
            'securemobil',
            'userid',
        ));
        $mobile = $data['content'][0]['result_params'][$uid]['userid'];
        echo json_encode($mobile);
        // echo Utils_Dwz::create('m.baidu.com');

        // Utils_Sms::bookMsg(18612673023, array('url'=>'m.baidu.com'));

        // $headers = http_get_request_headers ();
        echo json_encode($_SERVER['HTTP_LIGHTAPP_UID']);
    }
}