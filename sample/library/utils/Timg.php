<?php

class Utils_Timg{
    public static function compressAsArr($name, $url, $name, $quality = 50, $width = 800, $height = 800) {
        if(!is_array($url)){
            throw new Exception("Timg url not array", 1);
        }
        foreach ($url as $key => $value) {
            $url[$key][$name] = self::compress($name, $url[$key][$name], $quality, $width, $height);
        }
        return $url;
    }

    public static function compress($name, $url, $quality = 50, $width = 800, $height = 800){

        if($url == ''){
            return $url;
        }

        $staticDomain = "http://hotspot.baidu.com";
        
        $key = "wisetimgkey";
        $domain = 'http://tc2.baidu-1img.cn/timg?pa';
        $sec = time();

        if(strpos($url,"https")===0){
            $src = preg_replace('/^https/i','http',$url);
        }elseif(strpos($url,"http")===0){
            $src = $url;
        }else{
            $src = $staticDomain.$url;
        }

        $di = md5($key.$sec.$src);
        $src = Urlencode($src);
        $url = $domain.'&Imgtype=0&sec='.$sec.'&di='.$di.'&quality='.$quality.'&size=b'.$width.'_'.$height.'&src='.$src;
        return $url;

    }
}