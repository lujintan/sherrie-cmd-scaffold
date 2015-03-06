<?php
class Controller_App extends Ap_Controller_Abstract{
    public $actions = array(
    	'index' => 'actions/app/Index.php',
        'mp' => 'actions/app/Mp.php',
        'cover' => 'actions/app/Cover.php',
        'tickets' => 'actions/app/Tickets.php',
        'spot' => 'actions/app/Spot.php',
        'test' => 'actions/app/Test.php',
        'weather' => 'actions/app/Weather.php',
        'gallery' => 'actions/app/Gallery.php',
        'introduce' => 'actions/app/Introduce.php',
    );

    public function init() {
        // Get global config
        // $lightapi = new Hotspot_LightApi();
        // $data = $lightapi->get(array(array('index', 'modules')));
        // $data['index']['isBox'] = self::isBox();
        // $data['index']['isWise'] = self::isWise();
        // $this->appinfo = $data['index'];
        // $this->appmodules = $data['modules'];
    }

    public static function isBox(){
        $RegExp1 = '/baiduboxapp\//';
        $RegExp2 = '/iPhone.*baidubrowser\//';

        $UA =  $_SERVER['HTTP_USER_AGENT'];
        $result = preg_match($RegExp1, $UA) || preg_match($RegExp2, $UA);
        return $result;
    }

    public static function isWise(){
        return $_GET['bd_from_id'];// == 'wise';
    }
}
