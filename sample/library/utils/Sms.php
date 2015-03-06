<?php

class Utils_Sms {

    private static $DEFAULT = array(
        'priority' => 9,
        'transmitMode' => 0,
    );

    public function __construct($code, $username, $password, $option = array()) {
        $option['businessCode'] = $code;
        $option['username'] = $username;
        $option['password'] = $password;
        $this->config = array_merge(self::$DEFAULT, $option);
    }

    public function send($dest, $content) {
        $params = $this->config;
        $params['msgContent'] = $content;
        if (is_array($dest)) {
            $dest = implode(',', $dest);
        }
        $params['msgDest'] = $dest;
        $params['signature'] = $this->sign($params);

        $api = '/service/sendSms.json';

        unset($params['password']);
        $result = Utils_Http::post('runtime_emsg', $api, array(), $params);
        if (!$result) {
            throw new Exception("Http request sms service failed.", 1);
        }
        $content = json_decode($result, true);
        if ($content['result'] != 1000) {
            throw new Exception("Http request sms service failed.", 1);
        }
    }

    private function sign($params) {
        $keys = array('username', 'password', 'msgDest', 'msgContent', 'businessCode', 'priority', 'scheduledDate', 'extId', 'original', 'transmitMode');
        $qs = '';
        foreach ($keys as $key) {
            if (isset($params[$key])) {
                $qs .= $params[$key];
            }
        }
        return strtolower(md5($qs));
    }

    public static function _send($dest, $msg) {
        $sms = new Utils_Sms('emeishanlightapp01', 'emeishan01','baidulightapp');
        return $sms->send($dest, $msg);
    }
}