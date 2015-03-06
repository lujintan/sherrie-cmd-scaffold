<?php

class Service_Data_Spot {

    public function __construct($appid, $id = null) {
        $this->id = $id;
        $this->appid = $appid;
    }
    static $data = null;

    public function getData() {
        if (!self::$data) {
            $light = new Light_Service($this->appid);
            self::$data = $light->getSpot();
        }        
        return self::$data;
    }
    public function getTicket($id) {
        $this->getData();
        foreach (self::$data['priceList'] as $key => $value) {
            if ($value['id'] == $id) {
                return $value;
            }
        }
        throw new Exception("No ticket:$id", 1);
    }

    public function toLightOrder($ticketId, $amount, $customer, $tourists, $apptoken, $tourtime, $channel) {
        $ticket = $this->getTicket($ticketId);
        $spot = self::$data;

        $ticket_count = $amount;
        $ticket_price = intval($ticket['price']);

        $item = new Light_PayItem();
        $item->data['item_id'] = $ticket['id'];
        $item->data['item_no'] = $ticket['t_id'];
        $item->data['item_type'] = self::getType($ticket['type']);
        $item->data['ticket_scope'] = 1;
        $item->data['supplier_name'] = $spot['supplier'];
        $item->data['cat_id'] = self::getCatId($spot['cate_id']);
        $item->data['price'] = $ticket_price;
        $item->data['name'] = $ticket['title'];
        $item->data['desc'] = $ticket['title'];
        $item->data['amount'] = $ticket_count;
        // $item->data['url'] = $ticket['link'];

        // item detals
        $item->data['item_details']['is_refundable'] = 1;// 1 - $ticket['refund_desc'];
        $validTime = self::parseValidTime($ticket['valid_time'], $tourtime);
        $item->data['item_details']['enable_time'] = $validTime['enable_time']; // $ticket['enable_time'];
        $item->data['item_details']['expire_time'] = $validTime['expire_time']; // $ticket['expire_time'];

        $order = new Light_Order();
        $order_no = self::genOrderId();
        $order->data['order_no'] = $order_no;
        $order->data['total_amount'] = $ticket_count * $ticket_price;
        $order->data['goods_name'] = $ticket['title'];
        $host = Utils_Conf::getHost();
        $order->data['page_url'] = 'http://'.$host.'/order/payed?'.$apptoken;
        $order->data['return_url'] = 'http://'.$host.'/api/order/payed/?'.$apptoken;
        $order->data['order_source_url'] = "http://itrip.baidu.com/order/detail?order_no=$order_no&".$apptoken; // fixed
        HS_DEV && $order->data['order_source_url'] = 'http://m.baidu.com/'; //fortest
        $order->data['customer_name'] = '游客';
        $order->data['customer_mobile'] = $customer['tel'];
        $order->data['customer_address'] = 'reserved';

        //channel
        isset($channel) && $order->data['channel'] = $channel;

        $order->addItem($item);

        return $order;
    }

    public static function getType($type) {
        $map = array(
            '5' => 2,
            '8' => 1,
            );
        $type = isset($map[$type]) ? $map[$type] : 2;
        return $type;
    }

    public static function getCatId($cat) {
        $map = array(
            '10002' => 7,
            );
        $cat_id = 4; // default
        if (isset($map[$cat])) {
            $cat_id = $map[$cat];
        }
        return $cat_id;
    }

    public static function genOrderId() {
        return strval(rand(100000000000, 999999999999));
    }

