<?php

class Plugin_Global extends Ap_Plugin_Abstract {

    public function preDispatch($req, $res) {
        define(HS_APPID, $req->getParam('appid'));

        // get retry
        define(HS_RETRY, isset($_REQUEST['hs_retry']));
        define(HS_PHONE_VERIFY, false);
    }
}