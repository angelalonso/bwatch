// CONFIG SITE SCRIPTING
	// Getting the correct config file
function get_configfile(){
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
				localStorage["app_type"] = configobj.app_type;
				document.getElementById('configfile').innerHTML = "Config file: " + configobj.config_file;
				document.getElementById('apptype').innerHTML = "App type: " + configobj.app_type;
			},
			error: function()
			{
				//file not exists
				alert(configfile + " does not exist");
				localStorage.removeItem("config_file");
				document.getElementById('configfile').innerHTML = "Config file not found ";
				document.getElementById('apptype').innerHTML = "App type not found ";
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
				localStorage["app_type"] = configobj.app_type;
				document.getElementById('configfile').innerHTML = "Config file: " + configobj.config_file;
				document.getElementById('apptype').innerHTML = "App type: " + configobj.app_type;
			},
			error: function()
			{
				//file not exists
				alert(localStorage["config_file"] + " does not exist");
				localStorage.removeItem("config_file");
				document.getElementById('configfile').innerHTML = "Config file not found ";
				document.getElementById('apptype').innerHTML = "App type not found ";
			}
		});
	}
}