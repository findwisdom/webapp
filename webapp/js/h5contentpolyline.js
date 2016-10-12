/* 基本图文组件对象 */
function h5contentpolyline(name,cfg){
   var h5polyline =new h5contentbase(name,cfg);
    //以第一个大大小为参考系
    //绘制网格
    var w = cfg.width;
    var h = cfg.height;
    var cns_1 = document.createElement('canvas');
    var cxt_1 = cns_1.getContext('2d');
    cns_1.height = h;
    cns_1.width = w;
    h5polyline.append(cns_1);
    cxt_1.beginPath()
    cxt_1.lineWidth =1;
    cxt_1.strokeStyle='#515151';
    var step =10;
    for(var i=0; i<step+1;i++){
        var y=i*h/step;
        cxt_1.moveTo(0,y);
        cxt_1.lineTo(w,y);
    }
    for(var i=0;i<cfg.data.length+2;i++){
        var text_w=w/(cfg.data.length+1);
        var x=i*w/(cfg.data.length+1);
        cxt_1.moveTo(x,0);
        cxt_1.lineTo(x,w);
        //绘制项目名字
        var text=$('<div class="text"></div>');
        if (cfg.data[i]){
            text.text(cfg.data[i][0]);
            text.css({'width':text_w/2,'left':x/2+text_w/4,'top':h/2+6});
            h5polyline.append(text);
        }
    }
    cxt_1.closePath();
    cxt_1.stroke();

    //折线控制动画函数
        //绘制折线
        var cns_2 = document.createElement('canvas');
        var cxt_2 = cns_2.getContext('2d');
        cns_2.height = h;
        cns_2.width = w;
        h5polyline.append(cns_2);
        //绘制数据点
    function draw(per) {
        cxt_2.clearRect(0,0,w,h);
        cxt_2.beginPath()
        cxt_2.lineWidth = 1;
        cxt_2.strokeStyle = '#ff6000';
        cxt_2.fillStyle = "#ff6000";
        var row_w = w/(cfg.data.length + 1);
        for (var i in cfg.data) {
            var item = cfg.data[i];
            var x = i* row_w + row_w;
            var y = h-h*item[1]*per;
            cxt_2.moveTo(x, y);
            cxt_2.arc(x, y, 7, 0, 2 * Math.PI);
        }
        cxt_2.fill();
        //绘制数据线
        cxt_2.beginPath();
        cxt_2.lineWidth = 2;
        cxt_2.strokeStyle = '#ff6000';
        cxt_2.moveTo(row_w,h-h*cfg.data[0][1]*per);
        for (var i in cfg.data) {
            var item = cfg.data[i];
            var x = i * row_w + row_w;
            var y = h-h*item[1]*per;
            cxt_2.lineTo(x, y);
        }
        //绘制数据
        for (var i in cfg.data) {
            var item = cfg.data[i];
            var x = i * row_w + row_w;
            var y = h-h*item[1]*per;
            cxt_2.font="italic small-caps bold 24px arial";
            cxt_2.fillText(item[1] * 100 + '%', x - 20, y - 30);
        }
        //绘制阴影
        cxt_2.stroke();
        cxt_2.strokeStyle = 'rgba(255,96,0,0.1)';
        cxt_2.lineWidth = 1;
        cxt_2.fillStyle = 'rgba(255,96,0,0.1)';
        cxt_2.lineTo(row_w * cfg.data.length, h);
        cxt_2.lineTo(row_w, h);

        cxt_2.fill();
        cxt_2.stroke();
    }


    h5polyline.on('onload',function(){
        var s=0;
        for(var i=0;i<100;i++) {
            setTimeout(function(){
                s+=0.01;
                draw(s)},
                i * 10+500)
        }
    })
    h5polyline.on('onleave',function(){
        var s=0.5;
        for(var i=0;i<5;i++) {
            setTimeout(function(){
                    s-=0.1;
                    draw(s)},
                i * 100)
        }
    })
    return h5polyline;
}
