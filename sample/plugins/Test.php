<?php

class Plugin_Test extends Ap_Plugin_Abstract {

    public function preDispatch($req, $res) {
        if (!HS_DEV) return; // production env

        
        // dev,debug,testing: set variables or const
        $req->setParam('uid', Utils_Test::$uid);
        // $req->setParam('appid', Utils_Test::$appid);

    }
}