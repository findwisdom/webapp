/* 基本图文组件对象之饼图*/
function h5contentpie(name,cfg){
   var h5contentpie =new h5contentbase(name,cfg);

    var w = cfg.width;
    var h = cfg.height;
    var cns_1 = document.createElement('canvas');
    var cxt_1 = cns_1.getContext('2d');
    cns_1.height = h;
    cns_1.width = w;
    h5contentpie.append(cns_1);
//绘制数据层
    var r=w/2;
    var srad=0;
    var erad;
    var mrad;
    var color=['#535353','#535352','#535352','#535452','#535342','#533352']
    for(var i=0;i<cfg.data.length;i++){
        cxt_1.beginPath();
        mrad=2*Math.PI*cfg.data[i][1];
        erad=srad+mrad;
        cxt_1.moveTo(r,r);
        cxt_1.arc(r,r,r,srad,erad);
        srad=erad;
        cxt_1.fillStyle=cfg.data[i][2]||color.pop();
        cxt_1.fill();
        //绘制文字
        var text=$('<div class="text"></div>');
        var per=$('<div class="per"></div>');
        text.text(cfg.data[i][0]);
        per.text(cfg.data[i][1]*100+'%');
        per.append(text);
        h5contentpie.append(per);
        var x=r+r*Math.sin(0.5*Math.PI-srad);
        var y=r+r*Math.cos(0.5*Math.PI-srad);
        if(x>w/2){
            per.css('left',x/2+5);
        }else{
            per.css('right',(w-x)/2+5);
        }
        if(y>h/2){
            per.css('top',y/2+5);
        }else{
            per.css('bottom',(h-y)/2+10);
        }
        if(cfg.data[i][2]){
            per.css('color',cfg.data[i][2])
        }
        per.css('opacity',0);
    }
//绘制遮罩层
    var cns_2 = document.createElement('canvas');
    var cxt_2 = cns_2.getContext('2d');
    cns_2.height = h;
    cns_2.width = w;
    h5contentpie.append(cns_2);
    function draw(per){
        if(per>=1){
            h5contentpie.find('.per').css('opacity',1);
        }else{
            h5contentpie.find('.per').css('opacity',0);
        }
        cxt_2.clearRect(0,0,w,h);
        cxt_2.beginPath();
        cxt_2.moveTo(r,r);
        //cxt_2.arc(r,r,r,0,2*Math.PI*per);
        if(per<=0){
            cxt_2.arc(r,r,r,2*Math.PI,2*Math.PI*(1-per));
        }else{
            cxt_2.arc(r,r,r,srad,srad+2*Math.PI*(1-per));
        }
        cxt_2.fillStyle='#fff';
        cxt_2.fill();
    }
   h5contentpie.on('onload',function(){
        var s=0;
        for(var i=0;i<100;i++) {
            setTimeout(function(){
                s+=0.01;
                draw(s)},
                i * 10+500)
        }
    });
    h5contentpie.on('onleave',function(){
        var s=0.5;
        for(var i=0;i<5;i++) {
            setTimeout(function(){
                    s-=0.1;
                    draw(s)},
                i * 100)
        }
    });
    return h5contentpie;
}
