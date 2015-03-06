<?php
class Light_Appoint extends Light_Schema{

    protected $schema = array(
        'order_no' => array (
            'optional' => false,
            'type' => 'string',
            'limit' => '20',
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
        'channel' => array (
            'optional' => true,
            'type' => 'string',
            'limit' => '200',
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

    public function addItem(Light_AppointItem $item) {
        $this->items[] = $item;
    }
}