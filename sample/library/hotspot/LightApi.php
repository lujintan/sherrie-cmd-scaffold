<?php

class Hotspot_LightApi {

    public $token;

    function __construct($token = null) {
        if(!$token) {
            if(isset($_GET['token'])) {
                $token = $_GET['token'];
            } else if(isset($_SERVER['HTTP_REFERER']) && preg_match('/\?(?:.+&)?token=([\w\-*]{48})(?:$|&)/', $_SERVER['HTTP_REFERER'], $m)){
                $token = $m[1];
            } else {
                throw new Exception('Bad Request');
            }
        } else if(is_array($token)) {
            if(isset($token['host'])) {
                self::$host = $token['host'];
            }
            $token = $token['token'];
        }
        $this->token = $token;
        // $this->file = new FileApi($token);
    }


    public function get($params) {
        return $this->request('get', $params);
    }

    public function query($params) {
        return $this->request('query', $params);
    }

    public function request($method, $params) {
        $data = array(
            'method' => $method,
            'params' => $params,
            );
        $qs = array(
            'token' => $this->token,
            );
        $result = Utils_Http::post('lightapi', '/api', $qs, json_encode($data));
        $content = json_decode($result, true);
        if (!isset($content['data'])) {
            throw new Exception("Request light api failed, result:$result", 1);
        }
        return $content['data'];
    }
}