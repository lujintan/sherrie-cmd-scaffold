<?php
function smarty_compiler_framework($arrParams,  $smarty){
    $strResourceApiPath = preg_replace('/[\\/\\\\]+/', '/', dirname(__FILE__) . '/FISResource.class.php');
    $strFramework = $arrParams['framework'];
    unset($arrParams['framework']);
    $strAttr = '';
    $strCode  = '<?php ';

    if (isset($strFramework)) {
        $strCode .= 'if(!class_exists(\'FISResource\')){require_once(\'' . $strResourceApiPath . '\');}';
        $strCode .= 'FISResource::setFramework(FISResource::load('.$strFramework.', $_smarty_tpl->smarty));';
    }
    $strCode .= ' ?>';
    foreach ($arrParams as $_key => $_value) {
        $strAttr .= ' ' . $_key . '="<?php echo ' . $_value . ';?>"';
    }
    return $strCode;
}


