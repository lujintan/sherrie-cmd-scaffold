<?php
class Utils_Test {


    public static function getSecret() {
        // rd appoint 
        // return array('sp_no'=>52174, 'sp_sk'=>'Gv8uvFxDgufQ7jUyZqZFdNk5lIDzKUfW');
        // qa
        // return array('sp_no'=>1012, 'sp_sk'=>'LINUYSjlQy7kuhKVrDDskzS4zswnvtOd');
        // return array('sp_no'=>1004, 'sp_sk'=>'LINUYSjlQy7kuhKVrDDskzS4zswnvtOd');
        return array('sp_no'=>1002, 'sp_sk'=>'NSelH6dZNHMPyqN4hzI4tBLbxBIQolhx');
        // rd
        // return array('sp_no'=>1012, 'sp_sk'=>'VVJfsdJXgtTNX8KjhdhnV9K2HgrdOdCY');
        // return array('sp_no'=>52060, 'sp_sk'=>'yWvENP4dn2aVfmZF5gDRs1iJIB7LhCH9');
    }

    public static function getPay() {
        return new Light_Pay(self::getSecret());
    }

    // 西湖 qa 数据
    // public static $appid = '100405';
    // public static $appid = '137099';
    // public static $appid = '100405';
    public static $appid = '114015';

         // fortest
    // public static $uid = 104048936; // fortest renlei8009 rdtest
    // public static $uid = 200063986; // fortest renlei8009 qatest
    public static $uid = 200063310; // fortest dev_test3 qatest
    // public static $uid = 70413763;  // yanlong online
    // public static $uid = 70413763;
}
