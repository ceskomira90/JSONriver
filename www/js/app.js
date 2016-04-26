/*! 
 * Roots v 2.0.0
 * Follow me @adanarchila at Codecanyon.net
 * URL: http://codecanyon.net/item/roots-phonegapcordova-multipurpose-hybrid-app/9525999
 * Don't forget to rate Roots if you like it! :)
 */

// In this file we are goint to include all the Controllers our app it's going to need

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        $.getJSON("http://www.riverauto.it/ITA/sezioni/jq_lista_modelli_raw.php", function (data) {
            app.storeData(data);
           
        });
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

       
        

        // Open any external link with InAppBrowser Plugin
        $(document).on('click', 'a[href^=http], a[href^=https]', function(e){

            e.preventDefault();
            var $this = $(this); 
            var target = $this.data('inAppBrowser') || '_blank';

            window.open($this.attr('href'), target);

        });
        
        // Initialize Push Notifications
        // Uncomment the following initialization when you have made the appropriate configuration for iOS - http://goo.gl/YKQL8k and for Android - http://goo.gl/SPGWDJ
        app.initPushwoosh();
        
    },
    storeData: function(data){
        for (var i = 0; i < data.length; i++) {
            var cars = new Array(data.length);
            alert(data.lenght);
            var car = data[i];
            localStorage.car = JSON.stringify(car);
            var carObj = JSON.parse(localStorage.car)
            
            //alert(carObj.marca + " " + carObj.id + " ");
            break;
            
        }
       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
    	var Platform=device.platform;
        console.log('Received Eventss: ' + id);
        console.log('Device platform :' + Platform);
    },
    // Register device for Push Notifications
    initPushwoosh: function() {
        // var pushNotification = window.plugins.pushNotification;
         var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");
 
        //set push notifications handler
        document.addEventListener('push-notification', function(event) {
            var title = event.notification.title;
            var userData = event.notification.userdata;
                                 
            if(typeof(userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }
                                     
            alert(title);
        });
 
        //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_NUMBER", pw_appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
        pushNotification.onDeviceReady({ projectid: "204358123236", pw_appid: "EB3E4-CD656" });
 
        //register for pushes
        pushNotification.registerDevice(
            function(status) {
                var pushToken = status;
                console.warn('push token: ' + pushToken);
            },
            function(status) {
                console.warn(JSON.stringify(['failed to register ', status]));
            }
        );

  if(device.platform == "Android") {
            registerPushwooshAndroid();
   }
   if (device.platform == "iPhone" || device.platform == "iOS") {
            registerPushwooshIOS();
   }
  }
    
};


