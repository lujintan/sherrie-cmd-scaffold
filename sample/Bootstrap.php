<?php
ini_set('display_errors', 'On');
/**
 * @name Bootstrap
 * @desc 所有在Bootstrap类中, 以_init开头的方法, 都会被Ap调用,
 * 这些方法, 都接受一个参数:Ap_Dispatcher $dispatcher
 * 调用的次序, 和申明的次序相同
 * @author liukui
 */
class Bootstrap extends Ap_Bootstrap_Abstract{

    public function _initDefaultName(Ap_Dispatcher $dispatcher) {
        $dispatcher->setDefaultModule("Index")->setDefaultController("App")->setDefaultAction("index");
    }

    public function _initPlugin(Ap_Dispatcher $dispatcher) {
        $dispatcher->registerPlugin(new Plugin_Error());
        $dispatcher->registerPlugin(new Plugin_Token());
        $dispatcher->registerPlugin(new Plugin_User());
        $dispatcher->registerPlugin(new Plugin_Test());
        $dispatcher->registerPlugin(new Plugin_Global());
    }

    public function _initRoute(Ap_Dispatcher $dispatcher) {
        //注册自定义路由
    }

    public function _initView(Ap_Dispatcher $dispatcher){
        $isDebug = isset($_REQUEST['hs_debug']) || strpos($_SERVER['HTTP_REFERER'], 'hs_debug') !== false;
        define('HS_DEBUG', $isDebug);
        //注册自定义view\
        $view = new Hotspot_Template();
        $conf = Bd_Conf::getAppConf('hotspot');
        define('HS_DEV', $conf['app']['isDev'] == 1);
        define('HS_FIS', $conf['app']['useFis'] == 1);
        $path = APP_PATH.'/hotspot/views';
        if (HS_FIS) {
            $path = APP_PATH.'/hotspot/template';
        }
        $view->_setScriptPath($path);
        $dispatcher->setView($view);
        //禁止ap自动渲染模板
        $dispatcher->disableView();
    }

}
