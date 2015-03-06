<?php

class Light_Service {

    public function __construct($appid) {
        $this->appid = $appid;
        $this->conf = Bd_Conf::getAppConf('lightservice');
    }

    public function getSecret() {
        $params = array(
            'event' => 'detail',
            'sid' => $this->appid,
            'get_pricelist' => 0,
            );
        $data = $this->request($params);
        return array(
            'sp_no' => $data['sp_no'],
            'sp_sk' => $data['sp_sk'],
            );
    }

    public function getSpot($spotId = null) {
        $params = array(
            'event' => 'detail',
            'sid' => $this->appid,
            );
        if ($spotId) {
            $params['spot_id'] = $spotId;
        }
        $data = $this->request($params);
        if (count($data) == 0) {
            throw new Exception("No spot data:$spotId", 1);
        }
        unset($data['sp_sk']);
        return $data;
    }

    public function request($params) {
        $api = $this->conf['api']['etickets'];
        $result = Utils_Http::get('lightservice', $api, $params);    
        $data = json_decode($result, true);
        if (isset($data['error_code'])) {
            throw new Exception("Request lightservice failed, caused by:$result", 1);
        }
        return $data['data'];
    }
}