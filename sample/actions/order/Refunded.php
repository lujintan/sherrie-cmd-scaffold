<?php

class Action_Refunded extends Base_Action {
    public function exec($req, $res) {
    	$data = $this->appinfo;

    	$this->getView()->assign('tplData', $data);
        $this->getView()->assign('apptoken', $req->getParam('apptoken'));
        // Get index setting
        $this->getView()->display('page/order/refunded.tpl');
    }
}


