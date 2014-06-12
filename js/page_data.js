$(function() {

/*	Swipes	*/



/* Popup elements */

    $( "#popup-entry-type" ).on ({
        change: function() {
        	title = $("#popup-entry-title").text();
			LSPopup("#popupTest", "New Entry", title);
        }
    }); 

    $( "#popup-button-save" ).on ({
        click: function() {
        	newentry_type = document.getElementById('popup-entry-type').value;
			var time_in = DateGUItoCAL(document.getElementById("popup-entry-day").value,document.getElementById("popup-entry-month").value,document.getElementById("popup-entry-year").value,document.getElementById("popup-entry-hour").value,document.getElementById("popup-entry-mins").value);
			start_date_in = time_in[0]; 
			start_time_in = time_in[1];
			end_date_in = start_date_in;
			end_time_in = "12:00:00 AM";
			if (newentry_type == 'pill_take') {
				subject_in = "Sintrom Amount";
				descr_in = "Sintrom Amount: " + document.getElementById('popup-slider-amount').value;
			} else {
				subject_in = "Sintrom Test";
				descr_in = "Blood Level: " + document.getElementById('popup-slider-level').value;
			}
			
			result = '{"Subject": "' + subject_in + '", "Start Date": "' + start_date_in + '", "Start Time": "' + start_time_in + '", "End Date": "' + end_date_in + '", "End Time": "' + end_time_in + '", "All Day Event": "False", "Description": "' + descr_in + '", "Location": "", "Private": "False"}'
			// key is data_nr (data_4)
			// value is "{"Subject": "Sintrom Test", "Start Date": "05/14/12", "Start Time": "11:15:00 AM", "End Date": "05/14/12", "End Time": "12:00:00 AM", "All Day Event": "False", "Description": "Blood Level: 3.5", "Location": "", "Private": "False"} "
			newEntry2storage(result);
        }
    }); 

/* List of entries */

	$( "#lvdata" ).on('click', 'li', function () {
		entry_key = "data_" + $(this).text().split(" ")[0];
	    LSDeleteEntrywKey(entry_key);
	    updatedatahtml();
	});


/* Import from file */

	$( "#datafilechanger" ).on ({
	    change: function() {
			filename = document.getElementById('datafilechanger').value; 
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

/* Buttons */	
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



    $( "#popupEntry" ).on( "popupbeforeposition", function( event, ui ) {
			LSPopup("#popupTest", "New Entry", "NEW ENTRY");
		}
	);



	$( "#addEntryLS" ).on ({
	    click: function() {
	    	LSAddEntry('{"Subject": "Sintrom Test", "Start Date": "05/14/12", "Start Time": "11:15:00 AM", "End Date": "05/14/12", "End Time": "12:00:00 AM", "All Day Event": "False", "Description": "Blood Level: 3.5", "Location": "", "Private": "False"} ');
	    	updatedatahtml();
	    }
	});

	$( "#editEntryLS" ).on ({
	    click: function() {
	    	LSEditEntry();
	    	updatedatahtml();
	    }
	});

	$( "#deleteEntryLS" ).on ({
	    click: function() {
	    	LSDeleteEntry(LSFindEntryInField("06/14/15","Start Date"));
	    	updatedatahtml();
	    }
	});

	$( "#findEntryLS" ).on ({
	    click: function() {
	    	//LSFindEntry("06/14/11");
	    	LSFindEntryInField("06/14/11","Start Time");
	    }
	});



    $("#data").bind('pagebeforeshow',function(e){
        updatedatahtml();
    });


});


/* Site update*/
function updatedatahtml() {
	data_in = ""
	for ( i = 0 ; i <= localStorage.length - 1 ; i++ ){
		var key = localStorage.key(i);
		value = localStorage[localStorage.key(i)];
		if (key.indexOf("data_") > -1) {
			try {
				result = jQuery.parseJSON(value);
				value_nr = key.split("_")[1];
				data_in = data_in + "<li><a data-role='button' data-theme='a' >" + value_nr + " " + DateCALtoListview(result["Start Date"]) + " - " + result["Description"] + "</a></li>";
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
