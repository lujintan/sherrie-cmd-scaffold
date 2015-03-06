<?php
/**
* Runtime_Template
*
* 封装smarty 拼装最终的模板
*
* @author liukui [liukui@baidu.com]
* @version 1.0
*/
class Hotspot_Template implements Ap_View_Interface{
    private $smarty = NULL;
    public function __construct() {
        $this->smarty = Bd_TplFactory::getInstance();
        $this->smarty->addPluginsDir(dirname(__FILE__) . '/../plugins');           //增加插件目录

        //orp 暂不支持trimall
        //lego组件也不支持
        //$this->smarty->loadFilter('output','trimall');
        //mute include error

        $this->smarty->setConfigDir(dirname(__FILE__) . '/../../views/output/config');
        $this->smarty->setTemplateDir(dirname(__FILE__) . '/../../views/output/');


        $this->smarty->default_template_handler_func = '_mute_default_template_handler_func';

    }
    public function assign($name, $value = NULL){
        return $this->smarty->assign($name, $value);
    }
    public function display($file, $data = NULL){
        // die(json_encode($this->smarty->getTemplateDir()));
        echo $this->smarty->display($file);
    }
    public function render($file, $context = NULL){
        return $this->smarty->fetch($file);
    }

    public function getScriptPath(){}
    public function setScriptPath($dir){

    }
    public function _setScriptPath($dir) {
        $this->smarty->setTemplateDir($dir);
        // view path as config dir
        $this->smarty->addConfigDir($dir);
    }
}
function _mute_default_template_handler_func($type, $name, &$content, &$modified, Smarty $smarty){
    $muteTpl = 'runtime/common/mute/mute.tpl';
    return $muteTpl;
}
