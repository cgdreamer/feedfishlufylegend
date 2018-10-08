 function SpriteLayer(){
     LExtends(this,LSprite,[]);
     this.init=function()
     {
        this.addFishSprite();
     };
     this.addFishSprite=function(){
        var winWidth = LGlobal.width;
        var winHeight = LGlobal.height;
        if(!Globals.fishSprite)
        {
            Globals.fishSprite = new FishSprite();
        }
        Globals.fishSprite.level=0;
        this.addChildAt(Globals.fishSprite, this.numChildren);
        Globals.fishSprite.x=(winWidth-Globals.fishSprite.getWidth())/ 2;
        Globals.fishSprite.y=(winHeight-Globals.fishSprite.getHeight())/ 2;
        Globals.fishSprite.init();
    };
    this.endPlay=function(){
        Globals.fishSprite.stopAction();
    };
}