<?php

class Base_Action extends Ap_Action_Abstract {

    public function execute() {
        Utils_Schema::validate($this->schema, $_REQUEST);
        $this->init();
        return $this->exec($this->_request, $this->_response);
    }

    public function init() {
        $lightapi = new Hotspot_LightApi();
        $data = $lightapi->get(array(array('index', 'modules', 'setting')));

        //channel
        if(isset($_REQUEST['bd_from_id'])){
            $channel = self::genChannel($_REQUEST);
        }else{
            $channel = '0';
        }
        $data['index']['channel'] = $channel;

        $whiteList = array(1630862, 1633136 );
        //优惠开关
        // $data['index']['isActivity'] = in_array(HS_APPID, $whiteList);
        $data['index']['isActivity'] = array(
            'st' => false,   //总开关
            0 => true, //预付
            1 => true,  //预订
        );
        //验证手机开关
        $data['index']['isVerifyTel'] = HS_PHONE_VERIFY; //in_array(HS_APPID, $whiteList);


        $data['index']['isBox'] = self::isBox();
        $data['index']['isWise'] = self::isWise();
        $this->appinfo = $data['index'];
        $this->appmodules = $data['modules'];
        $this->setting = $data['setting'];
    }

    public $schema = array();

    public function exec($req, $res) {}

    public static function genChannel($req){
        $from = array();
        $from['bd_from_id'] = isset($req['bd_from_id'])? $req['bd_from_id'] : '0';
        $from['bd_ref_id'] = isset($req['bd_ref_id'])? $req['bd_ref_id'] : '0';
        $from['bd_channel_id'] = isset($req['bd_channel_id'])? $req['bd_channel_id'] : '0';
        $from['bd_sub_page'] = isset($req['bd_sub_page'])? $req['bd_sub_page'] : '0';

        $channel = array();
        foreach ($from as $key => $value) {
            $channel[] = "$key=$value";
        }

        $channel = implode('|', $channel);

        return $channel;
    }

    public static function isBox(){
        $RegExp='/baiduboxapp\//';
        $UA =  $_SERVER['HTTP_USER_AGENT'];
        return preg_match($RegExp, $UA);
    }

    public static function isWise(){
        return isset($_GET['bd_from_id']);// == 'wise'
    }
}
