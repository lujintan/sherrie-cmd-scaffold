<?php

class Controller_Phone extends Base_Controller {

    public function verifyAction() {
        $tel = $_REQUEST['tel'];
        $code = $_REQUEST['code'];
        if (!isset($tel)) {
            throw new Exception("No cell number.", 1);
        }
            // verify
            // get code from redies, hs:phone:{$num} -> code
        return Utils_PhoneVerify::verify($this->uid, $tel, $code);
    }

    public function infoAction() {
        $tel = $_REQUEST['tel'];
        echo json_encode(Utils_PhoneVerify::info($this->uid, $tel));
    }
}
