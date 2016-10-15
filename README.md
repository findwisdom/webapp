# 组件化开发webapp

运用依于fullpage.js，采用组件式开发，可通过链式调动的方式添加模块,构建前端页面

目前已经封装好复用率较高的八种常用的模块及图表，分别有有普通模块`base`,垂直柱图`bar_v`,水平柱图`bar`，饼图`pie`，点图`point`，折线图`polyline`,环图`ring`,雷达图`radar`.

### [Demo]( http://find_wisdom.coding.me/webapp)

![home](http://oe9d5k8dj.bkt.clouddn.com/home.png)


### 建议使用移动设备查看

![ma](http://oe9d5k8dj.bkt.clouddn.com/erweima.png);

### 载入资源
因为是依托于`fullpage.js`构建的组件所以在使用之前需要引入一些资源文件
    <script type="text/javascript" src="js/lib/jquery.js"></script>
    <script type="text/javascript" src="js/lib/jquery.fullPage.js"></script>
    <script type="text/javascript" src="js/H5.js"></script>
    <script type="text/javascript" src="js/H5_loading.js"></script>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/H5.css">
    <link rel="stylesheet" href="css/H5_loading.css">
    <script>
        var res=['base','bar','bar_v','point','polyline','radar','ring','pie'];//自己封装的组件
        var html=[];
        for(var s in res){
             html.push('<script type="text/javascript" src="js/h5content'+res[s]+'.js"><\/script>');
             html.push('<link rel="stylesheet" href="css/h5content'+res[s]+'.css">');
        }
        document.write(html.join(''));
    </script>
其中`res`数组放入了目前已经封装好的八个模块，可以只选取需要的模块载入资源，也可以自己开发创建新的模块资源。

### 界面引入模块方式 链式调用
    $(function){
        var ppt =new h5();
        ppt
        .addpage() //添加第一一页
            .addcontent()  //添加一个组件
            .addcontent()  //添加一个组件
        .addpage() //添加新的一页
            .addcontent()  //添加一个组件
        .addpage() //添加新的一页
            .addcontent() //添加一个组件
        .loader() //载入
    }

首先创建一个总的对象如`var ppt =new h5();`，随后使用 ` ppt.addpage()`添加页面，使用`.addcontent()`添加组件内容。

*具体方法

    $(function){
        var ppt =new h5();
        ppt
            .addpage('text')
                .addcontent('name',{ //添加模块的class类名
                    type:'base', //添加模块的类型
                    width:400,   //添加模块的宽度
                    height:400,  //添加模块的高度
                    bg:'imgs/wlecome.png', //添加模块的背景图片
                    css:{        //模块本身CSS样式
                        opacity:0,
                        top:'10%',
                        backgroundSize:'contain',
                        backgroundPosition:'center',
                        'transform':'rotate(0)',
                        '-webkit-transform':'rotate(0)'
                        },
                    cssIn:{      //页面进入样式
                         opacity:1,
                         'transform':'rotate(360deg)',
                         '-webkit-transform':'rotate(360deg)'
                     },
                    cssOut:{    //页面离开样式
                         opacity:0,
                         'transform':'rotate(0)',
                         '-webkit-transform':'rotate(0)'
                    },
                    center:true   //是否设置居中
                    onclick:function(){  //设置模块触发点击事件后执行函数
                        $.fn.fullpage.moveTo( 1 )
                    }
                })
            .addpage()
                .addaddcontent()
            .loader()
     }

目前暂时提供了这些接口，若想要跟多接口可在`h5contentbase`中继续开发添加
---
#### 提供的`.addcontent`参数接口

| 参数             | 设置                                             |
 ----------------- | ------------------------------------------------ |
| type             | `base`,`bar`,`bar_v`,`pie`,`point`,`radar`,`ring`|
| width 模块高度           |    400         |
| height 模块高度          | 400  |
| bg 模块背景              | 'imgs/wlecome.png' |
| css 模块样式             | opacity:0 |
| cssIn 页面划入时样式           | opacity:1 |
| cssOut 页面划出样式          | opacity:1 |
| center 是否居中          | true |
| onclick 点击后触发函数          | function(){} |

---
### `type`模块类型介绍

#### 基本类型模块`base`

![home](http://oe9d5k8dj.bkt.clouddn.com/home.png)

#### 柱图`bar_v`,`bar`

![bar](http://oe9d5k8dj.bkt.clouddn.com/bar_v.png)

#### 折线图`polyline`

![polyline](http://oe9d5k8dj.bkt.clouddn.com/polyline.png)

#### 雷达图`radar`

![radar](http://oe9d5k8dj.bkt.clouddn.com/radar.png)

#### 环图`ring`

![ring](http://oe9d5k8dj.bkt.clouddn.com/ring.png)

#### 点图`point`

![point](http://oe9d5k8dj.bkt.clouddn.com/point.png)

### Thanks!
