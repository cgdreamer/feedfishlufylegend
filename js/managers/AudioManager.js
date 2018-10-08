function AudioManager(){
    var _this=this;
//    var audio=cc.AudioEngine.getInstance();
    this.sounds=[];
    this.play=function(soundName,loop){
        /*audio.setMusicVolume(10);
        audio.setEffectsVolume(10);*/
        if(loop==null)
            loop=1;
        var sound;
        if(_this.sounds.hasOwnProperty(soundName))
        {
            sound=_this.sounds[soundName];
            sound.play();
        }
        else
        {
          /*if(soundName=="bgSound")
                audio.playMusic(Globals.soundUrls[soundName],true);
            else
                audio.playEffect(Globals.soundUrls[soundName],false);
          */
            var bSound;
            if(Globals.soundUrls.hasOwnProperty(soundName))
                bSound=new buzz.sound(Globals.soundUrls[soundName]);
            else
                bSound=new buzz.sound(soundName);
           /* if(Globals.soundUrls.hasOwnProperty(soundName))
                lSound.load(Globals.soundUrls[soundName]);
            else
                lSound.load(soundName);
           */
           _this.sounds[soundName]=bSound;
            if(soundName=="bgSound")
                bSound.loop().play();
            else
                bSound.play();
        }
    };
}