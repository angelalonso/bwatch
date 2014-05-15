super.setIntegerProperty("loadUrlTimeoutValue", 60000);
$(function() {

	$( "#datafilechanger" ).on ({
	    change: function() {
	    	filename = document.getElementById('datafilechanger').value; 
	    	/*localStorage["cfg_datafile"] = document.getElementById('datafilechanger').value; 
	    	updatecfghtml();*/
			loaddata2storage(filename);
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
