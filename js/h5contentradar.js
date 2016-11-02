/* 基本图文组件对象 */
function h5contentradar(name,cfg){
   var h5radar =new h5contentbase(name,cfg);
    //以第一个大大小为参考系
    //绘制网格
    var w = cfg.width;
    var h = cfg.height;
    var cns_1 = document.createElement('canvas');
    var cxt_1 = cns_1.getContext('2d');
    cns_1.height = h;
    cns_1.width = w;
    h5radar.append(cns_1);
//绘制背景
    var rad =(2*Math.PI/360)*(360/cfg.data.length);
    var r=w/2;
    var istrue=true;
    for(var s=10;s>0;s--){
        cxt_1.beginPath();
        for(var i=0; i<cfg.data.length;i++){
            var x= r+r*Math.sin(rad*i)*s/10;
            var y= r+r*Math.cos(rad*i)*s/10;
            cxt_1.lineTo(x,y);
        }
        cxt_1.closePath();
        cxt_1.fillStyle=istrue?'#606060':'#fff';
        istrue=!istrue;
        cxt_1.fill();
    }
    //绘制伞骨图
    cxt_1.beginPath();
    for(var i=0; i<cfg.data.length;i++){
        var x= r+r*Math.sin(rad*i);
        var y= r+r*Math.cos(rad*i);
        cxt_1.moveTo(r,r);
        cxt_1.lineTo(x,y);

        //绘制数据
        var text=$('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        h5radar.append(text);

        if(x>w/2){
            text.css('left',x/2+3);
        }else{
            text.css('right',(w-x)/2+3);
        }
        if(y>h/2){
            text.css('top',y/2+3);
        }else{
            text.css('bottom',(h-y)/2+3);
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }
        text.css('opacity',0);
        text.css('transition-delay',i*0.2+'s');
    }
    cxt_1.lineWidth=3;
    cxt_1.strokeStyle='#606060';
    cxt_1.stroke();

//绘制数据层
    var cns_2 = document.createElement('canvas');
    var cxt_2 = cns_2.getContext('2d');
    cns_2.height = h;
    cns_2.width = w;
    h5radar.append(cns_2)


    function draw(per){
        if(per>=1){
            h5radar.find('.text').css('opacity',1);
        }else{
            h5radar.find('.text').css('opacity',0);
        }
        cxt_2.clearRect(0,0,w,h);
        cxt_2.beginPath();
        //绘制线
        for(var i=0; i<cfg.data.length;i++){
            var step=cfg.data[i][1];
            var x= r+r*Math.sin(rad*i)*step*per;
            var y= r+r*Math.cos(rad*i)*step*per;
            cxt_2,moveTo(r,r);
            cxt_2.lineTo(x,y);
        }
        cxt_2.strokeStyle='rgba(255,96,0,1)';
        cns_2.lineWidth=10;
        cxt_2.fillStyle = 'rgba(255,96,0,0.1)';
        cxt_2.fill();
        cxt_2.closePath();
        cxt_2.stroke();
//绘制点
        cxt_2.fillStyle='rgba(255,96,0,1)';
        for(var i=0; i<cfg.data.length;i++){
            cxt_2.beginPath();
            var step=cfg.data[i][1];
            var x= r+r*Math.sin(rad*i)*step*per;
            var y= r+r*Math.cos(rad*i)*step*per;
            cxt_2.arc(x,y,6,0,2*Math.PI);
            cxt_2.fill()
        }
    }

   h5radar.on('onload',function(){
        var s=0;
        for(var i=0;i<100;i++) {
            setTimeout(function(){
                s+=0.01;
                draw(s)},
                i * 10+500)
        }
    });
    h5radar.on('onleave',function(){
        var s=0.5;
        for(var i=0;i<5;i++) {
            setTimeout(function(){
                    s-=0.1;
                    draw(s)},
                i * 100)
        }
    });
    return h5radar;
}
