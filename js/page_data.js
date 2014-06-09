$(function() {
	$("#start").on("swipeleft", function(e){
        $.mobile.changePage("#data", {transition: "slide"});
    });
        
    $("#data").on("swiperight", function(e){
        $.mobile.changePage("#start", {transition: "slide", reverse: true});
    }); 

	$( "#datafilechanger" ).on ({
	    change: function() {
			filename = document.getElementById('datafilechanger').value; 
	    	/*localStorage["cfg_datafile"] = document.getElementById('datafilechanger').value; 
	    	updatecfghtml();*/
	    	problematic_agents = new Array("Chrome/34", "Android 4");
	    	if (navigator.userAgent );
	    	problem = false;
	    	for (var j=0; j<problematic_agents.length; j++) {
        		if (navigator.userAgent.indexOf(problematic_agents[j]) > -1) {
        			problem = true;
        		}
    		}
	    	if (!problem) {
	    		alert(filename);
				loaddata2storage(filename);
			} else{
				alert("Sorry, your navigator does not allow to import files.\n\n Version:\n" + navigator.userAgent);
				//http://stackoverflow.com/questions/19882331/html-file-input-in-android-webview-android-4-4-kitkat
				loaddata2stoAUX(filename);
			}
	    }
	});
	$( "#checkDataLS" ).on ({
	    click: function() {
	    	document.getElementById('checkDataLS').innerHTML = LSdatacheck();
	    }
	});
	$( "#emptyDataLS" ).on ({
	    click: function() {
	    	emptydatastored();
	    	localStorage.clear();
	    }
	});
	$( "#saveDataLS2File" ).on ({
	    click: function() {
	    	savedataLS2file();
	    }
	});

    $("#data").bind('pagebeforeshow',function(e){
        updatedatahtml();
    }); 

});


function updatedatahtml() {
	data_in = ""
	for ( i = 0 ; i <= localStorage.length - 1 ; i++ ){
		var key = localStorage.key(i);
		value = localStorage[localStorage.key(i)];
		if (key.indexOf("data_") > -1) {
			try {
				result = jQuery.parseJSON(value);
				data_in = data_in + "<li><a data-role='button' data-theme='a' >"  + DateCALtoListview(result["Start Date"]) + " - " + result["Description"] + "</a></li>";
			} catch(e) {
				alert("updatedatahtml" + e + value);
			}
		}
	} 
	$("#lvdata").html(data_in).init();
	$("#lvdata").listview();
	/* http://tinysort.sjeiti.com/ */
	$("ul#lvdata>li").tsort('',{order:"desc"});
	$("#lvdata").listview('refresh');
}
