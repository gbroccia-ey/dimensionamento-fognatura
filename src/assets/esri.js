console.log("ESRI JS: BEGIN");

    var esriCtrl = {};
    if (typeof exports !== 'undefined') {
        exports.esriCtrl = esriCtrl;
        console.log("ESRI JS: EXPORTS");

    }
    
    var map;
    var resourceInfo;
    var wmsLayer;
    
    var layerEE;
    var layerGas;
    var layerAcqua;
    var measurement;
    var dynamicMapServiceLayer;
    
    var go;
    var scaleBar;
    var search;
    var esriUploaded = false;
    var layerPianettiMappa;
    var dynamicMapServiceLayerPianetti;

  /*  var visibleLayersEE = ['48','50','51','52','53','54','55','56','57','58','60','61','63','64','65','66','67','68','69','71','72','73','74','75','76','77'];
    var visibleLayersGAS = ['31','32','33','34','35','36','37','38','39','40','42','43','45','46'];
    var visibleLayersACQUA = ['17','18','19','20','21','23','25','26','28','29'];
*/

 var visibleLayersTLR = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
var visibleLayersFOGNATURA = [14,	15,	16,	17,	18, 19,	20,	21,	22,	23,	24,	25,	26,	27];
var visibleLayersEE = [	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,	40,	41,	42,	43,	44,	45,	46,	47,	48,	49,	50,	51,	52,	53,	54,55,56,57,58];
var visibleLayersGAS = [	59,	60,	61,	62,	63,	64,	65,	66,	67,	68,	69,	70,	71, 72, 73, 74, 75];
 var visibleLayersACQUA = [	77,	78,	79,	80,	81,	82,	83,	84,	86, 87, 88, 89, 90, 91];
var visibleLayersCONTATORE = [85];

var cartobase = [ 93, 95, 96, 98, 100, 101, 102, 106, 107, 110, 111, 112, 113, 114, 119];

var visibleCtrLayers = [126,	127,	128,129,	130];

var lastPoint;
var lastGraphic;
var lastGraphicText;
var lastGraphicLine;
var lastCallback;
var automatic;
var lastGraphics = [];
var destinationCallback;

var gisAuthHeader = false, gisAppName = false;
var gisUpdateEnabled = true

var baseUri,baseUriRegex;
var baseUriInt,baseUriIntRegex;
var baseUriAppName;

var layerMappa;
var userCred;
var pianettiChecked;
var pianettiCallback;

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

function layerContains(name){
  for(var a = 0; a <layerMappa.length; a++){
    if(layerMappa[a].name == name && layerMappa[a].checked) return true;
  }
  return false;
}

function getLayerPianetti(appName){
      var isGas = false;
      var isFognatura = false;
      var isEE = false;
      var isAcqua = false;
      var isTlr = false;
      var retValue = [];

      if(layerMappa.name == "acqua" || layerContains("acqua")) isAcqua = true;
      if(layerMappa.name == "fognatura" ||  layerContains("fognatura")) isFognatura = true;
      if(layerMappa.name == "tlr" ||  layerContains("tlr")) isTlr = true;
      if(layerMappa.name == "gas" ||  layerContains("gas")) isGas = true;
      if(layerMappa.name == "ee" ||  layerContains("ee")) isEE = true;

      if(appName == "AAA" &&  isAcqua ) {   retValue.push(53);}
      if(appName == "AAA" &&  isFognatura ){retValue.push(109);}
      if(appName == "AAA" &&  isTlr) {      retValue.push(135);}
      if(appName == "AAA" &&  isGas) {      retValue.push(188);}
      if(appName == "AAA" &&  isEE) {       retValue.push(396);}
      if(appName == "HERA" && isAcqua) {    retValue.push(53);}
      if(appName == "HERA" && isFognatura) {retValue.push(109);}
      if(appName == "HERA" && isTlr) {      retValue.push(136);}
      if(appName == "HERA" && isGas) {      retValue.push(324);}
      if(appName == "HERA" && isEE) {       retValue.push(608);}
      if(appName == "MMS" &&  isAcqua) {    retValue.push(48);}
      if(appName == "MMS" &&  isFognatura ){retValue.push(85);}
      if(appName == "MMS" &&  isGas) {      retValue.push(181);}

      return retValue

}


function getAppNameFromAds(ads){
	var appName = 'HERA';
	if (ads && ads.Societa){
		try{
			var sot = parseInt(""+ads.Societa);
			switch (sot){
				case 1900:	// Inrete Distr. Energia SpA + Hera S.p.A.
				case 5010:	
				case 1910:
				case 1940:
				case 1950:
				case 1960:
				case 1970:
				case 1980:
				case 1990:
				case 2010:
				case 2190:
				case 2170:
				case 2180: 
				case 2140:
				case 2160:
				case 2150:
					code = "HERA";
					break;				
				case 7010: 	// AcegasApsAmga S.p.A.
				case 7021:
				case 7022:
				case 7023:
				case 7024:	
					code = "AAA";
					break;
				case 8060:	// Marche Multiservizi S.p.A
					code = "MMS";
					break;
				default:
					console.error("Field Societa not valid: "+ads.Societa)
					break;
			}		

		}
		catch (err){
			console.error("Field Societa not found in ADS: "+err)
		}
	}
	return appName;
	
}

function toggleMapLayerUrl(map, isEntering){
	if (map){
		for (var [id,layer] of Object.entries(map._layers)){
			if (layer.url){				
				layer.url =  (isEntering) ?
					layer.url.replace(baseUriRegex, baseUriInt) :
					layer.url.replace(baseUriIntRegex, baseUri);	
					
				layer._url.path = layer.url;	
				console.log(id,layer);
			}
		}
	}
	else {
		console.error("Error- Map not defined")
	}
}