    public function toLightAppoint($ticketId, $apptoken, $channel) {
        $ticket = $this->getTicket($ticketId);

        $tmp = new Light_Ticket();
        $ticket = $tmp->genTag($ticket);

        $spot = self::$data;

        $ticket_count = $amount;
        $ticket_price = intval($ticket['price']);

        if($ticket['max_num'] == -1){
            $ticket_max = 0;
        }else{
            $ticket_max = intval($ticket['max_num']);
        }

        // echo json_encode($ticket);
        // die();

        $item = new Light_AppointItem();
        $item->data['item_id'] = $ticket['id'];
        $item->data['cat_id'] = 6; // spot appoint Fixed
        $item->data['name'] = $ticket['title'];
        $item->data['price'] = $ticket_price;
        $item->data['amount'] = 0; // fixed
        $item->data['desc'] = $ticket['title'];
        $item->data['remark'] = $ticket['description']; 
        $item->data['pick_way'] = $ticket['tag_pay_type'];
        // $item->data['url'] = $ticket['link'];
        $item->data['label'] = self::genLabels($ticket);
        $item->data['limit'] = $ticket_max; // fixed
        $timeScope = self::parseOrderDesc($ticket['order_desc']);
        $item->data['t_start'] = $timeScope[0]; 
        $item->data['t_end'] = $timeScope[1]; 

        $order = new Light_Appoint();
        $order_no = self::genOrderId();
        $order->data['order_no'] = $order_no;
        $order->data['goods_name'] = $ticket['title'];
        $host = Utils_Conf::getHost();
        $order->data['page_url'] = 'http://'.$host.'/appoint/done?'.$apptoken;
        $order->data['return_url'] = 'http://'.$host.'/api/appoint/done/?'.$apptoken;
        $order->data['order_source_url'] = 'http://'.$host."/order/detail?order_no=$order_no&".$apptoken;

        isset($channel) && $order->data['channel'] = $channel;

        $order->addItem($item);
                // echo $ticket['valid_time'];
                // die(json_encode($order));

        return $order;
    }

    public static function genLabels($ticket) {
        //优惠开关
        false && $labels[] = $ticket['tag_privilege'];
        $labels[] = $ticket['tag_pay_type'];
        $labels[] = $ticket['tag_order_desc'];
        $ticket['tag_save'] && $labels[] = $ticket['tag_save'];
        return implode($labels, ';');
    }

    public static function parseValidTime($input, $tourtime) {
        $times = explode('|', $input);
        if (count($times) == 1 ) {
            $valid_time = explode('-', $input);
            $enable_time = $valid_time[0];
            $expire_time = $valid_time[1];
        } else  {
            if ($times[0] == 0) {
                $valid_time = explode('-', $times[1]);
                $enable_time = date('Y/m/d');
                $expire_time = $valid_time[1];
            } else if ($times[0] == 1) {
                $enable_time = date('Y/m/d');
                $expire_time = date('Y/m/d', time() + 3600*24*intval($times[1]));
            } else if ($times[0] == 2) {
                $enable_time = $tourtime;
                $expire_time = date('Y/m/d', strtotime($enable_time) + 3600*24*intval($times[1]));
            }
        }
        return array(
            'enable_time'=>strtotime($enable_time), 
            'expire_time'=>strtotime($expire_time) + 3600 * 24 -1, // 23:59:59
            );
    }

    public static function parseOrderDesc($input) {
        $times = explode('|', $input);
        $start = 0;
        $end = 0;
        if($times[0] == 0){
            $start = date('Y/m/d', time());
            $end = date('Y/m/d', time() + 3600*24*89);
        }else if ($times[0] == 1) {
            $start = date('Y/m/d', time() + 3600*24);
            $end = date('Y/m/d', strtotime($start) + 3600*24*89);            
        } else if ($times[0] == 2) {
            $times = explode(',', $times[1]);
            $day = $times[0];
            $hour = isset($times[1])? $times[1]:0;
            $minite = isset($times[2])? $times[2]:0;

            $start = date('Y/m/d', time() + 3600*24*$day + 3600*$hour + 60*$minite);
            $end = date('Y/m/d', strtotime($start) + 3600*24*89);
        } else if ($times[0] == 3) {
            $times = explode(',', $times[1]);
            $hour = isset($times[0]) ? $times[0] : 0;
            $minite = isset($times[1]) ? $times[1] : 0;
            if (date('H') > $hour || (date('H') == $hour && date('i') > $minite) ) {
                $start = date('Y/m/d', time() + 3600*24); // tommorrow
            }else{
                $start = date('Y/m/d', time());
            }
            $end = date('Y/m/d', strtotime($start) + 3600*24*89);
        }
        return array(strtotime($start), strtotime($end));
    }
}