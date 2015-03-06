<?php

class Service_Page_AppointDone extends Service_Page_Base {

    public function execute($params) {
        $order = Light_Pay::inst()->getOrder($params['order_id']);
        // die(json_encode($order));
        $tel = $order['customer_mobile'];
        // $qrinfo = Light_Pay::inst()->qrinfo($order['uid'], $order['id']);
        if (isset($params['send_sms'])) {
        // Send sms
            $url ='http://itrip.baidu.com/order/center?'.$params['apptoken']; // fixed
            HS_DEV && $url ='m.baidu.com'; // fortest
            self::bookMsg($tel, $order, $qrinfo, $url);
        }   
    }

    public static function bookMsg($tel, $order, $qrinfo, $url){   
        $ticket = $order['detail'][0];
        $msg = join("",array(
            $order['customer_name'], //用户姓名
            "您好!",
            date('Y/m/d', $order['appoint_time']), //用户预订时间
            $order['name'], //门票名称
            strval($ticket['amount']), //张数
            '张预订成功',
            ',预订确认码',
            $order['ecode'], //电子码
            ',景区现场支付',
            $order['total_amount'] / 100, //需支付钱，精确到分,xxxx.xx
            '元,请凭百度确认短信至景区售票口取票',
            ',订单详情请查看',
            Utils_Dwz::create($url).'。',  //订单详情页链接
            '(消费成功10个工作日内将收到返券短信)'
        ));
        Utils_Sms::_send($tel, $msg);
        // 预订成功短信
        // xx(用户填写的联系人姓名)您好！ xxxx-xx-xx（用户预订时间）xxxxxx（门票名称）x（预订张数）张预订成功, 订单确认码XXXX（电子码）,景区现场支付xxx.xx（需支付钱，精确到分）元,请凭百度确认短信至景区售票口取票 ,订单详情请查看http://t.cn/RhSKcKJ（订单页链接）
        // (短链接为订单详情页，非订单中心链接)
    }

    public static function cancelBookMsg($tel, $order){

        $msg = join("",array(
            "您已取消预订",
            date('Y/m/d', $order['appoint_time']), //用户预订时间
            $order['title'], //门票名称
            $order['amount'], //张数
            '张预订成功',
            ',欢迎继续预订!'
        ));

        Utils_Sms::_send($tel, $msg);
        // 取消订单短信
        // 您已取消xxxx-xx-xx（用户预订时间）xxxxxx（门票名称）x（预订张数）张，欢迎继续预订
    }

    public static function checkMsg($tel, $code){
        $msg = join("",array(
            "您在百度获取的手机验证码为：",
            $code,
            "，谢谢!"
        ));

        Utils_Sms::_send($tel, $msg);
        //您在百度获取的手机验证码为：xxx，谢谢！
    }
   
}