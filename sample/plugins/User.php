<?php

class Plugin_User extends Ap_Plugin_Abstract {
    public function preDispatch($req, $res) {
        $info = Bd_Passport::getData($_COOKIE['BDUSS']);
        $uid = $info['uid'];
            // TODO: check login state by control or action
        $module = $req->getModuleName();
        $controller = $req->getControllerName();
        $action = $req->getActionName();
        $list = array('Order', 'Phone'); // Need login
        $actionWhiteList = array('payed', 'done');
        $needAuth = in_array($controller, $list) && !in_array($action, $actionWhiteList);
        if (!HS_DEV && !$uid && $needAuth) { //fortest, close login verify
            if ($module == 'Api') {
                throw new Exception("User not login", 1);
            } else {
                // header('Location: http://wappass.baidu.com/passport/?login', 302); // not need
            }
        }
        $req->setParam('uid', $uid);
    }
}