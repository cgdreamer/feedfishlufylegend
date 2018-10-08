document.write('<script type="text/javascript" src="js/scenes/StartScene.js"></script> ');
document.write('<script type="text/javascript" src="js/scenes/LoadingSampleCustom.js"></script> ');

LGlobal.setDebug(false);
LGlobal.keepClear=true;
LGlobal.destroy=false;

var fps=new FPS();

var resourcesDatas=[
    {path:"./js/managers/AudioManager.js",type:"js"},
    {path:"./js/managers/AnimationManager.js",type:"js"},
    {path:"./js/managers/WordsManager.js",type:"js"},

    {path:"./js/scenes/PlayScene.js",type:"js"},

    {path:"./js/layers/BgLayer.js",type:"js"},
    {path:"./js/layers/SpriteLayer.js",type:"js"},
    {path:"./js/layers/ResultLayer.js",type:"js"},

    {path:"./js/sprites/FishSprite.js",type:"js"},
    {path:"./js/sprites/WordButtonSprite.js",type:"js"},
    {path:"./js/sprites/FoodSprite.js",type:"js"},

    {path:"./js/netServices/HttpService.js",type:"js"},

    {name:"logo",path:"./resources/noahlogo.png"},
    {name:"startButtonUpBg",path:"./resources/startbutton.png"},
    {name:"startButtonDownBg",path:"./resources/startbuttondown.png"},

    {name:"fish0_swimming_image",path:"./resources/fish0.png"},
    {name:"fish0_turn_image",path:"./resources/fish0turn.png"},
    {name:"fish0_eat_image",path:"./resources/fish0eat.png"},

    {name:"fish1_swimming_image",path:"./resources/fish1.png"},
    {name:"fish1_turn_image",path:"./resources/fish1turn.png"},
    {name:"fish1_eat_image",path:"./resources/fish1eat.png"},

    {name:"fish2_swimming_image",path:"./resources/fish2.png"},
    {name:"fish2_turn_image",path:"./resources/fish2turn.png"},
    {name:"fish2_eat_image",path:"./resources/fish2eat.png"},

    {name:"fish3_swimming_image",path:"./resources/fish3.png"},
    {name:"fish3_turn_image",path:"./resources/fish3turn.png"},
    {name:"fish3_eat_image",path:"./resources/fish3eat.png"},

    {name:"bg_0",path:"./resources/bg0.jpg"},
    {name:"bg_1",path:"./resources/bg1.jpg"},
    {name:"bg_2",path:"./resources/bg2.jpg"},
    {name:"bg_3",path:"./resources/bg3.jpg"},
    {name:"resultBg",path:"./resources/resultBg.png"},
    {name:"foodBg",path:"./resources/foodBg.png"},
    {name:"buttonsBg",path:"./resources/topBg.jpg"},
    {name:"foodExporter",path:"./resources/foodExporter.png"},
    {name:"buttonBg",path:"./resources/buttonBg.png"},
    {name:"nextButtonBg",path:"./resources/nextButtonBg.png"},
    {name:"continueButonBg",path:"./resources/continueButtonBg.png"},
    {name:"continueButonBgDown",path:"./resources/continueButtonBgDown.png"},
    {name:"endButtonBg",path:"./resources/endButtonBg.png"},
    {name:"endButtonBgDown",path:"./resources/endButtonBgDown.png"}

    /*{name:"bgSound",path:"./resources/musics/bg.mp3",type:"sound"},
    {name:"eatSound",path:"./resources/musics/eat.mp3",type:"sound"},
    {name:"leveldownSound",path:"./resources/musics/leveldown.mp3",type:"sound"},
    {name:"levelupSound",path:"./resources/musics/levelup.mp3",type:"sound"},
    {name:"sendfoodSound",path:"./resources/musics/sendfood.mp3",type:"sound"},
    {name:"buttonSound",path:"./resources/musics/buttonsound.mp3",type:"sound"}*/
];

var Globals={
    startScene:null,
    playScene:null,
    resources:null,
    bgLayer:null,
    waterAreaOrignPoint:null,
    waterAreaWidth:NaN,
    waterAreaHeight:NaN,
    spriteLayer:null,
    fishSprite:null,
//    wordsBackUp:[["thankyou","谢谢你","a"],["ok","好","c"]],
    wordsBackUp:[],
    words:[],
    wordsManager:null,
    animations:{},
    animationManager:null,
    maxLevel:3,
    soundUrls:{bgSound:"./resources/musics/bg.mp3",eatSound:"./resources/musics/eat.mp3",leveldownSound:"./resources/musics/leveldown.mp3",levelupSound:"./resources/musics/levelup.mp3",sendfoodSound:"./resources/musics/sendfood.mp3",buttonSound:"./resources/musics/buttonsound.mp3"},
    audioManager:null,
    correctTimes:0,
    gameStartTime:null
};

LInit(1000/60,"fishLegendDIv",480,800,main);
window.onresize=function(){
    LSystem.screen(LStage.FULL_SCREEN);
};

function main(){
    if(LGlobal.canTouch)
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    else
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);

    Globals.animations.fish0_swimming=["fish0_swimming_image",1,10];
    Globals.animations.fish0_turn=["fish0_turn_image",1,10];
    Globals.animations.fish0_eat=["fish0_eat_image",1,10];

    Globals.animations.fish1_swimming=["fish1_swimming_image",1,10];
    Globals.animations.fish1_turn=["fish1_turn_image",1,10];
    Globals.animations.fish1_eat=["fish1_eat_image",1,10];

    Globals.animations.fish2_swimming=["fish2_swimming_image",1,10];
    Globals.animations.fish2_turn=["fish2_turn_image",1,10];
    Globals.animations.fish2_eat=["fish2_eat_image",1,10];

    Globals.animations.fish3_swimming=["fish3_swimming_image",1,10];
    Globals.animations.fish3_turn=["fish3_turn_image",1,10];
    Globals.animations.fish3_eat=["fish3_eat_image",1,10];

    Globals.startScene=new StartScene(resourcesDatas,changeToGameScene);
    addChild(Globals.startScene);
}

function changeToGameScene(){
    removeChild(Globals.startScene);
    Globals.words=Globals.wordsBackUp.concat();
    if(!Globals.playScene)
        Globals.playScene=new PlayScene();
    addChild(Globals.playScene);
    Globals.playScene.startPlay();
    addChild(fps);
}

function changeToStartScene(){
    removeChild(Globals.playScene);
    addChild(Globals.startScene);
    addChild(fps);
}