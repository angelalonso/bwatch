$(function() {

    /* update triggers */

    reload_main_html();

    $("#start").bind('pagebeforeshow',function(e){
        reload_main_html();
    }); 

    $( "#MainNewEntry" ).on ({
        click: function() {
            LSPopup("#popupTest", "New Entry", "NEW ENTRY");
        }
    }); 

    $("#MainDeleteAll" ).on ({
        click: function() {
            emptydatastored();
            localStorage.clear();
            reload_main_html();
        }
    });

});

function reload_main_html(){
    var aux = new Date();
    var todayGUI = DateToGUI(aux);
    var todayCSV = DateToCALdate(aux);
    document.getElementById('clock_main').innerHTML = todayGUI;
    try { 
		document.getElementById('nextpill').innerHTML = "Today: " + jQuery.parseJSON(LSsearchincol("Start Date", todayCSV)[0])["Description"]; 
	} catch(e) {
		document.getElementById('nextpill').innerHTML = "Today: Not defined";
	}
    try { 
		document.getElementById('nexttest').innerHTML = "Next Test: " + DateCALtoGUI(jQuery.parseJSON(LSsearchincol("Description","Test Blood")[0])["Start Date"]);
	} catch(e) {
		document.getElementById('nexttest').innerHTML = "Next Test: Not defined";
	}
}