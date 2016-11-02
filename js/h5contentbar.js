/* 基本图文组件对象 */
function h5contentbar(name,cfg){
    var h5bar=new h5contentbase(name,cfg);
    $.each(cfg.data,function(idx,item){
        var line=$('<div class="line_bar" id="line'+idx+'"></div>');
        var name=$('<div class="bar_name" id="name'+idx+'">'+item[0]+'</div>');
        var rate=$('<div class="bar_rate" id="rate'+idx+'"></div>');
        var bg=$('<div class="bar_bg" id="bg'+idx+'"></div>');
        var per=$('<div class="bar_per" id="per'+idx+'">'+item[1]*100+'%</div>');
        rate.width(item[1]*100+'%');
        rate.append(bg);
        bg.css({'background-color':item[2]});
        line.append(name).append(rate).append(per);
        h5bar.append(line);
    })
    return h5bar;
}
