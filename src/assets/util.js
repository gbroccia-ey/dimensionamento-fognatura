var util = {};
if (typeof exports !== 'undefined') {
  exports.util = util;
}

var lastUser;
var isIntune;



window.wlCommonInit = function(){
	// get value 
	var path = fileUtil.getExternalStoragePath();
	fileUtil.readBinaryDoc(path, "intune.lck", function (content) {
	    isIntune = true;
	}, function () {
	    isIntune = false;
	});	
}

util.placeCall = function(num) {
        if (num == "undefined" || num === "" || num === undefined) 
        return; 
        if (window.cordova && cordova.InAppBrowser) {
        cordova.InAppBrowser.open('tel:' + num.replace(/\s/g,''), '_system');
        } else {
        window.open('tel:' + num.replace(/\s/g,''));
        }
  }

  util.openMaps = function(map) {
            window.open('geo://'+map, '_system');
  }

  util.setLoginInfo = function(username){
      lastUser = username;
  }

  util.getLoginInfo = function(){
    return lastUser;
  }


  util.getMockMap = function(){
    return false;
  }

  util.isProduction = function(){
    return true;
  }

  
  util.formatIntNumber = function(number){
      var numberTmp = util.formatNumber(number);
      if(numberTmp && numberTmp.length>2) return numberTmp.substring(0,numberTmp.length-3);
      return numberTmp;
}

  util.formatNumber = function(number){
    if(number==undefined) return undefined;
    if(number=='') return '';

    var retNumber;
    var strNumber = number.toString();
    var length = number.toString().length;
    
    if(strNumber.indexOf('.')<0){
      retNumber = strNumber + '.00';
    }
    else if(length - strNumber.indexOf('.') == 2){
      retNumber = strNumber + '0';
    }
    else if(length - strNumber.indexOf('.') == 3){
        retNumber = strNumber;
    }
    else {
      retNumber = strNumber.substring(0, strNumber.indexOf('.')+3);
    }

     retNumber = retNumber.replace(/^0+/, '');

     if(retNumber.indexOf('.')==0) retNumber = "0"+retNumber;

    return retNumber;
  }
  
  util.isIntune = function(){
	return isIntune;
  }
	  
	  