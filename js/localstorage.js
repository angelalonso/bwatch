/* Local Storage Functions - START */

	/* ADD */
function LSAddEntry(entry_in){
// TO DOw, : "value", 
// Check that it is not repeated
// Substitute newEntry2storage
	i = localStorage.length;
	localStorage["data_" + i] = entry_in;
	updatedatahtml();

}

	/* SEARCH - everything */

function LSFindEntry(string2search){
	var results = {};
	for (i=0;i<=localStorage.length-1;i++){
		value = localStorage[localStorage.key(i)];
		if (value.indexOf(string2search) > -1){
			results[localStorage.key(i)] = value;
		}
	}

	return results;
}


function LSsearch(value2search){
	var results = [];

	for (i=0;i<=localStorage.length-1;i++){
		value = localStorage[localStorage.key(i)];
		if (value.indexOf(value2search) > -1){
			results.push(value);
		}
	} 
	return results;
}

	/* SEARCH - only in a given field */

function LSFindEntryInField(string2search,field){
	var results = {};
	for (i=0;i<=localStorage.length-1;i++){
		entry = localStorage[localStorage.key(i)];
		try {
			value = jQuery.parseJSON(entry);
		} catch(e) {
			alert("There is an Entry with a JSON Error: " + e + entry);
		}
		try {
			columnvalue = value[field];
			if ( columnvalue != undefined ) {
				if (columnvalue.indexOf(string2search) > -1){
					found_value = localStorage[localStorage.key(i)];
					results[localStorage.key(i)] = found_value;
				}
			} 
		} catch(e) {
			alert("There is no Field defined as you indicated: " + field + ". Error: "+ e + value[column2search]);
		}
	}
	return results;
}

function LSsearchincol(column2search,value2search){
	var results = [];

	for (i=0;i<=localStorage.length-1;i++){
		entry = localStorage[localStorage.key(i)];
		try {
			value = jQuery.parseJSON(entry);
		} catch(e) {
			alert("LSsearchincol 1" + e + entry);
		}
		try {
			columnvalue = value[column2search];
			if ( columnvalue != undefined ) {
				if (columnvalue.indexOf(value2search) > -1){
					results.push(entry);
				}
			} 
		} catch(e) {
			alert("LSsearchincol 2" + e + value[column2search]);
		}
	} 
	return results;
}

	/* DELETE - Entries received through Array */

function LSDeleteEntry(entries_2_delete) {
	obj_length = Object.keys(entries_2_delete).length;
	for (i=0;i<=obj_length-1;i++){
		localStorage.removeItem(Object.keys(entries_2_delete)[i]);
	}
}

function LSDeleteEntrywKey(key_2_delete) {
	localStorage.removeItem(key_2_delete);
}

// TO DO: Adapt this search or KILL IT!
function datasearchcolumn(column){
	var results = [];
	var results_entries = [];

	for (i=0;i<=localStorage.length-1;i++){
		var key = localStorage.key(i);
		if (key.split("-")[1] == column){
			results.push(key.split("-")[2] + "---" + localStorage[key]);
		}

	} 
	alert(results);
}

/* Local Storage Functions - END */


/* Local Storage POPUP - START */

function LSPopup(div_id, title,popup_type){
	var month_names_en_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var month_names_es_short = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    var todayArray = DateToArraydate(new Date());

    $("#popup-entry-title").html(popup_type).init();

    document.getElementById('popup-entry-day').value = todayArray[0];
    data_month = "";

    for (month=1;month<=12;month++) {
    	month_tag = month_names_en_short[month -1];
    	data_month = data_month + '<option value="' + month + '">' + month_tag+ '</option>';
    }
    $("#popup-entry-month").html(data_month).init();
    $('#popup-entry-month').prop('selectedIndex', parseInt(todayArray[1]) - 1).selectmenu('refresh').change();
    document.getElementById('popup-entry-year').value = todayArray[2];
    document.getElementById('popup-entry-hour').value = todayArray[3];
    document.getElementById('popup-entry-mins').value = todayArray[4];

    entry_type = document.getElementById('popup-entry-type').value;

    if (entry_type == 'pill_take'){
    	$( "#popup-amount" ).show();
        $( "#popup-level" ).hide();
        document.getElementById('popup-entry-hour').value = 21;
		document.getElementById('popup-entry-mins').value = 00;
    } else {
    	$( "#popup-amount" ).hide();
        $( "#popup-level" ).show();
        document.getElementById('popup-entry-hour').value = 11;
		document.getElementById('popup-entry-mins').value = 15;
    }
}



/* Local Storage POPUP - END */

