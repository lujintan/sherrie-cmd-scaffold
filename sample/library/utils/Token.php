<?php 

class Utils_Token {
    public function generate($app) {
        return $this->_gen($app, 'Builder/VrSK8+lhEOub4PZuQVM7Y/Y1X8LSCjZrgoe=', 86400000);
    }

    public function generatePreview($app) {
        return $this->_gen($app, 'Worker/3YymZu4plwC0dF0GAYZNSGAJP3h2hR3DcH0U=', 120);
    }

    private function _gen($app, $secret, $timeout) {
        $appid = $app['appid'];
        $tplid = $app['tplid'];
        $userid = $app['userid'];

        $vendorBuf = substr(base64_decode(substr($secret, 0, 6).'=='), 0, 4);

        $time = time();
        $expires = $time + $timeout;

        $bytes = pack('IIIIII',
                $time,
                $appid ^ $time,
                ($userid / 4294967296) ^ $time,
                $userid ^ $time,
                $tplid ^ $time,
                $expires ^ $time
        );
        $bytes .= pack('II', crc32($bytes), 0x04040404);

        $secrets = base64_decode($secret);

        $td = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '', MCRYPT_MODE_CBC, '');
        mcrypt_generic_init($td, substr($secrets, 0, 16), substr($secrets, 16, 16));
        $ciphered = mcrypt_generic($td, $bytes);

        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);

        $output = strtr(base64_encode($ciphered.$vendorBuf), array(
                '=' => '_',
                '+' => '-',
                '/' => '*'
        ));

        $output = substr($output, 17) . substr($output, 0, 17);

        return $output;
    }

    public static function decode($token) {
        if(strlen($token) !== 48){
            return null;
        }
        $bytes = base64_decode(strtr(substr($token, 31) . substr($token, 0, 31), array(
                '_' => '=', '-' => '+', '*' => '/'
        )));
        $secrets = array('AppSe'=>'AppServer/NHw+coGOb2Xmg8GLo1StW+MfDStNFutyq=','Build'=>'Builder/VrSK8+lhEOub4PZuQVM7Y/Y1X8LSCjZrgoe=','Worke'=>'Worker/3YymZu4plwC0dF0GAYZNSGAJP3h2hR3DcH0U=');
        $vendor = substr(base64_encode(substr($bytes, 32)), 0, 5);
        $secrets = base64_decode($secrets[$vendor]);

        $td = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '', MCRYPT_MODE_CBC, '');
        mcrypt_generic_init($td, substr($secrets, 0, 16), substr($secrets, 16, 16));
        $deciphered = mdecrypt_generic($td, $bytes);

        $tmp = unpack('I', substr($deciphered, 24));

        if(crc32(substr($deciphered, 0, 24)) ^ $tmp[1] & 0xFFFFFFFF) {
            return null;
        }

        $tmp = unpack('I6', $deciphered);

        $time = $tmp[1];
        $expires = $tmp[6] ^ $time;
        if($expires < time()) {
            return null;
        }
        return array(
                'input' => $token,
                'vendor'=> $vendor,
                'appid' => $tmp[2] ^ $time,
                'userid'=> ($tmp[3] ^ $time) * 4292967296 + ($tmp[4] ^ $time),
                'tplid' => $tmp[5] ^ $time,
                'expires'=> $expires
        );
    }
}

?>
