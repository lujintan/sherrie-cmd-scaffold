<?php
class Base_Controller extends Ap_Controller_Abstract {

    public function init() {
        // prepara varables
        $req = $this->getRequest();
        $this->appid = $req->getParam('appid');
        $this->uid = $req->getParam('uid');
        $this->apptoken = $req->getParam('apptoken');

        $this->req = $req;
    }
}
