<?php

class Light_Schema{

    protected $schema = array();

    public function validate() {
        $data = $this->data;
        Utils_Schema::validate($this->schema, $data);
    }

    public function toArray() {
        $this->validate();
        return $this->data;
    }
}