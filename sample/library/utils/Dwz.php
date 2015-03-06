<?php

class Utils_Dwz {

    public static function create($url) {
        $data = array(
            'url' => $url,
            );
        $result = Utils_Http::post('dwz', '/create.php', null, $data);
        $data = json_decode($result, true);
        if (!$result || $data['status'] != 0) {
            throw new Exception("Create dwz failed:".$result, 1);
        }
        return $data['tinyurl'];
    }
}