 <?php
function ticket_comparator ($a, $b) {
    $criteria = array(
        'publish_status'=>'desc',
        'price'=>'asc',
    );
    foreach($criteria as $what => $order){
        if($a[$what] == $b[$what]){
            continue;
        }
        return (($order == 'asc') ? 1 : -1) * (($a[$what] < $b[$what]) ? -1 : 1);
    }
    return 0;
}

class Action_Tickets extends Base_Action {
    public function exec($req, $res) {
        $data = $this->appinfo;
        $req = $this->getRequest();

        if(isset($_GET['bd_source_light'])){
            $this->getView()->assign('servNav', '&bd_source_light='.$_GET['bd_source_light']);
        }

        $isTicket = isset($_GET['ticketId']);

        try {
            $spot = new Service_Data_Spot($req->getParam('appid'));
            $spotInfo = $spot->getData();

            $list = $spotInfo['priceList'];

            //when only having one ticket
            count($list) == 1 && !$data['isWise'] && ($isTicket = true);

            $data['isSingle'] = $isTicket;

            if($isTicket){
                $ticketId = isset($_GET['ticketId'])? $_GET['ticketId'] : $list[0]['id'];
                $ticket = $spot->getTicket($ticketId);
                $ticket = Light_Ticket::genTag($ticket);

                $imgs = json_decode($ticket['info_image_url_set'], true);
                $imgs = Utils_Timg::compressAsArr('mp', $imgs, 'url' , $quality = 80, $width = 800, $height = 800);
                $ticket['info_image_url_set'] = $imgs;

                $this->getView()->assign('ticket', $ticket);
            }else{
                foreach ($list as $key => $value) {
                    $imgs = json_decode($value['info_image_url_set'],true);
                    $list[$key]['info_image_url_set'] = Utils_Timg::compress('mp', $imgs[0]['url'], $quality = 90, $width = 100, $height = 100);
                    //create tags
                    $list[$key] = Light_Ticket::genTag($list[$key]);
                }
                usort($list, 'ticket_comparator');
                $spotInfo['priceList'] = $list;
            }



        } catch (Exception $e) {
            Bd_Log::warning($e);
            $spotInfo = null;
            if (!HS_RETRY || HS_DEBUG) {
                throw $e;
            }
        }
        $this->getView()->assign('spot', $spotInfo);
        $this->getView()->assign('tplData', $data);
        $this->getView()->assign('apptoken', $req->getParam('apptoken'));
        if($isTicket){
            $data['tpl'] = 'ticket';
            $data['widgettype'] = 'ticket';
        }else{
            $data['tpl'] = 'tickets';
            $data['widgettype'] = 'tickets';
        }
        $this->getView()->display('app/page/page.tpl');
    }
}