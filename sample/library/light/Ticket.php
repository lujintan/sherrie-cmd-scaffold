<?php
class Light_Ticket
{ 
    public function genTag($ticket){

        switch ($ticket['pay_type']) {
            case 0:
                $ticket['tag_pay_type'] = '在线支付';
                $ticket['tag_privilege'] = '每张票立减10元'; //'立减10元';

                break;
            case 1:
                $ticket['tag_pay_type'] = '景区现场支付';
                $ticket['tag_privilege'] = '每张票返券10元';

                $save = $ticket['original_price'] - $ticket['price'];
                if($ticket['original_price'] - $ticket['price'] > 0){
                    $ticket['tag_save'] = '省'.($save/100).'元';
                }
                break;
            default:
                # code...
                break;
        }

        switch (substr($ticket['order_desc'], 0, 1)) {
            case 0:
                $ticket['tag_order_desc'] = '随订随用';
                break;
            case 1:
                $ticket['tag_order_desc'] = '最早可定明日票';
                break;
            case 2:
                $tmp = explode(',',substr($ticket['order_desc'], 2));
                $time = array();
                intval($tmp[0]) != 0 && ($time[] = intval($tmp[0])) && $time[] = '天';
                intval($tmp[1]) != 0 && ($time[] = intval($tmp[1])) && $time[] = '小时';
                intval($tmp[2]) != 0 && ($time[] = intval($tmp[2])) && $time[] = '分';
                $ticket['tag_order_desc'] = '至少提前'.implode('',$time).'预订';
                break;
            case 3:
                $ticket['tag_order_desc'] = implode(':',explode(',',substr($ticket['order_desc'], 2))).'前可定今日票';
                break;
            default:
                # code...
                break;
        }

        switch(substr($ticket['refund_desc'], 0, 1)){
            case 0:
                $ticket['tag_refund_desc'] = '有效期内可退';
                break;
            case 1:
                $ticket['tag_refund_desc'] = '不可退';
                break;
            case 2:
                $ticket['tag_refund_desc'] = '过期自动退';
                break;
            case 3:
                $ticket['tag_refund_desc'] = '过期后'.substr($ticket['refund_desc'], 2).'天均可退票';
                break;
            default:
                break;
        }

        return $ticket;
    }
}
