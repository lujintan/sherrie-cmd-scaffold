<?php
 //强制取消Transfer-Encoding: chunked, wiaui不支持
ob_start('outputProcess');
function outputProcess($buff){
       header('Content-Length: '.strlen($buff)); 
    return $buff;
}
header("Access-Control-Allow-Origin:*");
Bd_Init::init()->bootstrap()->run();
?>
