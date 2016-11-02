/* 基本图文组件对象 */
function h5contentring(name,cfg){
    var h5contentring =new h5contentbase(name,cfg);

    var w = cfg.width;
    var h = cfg.height;
    var cns_1 = document.createElement('canvas');
    var cxt_1 = cns_1.getContext('2d');
    cns_1.height = h;
    cns_1.width = w;
    h5contentring.append(cns_1);
//绘制数据层
    var r=w/2;
    var srad=0;
    var color=['#535353','red','#535352','#535452','#535342','#533352']
    var linewidth=40;
        cxt_1.beginPath();
        cxt_1.arc(r,r,r-linewidth,0,2*Math.PI);
        cxt_1.fillStyle='rgba(255,255,255,0.3)'
        cxt_1.fill();

        cxt_1.beginPath();
        cxt_1.lineWidth=linewidth;
        cxt_1.arc(r,r,r-linewidth,0,2*Math.PI);
        cxt_1.strokeStyle='rgba(231,231,231,0.5)';//cfg.data[0][2]||color.pop();
        cxt_1.stroke();


        //绘制文字
        var text=$('<div class="text"></div>');
        var per=$('<div class="per"></div>');
        text.text(cfg.data[0][0]);
        per.text(cfg.data[0][1]*100+'%');
        per.append(text);
        h5contentring.append(per);

//绘制遮罩层
    var cns_2 = document.createElement('canvas');
    var cxt_2 = cns_2.getContext('2d');
    cns_2.height = h;
    cns_2.width = w;
    h5contentring.append(cns_2);
    function draw(per) {
        if (per >= 1) {
            h5contentring.find('.per').css('opacity', 1);
        } else {
            h5contentring.find('.per').css('opacity', 0);
        }
        cxt_2.clearRect(0, 0, w, h);
        cxt_2.beginPath();
        cxt_2.lineWidth = linewidth;
        mrad = 2 * Math.PI * cfg.data[0][1]*per;
        erad = srad + mrad;
        cxt_2.arc(r, r, r - linewidth, srad, erad);
        cxt_2.strokeStyle = cfg.data[0][2] || color.pop();
        cxt_2.stroke();

        //cxt_2.arc(r,r,r,0,2*Math.PI*per);
    }
    h5contentring.on('onload',function(){
        var s=0;
        for(var i=0;i<100;i++) {
            setTimeout(function(){
                    s+=0.01;
                    draw(s)},
                i * 10+500)
        }
    });
    h5contentring.on('onleave',function(){
        var s=0.5;
        for(var i=0;i<5;i++) {
            setTimeout(function(){
                    s-=0.1;
                    draw(s)},
                i * 100)
        }
    });
    return h5contentring;
}
