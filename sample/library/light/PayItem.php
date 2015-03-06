<?php

class Light_PayItem extends Light_Schema {

    protected $schema = array(
        'item_id' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '20',
            ),
        'name' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '50',
            ),
        'desc' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '500',
            ),
        'price' => array (
            'optional' => false,
            'type' => 'int',
            'limit' => null,
            ),
        'amount' => array (
            'optional' => false,
            'type' => 'int',
            'limit' => null,
            ),
        'url' => array (
            'optional' => true,
            'type' => 'string',
            'limit' => '200',
            ),
        'item_details' => array (
            'optional' => false,
            'type' => 'object',
            'limit' => null,
            'schema' => array(
                'is_refundable' => array (
                    'optional' => false,
                    'type' => 'int',
                    'limit' => null,
                    ),
                'enable_time' => array (
                    'optional' => false,
                    'type' => 'int',
                    'limit' => null,
                    ),
                'expire_time' => array (
                    'optional' => false,
                    'type' => 'int',
                    'limit' => null,
                    ),
                'customer' => array (
                    'optional' => true,
                    'type' => 'int',
                    'limit' => null,
                    ),
                )
            ),
        );


}