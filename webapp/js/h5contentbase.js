/* 基本图文组件对象 */
function h5contentbase(name,cfg){
    var cfg= $.extend({},cfg||{});
    var id=('h5_content_'+Math.random()).replace('.','_');
    var cls=' h5_contentbasename_'+name;
    var h5_static ='h5_static';
    var content =$('<div class="h5_contentbase '+cls+' " id="'+id+'">');
    cfg.text && content.text(cfg.text);
    cfg.width && content.width(cfg.width/2);
    cfg.height && content.height(cfg.height/2);
    cfg.css && content.css(cfg.css);
    cfg.bg && content.css('backgroundImage','url('+cfg.bg+')')
    if(cfg.center===true){
        content.css({
            left:'50%',
            marginLeft:-cfg.width/4
        })
    }
    content.on('onload',function(){
        var h5_load='h5_static_'+name+'_load';
        var h5_leave='h5_static_'+name+'_leave';
        var _h5_load='.'+h5_load;
        $(_h5_load).stop();
        content.addClass(h5_load).removeClass(h5_leave);
        cfg.animateIn && content.animate(cfg.animateIn);
        return false;
    });
    content.on('onleave',function(){
        var h5_load='h5_static_'+name+'_load';
        var h5_leave='h5_static_'+name+'_leave';
        var _h5_leave='.'+h5_leave;
        $(_h5_leave).stop();
        content.addClass(h5_leave).removeClass(h5_load);
        cfg.animateOut && content.animate(cfg.animateOut);
        return false;
    })
    return content;
}
