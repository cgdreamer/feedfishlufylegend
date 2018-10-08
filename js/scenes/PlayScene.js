function PlayScene()
{
    var _this=this;
    LExtends(_this,LSprite,[]);
    this.resultLayer=null;
    if(!Globals.bgLayer)
    {
        Globals.bgLayer=new BgLayer();
        this.addChildAt(Globals.bgLayer,this.numChildren);
    }
    if(!Globals.spriteLayer)
    {
        Globals.spriteLayer=new SpriteLayer();
        this.addChildAt(Globals.spriteLayer,this.numChildren);
    }
    this.startPlay=function()
    {
        Globals.bgLayer.init();
        Globals.spriteLayer.init();
    };
    this.showResult=function(){
        if(!this.resultLayer)
        {
            this.resultLayer=new ResultLayer();
        }
        this.resultLayer.setTotalNumber(Globals.wordsBackUp.length);
        var nowTime=Math.round(new Date().getTime()/1000);
        this.resultLayer.setTimeLabel((nowTime-Globals.gameStartTime)+"秒");
        this.resultLayer.setRightLabel(Globals.correctTimes);
        this.resultLayer.setRateLabel(Math.round(Globals.correctTimes/Globals.wordsBackUp.length*100)+"%");
        this.addChild(this.resultLayer);
    };
    this.removeResult=function(){
        if(this.resultLayer)
        {
            this.removeChild(this.resultLayer);
        }
    };
    this.replay=function(){
        Globals.words=Globals.wordsBackUp.concat();
        if(Globals.bgLayer)
            Globals.bgLayer.refresh();
    };
}