function initBasePath(){
    if (baseUri == undefined){
        if (util.isProduction() === true){
          	baseUri 		=  "https://ewgis.gruppohera.it" ;
          	baseUriRegex 	=  /https:\/\/ewgis.gruppohera.it/g ;
          	
          	baseUriInt 		= "https://gispadpt.adn.intra";
          	baseUriIntRegex	= /https:\/\/gispadpt.adn.intra/g;   

            baseUriAppName = "/arcgisserverp2";   	
          }
          else {
          	baseUri 		=  "https://ewgis-ts.gruppohera.it" ;
          	baseUriRegex 	=  /https:\/\/ewgis-ts.gruppohera.it/g ;
          	
          	baseUriInt 		= "https://gistadpt.adn.intra";
          	baseUriIntRegex	= /https:\/\/gistadpt.adn.intra/g;

            baseUriAppName = "/arcgisserverq2";    
          }
    }
}


esriCtrl.setCallbackPianetti = function(callback){
  pianettiCallback = callback;
}

esriCtrl.screenshot = function (callback,failcallback) {
  require([
    "esri/tasks/PrintTask", "esri/tasks/PrintTemplate"
  ], function (PrintTask, PrintTemplate) {

	var url = ''
	if (gisUpdateEnabled){
		initBasePath();
	    url = baseUri + baseUriAppName +'/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task' ; 
			
	}
	else {
		if (util.isIntune()){
	    	url = util.isProduction() ? 
				'https://gissecurep-gruppohera.msappproxy.net/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task' :
				'https://gissecureq-gruppohera.msappproxy.net/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';					    	
	    }
	    else {
	    	url = util.isProduction() ? 
				'https://rcgs10pxas.adn.intra:6443/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task' :
				'https://rcgs10qwas.adn.intra:6443/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';					
	    }		
	}

    var printTask = new esri.tasks.PrintTask(url);
    var template = new PrintTemplate();


    var width = document.getElementById('map_root').offsetWidth;
    var height = document.getElementById('map_root').offsetHeight;

    template.exportOptions = {
      width: width,
      height: height,
      dpi: 96
    };
    template.format = "JPG";
    template.layout = "MAP_ONLY";
    template.preserveScale = false;

    var params = new esri.tasks.PrintParameters();
    map._removeBasemap();
    
    if (gisUpdateEnabled) toggleMapLayerUrl(map,true);
    
    params.map = map;
    params.template = template;

    var printSuccess = function (res) {
    	if (gisUpdateEnabled) toggleMapLayerUrl(map,false);
        map.setBasemap('satellite');
        var url = res.url;
        if (util.isIntune()){
      	  url = (util.isProduction())? 
  			  res.url.replace(/https:\/\/rcgs10pxas.adn.intra:6443/g, "https://gissecurep-gruppohera.msappproxy.net") :
  			  res.url.replace(/https:\/\/rcgs10qwas.adn.intra:6443/g, "https://gissecureq-gruppohera.msappproxy.net") ;
        } 
        toDataURL(url, callback);
      };

    var printError = function (res) {
      console.log('error' + res);
      if (gisUpdateEnabled) toggleMapLayerUrl(map,false);
      map.setBasemap('satellite');
      alert("Errore non è stato possibile scaricare l'immagine della mappa");
      failcallback("Errore non è stato possibile scaricare l'immagine della mappa");
    };
    printTask.execute(params, printSuccess, printError);

  });
}
  
  
esriCtrl.init = function(lat,lng,layer,ads,userData){    
       require([
      'esri/request','esri/tasks/query',"esri/tasks/QueryTask",'esri/map', 'esri/layers/WMSLayer', 'esri/layers/WMSLayerInfo', 'esri/layers/ImageParameters', 'esri/layers/ArcGISDynamicMapServiceLayer', 'esri/geometry/Extent',
      'dojo/_base/array', 'dojo/dom', 'dojo/dom-construct', 'dojo/parser',  "esri/dijit/Measurement",'esri/dijit/Scalebar',"esri/dijit/Search", "esri/geometry/Point","esri/geometry/webMercatorUtils",
      'dijit/layout/BorderContainer', 'dijit/layout/ContentPane', 'dojo/domReady!'
    ], function(esriRequest,Query, QueryTask, Map, WMSLayer, WMSLayerInfo, ImageParameters, ArcGISDynamicMapServiceLayer, Extent, array, dom, domConst, parser, Measurement, Scalebar, Search,Point,webMercatorUtils) {
      parser.parse();
      adsMappa = ads;
      layerMappa = layer;
      userCred = userData;
      
      // Init endpoints here (since <util> module could not be loaded yet at file load...)
  	  initBasePath();
      
      
      //mock per allacciamento
      if(util.getMockMap()==true){
        lat= 10.900021; lng = 44.657772;
      }

    // 10.899949765265877, 44.657604717
      
	   console.log("init map");
        map = new Map('map', {
            basemap: 'satellite',
            center: [lat, lng],
            zoom:20,
            showLabels : true
          });
    
        map.on("click", myClickHandler);
        function myClickHandler(event) {

            console.log('click on map');
            var mp = webMercatorUtils.webMercatorToGeographic(event.mapPoint);
            lastPoint = new Point( mp.x, mp.y);
            setPoint();

            if(destinationCallback!=undefined) destinationCallback(lastPoint);
            else if(pianettiChecked){

              var visiblePianetti = getLayerPianetti(gisAppName);
              for(var a = 0; a < visiblePianetti.length; a++){

                var queryTask = new QueryTask(baseUri + baseUriAppName + "/rest/services/RETI/Reti_"+gisAppName+"/MapServer/"+visiblePianetti[a]);
                var query = new Query();
                query.returnGeometry = true;
                query.outFields = ["IDSAP"];
                query.geometry = event.mapPoint;

                //Execute task and call showResults on completion
                queryTask.execute(query, function(data){
                  if(data && data.features && data.features[0] && data.features[0].attributes && data.features[0].attributes.IDSAP) {
                      pianettiCallback(data.features[0].attributes.IDSAP, baseUri + "/gctx/Pianetti/?id="+data.features[0].attributes.IDSAP, function(item){ navigator.app.loadUrl(item, {openExternal: true}) });
                  }
                });
              }
              
            }
        }

        scalebar = new Scalebar({
          map: map,
          // "dual" displays both miles and kilometers
          // "english" is the default, which displays miles
          // use "metric" for kilometers
          scalebarUnit: "metric"
        });
		

      var visibleLayers = [];
      if(layer.name=='tlr'){  
        for(var i = 0; i< visibleLayersTLR.length; i++){
          visibleLayers.push(visibleLayersTLR[i]);
        }
      }
      if(layer.name=='acqua'){  
        for(var i = 0; i< visibleLayersACQUA.length; i++){
          visibleLayers.push(visibleLayersACQUA[i]);
        }
      }
      if(layer.name=='gas'){  
        for(var i = 0; i<  visibleLayersGAS.length; i++){
          visibleLayers.push(visibleLayersGAS[i]);
        }
      }
      if(layer.name=='ee'){  
        for(var i = 0; i< visibleLayersEE.length;i++){
          visibleLayers.push(visibleLayersEE[i]);
        }
      }
       if(layer.name=='fognatura'){  
        for(var i = 0; i< visibleLayersFOGNATURA.length; i++){
          visibleLayers.push(visibleLayersFOGNATURA[i]);
        }
      }
      
                
      for(var a =0; a<cartobase.length;a++){
          visibleLayers.push(cartobase[a]);
      }
      
      if(map.basemapLayerIds.length>0){
        var basemapName = map.basemapLayerIds[0];
        var basemap = map.getLayer(basemapName);
        if(basemap!=undefined)
          basemap.setOpacity(0);
      }


      var tmpUrl2 = baseUri + baseUriAppName + "/rest/services/RETI/Reti_"+gisAppName+"/MapServer"
            
      var imageParameters2 = new ImageParameters();
      imageParameters2.layerIds = [];
      imageParameters2.layerOption = ImageParameters.LAYER_OPTION_SHOW;
      imageParameters2.transparent = true;
        
  
        esriRequest.setRequestPreCallback(preRequestCallback);
          
        dynamicMapServiceLayerPianetti = new ArcGISDynamicMapServiceLayer(tmpUrl2,
        {"imageParameters": imageParameters2});

      

          //I want layers 5,4, and 3 to be visible
		  var imageParameters = new ImageParameters();
          imageParameters.layerIds = visibleLayers;
          imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
          imageParameters.transparent = true;

          //construct ArcGISDynamicMapServiceLayer with imageParameters from above
          
          var tmpUrl = ''
    	  if (gisUpdateEnabled){
    		  // Compose GIS Server Uri based on ADS Info
              gisAppName = getAppNameFromAds(ads)
              tmpUrl = baseUri + baseUriAppName +"/rest/services/APP/"+gisAppName+"_DigitHera/MapServer" 

              // Add Basic Authentication as Header on PreRequest 
        	  gisAuthHeader = (userData && userData.username && userData.password)? "Basic " + btoa(userData.username+':'+userData.password) : null
        	  function preRequestCallback(ioArgs) {
        		if (gisAuthHeader && ioArgs.url.includes(baseUri) ){    			
        			console.log("Here with callback");
        			ioArgs.headers['Authorization'] = gisAuthHeader;
        			console.log(ioArgs);
        		}  
        		return ioArgs;
        	  }

        	  esriRequest.setRequestPreCallback(preRequestCallback);
        		  
    	  } 
    	  else {
    		  if (util.isIntune()){
            	  tmpUrl = util.isProduction() ? 
              			'https://gisplainp-gruppohera.msappproxy.net/arcgis/rest/services/DigitHera/MapServer' :
              			'https://gisplainq-gruppohera.msappproxy.net/arcgis/rest/services/Digithera/MapServer';	          
              }
              else {
            	  tmpUrl = util.isProduction() ? 
          			'http://rcgs10pxas.adn.intra:6080/arcgis/rest/services/DigitHera/MapServer' :
          			'http://rcgs10qwas.adn.intra/arcgis/rest/services/Digithera/MapServer';					
              }  
    	  } 
    	  
    	  
          dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer(tmpUrl,
           {"imageParameters": imageParameters});

          map.addLayer(dynamicMapServiceLayer);
          map.addLayer(dynamicMapServiceLayerPianetti);
          dynamicMapServiceLayerPianetti.setVisibleLayers([]);


          if(measurement!=undefined && measurement!=null) {measurement.destroy();}
            measurement = new Measurement({
                map: map
              }, dom.byId("measurementDiv"));
            
          
          measurement.startup();
        });
  }


  
  esriCtrl.setPosition = function(callback, automaticParam){
   require([
           "esri/geometry/Point"
          ], function(
             Point
          ) {

            lastGraphic = undefined;
            automatic = automaticParam;    
            lastCallback = callback;
            go = true;
       	
            initBasePath();
       	 
        if( navigator.geolocation && automatic==true) { 
            navigator.geolocation.getCurrentPosition(internalSetPosition, locationError);
           // watchId = navigator.geolocation.watchPosition(showLocation, locationError);
          }

        function locationError(error) {
          //error occurred so stop watchPosition
         /* if( navigator.geolocation ) {
            navigator.geolocation.clearWatch(watchId);
          }*/
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location not provided");
              break;

            case error.POSITION_UNAVAILABLE:
              alert("Current location not available");
              break;

            case error.TIMEOUT:
              alert("Timeout");
              break;

            default:
              alert("unknown error");
              break;
          }
        }

        function internalSetPosition(location) {
          lastPoint = new Point(location.coords.longitude, location.coords.latitude);
          setPoint();
        }
      })
    }
        

    esriCtrl.deleteLastPosition = function(){
        require([
            "esri/map", 
            "esri/graphic"
          ], function(
            Map, Graphic
          ) {
               if(lastGraphic!=undefined)
               map.graphics.remove(lastGraphic);

               if(lastGraphics!=undefined)
               for(var gr of lastGraphics){
                    map.graphics.remove(gr);
               }

               //map.graphics.remove(lastGraphicText);
              if(lastGraphicLine!=undefined){
                  map.graphics.remove(lastGraphicLine);
              }
               lastPoint = undefined;
               
              if(lastGraphicText!=undefined){
                     map.graphics.remove(lastGraphicText);
              }
          }
          )
      }


    function postAjax(url, data, success,fail) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log('ok post ajax');
              success(this.responseText);
            }
          };
          xhttp.open("POST", url, true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.setRequestHeader("Authorization", gisAuthHeader);
          xhttp.send(data);
		}

    esriCtrl.confirmLastPosition = function(data,dataAllacciamento,endPoint){
        require([
            "esri/map", 
            "esri/graphic",
            "esri/symbols/SimpleMarkerSymbol"
          ], function(
            Map, Graphic, SimpleMarkerSymbol
          ) {
           
       	  initBasePath();
       	 
          console.log('Confermo allacciamento');
          console.log(JSON.stringify(data));
          console.log(JSON.stringify(dataAllacciamento));

          var url = ''
          if (gisUpdateEnabled){
        	  url = baseUri+ baseUriAppName + "/rest/services/APP/"+gisAppName+"_Preventivi/FeatureServer/"+endPoint+"/addFeatures";  
          }
          else {        	  
        	  if (util.isIntune()){
        		  url = util.isProduction() ? 
        				  "https://gissecurep-gruppohera.msappproxy.net/arcgis/rest/services/overit/Preventivi/FeatureServer/"+endPoint+"/addFeatures" :
        					  "https://gissecureq-gruppohera.msappproxy.net/arcgis/rest/services/overit/Preventivi/FeatureServer/"+endPoint+"/addFeatures";
        	  }
        	  else {
        		  url = util.isProduction() ? 
        				  "https://rcgs10pxas.adn.intra:6443/arcgis/rest/services/overit/Preventivi/FeatureServer/"+endPoint+"/addFeatures" :
        					  "https://rcgs10qwas.adn.intra:6443/arcgis/rest/services/overit/Preventivi/FeatureServer/"+endPoint+"/addFeatures" ;
        	  }
          }
		  
          	  
          var callback = function(response){
            console.log("response = ok:" +JSON.stringify(response));
          }

          var fail = function(response){
            console.error("response = ko:"+JSON.stringify(response));
          }
         

          var params = 'features='+JSON.stringify(data);
           console.log(params);
            console.log(url);
          postAjax(url,params,callback, fail);


           if(dataAllacciamento==undefined) return;

          //var urlAllacciamento = "https://rcgs10qwas.adn.intra:6443/arcgis/rest/services/overit/Preventivi/FeatureServer/"+(parseInt(""+endPoint)+1)+"/addFeatures";
          //if(util.isProduction()==false) urlAllacciamento = "http://rcgs10pxas.adn.intra:6080/arcgis/rest/services/Preventivi/FeatureServer/"+(parseInt(""+endPoint)+1)+"/addFeatures";

          var urlAllacciamento = ''
          if (gisUpdateEnabled){
        	  urlAllacciamento = baseUri+ baseUriAppName + "/rest/services/APP/"+gisAppName+"_Preventivi/FeatureServer/"+(parseInt(""+endPoint)+1)+"/addFeatures";  
          }
          else {
        	  if (util.isIntune()){
            	  urlAllacciamento = util.isProduction() ? 
              		"https://gissecurep-gruppohera.msappproxy.net/arcgis/rest/services/Preventivi/FeatureServer/"+(parseInt(""+endPoint)+1)+"/addFeatures" :
        			"https://gissecureq-gruppohera.msappproxy.net/arcgis/rest/services/overit/Preventivi/FeatureServer/"+(parseInt(""+endPoint)+1)+"/addFeatures" ;
            	  }
              else {
            	  urlAllacciamento = util.isProduction() ? 
            		"http://rcgs10pxas.adn.intra:6080/arcgis/rest/services/Preventivi/FeatureServer/"+(parseInt(""+endPoint)+1)+"/addFeatures" :
        			"https://rcgs10qwas.adn.intra:6443/arcgis/rest/services/overit/Preventivi/FeatureServer/"+(parseInt(""+endPoint)+1)+"/addFeatures" ;
              }
          }
    	    
          var callbackAl = function(response){
            console.log("responseAl = ok:"+JSON.stringify(response));
          }

          var failAl = function(response){
            console.error("responseAl = ko:"+JSON.stringify(response));
          }
        
         var paramsAll = 'features='+JSON.stringify(dataAllacciamento);
         console.log(paramsAll);
         
          postAjax(urlAllacciamento,paramsAll,callbackAl, failAl);
        
         /* var symbol = new SimpleMarkerSymbol(
          );
          graphic = new Graphic(lastPoint, symbol);
          map.graphics.add(graphic);
          lastGraphic = graphic;
          var tmp = document.getElementsByTagName('circle');
          tmp[tmp.length-1].style.webkitAnimationName = 'none';
          var tmp2 = document.getElementsByTagName('text');
          tmp2[tmp2.length-1].style.webkitAnimationName = 'none';*/

        })

      }


  function setPoint(){
   require([
            "esri/map", "esri/geometry/Point", 
            "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
            "esri/graphic", "esri/Color", "esri/symbols/Font","dojo/domReady!"
          ], function(
            Map, Point,
            SimpleMarkerSymbol, SimpleLineSymbol,
            Graphic, Color,Font
          ) {

      if(automatic) zoomToLocation();
      else addGraphic();

      function zoomToLocation() {
         setTimeout(function(){go = false;},5000);
         if(go==false) return;
          addGraphic();
          var zoom = 20;
          map.centerAndZoom(lastPoint, zoom);
        }

    function showLocation() {
       if(go==false) return;
          addGraphic();   
          map.centerAt(lastPoint);
        }
        
      function addGraphic(){
          if(lastGraphic!=undefined || lastCallback==undefined) return;
          lastCallback({lng:lastPoint.x, lat: lastPoint.y});

          var symbol = new SimpleMarkerSymbol(
           SimpleMarkerSymbol.STYLE_CIRCLE, 
            12, 
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([210, 105, 30, 0.5]), 
              15
            ), 
            new Color([210, 105, 30, 0.9])
          );


          var textSymbol = new esri.symbol.TextSymbol("Posizione alloggiamento");
          textSymbol.setColor( new dojo.Color([128, 0, 0]));
          textSymbol.setAlign(esri.symbol.TextSymbol.ALIGN_START);
          textSymbol.setAngle(15);
            var font  = new Font();
          font.setWeight(Font.WEIGHT_BOLD);
          font.setSize("18pt");
          textSymbol.setFont(font);
          textSymbol.setOffset(12, 0);
          graphic = new Graphic(lastPoint, textSymbol);
          map.graphics.add(graphic);

          lastGraphicText = graphic;

          var graphicPoint = new Graphic(lastPoint, symbol);
          map.graphics.add(graphicPoint);

          lastGraphic = graphicPoint;



        }

          })
  }