(function(){
  'use strict';
 
  var app = angular.module('app', ['onsen', 'angular-images-loaded', 'ngSanitize', 'ngMap', 'ui.bootstrap', 'angular-carousel']);

  // Filter to convert HTML content to string by removing all HTML tags
  app.filter('htmlToPlaintext', function() {
      return function(text) {
        return String(text).replace(/<[^>]+>/gm, '');
      }
    }
  );

  app.directive('datePicker', function () {
      return {
          link: function postLink(scope, element, attrs) {
              scope.$watch(attrs.datePicker, function () {
                  if (attrs.datePicker === 'start') {
                      //element.pickadate();
                  }
              });
          }
      };
  });  

  // PLUGINS: Device Controller
  app.controller('DeviceController', function($scope) {
      
      $scope.device = device;
      
  });
  
 
 //navigation controller
  app.controller('NavigationController', function($scope){
      var destination = '43.8067706, 11.2920598';
//	  var currentPosition =  navigator.geolocation.getCurrentPosition(function(pos) {
//	           launchnavigator.navigate(
//	                  "London, UK",
//	                  [pos.coords.latitude, pos.coords.longitude],
//	                  function(){
//	                    //  alert("Plugin success");
//	                  },
//	                  function(error){
//	                    //  alert("Plugin error: "+ error);
//	                  });
//	           });
	  
	  $scope.navigation=function(){
	   launchnavigator.navigate(destination, null, 
	     function(){
	        //   alert("Plugin success");
	       },
	       function(error){
	       alert("Errore: "+ error); 
	       });
	  }
	  
	  $scope.callNumber = function () {
	      window.open('tel:3205623390', '_system');
	  }
	 
	  
  });

  
  //gallery controller
  app.controller('GalleryController', function($scope) {
      
		$scope.Show=function(imageSrc){
			//var imageSrc= 'images/gallery/01.png';
			FullScreenImage.showImageURL(imageSrc);
		}  
	  
	    });
  
  
  //facebook controller
  app.controller('FacebookController', function($scope) {
      
	  var successCallback = function(data) {
	    //    alert("Success!");
	        // if calling canLaunch() with getAppList:true, data will contain an array named "appList" with the package names of applications that can handle the uri specified.
	    };
	    var errorCallback = function(errMsg) {
	        alert("Error! " + errMsg);
	    }
	    
	  
	    
		$scope.Open=function(){
			
		//	window.plugins.launcher.canLaunch({uri:'fb://'}, successCallback, errorCallback);
		//	if(window.plugins.launcher.canLaunch({uri:'fb://'}, successCallback, errorCallback)){
		         window.plugins.launcher.launch({uri:'fb://facewebmodal/f?href=https://www.facebook.com/pages/RistoApp/460510230790489'}, successCallback, errorCallback);
		         
		 //     }
		 //     else {
		  //  	  window.open('https://www.facebook.com/pages/RistoApp/460510230790489', '_system','location=yes');
		  //   }
		}
		  
	    });
  
  //menu personale controller
  app.controller('ItemList',function( $scope){
	    
	    $scope.item =[
	    	{title:'Polipetti Affogati',price:8.00,active:false,pic:'images/menu/antipasti/polipetti.png'},
	    	{title:'Cozze Gratinate',price:3.00,active:false,pic:'images/menu/antipasti/cozze.png'},
	    	{title:'Insalata di mare',price:12.00,active:false,pic:'images/menu/antipasti/insalata.png'},
	    	{title:'Cocktail di gamberi',price:7.00,active:false,pic:'images/menu/antipasti/cocktail.png'},
	    	{title:'Caprese',price:5.00,active:false,pic:'images/menu/antipasti/caprese.png'}];

	    $scope.total=0;
	    $scope.totitem=0;
	    $scope.CalTotal=function()
	    {
	        var tot=0;
	        angular.forEach($scope.item,function(s){
	            if(s.active)
	                tot+= s.price;
	        });
	        return tot;
	    }
	    $scope.toggleActive = function(s){

	        if(!s.active) {

	            s.active=true;
	            $scope.totitem++;
	        }
	        else
	        {

	            s.active=false;
	            $scope.totitem--;

	        }
	    };
	    
	    $scope.itemP =[
	  		    	{title:'Linguine con aragosta',price:10.00,active:false,pic:'images/menu/primi/aragosta.png'},
	  		    	{title:'Linguine con astice',price:20.00,active:false,pic:'images/menu/primi/astice.png'},
	  		    	{title:'Spaghetti alle cozze',price:8.00,active:false,pic:'images/menu/primi/cozze.png'},
	  		    	{title:'Linguine ai funghi porcini',price:10.00,active:false,pic:'images/menu/primi/funghi.png'},
	  		    	{title:'Paccheri alla pescatrice',price:12.00,active:false,pic:'images/menu/primi/paccheri.png'},
	  		    	{title:'Risotto alla pescatore',price:10.00,active:false,pic:'images/menu/primi/risotto.png'}];

	    $scope.CalTotalP=function()
	    {
	        var tot=0;
	        angular.forEach($scope.itemP,function(s){
	            if(s.active)
	                tot+= s.price;
	        });
	        return tot;
	    }
	    
	    $scope.itemS =[
		  		    	{title:'Bistecca ai ferri',price:8.00,active:false,pic:'images/menu/secondi/bistecca.png'},
		  		    	{title:'Costolette di Agnello',price:7.00,active:false,pic:'images/menu/secondi/costolette.png'},
		  		    	{title:'Cotoletta alla milanese',price:6.00,active:false,pic:'images/menu/secondi/cotoletta.png'},
		  		    	{title:'Gamberoni alla brace',price:15.00,active:false,pic:'images/menu/secondi/gamberoni.png'},
		  		    	{title:'Grigliata mista',price:15.00,active:false,pic:'images/menu/secondi/grigliata.png'},
		  		    	{title:"Pesce all'acqua pazza",price:4.00,active:false,pic:'images/menu/secondi/pesce.png'}];
	    
	    $scope.CalTotalS=function()
	    {
	        var tot=0;
	        angular.forEach($scope.itemS,function(s){
	            if(s.active)
	                tot+= s.price;
	        });
	        return tot;
	    }
	    
	    
	    $scope.itemD =[
		  		    	{title:'Dolce della casa',price:3.00,active:false,pic:'images/menu/desserts/dolce.png'},
		  		    	{title:'Frutta di stagione',price:2.00,active:false,pic:'images/menu/desserts/frutta.png'},
		  		    	{title:'Macedonia',price:3.00,active:false,pic:'images/menu/desserts/macedonia.png'},
		  		    	{title:'Panna cotta',price:3.00,active:false,pic:'images/menu/desserts/pannacotta.png'},
		  		    	{title:'Tartufo di Pizzo',price:3.00,active:false,pic:'images/menu/desserts/tartufo.png'}];
	    	
	    $scope.CalTotalD=function()
	    {
	        var tot=0;
	        angular.forEach($scope.itemD,function(s){
	            if(s.active)
	                tot+= s.price;
	        });
	        return tot;
	    }
	    
	    $scope.itemV =[
		  		    	{title:' Vino Bianco Frizzante "Lubigo"',price:8.60,active:false,pic:'images/menu/cantina/bianco.png'},
		  		    	{title:'Champagne Brut "Rosè Imperial"',price:51.30,active:false,pic:'images/menu/cantina/champ.png'},
		  		    	{title:'Musar Jeune Rosè 2013',price:18.00,active:false,pic:'images/menu/cantina/rose.png'},
		  		    	{title:"Terre Siciliane IGT Nero d'Avola 2014",price:9.30,active:false,pic:'images/menu/cantina/rosso.png'},
		  		    	{title:" Sicilia Nero d'Avola ",price:19.30,active:false,pic:'images/menu/cantina/rosso2.png'}];
	    	
	    $scope.CalTotalV=function()
	    {
	        var tot=0;
	        angular.forEach($scope.itemV,function(s){
	            if(s.active)
	                tot+= s.price;
	        });
	        return tot;
	    }
});

  
  //piatto controller
  app.controller('PiattoController', function($scope) {
      
	  var successCallback = function(data) {
	    //    alert("Success!");
	        // if calling canLaunch() with getAppList:true, data will contain an array named "appList" with the package names of applications that can handle the uri specified.
	    };
	    var errorCallback = function(errMsg) {
	        alert("Error! " + errMsg);
	    }
	    
	  
		$scope.Open=function(){
			
		//	if(window.plugins.launcher.canLaunch({packageName:'com.facebook.katana'}, successCallback, errorCallback)){
		         window.plugins.launcher.launch({uri:'fb://facewebmodal/f?href=https://www.facebook.com/460510230790489/photos/a.460510817457097.1073741828.460510230790489/460510874123758/?type=3&theater'}, successCallback, errorCallback);
		         
		 //     }
		  //    else {
		  //  	  window.open('https://www.facebook.com/pages/RistoApp/460510230790489', '_system','location=yes');
		  //    }
		}
		  
	    });
  
 //menù del giorno controller
  app.controller('MenuController', function($scope, $http) {
      
		
		$scope.device=device;
		 var page_id = 83;

	 	 $.ajax({
	  	        url: 'http://davidemilone.com/provawp/?json=get_page&page_id='+page_id+'&callback=?',
	  	        dataType: 'jsonp',
	  	        type: 'GET',
	  	      beforeSend: function() {
	  	          $(window).load(function () {
	  	              $(".loaderjquery").show();
	  	          })
	           },
	  	        success: function(data) {
	  	        	
	  	        		$scope.page=data.page;
	  	        		$scope.$apply();
	  	        		$(".loaderjquery").fadeOut("slow");
	  	        }
	  	 	
	  	});
	      
	  
		  
	    });
 
//AboutController
  app.controller('AboutController', function($scope, $http) {
      
	  
	
	$scope.device=device;
	 var page_id = 28;
  	 $.ajax({
  	     url: 'http://www.settescogliapp.it/?json=get_page&page_id=' + page_id + '&callback=?',
  	        dataType: 'jsonp',
  	        type: 'GET',
  	      beforeSend: function() {
  	          $(window).load(function () {
  	              $(".loaderjquery").show();
  	          })
           },
  	        success: function(data) {
  	        	
  	        		$scope.page=data.page;
  	        		$scope.$apply();
  	        		$(".loaderjquery").fadeOut("slow");
  	        }
  	 	
  	});
      
  
	  
    });

//Eventi Controller
  app.controller('newsController', [ '$http', '$scope', '$rootScope', function($http, $scope, $rootScope){

        $scope.yourAPI = 'http://www.settescogliapp.it/api/get_tag_posts/?tag=eventipub';
	    $scope.items = [];
	    $scope.totalPages = 0;
	    $scope.currentPage = 1;
	    $scope.pageNumber = 1;
	    $scope.isFetching = true;
	    $scope.lastSavedPage = 0;

	    // Let's initiate this on the first Controller that will be executed.
	    ons.ready(function() {
	      
	      // Cache Images Setup
	      // Set the debug to false before deploying your app
	      ImgCache.options.debug = true;

	      ImgCache.init(function(){

	        //console.log('ImgCache init: success!');
	        $rootScope.$broadcast('ImgCacheReady');
	        // from within this function you're now able to call other ImgCache methods
	        // or you can wait for the ImgCacheReady event

	      }, function(){
	        //console.log('ImgCache init: error! Check the log for errors');
	      });

	    });


	    $scope.pullContent = function(){
	      
	      $http.jsonp($scope.yourAPI+'&callback=JSON_CALLBACK').success(function(response) {

	        if($scope.pageNumber > response.pages){

	          // hide the more news button
	          $('#moreButton').fadeOut('fast');  

	        } else {

	          $scope.items = $scope.items.concat(response.posts);
	          window.localStorage.setObject('rootsPosts', $scope.items); // we save the posts in localStorage
	          window.localStorage.setItem('rootsDate', new Date());
	          window.localStorage.setItem("rootsLastPage", $scope.currentPage);
	          window.localStorage.setItem("rootsTotalPages", response.pages);

	          // For dev purposes you can remove the comment for the line below to check on the console the size of your JSON in local Storage
	          // for(var x in localStorage)console.log(x+"="+((localStorage[x].length * 2)/1024/1024).toFixed(2)+" MB");

	          $scope.totalPages = response.pages;
	          $scope.isFetching = false;

	          if($scope.pageNumber == response.pages){

	            // hide the more news button
	            $('#moreButton').fadeOut('fast'); 

	          }

	        }

	      });

	    }

	    $scope.getAllRecords = function(pageNumber){

	      $scope.isFetching = true;    

	      if (window.localStorage.getItem("rootsLastPage") == null ) {

	        $scope.pullContent();

	      } else {
	        
	        var now = new Date();
	        var saved = new Date(window.localStorage.getItem("rootsDate"));

	        var difference = Math.abs( now.getTime() - saved.getTime() ) / 3600000;

	        // Lets compare the current dateTime with the one we saved when we got the posts.
	        // If the difference between the dates is more than 24 hours I think is time to get fresh content
	        // You can change the 24 to something shorter or longer

	        if(difference > 24){
	          // Let's reset everything and get new content from the site.
	          $scope.currentPage = 1;
	          $scope.pageNumber = 1;
	          $scope.lastSavedPage = 0;
	          window.localStorage.removeItem("rootsLastPage");
	          window.localStorage.removeItem("rootsPosts");
	          window.localStorage.removeItem("rootsTotalPages");
	          window.localStorage.removeItem("rootsDate");

	          $scope.pullContent();
	        
	        } else {
	          
	          $scope.lastSavedPage = window.localStorage.getItem("rootsLastPage");

	          // If the page we want is greater than the last saved page, we need to pull content from the web
	          if($scope.currentPage > $scope.lastSavedPage){

	            $scope.pullContent();
	          
	          // else if the page we want is lower than the last saved page, we have it on local Storage, so just show it.
	          } else {

	            $scope.items = window.localStorage.getObject('rootsPosts');
	            $scope.currentPage = $scope.lastSavedPage;
	            $scope.totalPages = window.localStorage.getItem("rootsTotalPages");
	            $scope.isFetching = false;

	          }

	        }

	      }

	    };

	    $scope.imgLoadedEvents = {
	        done: function(instance) {
	            angular.element(instance.elements[0]).removeClass('is-loading').addClass('is-loaded');
	        }
	    };

	    $scope.showPost = function(index){
	        
	      $rootScope.postContent = $scope.items[index];
	      $scope.ons.navigator.pushPage('post.html');

	    };

	    $scope.nextPage = function(){

	      $scope.currentPage++; 
	      $scope.pageNumber = $scope.currentPage;                 
	      $scope.getAllRecords($scope.pageNumber);        

	    }

	  }]);
  
  
  //post Controller
  app.controller('postController', [ '$scope', '$rootScope', '$sce', function($scope, $rootScope, $sce){
	    
	    $scope.item = $rootScope.postContent;

	    $scope.renderHtml = function (htmlCode) {
	      return $sce.trustAsHtml(htmlCode);
	    };

	    $scope.imgLoadedEvents = {
	        done: function(instance) {
	            angular.element(instance.elements[0]).removeClass('is-loading').addClass('is-loaded');
	        }
	    };    

	  }]);

  
  
  app.controller('networkController', function($scope){

    // Check if is Offline
    document.addEventListener("offline", function(){

      offlineMessage.show();

      /* 
       * With this line of code you can hide the modal in 8 seconds but the user will be able to use your app
       * If you want to block the use of the app till the user gets internet again, please delete this line.       
       */

      setTimeout('offlineMessage.hide()', 8000);  

    }, false);

    document.addEventListener("online", function(){
      // If you remove the "setTimeout('offlineMessage.hide()', 8000);" you must remove the comment for the line above      
      // offlineMessage.hide();
    });

  });

  // This functions will help us save the JSON in the localStorage to read the website content offline

  Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
  }

  Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
  }

  // This directive will allow us to cache all the images that have the img-cache attribute in the <img> tag
  app.directive('imgCache', ['$document', function ($document) {
    return {
      link: function (scope, ele, attrs) {
        var target = $(ele);

        scope.$on('ImgCacheReady', function () {

          ImgCache.isCached(attrs.src, function(path, success){
            if(success){
              ImgCache.useCachedFile(target);
            } else {
              ImgCache.cacheFile(attrs.src, function(){
                ImgCache.useCachedFile(target);
              });
            }
          });
        }, false);

      }
    };
  }]);    

  // Map Markers Controller

  app.controller('markersController', function($scope, $compile){
    
    $scope.infoWindow = {
      title: 'title',
      content: 'content'
    };

    $scope.markers = [
      {
        'title' : 'Location #1',
        'content' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a viverra magna',
        'location'  : [40.7112, -74.213]
      }, 
      {
        'title' : 'Location #2',
        'content' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a viverra magna',
        'location'  : [40.7243, -74.2014]
      }, 
      {
        'title' : 'Location #3',
        'content' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a viverra magna',
        'location'  : [40.7312, -74.1923]
      }
      ];

      $scope.showMarker = function(event){

        $scope.marker = $scope.markers[this.id];
          $scope.infoWindow = {
          title: $scope.marker.title,
          content: $scope.marker.content
        };
        $scope.$apply();
        $scope.showInfoWindow(event, 'marker-info', this.getPosition());

      }

  });

    //prenotazione Controller
  app.controller('bookingController', function($scope, $compile, $filter){

    $scope.bookdate = 'Scegli Data Prenotazione';
    $scope.booktime = 'Scegli Ora Prenotazione';
    $scope.number = 'Numero di persone';
    var config = {
    	    title: "Numero di persone", 
    	    items: [
    	        { text: "Uno", value: "1" },
    	        { text: "Due", value: "2" },
    	        { text: "Tre", value: "3" },
    	        { text: "Quattro", value: "4" },
    	        { text: "Cinque", value: "5" },
    	        { text: "Sei", value: "6" },
    	        { text: "Sette", value: "7" },
    	        { text: "Otto", value: "8" },
    	        { text: "Nove", value: "9" },
    	        { text: "Dieci", value: "10" }         

    	    ],
    	    selectedValue: "1",
    	    doneButtonLabel: "Done",
    	    cancelButtonLabel: "Cancel"
    	};

       $scope.chooseDate = function(){
      
          var options = {
            date: new Date(),
            mode: 'date'
          };

          datePicker.show(options, function(date){
        
            var day   = date.getDate();
              var month   = date.getMonth() + 1;
              var year  = date.getFullYear();

              $scope.$apply(function(){
                $scope.bookdate = $filter('date')(date, 'MMMM d, yyyy');      
              });

          });

        }

       $scope.chooseTime = function(){
      
          var options = {
            date: new Date(),
            mode: 'time'
          };

          datePicker.show(options, function(time){
              $scope.$apply(function(){
                $scope.booktime = $filter('date')(time, 'hh:mm a');
              });
          });

        }

       $scope.chooseNumber=function(){
    	// Show the picker
    	window.plugins.listpicker.showPicker(config, 
    	    function(item) { 
    		  $scope.$apply(function(){
    	            $scope.number = item;
    	          });
    			
    	      //  alert("You have selected " + item);
    	    },
    	    function() { 
    	  //      alert("You have cancelled");
    	    }
    	);
    	
    }
    
       $scope.campFormNull = function(){
        var campNull=true;
        var campiMancanti="";
        var nome="";
        var email="";
        var tel="";
        var date="";
        var time="";
        var numPer="";
        
        
        if(document.getElementById("name").value == ""){
         nome= "Nome ";
        }
      
        if(document.getElementById("Email").value == ""){
         email= "Email ";
        }
        if(document.getElementById("Tel").value == ""){
         tel= "Telefono ";
        }
        if($scope.number == "Numero di persone"){
            numPer= "Numero Persone ";
           }
        if($scope.booktime == "Scegli Ora Prenotazione"){
           time= "Ora ";
        }
        if($scope.bookdate == "Scegli Data Prenotazione"){
           date= "Data ";
         }
        
        campiMancanti= nome + email + numPer + tel + time + date;
        if(campiMancanti==""){
         campNull=true;
        }
        else{
         campNull=false;
         ons.notification.alert({message: 'Campi Mancanti richiesti :'+campiMancanti, title: 'Attenzione' });
        }
        return campNull;
       }
       
       $scope.openEmailClient = function(){
           var continua = false;

	       continua=$scope.campFormNull();
	       if(continua==true){


	           cordova.plugins.email.isAvailable(
                    function (isAvailable) {
                     alert('Non hai nessuna email configurata sul tuo Cellulare ' + isAvailable) ;
                     }
                );
	         
	            cordova.plugins.email.open({
	                to: 'info@witapp.it',
	                subject: 'Prenotazione RistoApp',
	                body: ' <strong> Data Prenotazione </strong> : ' + $scope.bookdate
                    + '<br> <strong> Ora Prenotazione : </strong></br> ' + $scope.booktime
                    + ' <br> <strong> Numero di persone : </strong> </br>' + $scope.number
                    + ' <br> <strong> Nome Cognome : </strong> </br>' + document.getElementById("name").value
                    + '<br> <strong> Email : </strong> </br>' + document.getElementById("Email").value
                    + '<br> <strong> Telefono : </strong> </br>' + document.getElementById("Tel").value
                    + '<br> <strong> Messaggio : </strong> </br>' + document.getElementById("Messaggio").value,
	                isHtml: true
	            });
	               
	    
	         
	        }

        }

       
       $scope.sendSms= function(){
           var number = "05559324";
           var message = "Prenotazione RistoApp, Data Prenotazione : " + 
		    $scope.bookdate +
		    "\n Ora Prenotazione :" + $scope.booktime +
		    "\n Numero Persone :" + $scope.number + 
		    "\n Nome Cognome :" + document.getElementById("name").value + 
		    "\n Email : " + document.getElementById("Email").value + 
		    "\n Telefono : " +  document.getElementById("Tel").value + 
		    "\n Messaggio : " + document.getElementById("Messaggio").value;
           //alert(message);

           //CONFIGURATION
           var options = {
               replaceLineBreaks: true, // true to replace \n by a new line, false by default
               android: {
                   intent: ''  // send SMS with the native android SMS messaging
                   //intent: '' // send SMS without open any other app
               }
           };

           var success = function () {
              
        	   ons.notification.alert(
        			   {message: 'Messaggio inviato',
        				title: 'PRENOTAZIONE TAVOLO'  })
           
           };
           var error = function (e) { 
              
        	   ons.notification.alert(
        			   {message: 'Messaggio non inviato :'+ e,
        				title: ' '  })
           };
           
           var continua=false;
	       continua=$scope.campFormNull();
	       if(continua==true){

  	              sms.send(number, message, options, success, error);
	       }
       }
       
       
       $scope.callNumber= function (){
    	   
       //window.plugins.CallNumber.callNumber(function () { console.log("Success"); }, function (e) { console.log("Error " + e) }, 3288261181);
           window.open('tel:05559324', '_system');
       }
       
       
       $scope.device=device;
       
     });

  
  // Contacts Controller
  app.controller('contactsController', function($scope){


      $scope.campFormNull = function () {

          var campNull = true;
          var campiMancanti = "";
          var nome = "";
          var email = "";
          var messaggio = "";



          if (document.getElementById("name").value == "") {
              nome = "Nome ";
          }

          if (document.getElementById("Email").value == "") {
              email = "Email ";
          }
          if (document.getElementById("Messaggio").value == "") {
              messaggio = "Messaggio ";
          }

          campiMancanti = nome + email+ messaggio;
          if (campiMancanti == "") {
              campNull = true;
          }
          else {
              campNull = false;
              ons.notification.alert({ message: 'Campi Mancanti richiesti :' + campiMancanti, title: 'Attenzione' });
          }
          return campNull;
      }

      $scope.openEmailClient = function () {


          var continua = false;

          continua = $scope.campFormNull();
          if (continua == true) {


              cordova.plugins.email.isAvailable(
                   function (isAvailable) {
                       alert('Non hai nessuna email configurata sul tuo Cellulare ');
                   }
               );



              cordova.plugins.email.open({
                  to: 'info@witapp.it',
                  subject: 'Contatti tramite app Sette Scogli',
                  body: '<strong> Nome Cognome : </strong> </br>' + document.getElementById("name").value
                  + '<br> <strong> Email : </strong> </br>' + document.getElementById("Email").value
                  + '<br> <strong> Messaggio : </strong> </br>' + document.getElementById("Messaggio").value,
                  isHtml: true
              });


          }

      }

      $scope.callNumber = function () {

          window.open('tel:05559324', '_system');
      }
	    

	  });
  
  
  
  // Plugins Controller

  app.controller('pluginsController', function($scope, $compile){

    $scope.openWebsite = function(){
      var ref = window.open('http://google.com', '_blank', 'location=yes');
    }

    $scope.openSocialSharing = function(){
      
      window.plugins.socialsharing.share('Message, image and link', null, 'https://www.google.com/images/srpr/logo4w.png', 'http://www.google.com');

      /*
       *  Social Sharing Examples
       *  For more examples check the documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
   
        window.plugins.socialsharing.share('Message only')
        window.plugins.socialsharing.share('Message and subject', 'The subject')
        window.plugins.socialsharing.share(null, null, null, 'http://www.google.com')
        window.plugins.socialsharing.share('Message and link', null, null, 'http://www.google.com')
        window.plugins.socialsharing.share(null, null, 'https://www.google.com/images/srpr/logo4w.png', null)
        window.plugins.socialsharing.share('Message and image', null, 'https://www.google.com/images/srpr/logo4w.png', null)
        window.plugins.socialsharing.share('Message, image and link', null, 'https://www.google.com/images/srpr/logo4w.png', 'http://www.google.com')
        window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'https://www.google.com/images/srpr/logo4w.png', 'http://www.google.com')
      *
      */

    }


    $scope.openEmailClient = function(){

      ons.ready(function(){

        cordova.plugins.email.open({
          to:      'han@solo.com',
          subject: 'Hey!',
          body:    'May the <strong>force</strong> be with you',
          isHtml:  true
        });

      });
      
    }

    $scope.getDirectionsApple = function(){
      
      window.location.href = "maps://maps.apple.com/?q=37.774929,-122.419416";

    }

    $scope.getDirectionsGoogle = function(){

      var ref = window.open('http://maps.google.com/maps?q=37.774929,-122.419416', '_system', 'location=yes');

    }

    $scope.getDate = function(){
      
      var options = {
        date: new Date(),
        mode: 'date'
      };

      datePicker.show(options, function(date){
        alert("date result " + date);  
      });

    }

  });

})();