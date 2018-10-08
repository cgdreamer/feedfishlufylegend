function ResultLayer()
{
    LExtends(this,LSprite,[]);
    var self=this;
    this.winW=NaN;
    this.winH=NaN;
    this.totalNumber = null;
    this.timeLabel = null;
    this.rightLabel = null;
    this.rateLabel = null;
    this.continueButton = null;
    this.endButton = null;

    this.winW = LGlobal.width;
    this.winH = LGlobal.height;
    var bg = new LBitmap(new LBitmapData(Globals.resources["resultBg"]));
    bg.x=(this.winW-bg.getWidth())/2;
    bg.y=(this.winH-bg.getHeight())/2;
    this.addChild(bg);

    this.totalNumber = new LTextField();
    this.totalNumber.size=23;
    this.totalNumber.color="#000000";
    this.addChild(this.totalNumber);
    var bgPX = bg.x;
    var bgPY = bg.y;
    this.totalNumber.x=bgPX + 135;
    this.totalNumber.y=bgPY + 70;

    this.timeLabel = new LTextField();
    this.timeLabel.size=21;
    this.timeLabel.color="#000000";
    this.addChild(this.timeLabel);
    this.timeLabel.x=bgPX + 325;
    this.timeLabel.y=bgPY + 70;

    this.rightLabel = new LTextField();
    this.rightLabel.size=23;
    this.rightLabel.color="#000000";
    this.addChild(this.rightLabel);
    this.rightLabel.x=bgPX + 135;
    this.rightLabel.y=bgPY + 110;

    this.rateLabel = new LTextField();
    this.rateLabel.size=21;
    this.rateLabel.color="#ff0000";
    this.addChild(this.rateLabel);
    this.rateLabel.x=bgPX + 325;
    this.rateLabel.y=bgPY + 110;

    this.continuePlay=function(event){
        Globals.audioManager.play("buttonSound");
        Globals.correctTimes=0;
        Globals.playScene.removeResult();
        Globals.playScene.replay();
    };
    this.goStartScene=function(event){
        Globals.audioManager.play("buttonSound");
        Globals.correctTimes=0;
        Globals.playScene.removeResult();
        Globals.spriteLayer.endPlay();
        changeToStartScene();
    };
    this.setTotalNumber=function(value) {
        if (this.totalNumber != undefined && this.totalNumber != null) {
            this.totalNumber.text=value;
        }
    };
    this.setTimeLabel=function(value) {
        if (this.timeLabel != undefined && this.timeLabel != null) {
            this.timeLabel.text=value;
        }
    };
    this.setRightLabel=function(value) {
        if (this.rightLabel != undefined && this.rightLabel != null) {
            this.rightLabel.text=value;
        }
    };
    this.setRateLabel=function(value) {
        if (this.rateLabel != undefined && this.rateLabel != null) {
            this.rateLabel.text=value;
        }
    };

    this.continueButton = new LButton(new LBitmap(new LBitmapData(Globals.resources["continueButonBg"])),new LBitmap(new LBitmapData(Globals.resources["continueButonBgDown"])));
    this.continueButton.x=bgPX+70;
    this.continueButton.y=bgPY+168;
    this.continueButton.addEventListener(LMouseEvent.MOUSE_UP,this.continuePlay);
    this.addChild(this.continueButton);

    this.endButton = new LButton(new LBitmap(new LBitmapData(Globals.resources["endButtonBg"])),new LBitmap(new LBitmapData(Globals.resources["endButtonBgDown"])));
    this.endButton.x=bgPX+260;
    this.endButton.y=bgPY+168;
    this.endButton.addEventListener(LMouseEvent.MOUSE_UP,this.goStartScene);
    this.addChild(this.endButton);
}