esriCtrl.deleteLine = function(saveText){
      if(lastGraphicLine!=undefined){
           map.graphics.remove(lastGraphicLine);
      }
        if(lastGraphicText!=undefined && saveText==undefined){
                     map.graphics.remove(lastGraphicText);
              }
}

  esriCtrl.setLine = function(point){
        require([
            "esri/map", "esri/geometry/Point","esri/symbols/SimpleLineSymbol",
            "esri/graphic", "esri/Color","esri/symbols/CartographicLineSymbol",  "esri/geometry/Polyline", 
        "esri/SpatialReference",
          ], function(
            Map, Point,
           SimpleLineSymbol,
            Graphic, Color, CartographicLineSymbol, Polyline, SpatialReference
          ) {


          if(lastGraphicLine!=undefined){
               map.graphics.remove(lastGraphicLine);
          }
          var lineSymbol = new CartographicLineSymbol(
          CartographicLineSymbol.STYLE_SOLID,
          new Color([255,0,0]), 3,
          CartographicLineSymbol.CAP_ROUND,
          CartographicLineSymbol.JOIN_MITER, 5
        );

         var lineGeometry = new Polyline(new SpatialReference({wkid:4326}));
         lineGeometry.addPath(point)

         var lineGraphic = new Graphic(lineGeometry, lineSymbol);
         lastGraphicLine = lineGraphic;
         map.graphics.add(lineGraphic)
  }
   )}

  esriCtrl.setLayers = function(layers){
   require([
      'esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer','esri/layers/ImageParameters', 'esri/request',   "esri/InfoTemplate","esri/layers/FeatureLayer", "esri/symbols/TextSymbol","esri/Color","esri/layers/LabelClass",
               ], function(
            Map, ArcGISDynamicMapServiceLayer, ImageParameters,esriRequest,  InfoTemplate, FeatureLayer,TextSymbol, Color, LabelClass
          ) {

        var visible = [];
        var visiblePianetti = [];
               
        layerMappa = layers;
        pianettiChecked = false;
        for(i=0; i<layers.length;i++){
          if(layers[i].checked==true && layers[i].name=='tlr'){
              for(var a =0; a<visibleLayersTLR.length;a++){
                 visible.push(visibleLayersTLR[a]);
              }
          }
          if(layers[i].checked==true && layers[i].name=='acqua'){
              for(var a =0; a<visibleLayersACQUA.length;a++){
                 visible.push(visibleLayersACQUA[a]);
              }
          }
          if(layers[i].checked==true && layers[i].name=='gas'){
              for(var a =0; a<visibleLayersGAS.length;a++){
                 visible.push(visibleLayersGAS[a]);
              }
          }
          if(layers[i].checked==true && layers[i].name=='ee'){
              for(var a =0; a<visibleLayersEE.length;a++){
                 visible.push(visibleLayersEE[a]);
              }
          }
           if(layers[i].checked==true && layers[i].name=='fognatura'){
              for(var a =0; a<visibleLayersFOGNATURA.length;a++){
                 visible.push(visibleLayersFOGNATURA[a]);
              }
          }
          if(layers[i].checked==true && layers[i].name=='ctr'){
              for(var a =0; a<visibleCtrLayers.length;a++){
                 visible.push(visibleCtrLayers[a]);
              }
          }

          if(layers[i].checked==true && layers[i].name=='basemap'){
              if(map.basemapLayerIds.length>0){
                var basemapName = map.basemapLayerIds[0];
                var basemap = map.getLayer(basemapName);
                if(basemap!=undefined)
                  basemap.setOpacity(1);
              }

          }
          if(layers[i].checked==false && layers[i].name=='basemap'){
              for(var a =0; a<cartobase.length;a++){
                 visible.push(cartobase[a]);
              }
              if(map.basemapLayerIds.length>0){
                var basemapName = map.basemapLayerIds[0];
                var basemap = map.getLayer(basemapName);
                if(basemap!=undefined)
                  basemap.setOpacity(0);
              }
          }

          if(layers[i].checked==true && layers[i].name=='pianetti'){
              visiblePianetti = getLayerPianetti(gisAppName);
              pianettiChecked = true;
          }
          

            
        }

        dynamicMapServiceLayer.setVisibleLayers(visible);
        dynamicMapServiceLayerPianetti.setVisibleLayers(visiblePianetti);
      }

   )}

  esriCtrl.location = function(){
    require([
            "esri/map", "esri/geometry/Point", 
            "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
            "esri/graphic", "esri/Color", "dojo/domReady!"
          ], function(
            Map, Point,
            SimpleMarkerSymbol, SimpleLineSymbol,
            Graphic, Color
          ) {

      
        function locationError(error) {
          //error occurred so stop watchPosition
          /*if( navigator.geolocation ) {
            navigator.geolocation.clearWatch(watchId);
          }*/
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location not provided");
              break;

            case error.POSITION_UNAVAILABLE:
              alert("Current location not available");
              break;

            case error.TIMEOUT:
              alert("Timeout");
              break;

            default:
              alert("unknown error");
              break;
          }
        }


          if( navigator.geolocation ) { 
            go = true; 
            navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
           // watchId = navigator.geolocation.watchPosition(showLocation, locationError);
          } else {
            alert("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
          }

      function zoomToLocation(location) {
         setTimeout(function(){go = false;},5000);
         if(go==false) return;
          
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          addGraphic(pt);
          map.centerAndZoom(pt, 20);
        }

    function showLocation(location) {
       if(go==false) return;
        
          //zoom to the users location and add a graphic
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          if ( !graphic ) {
            addGraphic(pt);
          } else { // move the graphic if it already exists
            graphic.setGeometry(pt);
          }
          map.centerAt(pt);
        }
        
        function addGraphic(pt){
          if(go==false) return;

          var symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE, 
            12, 
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([210, 105, 30, 0.5]), 
              8
            ), 
            new Color([210, 105, 30, 0.9])
          );
          graphic = new Graphic(pt, symbol);
          map.graphics.add(graphic);
        }

          })

        }
    
    esriCtrl.addEsri = function() {
      console.log("ESRI UPLOADED: " + esriUploaded);
      if(!esriUploaded) {
        esriUploaded = true;
        try{
          var arcgis = document.createElement("script");
        arcgis.type = "text/javascript";
        arcgis.src = "assets/arcgis.js";
        document.head.appendChild(arcgis);
        
        /*
        var calcite = document.createElement("link");
        calcite.rel = "stylesheet";
        calcite.href = "http://js.arcgis.com/3.22/esri/themes/calcite/dijit/calcite.css";
        document.head.appendChild(calcite);
        */
        var esri = document.createElement("link");
        esri.rel = "stylesheet";
        esri.href = "http://js.arcgis.com/3.22/esri/css/esri.css";
        document.head.appendChild(esri);
  
        var claro = document.createElement("link");
        claro.rel = "stylesheet";
        claro.href = "http://js.arcgis.com/3.22/dijit/themes/claro/claro.css";
        document.head.appendChild(claro);
        }catch(err){
          console.log("ESRI CATCH ERRORE: " + err);
          throw "esriCtrl.addEsri.err";
        }
        

      }
    }

