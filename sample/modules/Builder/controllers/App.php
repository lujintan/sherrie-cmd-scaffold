<?php
class Controller_App extends Ap_Controller_Abstract{

    public function init() {
        $module = $this->getModuleName();
        $path = APP_PATH."/hotspot/modules/$module/views";
        if (HS_FIS) {
            $path = APP_PATH."/hotspot/template_builder";
        }
        $this->getView()->_setScriptPath($path);
        $this->appid = $this->getRequest()->getParam('appid');
    }
    public $actions = array(
        'hello' => 'actions/app/Hello.php',
        'index' => 'actions/app/Index.php',
        );

    public function testAction() {
        $this->getView()->display('tpls/test.tpl');
    }

    public function manageAction() {
        $url = 'http://'.Utils_Conf::getHost('cms').'/cms/index/'.$this->appid;
        $this->getView()->assign('cms', $url);
        $this->getView()->display('tpls/manage.tpl');
    }

    public function createAction() {
        //设置模板可选颜色
        $color = array(
            '#111',
            '#333',
            '#555',
            '#777',
            '#999'
            ); 
        //设置可选模板
        $templates = array(
            'hotSpring' => '温泉',
            'skiing'    => '滑雪'
            );
        $this->getView()->assign('color', $color);
        $this->getView()->assign('templates', $templates);
        $this->getView()->display('tpls/create.tpl');
    } 

    public function guideAction() {
        $cookie = $_SERVER['HTTP_COOKIE'];
        $url = 'http://appbuilder.baidu.com/tokens/generate/';
        $ch = curl_init($url.rand(1000000,9999999));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'user-agent' => 'user-agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            ));
        curl_setopt ($ch, CURLOPT_COOKIE, $cookie );
        $result = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($result,true);
        $token =$data['token'];
        if (!$token) {
            // die('更新bduss!');
            $u = 'http://'.$_SERVER['HTTP_HOST'].'/builder/app/guide';
            $this->redirect('http://passport.baidu.com/?login&u='.urlencode($u));
        }
        $this->getView()->assign('token', $token);
        $this->getView()->display('tpls/guide.tpl');
    }

}
