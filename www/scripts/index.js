// Per un'introduzione al modello vuoto, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Per eseguire il debug del codice al caricamento della pagina in Ripple o in dispositivi/emulatori Android: avviare l'app, impostare i punti di interruzione, 
// quindi eseguire "window.location.reload()" nella console JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Gestire gli eventi di sospensione e ripresa di Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
      
        $.getJSON("http://www.riverauto.it/ITA/sezioni/jq_lista_modelli_raw.php", function (data) {
            storeData();
           
           for (var i = 0; i < data.length; i++) {
               
               var json = data[i];
               alert(json.marca);
               break;
              
            }
           
           

        });
      
       
        // TODO: Cordova è stato caricato. Eseguire qui eventuali operazioni di inizializzazione richieste da Cordova.
    };
   

    function onPause() {
        // TODO: questa applicazione è stata sospesa. Salvarne lo stato qui.
    };

    function onResume() {
        // TODO: questa applicazione è stata riattivata. Ripristinarne lo stato qui.
    };
} )();