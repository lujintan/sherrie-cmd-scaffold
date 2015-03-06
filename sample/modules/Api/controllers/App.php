<?php

class Controller_App extends Ap_Controller_Abstract {

    public function detailAction() {
        $res = $this->getResponse();
        $res->appendBody(file_get_contents(APP_PATH.'/hotspot/data/app_data_sample.json'));
    }

    public function dataAction() {
        $api = new Hotspot_LightApi();
        $data = $api->query(array(null));
        foreach ($data as $key => $value) {
            $data[$key] = json_decode($value, true);
        }
        echo json_encode($data);
    }

    public function timgAction () {
        $images = $_REQUEST['images'];
        $width = $_REQUEST['width'];
        $height = $_REQUEST['height'];
        $quality = $_REQUEST['quality'];
        if (!isset($images)) {
            throw new Exception("No images parameter.", 1);
        }
        if (is_array($images)) {
            foreach ($images as $key => $image) {
                $timgs[] = Utils_Timg::compress('mp', $image, $quality, $width, $height);
            }
        } else {
            $timgs = Utils_Timg::compress('mp', $images, $quality, $width, $height);
        }
        echo json_encode($timgs);
    }
}