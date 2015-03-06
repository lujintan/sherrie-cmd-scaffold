<?php

class Action_Introduce extends Base_Action {
    public function exec($req, $res) {
        $data = $this->appinfo;
        $timg = new Utils_Timg();

        $introduce = $this->appmodules['introduce'];

        $this->getView()->assign('title', '景区介绍');

        $this->getView()->assign('introduce', $introduce);

        $data['tpl'] = 'introduce';
        $data['widgettype'] = 'introduce';
        $this->getView()->assign('tplData', $data);
        $this->getView()->display('app/page/module.tpl');
    }
}
