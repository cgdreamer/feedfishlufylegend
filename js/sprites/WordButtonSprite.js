function WordButtonSprite(){
    LExtends(this,LSprite,[]);
    var self=this;
    this.addChildAt(new LBitmap(new LBitmapData(Globals.resources["buttonBg"])),this.numChildren);
    this.text=new LTextField();
    this.text.setMultiline(false);
    this.text.size=50;
    this.text.stroke=true;
    this.text.lineColor="#56735F";
    this.addChildAt(this.text,this.numChildren);
    this.setCharactor=function(charactor){
        this.text.text=charactor;
        var color="";
        for(var i=0;i<3;i++)
        {
            var a=Math.floor(Math.random()*255).toString(16);
            if(a.length<2)
                a="0"+a;
            color+=a;
        }
        color="#"+color;
        this.text.color=color;
        this.text.x=(this.getWidth()-this.text.getWidth())/2;
        this.text.y=(this.getHeight()-this.text.getHeight())/2-10;
    };
    var onMouseDown=function(event){
        var charactor=self.text.text;
        self.mouseEnabled=self.mouseChildren=false;
        Globals.bgLayer.sendFood(self,charactor);
    };
    this.addEventListener(LMouseEvent.MOUSE_DOWN,onMouseDown);
}