esriCtrl.getListaTubature = function (lng, lat, layerSelected,callback) {
  console.log('getLista tubature');
  if(util.getMockMap()==true){
     callback(toJson("", ''));
     return;
  }
     
 
  var url = ''
  if (gisUpdateEnabled){
	  url = baseUri + baseUriAppName +"/rest/services/APP/"+gisAppName+"_scegli/GPServer/scegli/execute?lat=<lat>&lng=<lng>&settore=<sect>&f=pjson";  
  } 
  else{	  
	  if (util.isIntune()){
		  url = util.isProduction() ? 
				  "https://gissecurep-gruppohera.msappproxy.net/arcgis/rest/services/scegli/GPServer/scegli/execute?lat=<lat>&lng=<lng>&settore=<sect>&f=pjson" :
					  "https://gissecureq-gruppohera.msappproxy.net/arcgis/rest/services/overit/scegli/GPServer/scegli/execute?lat=<lat>&lng=<lng>&settore=<sect>&f=pjson" ;
	  }
	  else {
		  url = util.isProduction() ? 
				  "http://rcgs10pxas.adn.intra:6080/arcgis/rest/services/scegli/GPServer/scegli/execute?lat=<lat>&lng=<lng>&settore=<sect>&f=pjson" :
					  "http://rcgs10qwas.adn.intra:6080/arcgis/rest/services/overit/scegli/GPServer/scegli/execute?lat=<lat>&lng=<lng>&settore=<sect>&f=pjson" ;
	  }
  }
  
  
 
  var params = { lat: lat, lng: lng, settore: layerSelected };
  //var tubature;
  getAjax(url, params, callbackInternal, error);

  function callbackInternal(res) {
    console.log("success getlistatubature");
    //this.tubature = res;
    callback(toJson(res));
  }

  function error(res) {
    console.log("error ", res);
    alert("errore nel recuperare gli allacci" + res.error.message);
  }

}


