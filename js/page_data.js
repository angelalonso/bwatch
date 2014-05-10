$(function() {

	$( "#datafilechanger" ).on ({
	    change: function() {
	    	localStorage["cfg_datafile"] = document.getElementById('datafilechanger').value; 
	    	updatecfghtml();
	    }
	});
	$( "#checkDataLS" ).on ({
	    click: function() {
	    	document.getElementById('checkDataLS').innerHTML = LSdatacheck();
	    }
	});
	$( "#loadData2LS" ).on ({
	    click: function() {
	    	// check what happens if no file is given
	    	filename = 'Calendar.csv'; 
	    	loaddata2storage(filename);
	    }
	});
	$( "#emptyDataLS" ).on ({
	    click: function() {
	    	emptydatastored();
	    	alert("deleting");
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
				data_in = data_in + "<li><a data-role='button' data-theme='a' >"  + DateCALtoGUI(result["Start Date"]) + " - " + result["Description"] + "</a></li>";
			} catch(e) {
				alert(e);
			}
		}
	} 
	$("#lvdata").html(data_in).init();
	  $("#lvdata").listview();
	  $("#lvdata").listview('refresh');
}
