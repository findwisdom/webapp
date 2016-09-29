/* 基本图文组件对象 */
function h5contentpoint(name,cfg){
   var h5point =new h5contentbase(name,cfg);
    //以第一个大大小为参考系
   var base=cfg.data[0][1];
    //输出每一个point
    $.each(cfg.data,function(idx,item){
        var point = $('<div class="point point_'+idx+'"></div>');
        var point_copy = $('<div class="point_copy"></div>');
        var per = (item[1]/base*100)+'%';
        var point_name=$('<div class="point_name">'+item[0]+'</div>');
        var point_per =$('<div class="point_per">'+per+'<div>');
        point.append(point_name);
        point_name.append(point_per);
        point.width(per).height(per);
        if(item[2]){
            point.css('background-color',item[2]);;
        }
        if(item[3]!==undefined&&item[4]){
            point.css({'left':item[3],'top':item[4]});
        }
        point_copy.css({'left':cfg.data[0][3],'top':cfg.data[0][4],})
        h5point.append(point);
        h5point.append(point_copy);
    })
    return h5point;
}
