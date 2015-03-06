<?php

class Utils_Http {

    public static function request($service, $method, $data, $extra, $headers) {
        if (!strpos($service, '_')) {
            $service = 'hotspot_'.$service;
        }
        $ret = ral($service, $method, $data, $extra, $headers);
        if (!$ret) {
            $msg = array(
                'errno'=>ral_get_errno(),
                'error_msg'=>ral_get_error(),
                'protocol_status'=>ral_get_protocol_code(),
                );
            Bd_Log::warning(json_encode(compact('service', 'method', 'data', 'extra', 'headers', 'msg')));
            throw new Exception("Http request failed:".json_encode($msg), 1);
        }
        Bd_Log::trace(json_encode(compact('service', 'method', 'data', 'extra', 'headers')));
        return $ret;
    }

    public static function get($service, $path, $params, $headers=array(), $extra = array()) {
        $headers = array_merge($headers, array(
            'pathinfo' => $path,
            ));
        if ($params) {
            $headers['querystring'] = http_build_query($params);
        }
        return self::request($service, 'get', null, $extra, $headers);
    }

    public static function post($service, $path, $params, $data, $headers=array(), $extra = array()) {
        $headers = array_merge($headers, array(
            'pathinfo' => $path,
            ));
        if ($params) {
            $headers['querystring'] = http_build_query($params);
        }
        return self::request($service, 'post', $data, $extra, $headers);
    }
}