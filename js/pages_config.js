// CONFIG SITE SCRIPTING
	// Getting the correct config file
function get_configfile(){
	// We'll use the oportunity to add functionality to the config site elements...
	$( "#popupAppMode" ).on({
        popupafterclose: function() {
        	newAppMode = document.getElementById('select-choice-min').value;
            document.getElementById('appmode').innerHTML = "App mode: " + newAppMode;
            localStorage["app_mode"] = newAppMode;
            save_to_json(localStorage["app_mode"]);
        }
    });

    //..and now to the file itself!
	configobj = new Object();
	// Nothing configured? then use the one per default.
	if (localStorage["config_file"] == undefined){
		configfile = 'data/config.json';
		$.ajax({
			type: "GET",
			url:configfile,
			dataType: "text",
			success: function(data)
			{
				//file exists
				configobj = JSON && JSON.parse(data) || $.parseJSON(data);
				localStorage["config_file"] = configobj.config_file;
				localStorage["app_mode"] = configobj.app_mode;
				document.getElementById('configfile').innerHTML = "Config file: " + configobj.config_file;
				document.getElementById('appmode').innerHTML = "App mode: " + configobj.app_mode;
			},
			error: function()
			{
				//file not exists
				alert(configfile + " does not exist");
				localStorage.removeItem("config_file");
				document.getElementById('configfile').innerHTML = "Config file not found ";
				document.getElementById('appmode').innerHTML = "App mode not found ";
			}
		});
		
	} else {
		$.ajax({
			type: "GET",
			url:localStorage["config_file"],
			dataType: "text",
			success: function(data)
			{
				//file exists
				configobj = JSON && JSON.parse(data) || $.parseJSON(data);
				localStorage["config_file"] = configobj.config_file;
				localStorage["app_mode"] = configobj.app_mode;
				document.getElementById('configfile').innerHTML = "Config file: " + configobj.config_file;
				document.getElementById('appmode').innerHTML = "App mode: " + configobj.app_mode;
			},
			error: function()
			{
				//file not exists
				alert(localStorage["config_file"] + " does not exist");
				localStorage.removeItem("config_file");
				document.getElementById('configfile').innerHTML = "Config file not found ";
				document.getElementById('appmode').innerHTML = "App mode not found ";
			}
		});
	}
}

function save_to_json(test){
	alert(test);

}
