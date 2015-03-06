<?php

class Light_Order extends Light_Schema{

    protected $schema = array(
        'order_no' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '20',
            ),
        'total_amount' => array (
            'optional' => false,
            'type' => 'int',
            'limit' => null,
            ),
        'goods_name' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '128',
            ),
        'return_url' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => null,
            ),
        'page_url' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => null,
            ),
        'detail' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '5000',
            ),
        'order_source_url' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => null,
            ),
        'customer_name' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '32',
            ),
        'customer_mobile' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '32',
            ),
        'customer_address' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '32',
            ),
        );

    public function toArray() {
        $items = array();
        foreach ($this->items as $item) {
            $items[] = $item->toArray();
        }
        $this->data['detail'] = json_encode($items);
        $this->validate();
        return $this->data;
    }

    public function addItem(Light_PayItem $item) {
        $this->items[] = $item;
    }
}