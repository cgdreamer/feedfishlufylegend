function StartScene(resData,resultFunction){
    var _this=this;
    LExtends(_this,LSprite,[]);
    this.resources=resData;
    this.loadCompleteFunction=resultFunction;
    var bgLoader = new LLoader();
    this.loading=new LoadingSampleCustom();
    var changeToStartState=function(){
        var logo=new LBitmap(new LBitmapData(Globals.resources["logo"]));
        logo.x=(LGlobal.width-logo.getWidth())/2;
        logo.y=-logo.getHeight();
        _this.addChild(logo);
        LTweenLite.to(logo,1,{y:68,ease:LEasing.Strong.easeInOut});
        var startButton=new LButton(new LBitmap(new LBitmapData(Globals.resources["startButtonUpBg"])),new LBitmap(new LBitmapData(Globals.resources["startButtonDownBg"])),new LBitmap(new LBitmapData(Globals.resources["startButtonDownBg"])));
        startButton.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){Globals.audioManager.play("buttonSound");Globals.audioManager.play("bgSound");_this.loadCompleteFunction();});
        startButton.x=(LGlobal.width-startButton.getWidth())/2;
        startButton.y=LGlobal.height-130;
        _this.addChild(startButton);
        Globals.audioManager=new AudioManager();
        Globals.animationManager=new AnimationManager();
        Globals.wordsManager=new WordsManager();
    };
    var loadBgImageComplete=function(event){
        var bgBitmap=new LBitmap(new LBitmapData(event.currentTarget.content));
        _this.addChild(bgBitmap);
        _this.addChild(_this.loading);
        LLoadManage.load(
            _this.resources,
            function(progress){
                _this.loading.setProgress(progress);
            },
            function(result){
                Globals.resources = result;
                loadFromServer();
            }
        );
    };
    var loadFromServer=function()
    {
        HttpService.getWordMinfo("bookword:59810,bookword:59811,bookword:59812,bookword:59813",setLoaderSceneToCompleteState,loadWordMinfoError);
    };
    var setLoaderSceneToCompleteState=function(info){
        var infoArray=info["recordset"];
        var info;
        var wordArray;
        for(var i=0,len=infoArray.length;i<len;i++)
        {
            info=infoArray[i];
            wordArray=[info["spell"],info["expCn"],info["avoiceUrl"]];
            Globals.wordsBackUp.push(wordArray);
        }
        _this.removeChild(_this.loading);
        _this.loading = null;
        changeToStartState();
    };
    var loadWordMinfoError=function()
    {
    };

    bgLoader.addEventListener(LEvent.COMPLETE,loadBgImageComplete);
    bgLoader.load("./resources/bg.jpg","bitmapData");
}