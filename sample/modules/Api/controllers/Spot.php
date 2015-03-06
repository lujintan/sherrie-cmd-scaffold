<?php

class Controller_Spot extends Ap_Controller_Abstract {

    public function init() {
        $req = $this->getRequest();
        $appid = $req->getParam('appid');

        $spot = new Service_Data_Spot($appid);
        $this->spot = $spot;
        header('content-type: application/json');
    }

    public function detailAction() {
        echo json_encode($this->spot->getData());
    }

    public function ticketAction() {
        $ticketId = $_GET['ticketId'];
        echo json_encode($this->spot->getTicket($ticketId));

    }
}