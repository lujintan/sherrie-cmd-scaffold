{
    index: {
        tpl: 'hotSpring', //滑雪
        title: 'xxx滑雪', //page title
        style: {
            themeColor: '#fff' //主题色
            backgroundImg:"",  //背景图片
        },
        navs: [{
            text: '我的订单',
            icon: 'xxx',
            image:"", //背景图片
            order: 5,
            action: {
                type: 'module', // module, innerLink,
                value: 'ordercenter'
            }
        },{
            text: '景区介绍',
            icon: 'xxx',
            image:""
            order: 1,
            image:""
            action: {
                type: 'module', // module, innerLink,
                value: 'introduce'
            }
        },{
            text: '景区图片',
            icon: 'xxx',
            image:"",
            order: 3,
            action: {
                type: 'module', // module, innerLink,
                value: 'gallery'
            }
        },{
            text: '热门景点',
            icon: 'xxx',
            image:"",
            action: {
                type: 'module', // module, innerLink,
                value: 'spotlist'
            }
        },{
            text: '天气',
            icon: 'xxx',
            image:"",
            action: {
                type: 'module', // module, innerLink,
                value: 'weather'
            }
        },{
            text: '景区线路',
            icon: 'xxx',
            order: 2,
            image:"",
            action: {
                type: 'module', // module, innerLink,
                value: 'routes'
            }
        },{
            text: '景区导览',
            icon: 'xxx',
            order: 4,
            action: {
                type: 'module', // module, innerLink,
                value: 'tourguide'
            }
        },{
            text: '景区门票',
            icon: 'xxx',
            order: 0,
            image:"",
            action: {
                type: 'module', // module, innerLink,
                value: 'tickets'
            }
        }
        ]
    },
    modules: { //模块的配置都放这里
        introduce: { //景区介绍
            name: '',
            image: '',
            address: '',
            traffic: '',
            open: '',
            best: '',
            detail: ''
        },
        tickets: { // 门票
  
        },
        spotlist: { // 热门景点
            from:"baidulvyou", //数据类型 baidulvyou customer
            source:{
                baidulvyou:{  //旅游数据
                    url:""// 数据连接
                },
                customer:{
                    items:[  //用户自定义景点
                        {
                            name:"",  //景区名称
                            image:'',   //景区图片
                            brief:"",    //景区简介
                            introduce:""   //景区介绍
                        }
                    ]
                }
            }
        },
        gallery: { // 图集
            from:"baidulvyou", //数据类型 baidulvyou customer
            source:{
                baidulvyou:{  //旅游数据
                    url:""// 数据连接
                },
                customer:{
                    items:[  //用户自定义图集
                        {
                            name:"",  //图集名称
                            images:[   //图集
                                {
                                    title:"",  //图片显示名称
                                    url:""
                                }
                            ]
                        }
                    ]
                }
            }
        },
        weather: { // 天气
 
        },
        routes: { // 路线
            outerTraffic: "", //外部交通
            innerTraffic: "", //内部交通
            tourAddress: { // 景区位置
                address:{
                    province:"", //省
                    city:"", //城市
                    regional:"", // 区域
                    street:""
                },
                point:{
                    lng:323, //经度
                    lat:323 //维度
                }
            }
        },
        tourguide: { // 导览图
            image: ""//url
        },
        weather:{
            province: "省和直辖市",
            city: "市，直辖市"
        },
        heatmap: { // 热力图
            province: "省，直辖市"
            city: "直辖市，或者市",
            poiname: "景区名称",
            centerPoint: ""
        }
    }
}