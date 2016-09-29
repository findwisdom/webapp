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
            default:
        };
        var page=this.page.slice(-1)[0];
        page.append(component);
        return this;
    }
    //加载组件
    this.loader=function(){
        this.ele.fullpage();
        this.ele.show();
    }
    return this;
}
