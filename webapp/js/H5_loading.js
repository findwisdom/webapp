function H5_loading(images,firstPage){

    var id = this.id;

    if(this._images === undefined ){//第一次进入

        this._images = ( images || [] ).length;
        this._loaded = 0 ;

        window[id]= this; //将当前对象放入全局对象中，用来进行某个图片加载完成后的回调函数

        for(var s=0; s<images.length;s++){
            var item=images[s];
            var img = new Image;
            img.onload=function(){
                window[id].loader();
            }
            img.src=item;
        }
        $('#rate').text('0%');
        return this;

    }else{
        this._loaded++;
        $('#rate').text( ( ( this._loaded / this._images  *100) >> 0 ) + '%');
        if(this._loaded<this._images){
            return this;
        };
    }
    window[id]=null;
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