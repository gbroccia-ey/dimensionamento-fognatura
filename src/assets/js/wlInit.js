/**
 *    © Copyright 2016 IBM Corp.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

//Do not remove the below object
var wlInitOptions = {};
var initialized = false;


	
	// Common initialization code goes here
	var init = function(){
		if(initialized == true)
			return;
		initialized = true;	
		//WL.App.hideSplashScreen();
		var env = WL.Client.getEnvironment();
		if(env === WL.Environment.IPHONE || env === WL.Environment.IPAD){
			document.body.classList.add('platform-ios');
		} else if(env === WL.Environment.ANDROID){
			document.body.classList.add('platform-android');
		}
		document.dispatchEvent(new Event('mfpinitialized'));

	    document.dispatchEvent(new Event('mfpready'));
	};


    var waitForWL = function(){
        if(typeof WL !== 'undefined' && WL._JSONStoreImpl) {
            init();
        } else {
            setTimeout(waitForWL, 100);
        }
    };
    
    waitForWL();



