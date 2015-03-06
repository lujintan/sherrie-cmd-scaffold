<?php

function api_exception_handler($e) {
    header('Content-Type: application/json', true, 500);
    Bd_Log::warning($e);
    $msg = array(
        'errorCode' => $e->getCode(),
        'errorMsg' => $e->getMessage(),
        );
    echo json_encode($msg);
}

function page_exception_handler($e) {
    header('Content-Type: text/html', true, 500);
    Bd_Log::warning($e);
    if (HS_DEBUG) {
        echo 'Error Info:'.$e;
    } else {
        if (HS_DEV) {
            echo $e;
        } else {
    echo <<<EOF
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
<script type="text/javascript">
// alert("操作失败，再试一次吧~");
// history.back();
if (location.href.search('hs_retry') === -1)
location.href += '&hs_retry';
</script>    
</body>
</html>
EOF;
}
}
}

class Plugin_Error extends Ap_Plugin_Abstract {
    public function preDispatch($req, $res) {
        // die($req->getModuleName());
            // disable all cache
        header("Cache-Control: no-cache, no-store, must-revalidate");
        header("Pragma: no-cache");
        header("Expires: 0");
        if ($req->getModuleName() == 'Api') {
            header('Content-Type: application/json');
            set_exception_handler('api_exception_handler');
        } else { // page request
            set_exception_handler('page_exception_handler');
        }
    }
}