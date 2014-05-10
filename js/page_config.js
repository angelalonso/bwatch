$(function() {
	updatehtml();
	$( "#appmodechanger" ).on ({
	    change: function() {
	    	localStorage["cfg_appmode"] = document.getElementById('appmodechanger').value; 
	    	updatehtml();
	    }
	});
	$( "#configfilechanger" ).on ({
	    change: function() {
	    	localStorage["cfg_configfile"] = document.getElementById('configfilechanger').value; 
	    	updatehtml();
	    }
	});
	$( "#checkCfgLS" ).on ({
	    click: function() {
	    	LSconfigcheck();
	    }
	});
	$( "#loadCfg2LS" ).on ({
	    click: function() {
	    	// check what happens if no file is given
	    	filename = 'config.json'; 
	    	loadconfig2storage(filename);
	    }
	});
	$( "#emptyCfgLS" ).on ({
	    click: function() {
	    	emptyconfigstored();
	    }
	});
	$( "#saveCfgLS2File" ).on ({
	    click: function() {
	    	saveconfigLS2file();
	    }
	});

});