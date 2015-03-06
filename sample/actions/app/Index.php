<?php

class Action_Index extends Base_Action {
    public function exec($req, $res) {
        // Get index setting
        $data = $this->appinfo;
        // Get tpls for modules
        $modules = array();
        $navs = is_array($data['navs']) ? $data['navs'] : array();
        foreach ( $navs as $key => $value) {
            if ($value['action']['type'] == 'module') {
                $name = $value['action']['value'];
                $file = APP_PATH.'/hotspot/views/app/page/'.$name.'.tpl';
                if (file_exists($file)) {
                    $modules[] = $name;
                }
            }
        }

        $timg = new Utils_Timg();

        $data['style']['backgroundImg'] = $timg->compress('mp', $data['style']['backgroundImg'] , $quality = 80, $width = 400, $height = 640);

        if (in_array('gallery', $modules)) {
            $moduleGallery = $this->appmodules['gallery'];
            $gallery = $moduleGallery['source']['customer']['items'];
            foreach ($gallery as $key => $value) {
                $moduleGallery['source']['customer']['items'][$key]['images'] = $timg->compressAsArr('mp', $gallery[$key]['images'], 'url' , $quality = 70, $width = 800, $height = 800);
            }
        }
        //print_r($data);
        // 封面菜单背景用timg处理
        foreach ($data['navs'] as $key => $val) {
            if ($val['image']) {
                $data['navs'][$key]['image'] = $timg->compress('mp', $val['image'] , $quality = 70, $width = 400, $height = 100);
            }
        }

        // die(json_encode($moduleGallery));
        //$data["tpl"] = "hotspring";

        $this->getView()->assign('apptoken', $req->getParam('apptoken'));

        $this->getView()->assign('setting', $this->setting);
        // die(json_encode($data));
        $this->getView()->assign('moduleGallery', $moduleGallery);
        $this->getView()->assign('modules', $modules);

        $data['widgettype'] = 'cover';

        if (isset($_GET['debug']) && $_GET['debug'] == 'var_dump') {
            var_dump(nl2br(str_replace(" ", "&nbsp;", var_export($data, true))));
            exit();
        }

        $data['widgettype'] = 'cover';
        $this->getView()->assign('tplData', $data);
        $this->getView()->display('app/page/page.tpl');
    }


}