function getAjax(url, params, callback, error) {
  var xhr = new XMLHttpRequest();

  url = url.replace("<lat>", params.lat);
  url = url.replace("<lng>", params.lng);
  url = url.replace("<sect>", params.settore);

  console.log(url);

  xhr.open('GET', url, true);
  xhr.setRequestHeader("Authorization", gisAuthHeader);
  
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      callback(response);
    }
    else if (xhr.readyState > 3 && xhr.status != 200) error(response);
  }
} 

esriCtrl.test = function (lng, lat, layerSelected,callback) {
  callback(toJson("", ''));
}

function toJson(tubature, coordinatePunto) { 
  console.log('startToJson');
  
  var result;
  if(util.getMockMap()==true){
      tubature = "{'dist':4989250.51861}{u'paths': [[[10.899949765265877, 44.6576047171872], [10.899951205079885, 44.6576008383974], [10.899961693901066, 44.6575826122272]]]}{u'IDSAP': u'3287595', u'MATERIALE': u'CA', u'OBJECTID': 61745, u'DIAMETRO': 200} {'dist':4989250.51782}{u'paths': [[[10.90082761756098, 44.65735480277355], [10.900970270211246, 44.65731235521138], [10.898701704330435, 44.6585735006469]]]}{u'IDSAP': u'3276199', u'MATERIALE': u'CA', u'OBJECTID': 51085, u'DIAMETRO': 200} {'dist':4989250.51846}{u'paths': [[[10.899949765265877, 44.6576047171872], [10.899891300624306, 44.6577634095156]]]}{u'IDSAP': u'3288132', u'MATERIALE': u'CA', u'OBJECTID': 63588, u'DIAMETRO': 200} {'dist':4989250.51863}{u'paths': [[[10.899961693901066, 44.6575826122272], [10.899967915217662, 44.65758421464861]]]}{u'IDSAP': u'8374146', u'MATERIALE': u'CA', u'OBJECTID': 691717, u'DIAMETRO': 200} {'dist':4989250.51863}{u'paths': [[[10.899967915217662, 44.65758421464861], [10.899979369514702, 44.65758716496589], [10.900006142859876, 44.65758229832256]]]}{u'IDSAP': u'8374147', u'MATERIALE': u'CA', u'OBJECTID': 691718, u'DIAMETRO': 200} {'dist':4989250.51832}{u'paths': [[[10.899870441065765, 44.65790780948407], [10.899840009328283, 44.65790215915093]]]}{u'IDSAP': u'3330439', u'MATERIALE': u'PE', u'OBJECTID': 89043, u'DIAMETRO': 63} {'dist':4989250.51863}{u'paths': [[[10.900006142859876, 44.65758229832256], [10.900053803478446, 44.65757365774216], [10.900128975031471, 44.65755975739231]]]}{u'IDSAP': u'3276600', u'MATERIALE': u'CA', u'OBJECTID': 50693, u'DIAMETRO': 200} {'dist':4989250.51846}{u'paths': [[[10.899754623099149, 44.65773811944986], [10.899891300624306, 44.6577634095156]]]}{u'IDSAP': u'3330452', u'MATERIALE': u'PE', u'OBJECTID': 89090, u'DIAMETRO': 32} {'dist':4989250.51782}{u'paths': [[[10.901054601244507, 44.657252167124476], [10.898701704330435, 44.6585735006469]]]}{u'IDSAP': u'3316948', u'TIPORETEACQUA': u'ACRM' ,u'MATERIALE': u'PE', u'OBJECTID': 74266, u'DIAMETRO': 32} {'dist':4989250.51789}{u'paths': [[[10.898708756769059, 44.65849608963997], [10.901194653625279, 44.65725732317561]]]}{u'IDSAP': u'3275339', u'MATERIALE': u'CA', u'OBJECTID': 51075, u'DIAMETRO': 200} {'dist':4989250.51833}{u'paths': [[[10.899891300624306, 44.6577634095156], [10.899840009328283, 44.65790215915093]]]}{u'IDSAP': u'3288133', u'MATERIALE': u'CA', u'OBJECTID': 63589, u'DIAMETRO': 200} {'dist':4989250.51786}{u'paths': [[[10.89870146422431, 44.65852673806436], [10.901131644932985, 44.657270287096246], [10.90112627108732, 44.6572911001136]]]}{u'IDSAP': u'3268260', u'MATERIALE': u'PE', u'OBJECTID': 44180, u'DIAMETRO': 90} {'dist':4989250.51789}{u'paths': [[[10.901153567578348, 44.65722021076712], [10.898708756769059, 44.65849608963997]]]}{u'IDSAP': u'3316553', u'MATERIALE': u'PE', u'OBJECTID': 74468, u'DIAMETRO': 32} {'dist':4989250.51821}{u'paths': [[[10.899840009328283, 44.65790215915093], [10.899791695948164, 44.65803323147157]]]}{u'IDSAP': u'3288485', u'MATERIALE': u'CA', u'OBJECTID': 60851, u'DIAMETRO': 200} {'dist':4989250.51861}{u'paths': [[[10.89981434766506, 44.657579683498994], [10.899949765265877, 44.6576047171872]]]}{u'IDSAP': u'3330765', u'MATERIALE': u'PE', u'OBJECTID': 86415, u'DIAMETRO': 32} {'dist':4989250.51863}{u'paths': [[[10.899961693901066, 44.6575826122272], [10.899976563013217, 44.6575572768816], [10.899983447674828, 44.6575247068447]]]}{u'IDSAP': u'3290238', u'MATERIALE': u'ACC', u'OBJECTID': 61877, u'DIAMETRO': 250}";
      result = tubature.replace(/'/g, '"').split('{"di');
  }
   else
   {
      result = tubature.results[0].value.replace(/'/g, '"').split('{"di');
   }
  

   var arr = [];
  //reorder
  if(result[0]=="")
    result = result.splice(1,result.length);

  for (var i = 0; i < result.length; i++) {
    if (result[i].length > 1)
      arr.push(JSON.parse("[" + result[i].replace("st", '{"dist').replace(/}{/g, "},{").replace(/u"/g, '"').replace(/None/g, '""').substring(0, result[i].length).concat("]")));
  }

  var sortedArr = [];
  for(var index = 0; index < arr.length; index++){
    var minDist = 222222222222222333333332;
    var indexTmp = 0;
    for(var a=0; a<arr.length;a++){
        if(arr[a][0].dist < minDist && arr[a].visitato!=true){
          minDist = arr[a][0].dist;
          indexTmp = a;
        }
    }
    arr[indexTmp].visitato = true;
    sortedArr.push(arr[indexTmp]);

  }

  getListaAllacci(sortedArr, coordinatePunto);
  return sortedArr;
}


function getListaAllacci(array, coordinatePunto) {

  for (var index = 0; index < array.length; index++) {
    console.log("Object ", array[index][2].OBJECTID);
    var trattaColor = getColor();
    array[index].color = ''+trattaColor;
    for(var j = 0; j < array[index][1].paths.length; j++){
      for(var k = 0; k < array[index][1].paths[j]; k++){
        esriCtrl.setLines(array[index][1][j], array[index][2].OBJECTID, trattaColor);
      }
    }
    // for (let path of element[1].paths) {
    //   for (let coordinate of path) {
      
    //     esriCtrl.setLines(path, element[2].OBJECTID, trattaColor);
    //   }
    // }
  }
}


esriCtrl.getDestinationPoint = function(callback){
    destinationCallback = callback;
}

esriCtrl.getNearestCoordinate = function (element, coordinatePunto, callback) {
  require([
    "esri/geometry/Point",
    "esri/geometry/geometryEngine",
    "esri/SpatialReference",
    "esri/geometry/Polyline",
    "esri/geometry/Geometry"
  ], function (Point, geometryEngine, SpatialReference,Polyline) {

     console.log('get nearest coord');
    var geometry = new SpatialReference({ wkid: 4326 });
    var puntoPartenza = new Point({
      longitude: coordinatePunto.x,
      latitude: coordinatePunto.y,
      spatialReference: map.spatialReference
    });

  var polylineJson = {
    "paths":element[1].paths,
    "spatialReference":{"wkid":4326}
  };

  var polyline = new Polyline(polylineJson);

          var coordinates = geometryEngine.nearestCoordinate(polyline, puntoPartenza);
          //esriCtrl.setLine([[coordinatePunto.x, coordinatePunto.y],[coordinates.coordinate.x, coordinates.coordinate.y]]);
          callback(coordinates);
      
    
  });
}

esriCtrl.setLines = function(point, title, trattaColor) {
  require([
    "esri/map", "esri/geometry/Point", "esri/symbols/SimpleLineSymbol",
    "esri/graphic", "esri/Color", "esri/symbols/CartographicLineSymbol", "esri/geometry/Polyline",
    "esri/SpatialReference", "esri/symbols/Font", "esri/symbols/SimpleMarkerSymbol"
  ], function (
    Map, Point,
    SimpleLineSymbol,
    Graphic, Color, CartographicLineSymbol, Polyline, SpatialReference, Font, SimpleMarkerSymbol
  ) {

      //var lastGraphicLine;
      //if (lastGraphicLine != undefined) {
      //  map.graphics.remove(lastGraphicLine);
      //}
     
      var lineSymbol = new CartographicLineSymbol(
        CartographicLineSymbol.STYLE_SOLID,
        new Color(trattaColor), 3,
        CartographicLineSymbol.CAP_ROUND,
        CartographicLineSymbol.JOIN_MITER, 5
      );

      var lineGeometry = new Polyline(new SpatialReference({ wkid: 4326 }));
      lineGeometry.addPath(point)

      var lineGraphic = new Graphic(lineGeometry, lineSymbol);
      lastGraphicLine = lineGraphic;
       lastGraphics.push(lineGraphic);
      map.graphics.add(lineGraphic);

      var symbol = new SimpleMarkerSymbol(
        SimpleMarkerSymbol.STYLE_CIRCLE,
        12,
        new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([210, 105, 30, 0.5]),
          15
        ),
        new Color([210, 105, 30, 0.9])
      );  

     /* var textSymbol = new esri.symbol.TextSymbol("Tratta " + title);
      textSymbol.setColor(new dojo.Color(trattaColor));
      textSymbol.setAlign(esri.symbol.TextSymbol.ALIGN_START);
      textSymbol.setAngle(15);
      var font = new Font();
      font.setWeight(Font.WEIGHT_BOLD);
      font.setSize("18pt");
      textSymbol.setFont(font);
      textSymbol.setOffset(12, 0);
      var middle = Math.round(point.length/2);
      var lastPoint = new Point(point[middle][0], point[middle][1]);
      //var lastPoint = new Point(10.900021, 44.657772);
      var graphic = new Graphic(lastPoint, textSymbol);
      lastGraphics.push(graphic);
      map.graphics.add(graphic);*/
    }
  )
}

function removeLastGraphic() {
  for(var i = 0; i < lastGraphics.length; i++){
    map.graphics.remove(lastGraphics[i]);
  }
  
}

function getColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

