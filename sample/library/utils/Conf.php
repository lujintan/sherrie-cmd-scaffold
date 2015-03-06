<?php
class Utils_Conf
{
    public static function getHost($name = null) {
        $conf = Bd_Conf::getAppConf('hotspot');
        if (!$name) {
            $name = 'hotspot';
        }
        $host = $conf['hosts'][$name];
        if (HS_DEV && $name == 'hotspot') {
            $host = $_SERVER['HTTP_HOST'];   // fortest
        }
        return $host;
    }
}
