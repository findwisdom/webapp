/* 基本图文组件对象 */
function h5contentbar_v(name,cfg){
    var h5bar_v=new h5contentbase(name,cfg);
    $.each(cfg.data,function(idx,item){
        var line=$('<div class="line_bar_v" id="line_v'+idx+'"></div>');
        var name=$('<div class="bar_v_name" id="name_v'+idx+'">'+item[0]+'</div>');
        var rate=$('<div class="bar_v_rate" id="rate_v'+idx+'"></div>');
        var bg=$('<div class="bar_v_bg" id="bg_v'+idx+'"></div>');
        var per=$('<div class="bar_v_per" id="per_v'+idx+'">'+item[1]*100+'%</div>');
        line.width(cfg.width/2/cfg.data.length);
        rate.height(item[1]*100*0.8+'%');
        rate.width('60%');
        rate.css('marginLeft',-parseInt(rate.width()/4));
        rate.append(per).append(bg);
        bg.css({'background-color':item[2]});
        line.append(rate).append(name);
        h5bar_v.append(line);
    })
    return h5bar_v;
}
