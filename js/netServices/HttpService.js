var HttpService = {
	app_key : "hkby",
	token : "",
	tData : "60877,1",
	getWordMinfo : function(word, resultFunction, errorFunction) {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				resultFunction(JSON.parse(xmlhttp.responseText));
			} else {
				errorFunction(xmlhttp.status);
			}
		};
		var par = {
			token : this.token,
			app_key : this.app_key,
			info : {
				pageInfo : {
					return_All : "1",
					perPage : "999",
					curPage : "1"
				},
				query : {
					noneedpos : 1,
					needsyllable : "1",
					model : 0,
					mid : word,
					pageinfo : 1,
					wordlength : 14,
					filterEVoice : "1"
				},
				tData : this.tData
			}
		};
		xmlhttp.open(
            "GET",
            "http://www.anoah.com/api_cache/?q=json/oauth/Vocabulary/wordMeans/getMeansInfo&info="+ JSON.stringify(par),
            true
        );
		xmlhttp.send();
	}
};
