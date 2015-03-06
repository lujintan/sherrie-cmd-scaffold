<?php
class Light_Pay
{
    static $conf = null; 

    static $_instance = null;
    
    public function __construct($secret) {
        if (!self::$conf) {
            self::$conf = Bd_Conf::getAppConf('lightpay');
        } 
        if (!($secret && $secret['sp_no'] && $secret['sp_sk'])) {
            throw new Exception('Parameters Error:' . json_encode($secret));
        }
        $this->sp_no = $secret['sp_no'];
        $this->sp_sk = $secret['sp_sk'];
    }
    
    public static function inst() {
        if (self::$_instance == null) {
            $service = new Light_Service(HS_APPID);
            $secret = $service->getSecret();
            self::$_instance = new Light_Pay($secret);
        }
        return self::$_instance;
    }

    private function checkSign($data) {
        return $data['sign'] === $this->genSign($data);
    }
    
    private function genSign($parms) {
        $sign = '';
        $data = array();
        if (is_array($parms) && !empty($parms)) {
            $qs = '';
            foreach ($parms as $key => $value) {
                if ('sign' != $key) {
                    $data[$key] = "{$key}={$value}";
                }
            }
            ksort($data);
            $qs = implode('', $data);
            $qs.= $this->sp_sk;
            $sign = md5($qs);
        }
        return $sign;
    }
    
    public function withdraw($uid, $orderId, $url) {
        $params = array('order_id' => $orderId, 'sp_no' => $this->sp_no, 'url' => $url);
        if ($uid) {
            $params['uid'] = $uid;
        }
        $api = 'ticketgenerate';
        if (!$uid) {
            $api = 'ticketgeneratenotice';
        }
        $result = $this->request($api,$params);
        return $result;
    }
    
    public function refundApply($uid, $orderId, $ecode, $reason, $qr_id = null, $num = null) {
        $params = array('order_id' => $orderId, 'uid' => $uid, 'reason' => $reason, 'sp_no' => $this->sp_no);
        if ($qr_id && $num) {
            $params['qr_id'] = $qr_id;
            $params['num'] = $num;
            $api = 'refundapplybynum';
        } else {
            $api = 'refundapply';
            $params['ecode'] = $ecode;
        }
        $extra = array(
            'rtimeout' => 10000,
            );
        $result = $this->request($api, $params, true, $extra);
        return $result;
    }
    
    public function qrinfo($uid, $orderId) {
        $params = array('order_id' => $orderId, 'uid' => $uid, 'sp_no' => $this->sp_no,);
        $result = $this->request('qrinfo', $params);
        return $result;
    }

    public function request($api, $params, $isPost = false, $extra = array()) {
        $headers = array();
        $params['sign'] = $this->genSign($params);
        $api = self::$conf['api'][$api];
        if ($isPost) {
            $result = Utils_Http::post('lightpay', $api, null, http_build_query($params), $headers, $extra);           
        } else {
            $result = Utils_Http::get('lightpay', $api, $params, $headers, $extra);           
        }
        $result = json_decode($result, true);
        if ($result ===null 
            || (isset($result['error_code']) && $result['error_code'] !== 0) 
            || (isset($result['error_no']) && $result['error_no'] !== 0) 
            // || (isset($result['result']) && $result['result'] !== 1) 
            ) {
            throw new Exception("Request {$api} failed, params:" . json_encode($params).' caused by:'.json_encode($result));
        }
        return $result;
    }
    
    public function listOrder($filters = array()) {
        $params = array('sp_no' => $this->sp_no, 'timestamp' => time(), 'orderby' => 'recv_time',);
        $params = array_merge($params, $filters);
        $result = $this->request('query', $params);
        $orders = $result['data'];
        $filtered = array();
        foreach ($orders as &$order) {
            if ($order['order_type'] == 2 && $order['ticket_status'] != 1) {
                continue;
            }
            $order['detail'] = json_decode($order['detail'], true);
            $filtered[] = $order;
        }
        return $filtered;
    }
    
    public static function decodeUid($authId) {
        $authId^= 282335;
         //该值定了就不能再改了，否则就出问题了
        $uid = ($authId & 0x00ff0000) << 8;
        $uid+= ($authId & 0x000000ff) << 16;
        $uid+= (($authId & 0xff000000) >> 16) & 0x0000ff00;
        $uid+= ($authId & 0x0000ff00) >> 8;
        return $uid;
    }

    public function submit(Light_Order $order) {
        $params = $order->toArray();
        $params['sp_no'] = $this->sp_no;
        $result = $this->request('submit', $params, true);
        return $result;
    }

    public function submitAppoint(Light_Appoint $appont) {
        $params = $appont->toArray();
        $params['sp_no'] = $this->sp_no;
        $result = $this->request('appoint_submit', $params, true);
        return $result;
    }

    public function getOrder($order_id) {
        $filters = array(
            'id'=>$order_id,
            );
        $orders = $this->listOrder($filters);
        if (count($orders) !== 1) {
            throw new Exception("Get order failed, id:$order_id", 1);
        }
        $order = $orders[0];
        return $order;
    }

    public function getOrderByNo($order_no) {
        $filters = array(
            'order_no'=>$order_no,
            );
        $orders = $this->listOrder($filters);
        if (count($orders) !== 1) {
            throw new Exception("Get order failed, no:$order_no", 1);
        }
        $order = $orders[0];
        return $order;
    }

    public function getOrders($uid) {
        $filters = array(
            'uid'=>$uid,
            );
        return $this->listOrder($filters);
    }
}
