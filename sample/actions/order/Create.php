<?php

class Action_Create extends Base_Action {
    public function exec($req, $res) {
        // Get index setting
        $data = $this->appinfo;
        $req = $this->getRequest();
        $ticketId = $_GET['ticketId'];
        $spot = new Service_Data_Spot($req->getParam('appid'));
        $ticket = new Light_Ticket();

        $data['spot']	= $spot->getData();
        $data['ticketId'] = $ticketId;
        $data['ticket'] = $ticket->genTag($spot->getTicket($ticketId));

        $data['ticket']['price'] = sprintf("%.2f", $data['ticket']['price']/100);

        $this->getView()->assign('apptoken', $req->getParam('apptoken'));
        $this->getView()->assign('tplData', $data);
	    $this->getView()->display('page/order/create.tpl');
    }
}
