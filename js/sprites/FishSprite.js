function FishSprite() {
    var _this=this;
    LExtends(this,LSprite,[]);
    this.paddingFromLevel=[[80,21],[80,21],[80,10],[80,10]];
    this.paddingFromWaterArea=0;
    this.minMoveSpeed=4;
    this.moveSpeedUp=0;
    this.moveSpeed=NaN;
    this.xSpeed=NaN;
    this.ySpeed=NaN;
    this.swimDirection="l";
    this.level=0;
    this.parentArea={left:NaN,bottom:NaN,right:NaN,top:NaN};
    this.centerPointMoveArea={left:NaN,bottom:NaN,right:NaN,top:NaN};
    this.oldPosition=null;
    this.foodSpriteTracking=null;
    this.foodCenterOffsetX=NaN;
    this.foodCenterOffsetY=NaN;
    this.isEating=null;
    this.animations=[];
    this.movingTimer=null;
    this.tackingFoodTimer=null;

    this.init=function(){
        this.parentArea.left=Globals.waterAreaOrignPoint[0];
        this.parentArea.top=Globals.waterAreaOrignPoint[1];
        this.parentArea.right=this.parentArea.left+Globals.waterAreaWidth;
        this.parentArea.bottom=this.parentArea.top+Globals.waterAreaHeight;
        this.runSwimmingToMoveAction();
    };
    this.stopAction=function()
    {
        if(this.movingTimer)
        {
            clearInterval(this.movingTimer);
            this.movingTimer=null;
        }
        if(this.tackingFoodTimer)
        {
            clearInterval(this.tackingFoodTimer);
            this.tackingFoodTimer=null;
        }
        this.removeAllChild();
        this.remove();
    };

    this.setSize=function() {
        var contentWidth=this.paddingFromLevel[this.level][0];
        var contentHeight=this.paddingFromLevel[this.level][0];
        this.paddingFromWaterArea=this.paddingFromLevel[this.level][1];
        this.centerPointMoveArea.left=this.parentArea.left+contentWidth/2-this.paddingFromWaterArea;
        this.centerPointMoveArea.bottom=this.parentArea.bottom+this.paddingFromWaterArea-contentHeight/2;
        this.centerPointMoveArea.right=this.parentArea.right+this.paddingFromWaterArea-contentWidth/2;
        this.centerPointMoveArea.top=this.parentArea.top+contentHeight/2-this.paddingFromWaterArea;
    };
    this.getAnimateByName=function(actionName,speed){
        var animation;
        var theActionName="fish"+this.level+"_"+actionName;
        /*if(this.animations.hasOwnProperty(theActionName))
            animation=this.animations[theActionName];
        else
        {
            animation=Globals.animationManager.createAnimation(Globals.animations[theActionName][0],speed);
            this.animations[theActionName]=animation;
        }*/
        animation=Globals.animationManager.createAnimation(Globals.animations[theActionName][0],speed);
        return animation;
    };
    this.runSwimmingAction=function(direction){
        var swimmingAnimate=this.getAnimateByName("swimming",10);
        if(direction=="l")
            swimmingAnimate.setAction(0,0,1,false);
        else if(direction=="r")
            swimmingAnimate.setAction(0,0,1,true);
        else
            swimmingAnimate.setAction(0,0,1,false);
        this.removeAllChild();
        swimmingAnimate.x=-this.paddingFromLevel[this.level][0]/2;
        swimmingAnimate.y=-this.paddingFromLevel[this.level][0]/2;
        this.addChild(swimmingAnimate);
    };
    this.runSwimmingToMoveAction=function(direction){
        this.runSwimmingAction(direction);
        this.setSize();
        this.startRandomMove(direction);
    };
    this.runTurnToSwimmingToMoveAction=function(direction){
        this.removeAllChild();
        this.swimDirection=direction;
        var turnAnimate=this.getAnimateByName("turn",2);
        if(direction=="l")
            turnAnimate.setAction(0,0,1,true);
        else if(direction=="r")
            turnAnimate.setAction(0,0,1,false);
        turnAnimate.addEventListener(LEvent.COMPLETE,this.runSwimmingToMoveActionAfterTurn);
        turnAnimate.x=-this.paddingFromLevel[this.level][0]/2;
        turnAnimate.y=-this.paddingFromLevel[this.level][0]/2;
        this.addChild(turnAnimate);
    };
    this.runSwimmingToMoveActionAfterTurn=function(event){
        Globals.fishSprite.removeAllChild();
        Globals.fishSprite.runSwimmingToMoveAction(Globals.fishSprite.swimDirection);
    };
    this.startRandomMove=function(xDirection,yDirection){
        this.oldPosition=new LPoint(this.x,this.y);
        this.moveSpeed=this.minMoveSpeed+this.level*this.moveSpeedUp;
        var zf1;
        if(xDirection)
        {
            if(xDirection=="l")
                zf1=-1;
            else
                zf1=1;
        }
        else
        {
            zf1=Math.random()<0.5?-1:1;
            if(zf1==-1)
                xDirection="l";
            else
                xDirection="r";
        }
        this.xSpeed=zf1*parseFloat((Math.random()*this.moveSpeed).toFixed(3));
        if(yDirection)
        {
            if(yDirection=="t")
                zf1=-1;
            else
                zf1=1;
        }
        else
        {
            zf1=Math.random()<0.5?-1:1;
            if(zf1==1)
                yDirection="b";
            else
                yDirection="t";
        }
        this.ySpeed=zf1*parseFloat(Math.sqrt(this.moveSpeed*this.moveSpeed-this.xSpeed*this.xSpeed).toFixed(3));
        if(xDirection!=this.swimDirection)
        {
            this.runTurnToSwimmingToMoveAction(xDirection);
        }
        else
        {
            if(this.isEating)
            {
                this.isEating=false;
                Globals.bgLayer.checkIfNeed();
                Globals.bgLayer.setWordButtonsEnabled(true);
            }
            if(!this.movingTimer)
                this.movingTimer=setInterval(this.moving,50);
        }
    };
    this.trackingFood=function(foodSprite){
        if(this.movingTimer)
        {
            clearInterval(this.movingTimer);
            this.movingTimer=null;
        }
        this.foodSpriteTracking=foodSprite;
        this.foodCenterOffsetX=foodSprite.getWidth()/2;
        this.foodCenterOffsetY=foodSprite.getHeight()/2;
        var xDirection;
        var foodCenterX=foodSprite.x+this.foodCenterOffsetX;
        var fishCenterX=this.x;
        if(foodCenterX<=fishCenterX)
            xDirection="l";
        else
            xDirection="r";
        if(xDirection!=this.swimDirection)
            this.runTurnToSwimmingToTrackAction(xDirection);
        else if(!this.tackingFoodTimer)
            this.tackingFoodTimer=setInterval(this.startTrackingFood,50);
    };
    this.runTurnToSwimmingToTrackAction=function(direction){
        this.swimDirection=direction;
        this.removeAllChild();
        var turnAnimate=this.getAnimateByName("turn",2);
        if(direction=="l")
            turnAnimate.setAction(0,0,1,true);
        else if(direction=="r")
            turnAnimate.setAction(0,0,1,false);
        turnAnimate.addEventListener(LEvent.COMPLETE,this.runSwimmingToTrackActionAfterTurn);
        turnAnimate.x=-this.paddingFromLevel[this.level][0]/2;
        turnAnimate.y=-this.paddingFromLevel[this.level][0]/2;
        this.addChild(turnAnimate);
        this.setSize();
    };
    this.runSwimmingToTrackActionAfterTurn=function(event){
        Globals.fishSprite.removeAllChild();
        Globals.fishSprite.runSwimmingAction(Globals.fishSprite.swimDirection);
        if(!Globals.fishSprite.tackingFoodTimer)
            Globals.fishSprite.tackingFoodTimer=setInterval(Globals.fishSprite.startTrackingFood,50);
    };
    this.startTrackingFood=function(){
        var targetX=_this.foodSpriteTracking.x+_this.foodCenterOffsetX;
        var targetY=_this.foodSpriteTracking.y+_this.foodCenterOffsetY;
        var distanceX=targetX-_this.x;
        var distanceY=targetY-_this.y;
        var distanceFromFood=Math.sqrt(distanceX*distanceX+distanceY*distanceY);
        if(distanceFromFood<=_this.moveSpeed)
        {
            _this.isEating=true;
            _this.xSpeed=distanceX;
            _this.ySpeed=distanceY;
            Globals.bgLayer.stopFoodMoving();
        }
        else
        {
            var zf1=0;
            var movingAngel;
            if(distanceX==0)
            {
                movingAngel=Math.PI/2;
            }
            else
                movingAngel=Math.atan(Math.abs(distanceY)/Math.abs(distanceX));
            if(distanceX<0)
                zf1=-1;
            else if(distanceX>0)
                zf1=1;
            _this.xSpeed=zf1*parseFloat((_this.moveSpeed*Math.cos(movingAngel)).toFixed(3));
            if(distanceY<0)
                zf1=-1;
            else if(distanceY>0)
                zf1=1;
            else
                zf1=0;
            _this.ySpeed=zf1*parseFloat((_this.moveSpeed*Math.sin(movingAngel)).toFixed(3));
        }
        _this.x=parseFloat((_this.x+_this.xSpeed).toFixed(3));
        _this.y=parseFloat((_this.y+_this.ySpeed).toFixed(3));
        if(_this.isEating)
        {
            Globals.bgLayer.removeFoodSprite();
            if(_this.tackingFoodTimer)
            {
                clearInterval(_this.tackingFoodTimer);
                _this.tackingFoodTimer=null;
            }
            _this.runEatAction();
        }
    };
    this.runEatAction=function(){
        Globals.audioManager.play("eatSound");
        this.removeAllChild();
        var eatAnimate=this.getAnimateByName("eat",3);
        var direction=this.swimDirection;
        if(direction=="l")
            eatAnimate.setAction(0,0,1,false);
        else if(direction=="r")
            eatAnimate.setAction(0,0,1,true);
        eatAnimate.addEventListener(LEvent.COMPLETE,this.startRandomMoveAfterEat);
        eatAnimate.x=-this.paddingFromLevel[this.level][0]/2;
        eatAnimate.y=-this.paddingFromLevel[this.level][0]/2;
        this.addChild(eatAnimate);
    };
    this.startRandomMoveAfterEat=function(event){
        Globals.fishSprite.removeAllChild();
        Globals.fishSprite.runSwimmingToMoveAction(Globals.fishSprite.swimDirection);
    };
    this.moving=function(){
        var currentX=_this.x;
        var currentY=_this.y;
        var tempX=parseFloat((currentX+_this.xSpeed).toFixed(3));
        var tempY=parseFloat((currentY+_this.ySpeed).toFixed(3));
        var movingAngel=null;
        var distanceByX=null;
        var distanceByY=null;
        var distance=null;
        var outBoundType=null;
        if(tempX<_this.centerPointMoveArea.left)
        {
            //超出左边界
            if(_this.xSpeed==0)
            {
                movingAngel=Math.PI/2;
            }
            else
                movingAngel=Math.atan(Math.abs(_this.ySpeed)/Math.abs(_this.xSpeed));

            distanceByX=Math.abs(currentX-_this.centerPointMoveArea.left)/Math.cos(movingAngel);
            if(_this.ySpeed<0)
            {
                distanceByY=Math.abs(currentY-_this.centerPointMoveArea.top)/Math.sin(movingAngel);
            }
            else if(_this.ySpeed>0)
            {
                distanceByY=Math.abs(currentY-_this.centerPointMoveArea.bottom)/Math.sin(movingAngel);
            }
            if(distanceByY!=null)
            {
                if(distanceByX<=distanceByY)
                {
                    distance=distanceByX;
                    outBoundType="lr";
                }
                else
                {
                    distance=distanceByY;
                    outBoundType="tb";
                }
            }
            else
            {
                distance=distanceByX;
                outBoundType="lr";
            }
        }
        else if(tempX>_this.centerPointMoveArea.right)
        {
            //超出右边界
            if(_this.xSpeed==0)
            {
                movingAngel=Math.PI/2;
            }
            else
                movingAngel=Math.atan(Math.abs(_this.ySpeed)/Math.abs(_this.xSpeed));

            distanceByX=Math.abs(currentX-_this.centerPointMoveArea.right)/Math.cos(movingAngel);
            if(_this.ySpeed<0)
            {
                distanceByY=Math.abs(currentY-_this.centerPointMoveArea.top)/Math.sin(movingAngel);
            }
            else if(_this.ySpeed>0)
            {
                distanceByY=Math.abs(currentY-_this.centerPointMoveArea.bottom)/Math.sin(movingAngel);
            }
            if(distanceByY!=null)
            {
                if(distanceByX<=distanceByY)
                {
                    distance=distanceByX;
                    outBoundType="lr";
                }
                else
                {
                    distance=distanceByY;
                    outBoundType="tb";
                }
            }
            else
            {
                distance=distanceByX;
                outBoundType="lr";
            }
        }
        else if(tempY>_this.centerPointMoveArea.bottom)
        {
            //超出下边界
            if(_this.xSpeed==0)
            {
                movingAngel=Math.PI/2;
            }
            else
                movingAngel=Math.atan(Math.abs(_this.ySpeed)/Math.abs(_this.xSpeed));

            distanceByY=Math.abs(currentY-_this.centerPointMoveArea.bottom)/Math.sin(movingAngel);
            if(_this.xSpeed<0)
            {
                distanceByX=Math.abs(currentX-_this.centerPointMoveArea.left)/Math.cos(movingAngel);
            }
            else if(_this.xSpeed>0)
            {
                distanceByX=Math.abs(currentX-_this.centerPointMoveArea.right)/Math.cos(movingAngel);
            }
            if(distanceByX!=null)
            {
                if(distanceByX<=distanceByY)
                {
                    distance=distanceByX;
                    outBoundType="lr";
                }
                else
                {
                    distance=distanceByY;
                    outBoundType="tb";
                }
            }
            else
            {
                distance=distanceByY;
                outBoundType="tb";
            }
        }
        else if(tempY<_this.centerPointMoveArea.top)
        {
            //超出上边界
            if(_this.xSpeed==0)
            {
                movingAngel=Math.PI/2;
            }
            else
                movingAngel=Math.atan(Math.abs(_this.ySpeed)/Math.abs(_this.xSpeed));

            distanceByY=Math.abs(currentY-_this.centerPointMoveArea.top)/Math.sin(movingAngel);
            if(_this.xSpeed<0)
            {
                distanceByX=Math.abs(currentX-_this.centerPointMoveArea.left)/Math.cos(movingAngel);
            }
            else if(_this.xSpeed>0)
            {
                distanceByX=Math.abs(currentX-_this.centerPointMoveArea.right)/Math.cos(movingAngel);
            }
            if(distanceByX!=null)
            {
                if(distanceByX<=distanceByY)
                {
                    distance=distanceByX;
                    outBoundType="lr";
                }
                else
                {
                    distance=distanceByY;
                    outBoundType="tb";
                }
            }
            else
            {
                distance=distanceByY;
                outBoundType="tb";
            }
        }
        if(distance!=null)
        {
            var absXSpeed=distance*Math.cos(movingAngel);
            var absYSpeed=distance*Math.sin(movingAngel);
            var distanceX;
            var distanceY;
            if(_this.xSpeed<0)
            {
                distanceX=-absXSpeed;
            }
            else if(_this.xSpeed>0)
            {
                distanceX=absXSpeed;
            }
            else
                distanceX=0;
            if(_this.ySpeed<0)
            {
                distanceY=-absYSpeed;
            }
            else if(_this.ySpeed>0)
            {
                distanceY=absYSpeed;
            }
            else
                distanceY=0;
            _this.x=parseFloat((currentX+distanceX).toFixed(3));
            _this.y=parseFloat((currentY+distanceY).toFixed(3));
            if(_this.movingTimer)
            {
                clearInterval(_this.movingTimer);
                _this.movingTimer=null;
            }
            var xDirection;
            var yDirection;
            if(outBoundType=="lr")
            {
                if(_this.xSpeed<0)
                    xDirection="r";
                else
                    xDirection="l";
            }else if(outBoundType=="tb")
            {
                if(_this.ySpeed<0)
                    yDirection="b";
                else
                    yDirection="t";
            }
            _this.startRandomMove(xDirection,yDirection);
        }
        else
        {
            _this.x=parseFloat(tempX.toFixed(3));
            _this.y=parseFloat(tempY.toFixed(3));
            currentX=_this.x;
            currentY=_this.y;
            var distanceFromOldPosition=Math.sqrt((currentX-_this.oldPosition.x)*(currentX-_this.oldPosition.x)+(currentY-_this.oldPosition.y)*(currentY-_this.oldPosition.y));
            if(distanceFromOldPosition>=190)
            {
                if(Math.random()<0.15)
                {
                    if(_this.movingTimer)
                    {
                        clearInterval(_this.movingTimer);
                        _this.movingTimer=null;
                    }
                    _this.startRandomMove();
                }
            }
        }
    };
    this.levelUp=function()
    {
        Globals.audioManager.play("levelupSound");
        Globals.bgLayer.changeWaterAreaBackground();
        this.removeAllChild();
        if(this.level+1<=Globals.maxLevel)
        {
            this.level++;
        }
        this.runSwimmingToMoveAction(this.swimDirection);
    };
    this.levelDown=function()
    {
        Globals.audioManager.play("leveldownSound");
        Globals.bgLayer.changeWaterAreaBackground();
        this.removeAllChild();
        if(this.level-1>=0)
        {
            this.level=this.level-1;
        }
        this.runSwimmingToMoveAction(this.swimDirection);
    };
}