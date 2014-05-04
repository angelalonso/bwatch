// MAIN SITE SCRIPTING

csv_file = 'data/Calendar.csv';
$( document ).ready(function() {
    loadCSV();
});

function loadCSV() {
    return $.ajax({
        type: "GET",
        url: csv_file,
        dataType: "text"
    });
}

loadCSV().done(function(data) {
    var aux = new Date();
    var todayCSV = DateToCSVdate(aux);
    var todayGUI = DateToGUI(aux);
    dataArray = processCSV2ObjectArray(data);

    document.getElementById('nextpill').innerHTML = "Today: " + searchObj(dataArray,"Start_Date",todayCSV).Data[0].Description;
    document.getElementById('nexttest').innerHTML = "Next Test: " + CSVdateToGUI(searchObj(dataArray,"Subject","Sintrom Test").Data[0].Start_Date);
    document.getElementById('clock_main').innerHTML = todayGUI;
    document.getElementById('clock_config').innerHTML = todayGUI;
	get_configfile()
    // SWIPE FUNCTIONS
    $("#start").on("swiperight", function(e){
        $.mobile.changePage("#config", {transition: "slide", reverse: true});
        // This should be move to "when the site is loaded"
    });
        
    $("#config").on("swipeleft", function(e){
        $.mobile.changePage("#start", {transition: "slide"});
    }); 
    
}).fail(function() {
    alert("nothing found!");
});

