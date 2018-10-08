function AnimationManager()
{
    this.createAnimation= function (animationName,speed,row,col,resourceWidth,resourceHeight,bitmapDataWidth,bitmapDataHeight) {
        if(row==null)
            row=1;
        if(col==null)
            col=10;
        if(resourceWidth==null)
            resourceWidth=800;
        if(resourceHeight==null)
            resourceHeight=80;
        if(bitmapDataWidth==null)
            bitmapDataWidth=80;
        if(bitmapDataHeight==null)
            bitmapDataHeight=80;
        var list = LGlobal.divideCoordinate(resourceWidth,resourceHeight,row,col);
        var data = new LBitmapData(Globals.resources[animationName],0,0,bitmapDataWidth,bitmapDataHeight);
        var animation = new LAnimationTimeline(data,list);
        animation.speed=speed;
        return animation;
    };
}