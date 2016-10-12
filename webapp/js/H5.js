/* 内容管理对象 */
function h5(){
    this.id=('h5_'+Math.random()).replace('.','_');
    this.ele=$('<div class="h5_ppt" id="'+this.id+'"></div>').hide();
    this.page=[];
    $('body').append(this.ele);
    //新增一个页
    this.addpage=function(name,text){
        var page =$('<div class="h5_page section"></div>');
        if(name!=undefined){
            page.addClass('h5_page_'+name);
        }
        if(text!=undefined){
            page.text(text);
        }
        this.page.push(page);
        this.ele.append(page);
        return this;
    }
    //新增一组件
    this.addcontent=function(name,cfg){
        cfg= $.extend({
            type:'base'
        },cfg||{});
        switch(cfg.type){
            case 'base':
                component =new h5contentbase(name,cfg);
                break;
            case 'bar':
                component =new h5contentbar(name,cfg);
                break;
            case 'bar_v':
                component =new h5contentbar_v(name,cfg);
                break;
            case 'pie':
                component =new h5contentpie(name,cfg);
                break;
            case 'point':
                component =new h5contentpoint(name,cfg);
                break;
            case 'polyline':
                component =new h5contentpolyline(name,cfg);
                break;
            case 'radar':
                component =new h5contentradar(name,cfg);
                break;
            case 'ring':
                component =new h5contentring(name,cfg);
                break;
            default:
        };
        var page=this.page.slice(-1)[0];
        page.append(component);
        return this;
    }
    //加载组件
    this.loader=function(images,firstPage){
        this.ele.fullpage({
            onLeave:function( index, nextIndex, direction) {
                $(this).find('.h5_contentbase').trigger('onleave');
            },
            afterLoad:function( anchorLink, index ) {
                $(this).find('.h5_contentbase').trigger('onload');
            }
        });
        this.page[0].find('.h5_contentbase').trigger('onload');
        this.ele.show();
        if(firstPage){
            $.fn.fullpage.moveTo( firstPage );
        }
    }
    this.loader = typeof H5_loading ==='function' ? H5_loading : this.loader;
    return this;
}
