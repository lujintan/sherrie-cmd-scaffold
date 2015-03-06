<?php

class Utils_PhoneVerify {

    public static function verify($uid, $tel, $code = null) {
        $key = self::key($uid, $tel);
        $disable = self::key($uid, $tel, 'disable');
        if ($code) {
            $verifyCode = Utils_Redis::inst()->get($key);
            if ($code != $verifyCode) {
                throw new Exception("Code verify failed, code:$code", 1);
            } else {
                // mark the tel is verified.
                Utils_Redis::inst()->set($key, 'verifed');
            }
        } else {
            // check if disable
            if (Utils_Redis::inst()->exists($disable)) {
                throw new Exception("Phone is disabled.", 1);
            }
            $code =  self::genCode();

            $msg = join("",array(
                "购票验证码为",
                $code,
                "，请在30分钟内填写。"
            ));

            // Utils_Sms::_send($tel, $code);
            Utils_Sms::_send($tel, $msg);
            Utils_Redis::inst()->set($key, $code);
            Utils_Redis::inst()->expire($key, 30*60); // 30 minutes expire

            // disable phone in 60s
            Utils_Redis::inst()->set($disable, 1);
            Utils_Redis::inst()->expire($disable, 60); // 1 minutes
        }
    }

    public static function key($uid, $tel, $attr = 'code') {
        return "hs:uid:$uid:phone:".intval($tel).":$attr";
    }

    public static function genCode() {
        return strval(rand(1000, 9999));
    }

    public static function info($uid, $tel) {
        $key = self::key($uid, $tel);
        $verifed = false;
        $verifed = Utils_Redis::inst()->get($key) == 'verifed';
        if (!$verifed) {
            // secure mobile is verifed
            $data = Bd_Passport::getInfoByuid($uid, array('securemobil', 'userid',));
            $mobile = $data['content'][0]['result_params'][$uid]['securemobil'];
            $verifed = $tel == $mobile;
        }
        return array('verifed' => $verifed,);
    }
}