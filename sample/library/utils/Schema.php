<?php

class Utils_Schema {

    public static function validate($schema, $data) {
        foreach ($schema as $key => $rule) {
            if (!isset($data[$key])) {
                if ($rule['optional']) { // missing key is optinal.
                    continue;
                } else {
                    throw new Exception("Missing data:$key,", 1);
                }
            }
            $type = $rule['type'];
            $value = $data[$key];
            if ($type == 'array') {
                foreach ($value as $subValue) {
                    self::validate($rule['schema'], $subValue);
                }
            } else if ($type == 'object'){
                self::validate($rule['schema'], $value);
            } else {
                $method = 'is_'.$type;
                if (!$method($value)) {
                    throw new Exception("Wrong data type, key:$key, need:".$type, 1);
                }
                switch ($type) {
                    case 'string':
                    if ($rule['limit'] && mb_strlen($value) > $rule['limit']) {
                        throw new Exception("String length exceed, key:$key, limit:".$rule['limit'], 1);
                    }
                    break;

                    default:
                    # code...
                    break;
                }
            }
        }
    }
}