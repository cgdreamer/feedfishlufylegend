function FoodSprite() {
    LExtends(this,LSprite,[]);
    var self = this;
    this.rotateAngle=0;
    var bg=new LBitmap(new LBitmapData(Globals.resources["foodBg"]));
    this.addChildAt(bg,this.numChildren);
    this.text=new LTextField();
    this.text.setMultiline(false);
    this.text.size=15;
    this.text.textAlign="center";
    this.text.textBaseline="middle";
    this.addChildAt(this.text, this.numChildren);
    this.rotateTimer=null;
    this.setCharactor=function (charactor) {
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
        this.text.x=this.getWidth()/2;
        this.text.y=this.getHeight()/2;
        this.rotateTimer=setInterval(this.runRotateAction,80);
    };
    this.getCharactor=function(){
        return this.text.text;
    };
    this.runRotateAction=function(){
        self.rotateAngle += 10;
        bg.rotate=self.rotateAngle;
        self.text.rotate=self.rotateAngle;
    };
    this.stopRotateAction=function(){
        clearInterval(this.rotateTimer);
        this.rotateTimer=null;
    };
}