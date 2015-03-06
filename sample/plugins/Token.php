<?php

class Plugin_Token extends Ap_Plugin_Abstract {
    public function preDispatch($req, $res) {
        $action  =  $req->getActionName();
        if ($action == 'guide') {
            return;
        }
        $this->referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';

        // $this->parseAppid();
        $this->parseToken();

        if (!$this->appid) {
            throw new Exception("No appid or token.", 1);
        }
        $req->setParam('appid',$this->appid);
        $req->setParam('apptoken',$this->apptoken);
        $req->setParam('isOnline',$this->isOnline);
    }

    public function parseToken() {
        if ($_GET['token']) {
            $tokenstr = $_GET['token'];        
        } else if (preg_match('/\?(?:.+&)?token=([\w\-*]{48})(?:$|&)/', $this->referer, $m)){
            $tokenstr = $m[1];
        }
        if ($tokenstr === null) {
            // throw new Exception("No token.", 1);
            return ;
        }
        $token = Utils_Token::decode($tokenstr);        
        if ($token === null) {
            // throw new Exception("Parse token failed.", 1);
            return;
        }
        // Target: get appid
        $this->appid = $token['appid'];
        // Generate apptoken
        if ($token['vendor'] == 'Build') {
            // Can not urlencode token, lightapp.js while replaceState
            $this->apptoken = 'token='.$tokenstr;           
            $this->isOnline = false;
        } else {
            $this->apptoken = 'appid='.$this->appid;
            $this->isOnline = true;
        }
    }

    public function parseAppid() {
        if ($_GET['appid']) {
            $this->appid = $_GET['appid'];        
        } else if (preg_match('/\?(?:.+&)?appid=(\d{1,10})(?:$|&)/', $this->referer, $m)){
            $this->appid = $m[1];
        }
        if ($this->appid) {
            $this->apptoken = 'appid='.$this->appid;
        }
    }
}