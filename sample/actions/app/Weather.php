<?php

class Action_Weather extends Base_Action {


    function exec($req, $res) {
                // get weather data
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $cip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $cip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $cip = $_SERVER['REMOTE_ADDR'];
        }
        $from = '1009717j'; //100000;
        $key = 'fu1211jf32s'; // 'nishiwogege123';
        $word = $_REQUEST['word'];
        $auth = md5($from . $word . $cip . $key);

        $auth = $auth{7} . $auth{3} . $auth{17} . $auth{13} . $auth{1} . $auth{21};
        $params = array(
            'from' => $from,
            'cip' => $cip,
            'type' => 'html',
            'give' => 'weather_app',
            'count' => 0,
            'word' => $word,
            );
        /**
         * 调用大搜索接口获取阿拉丁 html 模板
         * @see {@link }
         * @example
         *   {@link http://m.baidu.com/uiapi/f1fe7b/aladdin.html?from=100000&cip=61.135.169.80&type=html&give=weather_app&debug=1&count=0&word=%E5%8C%97%E4%BA%AC%E5%A4%A9%E6%B0%94}
         */
        if (HS_DEV) {
            $weather = file_get_contents("http://m.baidu.com/uiapi/$auth/aladdin.html?".http_build_query($params));
        } else {
            $weather = Utils_Http::get('lightpay',"/uiapi/$auth/aladdin.html", $params);
        }
        /**
         * 在返回的阿拉丁 html 模板中，注入 css 和 js
         * css：
         *  隐藏分享和查看七日天气按钮
         * js:
         *  修改切换城市元素 id 名来解除城市切换按钮功能
         */
        $append = $this->getView()->render('page/modules/weather-append.tpl');
        $weather=preg_replace("/<\/head>/s", $append, $weather);

        echo $weather;
    }
}