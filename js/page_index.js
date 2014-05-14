$(function() {

    load_start();

    $("#start").on("swiperight", function(e){
        $.mobile.changePage("#config", {transition: "slide", reverse: true});
    });
        
    $("#config").on("swipeleft", function(e){
        $.mobile.changePage("#start", {transition: "slide"});
    }); 

    $("#start").bind('pagebeforeshow',function(e){
        load_start();
    }); 

    $("#config").bind('pagebeforeshow',function(e){
        load_start();
    }); 
 
});

function load_start(){
    var aux = new Date();
    var todayGUI = DateToGUI(aux);
    var todayCSV = DateToCALdate(aux);
    document.getElementById('clock_main').innerHTML = todayGUI;
    document.getElementById('clock_config').innerHTML = todayGUI;
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