// http://24ways.org/2010/html5-local-storage/
// CONFIG ENTRIES
function LSconfigcheck() {
// TO DO: Improve this check

	if (localStorage["cfg_appmode"] == undefined){
		alert("no config for app mode");
	} else {
		alert("everything fine");
	}
}

function loadconfig2storage(configfile_in) {

		$.ajax({
		type: "GET",
		url:configfile_in,
		dataType: "text",
		success: function(data)
		{
			//file exists
			try {
				configobj = JSON && JSON.parse(data) || $.parseJSON(data);
			} catch(e) {
				alert("loadconfig2storage" + e + data);
			}
			localStorage["cfg_configfile"] = configobj.cfg_configfile;
			localStorage["cfg_appmode"] = configobj.cfg_appmode;

			updatehtml();

		},
		error: function()
		{
			//file not exists
			alert(configfile + " does not exist");
			localStorage.removeItem("cfg_configfile");
			updatehtml();	
		}
	});
}

function emptyconfigstored() {
	// don't use length in the for itself (sounds dumb to refer to it if legth changes after each delete, right?)
	iterations = localStorage.length;
	for (i=0; i<=(iterations-1); i++) {
		key2search = localStorage.key(0);
		localStorage.removeItem(key2search);
	};
	updatehtml();
}

function updatehtml() {
	document.getElementById('configfile').innerHTML = "Config file: " + localStorage["cfg_configfile"];
	document.getElementById('appmode').innerHTML = "App mode: " + localStorage["cfg_appmode"];
}

function saveconfigLS2file() {
	a = $('#saveLS2File');
	a.hide();
	var t = '{\n';
	for (i=0; i<=(localStorage.length-1); i++) {
		key = localStorage.key(i);
		if ( key.indexOf("config") > -1){
			t = t + "\t\"" + localStorage.key(i) + "\": \"" + localStorage[key] + "\"";
			if (i < (localStorage.length-1)){
				t = t + ",\n";
			} else {
				t = t + "\n";
			}
		}
	}
	t = t + '}';
	

	a.attr('href', 'data:application/x-json;base64,' + btoa(t)).show();

}


// DATA ENTRIES

function LSdatacheck() {
	data_entries = 0;
	config_entries = 0;
	for ( i = 0 ; i <= (localStorage.length - 1) ; i++ ) {
		key = localStorage.key(i);
		if ( key.indexOf("data_") > -1){
			data_entries += 1;
		} else if ( key.indexOf("config") > -1){
			config_entries += 1;
		}
	}
	result = localStorage.length + "entries, " + data_entries + " for data, " + config_entries + " for config";
	return result;
}


function loaddata2storage(configfile_in) {
		$.ajax({
		type: "GET",
		url:configfile_in,
		dataType: "text",
		success: function(data)
		{
			//file exists

			var dataLines = data.split(/\r\n|\n/);
			
			//Storing the titles first
			var fields = dataLines[0].split(",");
			var fieldsline = "{";
			for ( i = 0 ; i <= fields.length - 1 ; i++ ){
				fieldsline = fieldsline + "\"" + i + "\": " + "\"" + fields[i] + "\"";
				if ( i < fields.length-1 ){
					fieldsline = fieldsline + ", ";
				}
			}
			fieldsline = fieldsline + "}";
			localStorage["fields"] = fieldsline;

			//Storing the data then
			for ( i = 1 ; i < dataLines.length-1 ; i++ ){
				row = dataLines[i].split(",");
				rowline = "{";
				for ( j = 0 ; j <= row.length-1 ; j++ ){
					rowline = rowline + "\"" + fields[j] + "\": " + "\"" + row[j] + "\"";
					if ( j < row.length-1 ){
						rowline = rowline + ", ";
					}
				}
				rowline = rowline + "} ";
				localStorage["data_" + (i - 1)] = rowline;
			}
		updatedatahtml();
		},
		error: function()
		{
			//file not exists
			alert(configfile + " does not exist");
			updatedatahtml();	
		}
	});
}



function newEntry2storage(new_entry_in) {
	i = localStorage.length;
	localStorage["data_" + (i)] = new_entry_in;
	updatedatahtml();
}

function loaddata2stoAUX(configfile_in) {
	new_file = configfile_in.split('C:\\fakepath\\')[1];
	alert("testing: " + new_file);
	loaddata2storage(new_file);

}


function emptydatastored() {
	iterations = localStorage.length - 1;
	keys2delete = []
	for (i=0; i<=iterations; i++) {
		key2search = localStorage.key(i);
		if (key2search.indexOf("data_") > -1){
			keys2delete.push(key2search);
		} 
	}
	for (i=0; i<=keys2delete.length;i++){
		localStorage.removeItem(keys2delete[i]);
	}
	updatedatahtml();
}



