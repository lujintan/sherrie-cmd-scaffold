<?php

class Action_Gallery extends Base_Action {
    public function exec($req, $res) {
        $data = $this->appinfo;
        $timg = new Utils_Timg();

        $moduleGallery = $this->appmodules['gallery'];
        $gallery = $moduleGallery['source']['customer']['items'];
        foreach ($gallery as $key => $value) {
            $moduleGallery['source']['customer']['items'][$key]['images'] = $timg->compressAsArr('mp', $gallery[$key]['images'], 'url' , $quality = 70, $width = 800, $height = 800);
        }

        $this->getView()->assign('apptoken', $req->getParam('apptoken'));
        $this->getView()->assign('title', '景区图片');
        $this->getView()->assign('moduleGallery', $moduleGallery);

        $data['tpl'] = 'gallery';
        $data['widgettype'] = 'gallery';
        $this->getView()->assign('tplData', $data);
        $this->getView()->display('app/page/module.tpl');
    }
}
