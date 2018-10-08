function WordsManager()
{
    this.remainCharactors=[];
    this.englishWord="";
    this.chineseWord="";
    this.voiceUrl="";
    this.getCharactors= function (maxCountOfCharactors) {
        var words;
        if(this.remainCharactors.length>0)
        {
            words=this._getCharactorsFromRemainCharactors(maxCountOfCharactors);
        }
        else if(Globals.words.length>0)
        {
            var index=Math.floor(Math.random()*Globals.words.length);
            var word=Globals.words.splice(index,1)[0];
            this.englishWord=word[0];
            this.remainCharactors=word[0].split("");
            this.chineseWord=word[1];
            this.voiceUrl=word[2];
            words=this._getCharactorsFromRemainCharactors(maxCountOfCharactors);
        }
        else
        {
            this.englishWord="";
            this.chineseWord="";
            this.voiceUrl="";
        }
        return words;
    };
    this.isCurrentWordComplete=function()
    {
        return this.remainCharactors.length<=0;
    };
    this._getCharactorsFromRemainCharactors=function(maxCountOfCharactors)
    {
        var words=[];
        var tempWords;
        var tempWordsIndex;
        var tempWordsLength;
        tempWords=this.remainCharactors.splice(0,maxCountOfCharactors);
        while(tempWords.length>0)
        {
            tempWordsLength=tempWords.length;
            tempWordsIndex=Math.floor(Math.random()*tempWordsLength);
            words.push(tempWords.splice(tempWordsIndex,1)[0]);
        }
        return words;
    };
}