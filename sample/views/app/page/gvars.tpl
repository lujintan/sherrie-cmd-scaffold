{%$menuCfg = [
    short => [
        introduce => [
            zh => '景区介绍',
            en => 'Introduction'
        ],
        tickets => [
            zh => '景区门票',
            en => 'Ticket'
        ],
        gallery => [
            zh => '景区图片',
            en => 'Pictures'
        ],
        ordercenter => [
            zh => '我的订单',
            en => 'Order '
        ],
        tourguide => [
            zh => '景区导览',
            en => 'Map'
        ],
        routes => [
            zh => '景区线路',
            en => 'Route'
        ],
        heatmap => [
            zh => '景区热力图',
            en => 'Heat map'
        ],
        weather => [
            zh => '景区天气',
            en => 'Weather'
        ],
        spotlist => [
            zh => '热门景点',
            en => 'Hot spots'
        ]
    ],
    long => [
        introduce => [
            zh => '景区介绍',
            en => 'Introduction To Scenic'
        ],
        tickets => [
            zh => '景区门票',
            en => 'Ticket Of Scenic'
        ],
        gallery => [
            zh => '景区图片',
            en => 'Pictures To Scenic'
        ],
        ordercenter => [
            zh => '我的订单',
            en => 'My Order '
        ],
        tourguide => [
            zh => '景区导览',
            en => 'Scenic spot map'
        ],
        routes => [
            zh => '景区线路',
            en => 'Route Of Scenic'
        ],
        heatmap => [
            zh => '景区热度',
            en => 'Heat map'
        ],
        weather => [
            zh => '景区天气',
            en => 'Weather'
        ],
        spotlist => [
            zh => '热门景点',
            en => 'Hot spots'
        ]
    ]
] scope="global"%}

{%$tplType=$tplData.tpl scope="global"%}


{%if $tplData.widgettype eq ''%}
    {%$widgettype='' scope="global"%}
{%else%}
    {%$widgettype=$tplData.widgettype|cat:"-" scope="global"%}
{%/if%}


