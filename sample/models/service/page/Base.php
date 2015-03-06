<?php

class Service_Page_Base {

    // public function execute($params) {

    //     try {
    //         $data = $this->exec($params);
    //     } catch (Exception $e) {
    //         Bd_Log::warning($e);
    //         return array('errno'=>$e->getCode(), 'errmsg'=>$e->getMessage());
    //     }
    //     return array('errno'=>0, 'data'=>$data);
    // }

    public function exec() {
        return null;
    }
}