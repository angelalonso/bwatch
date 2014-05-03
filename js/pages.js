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
}).fail(function() {
    alert("nothing found!");
});

$("#start").on("swipeleft", function(e){
    $.mobile.changePage("#config", {transition: "slide"});
});
    
$("#config").on("swiperight", function(e){
    $.mobile.changePage("#start", {transition: "slide",
                                   reverse: true});
});    