<?php

class Utils_Redis{
    const PID = "qyy";
    const UA = "qyy";
    const TK  = 'qyy';
    const APP = 'lightservice';

    private $rpc = null;
    private static $_instance = null;

    public function __construct(){
        $this->rpc = Bd_RalRpc::create(
                'Ak_Service_Redis',
                array(
                    'pid'   =>  self::PID   , 
                    'uname' =>  self::UA        ,
                    'tk'    =>  self::TK        ,
                    'app'   =>  self::APP   ,
                    )
                );
    }

    public static function inst(){
        if(self::$_instance === null){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    

    public function request($method, $input) {
        $result = $this->rpc->{$method}($input);
        if (!$result) {
            throw new Exception("Http request redis failed, method:$method", 1);
        }
        if ($result['err_no'] != 0) {
            throw new Exception("Http request redis failed, err_msg:{$result['err_msg']}", 1);
        }
        return $result['ret'];
    }

    public function get($key) {
        $result = $this->request('get', array(
            'key' => $key,
            ));
        return $result[$key];
    }

    public function set($key, $value) {
        $result = $this->request('set', array(
            'key' => $key,
            'value' => $value,
            ));
        return $result[$key];
    }

    public function expire($key, $time) {
        $result = $this->request('expire', array(
            'key' => $key,
            'seconds' => $time,
            ));
        return $result[$key];
    }

    public function exists($key) {
        $result = $this->request('exists', array(
            'key' => $key,
            ));
        return $result[$key] === 1;
    }
}

?>
