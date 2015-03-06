<?php

class Light_AppointItem extends Light_Schema {

    protected $schema = array(
        'item_id' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '20',
            ),
        'cat_id' => array (
            'optional' => false,
            'type' => 'int',
            'limit' => null,
            ),
        'name' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '50',
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
        'desc' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '500',
            ),
        'remark' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '3000',
            ),
        'pick_way' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '50',
            ),
        'url' => array (
            'optional' => true,
            'type' => 'string',
            'limit' => '200',
            ),
        );


}