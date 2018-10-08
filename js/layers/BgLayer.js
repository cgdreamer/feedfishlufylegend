function BgLayer()
{
    var _this=this;
    LExtends(_this,LSprite,[]);
    this.isMouseDown=false;
    this.waterAreaBg=null;
    this.buttonsBg=null;
    this.foodExporter=null;
    this.foodSprite=null;
    this.wordButtonWidth=70;
    this.columnsCount=6;
    this.rowsCount=2;
    this.wordButtons=[];
    this.bottomLayer=null;
    this.chineseLabel=null;
    this.myAngswer=null;
    this.correctAnswer=null;
    this.nextButton=null;
    this.runOnce=false;
    this.correctTimes=0;
    this.foodMoveTweenLite=null;

    this.init=function(){
        _this.changeWaterAreaBackground();
        if(!_this.runOnce)
            _this.createTopLayer();
        _this.createWords();
        if(!_this.runOnce)
            _this.createBottomLayer();
        if(_this.runOnce)
        {
            _this.chineseLabel.visible=true;
            _this.chineseLabel.text=Globals.wordsManager.chineseWord;
        }
        _this.runOnce=true;
        Globals.gameStartTime=Math.round(new Date().getTime()/1000);
    };
    this.refresh=function(){
        Globals.gameStartTime=Math.round(new Date().getTime()/1000);
        _this.chineseLabel.visible=true;
        _this.nextWord();
    };
    this.changeWaterAreaBackground=function(bgNum){
        var bgResourceName;
        if(bgNum==null)
            bgNum=Math.floor(Math.random()*4);
        switch(bgNum)
        {
            case 0:
                bgResourceName=Globals.resources["bg_0"];
                break;
            case 1:
                bgResourceName=Globals.resources["bg_1"];
                break;
            case 2:
                bgResourceName=Globals.resources["bg_2"];
                break;
            case 3:
                bgResourceName=Globals.resources["bg_3"];
                break;
        }
        var sizeW = LGlobal.width;
        var sizeH = LGlobal.height;
        if(!_this.waterAreaBg)
        {
            _this.waterAreaBg = new LBitmap();
            _this.addChildAt(this.waterAreaBg,_this.numChildren);
        }
        _this.waterAreaBg.bitmapData=new LBitmapData(bgResourceName);
        var oX=0;
        var oY=(sizeH-_this.waterAreaBg.getHeight())/2;
        _this.waterAreaBg.x=oX;
        _this.waterAreaBg.y=oY;
        Globals.waterAreaOrignPoint=[oX,oY];
        Globals.waterAreaWidth=_this.waterAreaBg.getWidth();
        Globals.waterAreaHeight=_this.waterAreaBg.getHeight();
    };
    this.createTopLayer=function()
    {
        this.buttonsBg=new LSprite();
        this.buttonsBg.addChildAt(new LBitmap(new LBitmapData(Globals.resources["buttonsBg"])),this.buttonsBg.numChildren);
        this.buttonsBg.x=0;
        this.buttonsBg.y=0;
        this.addChildAt(this.buttonsBg,this.numChildren);
        this.foodExporter=new LBitmap(new LBitmapData(Globals.resources["foodExporter"]));
        this.foodExporter.x=(this.buttonsBg.getWidth()-this.foodExporter.getWidth())/2;
        this.foodExporter.y=this.buttonsBg.getHeight();
        this.addChildAt(this.foodExporter,this.numChildren);
    };
    this.createBottomLayer=function()
    {
        this.bottomLayer = new LSprite();
        this.bottomLayer.graphics.drawRect(0, 0, [0, 0, Globals.waterAreaWidth, Globals.waterAreaOrignPoint[1]], true, "#8A8712");
        this.bottomLayer.x=0;
        this.bottomLayer.y=Globals.waterAreaOrignPoint[1]+Globals.waterAreaHeight;
        this.addChildAt(this.bottomLayer,this.numChildren);
        var label0=new LTextField();
        label0.setMultiline(false);
        label0.text="中文含义：";
        label0.size=13;
        label0.color="#ffffff";
        label0.x=0;
        label0.y=5;
        this.bottomLayer.addChild(label0);

        this.chineseLabel=new LTextField();
        this.chineseLabel.setMultiline(false);
        this.chineseLabel.text=Globals.wordsManager.chineseWord;
        this.chineseLabel.size=13;
        this.chineseLabel.color="#264AA8";
        this.chineseLabel.x=label0.getWidth()+5;
        this.chineseLabel.y=5;
        this.bottomLayer.addChild(this.chineseLabel);

        var label1=new LTextField();
        label1.text="我的答案：";
        label1.size=13;
        label1.color="#00E6DE";
        label1.x=0;
        label1.y=39;
        this.bottomLayer.addChild(label1);

        this.myAngswer=new LTextField();
        this.myAngswer.setMultiline(false);
        this.myAngswer.size=13;
        this.myAngswer.color="#FF6000";
        this.myAngswer.x=label1.getWidth()+5;
        this.myAngswer.y=35;
        this.bottomLayer.addChild(this.myAngswer);

        var label5=new LTextField();
        label5.setMultiline(false);
        label5.weight="bolder";
        label5.text="正确答案：";
        label5.size=13;
        label5.color="#C55A5A";
        label5.x=0;
        label5.y=70;
        this.bottomLayer.addChild(label5);

        this.correctAnswer=new LTextField();
        this.correctAnswer.setMultiline(false);
        this.correctAnswer.size=15;
        this.correctAnswer.color="#ff0000";
        this.correctAnswer.x=label5.getWidth()+5;
        this.correctAnswer.y=65;
        this.bottomLayer.addChild(this.correctAnswer);

        this.nextButton=new LButton(new LBitmap(new LBitmapData(Globals.resources["nextButtonBg"])));
        this.nextButton.addEventListener(LMouseEvent.MOUSE_UP,function(event){_this.nextWord();});
        this.nextButton.x=this.bottomLayer.getWidth()-this.nextButton.getWidth()-10;
        this.nextButton.y=this.bottomLayer.getHeight()-this.nextButton.getHeight()-10;
        this.nextButton.mouseEnabled=false;
        this.nextButton.visible=false;
        this.bottomLayer.addChild(this.nextButton);
//        Globals.audioManager.play(Globals.wordsManager.voiceUrl);
    };
    this.nextWord=function()
    {
        this.myAngswer.text="";
        this.correctAnswer.text="";
        this.nextButton.mouseEnabled=false;
        this.nextButton.visible=false;
        this.createWords();
        this.chineseLabel.text=Globals.wordsManager.chineseWord;
//        Globals.audioManager.play(Globals.wordsManager.voiceUrl);
    };
    this.createWords=function(){
        this.wordButtons.length=0;
        var charactors=Globals.wordsManager.getCharactors(this.columnsCount*this.rowsCount);
        if(charactors)
        {
            var wordButtonBgLeft=this.buttonsBg.x;
            var wordButtonBgBottom=this.buttonsBg.getHeight();
            var lrPadding=10;
            var tbPadding=3;
            var wordButtonHGap=(this.buttonsBg.getWidth()-2*lrPadding-this.columnsCount*this.wordButtonWidth)/(this.columnsCount-1);
            var wordButtonVGap=(this.buttonsBg.getHeight()-2*tbPadding-this.rowsCount*this.wordButtonWidth)/(this.rowsCount-1);

            var wordButton;

            var wordButtonX;
            var wordButtonY;

            var wordButtonRowIndex;
            var wordButtonColumIndex;

            for(var i=0;i<charactors.length;i++)
            {
                wordButton=new WordButtonSprite();
                wordButton.setCharactor(charactors[i]);
                wordButtonColumIndex=i % this.columnsCount;
                wordButtonRowIndex=Math.floor(i/this.columnsCount);
                wordButtonX=wordButtonBgLeft+lrPadding+(this.wordButtonWidth+wordButtonHGap)*wordButtonColumIndex;
                wordButtonY=wordButtonBgBottom-tbPadding-(this.wordButtonWidth)*(wordButtonRowIndex+1)-wordButtonVGap*wordButtonRowIndex;
                wordButton.x=wordButtonX;
                wordButton.y=wordButtonY;
                this.addChildAt(wordButton,this.numChildren);
                this.wordButtons.push(wordButton);
            }
        }
        else
        {
            this.chineseLabel.visible=false;
            Globals.playScene.showResult();
        }
    };
    this.sendFood=function(wordButton,charactor){
        Globals.audioManager.play("sendfoodSound");
        wordButton.remove();
        this.wordButtons.splice(this.wordButtons.indexOf(wordButton),1);
        this.setWordButtonsEnabled(false);
        var foodSprite=new FoodSprite();
        foodSprite.setCharactor(charactor);
        foodSprite.x=this.foodExporter.x+(this.foodExporter.getWidth()-foodSprite.getWidth())/2;
        foodSprite.y=this.foodExporter.y+5;
        this.addChild(foodSprite);
        var winWidth=LGlobal.width;
        var winHeight=LGlobal.height;
        var moveDuration=13*((winHeight-foodSprite.y)/winHeight);
        var yTo=Globals.waterAreaOrignPoint[1]+Globals.waterAreaHeight;
        this.foodMoveTweenLite = LTweenLite.to(foodSprite,moveDuration,{y:yTo,onComplete:_this.foodMoveToBottom});
        this.foodSprite=foodSprite;
        Globals.fishSprite.trackingFood(foodSprite);
        if(this.wordButtons.length<=0 && !Globals.wordsManager.isCurrentWordComplete())
            this.createWords();
    };
    this.checkCorrect=function()
    {
        var myAnswer=this.myAngswer.text;
        var correct=this.correctAnswer.text;
        if(myAnswer && correct)
        {
            if(myAnswer==correct)
            {
                Globals.correctTimes++;
                Globals.fishSprite.levelUp();
            }
            else
                Globals.fishSprite.levelDown();
        }
    };
    this.setWordButtonsEnabled=function(value){
        for(var wordButtonIndex in this.wordButtons)
        {
            var wordButton=this.wordButtons[wordButtonIndex];
            wordButton.mouseEnabled=value;
            wordButton.mouseChildren=value;
        }
    };
    this.checkIfNeed=function(){
        if(this.wordButtons.length<=0 && Globals.wordsManager.isCurrentWordComplete())
        {
            this.correctAnswer.text=Globals.wordsManager.englishWord;
            this.nextButton.mouseEnabled=true;
            this.nextButton.visible=true;
            this.checkCorrect();
        }
    };
    this.stopFoodMoving=function()
    {
        if(this.foodMoveTweenLite)
            LTweenLite.remove(this.foodMoveTweenLite);
    };
    this.foodMoveToBottom=function(event){
        var foodSprite=event.target;
        foodSprite.stopRotateAction();
        foodSprite.rotate=0;
    };
    this.removeFoodSprite=function()
    {
        this.myAngswer.text=this.myAngswer.text+this.foodSprite.getCharactor();
        this.stopFoodMoving();
        this.foodSprite.stopRotateAction();
        this.removeChild(this.foodSprite);
    };
}
