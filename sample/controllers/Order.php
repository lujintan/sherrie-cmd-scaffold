<?php
class Controller_Order extends Ap_Controller_Abstract{
    public $actions = array(
        'create' => 'actions/order/Create.php',
        'center' => 'actions/order/Center.php',
        'detail' => 'actions/order/Detail.php',
        'refund' => 'actions/order/Refund.php',
        'refunded' => 'actions/order/Refunded.php',
        'payed' => 'actions/order/Payed.php',
        'appointed' => 'actions/order/Appointed.php',
        );

    public function init() {
        // Get global config
        // $lightapi = new Hotspot_LightApi();
        // $data = $lightapi->get(array('index'));
        // $data['isBox'] = self::isBox();
        // $data['isWise'] = self::isWise();
        // $this->appinfo = $data;
        $uid = $this->getRequest()->getParam('uid');
        if (!$uid) {
            $login_scripts = 'http://apps.bdimg.com/cloudaapi/lightapp.js';
            HS_DEV && $login_scripts = 'http://fedev.baidu.com/~dingquan/clouda1/static/cloudaapi/lightapp_my.js';
            $this->getView()->assign('HS_DEV', HS_DEV);
            $this->getView()->assign('login_scripts', $login_scripts);
            $this->getView()->display('page/login.tpl');
            die();
        }
    }



    public function testAction() { //fortest
        $this->getView()->display('test.tpl');
    }
}
